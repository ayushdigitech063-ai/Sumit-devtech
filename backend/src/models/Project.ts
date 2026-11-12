import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  category: string;
  description?: string;
  url: string;
  image: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, default: "Web Development" },
    description: { type: String, default: "" },
    url: { type: String, required: true, trim: true },
    image: { type: String, default: "/images/projects/case-thumb.png" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
