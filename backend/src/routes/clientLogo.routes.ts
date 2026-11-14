import { Router } from "express";
import { requireAuth } from "../middelwares/auth";
import {
  getActiveClientLogos,
  getAllClientLogosAdmin,
  createClientLogo,
  updateClientLogo,
  deleteClientLogo,
} from "../controllers/clientLogo.controller";

const router = Router();

// Public route for home page marquee
router.get("/", getActiveClientLogos);

// Admin routes
router.get("/admin/all", requireAuth, getAllClientLogosAdmin);
router.post("/admin", requireAuth, createClientLogo);
router.put("/admin/:id", requireAuth, updateClientLogo);
router.delete("/admin/:id", requireAuth, deleteClientLogo);

export default router;
