"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import ProjectCard, { ProjectData } from "./ProjectCard";

export interface AllProjectsGridSectionProps {
  projects: ProjectData[];
}

const PAGE_SIZE = 12;
const LOAD_MORE_STEP = 9;

export default function AllProjectsGridSection({ projects }: AllProjectsGridSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const displayedProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

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
            text="Review our delivered client websites, custom applications, e-commerce stores, and corporate platforms."
          />

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-7"
          >
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
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

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-8 py-3.5 text-sm font-bold text-ink shadow-sm transition duration-300 hover:border-accent hover:bg-light hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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


