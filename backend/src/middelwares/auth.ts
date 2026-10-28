import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/User";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.admin_token;
    if (!token) return res.status(401).json({ message: "Not authenticated." });

    const payload = jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) return res.status(401).json({ message: "Not authenticated." });

    res.locals.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    next();
  } catch {
    return res.status(401).json({ message: "Not authenticated." });
  }
}