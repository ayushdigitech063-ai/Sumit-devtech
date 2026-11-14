import { Router } from "express";
import {
  getJobOpenings,
  getJobOpeningBySlug,
  createJobOpening,
  updateJobOpening,
  deleteJobOpening,
  submitApplicationForm,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/career.controller";
import { requireAuth } from "../middelwares/auth";
import { handleResumeUpload } from "../middelwares/upload";

const router = Router();

// Public
router.get("/openings", getJobOpenings);
router.get("/openings/:slug", getJobOpeningBySlug);
router.post("/apply", handleResumeUpload, submitApplicationForm);

// Admin-only: Job Openings
router.post("/openings", requireAuth, createJobOpening);
router.put("/openings/:id", requireAuth, updateJobOpening);
router.delete("/openings/:id", requireAuth, deleteJobOpening);

// Admin-only: Applications & Resumes
router.get("/applications", requireAuth, getApplications);
router.patch("/applications/:id/status", requireAuth, updateApplicationStatus);
router.delete("/applications/:id", requireAuth, deleteApplication);

export default router;
