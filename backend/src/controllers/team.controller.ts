import type { Request, Response, NextFunction } from "express";
import { TeamMember } from "../models/TeamMember";

const initialSeedTeam = [
  {
    name: "Sumit Kumar Mishra",
    role: "Founder & CEO",
    image: "/images/teams/owner-sumit-kumar-mishra.png",
    bio: "Visionary leader with 10+ years of experience in web development, strategic planning, and digital solutions.",
    linkedin: "https://www.linkedin.com/in/sumit-devtech-a905b33a6/",
    instagram: "https://www.instagram.com/sumitdevtech/",
    order: 1,
    isActive: true,
  },
  {
    name: "Sunil Ved",
    role: "Project Manager",
    image: "/images/teams/sunil-ved-manager.webp",
    bio: "Experienced project manager ensuring smooth workflow execution, client communication, and timely project delivery.",
    linkedin: "",
    instagram: "",
    order: 2,
    isActive: true,
  },
  {
    name: "Sunil Kumawat",
    role: "Senior Web Developer",
    image: "/images/teams/sunil-kumawat-web-application-developer.png",
    bio: "Full-stack developer passionate about building responsive, scalable, and high-performance web applications.",
    linkedin: "",
    instagram: "",
    order: 3,
    isActive: true,
  },
];

export async function getTeamMembers(req: Request, res: Response, next: NextFunction) {
  try {
    const activeOnly = req.query.activeOnly === "true";
    const filter = activeOnly ? { isActive: true } : {};

    let list = await TeamMember.find(filter).sort({ order: 1, createdAt: 1 });

    // Seed initial team if completely empty
    if (list.length === 0 && !activeOnly) {
      await TeamMember.insertMany(initialSeedTeam);
      list = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    }

    return res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
}

export async function createTeamMember(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, role, image, bio, linkedin, instagram, twitter, github, order, isActive } = req.body;

    if (!name || !role) {
      return res.status(400).json({ success: false, message: "Name and role are required." });
    }

    const member = await TeamMember.create({
      name,
      role,
      image: image || "/images/teams/owner-sumit-kumar-mishra.png",
      bio: bio || "",
      linkedin: linkedin || "",
      instagram: instagram || "",
      twitter: twitter || "",
      github: github || "",
      order: typeof order === "number" ? order : 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
}

export async function updateTeamMember(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const member = await TeamMember.findByIdAndUpdate(id, updateData, { new: true });
    if (!member) {
      return res.status(404).json({ success: false, message: "Team member not found." });
    }

    return res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
}

export async function deleteTeamMember(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const member = await TeamMember.findByIdAndDelete(id);
    if (!member) {
      return res.status(404).json({ success: false, message: "Team member not found." });
    }

    return res.json({ success: true, message: "Team member deleted successfully." });
  } catch (err) {
    next(err);
  }
}
