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

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const authUser = res.locals.user;
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const existing = await User.findOne({ email: email.toLowerCase(), _id: { $ne: authUser.id } });
    if (existing) {
      return res.status(409).json({ message: "Email is already taken by another account." });
    }

    const updated = await User.findByIdAndUpdate(
      authUser.id,
      { name: name.trim(), email: email.toLowerCase().trim() },
      { new: true }
    );

    return res.json({
      message: "Profile updated successfully.",
      user: { id: updated?.id, name: updated?.name, email: updated?.email, role: updated?.role },
    });
  } catch (err) {
    next(err);
  }
}

export async function changePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const authUser = res.locals.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required." });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters long." });
    }

    const user = await User.findById(authUser.id).select("+passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const match = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!match) {
      return res.status(400).json({ message: "Current password does not match." });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();

    return res.json({ message: "Password updated successfully." });
  } catch (err) {
    next(err);
  }
}
