import mongoose, { Document, Schema } from "mongoose";

export interface ITechnologyItem {
  name: string;
  category: string; // e.g. "CMS & Framework", "Website Design", "Web Applications", "Digital Marketing", "API Services"
  icon: string;
  order: number;
}

export interface ITechnologyDocument extends Document, ITechnologyItem {
  createdAt: Date;
  updatedAt: Date;
}

const TechnologySchema = new Schema<ITechnologyDocument>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    icon: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Technology = mongoose.model<ITechnologyDocument>("Technology", TechnologySchema);
