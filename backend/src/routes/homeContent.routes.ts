import { Router } from "express";
import {
  getHeroBanner,
  updateHeroBanner,
  getAbout,
  updateAbout,
  getWorkProcess,
  updateWorkProcess,
  getWhyLead,
  updateWhyLead,
  getWhyChoose,
  updateWhyChoose,
  getHomeProjects,     
  updateHomeProjects,
} from "../controllers/homeContent.controller";
import { requireAuth } from "../middelwares/auth";
import { handleUpload } from "../middelwares/upload";

const router = Router();

// 1. Hero Banner
router.get("/hero", getHeroBanner);
router.put("/hero", requireAuth, updateHeroBanner);

// 2. About
router.get("/about", getAbout);
router.put("/about", requireAuth, handleUpload, updateAbout);

// 3. Work Process (8 Steps)
router.get("/work-process", getWorkProcess);
router.put("/work-process", requireAuth, updateWorkProcess);

// 4. Why We Lead (6 Cards)
router.get("/why-lead", getWhyLead);
router.put("/why-lead", requireAuth, updateWhyLead);

// 5. Why Choose (4 Cards with Images)
router.get("/why-choose", getWhyChoose);
router.put("/why-choose", requireAuth, handleUpload, updateWhyChoose);

router.get("/projects", getHomeProjects);
router.put("/projects", requireAuth, handleUpload, updateHomeProjects);

export default router;