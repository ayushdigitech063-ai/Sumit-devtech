import type { Metadata } from "next";
import { websiteDesignData } from "@/data/website-design-data";
import {
  HeroSection,
  DesignEcosystemSection,
  ServicesSection,
  ProcessSection,
  StatsSection,
  IndustriesSection,
  FaqSection,
} from "@/app/sections/website-design-section";

export const metadata: Metadata = {
  title: "Website Design Services | UI/UX & Responsive Web Design",
  description:
    "Elevate your online presence with bespoke, high-converting website designs. Expert UI/UX wireframing, mobile-first responsive architecture, and Figma-to-code development by Sumit DevTech.",
  alternates: {
    canonical: "/website-design",
  },
  openGraph: {
    title: "Bespoke Website Design Services | Sumit DevTech",
    description:
      "Crafting high-converting, mobile-responsive web interfaces tailored to elevate your business growth and user engagement.",
    url: "https://sumitdevtech.com/website-design",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bespoke Website Design Services | Sumit DevTech",
    description:
      "Modern, fast, and mobile-responsive website designs that drive high-intent conversions.",
  },
};

export default function WebsiteDesignPage() {
  return (
    <>
      <HeroSection data={websiteDesignData.hero} />
      <DesignEcosystemSection data={websiteDesignData.ecosystem} />
      <ServicesSection data={websiteDesignData.services} />
      <ProcessSection data={websiteDesignData.process} />
      <StatsSection data={websiteDesignData.stats} />
      <IndustriesSection data={websiteDesignData.industries} />
      <FaqSection data={websiteDesignData.faq} />
    </>
  );
}
