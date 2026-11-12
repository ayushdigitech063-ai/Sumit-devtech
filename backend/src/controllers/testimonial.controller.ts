import type { Request, Response, NextFunction } from "express";
import { Testimonial } from "../models/Testimonial";

const initialSeedData = [
  {
    name: "Dr. Vilaksh Jain",
    role: "Founder & Lead Dermatologist",
    company: "Derma Pro Center",
    projectType: "Medical & Healthcare",
    rating: 5,
    featured: true,
    avatarBg: "bg-emerald-500",
    text: "Got my dermatology clinic website made from Sumit DevTech. Clean design, loads lightning fast, and patients can easily find what they need and book consults online. Very happy with the professional approach and post-launch support.",
    order: 1,
  },
  {
    name: "Anand Kishore",
    role: "Managing Director",
    company: "Melet.in",
    projectType: "E-Commerce",
    rating: 5,
    featured: true,
    avatarBg: "bg-orange-500",
    text: "I needed a proper eCommerce setup for Melet, and these guys delivered exactly that. Smooth checkout, clean responsive design, and they were always available whenever I had questions during payment gateway integration.",
    order: 2,
  },
  {
    name: "Dr. Manish Ganwani",
    role: "Cosmetic Surgeon",
    company: "drmanishganwani.com",
    projectType: "Medical & Healthcare",
    rating: 5,
    featured: true,
    avatarBg: "bg-blue-600",
    text: "Professional team through and through. They understood what a medical authority website needs: trustworthy design, clear clinical information, and frictionless contact options. No endless back and forth, just clean execution.",
    order: 3,
  },
  {
    name: "Jatin Prajapati",
    role: "Operations Head",
    company: "Sunway Solution",
    projectType: "Enterprise & SaaS",
    rating: 5,
    featured: false,
    avatarBg: "bg-purple-600",
    text: "Sunway Solution needed a corporate business website that looked credible to enterprise clients. Sumit DevTech built exactly that. Good proactive communication throughout and delivered right on schedule.",
    order: 4,
  },
  {
    name: "Rajesh Sharma",
    role: "Chief Operating Officer",
    company: "LogiCore Solutions",
    projectType: "Enterprise & SaaS",
    rating: 5,
    featured: false,
    avatarBg: "bg-amber-600",
    text: "Sumit DevTech delivered an enterprise cloud platform that completely transformed how we run our 12 warehouse facilities. The real-time inventory visibility alone paid for the project within 3 months.",
    order: 5,
  },
  {
    name: "Priya Mehta",
    role: "Marketing Director",
    company: "CloudAxis",
    projectType: "Web Development",
    rating: 5,
    featured: false,
    avatarBg: "bg-rose-500",
    text: "Our marketing team can now update content themselves via the headless CMS, and the site runs with sub-second speeds. We have seen a measurable 40% lift in inbound demo requests since launch.",
    order: 6,
  },
  {
    name: "Sneha Kapoor",
    role: "Founder",
    company: "BloomCart India",
    projectType: "Digital Growth",
    rating: 5,
    featured: false,
    avatarBg: "bg-teal-600",
    text: "Our marketing spend felt like a black hole before Sumit DevTech rebuilt our SEO structure and acquisition funnels. We scaled to ₹1.38Cr monthly revenue with an exceptional 3.8x ROAS.",
    order: 7,
  },
];

export async function getTestimonials(req: Request, res: Response, next: NextFunction) {
  try {
    let list = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    // Seed if empty
    if (list.length === 0) {
      await Testimonial.insertMany(initialSeedData);
      list = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    }
    return res.json(list);
  } catch (err) {
    next(err);
  }
}

export async function createTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, role, company, projectType, rating, text, featured, avatarUrl, avatarBg, order } = req.body;
    if (!name || !company || !text) {
      return res.status(400).json({ message: "Name, company and review text are required." });
    }

    const item = await Testimonial.create({
      name,
      role: role || "",
      company,
      projectType: projectType || "Web Development",
      rating: Number(rating) || 5,
      text,
      featured: Boolean(featured),
      avatarUrl: avatarUrl || "",
      avatarBg: avatarBg || "bg-blue-600",
      order: Number(order) || 0,
    });

    return res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function updateTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const updated = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Testimonial not found." });
    }
    return res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteTestimonial(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Testimonial not found." });
    }
    return res.json({ message: "Testimonial deleted successfully." });
  } catch (err) {
    next(err);
  }
}
