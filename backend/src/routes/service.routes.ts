import { Router } from "express";
import {
  getServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller";

const router = Router();

// Public routes
router.get("/", getServices);
router.get("/:slug", getServiceBySlug);

// Admin-managed routes
router.post("/", createService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

export default router;
