import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { Testimonial } from "../models/Testimonial";
import { PackagePlan } from "../models/PackagePlan";
import { Project } from "../models/Project";
import { JobOpening } from "../models/JobOpening";

const testimonialsSeed = [
  {
    name: "Dr. Vilaksh Jain",
    role: "Founder & Lead Dermatologist",
    company: "Derma Pro Center",
    projectType: "Medical & Healthcare",
    rating: 5,
    featured: true,
    avatarBg: "bg-emerald-600",
    text: "Sumit DevTech built our entire clinic appointment booking portal and patient management flow. Patient walk-ins and direct website bookings grew by 240% within the first 60 days.",
    order: 1,
  },
  {
    name: "Vikram Singhania",
    role: "Managing Director",
    company: "Bsix Engineering Works",
    projectType: "Corporate & Industrial",
    rating: 5,
    featured: true,
    avatarBg: "bg-blue-600",
    text: "From technical machinery specifications to complex export quotation forms, their team understood our B2B industrial requirements instantly. Outstanding speed and communication.",
    order: 2,
  },
  {
    name: "Aakash Mehta",
    role: "Co-Founder",
    company: "Goddess Craft Global",
    projectType: "E-Commerce & Retail",
    rating: 5,
    featured: true,
    avatarBg: "bg-purple-600",
    text: "Our Shopify and custom Next.js eCommerce store needed international payment gateways, currency conversion, and automated courier tracking. Sumit DevTech delivered ahead of schedule.",
    order: 3,
  },
  {
    name: "Rajendra Pareek",
    role: "Operations Head",
    company: "Maharashtra Intercity Cabs",
    projectType: "Booking & Logistics",
    rating: 5,
    featured: false,
    avatarBg: "bg-amber-600",
    text: "Real-time automated fare calculation, Google Maps routing, and WhatsApp instant booking alerts transformed our taxi service operations in Mumbai and Pune.",
    order: 4,
  },
  {
    name: "Siddharth Chawla",
    role: "CEO",
    company: "CloudCore SaaS Platforms",
    projectType: "Web Applications & SaaS",
    rating: 5,
    featured: false,
    avatarBg: "bg-rose-600",
    text: "Clean scalable React architecture, pixel-perfect Tailwind CSS components, and zero-defect API integration. They function just like an internal senior tech team.",
    order: 5,
  },
  {
    name: "Pooja Rathore",
    role: "Director of Marketing",
    company: "Heritage Tourist & Travels",
    projectType: "Travel & Hospitality",
    rating: 5,
    featured: false,
    avatarBg: "bg-teal-600",
    text: "Our inbound travel leads skyrocketed. Their organic on-page SEO structure got our key tour package pages ranking on Google page 1 across Rajasthan.",
    order: 6,
  },
];

async function seedSecondBatch() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sumit-devtech";
  await mongoose.connect(uri);

  console.log("Seeding Testimonials...");
  for (const item of testimonialsSeed) {
    await Testimonial.findOneAndUpdate({ name: item.name }, item, { upsert: true, returnDocument: 'after' });
  }

  console.log("Second Batch Seeding Complete!");
  await mongoose.disconnect();
}

seedSecondBatch().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
