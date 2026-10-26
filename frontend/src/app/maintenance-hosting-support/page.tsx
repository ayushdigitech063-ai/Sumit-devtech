import type { Metadata } from "next";
import { maintenanceHostingSupportData } from "@/data/maintenance-hosting-support-data";
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
  title: "Website Maintenance, Hosting & 24/7 Support Services",
  description:
    "Ensure 99.99% uptime and peak security with managed cloud hosting, automated disaster recovery, Cloudflare CDN, and 24/7 DevOps support by Sumit DevTech.",
  alternates: {
    canonical: "/maintenance-hosting-support",
  },
  openGraph: {
    title: "Website Maintenance, Hosting & 24/7 Support Services | Sumit DevTech",
    description:
      "Enterprise managed cloud hosting on AWS and VPS with round-the-clock server monitoring, automated backups, and sub-15-minute emergency response.",
    url: "https://sumitdevtech.com/maintenance-hosting-support",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Maintenance, Hosting & Support Services | Sumit DevTech",
    description:
      "Managed cloud hosting, server administration, automated disaster recovery, and 24/7 technical helpdesk tailored for mission-critical web applications.",
  },
};

export default function MaintenanceHostingSupportPage() {
  return (
    <>
      <HeroSection data={maintenanceHostingSupportData.hero} />
      <DesignEcosystemSection data={maintenanceHostingSupportData.ecosystem} />
      <ServicesSection data={maintenanceHostingSupportData.services} />
      <ProcessSection data={maintenanceHostingSupportData.process} />
      <StatsSection data={maintenanceHostingSupportData.stats} />
      <IndustriesSection data={maintenanceHostingSupportData.industries} />
      <FaqSection data={maintenanceHostingSupportData.faq} />
    </>
  );
}
