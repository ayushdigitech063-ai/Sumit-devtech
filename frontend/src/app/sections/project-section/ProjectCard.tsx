"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Globe, Shield, BarChart3, Palette, Laptop } from "lucide-react";
import { ProjectItem } from "@/data/projects-data";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "software-and-app": Code2,
  "web-development": Globe,
  "platform-integration": Laptop,
  "network-security": Shield,
  "digital-marketing": BarChart3,
  "product-and-design": Palette,
};

export interface ProjectCardProps {
  project: ProjectItem;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = iconMap[project.slug] || Code2;
  const isWide = project.bentoSpan?.includes("col-span-2");

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
      transition={{
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-dark-2 transition duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/15 flex flex-col justify-between min-h-[380px] sm:min-h-[420px]",
        project.bentoSpan || "col-span-1"
      )}
    >
      {/* Visual Canvas / Background Area */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          /* High-Fidelity Themed Gradient/Pattern Placeholder */
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br transition-transform duration-700 ease-out group-hover:scale-105",
              project.gradientAccent || "from-accent/20 via-dark-2 to-dark"
            )}
          >
            {/* Tech Grid Pattern */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"
            />
            {/* Ambient Animated Blob */}
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl transition duration-700 group-hover:scale-125 group-hover:bg-accent/35"
            />
            {/* Abstract Graphic Symbol / Watermark */}
            <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-accent transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
              <Icon size={26} />
            </div>
            {/* Massive Background Initial / Monogram */}
            <div
              aria-hidden="true"
              className="absolute -bottom-8 -right-4 select-none font-heading text-[140px] font-black leading-none text-white/[0.03] transition-transform duration-700 group-hover:translate-x-2 group-hover:text-white/[0.06]"
            >
              {project.title.charAt(0)}
            </div>
          </div>
        )}

        {/* Gradient dark scrim for flawless contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/10 transition-opacity duration-300 group-hover:opacity-90" />
      </div>

      {/* Card Header (Category Chips & Index) */}
      <div className="relative z-10 flex items-start justify-between p-6 sm:p-8">
        <div className="flex flex-wrap gap-2">
          {project.categories.map((cat) => (
            <span
              key={cat}
              className="inline-flex items-center rounded-full border border-white/15 bg-dark/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md"
            >
              {cat}
            </span>
          ))}
        </div>

        <span className="font-heading text-xs font-black tracking-widest text-white/40">
          0{index + 1}
        </span>
      </div>

      {/* Card Bottom: Content & Slide-up Hover Action */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end">
        <div className="transform transition-transform duration-300 ease-out group-hover:-translate-y-2">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 group-hover:text-accent-2 transition-colors">
            {project.title}
          </h2>

          <p className="text-sm leading-relaxed text-white/70 line-clamp-2 max-w-xl">
            {project.description}
          </p>
        </div>

        {/* Sliding hover action button */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <Link
            href={project.href}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent group-hover:text-white transition-colors"
          >
            <span>View Project Details</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-dark group-hover:translate-x-1">
              <ArrowUpRight size={14} />
            </span>
          </Link>

          {isWide && (
            <span className="hidden sm:inline-flex text-[11px] font-semibold text-white/40">
              Featured Case Study
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
