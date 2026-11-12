import { Schema, model, type Document } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  role?: string;
  company: string;
  projectType: string;
  rating: number;
  text: string;
  featured: boolean;
  avatarUrl?: string;
  avatarBg?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true, default: "" },
    company: { type: String, required: true, trim: true },
    projectType: { type: String, required: true, trim: true, default: "Web Development" },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    text: { type: String, required: true, trim: true },
    featured: { type: Boolean, default: false },
    avatarUrl: { type: String, trim: true, default: "" },
    avatarBg: { type: String, trim: true, default: "bg-blue-600" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial = model<ITestimonial>("Testimonial", testimonialSchema);
