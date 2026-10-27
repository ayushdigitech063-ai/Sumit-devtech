"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ExternalLink, MessageSquarePlus } from "lucide-react";
import Container from "@/app/ui/Container";
import { testimonials, testimonialCategories, reviewSummary } from "@/data/testimonial";

export default function TestimonialGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("All Stories");

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === "All Stories") return testimonials;
    return testimonials.filter((t) => t.projectType === activeCategory);
  }, [activeCategory]);

  return (
    <section className="relative bg-light py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1140px]">
          {/* Category Filter Tabs */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
            {testimonialCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-dark text-white shadow-md shadow-black/10 scale-105"
                      : "bg-white border border-line text-muted hover:text-dark hover:border-dark/30"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Testimonial Cards Masonry / Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr">
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((t, idx) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="group relative h-full flex flex-col justify-between rounded-3xl border border-line bg-white p-7 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-accent/40 hover:-translate-y-1.5"
                >
                  <div>
                    {/* Header: Stars & Project Tag */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex gap-1">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} size={15} className="fill-accent-2 text-accent-2" />
                        ))}
                      </div>

                      <span className="rounded-full bg-light border border-line/80 px-2.5 py-1 text-[11px] font-bold text-muted">
                        {t.projectType}
                      </span>
                    </div>

                    {/* Quote mark icon */}
                    <Quote size={28} className="text-accent/20 mb-3" />

                    {/* Review text */}
                    <p className="text-sm sm:text-base leading-relaxed text-ink/80 italic font-medium mb-6">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>

                  {/* Author footer */}
                  <div className="border-t border-line/70 pt-5 flex items-center gap-3.5">
                    <div
                      className={`h-11 w-11 rounded-2xl ${
                        t.avatarBg || "bg-accent"
                      } flex items-center justify-center font-heading font-black text-sm text-white shadow-sm shrink-0`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-extrabold text-ink leading-tight">{t.name}</h3>
                      <div className="text-xs font-medium text-muted mt-0.5">{t.company}</div>
                      {t.role && <div className="text-[11px] text-muted/70">{t.role}</div>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

