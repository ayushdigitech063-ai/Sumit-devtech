"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";

export interface HeroSectionProps {
  totalProjects: number;
  totalCategories: number;
}

interface StatCounterProps {
  numericValue: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

function StatCounter({ numericValue, suffix = "", decimals = 0, label }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!inView || shouldReduceMotion) return;

    const controls = animate(0, numericValue, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(latest),
    });

    return () => controls.stop();
  }, [inView, shouldReduceMotion, numericValue]);

  const formatted = shouldReduceMotion
    ? numericValue.toFixed(decimals)
    : decimals
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toString();

  return (
    <div className="space-y-1">
      <div className="font-heading text-3xl sm:text-3xl lg:text-5xl font-black tracking-tight text-white">
        <span ref={ref}>{formatted}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm font-medium text-white/70">{label}</div>
    </div>
  );
}

export default function HeroSection({
  totalProjects,
  totalCategories,
}: HeroSectionProps) {
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
    <section className="relative overflow-hidden bg-dark text-white pt-28 pb-25 md:pt-28 md:pb-35 border-b border-white/10">
      {/* Background radial gradient glow & grid */}
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
        <div className="mx-auto w-full max-w-[900px] text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Chip with pulsating green dot */}
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md shadow-sm">
                <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                <span>Our Work</span>
              </span>
            </motion.div>

            {/* H1 Heading with highlighted last words */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight sm:text-3xl md:text-3xl lg:text-5xl leading-[1.08] text-white"
            >
              Every Project We Have <span className="text-brand">Delivered</span>
            </motion.h1>

            {/* Subtitle with bright readable contrast */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg sm:leading-relaxed"
            >
              Browse our complete portfolio of live client solutions, corporate portals, booking platforms, and high-converting e-commerce web applications.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact-us" variant="primary" className="gap-2.5 shadow-xl shadow-accent/25">
                Start Your Project
                <ArrowRight size={16} />
              </Button>
              <a
                href="#projects-catalog"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
              >
                Explore Catalog
              </a>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

