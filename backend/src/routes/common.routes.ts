import { Router, Request, Response } from "express";
import { Faq } from "../models/Faq";
import { Technology } from "../models/Technology";
import { Industry } from "../models/Industry";

const router = Router();

// GET /api/common/faqs
router.get("/faqs", async (_req: Request, res: Response) => {
  try {
    const items = await Faq.find().sort({ order: 1, createdAt: 1 });
    return res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/common/technologies
router.get("/technologies", async (_req: Request, res: Response) => {
  try {
    const items = await Technology.find().sort({ order: 1, createdAt: 1 });
    return res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/common/industries
router.get("/industries", async (_req: Request, res: Response) => {
  try {
    const items = await Industry.find().sort({ order: 1, createdAt: 1 });
    return res.status(200).json({ success: true, data: items });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
