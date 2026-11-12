import { Request, Response } from "express";
import { JobOpening } from "../models/JobOpening";
import { Application } from "../models/Application";
import { uploadToCloudinary } from "../config/cloudinary";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const INITIAL_OPENINGS = [
  {
    title: "Senior Next.js & React Developer",
    slug: "nextjs-react-developer",
    department: "Frontend Engineering",
    location: "Jaipur, India / Remote",
    type: "Full-time",
    experience: "3+ Years",
    summary: "Lead frontend architecture, build high-performance client applications with Next.js 15, SSR/SSG, Tailwind CSS, and TypeScript.",
    responsibilities: [
      "Architect and build responsive, accessible, sub-second web applications.",
      "Work closely with UI/UX designers and backend engineers.",
      "Conduct code reviews and mentor junior developers.",
    ],
    requirements: [
      "3+ years of professional React and Next.js experience.",
      "Deep understanding of TypeScript, server components, and API integration.",
      "Experience with Tailwind CSS and Framer Motion.",
    ],
    isOpen: true,
  },
  {
    title: "WordPress & WooCommerce Specialist",
    slug: "wordpress-developer",
    department: "Web Development",
    location: "Jaipur, India",
    type: "Full-time",
    experience: "2+ Years",
    summary: "Develop bespoke WordPress themes, WooCommerce stores, custom post types, and high-converting landing pages.",
    responsibilities: [
      "Develop custom WordPress themes and plugin extensions.",
      "Optimize page load speeds, SEO performance, and security hardening.",
    ],
    requirements: [
      "Strong proficiency in PHP, WordPress REST API, and ACF.",
      "Familiarity with WooCommerce hooks and custom payment integrations.",
    ],
    isOpen: true,
  },
];

// Public: Get all job openings
export const getJobOpenings = async (_req: Request, res: Response) => {
  try {
    const count = await JobOpening.countDocuments();
    if (count === 0) {
      await JobOpening.insertMany(INITIAL_OPENINGS);
    }
    const jobs = await JobOpening.find().sort({ createdAt: -1 }).lean();
    return res.json({ success: true, data: jobs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Create job opening
export const createJobOpening = async (req: Request, res: Response) => {
  try {
    const { title, department, location, type, experience, summary, responsibilities, requirements, niceToHave, isOpen } = req.body;
    if (!title || !summary) {
      return res.status(400).json({ success: false, message: "Job title and summary are required." });
    }

    let slug = slugify(title);
    const existing = await JobOpening.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const job = await JobOpening.create({
      title,
      slug,
      department: department || "Engineering",
      location: location || "Jaipur, India / Remote",
      type: type || "Full-time",
      experience: experience || "1-3 Years",
      summary,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : typeof responsibilities === "string" ? responsibilities.split("\n").map(r => r.trim()).filter(Boolean) : [],
      requirements: Array.isArray(requirements) ? requirements : typeof requirements === "string" ? requirements.split("\n").map(r => r.trim()).filter(Boolean) : [],
      niceToHave: Array.isArray(niceToHave) ? niceToHave : typeof niceToHave === "string" ? niceToHave.split("\n").map(r => r.trim()).filter(Boolean) : [],
      isOpen: isOpen !== false && isOpen !== "false",
    });

    return res.status(201).json({ success: true, message: "Job opening created.", data: job });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update job opening
export const updateJobOpening = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (typeof updateData.responsibilities === "string") {
      updateData.responsibilities = updateData.responsibilities.split("\n").map((r: string) => r.trim()).filter(Boolean);
    }
    if (typeof updateData.requirements === "string") {
      updateData.requirements = updateData.requirements.split("\n").map((r: string) => r.trim()).filter(Boolean);
    }

    const job = await JobOpening.findByIdAndUpdate(id, updateData, { new: true });
    if (!job) return res.status(404).json({ success: false, message: "Job not found." });

    return res.json({ success: true, message: "Job opening updated.", data: job });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete job opening
export const deleteJobOpening = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await JobOpening.findByIdAndDelete(id);
    return res.json({ success: true, message: "Job opening deleted." });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Public: Submit job application with resume file
export const submitApplicationForm = async (req: Request, res: Response) => {
  try {
    const { jobId, jobTitle, fullName, email, phone, experience, location, link, coverNote } = req.body;
    const files = req.files as Express.Multer.File[];

    let resumeUrl = "";
    let resumeFileName = "resume.pdf";

    if (files && files.length > 0) {
      const file = files[0];
      resumeFileName = file.originalname || "resume.pdf";
      const uploaded = await uploadToCloudinary(file.buffer, "career_resumes");
      resumeUrl = uploaded.url;
    } else if (req.body.resumeUrl) {
      resumeUrl = req.body.resumeUrl;
    }

    if (!fullName || !email || !phone) {
      return res.status(400).json({ success: false, message: "Full name, email and phone are required." });
    }

    if (!resumeUrl) {
      return res.status(400).json({ success: false, message: "Resume file is required." });
    }

    const application = await Application.create({
      jobId: jobId || "",
      jobTitle: jobTitle || "General Application",
      fullName,
      email,
      phone,
      experience: experience || "",
      location: location || "",
      portfolioLink: link || "",
      coverNote: coverNote || "",
      resumeUrl,
      resumeFileName,
      status: "Under Review",
      isRead: false,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      data: application,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to submit application." });
  }
};

// Admin: Get all applications with search and filter
export const getApplications = async (req: Request, res: Response) => {
  try {
    const { status, search } = req.query;
    const query: any = {};
    if (status && status !== "all") query.status = status;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { jobTitle: { $regex: search, $options: "i" } },
      ];
    }

    const [applications, unreadCount] = await Promise.all([
      Application.find(query).sort({ createdAt: -1 }).lean(),
      Application.countDocuments({ isRead: false }),
    ]);

    return res.json({ success: true, data: applications, unreadCount });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update application status
export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const app = await Application.findByIdAndUpdate(id, { status, isRead: true }, { new: true });
    if (!app) return res.status(404).json({ success: false, message: "Application not found." });

    return res.json({ success: true, data: app });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete application
export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Application.findByIdAndDelete(id);
    return res.json({ success: true, message: "Application deleted." });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
