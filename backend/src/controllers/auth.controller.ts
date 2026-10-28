import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/User";
import { loginSchema } from "../validators/auth.schema";

export const COOKIE_NAME = "admin_token";

const cookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// Compared against when the email is unknown, so response time doesn't reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 12);

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Email and password are required." });
    }
    const { email, password } = parsed.data;

    const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
    const passwordOk = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);

    if (!user || !passwordOk || !user.isActive) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    await User.updateOne({ _id: user._id }, { lastLoginAt: new Date() });

    const token = jwt.sign({ sub: user.id, role: user.role }, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
    });

    res.cookie(COOKIE_NAME, token, cookieOptions);
    return res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

export function logout(_req: Request, res: Response) {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined });
  return res.json({ message: "Signed out." });
}

export function me(_req: Request, res: Response) {
  return res.json({ user: res.locals.user });
}