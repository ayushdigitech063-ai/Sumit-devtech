"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Sparkles } from "lucide-react";
import Container from "@/app/ui/Container";

export default function PackageHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-dark text-white pt-28 pb-16 md:pt-25 md:pb-30 border-b border-white/10">

      <Container>
        <div className="mx-auto w-full max-w-[1100px] text-center">
          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
              <Sparkles size={13} className="text-accent" />
              Transparent, Outcome-Driven Pricing
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.08] text-white"
          >
            Website &amp; Digital Engineering <br className="hidden sm:inline" />
            <span className="text-brand">Packages &amp; Pricing</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-white/80 leading-relaxed"
          >
            Clear milestones, zero hidden surprises, and enterprise-grade tech stacks designed to deliver tangible return on investment.
          </motion.p>

          {/* Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold text-white/70"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400" /> 100% Code &amp; IP Ownership
            </span>
            <span className="flex items-center gap-2">
              <Zap size={16} className="text-accent" /> Sub-Second Core Web Vitals
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-accent-2" /> Milestone-Based Payments
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

