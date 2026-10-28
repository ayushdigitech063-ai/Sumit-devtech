"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Globe, Shield, BarChart3, Palette, Laptop, Lock, Sparkles } from "lucide-react";
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
  const cardNumber = index < 9 ? `0${index + 1}` : `${index + 1}`;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
      transition={{
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group relative h-full flex flex-col justify-between",
        "col-span-1"
      )}
    >
      <Link
        href={project.href}
        className="relative flex flex-col justify-between h-full rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {/* Top Header: Category Chips & Large Faded Number */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            {/* Category Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-bold text-accent shadow-xs"
                >
                  <Sparkles size={11} className="text-accent" />
                  {cat}
                </span>
              ))}

              {isWide && (
                <span className="hidden sm:inline-flex rounded-full border border-line bg-light px-3 py-1 text-xs font-semibold text-muted">
                  Featured Case Study
                </span>
              )}
            </div>

            {/* Large Faded Watermark Number */}
            <span className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-line group-hover:text-accent/30 transition-colors select-none">
              {cardNumber}
            </span>
          </div>

          {/* Mini Browser Frame Preview */}
          <div className="overflow-hidden rounded-2xl border border-line bg-light shadow-xs mb-6">
            {/* Window Bar Header with Traffic-Light Dots */}
            <div className="flex items-center justify-between border-b border-line bg-white px-3.5 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>

              {/* URL Pill */}
              <div className="flex items-center gap-1.5 rounded-full bg-light border border-line/60 px-3 py-0.5 text-[10px] font-medium text-muted">
                <Lock size={9} className="text-accent" />
                <span className="truncate max-w-[150px] sm:max-w-[200px]">
                  sumitdevtech.com/{project.slug}
                </span>
              </div>

              <div className="w-5" />
            </div>

            {/* Image / Simulated UI Canvas */}
            {project.image ? (
              <div className="relative w-full h-52 overflow-hidden">
                <div className="absolute inset-0 transform transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            ) : (
              <div className="relative h-44 overflow-hidden p-4 bg-gradient-to-br from-white via-light/60 to-line/30">
                <div className="h-full flex flex-col justify-between transform transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1.5">
                  {/* Simulated Header Bar */}
                  <div className="rounded-xl border border-line/80 bg-white p-3 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-accent/15 text-accent">
                          <Icon size={12} />
                        </span>
                        <span className="h-2 w-16 rounded-full bg-ink/70" />
                      </div>
                      <span className="h-2 w-8 rounded-full bg-line" />
                    </div>
                    <div className="h-2 w-3/4 rounded bg-dark/15 mb-1.5" />
                    <div className="h-1.5 w-1/2 rounded bg-dark/10" />
                  </div>

                  {/* Simulated 2-Column Module */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="rounded-xl border border-line/70 bg-white p-2.5 shadow-xs">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        <span className="h-1.5 w-12 rounded bg-dark/25" />
                      </div>
                      <div className="h-1.5 w-full rounded bg-line mb-1" />
                      <div className="h-1 w-2/3 rounded bg-line" />
                    </div>
                    <div className="rounded-xl border border-line/70 bg-white p-2.5 shadow-xs">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="h-2 w-2 rounded-full bg-accent-2" />
                        <span className="h-1.5 w-12 rounded bg-dark/25" />
                      </div>
                      <div className="h-1.5 w-full rounded bg-line mb-1" />
                      <div className="h-1 w-2/3 rounded bg-line" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Project Title & 2-Line Clamped Description */}
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold tracking-tight text-ink group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-muted line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Card Footer: CTA & Rotating Arrow Button */}
        <div className="mt-6 pt-5 border-t border-line/70 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-accent group-hover:text-accent-2 transition-colors">
            View Project Details
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-light border border-line text-dark transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:rotate-45 shadow-xs">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
