import { Router } from "express";
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../controllers/team.controller";
import { requireAuth } from "../middelwares/auth";

const router = Router();

// Public: Get all team members
router.get("/", getTeamMembers);

// Protected: Super Admin CRUD
router.post("/", requireAuth, createTeamMember);
router.put("/:id", requireAuth, updateTeamMember);
router.delete("/:id", requireAuth, deleteTeamMember);

export default router;
