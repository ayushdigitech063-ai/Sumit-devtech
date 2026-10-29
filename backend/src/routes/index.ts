import { Router } from "express";
import authRoutes from "./auth.routes";
import homeContent from "./homeContent.routes"

const router = Router();
router.get("/health", (_req, res) => res.json({ ok: true }));
router.use("/auth", authRoutes);
router.use("/home",homeContent)

export default router;