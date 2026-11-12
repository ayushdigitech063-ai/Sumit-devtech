import { Request, Response } from "express";
import { Blog } from "../models/Blog";

const INITIAL_BLOGS = [
  {
    title: "Mastering Next.js 15: Architectural Patterns for Sub-Second Web Applications",
    slug: "nextjs-15-enterprise-performance-guide",
    excerpt: "A deep technical dive into Partial Prerendering (PPR), React Server Components streaming, and edge caching strategies that deliver flawless enterprise UX.",
    content: "Next.js 15 represents a quantum leap in full-stack JavaScript capabilities, bridging the divide between dynamic real-time data streaming and static CDN edge delivery. Understanding these primitives enables modern engineering teams to achieve sub-second LCP scores while maintaining complex interactive state.",
    coverImage: "/images/projects/case-thumb2.png",
    category: "Web Development",
    readTime: "6 min read",
    authorName: "Sumit Kumar",
    authorRole: "Lead Solutions Architect",
    featured: true,
    published: true,
    tags: ["Next.js", "React", "Performance", "Web Architecture"],
  },
  {
    title: "Zero-Trust Cloud Architecture: Hardening Next-Gen DevOps Pipelines",
    slug: "zero-trust-cloud-architecture-devops",
    excerpt: "Why traditional perimeter security fails in distributed microservices and how cryptographic identity, mutual TLS, and automated policy engines establish absolute integrity.",
    content: "The concept of corporate firewall perimeters has dissolved into distributed multi-cloud clusters and remote edge runtimes. Zero-trust architecture assumes breach by default, requiring continuous programmatic verification of cryptographic identity across every microservice hop.",
    coverImage: "/images/projects/case-thumb4.png",
    category: "Cybersecurity",
    readTime: "8 min read",
    authorName: "Security Team",
    authorRole: "Infrastructure & Security",
    featured: true,
    published: true,
    tags: ["DevOps", "Cloud", "Cybersecurity", "Zero Trust"],
  },
];

// Helper to generate slug
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Public: Get all published blogs
export const getBlogs = async (req: Request, res: Response) => {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      await Blog.insertMany(INITIAL_BLOGS);
    }

    const { category, search, tag } = req.query;
    const query: any = { published: true };

    if (category && category !== "All" && category !== "All Articles") {
      query.category = category;
    }
    if (tag) {
      query.tags = tag;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 }).lean();
    return res.json({ success: true, data: blogs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Public: Get single blog by slug
export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    return res.json({ success: true, data: blog });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all blogs (including drafts)
export const getAdminBlogs = async (_req: Request, res: Response) => {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      await Blog.insertMany(INITIAL_BLOGS);
    }

    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    return res.json({ success: true, data: blogs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Create new blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, excerpt, content, category, coverImage, authorName, authorRole, featured, published, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

    let slug = slugify(title);
    const existing = await Blog.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt: excerpt || title,
      content,
      category: category || "Web Development",
      coverImage: coverImage || "/images/projects/case-thumb2.png",
      authorName: authorName || "Sumit Kumar",
      authorRole: authorRole || "Lead Solutions Architect",
      featured: featured === true || featured === "true",
      published: published !== false && published !== "false",
      tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()) : ["Web Development"],
    });

    return res.status(201).json({ success: true, message: "Blog created successfully.", data: blog });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.title && !updateData.slug) {
      updateData.slug = slugify(updateData.title);
    }
    if (typeof updateData.tags === "string") {
      updateData.tags = updateData.tags.split(",").map((t: string) => t.trim());
    }

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    return res.json({ success: true, message: "Blog updated successfully.", data: blog });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    return res.json({ success: true, message: "Blog deleted successfully." });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
