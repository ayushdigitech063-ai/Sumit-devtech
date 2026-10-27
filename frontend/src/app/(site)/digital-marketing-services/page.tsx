import type { Metadata } from "next";
import { digitalMarketingServicesData } from "@/data/digital-marketing-services-data";
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
  title: "Digital Marketing Services | SEO, Google Ads & Growth Agency",
  description:
    "Accelerate qualified leads and customer revenue with data-driven digital marketing services, technical SEO, and high-ROAS paid ad campaigns by Sumit DevTech.",
  alternates: {
    canonical: "/digital-marketing-services",
  },
  openGraph: {
    title: "Digital Marketing Services | Sumit DevTech",
    description:
      "Performance-driven digital marketing agency specializing in technical SEO, Google PPC ads, Meta campaigns, and conversion rate optimization.",
    url: "https://sumitdevtech.com/digital-marketing-services",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Services | Sumit DevTech",
    description:
      "Data-backed digital marketing strategies that increase organic search rankings, lower ad costs, and maximize customer conversion rates.",
  },
};

export default function DigitalMarketingServicesPage() {
  return (
    <>
      <HeroSection data={digitalMarketingServicesData.hero} />
      <DesignEcosystemSection data={digitalMarketingServicesData.ecosystem} />
      <ServicesSection data={digitalMarketingServicesData.services} />
      <ProcessSection data={digitalMarketingServicesData.process} />
      <StatsSection data={digitalMarketingServicesData.stats} />
      <IndustriesSection data={digitalMarketingServicesData.industries} />
      <FaqSection data={digitalMarketingServicesData.faq} />
    </>
  );
}
