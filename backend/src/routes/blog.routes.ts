import { Router } from "express";
import {
  getBlogs,
  getBlogBySlug,
  getAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";
import { requireAuth } from "../middelwares/auth";

const router = Router();

// Public routes for website
router.get("/", getBlogs);
router.get("/detail/:slug", getBlogBySlug);

// Admin routes
router.get("/admin/all", requireAuth, getAdminBlogs);
router.post("/", requireAuth, createBlog);
router.put("/:id", requireAuth, updateBlog);
router.delete("/:id", requireAuth, deleteBlog);

export default router;
