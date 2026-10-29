import { z } from "zod";

const statItemSchema = z.object({
  value: z.string().min(1, "Value required hai").max(50),
  label: z.string().min(1, "Label required hai").max(100),
});

// JSON parse helper function for multipart form-data
const parseJsonField = (val: unknown) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  return val;
};

// 1. Hero
export const updateHeroSchema = z.object({
  locationBadge: z.string().min(1).max(150).optional(),
  baseHeading: z.string().min(1).max(200).optional(),
  serviceHighlights: z.preprocess(
    parseJsonField,
    z.object({
      development: z.string().min(1),
      appDevelopment: z.string().min(1),
      seo: z.string().min(1),
      marketing: z.string().min(1),
    }).optional()
  ),
  description: z.string().min(1).max(1000).optional(),
  primaryButtonText: z.string().min(1).max(100).optional(),
  primaryButtonLink: z.string().min(1).max(300).optional(),
  secondaryButtonText: z.string().min(1).max(100).optional(),
  secondaryButtonLink: z.string().min(1).max(300).optional(),
  stats: z.preprocess(parseJsonField, z.array(statItemSchema)).optional(),
});

// 2. About
export const updateAboutSchema = z.object({
  tagline: z.string().min(1).max(100).optional(),
  heading: z.string().min(1).max(250).optional(),
  description: z.string().min(1).max(2000).optional(),
  experienceYears: z.string().min(1).max(50).optional(),
  experienceLabel: z.string().min(1).max(150).optional(),
  badges: z.preprocess(parseJsonField, z.array(z.string())).optional(),
  buttonText: z.string().min(1).max(100).optional(),
  buttonLink: z.string().min(1).max(300).optional(),
  metricCards: z.preprocess(parseJsonField, z.array(statItemSchema)).optional(),
});

// 3. Work Process (8 Steps)
export const updateWorkProcessSchema = z.object({
  tagline: z.string().min(1).max(100).optional(),
  heading: z.string().min(1).max(250).optional(),
  description: z.string().min(1).max(1000).optional(),
  steps: z.preprocess(
    parseJsonField,
    z.array(
      z.object({
        stepNumber: z.number().min(1),
        title: z.string().min(1).max(150),
        description: z.string().min(1).max(500),
      })
    ).optional()
  ),
});

// 4. Why We Lead (6 Cards)
export const updateWhyLeadSchema = z.object({
  tagline: z.string().min(1).max(100).optional(),
  heading: z.string().min(1).max(250).optional(),
  features: z.preprocess(
    parseJsonField,
    z.array(
      z.object({
        title: z.string().min(1).max(150),
        description: z.string().min(1).max(500),
        icon: z.string().max(50).optional(),
      })
    ).optional()
  ),
});

// 5. Why Choose (4 Cards with Images)
export const updateWhyChooseSchema = z.object({
  tagline: z.string().min(1).max(100).optional(),
  heading: z.string().min(1).max(250).optional(),
  subheading: z.string().min(1).max(500).optional(),
  cards: z.preprocess(
    parseJsonField,
    z.array(
      z.object({
        stepNumber: z.string().min(1).max(10),
        title: z.string().min(1).max(150),
        description: z.string().min(1).max(1000),
      })
    ).optional()
  ),
});