import mongoose, { Document, Schema } from "mongoose";

export interface ICityLocation extends Document {
  slug: string;
  name: string;
  state: string;
  country: string;
  tagline: string;
  phone?: string;
  popularAreas: string[];
  localKeywords: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CityLocationSchema = new Schema<ICityLocation>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, default: "India", trim: true },
    tagline: { type: String, default: "", trim: true },
    phone: { type: String, default: "+91 96765 43210" },
    popularAreas: { type: [String], default: [] },
    localKeywords: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CityLocation = mongoose.model<ICityLocation>("CityLocation", CityLocationSchema);
