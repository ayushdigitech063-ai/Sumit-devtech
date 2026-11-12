import { Router } from "express";
import {
  login,
  logout,
  me,
  updateProfile,
  changePassword,
} from "../controllers/auth.controller";
import { requireAuth } from "../middelwares/auth";
import { loginLimiter } from "../middelwares/rate-limit";

const router = Router();
router.post("/login", loginLimiter, login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);
router.put("/profile", requireAuth, updateProfile);
router.post("/change-password", requireAuth, changePassword);

export default router;
