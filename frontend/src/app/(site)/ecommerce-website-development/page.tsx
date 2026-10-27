import type { Metadata } from "next";
import { ecommerceWebsiteDevelopmentData } from "@/data/ecommerce-website-development-data";
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
  title: "E-Commerce Website Development Services | Custom Online Stores",
  description:
    "Build high-converting, scalable e-commerce websites and online stores with custom cart architecture, seamless checkout, and payment integrations by Sumit DevTech.",
  alternates: {
    canonical: "/ecommerce-website-development",
  },
  openGraph: {
    title: "E-Commerce Website Development Services | Sumit DevTech",
    description:
      "Full-cycle custom e-commerce web development engineered for maximum conversion rates, multi-currency payments, and high-volume sales.",
    url: "https://sumitdevtech.com/ecommerce-website-development",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Commerce Website Development Services | Sumit DevTech",
    description:
      "Custom e-commerce platforms, WooCommerce, Shopify, and headless storefronts engineered for fast speeds and seamless buying experiences.",
  },
};

export default function EcommerceWebsiteDevelopmentPage() {
  return (
    <>
      <HeroSection data={ecommerceWebsiteDevelopmentData.hero} />
      <DesignEcosystemSection data={ecommerceWebsiteDevelopmentData.ecosystem} />
      <ServicesSection data={ecommerceWebsiteDevelopmentData.services} />
      <ProcessSection data={ecommerceWebsiteDevelopmentData.process} />
      <StatsSection data={ecommerceWebsiteDevelopmentData.stats} />
      <IndustriesSection data={ecommerceWebsiteDevelopmentData.industries} />
      <FaqSection data={ecommerceWebsiteDevelopmentData.faq} />
    </>
  );
}
