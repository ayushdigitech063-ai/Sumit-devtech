"use client";

import React from "react";
import { Star, ShieldCheck, Award, ThumbsUp, ArrowUpRight } from "lucide-react";
import Container from "@/app/ui/Container";
import { reviewSummary } from "@/data/testimonial";

export default function TestimonialHero() {
  return (
    <section className="relative overflow-hidden bg-dark text-white pt-28 pb-16 md:pt-25 md:pb-20 border-b border-white/10">
  
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          {/* Main Top Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified Client Feedback
            </span>

            <h1 className="text-4xl sm:text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Trusted by Founders &amp; <span className="text-brand">Global Enterprises</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed">
              Read transparent reviews from businesses we&apos;ve helped scale with high-velocity web platforms, custom cloud applications, and conversion-focused design systems.
            </p>
          </div>

          {/* Social Proof Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center">
              <div className="flex justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-accent-2 text-accent-2" />
                ))}
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-black text-white">{reviewSummary.rating} / 5</div>
              <div className="text-xs font-semibold text-white/60 mt-1">Google Rating</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center">
              <div className="flex justify-center text-accent mb-2">
                <ShieldCheck size={20} />
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-black text-white">{reviewSummary.projectsDelivered}</div>
              <div className="text-xs font-semibold text-white/60 mt-1">Projects Delivered</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center">
              <div className="flex justify-center text-emerald-400 mb-2">
                <ThumbsUp size={20} />
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-black text-white">{reviewSummary.recommendationRate}</div>
              <div className="text-xs font-semibold text-white/60 mt-1">Recommendation Rate</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-center">
              <div className="flex justify-center text-accent-2 mb-2">
                <Award size={20} />
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-black text-white">{reviewSummary.totalReviews}</div>
              <div className="text-xs font-semibold text-white/60 mt-1">Verified Client Reviews</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

