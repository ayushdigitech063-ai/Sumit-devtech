import { Request, Response } from "express";
import { SiteSettingsModel } from "../models/SiteSettings";

// GET /api/settings/public - public header contacts
export async function getPublicSettings(_req: Request, res: Response) {
  try {
    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = await SiteSettingsModel.create({});
    }
    return res.json({ success: true, settings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to fetch settings" });
  }
}

// PUT /api/settings - update settings (admin)
export async function updateSettings(req: Request, res: Response) {
  try {
    let settings = await SiteSettingsModel.findOne();
    if (!settings) {
      settings = new SiteSettingsModel(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    return res.json({ success: true, settings, message: "Header & contact settings updated successfully!" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to update settings" });
  }
}
