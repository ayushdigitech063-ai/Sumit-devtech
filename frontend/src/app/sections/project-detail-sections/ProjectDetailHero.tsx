"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import Container from "@/app/ui/Container";
import { ProjectDetailItem } from "@/data/projects-data";

export default function ProjectDetailHero({ project }: { project: ProjectDetailItem }) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative overflow-hidden bg-dark text-white pt-15 pb-9 border-b border-white/10">
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          {/* Breadcrumb */}
          <motion.div {...fadeUp(0)} className="mb-8 flex items-center gap-2 text-xs text-white/50 font-medium">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/project" className="hover:text-white/80 transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-white/80 truncate max-w-[180px]">{project.title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: Text */}
            <div className="lg:col-span-6 xl:col-span-5">
              <motion.div {...fadeUp(0.05)} className="mb-5 inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
                  <Tag size={11} className="text-accent" />
                  {project.category}
                </span>
              </motion.div>

              <motion.h1 {...fadeUp(0.1)} className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] text-white mb-4">
                {project.title}
              </motion.h1>

              <motion.p {...fadeUp(0.15)} className="text-base text-white/70 leading-relaxed mb-8 max-w-lg">
                {project.tagline}
              </motion.p>

              {/* Meta chips */}
              <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-3 mb-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
                  <Clock size={13} className="text-accent" /> {project.duration}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
                  <Calendar size={13} className="text-accent-2" /> Delivered {project.deliveredAt}
                </span>
              </motion.div>

              {/* CTAs */}
              <motion.div {...fadeUp(0.25)} className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:shadow-accent/40"
                  >
                    Start a Project <ArrowRight size={15} />
                  </Link>
                )}
                <Link
                  href="/project"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-white/40 hover:bg-white/10"
                >
                  <ArrowLeft size={15} /> All Projects
                </Link>
              </motion.div>
            </div>

            {/* Right: Hero Image */}
            <motion.div
              {...fadeUp(0.15)}
              className="lg:col-span-6 xl:col-span-7 relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                <div className="relative h-64 sm:h-70 md:h-96 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 55vw"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

