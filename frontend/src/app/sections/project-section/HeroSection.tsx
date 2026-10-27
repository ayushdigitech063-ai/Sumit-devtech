"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { Sparkles, ArrowRight, Monitor, ShieldCheck, Zap, Lock } from "lucide-react";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import { ProjectPageData } from "@/data/projects-data";

export interface HeroSectionProps {
  data?: ProjectPageData["hero"];
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
      <div className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-white">
        <span ref={ref}>{formatted}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm font-medium text-white/70">{label}</div>
    </div>
  );
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden bg-dark text-white pt-28 pb-20 md:pt-22 md:pb-23  border-b border-white/10">
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
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Heading, Subtitle & Count-up Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 text-left"
            >
              {/* Chip with pulsating green dot */}
              <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md shadow-sm">
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                  <span>{badge}</span>
                </span>
              </motion.div>

              {/* H1 Heading with highlighted last words */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[56px] leading-[1.08] text-white"
              >
                {title} <span className="text-brand">{highlight}</span>
              </motion.h1>

              {/* Subtitle with bright readable contrast (>= 75% white) */}
              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-xl text-base text-white/80 sm:text-lg sm:leading-relaxed"
              >
                {subtitle}
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/contact-us" variant="primary" className="gap-2.5 shadow-xl shadow-accent/25">
                  Start Your Project
                  <ArrowRight size={16} />
                </Button>
                <a
                  href="#projects-catalog"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  Explore Work
                </a>
              </motion.div>

              {/* Stats Row with Count-Up Numbers */}
              <motion.div
                variants={itemVariants}
                className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8"
              >
                <StatCounter numericValue={500} suffix="+" label="Delivered Sites" />
                <StatCounter numericValue={100} suffix="%" label="Tested Delivery" />
                <StatCounter numericValue={4.9} suffix="★" decimals={1} label="Client Rating" />
              </motion.div>
            </motion.div>

            {/* Right Column: Floating Glass Mini-Cards */}
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:col-span-5"
            >
              {/* Ambient Background Glow */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-linear-to-r from-accent/20 to-accent-2/15 blur-2xl -z-10"
              />

              {/* Floating Glass Showcase Window */}
              <div className="animate-float overflow-hidden rounded-[28px] border border-white/20 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-xl">
                {/* Window Bar */}
                <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1 text-[11px] text-white/70">
                    <Lock size={11} className="text-accent" />
                    <span>sumitdevtech.com/projects</span>
                  </div>
                  <div className="h-3 w-3" />
                </div>

                {/* Showcase Cards Grid */}
                <div className="space-y-3.5">
                  {/* Mini Card 1 */}
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent">
                        <Zap size={14} /> Full-Stack Architecture
                      </span>
                      <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                        100% Production SLA
                      </span>
                    </div>
                    <div className="h-2 w-3/4 rounded-full bg-white/30 mb-2" />
                    <div className="h-1.5 w-full rounded-full bg-white/15" />
                  </div>

                  {/* Mini Card 2: 2 Column Sub-Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-transparent p-3.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/20 text-accent mb-2">
                        <Monitor size={15} />
                      </div>
                      <div className="text-xs font-extrabold text-white">Next.js 15 App</div>
                      <div className="text-[10px] text-white/60">Sub-second Paint</div>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-transparent p-3.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-2/20 text-accent-2 mb-2">
                        <ShieldCheck size={15} />
                      </div>
                      <div className="text-xs font-extrabold text-white">Zero-Trust WAF</div>
                      <div className="text-[10px] text-white/60">Hardened Security</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mini-Badge (Bottom Left) */}
              <div className="absolute -bottom-4 -left-4 rounded-xl border border-white/20 bg-dark-2/95 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:-left-6">
                <div className="flex items-center gap-2.5 text-xs font-bold text-white">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/20 text-accent">
                    <Sparkles size={15} />
                  </span>
                  <div>
                    <div className="leading-tight">Case Studies Verified</div>
                    <div className="text-[10px] font-normal text-white/60">6 Industry Categories</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
