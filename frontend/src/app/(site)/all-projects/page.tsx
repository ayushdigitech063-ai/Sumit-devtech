"use client";

import { useEffect, useState } from "react";
import {
  HeroSection,
  AllProjectsGridSection,
} from "@/app/sections/all-projects-section";
import { fetchProjects } from "@/lib/projects-api";
import { projects as fallbackProjects } from "@/data/projects";

export default function AllProjectsPage() {
  const [projectList, setProjectList] = useState(fallbackProjects);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchProjects();
        if (res.success && res.data && res.data.length > 0) {
          const mapped = res.data.map((p) => ({
            title: p.title,
            category: p.category,
            url: p.url,
            image: p.image || "/images/projects/case-thumb.png",
          }));
          setProjectList(mapped);
        }
      } catch (e) {
        // use fallback
      }
    }
    load();
  }, []);

  const uniqueCategories = Array.from(new Set(projectList.map((p) => p.category)));

  return (
    <main>
      <HeroSection
        totalProjects={projectList.length}
        totalCategories={uniqueCategories.length}
      />
      <AllProjectsGridSection projects={projectList} />
    </main>
  );
}
