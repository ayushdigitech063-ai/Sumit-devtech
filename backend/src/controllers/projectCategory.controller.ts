import { Request, Response } from "express";
import { ProjectCategory } from "../models/ProjectCategory";

const DEFAULT_CATEGORIES = [
  "App Development",
  "Web Application",
  "SEO Services",
  "CRM & ERP",
  "E-Commerce Website",
  "Corporate Website",
  "Booking Website",
  "Travel Website",
  "IT Services Website",
  "Tourism Website",
  "Service Website",
  "Medical Website",
];

// Public & Admin: Get all categories
export const getProjectCategories = async (_req: Request, res: Response) => {
  try {
    const count = await ProjectCategory.countDocuments();
    if (count === 0) {
      await ProjectCategory.insertMany(
        DEFAULT_CATEGORIES.map((name, index) => ({ name, order: index, isActive: true }))
      );
    }

    const categories = await ProjectCategory.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).lean();
    return res.json({ success: true, data: categories });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Add a new category
export const createProjectCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const trimmed = name.trim();
    const existing = await ProjectCategory.findOne({ name: { $regex: `^${trimmed}$`, $options: "i" } });
    if (existing) {
      return res.status(409).json({ success: false, message: "Category already exists" });
    }

    const count = await ProjectCategory.countDocuments();
    const category = await ProjectCategory.create({ name: trimmed, order: count, isActive: true });
    return res.status(201).json({ success: true, message: "Category added", data: category });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete a category
export const deleteProjectCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ProjectCategory.findByIdAndDelete(id);
    return res.json({ success: true, message: "Category deleted" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
