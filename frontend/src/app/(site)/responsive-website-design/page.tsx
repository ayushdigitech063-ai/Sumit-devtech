import type { Metadata } from "next";
import { responsiveWebsiteDesignData } from "@/data/responsive-website-design-data";
import {
  HeroSection,
  DesignEcosystemSection,
  ServicesSection,
  ProcessSection,
  StatsSection,
  IndustriesSection,
  FaqSection,
} from "../sections/website-design-section";

export const metadata: Metadata = {
  title: "Responsive Website Design Services | Mobile-First UI/UX",
  description:
    "Deliver flawless, high-converting browsing experiences across smartphones, tablets, and 4K desktops with custom responsive website design by Sumit DevTech.",
  alternates: {
    canonical: "/responsive-website-design",
  },
  openGraph: {
    title: "Responsive Website Design Services | Sumit DevTech",
    description:
      "Engineered with fluid grid systems, touch optimization, and lightning-fast mobile speeds for Google Mobile-First Indexing.",
    url: "https://sumitdevtech.com/responsive-website-design",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Responsive Website Design Services | Sumit DevTech",
    description:
      "Mobile-first, fluid website designs that adapt seamlessly to every viewport size.",
  },
};

export default function ResponsiveWebsiteDesignPage() {
  return (
    <>
      <HeroSection data={responsiveWebsiteDesignData.hero} />
      <DesignEcosystemSection data={responsiveWebsiteDesignData.ecosystem} />
      <ServicesSection data={responsiveWebsiteDesignData.services} />
      <ProcessSection data={responsiveWebsiteDesignData.process} />
      <StatsSection data={responsiveWebsiteDesignData.stats} />
      <IndustriesSection data={responsiveWebsiteDesignData.industries} />
      <FaqSection data={responsiveWebsiteDesignData.faq} />
    </>
  );
}
