import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import { Faq } from "../models/Faq";
import { Technology } from "../models/Technology";
import { Industry } from "../models/Industry";
import { Testimonial } from "../models/Testimonial";
import { PackagePlan } from "../models/PackagePlan";
import { Project } from "../models/Project";
import { JobOpening } from "../models/JobOpening";

const IMG = "https://sumitdevtech.com/assets/images";

const faqsData = [
  { question: "How much does a website cost?", answer: "Website cost depends on the scope and complexity - a high-conversion business site starts differently from a full-scale eCommerce storefront or a custom React web application. We provide detailed, itemized proposals with zero hidden costs. We believe in 100% transparent, value-driven pricing.", category: "general", order: 1 },
  { question: "How long does website development take?", answer: "Standard professional websites are typically delivered in 5-7 working days. More sophisticated platforms, such as multi-vendor eCommerce stores or custom SaaS dashboards, take approximately 2-4 weeks. We always establish clear milestone roadmaps before development begins.", category: "general", order: 2 },
  { question: "Can I update the website content after it goes live?", answer: "Yes, absolutely. All our websites are built with intuitive content management capabilities. You can easily modify text, images, blogs, and products without any programming knowledge. We also provide full 1-on-1 walkthrough training.", category: "general", order: 3 },
  { question: "Does my website rank on Google automatically?", answer: "Every website we develop is engineered with complete on-page technical SEO: semantic HTML5 schema, OpenGraph tags, automated XML sitemaps, fast TTFB, and Core Web Vitals optimization. To achieve top rankings for competitive keywords, we also offer dedicated organic SEO and conversion growth services.", category: "general", order: 4 },
];

const technologiesData = [
  // CMS & Framework
  { name: "WordPress", category: "CMS & Framework", icon: `${IMG}/icons/WordPress_blue_logo.svg`, order: 1 },
  { name: "Shopify", category: "CMS & Framework", icon: `${IMG}/icons/shopify.svg`, order: 2 },
  { name: "Laravel", category: "CMS & Framework", icon: `${IMG}/icons/laravel.svg`, order: 3 },
  { name: "Next.js", category: "CMS & Framework", icon: `${IMG}/icons/nextjs.svg`, order: 4 },
  // Website Design
  { name: "HTML5", category: "Website Design", icon: `${IMG}/icons/html5.svg`, order: 5 },
  { name: "CSS3", category: "Website Design", icon: `${IMG}/icons/css3.svg`, order: 6 },
  { name: "Tailwind CSS", category: "Website Design", icon: `${IMG}/icons/tailwind-css.svg`, order: 7 },
  { name: "Bootstrap 5", category: "Website Design", icon: `${IMG}/icons/bootstrap-5.svg`, order: 8 },
  // Web Applications
  { name: "React", category: "Web Applications", icon: `${IMG}/icons/react.svg`, order: 9 },
  { name: "Node.js", category: "Web Applications", icon: `${IMG}/icons/nodejs.svg`, order: 10 },
  { name: "PHP", category: "Web Applications", icon: `${IMG}/icons/php.svg`, order: 11 },
  { name: "JavaScript", category: "Web Applications", icon: `${IMG}/icons/javascript.svg`, order: 12 },
  // Digital Marketing
  { name: "SEO", category: "Digital Marketing", icon: `${IMG}/icons/Search-Engine-Optimization.svg`, order: 13 },
  { name: "Google Ads", category: "Digital Marketing", icon: `${IMG}/icons/ads.svg`, order: 14 },
  { name: "Social Media", category: "Digital Marketing", icon: `${IMG}/icons/instagram.svg`, order: 15 },
  { name: "Content Marketing", category: "Digital Marketing", icon: `${IMG}/icons/content-writing.svg`, order: 16 },
  // API Services
  { name: "REST APIs", category: "API Services", icon: `${IMG}/icons/api.svg`, order: 17 },
  { name: "Payment Gateways", category: "API Services", icon: `${IMG}/icons/paypal.svg`, order: 18 },
];

const industriesData = [
  { name: "Ecommerce", iconName: "ShoppingCart", image: `${IMG}/Ecommerce.webp`, text: "We build high-performing eCommerce websites that drive sales and enhance customer experience. From Shopify and WooCommerce to fully customized online stores, we focus on secure payments, mobile optimization, speed, and conversion-focused design to maximize revenue.", order: 1 },
  { name: "Travel", iconName: "Plane", text: "Booking-ready travel and tourism websites that showcase destinations, packages and enquiries in a way that turns visitors into travelers.", order: 2 },
  { name: "Healthcare", iconName: "HeartPulse", text: "Trustworthy, clear and easy-to-contact websites for clinics, doctors and hospitals, with appointment-friendly design.", order: 3 },
  { name: "Fitness", iconName: "Dumbbell", text: "Energetic websites for gyms, studios and trainers, with class schedules, memberships and easy sign-ups.", order: 4 },
  { name: "Entertainment", iconName: "Film", text: "Engaging, media-rich websites and platforms built to hold attention and grow your audience.", order: 5 },
  { name: "Education", iconName: "GraduationCap", text: "Institute websites, course platforms and learning portals that make admissions and learning simple.", order: 6 },
  { name: "Restaurant", iconName: "Utensils", text: "Appetizing websites with menus, online ordering and reservations that bring more people through the door.", order: 7 },
  { name: "Finance", iconName: "Landmark", text: "Secure, credible and compliant-minded websites for financial services, advisors and fintech products.", order: 8 },
  { name: "Blogging", iconName: "BookOpen", text: "Fast, SEO-friendly blogs with clean reading layouts and easy publishing tools.", order: 9 },
];

async function seed() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/sumit-devtech";
  console.log("Connecting to Mongo:", uri ? "URI found" : "No URI");
  await mongoose.connect(uri);

  console.log("Seeding FAQs...");
  for (const item of faqsData) {
    await Faq.findOneAndUpdate({ question: item.question }, item, { upsert: true, new: true });
  }

  console.log("Seeding Technologies...");
  for (const item of technologiesData) {
    await Technology.findOneAndUpdate({ name: item.name }, item, { upsert: true, new: true });
  }

  console.log("Seeding Industries...");
  for (const item of industriesData) {
    await Industry.findOneAndUpdate({ name: item.name }, item, { upsert: true, new: true });
  }

  console.log("Seeding Complete!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
