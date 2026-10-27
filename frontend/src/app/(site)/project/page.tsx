import React, { Suspense } from "react";
import type { Metadata } from "next";
import { projectsPageData } from "@/data/projects-data";
import {
  HeroSection,
  ProjectsSection,
} from "../../sections/project-section";

export const metadata: Metadata = {
  title: "Featured Projects & Portfolio | Sumit DevTech",
  description:
    "Explore our portfolio of cutting-edge web applications, Next.js platforms, cloud systems, and high-converting digital products engineered by Sumit DevTech.",
  alternates: {
    canonical: "/project",
  },
  openGraph: {
    title: "Featured Projects & Portfolio | Sumit DevTech",
    description:
      "Explore our portfolio of cutting-edge web applications, Next.js platforms, cloud systems, and high-converting digital products.",
    url: "https://sumitdevtech.com/project",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Featured Projects & Portfolio | Sumit DevTech",
    description:
      "Explore our portfolio of cutting-edge web applications, Next.js platforms, cloud systems, and high-converting digital products.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <HeroSection data={projectsPageData.hero} />
      <Suspense fallback={<div className="min-h-[400px] bg-light" />}>
        <ProjectsSection data={projectsPageData.projects} />
      </Suspense>
      {/* <BannerCtaSection data={projectsPageData.cta} /> */}
    </>
  );
}
