"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import ProjectCard, { ProjectData } from "./ProjectCard";
import { fetchProjectCategories } from "@/lib/projects-api";
import { cn } from "@/lib/utils";

export interface AllProjectsGridSectionProps {
  projects: ProjectData[];
}

const PAGE_SIZE = 12;
const LOAD_MORE_STEP = 9;

const DEFAULT_TABS = [
  "All",
  "App Development",
  "Web Application",
  "SEO Services",
  "CRM & ERP",
  "E-Commerce",
  "Corporate",
  "Booking Portal",
];

export default function AllProjectsGridSection({ projects }: AllProjectsGridSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [categories, setCategories] = useState<string[]>(DEFAULT_TABS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  // Load custom dynamic categories from Super Admin backend
  useEffect(() => {
    async function loadTabs() {
      try {
        const res = await fetchProjectCategories();
        if (res.success && res.data && res.data.length > 0) {
          const names = ["All", ...res.data.map((c) => c.name)];
          // deduplicate
          setCategories(Array.from(new Set(names)));
        }
      } catch (err) {
        // fallback to default
      }
    }
    loadTabs();
  }, []);

  // Dynamic filter matching logic
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;

    return projects.filter((p) => {
      const cat = (p.category || "").toLowerCase();
      const title = (p.title || "").toLowerCase();
      const target = selectedCategory.toLowerCase();

      if (cat === target || cat.includes(target)) return true;

      switch (selectedCategory) {
        case "App Development":
          return cat.includes("app") || cat.includes("mobile") || cat.includes("android") || cat.includes("ios") || cat.includes("flutter");
        case "Web Application":
          return cat.includes("web application") || cat.includes("saas") || cat.includes("portal") || cat.includes("software");
        case "SEO Services":
          return cat.includes("seo") || cat.includes("marketing") || cat.includes("optimization") || title.includes("seo");
        case "CRM & ERP":
          return cat.includes("crm") || cat.includes("erp") || cat.includes("management") || cat.includes("admin") || cat.includes("service");
        case "E-Commerce":
          return cat.includes("commerce") || cat.includes("shop") || cat.includes("store") || cat.includes("retail");
        case "Corporate":
          return cat.includes("corporate") || cat.includes("business") || cat.includes("company") || cat.includes("it services");
        case "Booking Portal":
          return cat.includes("booking") || cat.includes("cab") || cat.includes("travel") || cat.includes("tourism") || cat.includes("hospitality");
        default:
          return cat.includes(target) || title.includes(target);
      }
    });
  }, [projects, selectedCategory]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleSelectTab = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section id="projects-catalog" className="relative bg-white py-16 md:py-24 border-t border-line">
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <SectionHeading
            center
            label="Live Portfolio"
            title={
              <>
                Explore Complete <span className="text-brand">Client Work</span>
              </>
            }
            text="Review our delivered client websites, custom applications, e-commerce stores, CRM portals, and corporate platforms."
          />

          {/* Interactive Category Filter Pills - Dynamic from Super Admin */}
          <div className="mb-10 w-full flex justify-center">
            <div className="flex items-center gap-1.5 p-1.5 rounded-full border border-line bg-light/70 backdrop-blur-md shadow-xs overflow-x-auto no-scrollbar max-w-full">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleSelectTab(cat)}
                    className={cn(
                      "relative shrink-0 whitespace-nowrap rounded-full px-3.5 sm:px-4 py-2 text-xs sm:text-[13px] font-bold transition-all duration-200 focus:outline-none cursor-pointer",
                      isActive
                        ? "text-white shadow-sm"
                        : "text-muted hover:text-ink hover:bg-white/80"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activePortfolioFilterPill"
                        className="absolute inset-0 rounded-full bg-slate-900 z-0"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 32 }
                        }
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          {displayedProjects.length === 0 ? (
            <div className="text-center py-16 px-4 bg-light/50 rounded-2xl border border-line">
              <Layers size={32} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-bold text-ink">No projects found in {selectedCategory}</p>
              <p className="text-xs text-muted mt-1">Add new client projects from the Super Admin panel to populate this category.</p>
              <button
                onClick={() => setSelectedCategory("All")}
                className="mt-4 inline-flex items-center text-xs font-bold text-accent hover:underline cursor-pointer"
              >
                View All Projects
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-7"
            >
              <AnimatePresence mode="popLayout">
                {displayedProjects.map((project, idx) => (
                  <motion.div
                    key={`${project.title}-${project.url || idx}-${idx}`}
                    layout
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <ProjectCard project={project} index={idx} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-8 py-3.5 text-sm font-bold text-ink shadow-sm transition duration-300 hover:border-accent hover:bg-light hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
              >
                Load More Projects
                <ArrowRight size={16} className="text-accent" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
