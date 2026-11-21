import mongoose, { Document, Schema } from "mongoose";

export interface IFaqItem {
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export interface IFaqDocument extends Document, IFaqItem {
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaqDocument>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: { type: String, default: "general", trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Faq = mongoose.model<IFaqDocument>("Faq", FaqSchema);
