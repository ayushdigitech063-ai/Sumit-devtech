import { Request, Response } from "express";
import { Lead } from "../models/Lead";

// Public endpoint to create lead from any form / popup / chatbot
export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, service, source, message, countryCode, metadata } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name and phone are required." });
    }

    const lead = await Lead.create({
      name,
      email: email || "",
      phone,
      service: service || "General Inquiry",
      source: source || "contact_form",
      status: "New",
      message: message || "",
      countryCode: countryCode || "+91",
      metadata: metadata || {},
      isRead: false,
    });

    return res.status(201).json({
      success: true,
      message: "Lead submitted successfully.",
      data: lead,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to create lead." });
  }
};

// Admin endpoint: List leads with search, filter, pagination
export const getLeads = async (req: Request, res: Response) => {
  try {
    const { status, source, search, limit = "50", page = "1" } = req.query;

    const query: any = {};
    if (status && status !== "all") query.status = status;
    if (source && source !== "all") query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { service: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const [leads, total, unreadCount] = await Promise.all([
      Lead.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      Lead.countDocuments(query),
      Lead.countDocuments({ isRead: false }),
    ]);

    return res.json({
      success: true,
      data: leads,
      total,
      unreadCount,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin endpoint: Get recent unread notifications for bell
export const getNotifications = async (_req: Request, res: Response) => {
  try {
    const [recentLeads, unreadCount] = await Promise.all([
      Lead.find().sort({ createdAt: -1 }).limit(10).lean(),
      Lead.countDocuments({ isRead: false }),
    ]);

    return res.json({
      success: true,
      unreadCount,
      notifications: recentLeads,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin endpoint: Mark single or all notifications/leads as read
export const markNotificationsAsRead = async (req: Request, res: Response) => {
  try {
    const { leadId } = req.body;
    if (leadId) {
      await Lead.findByIdAndUpdate(leadId, { isRead: true });
    } else {
      await Lead.updateMany({ isRead: false }, { isRead: true });
    }
    return res.json({ success: true, message: "Marked as read." });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin endpoint: Update lead status (New -> In progress -> Won -> Lost)
export const updateLeadStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(id, { status, isRead: true }, { new: true });
    if (!lead) return res.status(404).json({ success: false, message: "Lead not found" });

    return res.json({ success: true, data: lead });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin endpoint: Delete lead
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Lead.findByIdAndDelete(id);
    return res.json({ success: true, message: "Lead deleted successfully." });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin endpoint: Dashboard stats summary
export const getDashboardSummary = async (_req: Request, res: Response) => {
  try {
    const [totalLeads, newLeads, inProgressLeads, wonLeads, latestLeads] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: "New" }),
      Lead.countDocuments({ status: "In progress" }),
      Lead.countDocuments({ status: "Won" }),
      Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    // Service split breakdown
    const serviceAggregation = await Lead.aggregate([
      { $group: { _id: "$service", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 4 },
    ]);

    return res.json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        inProgressLeads,
        wonLeads,
      },
      latestLeads,
      serviceSplit: serviceAggregation,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
