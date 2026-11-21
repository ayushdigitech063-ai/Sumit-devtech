"use client";

import React from "react";
import { Star, ShieldCheck, Award, ThumbsUp, ArrowUpRight } from "lucide-react";
import Container from "@/app/ui/Container";

const REVIEW_SUMMARY = {
  rating: "4.9",
  totalReviews: "120+",
  link: "https://share.google/mFDBvfMog5fKrtZrt",
  recommendationRate: "99%",
  projectsDelivered: "500+",
};

export default function TestimonialHero() {
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
          {/* Main Top Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Client Feedback
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-white leading-[1.12]">
              Trusted by Founders &amp; <span className="text-brand">Global Enterprises</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-normal">
              Read transparent reviews from businesses we&apos;ve helped scale with high-velocity web platforms, custom cloud applications, and conversion-focused design systems.
            </p>
          </div>

          {/* Social Proof Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="font-heading text-3xl font-extrabold text-white">
                {REVIEW_SUMMARY.rating} <span className="text-lg font-normal text-white/60">/ 5.0</span>
              </div>
              <p className="mt-1 text-xs text-white/70">Average Google Rating</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center">
              <div className="flex justify-center mb-2">
                <ShieldCheck className="text-emerald-400" size={22} />
              </div>
              <div className="font-heading text-3xl font-extrabold text-white">
                {REVIEW_SUMMARY.totalReviews}
              </div>
              <p className="mt-1 text-xs text-white/70">Verified Reviews</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center">
              <div className="flex justify-center mb-2">
                <ThumbsUp className="text-blue-400" size={22} />
              </div>
              <div className="font-heading text-3xl font-extrabold text-white">
                {REVIEW_SUMMARY.recommendationRate}
              </div>
              <p className="mt-1 text-xs text-white/70">Client Retention</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center">
              <div className="flex justify-center mb-2">
                <Award className="text-purple-400" size={22} />
              </div>
              <div className="font-heading text-3xl font-extrabold text-white">
                {REVIEW_SUMMARY.projectsDelivered}
              </div>
              <p className="mt-1 text-xs text-white/70">Websites Launched</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
