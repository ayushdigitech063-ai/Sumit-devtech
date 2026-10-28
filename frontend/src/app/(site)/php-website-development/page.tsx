import type { Metadata } from "next";
import { phpWebsiteDevelopmentData } from "@/data/php-website-development-data";
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
  title: "PHP Website Development Services | Custom Laravel & MySQL Backends",
  description:
    "Build robust, high-security web applications and custom enterprise portals with expert PHP and Laravel development services by Sumit DevTech.",
  alternates: {
    canonical: "/php-website-development",
  },
  openGraph: {
    title: "PHP Website Development Services | Sumit DevTech",
    description:
      "Enterprise PHP 8+ and Laravel application development engineered for high-throughput APIs, relational databases, and bank-grade security.",
    url: "https://sumitdevtech.com/php-website-development",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PHP Website Development Services | Sumit DevTech",
    description:
      "Modern PHP & Laravel backend engineering delivering scalable web applications, RESTful APIs, and database-driven portals.",
  },
};

export default function PhpWebsiteDevelopmentPage() {
  return (
    <>
      <HeroSection data={phpWebsiteDevelopmentData.hero} />
      <DesignEcosystemSection data={phpWebsiteDevelopmentData.ecosystem} />
      <ServicesSection data={phpWebsiteDevelopmentData.services} />
      <ProcessSection data={phpWebsiteDevelopmentData.process} />
      <StatsSection data={phpWebsiteDevelopmentData.stats} />
      <IndustriesSection data={phpWebsiteDevelopmentData.industries} />
      <FaqSection data={phpWebsiteDevelopmentData.faq} />
    </>
  );
}
