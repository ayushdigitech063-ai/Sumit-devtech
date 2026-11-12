import type { Request, Response, NextFunction } from "express";
import multer from "multer";

const storage = multer.memoryStorage();

// Generic upload for images (projects, blogs, etc.)
const genericUpload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 20,                  // Supports up to 20 images
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  },
}).any();

// Career resume upload allowing PDF, DOC, DOCX, and images
const resumeUpload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 2,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMime = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];
    if (allowedMime.includes(file.mimetype) || file.originalname.match(/\.(pdf|doc|docx)$/i)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX resume files are allowed."));
    }
  },
}).any();

export function handleUpload(req: Request, res: Response, next: NextFunction) {
  genericUpload(req, res, (err: unknown) => {
    if (err) return next(err);
    next();
  });
}

export function handleResumeUpload(req: Request, res: Response, next: NextFunction) {
  resumeUpload(req, res, (err: unknown) => {
    if (err) return next(err);
    next();
  });
}
