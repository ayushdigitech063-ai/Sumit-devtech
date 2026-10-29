import type { Request, Response, NextFunction } from "express";
import { HeroBanner } from "../models/HeroBanner";
import { About } from "../models/About";
import { WorkProcess } from "../models/WorkProcess";
import { WhyLead } from "../models/WhyLead";
import { WhyChoose } from "../models/WhyChoose";
import {
  updateHeroSchema,
  updateAboutSchema,
  updateWorkProcessSchema,
  updateWhyLeadSchema,
  updateWhyChooseSchema,
} from "../validators/homeContent.schema";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary";



export async function getHeroBanner(_req: Request, res: Response, next: NextFunction) {
  try {
    let hero = await HeroBanner.findOne();
    if (!hero) {
      hero = await HeroBanner.create({});
    }
    return res.status(200).json({
      success: true,
      data: hero,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateHeroBanner(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = updateHeroSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid hero banner data.",
        errors: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
      });
    }

    const hero = await HeroBanner.findOneAndUpdate(
      {},
      { $set: parsed.data },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Hero banner updated successfully.",
      data: hero,
    });
  } catch (err) {
    next(err);
  }
}



export async function getAbout(_req: Request, res: Response, next: NextFunction) {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    return res.status(200).json({
      success: true,
      data: about,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAbout(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = updateAboutSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid about section data.",
        errors: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
      });
    }

    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }

    // Handle Image Upload / Delete
    const files = (req.files as Express.Multer.File[]) || [];
    const imageFile = files.find((f) => f.fieldname === "image");

    if (imageFile) {
      if (about.image?.publicId) {
        await deleteFromCloudinary(about.image.publicId);
      }
      const uploaded = await uploadToCloudinary(imageFile.buffer, "about_section");
      about.image = { url: uploaded.url, publicId: uploaded.publicId };
    }

    Object.assign(about, parsed.data);
    await about.save();

    return res.status(200).json({
      success: true,
      message: "About section updated successfully.",
      data: about,
    });
  } catch (err) {
    next(err);
  }
}


export async function getWorkProcess(_req: Request, res: Response, next: NextFunction) {
  try {
    let process = await WorkProcess.findOne();
    if (!process) {
      process = await WorkProcess.create({});
    }
    return res.status(200).json({
      success: true,
      data: process,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateWorkProcess(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = updateWorkProcessSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid work process data.",
        errors: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
      });
    }

    const process = await WorkProcess.findOneAndUpdate(
      {},
      { $set: parsed.data },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Work process updated successfully.",
      data: process,
    });
  } catch (err) {
    next(err);
  }
}


export async function getWhyLead(_req: Request, res: Response, next: NextFunction) {
  try {
    let lead = await WhyLead.findOne();
    if (!lead) {
      lead = await WhyLead.create({});
    }
    return res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateWhyLead(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = updateWhyLeadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid why-lead data.",
        errors: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
      });
    }

    const lead = await WhyLead.findOneAndUpdate(
      {},
      { $set: parsed.data },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Why lead section updated successfully.",
      data: lead,
    });
  } catch (err) {
    next(err);
  }
}

// ==========================================
// 5. WHY CHOOSE (Cards with Multiple Images)
// ==========================================

export async function getWhyChoose(_req: Request, res: Response, next: NextFunction) {
  try {
    let choose = await WhyChoose.findOne();
    if (!choose) {
      choose = await WhyChoose.create({});
    }
    return res.status(200).json({
      success: true,
      data: choose,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateWhyChoose(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = updateWhyChooseSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid why-choose data.",
        errors: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`),
      });
    }

    let choose = await WhyChoose.findOne();
    if (!choose) {
      choose = await WhyChoose.create({});
    }

 
    if (parsed.data.tagline !== undefined) choose.tagline = parsed.data.tagline;
    if (parsed.data.heading !== undefined) choose.heading = parsed.data.heading;
    if (parsed.data.subheading !== undefined) choose.subheading = parsed.data.subheading;

    const files = (req.files as Express.Multer.File[]) || [];
    
    // Ensure cards array exists
    if (!choose.cards || choose.cards.length === 0) {
      choose.cards = [] as any;
    }

    const totalCardsCount = Math.max(choose.cards.length, parsed.data.cards?.length || 0, 4);

    for (let i = 0; i < totalCardsCount; i++) {
     
      if (!choose.cards[i]) {
        choose.cards[i] = {
          stepNumber: String(i + 1).padStart(2, "0"),
          title: "",
          description: "",
          image: { url: "", publicId: "" },
        } as any;
      }

      // 1. Text updates
      if (parsed.data.cards && parsed.data.cards[i]) {
        if (parsed.data.cards[i].stepNumber !== undefined) {
          choose.cards[i].stepNumber = parsed.data.cards[i].stepNumber;
        }
        if (parsed.data.cards[i].title !== undefined) {
          choose.cards[i].title = parsed.data.cards[i].title;
        }
        if (parsed.data.cards[i].description !== undefined) {
          choose.cards[i].description = parsed.data.cards[i].description;
        }
      }

      // 2. Image update (field: cardImage_0, cardImage_1, etc.)
      const file = files.find((f) => f.fieldname === `cardImage_${i}`);
      if (file) {
        const oldPublicId = choose.cards[i]?.image?.publicId;
        if (oldPublicId && typeof oldPublicId === "string" && oldPublicId.trim() !== "") {
          await deleteFromCloudinary(oldPublicId);
        }

        const uploaded = await uploadToCloudinary(file.buffer, "why_choose_cards");
        choose.cards[i].image = {
          url: uploaded.url,
          publicId: uploaded.publicId,
        };
      }
    }

    
    choose.markModified("cards");
    await choose.save();

    return res.status(200).json({
      success: true,
      message: "Why choose section updated successfully.",
      data: choose,
    });
  } catch (err) {
    next(err);
  }
}