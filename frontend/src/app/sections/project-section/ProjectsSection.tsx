"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Container from "@/app/ui/Container";
import ProjectCard from "./ProjectCard";
import { ProjectCategory, ProjectPageData } from "@/data/projects-data";
import { cn } from "@/lib/utils";

export interface ProjectsSectionProps {
  data?: ProjectPageData["projects"];
}

const defaultCategories: ProjectCategory[] = ["See All", "Technology", "Helpdesk", "Analysis", "Marketing"];

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("See All");
  const shouldReduceMotion = useReducedMotion();

  const categories = data?.categories ?? defaultCategories;

  const filteredProjects = useMemo(() => {
    const items = data?.items ?? [];
    if (activeCategory === "See All") {
      return items;
    }
    return items.filter((item) => item.categories.includes(activeCategory));
  }, [data?.items, activeCategory]);

  return (
    <section className="relative bg-dark py-20 md:py-28 overflow-hidden text-white">
      {/* Background Soft Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-accent/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 -right-48 h-96 w-96 rounded-full bg-accent-2/10 blur-[130px]"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          {/* Floating Pill Filter Bar */}
          <div className="flex justify-center mb-12 sm:mb-16">
            <nav
              aria-label="Filter projects by category"
              className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full border border-white/10 bg-dark-2/90 shadow-2xl backdrop-blur-xl"
            >
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={cn(
                      "relative rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      isActive ? "text-dark font-extrabold" : "text-white/70 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeProjectFilter"
                        className="absolute inset-0 rounded-full bg-brand shadow-lg shadow-accent/25 z-0"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 30 }
                        }
                      />
                    )}
                    <span className="relative z-10">{category}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bento Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8"
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

          {/* Empty fallback state if needed */}
          {filteredProjects.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-base text-white/50">No projects found in this category.</p>
              <button
                type="button"
                onClick={() => setActiveCategory("See All")}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-accent underline underline-offset-4"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
