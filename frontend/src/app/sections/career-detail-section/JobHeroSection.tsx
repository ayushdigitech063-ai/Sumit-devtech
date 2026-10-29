"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, MapPin, Briefcase, Clock, Sparkles } from "lucide-react";
import Container from "@/app/ui/Container";
import type { Opening } from "@/data/career-data";

export interface JobHeroSectionProps {
  job: Opening;
}

export default function JobHeroSection({ job }: JobHeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden bg-dark text-white pt-28 pb-20 md:pt-22 md:pb-23 border-b border-white/10">
      {/* Background radial gradient glow & grid matching standard banner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-44 h-[520px] w-[520px] animate-blob rounded-full bg-accent opacity-30 blur-[100px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-[440px] w-[440px] animate-blob rounded-full bg-accent-2 opacity-25 blur-[100px] [animation-delay:-6s] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(#ffffff0d_1px,transparent_1px),linear-gradient(90deg,#ffffff0d_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(circle_at_60%_40%,#000,transparent_75%)] animate-grid -z-10"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            {/* Back to all openings link */}
            <motion.div variants={itemVariants} className="mb-6">
              <Link
                href="/career#openings"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70 transition hover:text-accent"
              >
                <ArrowLeft size={14} />
                <span>All Openings</span>
              </Link>
            </motion.div>

            {/* Department / Category Pill */}
            <motion.div variants={itemVariants} className="mb-4 inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md shadow-sm">
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                <span>{job.department} Department</span>
              </span>
            </motion.div>

            {/* H1 Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight sm:text-3xl md:text-3xl lg:text-5xl leading-[1.08] text-white"
            >
              {job.title}
            </motion.h1>

            {/* Job Summary Paragraph */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg sm:leading-relaxed"
            >
              {job.summary}
            </motion.p>

            {/* Metadata Chips: Location, Job Type, Experience */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm">
                <MapPin size={14} className="text-accent" />
                <span>{job.location}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm">
                <Briefcase size={14} className="text-accent-2" />
                <span>{job.type}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm">
                <Clock size={14} className="text-accent" />
                <span>{job.experience}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
                <Sparkles size={14} />
                <span>Active Hiring</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

