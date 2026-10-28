import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { env } from "../config/env";
import { User } from "../models/User";

async function main() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD first.");
  if (password.length < 12) throw new Error("Use a password of at least 12 characters.");

  await mongoose.connect(env.MONGODB_URI);
  const exists = await User.findOne({ email });
  if (exists) {
    console.log("Admin already exists:", email);
  } else {
    await User.create({ name: "Admin", email, passwordHash: await bcrypt.hash(password, 12) });
    console.log("Admin created:", email);
  }
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});