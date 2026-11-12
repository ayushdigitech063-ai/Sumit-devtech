import { Router } from "express";
import {
  createLead,
  getLeads,
  getNotifications,
  markNotificationsAsRead,
  updateLeadStatus,
  deleteLead,
  getDashboardSummary,
} from "../controllers/lead.controller";
import { requireAuth } from "../middelwares/auth";

const router = Router();

// Public route to capture leads from any frontend form / popup / bot
router.post("/", createLead);

// Protected Admin routes
router.get("/summary", requireAuth, getDashboardSummary);
router.get("/notifications", requireAuth, getNotifications);
router.post("/notifications/read", requireAuth, markNotificationsAsRead);
router.get("/", requireAuth, getLeads);
router.patch("/:id/status", requireAuth, updateLeadStatus);
router.delete("/:id", requireAuth, deleteLead);

export default router;
