import { Router } from "express";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";
import { requireAuth } from "../middelwares/auth";

const router = Router();

// Public: view projects on website
router.get("/", getAllProjects);

// Admin-only: add, edit, delete
router.post("/", requireAuth, createProject);
router.put("/:id", requireAuth, updateProject);
router.delete("/:id", requireAuth, deleteProject);

export default router;
