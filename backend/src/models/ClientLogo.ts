import mongoose, { Document, Schema } from "mongoose";

export interface IClientLogo extends Document {
  name: string;
  logo: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ClientLogoSchema = new Schema<IClientLogo>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ClientLogo = mongoose.model<IClientLogo>("ClientLogo", ClientLogoSchema);
