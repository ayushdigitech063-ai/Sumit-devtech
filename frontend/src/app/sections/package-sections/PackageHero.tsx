"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Sparkles } from "lucide-react";
import Container from "@/app/ui/Container";

export default function PackageHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#10131e] via-[#141826] to-[#191e2f] text-white pt-36 pb-24 md:pt-40 md:pb-28 min-h-[75vh] flex items-center border-b border-white/10">
      {/* Background ambient lighting blooms matching Home Hero */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04] overflow-hidden z-0"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute right-0 -top-32 h-[520px] w-[520px] animate-blob rounded-full bg-accent/25 opacity-70 blur-[130px] overflow-hidden" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-[460px] w-[460px] animate-blob rounded-full bg-amber-400/20 opacity-60 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-blue-500/15 blur-[140px]" />

      <Container className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-[1100px] text-center">
          {/* Top Pill */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
              <Sparkles size={13} className="text-accent" />
              Transparent, Outcome-Driven Pricing
            </span>
          </motion.div>

          {/* Heading with Home font scale */}
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight leading-[1.12] text-white"
          >
            Website &amp; Digital Engineering <br className="hidden sm:inline" />
            <span className="text-brand">Packages &amp; Pricing</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-normal"
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
