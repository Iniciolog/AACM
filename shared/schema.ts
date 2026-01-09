import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Content sections for editing
export const contentSections = pgTable("content_sections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sectionType: text("section_type").notNull(), // 'hero', 'research', 'education', 'books', 'faq', 'footer'
  language: text("language").notNull(), // 'en', 'de', 'ru'
  content: text("content").notNull(), // JSON string with section data
});

export const insertContentSectionSchema = createInsertSchema(contentSections).omit({
  id: true,
});

export type InsertContentSection = z.infer<typeof insertContentSectionSchema>;
export type ContentSection = typeof contentSections.$inferSelect;

// Uploaded images
export const images = pgTable("images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  url: text("url").notNull(),
  uploadedAt: text("uploaded_at").notNull(),
});

export const insertImageSchema = createInsertSchema(images).omit({
  id: true,
});

export type InsertImage = z.infer<typeof insertImageSchema>;
export type Image = typeof images.$inferSelect;

// Custom pages
export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  language: text("language").notNull().default('ru'),
  content: text("content").notNull().default('[]'), // JSON array of blocks
  includeHeader: text("include_header").notNull().default('true'),
  includeHero: text("include_hero").notNull().default('true'),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
});

export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;

// Inserted content blocks (for duplicated/pasted/created elements)
export const insertedBlocks = pgTable("inserted_blocks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  language: text("language").notNull().default('ru'),
  parentLocator: text("parent_locator").notNull(), // data-testid or path of parent element
  sortOrder: integer("sort_order").notNull().default(0),
  blockType: text("block_type").notNull().default('text'), // 'text', 'image', 'custom'
  htmlContent: text("html_content").notNull(), // Full HTML of the block
  styles: text("styles").default('{}'), // JSON string of styles
  createdAt: text("created_at").notNull(),
});

export const insertInsertedBlockSchema = createInsertSchema(insertedBlocks).omit({
  id: true,
});

export type InsertInsertedBlock = z.infer<typeof insertInsertedBlockSchema>;
export type InsertedBlock = typeof insertedBlocks.$inferSelect;
