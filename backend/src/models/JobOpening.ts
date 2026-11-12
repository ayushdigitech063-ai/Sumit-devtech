import mongoose, { Document, Schema } from "mongoose";

export interface IJobOpening extends Document {
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string; // "Full-time", "Part-time", "Internship", "Remote"
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  isOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobOpeningSchema = new Schema<IJobOpening>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    department: { type: String, required: true, default: "Engineering" },
    location: { type: String, default: "Jaipur, India / Remote" },
    type: { type: String, default: "Full-time" },
    experience: { type: String, default: "1-3 Years" },
    summary: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    niceToHave: { type: [String], default: [] },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const JobOpening = mongoose.model<IJobOpening>("JobOpening", JobOpeningSchema);
