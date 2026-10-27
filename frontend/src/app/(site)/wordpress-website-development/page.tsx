import type { Metadata } from "next";
import { wordpressWebsiteDevelopmentData } from "@/data/wordpress-website-development-data";
import {
  HeroSection,
  DesignEcosystemSection,
  ServicesSection,
  ProcessSection,
  StatsSection,
  IndustriesSection,
  FaqSection,
} from "../../sections/website-design-section";

export const metadata: Metadata = {
  title: "WordPress Website Development Services | Custom Themes & WooCommerce",
  description:
    "Empower your business with custom WordPress development, bespoke Gutenberg block systems, and high-converting WooCommerce storefronts by Sumit DevTech.",
  alternates: {
    canonical: "/wordpress-website-development",
  },
  openGraph: {
    title: "WordPress Website Development Services | Sumit DevTech",
    description:
      "Handcrafted zero-bloat WordPress themes, WooCommerce stores, and headless CMS solutions built for maximum speed and security.",
    url: "https://sumitdevtech.com/wordpress-website-development",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WordPress Website Development Services | Sumit DevTech",
    description:
      "Modern, secure, and blazing-fast WordPress solutions engineered for seamless content management and measurable growth.",
  },
};

export default function WordpressWebsiteDevelopmentPage() {
  return (
    <>
      <HeroSection data={wordpressWebsiteDevelopmentData.hero} />
      <DesignEcosystemSection data={wordpressWebsiteDevelopmentData.ecosystem} />
      <ServicesSection data={wordpressWebsiteDevelopmentData.services} />
      <ProcessSection data={wordpressWebsiteDevelopmentData.process} />
      <StatsSection data={wordpressWebsiteDevelopmentData.stats} />
      <IndustriesSection data={wordpressWebsiteDevelopmentData.industries} />
      <FaqSection data={wordpressWebsiteDevelopmentData.faq} />
    </>
  );
}
