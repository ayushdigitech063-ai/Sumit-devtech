import { Request, Response } from "express";
import { Project } from "../models/Project";

// Initial seed if empty so user already has their 12 live websites
const INITIAL_PROJECTS = [
  { title: "The Murtiwala", category: "E-Commerce Website", url: "https://www.themurtiwala.com/", image: "https://sumitdevtech.com/assets/images/the-murtiwala.webp", featured: true },
  { title: "Bsix Engineering", category: "Corporate Website", url: "https://bsixengineering.com/", image: "https://sumitdevtech.com/assets/images/bsix-engineering.webp", featured: true },
  { title: "Maharashtra Cab", category: "Booking Website", url: "https://maharashtracab.com/", image: "https://sumitdevtech.com/assets/images/maharashtra-cab.webp", featured: true },
  { title: "Dev Tourist Company", category: "Travel Website", url: "https://devtouristcompany.com/", image: "https://sumitdevtech.com/assets/images/devtourist-company.webp", featured: false },
  { title: "Fingerprint Technology", category: "IT Services Website", url: "https://fingerprintit.com/", image: "https://sumitdevtech.com/assets/images/finger-print.webp", featured: false },
  { title: "Snorkeling Barbados", category: "Tourism Website", url: "https://snorkelingbarbados.com/", image: "https://sumitdevtech.com/assets/images/snorkeling-barbados.webp", featured: false },
  { title: "Uss Pest Control", category: "Service Website", url: "https://usspestcon.in/", image: "https://sumitdevtech.com/assets/images/usspest-con.webp", featured: false },
  { title: "Sunway Solution", category: "Business Website", url: "https://sunwaysolution.in/", image: "https://sumitdevtech.com/assets/images/sunwaysolution.webp", featured: false },
  { title: "Melet Foods", category: "E-Commerce Website", url: "https://melet.in/", image: "https://sumitdevtech.com/assets/images/melet-ai.webp", featured: false },
  { title: "Doctor Bawa", category: "Medical Website", url: "https://doctorbawa.com/", image: "https://sumitdevtech.com/assets/images/doctor-bawa.webp", featured: false },
  { title: "Tivonn Haven", category: "Hospitality Website", url: "https://tivonnhaven.ca/", image: "https://sumitdevtech.com/assets/images/tivonnhaven-ai.webp", featured: false },
  { title: "Cherry Cabs", category: "Taxi Booking Website", url: "https://cherrycabs.in/", image: "https://sumitdevtech.com/assets/images/cherrycabs.webp", featured: false },
];

// Public & Admin: Get all projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    let count = await Project.countDocuments();
    if (count === 0) {
      await Project.insertMany(INITIAL_PROJECTS);
    }

    const { category, featured } = req.query;
    const query: any = {};
    if (category && category !== "all" && category !== "See All") {
      query.category = { $regex: category, $options: "i" };
    }
    if (featured === "true") {
      query.featured = true;
    }

    const projects = await Project.find(query).sort({ createdAt: -1 }).lean();
    return res.json({ success: true, data: projects });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Add new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, category, url, image, description, featured } = req.body;

    if (!title || !url) {
      return res.status(400).json({ success: false, message: "Title and URL are required." });
    }

    const project = await Project.create({
      title,
      category: category || "Web Development",
      url,
      image: image || "/images/projects/case-thumb.png",
      description: description || "",
      featured: featured === true || featured === "true",
    });

    return res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: project,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
    if (!project) return res.status(404).json({ success: false, message: "Project not found." });

    return res.json({ success: true, message: "Project updated.", data: project });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    return res.json({ success: true, message: "Project deleted successfully." });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
