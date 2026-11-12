import { Request, Response } from "express";
import { uploadToCloudinary } from "../config/cloudinary";

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "No image file provided." });
    }

    const file = files[0];
    const uploaded = await uploadToCloudinary(file.buffer, "sumit_devtech");

    return res.status(200).json({
      success: true,
      url: uploaded.url,
      publicId: uploaded.publicId,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to upload image." });
  }
};
