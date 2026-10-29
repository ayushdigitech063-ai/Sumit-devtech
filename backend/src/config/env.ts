  import "dotenv/config";
  import { z } from "zod";

  const schema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(5000),
    MONGODB_URI: z.string().min(1),
    MONGODB_DB: z.string().min(1).default("sumitdevtech"),
    JWT_SECRET: z.string().min(32, "must be at least 32 characters"),
    JWT_EXPIRES_IN: z.string().default("7d"),
    CLIENT_URL: z.string().url().default("http://localhost:3000"),

    // Cloudinary keys env me add hui hain
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET is required"),
  });

  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    console.error(
      "Invalid environment variables:\n" +
        parsed.error.issues.map((i) => `- ${i.path.join(".")}: ${i.message}`).join("\n")
    );
    process.exit(1);
  }
  export const env = parsed.data;