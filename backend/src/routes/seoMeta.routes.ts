import { Router } from "express";
import {
  getAllSeo,
  getSeoByPath,
  saveSeo,
  deleteSeo,
} from "../controllers/seoMeta.controller";

const router = Router();

router.get("/", getAllSeo);
router.get("/by-path", getSeoByPath);
router.post("/", saveSeo);
router.delete("/:id", deleteSeo);

export default router;
