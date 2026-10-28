import type { Metadata } from "next";
import { websiteMaintenanceData } from "@/data/website-maintenance-data";
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
  title: "Website Maintenance Services | 24/7 Security & Support",
  description:
    "Protect your online presence with proactive website maintenance plans, weekly security updates, daily cloud backups, and rapid bug fixes by Sumit DevTech.",
  alternates: {
    canonical: "/website-maintenance",
  },
  openGraph: {
    title: "Website Maintenance Services | Sumit DevTech",
    description:
      "24/7 website care plans featuring uptime monitoring, safe staged software updates, malware removal, and dedicated developer support.",
    url: "https://sumitdevtech.com/website-maintenance",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Maintenance Services | Sumit DevTech",
    description:
      "Comprehensive website care, security hardening, daily backups, and fast technical support tailored to keeping your site running smoothly.",
  },
};

export default function WebsiteMaintenancePage() {
  return (
    <>
      <HeroSection data={websiteMaintenanceData.hero} />
      <DesignEcosystemSection data={websiteMaintenanceData.ecosystem} />
      <ServicesSection data={websiteMaintenanceData.services} />
      <ProcessSection data={websiteMaintenanceData.process} />
      <StatsSection data={websiteMaintenanceData.stats} />
      <IndustriesSection data={websiteMaintenanceData.industries} />
      <FaqSection data={websiteMaintenanceData.faq} />
    </>
  );
}
