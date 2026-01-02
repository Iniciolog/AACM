import { type User, type InsertUser, type ContentSection, type Page, type InsertPage, users, contentSections, pages } from "@shared/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { eq, and, sql } from "drizzle-orm";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// Initialize database tables on startup
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS content_sections (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        section_type TEXT NOT NULL,
        language TEXT NOT NULL,
        content TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS images (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        filename TEXT NOT NULL,
        url TEXT NOT NULL,
        uploaded_at TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS pages (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        language TEXT NOT NULL DEFAULT 'ru',
        content TEXT NOT NULL DEFAULT '[]',
        include_header TEXT NOT NULL DEFAULT 'true',
        include_hero TEXT NOT NULL DEFAULT 'true',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);
    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database tables:", error);
  }
}

// Run initialization
initializeDatabase();

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getContentSection(sectionType: string, language: string): Promise<ContentSection | undefined>;
  updateContentSection(sectionType: string, language: string, content: string): Promise<ContentSection>;
  deleteContentSection(sectionType: string, language: string): Promise<void>;
  
  getAllPages(): Promise<Page[]>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(slug: string, updates: Partial<InsertPage>): Promise<Page>;
  deletePage(slug: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getContentSection(sectionType: string, language: string): Promise<ContentSection | undefined> {
    const result = await db.select().from(contentSections).where(
      and(
        eq(contentSections.sectionType, sectionType),
        eq(contentSections.language, language)
      )
    );
    return result[0];
  }

  async updateContentSection(sectionType: string, language: string, content: string): Promise<ContentSection> {
    // For visual_changes, merge with existing content instead of replacing
    if (sectionType === 'visual_changes') {
      const existing = await this.getContentSection(sectionType, language);
      let mergedContent = content;
      
      if (existing && existing.content) {
        try {
          const existingChanges = JSON.parse(existing.content);
          const newChanges = JSON.parse(content);
          // Merge: new changes take priority but preserve existing ones
          const merged = { ...existingChanges, ...newChanges };
          mergedContent = JSON.stringify(merged);
          console.log(`Merged ${Object.keys(newChanges).length} new changes with ${Object.keys(existingChanges).length} existing`);
        } catch (e) {
          console.error("Failed to merge content, using new content only:", e);
        }
      }
      content = mergedContent;
    }
    
    await db.delete(contentSections).where(
      and(
        eq(contentSections.sectionType, sectionType),
        eq(contentSections.language, language)
      )
    );
    
    const result = await db.insert(contentSections).values({
      sectionType,
      language,
      content
    }).returning();
    
    console.log(`Saved section ${sectionType} for ${language} to database`);
    return result[0];
  }

  async deleteContentSection(sectionType: string, language: string): Promise<void> {
    await db.delete(contentSections).where(
      and(
        eq(contentSections.sectionType, sectionType),
        eq(contentSections.language, language)
      )
    );
    console.log(`Deleted section ${sectionType} for ${language} from database`);
  }

  async getAllPages(): Promise<Page[]> {
    const result = await db.select().from(pages);
    return result;
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const result = await db.select().from(pages).where(eq(pages.slug, slug));
    return result[0];
  }

  async createPage(page: InsertPage): Promise<Page> {
    const result = await db.insert(pages).values(page).returning();
    console.log(`Created page: ${page.slug}`);
    return result[0];
  }

  async updatePage(slug: string, updates: Partial<InsertPage>): Promise<Page> {
    const now = new Date().toISOString();
    await db.update(pages).set({ ...updates, updatedAt: now }).where(eq(pages.slug, slug));
    const result = await db.select().from(pages).where(eq(pages.slug, slug));
    console.log(`Updated page: ${slug}`);
    return result[0];
  }

  async deletePage(slug: string): Promise<void> {
    await db.delete(pages).where(eq(pages.slug, slug));
    console.log(`Deleted page: ${slug}`);
  }
}

export const storage = new DatabaseStorage();
