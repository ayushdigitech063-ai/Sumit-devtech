import { Router } from "express";
import {
  getProjectCategories,
  createProjectCategory,
  deleteProjectCategory,
} from "../controllers/projectCategory.controller";

const router = Router();

router.get("/", getProjectCategories);
router.post("/", createProjectCategory);
router.delete("/:id", deleteProjectCategory);

export default router;
