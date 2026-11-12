import { Request, Response } from "express";
import { PackagePlan } from "../models/PackagePlan";

const INITIAL_PACKAGES = [
  {
    name: "Static Website",
    category: "Web Development",
    tagline: "A fast, professional online presence.",
    price: "₹14,999",
    period: "one-time",
    deliveryTime: "7 - 10 Days",
    idealFor: "Freelancers, local shops, and small businesses needing online presence",
    popular: false,
    features: [
      "Up to 5 pages (Home, About, Services, Gallery, Contact)",
      "Custom responsive design for mobile, tablet, and desktop",
      "Contact form with email notifications",
      "Basic on-page SEO (titles, meta tags, sitemap)",
      "Google Maps and WhatsApp chat button",
      "Free SSL setup",
    ],
    ctaText: "Get Static Website",
    ctaHref: "/contact-us?plan=static",
  },
  {
    name: "Dynamic Website",
    category: "Web Development",
    tagline: "A website you can update yourself and grow over time.",
    price: "₹29,999",
    period: "one-time",
    deliveryTime: "12 - 15 Days",
    idealFor: "Growing businesses, startups, service companies wanting dynamic content",
    popular: true,
    features: [
      "Up to 10 - 15 dynamic pages",
      "Admin dashboard to update posts, images & services",
      "Interactive lead inquiry forms & chatbot",
      "Speed optimization score 90+",
      "Social media integration & Google Analytics",
      "1 Year free domain & cloud hosting support",
    ],
    ctaText: "Get Dynamic Website",
    ctaHref: "/contact-us?plan=dynamic",
  },
  {
    name: "E-Commerce Store",
    category: "Web Development",
    tagline: "Complete online shop with cart, payment gateway & order manager.",
    price: "₹49,999",
    period: "one-time",
    deliveryTime: "20 - 25 Days",
    idealFor: "Retail brands, fashion, jewelry, and D2C online stores",
    popular: false,
    features: [
      "Unlimited products & categories catalogue",
      "Razorpay, Stripe & COD payment gateway integration",
      "Order tracking & automated invoice generation",
      "Coupon codes, discount engine & inventory alerts",
      "WhatsApp automated order notifications",
      "Dedicated SSL, automated backups & security hardening",
    ],
    ctaText: "Launch E-Commerce Store",
    ctaHref: "/contact-us?plan=ecommerce",
  },
];

// Public: Get all packages
export const getPackages = async (_req: Request, res: Response) => {
  try {
    const count = await PackagePlan.countDocuments();
    if (count === 0) {
      await PackagePlan.insertMany(INITIAL_PACKAGES);
    }
    const packages = await PackagePlan.find().sort({ order: 1, createdAt: 1 }).lean();
    return res.json({ success: true, data: packages });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Create package
export const createPackage = async (req: Request, res: Response) => {
  try {
    const { name, category, tagline, price, period, deliveryTime, idealFor, popular, features, ctaText, ctaHref } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: "Package name and price are required." });
    }

    const featureList = Array.isArray(features)
      ? features
      : typeof features === "string"
      ? features.split("\n").map((f: string) => f.trim()).filter(Boolean)
      : [];

    const plan = await PackagePlan.create({
      name,
      category: category || "Web Development",
      tagline: tagline || "",
      price,
      period: period || "one-time",
      deliveryTime: deliveryTime || "7 - 10 Days",
      idealFor: idealFor || "",
      popular: popular === true || popular === "true",
      features: featureList,
      ctaText: ctaText || "Get Started",
      ctaHref: ctaHref || "/contact-us",
    });

    return res.status(201).json({ success: true, message: "Package created successfully.", data: plan });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update package
export const updatePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (typeof updateData.features === "string") {
      updateData.features = updateData.features.split("\n").map((f: string) => f.trim()).filter(Boolean);
    }

    const plan = await PackagePlan.findByIdAndUpdate(id, updateData, { new: true });
    if (!plan) return res.status(404).json({ success: false, message: "Package not found." });

    return res.json({ success: true, message: "Package updated successfully.", data: plan });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete package
export const deletePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await PackagePlan.findByIdAndDelete(id);
    return res.json({ success: true, message: "Package deleted successfully." });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
