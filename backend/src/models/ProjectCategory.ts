import mongoose, { Document, Schema } from "mongoose";

export interface IProjectCategory extends Document {
  name: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectCategorySchema = new Schema<IProjectCategory>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ProjectCategory = mongoose.model<IProjectCategory>("ProjectCategory", ProjectCategorySchema);
