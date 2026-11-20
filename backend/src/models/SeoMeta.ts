import mongoose, { Document, Schema } from "mongoose";

export interface ISeoMeta extends Document {
  path: string; // e.g. "/", "/about-company", "/services/website-design"
  pageName: string; // e.g. "Home Page", "Website Design Service"
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  robots: string; // e.g. "index, follow", "noindex, follow"
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  customSchemaJson?: string; // JSON-LD schema string
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SeoMetaSchema = new Schema<ISeoMeta>(
  {
    path: { type: String, required: true, unique: true, trim: true, lowercase: true },
    pageName: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    keywords: { type: [String], default: [] },
    canonicalUrl: { type: String, trim: true },
    robots: { type: String, default: "index, follow", trim: true },
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImage: { type: String, trim: true },
    twitterCard: { type: String, default: "summary_large_image", trim: true },
    customSchemaJson: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const SeoMetaModel = mongoose.model<ISeoMeta>("SeoMeta", SeoMetaSchema);
