"use client";

import React, { useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FolderSearch } from "lucide-react";
import Container from "@/app/ui/Container";
import ProjectCard from "./ProjectCard";
import { ProjectCategory, ProjectPageData } from "@/data/projects-data";
import { cn } from "@/lib/utils";

export interface ProjectsSectionProps {
  data?: ProjectPageData["projects"];
}

const defaultCategories: ProjectCategory[] = ["See All", "Technology", "Helpdesk", "Analysis", "Marketing"];

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const categories = data?.categories ?? defaultCategories;
  const items = useMemo(() => data?.items ?? [], [data?.items]);

  // Derive active category directly from searchParams (idiomatic URL-driven state)
  const categoryParam = searchParams?.get("category");
  const activeCategory: ProjectCategory =
    categoryParam && categories.includes(categoryParam as ProjectCategory)
      ? (categoryParam as ProjectCategory)
      : "See All";

  const handleSelectCategory = (cat: ProjectCategory) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
    if (cat === "See All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // Pre-calculate project counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "See All": items.length };
    categories.forEach((cat) => {
      if (cat !== "See All") {
        counts[cat] = items.filter((item) => item.categories.includes(cat)).length;
      }
    });
    return counts;
  }, [items, categories]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "See All") {
      return items;
    }
    return items.filter((item) => item.categories.includes(activeCategory));
  }, [items, activeCategory]);

  return (
    <section id="projects-catalog" className="relative bg-light py-15 md:py-5 overflow-hidden">
      {/* Subtle Dot-Grid Pattern for Light Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          {/* Sticky Blurred Filter Bar with Count Badges */}
          <div className="sticky top-20 z-30 mb-8 py-3.5 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="mx-auto flex justify-center">
              <nav
                aria-label="Filter projects by category"
                className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full border border-line bg-white/90 shadow-lg shadow-black/5 backdrop-blur-xl"
              >
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  const count = categoryCounts[category] ?? 0;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleSelectCategory(category)}
                      aria-pressed={isActive}
                      className={cn(
                        "relative rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                        isActive
                          ? "text-dark font-black"
                          : "text-muted hover:text-dark hover:bg-light/60"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeProjectFilter"
                          className="absolute inset-0 rounded-full bg-brand shadow-md shadow-accent/25 z-0"
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 420, damping: 32 }
                          }
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <span>{category}</span>
                        <span
                          className={cn(
                            "text-[10px] sm:text-xs font-semibold px-1.5 py-0.2 rounded-full",
                            isActive
                              ? "bg-dark/15 text-dark"
                              : "bg-line/70 text-muted"
                          )}
                        >
                          {count}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Showing X of Y Projects Status Line */}
          <div className="mb-8 flex items-center justify-between border-b border-line/70 pb-9 text-xs sm:text-sm font-semibold text-muted">
            <div>
              Showing <span className="font-bold text-ink">{filteredProjects.length}</span> of{" "}
              <span className="font-bold text-ink">{items.length}</span> projects
            </div>
          </div>

          {/* Bento Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 auto-rows-fr"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="rounded-3xl border border-line bg-white p-12 text-center shadow-sm my-8">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-light text-muted mb-4">
                <FolderSearch size={28} />
              </div>
              <h3 className="font-heading text-xl font-bold text-ink mb-2">
                No projects found in &quot;{activeCategory}&quot;
              </h3>
              <p className="text-sm text-muted max-w-md mx-auto mb-6">
                We couldn&apos;t find any case studies matching this category filter. Try viewing all projects.
              </p>
              <button
                type="button"
                onClick={() => handleSelectCategory("See All")}
                className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-dark shadow-md shadow-accent/20 transition-all hover:scale-105"
              >
                Reset to All Projects
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
