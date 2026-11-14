import { Request, Response } from "express";
import { CityLocation } from "../models/CityLocation";

// Initial seed data if collection is empty
const defaultCities = [
  {
    slug: "in-jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    country: "India",
    tagline: "Premier Web Design & Digital Growth Agency in Pink City",
    popularAreas: ["Mansarovar", "Malviya Nagar", "Vaishali Nagar", "C-Scheme", "Raja Park", "Tonk Road"],
    localKeywords: [
      "best website development company in jaipur",
      "seo services in jaipur",
      "web design agency jaipur rajasthan",
      "ecommerce developers in jaipur",
    ],
    isActive: true,
  },
  {
    slug: "in-delhi-ncr",
    name: "Delhi NCR",
    state: "Delhi",
    country: "India",
    tagline: "Enterprise Web Development & Performance SEO for Delhi, Gurgaon & Noida",
    popularAreas: ["Gurgaon Cyber City", "Noida Sector 62", "South Delhi", "Connaught Place", "Nehru Place"],
    localKeywords: [
      "website development company in delhi ncr",
      "seo agency in gurgaon",
      "web designers in noida",
      "custom ecommerce development delhi",
    ],
    isActive: true,
  },
  {
    slug: "in-mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    country: "India",
    tagline: "High-Converting Web Design & Growth Marketing for Mumbai Businesses",
    popularAreas: ["BKC", "Andheri West", "Lower Parel", "Nariman Point", "Powai", "Navi Mumbai"],
    localKeywords: [
      "website development company in mumbai",
      "seo services in mumbai",
      "web designers in andheri bkc",
      "ecommerce portal developers mumbai",
    ],
    isActive: true,
  },
  {
    slug: "in-bangalore",
    name: "Bangalore",
    state: "Karnataka",
    country: "India",
    tagline: "Next-Gen Tech Stacks & Growth SEO for Startups & Scaleups in India's Silicon Valley",
    popularAreas: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Electronic City", "Bellandur"],
    localKeywords: [
      "website development company in bangalore",
      "next js development agency bangalore",
      "b2b saas web development koramangala",
      "seo services bangalore",
    ],
    isActive: true,
  },
  {
    slug: "in-pune",
    name: "Pune",
    state: "Maharashtra",
    country: "India",
    tagline: "Engineered Websites & ROI-Driven Organic SEO for Pune Enterprises & Startups",
    popularAreas: ["Hinjewadi IT Park", "Kalyani Nagar", "Viman Nagar", "Kothrud", "Baner", "Wakad"],
    localKeywords: [
      "web development company in pune",
      "seo agency hinjewadi pune",
      "custom software and web design pune",
      "wordpress development pune",
    ],
    isActive: true,
  },
  {
    slug: "in-dubai",
    name: "Dubai",
    state: "Dubai",
    country: "UAE",
    tagline: "High-ROI International Web Design, E-Commerce & SEO for Middle East Growth",
    popularAreas: ["Downtown Dubai", "Business Bay", "Dubai Marina", "JLT", "DIFC", "Deira"],
    localKeywords: [
      "web design company dubai uae",
      "seo agency in dubai",
      "ecommerce development dubai",
      "custom portal development uae",
    ],
    isActive: true,
  },
];

export async function getCityLocations(req: Request, res: Response) {
  try {
    const count = await CityLocation.countDocuments();
    if (count === 0) {
      await CityLocation.insertMany(defaultCities);
    }

    const { activeOnly } = req.query;
    const filter = activeOnly === "true" ? { isActive: true } : {};
    const cities = await CityLocation.find(filter).sort({ createdAt: -1 });

    return res.json({ success: true, cities });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function createCityLocation(req: Request, res: Response) {
  try {
    const { name, state, country, slug, tagline, popularAreas, localKeywords } = req.body;
    if (!name || !state) {
      return res.status(400).json({ success: false, message: "City Name and State are required." });
    }

    const formattedSlug = slug
      ? slug.trim().toLowerCase()
      : `in-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

    const existing = await CityLocation.findOne({ slug: formattedSlug });
    if (existing) {
      return res.status(409).json({ success: false, message: `City with slug '${formattedSlug}' already exists.` });
    }

    const newCity = await CityLocation.create({
      name,
      state,
      country: country || "India",
      slug: formattedSlug,
      tagline: tagline || `Premier Web Design & Digital Growth in ${name}`,
      popularAreas: Array.isArray(popularAreas) ? popularAreas : (popularAreas ? String(popularAreas).split(",").map((s) => s.trim()) : []),
      localKeywords: Array.isArray(localKeywords) ? localKeywords : (localKeywords ? String(localKeywords).split(",").map((s) => s.trim()) : []),
      isActive: true,
    });

    return res.status(201).json({ success: true, city: newCity });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateCityLocation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, state, country, tagline, popularAreas, localKeywords, isActive } = req.body;

    const city = await CityLocation.findById(id);
    if (!city) {
      return res.status(404).json({ success: false, message: "City location not found" });
    }

    if (name !== undefined) city.name = name;
    if (state !== undefined) city.state = state;
    if (country !== undefined) city.country = country;
    if (tagline !== undefined) city.tagline = tagline;
    if (isActive !== undefined) city.isActive = isActive;
    if (popularAreas !== undefined) {
      city.popularAreas = Array.isArray(popularAreas) ? popularAreas : String(popularAreas).split(",").map((s) => s.trim());
    }
    if (localKeywords !== undefined) {
      city.localKeywords = Array.isArray(localKeywords) ? localKeywords : String(localKeywords).split(",").map((s) => s.trim());
    }

    await city.save();
    return res.json({ success: true, city });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteCityLocation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const city = await CityLocation.findByIdAndDelete(id);
    if (!city) {
      return res.status(404).json({ success: false, message: "City not found" });
    }
    return res.json({ success: true, message: `City '${city.name}' deleted successfully` });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
