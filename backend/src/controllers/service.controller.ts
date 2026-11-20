import { Request, Response } from "express";
import { ServiceModel } from "../models/Service";

// GET /api/services - list all services (public or admin)
export async function getServices(req: Request, res: Response) {
  try {
    const { includeInactive } = req.query;
    const filter = includeInactive === "true" ? {} : { isActive: true };
    const services = await ServiceModel.find(filter).sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, services });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to fetch services" });
  }
}

// GET /api/services/:slug - get single service by slug (public)
export async function getServiceBySlug(req: Request, res: Response) {
  try {
    const slug = String(req.params.slug || "").toLowerCase();
    const service = await ServiceModel.findOne({ slug });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    return res.json({ success: true, service });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to fetch service" });
  }
}

// POST /api/services - create new service (admin)
export async function createService(req: Request, res: Response) {
  try {
    const body = req.body;
    if (!body.title || !body.slug) {
      return res.status(400).json({ success: false, message: "Title and slug are required" });
    }

    const existing = await ServiceModel.findOne({ slug: body.slug.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: "A service with this slug already exists" });
    }

    const service = new ServiceModel({
      ...body,
      slug: body.slug.toLowerCase().trim(),
    });

    await service.save();
    return res.status(201).json({ success: true, service, message: "Service created successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to create service" });
  }
}

// PUT /api/services/:id - update service by id (admin)
export async function updateService(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const body = req.body;

    if (body.slug) {
      body.slug = body.slug.toLowerCase().trim();
      const existing = await ServiceModel.findOne({ slug: body.slug, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ success: false, message: "Another service with this slug already exists" });
      }
    }

    const service = await ServiceModel.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true });
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    return res.json({ success: true, service, message: "Service updated successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to update service" });
  }
}

// DELETE /api/services/:id - delete service (admin)
export async function deleteService(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const service = await ServiceModel.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    return res.json({ success: true, message: "Service deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message || "Failed to delete service" });
  }
}
