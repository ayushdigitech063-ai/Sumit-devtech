import type { Request, Response, NextFunction } from "express";
import multer from "multer";

const storage = multer.memoryStorage();

const genericUpload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 20,                  // Supports up to 20 images in a single request
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  },
}).any();

export function handleUpload(req: Request, res: Response, next: NextFunction) {
  genericUpload(req, res, (err: unknown) => {
    if (err) return next(err);
    next();
  });
}