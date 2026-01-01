import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContentSectionSchema } from "@shared/schema";

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

  const httpServer = createServer(app);
  return httpServer;
}
