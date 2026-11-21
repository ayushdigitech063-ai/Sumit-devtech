import mongoose, { Document, Schema } from "mongoose";

export interface IIndustryItem {
  name: string;
  iconName: string; // e.g. "ShoppingCart", "Plane", "HeartPulse"
  image?: string;
  text: string;
  order: number;
}

export interface IIndustryDocument extends Document, IIndustryItem {
  createdAt: Date;
  updatedAt: Date;
}

const IndustrySchema = new Schema<IIndustryDocument>(
  {
    name: { type: String, required: true, trim: true },
    iconName: { type: String, default: "Building2", trim: true },
    image: { type: String, default: "", trim: true },
    text: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Industry = mongoose.model<IIndustryDocument>("Industry", IndustrySchema);
