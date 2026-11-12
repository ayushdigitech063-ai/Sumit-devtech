import { Router } from "express";
import { uploadMedia } from "../controllers/upload.controller";
import { handleUpload } from "../middelwares/upload";
import { requireAuth } from "../middelwares/auth";

const router = Router();

// Upload image (requires auth, accepts single or multiple images)
router.post("/", requireAuth, handleUpload, uploadMedia);

export default router;
