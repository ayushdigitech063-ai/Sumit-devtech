import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder = "company_website",
  resourceType: "image" | "raw" | "auto" = "auto",
  originalFilename?: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const isPdfOrDoc = originalFilename?.match(/\.(pdf|doc|docx)$/i) || resourceType === "raw";
    
    // For PDFs/docs, upload as type 'upload' and access_mode 'public' so they can be viewed directly
    const options: any = {
      folder,
      resource_type: isPdfOrDoc ? "raw" : resourceType,
      type: "upload",
      access_mode: "public",
    };

    if (originalFilename) {
      // Keep filename clean
      options.public_id = `${Date.now()}_${originalFilename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error || !result) return reject(error);
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
    uploadStream.end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
}
