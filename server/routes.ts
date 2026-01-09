import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContentSectionSchema, insertPageSchema, insertInsertedBlockSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/content/:sectionType/:language", async (req, res) => {
    try {
      const { sectionType, language } = req.params;
      const section = await storage.getContentSection(sectionType, language);
      if (!section) {
        return res.json({ sectionType, language, content: "" });
      }
      res.json(section);
    } catch (err) {
      console.error("Failed to fetch content:", err);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });

  app.post("/api/content", async (req, res) => {
    console.log("POST /api/content received, body keys:", Object.keys(req.body || {}));
    console.log("Content length:", req.body?.content?.length || 0);
    try {
      const result = insertContentSectionSchema.safeParse(req.body);
      if (!result.success) {
        console.error("Validation error:", JSON.stringify(result.error.errors, null, 2));
        return res.status(400).json({ error: "Invalid content data", details: result.error.errors });
      }
      console.log("Validation passed, saving to database...");
      const section = await storage.updateContentSection(
        result.data.sectionType,
        result.data.language,
        result.data.content
      );
      console.log("Saved successfully, id:", section.id);
      res.json(section);
    } catch (err) {
      console.error("Failed to save content:", err);
      res.status(500).json({ error: "Failed to save content", message: String(err) });
    }
  });

  app.delete("/api/content/:sectionType/:language", async (req, res) => {
    try {
      const { sectionType, language } = req.params;
      await storage.deleteContentSection(sectionType, language);
      res.json({ success: true });
    } catch (err) {
      console.error("Failed to delete content:", err);
      res.status(500).json({ error: "Failed to delete content" });
    }
  });

  // Pages API
  app.get("/api/pages", async (req, res) => {
    try {
      const allPages = await storage.getAllPages();
      res.json(allPages);
    } catch (err) {
      console.error("Failed to fetch pages:", err);
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/:slug", async (req, res) => {
    try {
      const page = await storage.getPageBySlug(req.params.slug);
      if (!page) {
        return res.status(404).json({ error: "Page not found" });
      }
      res.json(page);
    } catch (err) {
      console.error("Failed to fetch page:", err);
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  app.post("/api/pages", async (req, res) => {
    try {
      const now = new Date().toISOString();
      const pageData = {
        ...req.body,
        createdAt: now,
        updatedAt: now,
      };
      const result = insertPageSchema.safeParse(pageData);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid page data", details: result.error.errors });
      }
      const page = await storage.createPage(result.data);
      res.json(page);
    } catch (err) {
      console.error("Failed to create page:", err);
      res.status(500).json({ error: "Failed to create page" });
    }
  });

  app.put("/api/pages/:slug", async (req, res) => {
    try {
      const page = await storage.updatePage(req.params.slug, req.body);
      res.json(page);
    } catch (err) {
      console.error("Failed to update page:", err);
      res.status(500).json({ error: "Failed to update page" });
    }
  });

  app.delete("/api/pages/:slug", async (req, res) => {
    try {
      await storage.deletePage(req.params.slug);
      res.json({ success: true });
    } catch (err) {
      console.error("Failed to delete page:", err);
      res.status(500).json({ error: "Failed to delete page" });
    }
  });

  // Inserted Blocks API
  app.get("/api/blocks/:language", async (req, res) => {
    try {
      const blocks = await storage.getInsertedBlocks(req.params.language);
      res.json(blocks);
    } catch (err) {
      console.error("Failed to fetch blocks:", err);
      res.status(500).json({ error: "Failed to fetch blocks" });
    }
  });

  app.post("/api/blocks", async (req, res) => {
    try {
      const now = new Date().toISOString();
      const blockData = {
        ...req.body,
        createdAt: now,
      };
      const result = insertInsertedBlockSchema.safeParse(blockData);
      if (!result.success) {
        return res.status(400).json({ error: "Invalid block data", details: result.error.errors });
      }
      const block = await storage.createInsertedBlock(result.data);
      res.json(block);
    } catch (err) {
      console.error("Failed to create block:", err);
      res.status(500).json({ error: "Failed to create block" });
    }
  });

  app.delete("/api/blocks/:id", async (req, res) => {
    try {
      await storage.deleteInsertedBlock(req.params.id);
      res.json({ success: true });
    } catch (err) {
      console.error("Failed to delete block:", err);
      res.status(500).json({ error: "Failed to delete block" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
