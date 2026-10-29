import { Schema, model } from "mongoose";

const statItemSchema = new Schema(
  {
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const heroBannerSchema = new Schema(
  {
    locationBadge: {
      type: String,
      default: "Now booking projects - Jaipur, India",
      trim: true,
    },
    baseHeading: {
      type: String,
      default: "Everything you need to Grow Digitally",
      trim: true,
    },
    serviceHighlights: {
      development: { type: String, default: "Website Development", trim: true },
      appDevelopment: { type: String, default: "App Development", trim: true },
      seo: { type: String, default: "SEO Growth", trim: true },
      marketing: { type: String, default: "Marketing & Security", trim: true },
    },
    description: {
      type: String,
      default:
        "Fast, beautiful, SEO-ready websites, apps and digital marketing — from startups to enterprises. Fixed pricing, zero ghosting.",
      trim: true,
    },
    primaryButtonText: { type: String, default: "Get Free Consultation", trim: true },
    primaryButtonLink: { type: String, default: "#contact", trim: true },
    secondaryButtonText: { type: String, default: "View Portfolio", trim: true },
    secondaryButtonLink: { type: String, default: "#portfolio", trim: true },
    stats: {
      type: [statItemSchema],
      default: [
        { value: "500+", label: "Happy clients" },
        { value: "1000+", label: "Projects done" },
        { value: "4.9★", label: "Google rating" },
      ],
    },
  },
  { timestamps: true }
);

export const HeroBanner = model("HeroBanner", heroBannerSchema);