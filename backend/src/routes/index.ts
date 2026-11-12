import { Router } from "express";
import authRoutes from "./auth.routes";
import homeContent from "./homeContent.routes";
import leadRoutes from "./lead.routes";
import projectRoutes from "./project.routes";
import blogRoutes from "./blog.routes";
import uploadRoutes from "./upload.routes";
import packageRoutes from "./package.routes";
import careerRoutes from "./career.routes";

const router = Router();
router.get("/health", (_req, res) => res.json({ ok: true }));
router.use("/auth", authRoutes);
router.use("/home", homeContent);
router.use("/leads", leadRoutes);
router.use("/projects", projectRoutes);
router.use("/blogs", blogRoutes);
router.use("/upload", uploadRoutes);
router.use("/packages", packageRoutes);
router.use("/careers", careerRoutes);

export default router;
