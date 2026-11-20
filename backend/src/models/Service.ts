import mongoose, { Document, Schema } from "mongoose";

export interface IFeatureChip {
  id?: string;
  label: string;
}

export interface ITrustItem {
  id?: string;
  value: string;
  label: string;
}

export interface IEcosystemCard {
  id?: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  colSpan?: "default" | "wide";
}

export interface IServiceItem {
  id?: string;
  number: string;
  title: string;
  description: string;
  tags: [string, string] | string[];
  href: string;
}

export interface IProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface IStatItem {
  id?: string;
  numericValue: number;
  suffix: string;
  decimals?: number;
  label: string;
  subtext: string;
}

export interface IIndustryItem {
  id?: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: string;
}

export interface IServiceFaq {
  question: string;
  answer: string;
}

export interface IServiceCityOverride {
  citySlug: string; // e.g. "jaipur", "mumbai"
  cityName: string;
  state?: string;
  tagline?: string;
  phone?: string;
  popularAreas?: string[];
  localKeywords?: string[];
  faqs?: IServiceFaq[];
  isActive?: boolean;
}

export interface IServiceDoc extends Document {
  slug: string;
  title: string;
  badge: string;
  highlight?: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;

  chips: IFeatureChip[];
  trustItems: ITrustItem[];

  ecosystemLabel?: string;
  ecosystemTitle?: string;
  ecosystemHighlight?: string;
  ecosystemText?: string;
  ecosystemCards: IEcosystemCard[];

  servicesSectionLabel?: string;
  servicesSectionTitle?: string;
  servicesSectionHighlight?: string;
  servicesSectionText?: string;
  serviceItems: IServiceItem[];

  processLabel?: string;
  processTitle?: string;
  processHighlight?: string;
  processText?: string;
  processSteps: IProcessStep[];

  stats: IStatItem[];

  industriesLabel?: string;
  industriesTitle?: string;
  industriesHighlight?: string;
  industriesText?: string;
  industries: IIndustryItem[];

  faqsLabel?: string;
  faqsTitle?: string;
  faqsHighlight?: string;
  faqsText?: string;
  faqs: IServiceFaq[];

  ctaBadge?: string;
  ctaTitle?: string;
  ctaHighlight?: string;
  ctaText?: string;
  ctaBenefits: string[];
  ctaButtonText?: string;
  ctaButtonHref?: string;

  cities: IServiceCityOverride[];
  isActive: boolean;
  order: number;

  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IServiceDoc>(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    badge: { type: String, default: "Professional Service", trim: true },
    highlight: { type: String, default: "", trim: true },
    description: { type: String, required: true, trim: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },

    chips: [
      {
        id: { type: String },
        label: { type: String, required: true },
      },
    ],
    trustItems: [
      {
        id: { type: String },
        value: { type: String, default: "" },
        label: { type: String, required: true },
      },
    ],

    ecosystemLabel: { type: String, default: "Full-Stack Hub" },
    ecosystemTitle: { type: String, default: "Our Core Technical" },
    ecosystemHighlight: { type: String, default: "Ecosystem" },
    ecosystemText: { type: String, default: "" },
    ecosystemCards: [
      {
        id: { type: String },
        title: { type: String, required: true },
        description: { type: String, required: true },
        iconName: { type: String, default: "Code2" },
        badge: { type: String },
        colSpan: { type: String, enum: ["default", "wide"], default: "default" },
      },
    ],

    servicesSectionLabel: { type: String, default: "Expertise & Services" },
    servicesSectionTitle: { type: String, default: "Precision-Engineered" },
    servicesSectionHighlight: { type: String, default: "Solutions" },
    servicesSectionText: { type: String, default: "" },
    serviceItems: [
      {
        id: { type: String },
        number: { type: String, default: "01" },
        title: { type: String, required: true },
        description: { type: String, required: true },
        tags: { type: [String], default: [] },
        href: { type: String, default: "/contact-us" },
      },
    ],

    processLabel: { type: String, default: "Proven Workflow" },
    processTitle: { type: String, default: "Our 4-Step" },
    processHighlight: { type: String, default: "Process" },
    processText: { type: String, default: "" },
    processSteps: [
      {
        number: { type: String, default: "01" },
        title: { type: String, required: true },
        description: { type: String, required: true },
        deliverable: { type: String, default: "" },
      },
    ],

    stats: [
      {
        id: { type: String },
        numericValue: { type: Number, default: 100 },
        suffix: { type: String, default: "+" },
        decimals: { type: Number, default: 0 },
        label: { type: String, required: true },
        subtext: { type: String, default: "" },
      },
    ],

    industriesLabel: { type: String, default: "Domain Expertise" },
    industriesTitle: { type: String, default: "Built For" },
    industriesHighlight: { type: String, default: "Every Industry" },
    industriesText: { type: String, default: "" },
    industries: [
      {
        id: { type: String },
        title: { type: String, required: true },
        description: { type: String, required: true },
        metric: { type: String, default: "100%" },
        metricLabel: { type: String, default: "Success Rate" },
        iconName: { type: String, default: "Briefcase" },
      },
    ],

    faqsLabel: { type: String, default: "Got Questions?" },
    faqsTitle: { type: String, default: "Frequently Asked" },
    faqsHighlight: { type: String, default: "Questions" },
    faqsText: { type: String, default: "" },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],

    ctaBadge: { type: String, default: "Let's Build Your Vision" },
    ctaTitle: { type: String, default: "Ready to Elevate Your" },
    ctaHighlight: { type: String, default: "Brand Online?" },
    ctaText: { type: String, default: "" },
    ctaBenefits: { type: [String], default: [] },
    ctaButtonText: { type: String, default: "Get Free Consultation" },
    ctaButtonHref: { type: String, default: "/contact-us" },

    cities: [
      {
        citySlug: { type: String, required: true, lowercase: true, trim: true },
        cityName: { type: String, required: true, trim: true },
        state: { type: String, default: "" },
        tagline: { type: String, default: "" },
        phone: { type: String, default: "+91 96765 43210" },
        popularAreas: { type: [String], default: [] },
        localKeywords: { type: [String], default: [] },
        faqs: [
          {
            question: { type: String, required: true },
            answer: { type: String, required: true },
          },
        ],
        isActive: { type: Boolean, default: true },
      },
    ],

    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const ServiceModel = mongoose.model<IServiceDoc>("Service", ServiceSchema);
