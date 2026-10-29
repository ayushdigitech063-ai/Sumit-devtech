import { Schema, model } from "mongoose";

const whyChooseCardSchema = new Schema(
  {
    stepNumber: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
  },
  { _id: false }
);

const whyChooseSchema = new Schema(
  {
    tagline: { type: String, default: "WHY CHOOSE", trim: true },
    heading: { type: String, default: "Why Choose Sumit DevTech", trim: true },
    subheading: {
      type: String,
      default: "We don't just build websites. We stick around after the job is done.",
      trim: true,
    },
    cards: {
      type: [whyChooseCardSchema],
      default: [
        {
          stepNumber: "01",
          title: "Expertise & Experience",
          description: "10 years in this field and a team of 15+ developers who have actually solved real problems - not just followed tutorials.",
          image: { url: "", publicId: "" },
        },
        {
          stepNumber: "02",
          title: "End-to-End Services",
          description: "Design, development, SEO, deployment, maintenance - you won't need to chase five different vendors. We handle it all.",
          image: { url: "", publicId: "" },
        },
        {
          stepNumber: "03",
          title: "Always Available",
          description: "Call us, WhatsApp us, message us. We pick up. No ticket systems, no waiting 48 hours for a reply.",
          image: { url: "", publicId: "" },
        },
        {
          stepNumber: "04",
          title: "We Mean What We Say",
          description: "Deadlines, budgets, deliverables - we commit, and we deliver. No excuses, no ghosting after payment.",
          image: { url: "", publicId: "" },
        },
      ],
    },
  },
  { timestamps: true }
);

export const WhyChoose = model("WhyChoose", whyChooseSchema);