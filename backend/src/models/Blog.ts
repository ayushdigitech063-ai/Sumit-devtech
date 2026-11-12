import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readTime: string;
  authorName: string;
  authorRole: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: "/images/projects/case-thumb2.png" },
    category: { type: String, default: "Web Development" },
    readTime: { type: String, default: "5 min read" },
    authorName: { type: String, default: "Sumit Kumar" },
    authorRole: { type: String, default: "Lead Solutions Architect" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    tags: { type: [String], default: ["Web Development", "Technology"] },
  },
  { timestamps: true }
);

export const Blog = mongoose.model<IBlog>("Blog", BlogSchema);
