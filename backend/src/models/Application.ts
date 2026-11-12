import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  jobId?: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience?: string;
  location?: string;
  portfolioLink?: string;
  coverNote?: string;
  resumeUrl: string;
  resumeFileName?: string;
  status: "Under Review" | "Shortlisted" | "Rejected" | "Hired";
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    jobId: { type: String, default: "" },
    jobTitle: { type: String, required: true, default: "General Application" },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    experience: { type: String, default: "" },
    location: { type: String, default: "" },
    portfolioLink: { type: String, default: "" },
    coverNote: { type: String, default: "" },
    resumeUrl: { type: String, required: true },
    resumeFileName: { type: String, default: "resume.pdf" },
    status: {
      type: String,
      enum: ["Under Review", "Shortlisted", "Rejected", "Hired"],
      default: "Under Review",
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Application = mongoose.model<IApplication>("Application", ApplicationSchema);
