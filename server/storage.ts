import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Content Sections
  getContentSection(sectionType: string, language: string): Promise<ContentSection | undefined>;
  updateContentSection(sectionType: string, language: string, content: string): Promise<ContentSection>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contentSections: Map<string, ContentSection>;

  constructor() {
    this.users = new Map();
    this.contentSections = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getContentSection(sectionType: string, language: string): Promise<ContentSection | undefined> {
    return Array.from(this.contentSections.values()).find(
      (s) => s.sectionType === sectionType && s.language === language
    );
  }

  async updateContentSection(sectionType: string, language: string, content: string): Promise<ContentSection> {
    const existing = await this.getContentSection(sectionType, language);
    if (existing) {
      const updated = { ...existing, content };
      this.contentSections.set(existing.id, updated);
      return updated;
    }
    const id = randomUUID();
    const newSection: ContentSection = { id, sectionType, language, content };
    this.contentSections.set(id, newSection);
    return newSection;
  }
}

export const storage = new MemStorage();
