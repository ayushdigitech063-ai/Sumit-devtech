import { Router } from "express";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonial.controller";
import { requireAuth } from "../middelwares/auth";

const router = Router();

// Public: Get testimonials
router.get("/", getTestimonials);

// Protected: Admin CRUD
router.post("/", requireAuth, createTestimonial);
router.put("/:id", requireAuth, updateTestimonial);
router.delete("/:id", requireAuth, deleteTestimonial);

export default router;
