import { Schema, model } from "mongoose";

const projectItemSchema = new Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  domain: { type: String, default: "", trim: true },
  projectUrl: { type: String, default: "", trim: true },
  image: {
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
  },
});

const homeProjectSectionSchema = new Schema(
  {
    tagline: { type: String, default: "OUR PROJECTS" },
    heading: { type: String, default: "Check Out Our Work" },
    buttonText: { type: String, default: "View All Projects" },
    // buttonLink: { type: String, default: "/projects" },
    projects: [projectItemSchema],
  },
  { timestamps: true }
);

export const HomeProjectSection = model("HomeProjectSection", homeProjectSectionSchema);