import mongoose, { Document, Schema } from "mongoose";

export interface IPackagePlan extends Document {
  name: string;
  category: string; // e.g. "Web Design & Development", "E-Commerce", "Digital Marketing"
  tagline: string;
  price: string;
  period: string; // "one-time", "monthly", "yearly"
  deliveryTime: string;
  idealFor: string;
  popular: boolean;
  features: string[];
  ctaText: string;
  ctaHref: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PackagePlanSchema = new Schema<IPackagePlan>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, default: "Web Development" },
    tagline: { type: String, default: "" },
    price: { type: String, required: true, trim: true },
    period: { type: String, default: "one-time" },
    deliveryTime: { type: String, default: "7 - 10 Days" },
    idealFor: { type: String, default: "" },
    popular: { type: Boolean, default: false },
    features: { type: [String], default: [] },
    ctaText: { type: String, default: "Get Started" },
    ctaHref: { type: String, default: "/contact-us" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const PackagePlan = mongoose.model<IPackagePlan>("PackagePlan", PackagePlanSchema);
