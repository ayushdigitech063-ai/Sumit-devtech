import { Schema, model } from "mongoose";

const stepItemSchema = new Schema(
  {
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const workProcessSchema = new Schema(
  {
    tagline: { type: String, default: "WORK PROCESS", trim: true },
    heading: {
      type: String,
      default: "Our Proven Process to Deliver Successful Digital Solutions",
      trim: true,
    },
    description: {
      type: String,
      default:
        "We don't jump straight into designing. Every project goes through a proper process - so nothing gets missed, and you know what's happening at every step.",
      trim: true,
    },
    steps: {
      type: [stepItemSchema],
      default: [
        { stepNumber: 1, title: "Plan & Research", description: "We learn your business, your goals and your customers first. Only then do we start." },
        { stepNumber: 2, title: "Wireframe & Prototyping", description: "Before any code, we map the layout and show you how the site will look and flow." },
        { stepNumber: 3, title: "UI/UX Design", description: "Clean, easy-to-use screens that fit your brand and keep visitors on your site." },
        { stepNumber: 4, title: "Development", description: "Solid code that loads fast, works on every screen and has on-page SEO built in." },
        { stepNumber: 5, title: "Testing & QA", description: "We check every page on every device and screen size before anything goes live." },
        { stepNumber: 6, title: "Launch", description: "Once you approve, we launch the site and stay available if anything needs fixing." },
        { stepNumber: 7, title: "Training & Handover", description: "We walk you through the admin, so you can update text, images and blogs yourself." },
        { stepNumber: 8, title: "Support & Growth", description: "Bug fixes, updates and 24/7 support, plus SEO work to help your site keep growing." },
      ],
    },
  },
  { timestamps: true }
);

export const WorkProcess = model("WorkProcess", workProcessSchema);