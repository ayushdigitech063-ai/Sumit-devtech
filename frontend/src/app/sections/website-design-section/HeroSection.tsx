"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
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
  const trustItems = data?.trustItems ?? trustItemsProp ?? [
    { label: "100% Code Ownership" },
    { label: "On-Time Milestone Delivery" },
    { label: "Enterprise Security Built-In" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#10131e] via-[#141826] to-[#191e2f] text-white pt-36 pb-20 md:pt-44 md:pb-24 min-h-[78vh] flex items-center border-b border-white/10">
      {/* Background Architectural Illustration / Tech Devices Showcase */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-25 overflow-hidden">
        <Image
          src="/images/hero/hero-devices-showcase.png"
          alt="Hero background design"
          fill
          priority
          className="object-cover object-center filter blur-[1px] mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10131e] via-transparent to-[#10131e] opacity-90" />
      </div>

      {/* Ambient background lighting blooms */}
      <div className="pointer-events-none absolute right-0 -top-32 h-[520px] w-[520px] animate-blob rounded-full bg-accent/25 opacity-70 blur-[130px] overflow-hidden" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-[460px] w-[460px] animate-blob rounded-full bg-amber-400/20 opacity-60 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[380px] w-[620px] rounded-full bg-blue-500/15 blur-[140px]" />

      {/* Subtle modern mesh grid */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04] overflow-hidden z-0"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Centered Content Container */}
      <Container className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-[960px] text-center flex flex-col items-center">
          
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              {badge}
            </span>
          </motion.div>

          {/* Centered Main H1 Heading */}
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-heading text-4xl sm:text-5xl md:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.14] text-white max-w-4xl"
          >
            {title}
          </motion.h1>

          {/* Centered Subtitle Description */}
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-normal"
          >
            {description}
          </motion.p>

          {/* Feature Chips in Center */}
          {featureChips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
            >
              {featureChips.map((chip, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white/85 backdrop-blur-sm"
                >
                  <Sparkles size={13} className="text-accent" />
                  {chip.label}
                </span>
              ))}
            </motion.div>
          )}

          {/* Centered Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              href={primaryCtaHref}
              variant="primary"
              className="group gap-2.5 shadow-xl shadow-accent/25 hover:shadow-accent/40 !px-7 !py-3 font-semibold"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              href={secondaryCtaHref}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 !px-7 !py-3"
            >
              {secondaryCtaText}
            </Button>
          </motion.div>

          {/* Trust Guarantees in Center */}
          {trustItems && trustItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-semibold text-white/70 border-t border-white/10 pt-6"
            >
              {trustItems.map((item, i) => (
                <span key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{item.label}</span>
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
