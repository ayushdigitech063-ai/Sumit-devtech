import { Request, Response } from "express";
import { SeoMetaModel } from "../models/SeoMeta";

// GET /api/seo - get all SEO configs (admin)
export async function getAllSeo(req: Request, res: Response) {
  try {
    const list = await SeoMetaModel.find().sort({ path: 1 });
    return res.json({ success: true, list });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to fetch SEO list" });
  }
}

// GET /api/seo/by-path?path=/services/website-design - get SEO config for specific path
export async function getSeoByPath(req: Request, res: Response) {
  try {
    const rawPath = String(req.query.path || "").trim().toLowerCase();
    if (!rawPath) {
      return res.status(400).json({ success: false, message: "Path parameter is required" });
    }
    const seo = await SeoMetaModel.findOne({ path: rawPath, isActive: true });
    return res.json({ success: true, seo });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to fetch SEO" });
  }
}

// POST /api/seo - create or upsert SEO config
export async function saveSeo(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!body.path || !body.title) {
      return res.status(400).json({ success: false, message: "Path and Title are required" });
    }

    const cleanPath = String(body.path).trim().toLowerCase();
    const seo = await SeoMetaModel.findOneAndUpdate(
      { path: cleanPath },
      {
        $set: {
          ...body,
          path: cleanPath,
          keywords: Array.isArray(body.keywords)
            ? body.keywords
            : String(body.keywords || "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    return res.json({ success: true, seo, message: "SEO configuration saved successfully!" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to save SEO config" });
  }
}

// DELETE /api/seo/:id - delete SEO config
export async function deleteSeo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await SeoMetaModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "SEO config not found" });
    }
    return res.json({ success: true, message: "SEO config deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to delete SEO config" });
  }
}
