import type { Metadata } from "next";
import { reactjsWebsiteDevelopmentData } from "@/data/reactjs-website-development-data";
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
  title: "React.js Website Development Services | Next.js & Frontend Experts",
  description:
    "Architect high-velocity, reactive single-page applications and Next.js platforms with custom React.js development services by Sumit DevTech.",
  alternates: {
    canonical: "/reactjs-website-development",
  },
  openGraph: {
    title: "React.js Website Development Services | Sumit DevTech",
    description:
      "Enterprise-grade React.js and Next.js development engineered for sub-second speeds, dynamic state handling, and seamless user experiences.",
    url: "https://sumitdevtech.com/reactjs-website-development",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "React.js Website Development Services | Sumit DevTech",
    description:
      "Modern React 19 & Next.js 15 web development engineered for peak speed, security, and enterprise scalability.",
  },
};

export default function ReactjsWebsiteDevelopmentPage() {
  return (
    <>
      <HeroSection data={reactjsWebsiteDevelopmentData.hero} />
      <DesignEcosystemSection data={reactjsWebsiteDevelopmentData.ecosystem} />
      <ServicesSection data={reactjsWebsiteDevelopmentData.services} />
      <ProcessSection data={reactjsWebsiteDevelopmentData.process} />
      <StatsSection data={reactjsWebsiteDevelopmentData.stats} />
      <IndustriesSection data={reactjsWebsiteDevelopmentData.industries} />
      <FaqSection data={reactjsWebsiteDevelopmentData.faq} />
    </>
  );
}
