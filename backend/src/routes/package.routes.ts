import { Router } from "express";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/package.controller";
import { requireAuth } from "../middelwares/auth";

const router = Router();

// Public
router.get("/", getPackages);

// Admin-only
router.post("/", requireAuth, createPackage);
router.put("/:id", requireAuth, updatePackage);
router.delete("/:id", requireAuth, deletePackage);

export default router;
