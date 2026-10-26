import type { Metadata } from "next";
import { shopifyWebsiteDevelopmentData } from "@/data/shopify-website-development-data";
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
  title: "Shopify Website Development Services | Shopify Plus & Custom Themes",
  description:
    "Launch and scale high-converting e-commerce storefronts with custom Shopify and Shopify Plus theme development by Sumit DevTech.",
  alternates: {
    canonical: "/shopify-website-development",
  },
  openGraph: {
    title: "Shopify Website Development Services | Sumit DevTech",
    description:
      "Bespoke Shopify Online Store 2.0 themes, headless commerce, and conversion-optimized storefronts engineered for maximum revenue.",
    url: "https://sumitdevtech.com/shopify-website-development",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopify Website Development Services | Sumit DevTech",
    description:
      "Custom Shopify theme engineering, app integrations, and conversion rate optimization tailored to fast-growing direct-to-consumer brands.",
  },
};

export default function ShopifyWebsiteDevelopmentPage() {
  return (
    <>
      <HeroSection data={shopifyWebsiteDevelopmentData.hero} />
      <DesignEcosystemSection data={shopifyWebsiteDevelopmentData.ecosystem} />
      <ServicesSection data={shopifyWebsiteDevelopmentData.services} />
      <ProcessSection data={shopifyWebsiteDevelopmentData.process} />
      <StatsSection data={shopifyWebsiteDevelopmentData.stats} />
      <IndustriesSection data={shopifyWebsiteDevelopmentData.industries} />
      <FaqSection data={shopifyWebsiteDevelopmentData.faq} />
    </>
  );
}
