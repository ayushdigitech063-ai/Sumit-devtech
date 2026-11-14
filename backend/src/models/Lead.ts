import mongoose, { Document, Schema } from "mongoose";

export type LeadSource = "contact_form" | "quote_popup" | "chatbot" | "package_unlock" | "career_apply";
export type LeadStatus = "New" | "In progress" | "Converted" | "Cancelled" | "Won" | "Lost";

export interface ILead extends Document {
  name: string;
  email?: string;
  phone: string;
  service?: string;
  source: LeadSource;
  status: LeadStatus;
  message?: string;
  countryCode?: string;
  metadata?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: "" },
    phone: { type: String, required: true, trim: true },
    service: { type: String, default: "General Inquiry" },
    source: {
      type: String,
      enum: ["contact_form", "quote_popup", "chatbot", "package_unlock", "career_apply"],
      default: "contact_form",
    },
    status: {
      type: String,
      enum: ["New", "In progress", "Converted", "Cancelled", "Won", "Lost"],
      default: "New",
    },
    message: { type: String, default: "" },
    countryCode: { type: String, default: "+91" },
    metadata: { type: Schema.Types.Mixed, default: {} },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Lead = mongoose.model<ILead>("Lead", LeadSchema);
