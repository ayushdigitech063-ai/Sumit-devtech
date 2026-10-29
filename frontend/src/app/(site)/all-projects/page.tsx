import type { Metadata } from "next";
import { projects } from "@/data/projects";
import {
  HeroSection,
  AllProjectsGridSection,
} from "@/app/sections/all-projects-section";

export const metadata: Metadata = {
  title: "All Projects & Client Work | Sumit DevTech",
  description:
    "Browse our complete catalog of delivered websites, e-commerce stores, custom applications, and corporate platforms built by Sumit DevTech.",
  alternates: {
    canonical: "/all-projects",
  },
  openGraph: {
    title: "All Projects & Client Work | Sumit DevTech",
    description:
      "Browse our complete catalog of delivered websites, e-commerce stores, custom applications, and corporate platforms.",
    url: "https://sumitdevtech.com/all-projects",
    siteName: "Sumit DevTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Projects & Client Work | Sumit DevTech",
    description:
      "Browse our complete catalog of delivered websites, e-commerce stores, custom applications, and corporate platforms.",
  },
};

export default function AllProjectsPage() {
  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category)));

  return (
    <main>
      <HeroSection
        totalProjects={projects.length}
        totalCategories={uniqueCategories.length}
      />
      <AllProjectsGridSection projects={projects} />
    </main>
  );
}

