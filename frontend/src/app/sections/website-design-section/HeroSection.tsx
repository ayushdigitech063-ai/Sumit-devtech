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
  const title = data?.title ?? titleProp ?? (
    <>
      Modern Website Design That <span className="text-brand">Engages &amp; Converts</span>
    </>
  );
  const description =
    data?.description ??
    descProp ??
    "We create visually stunning, lightning-fast, and conversion-optimized websites tailored to your brand identity and business objectives.";

  const featureChips = data?.chips ?? chipsProp ?? [
    { icon: "Sparkles", label: "Custom UI/UX" },
    { icon: "Zap", label: "Sub-Second Load" },
    { icon: "ShieldCheck", label: "SEO Optimized" },
  ];

  const primaryCtaText = data?.primaryCta?.label ?? primaryCtaTextProp ?? "Get Free Quote";
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

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#10131e] via-[#141826] to-[#191e2f] text-white pt-36 pb-24 md:pt-44 md:pb-28 min-h-[75vh] flex items-center border-b border-white/10">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute right-0 -top-32 h-[520px] w-[520px] animate-blob rounded-full bg-accent/25 opacity-70 blur-[130px] overflow-hidden" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-[460px] w-[460px] animate-blob rounded-full bg-amber-400/20 opacity-60 blur-[120px]" />
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04] overflow-hidden -z-10"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
 
      <Container className="relative z-10 w-full">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Copy & CTAs */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7"
            >
              {/* Small Badge */}
              <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {badge}
                </span>
              </motion.div>

              {/* H1 Heading matching Home & Packages typography */}
              <motion.h1
                variants={itemVariants}
                className="font-heading text-4xl sm:text-5xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.15] text-white"
              >
                {title}
              </motion.h1>

              {/* Paragraph */}
              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-xl text-base sm:text-lg text-white/75 leading-relaxed font-normal"
              >
                {description}
              </motion.p>

              {/* Feature Chips */}
              {featureChips.length > 0 && (
                <motion.div variants={itemVariants} className="mt-6 flex flex-wrap items-center gap-2.5">
                  {featureChips.map((chip, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                    >
                      <Sparkles size={12} className="text-brand" />
                      {chip.label}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* CTAs */}
              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
                <Button href={primaryCtaHref} variant="primary" className="gap-2.5 shadow-xl shadow-accent/25">
                  {primaryCtaText}
                  <ArrowRight size={16} />
                </Button>
                <Button href={secondaryCtaHref} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  {secondaryCtaText}
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column: Visual Interactive Glass Preview */}
            <div className="lg:col-span-5">
              {visual ?? (
                <div className="relative rounded-3xl border border-white/15 bg-white/[0.04] p-7 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden group">
                  {/* Glowing corner aura */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl group-hover:bg-accent/35 transition-all duration-500" />
                  
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 pb-5 border-b border-white/10 text-xs text-white/60">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[11px] truncate text-white/50">{previewUrl}</span>
                  </div>

                  {/* Main Visual Showcase */}
                  <div className="py-8 space-y-5 text-center relative z-10">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-accent/20 to-accent-2/10 border border-accent/30 text-accent mb-1 shadow-lg shadow-accent/15">
                      <Monitor size={36} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-xl text-white tracking-tight">{floatingBadge1Title}</h3>
                      <p className="mt-1.5 text-xs text-white/70 max-w-xs mx-auto leading-relaxed">{floatingBadge1Sub}</p>
                    </div>

                    {/* Secondary mini floating metric tile */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-left px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="text-xs font-semibold text-white/90">{floatingBadge2Title}</span>
                      </div>
                      <span className="text-[11px] text-accent font-medium">{floatingBadge2Sub}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
