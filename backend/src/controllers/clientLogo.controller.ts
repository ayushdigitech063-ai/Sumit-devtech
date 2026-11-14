import { Request, Response } from "express";
import { ClientLogo } from "../models/ClientLogo";

// Initial seed list for first load if collection is empty
const defaultClients = [
  { name: "Brand Knock", logo: "https://sumitdevtech.com/assets/images/client-logos/Brand-Knock.svg", order: 1 },
  { name: "Bsix Engineering", logo: "https://sumitdevtech.com/assets/images/client-logos/Bsix-engineering.svg", order: 2 },
  { name: "Cherry Cabs", logo: "https://sumitdevtech.com/assets/images/client-logos/Cherrycabs.svg", order: 3 },
  { name: "Dev Tourist", logo: "https://sumitdevtech.com/assets/images/client-logos/Devtourist.svg", order: 4 },
  { name: "Doli Saja Ke Rakhna", logo: "https://sumitdevtech.com/assets/images/client-logos/Dolisajakerakhna.svg", order: 5 },
  { name: "Dr Manish Ganwani", logo: "https://sumitdevtech.com/assets/images/client-logos/Drmanishganwani.svg", order: 6 },
  { name: "Dulha Ghar", logo: "https://sumitdevtech.com/assets/images/client-logos/Dulhaghar.svg", order: 7 },
  { name: "Golf Course Prints", logo: "https://sumitdevtech.com/assets/images/client-logos/Golfcourseprints.svg", order: 8 },
  { name: "Homerox", logo: "https://sumitdevtech.com/assets/images/client-logos/Homerox.svg", order: 9 },
  { name: "Laser Machine Manufacturers", logo: "https://sumitdevtech.com/assets/images/client-logos/Laser-machine-manufacturers.svg", order: 10 },
  { name: "Lecture Kharido", logo: "https://sumitdevtech.com/assets/images/client-logos/Lecture-kharido.svg", order: 11 },
  { name: "Masterbatch", logo: "https://sumitdevtech.com/assets/images/client-logos/Masterbatch.svg", order: 12 },
  { name: "Sidhu Travels", logo: "https://sumitdevtech.com/assets/images/client-logos/Sidhutravels.svg", order: 13 },
  { name: "Spherule", logo: "https://sumitdevtech.com/assets/images/client-logos/Spherule.svg", order: 14 },
  { name: "Subsidy Mantra", logo: "https://sumitdevtech.com/assets/images/client-logos/Subsidymantra.svg", order: 15 },
  { name: "Tech Mahindra Foundation", logo: "https://sumitdevtech.com/assets/images/client-logos/Tech-Mahindra-Foundation.svg", order: 16 },
  { name: "Yuvti", logo: "https://sumitdevtech.com/assets/images/client-logos/Yuvti.svg", order: 17 },
  { name: "Baar House", logo: "https://sumitdevtech.com/assets/images/client-logos/baar-house.svg", order: 18 },
  { name: "eFacto", logo: "https://sumitdevtech.com/assets/images/client-logos/eFacto.svg", order: 19 },
  { name: "IBL Classes", logo: "https://sumitdevtech.com/assets/images/client-logos/iblclasses.svg", order: 20 },
  { name: "Jahangir Tutorials", logo: "https://sumitdevtech.com/assets/images/client-logos/jahangir-tutorials.svg", order: 21 },
];

// Public: Get all active client logos
export const getActiveClientLogos = async (_req: Request, res: Response) => {
  try {
    let clients = await ClientLogo.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    if (clients.length === 0) {
      await ClientLogo.insertMany(defaultClients);
      clients = await ClientLogo.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    }
    return res.json({ success: true, data: clients });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Get all client logos
export const getAllClientLogosAdmin = async (_req: Request, res: Response) => {
  try {
    let clients = await ClientLogo.find().sort({ order: 1, createdAt: -1 });
    if (clients.length === 0) {
      await ClientLogo.insertMany(defaultClients);
      clients = await ClientLogo.find().sort({ order: 1, createdAt: -1 });
    }
    return res.json({ success: true, data: clients });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Create client logo
export const createClientLogo = async (req: Request, res: Response) => {
  try {
    const { name, logo, order } = req.body;
    if (!name || !logo) {
      return res.status(400).json({ success: false, message: "Client name and logo are required." });
    }

    const client = await ClientLogo.create({
      name,
      logo,
      order: Number(order) || 0,
      isActive: true,
    });

    return res.status(201).json({ success: true, message: "Client logo added.", data: client });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Update client logo
export const updateClientLogo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, logo, order, isActive } = req.body;

    const client = await ClientLogo.findByIdAndUpdate(
      id,
      { name, logo, order, isActive },
      { new: true }
    );

    if (!client) return res.status(404).json({ success: false, message: "Client not found." });

    return res.json({ success: true, message: "Client logo updated.", data: client });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: Delete client logo
export const deleteClientLogo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ClientLogo.findByIdAndDelete(id);
    return res.json({ success: true, message: "Client logo removed." });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
