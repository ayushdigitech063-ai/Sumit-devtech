import { Schema, model } from "mongoose";

const metricCardSchema = new Schema(
  {
    value: { type: String, required: true, trim: true },
    label: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const aboutSchema = new Schema(
  {
    tagline: { type: String, default: "WHO WE ARE", trim: true },
    heading: {
      type: String,
      default: "Website Design & Development Company in Mansarovar, Jaipur",
      trim: true,
    },
    description: {
      type: String,
      default:
        "We work on everything - simple HTML sites, WordPress, eCommerce stores, custom web applications, and business management systems. Every website we build loads fast, works on mobile, and is set up properly for search engines from day one.",
      trim: true,
    },
    experienceYears: { type: String, default: "10+", trim: true },
    experienceLabel: { type: String, default: "Years of Expertise in Business", trim: true },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    badges: {
      type: [String],
      default: ["Google Partner", "2024 Excellence Award"],
    },
    buttonText: { type: String, default: "Know more About us", trim: true },
    buttonLink: { type: String, default: "#about", trim: true },
    metricCards: {
      type: [metricCardSchema],
      default: [
        { value: "15+", label: "Full-time Developers" },
        { value: "500+", label: "Happy Clients" },
        { value: "1,000+", label: "Projects Delivered" },
        { value: "100%", label: "Client Satisfaction" },
      ],
    },
  },
  { timestamps: true }
);

export const About = model("About", aboutSchema);