"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Smartphone, Monitor, ShieldCheck, Zap } from "lucide-react";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import { ServicePageData, FeatureChip, TrustItem } from "@/types/service-page";

export interface HeroSectionProps {
  data?: ServicePageData["hero"];
  visual?: React.ReactNode;
  badge?: string;
  title?: React.ReactNode;
  description?: string;
  featureChips?: FeatureChip[];
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  trustItems?: TrustItem[];
  previewUrl?: string;
  floatingBadge1Title?: string;
  floatingBadge1Sub?: string;
  floatingBadge2Title?: string;
  floatingBadge2Sub?: string;
}

export default function HeroSection({
  data,
  visual,
  badge: badgeProp,
  title: titleProp,
  description: descProp,
  featureChips: chipsProp,
  primaryCtaText: primaryCtaTextProp,
  primaryCtaHref: primaryCtaHrefProp,
  secondaryCtaText: secondaryCtaTextProp,
  secondaryCtaHref: secondaryCtaHrefProp,
  trustItems: trustItemsProp,
  previewUrl: previewUrlProp,
  floatingBadge1Title: fb1TitleProp,
  floatingBadge1Sub: fb1SubProp,
  floatingBadge2Title: fb2TitleProp,
  floatingBadge2Sub: fb2SubProp,
}: HeroSectionProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  const badge = data?.badge ?? badgeProp ?? "Website Design Service";
  const title = titleProp ?? (
    data ? (
      <>
        {data.title}{" "}
        {data.highlight && <span className="text-brand">{data.highlight}</span>}
      </>
    ) : (
      <>
        Bespoke Website Designs That Turn Visitors Into{" "}
        <span className="text-brand">Loyal Clients</span>
      </>
    )
  );
  const description =
    data?.description ??
    descProp ??
    "We engineer custom, mobile-responsive web interfaces that harmonize visual elegance with strategic conversion architecture. Fast, accessible, and tailored to elevate your brand presence.";
  const featureChips = data?.chips ?? chipsProp ?? [];
  const primaryCtaText = data?.primaryCta?.label ?? primaryCtaTextProp ?? "Get Free Design Quote";
  const primaryCtaHref = data?.primaryCta?.href ?? primaryCtaHrefProp ?? "/contact-us";
  const secondaryCtaText = data?.secondaryCta?.label ?? secondaryCtaTextProp ?? "Explore Services";
  const secondaryCtaHref = data?.secondaryCta?.href ?? secondaryCtaHrefProp ?? "#web-design-services";
  const trustItems = data?.trustItems ?? trustItemsProp ?? [];
  const previewUrl = data?.previewUrl ?? previewUrlProp ?? "sumitdevtech.com/website-design";
  const floatingBadge1Title = data?.floatingBadge1?.title ?? fb1TitleProp ?? "100% Mobile Ready";
  const floatingBadge1Sub = data?.floatingBadge1?.sub ?? fb1SubProp ?? "Fluid Micro-Breakpoints";
  const floatingBadge2Title = data?.floatingBadge2?.title ?? fb2TitleProp ?? "Pixel-Perfect Responsive";
  const floatingBadge2Sub = data?.floatingBadge2?.sub ?? fb2SubProp ?? "Modern Figma Systems";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
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

  const floatVariants = {
    animate: {
      y: shouldReduceMotion ? 0 : [-6, 6, -6],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-dark text-white md:pt-15 md:pb-8">
 
      <Container>
        <div className="mx-auto max-w-[1100px] max-h-[545px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Copy & CTAs */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7"
            >
              {/* Small Badge */}
              <motion.div variants={itemVariants} className="mb-5 inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent backdrop-blur-md">
                  <Sparkles size={14} className="text-accent-2" />
                  {badge}
                </span>
              </motion.div>

              {/* H1 Heading */}
              <motion.h1
                variants={itemVariants}
                className="font-bold tracking-tight sm:text-xl md:text-5xl leading-[1.08]"
              >
                {title}
              </motion.h1>

              {/* Short Paragraph */}
              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-2xl text-base text-white/70 text-lg sm:leading-relaxed"
              >
                {description}
              </motion.p>

              {/* Feature Chips */}
              <motion.div variants={itemVariants} className="mt-7 flex flex-wrap gap-2.5">
                {featureChips.map((chip) => (
                  <span
                    key={chip.id}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm"
                  >
                    <CheckCircle2 size={13} className="text-accent" />
                    {chip.label}
                  </span>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={primaryCtaHref} variant="primary" className="gap-2.5 shadow-lg shadow-accent/25">
                  {primaryCtaText}
                  <ArrowRight size={16} />
                </Button>
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  {secondaryCtaText}
                </Link>
              </motion.div>

              {/* Trust Proof Row */}
              <motion.div
                variants={itemVariants}
                className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4"
              >
                {trustItems.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <div className="text-xl font-extrabold text-white sm:text-2xl">{item.value}</div>
                    <div className="text-xs font-medium text-white/50">{item.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column: Visual Mockup or Custom visual prop */}
            {visual ? (
              <motion.div
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative lg:col-span-5"
              >
                {visual}
              </motion.div>
            ) : (
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

                {/* Browser Mockup Window */}
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-dark-2/90 shadow-2xl backdrop-blur-xl">
                  {/* Window Header */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/50">
                      <Monitor size={12} className="text-accent" />
                      <span>{previewUrl}</span>
                    </div>
                    <div className="h-2.5 w-2.5" />
                  </div>

                  {/* Mockup Canvas */}
                  <div className="relative p-5 space-y-4">
                    {/* Hero inside mockup */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="h-2 w-16 rounded-full bg-accent/60" />
                        <span className="h-2 w-8 rounded-full bg-white/20" />
                      </div>
                      <div className="h-3.5 w-3/4 rounded-md bg-white/80 mb-2" />
                      <div className="h-2 w-full rounded bg-white/20 mb-1" />
                      <div className="h-2 w-2/3 rounded bg-white/20" />
                    </div>

                    {/* Mockup 2-column cards */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-3.5 space-y-2">
                        <div className="h-7 w-7 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                          <Zap size={14} />
                        </div>
                        <div className="h-2.5 w-16 rounded bg-white/70" />
                        <div className="h-2 w-20 rounded bg-white/30" />
                      </div>
                      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-3.5 space-y-2">
                        <div className="h-7 w-7 rounded-lg bg-accent-2/20 flex items-center justify-center text-accent-2">
                          <ShieldCheck size={14} />
                        </div>
                        <div className="h-2.5 w-16 rounded bg-white/70" />
                        <div className="h-2 w-20 rounded bg-white/30" />
                      </div>
                    </div>

                    {/* Progress Metric Simulation */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
                      <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                        <span className="text-white/75">UX Optimization</span>
                        <span className="text-accent font-bold">100% Score</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-full rounded-full bg-brand" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 1 */}
                <motion.div
                  variants={floatVariants}
                  animate="animate"
                  className="absolute -bottom-5 -left-4 rounded-xl border border-white/20 bg-dark-2/95 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:-left-6"
                >
                  <div className="flex items-center gap-2.5 text-xs font-bold text-white">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                      <Smartphone size={15} />
                    </span>
                    <div>
                      <div className="leading-tight">{floatingBadge1Title}</div>
                      <div className="text-[10px] font-normal text-white/50">{floatingBadge1Sub}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Badge 2 */}
                <motion.div
                  variants={floatVariants}
                  animate="animate"
                  transition={{ delay: 1 }}
                  className="absolute -top-5 -right-3 rounded-xl border border-white/20 bg-dark-2/95 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:-right-5"
                >
                  <div className="flex items-center gap-2.5 text-xs font-bold text-white">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/20 text-accent">
                      <Sparkles size={15} />
                    </span>
                    <div>
                      <div className="leading-tight">{floatingBadge2Title}</div>
                      <div className="text-[10px] font-normal text-white/50">{floatingBadge2Sub}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
