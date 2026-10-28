import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
  await mongoose.connect(env.MONGODB_URI, { dbName : env.MONGODB_DB});
  console.log("MongoDB connected", mongoose.connection.name);
}