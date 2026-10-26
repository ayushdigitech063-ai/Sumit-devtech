"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Container from "@/app/ui/Container";
import { ProjectPageData } from "@/data/projects-data";

export interface HeroSectionProps {
  data?: ProjectPageData["hero"];
}

export default function HeroSection({ data }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const badge = data?.badge ?? "Portfolio & Case Studies";
  const title = data?.title ?? "Our Work & Impactful";
  const highlight = data?.highlight ?? "Projects";
  const subtitle =
    data?.subtitle ??
    "Explore how we transform complex business challenges into sleek, high-converting digital products, cloud platforms, and modern web applications.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-dark text-white pt-28 pb-16 md:pt-36 md:pb-20 border-b border-white/5">
      {/* Background radial gradient glow & grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(255,106,31,0.2),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1100px] text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Pill Badge */}
            <motion.div variants={itemVariants} className="mb-5 inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent backdrop-blur-md">
                <Sparkles size={14} className="text-accent-2" />
                {badge}
              </span>
            </motion.div>

            {/* H1 Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[56px] leading-[1.08] text-white"
            >
              {title} <span className="text-brand">{highlight}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-base text-white/70 sm:text-lg sm:leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
