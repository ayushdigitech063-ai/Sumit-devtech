import { Schema, model } from "mongoose";

const featureItemSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, default: "", trim: true },
  },
  { _id: false }
);

const whyLeadSchema = new Schema(
  {
    tagline: { type: String, default: "WHY WE LEAD", trim: true },
    heading: {
      type: String,
      default: "Leading Website Design & Development Company in Jaipur, India",
      trim: true,
    },
    features: {
      type: [featureItemSchema],
      default: [
        { title: "10+ Years of Mastery", description: "A decade of engineering high-performance websites and digital products in Jaipur.", icon: "award" },
        { title: "100% Fixed Pricing", description: "Strict zero hidden costs. What we quote in our proposal is exactly what you pay.", icon: "wallet" },
        { title: "Multi-Industry Domain", description: "Proven digital solutions across healthcare, retail, real estate, education, and SaaS.", icon: "layers" },
        { title: "Global Client Footprint", description: "Active clients across USA, UK, UAE & Saudi Arabia, plus trusted white-label overflow.", icon: "globe" },
        { title: "Zero Ghosting Guarantee", description: "Direct developer access and fast response times. We stay with you long after launch.", icon: "headphones" },
        { title: "Full-Stack E-Commerce", description: "Revenue-focused online stores with custom payment gateways, CRM, and speed tuning.", icon: "cart" },
      ],
    },
  },
  { timestamps: true }
);

export const WhyLead = model("WhyLead", whyLeadSchema);