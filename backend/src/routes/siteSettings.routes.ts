import { Router } from "express";
import { getPublicSettings, updateSettings } from "../controllers/siteSettings.controller";
import { requireAuth } from "../middelwares/auth";

const router = Router();

router.get("/public", getPublicSettings);
router.put("/", requireAuth, updateSettings);

export default router;
