"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { Sparkles, ArrowRight, Monitor, ShieldCheck, Zap, Lock } from "lucide-react";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import { ProjectPageData } from "@/data/projects-data";

export interface HeroSectionProps {
  data?: ProjectPageData["hero"];
  descProp?: string;
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
      <div className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
        <span ref={ref}>{formatted}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm font-medium text-white/70">{label}</div>
    </div>
  );
}

export default function HeroSection({ data, descProp }: HeroSectionProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  const title = data?.title ?? (
    <>
      Transforming Vision Into High-Impact <span className="text-brand">Digital Realities</span>
    </>
  );

  const description =
    data?.subtitle ??
    descProp ??
    "From venture-backed startups to enterprise industry leaders, we build responsive, high-velocity websites, custom cloud applications, and conversion-focused digital systems engineered for business growth.";

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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#10131e] via-[#141826] to-[#191e2f] text-white pt-36 pb-24 md:pt-40 md:pb-28 min-h-[75vh] flex items-center border-b border-white/10">
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
        className="pointer-events-none absolute inset-0 opacity-[0.04] overflow-hidden -z-10"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Heading, Subtitle & Count-up Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 text-left"
            >
              {/* Top Trust Badge */}
              <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md shadow-sm">
                  <Sparkles size={13} className="text-accent" />
                  <span>Verified Case Studies &amp; Client Deployments</span>
                </span>
              </motion.div>

              {/* H1 Heading */}
              <motion.h1
                variants={itemVariants}
                className="font-heading text-4xl sm:text-5xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.12] text-white"
              >
                {title}
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-xl text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-normal"
              >
                {description}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/contact-us" variant="primary" className="gap-2.5 shadow-xl shadow-accent/25">
                  Start Your Project
                  <ArrowRight size={16} />
                </Button>
                <a
                  href="#projects-showcase"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/10"
                >
                  Explore Work
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column: Key Guarantees */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-5 flex flex-col gap-4"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-accent/20 text-accent">
                    <Zap size={20} />
                  </div>
                  <h4 className="font-heading font-bold text-white text-lg">Sub-Second Speed</h4>
                </div>
                <p className="text-sm text-white/70">Optimized for Google Core Web Vitals with 90+ Lighthouse score guarantee.</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-emerald-400/20 text-emerald-400">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="font-heading font-bold text-white text-lg">100% Code Ownership</h4>
                </div>
                <p className="text-sm text-white/70">Zero platform lock-in. Full access to source code, IP, and deployment keys.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
