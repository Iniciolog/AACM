import { type User, type InsertUser, type ContentSection, users, contentSections } from "@shared/schema";
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
}

export const storage = new DatabaseStorage();
