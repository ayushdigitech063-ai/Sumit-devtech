
import { Metadata } from "next";
import { dynamicWebsiteDesignData as data } from "@/data/dynamic-website-design-data";
import {
  HeroSection, DesignEcosystemSection, ServicesSection, ProcessSection,
  StatsSection, IndustriesSection, FaqSection,
} from "@/app/sections/website-design-section";

export const metadata: Metadata = {
  title: "Dynamic website design",
  description:
    "Deliver flawless, high-converting browsing experiences across smartphones, tablets, and 4K desktops with custom responsive website design by Sumit DevTech.",
  alternates: {
    canonical: "/dynamic-website-design",
  },
  openGraph: {
    title: "Responsive Website Design Services | Sumit DevTech",
    description:
      "Engineered with fluid grid systems, touch optimization, and lightning-fast mobile speeds for Google Mobile-First Indexing.",
    url: "https://sumitdevtech.com/dynamic-website-design",
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

export default function Page() {
  return (
    <>
      <HeroSection data={data.hero} />
      <DesignEcosystemSection data={data.ecosystem} />
      <ServicesSection data={data.services} />
      <ProcessSection data={data.process} />
      <StatsSection data={data.stats} />
      <IndustriesSection data={data.industries} />
      <FaqSection data={data.faq} />
    </>
  );
}