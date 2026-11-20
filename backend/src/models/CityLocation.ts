import mongoose, { Document, Schema } from "mongoose";

export interface ICityFaq {
  question: string;
  answer: string;
}

export interface ICityLocation extends Document {
  slug: string;
  name: string;
  state: string;
  country: string;
  tagline: string;
  phone?: string;
  popularAreas: string[];
  localKeywords: string[];
  faqs: ICityFaq[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CityFaqSchema = new Schema<ICityFaq>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false }
);

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
    faqs: { type: [CityFaqSchema], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const CityLocation = mongoose.model<ICityLocation>("CityLocation", CityLocationSchema);
