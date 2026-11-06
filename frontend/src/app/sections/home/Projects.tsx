"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Sparkles, Building2, ShoppingBag, Laptop, Stethoscope, Factory } from "lucide-react";

// Project mock data with realistic web categories
const PROJECTS_DATA = [
  {
    id: "hvac-pro",
    title: "Looking for Cool & Comfortable Space?",
    category: "HVAC & Commercial Services",
    image: "/images/projects/hvac.png",
    url: "https://sumitdevtech.com",
    icon: Building2,
  },
  {
    id: "goddess-craft",
    title: "Sacred Art & Spiritual Sculptures",
    category: "E-Commerce & Handicrafts",
    image: "/images/projects/sculpture.png",
    url: "https://sumitdevtech.com",
    icon: ShoppingBag,
  },
  {
    id: "medical-care",
    title: "Advanced Surgical & Clinical Care",
    category: "Healthcare & Doctor Portal",
    image: "/images/projects/doctor.png",
    url: "https://sumitdevtech.com",
    icon: Stethoscope,
  },
  {
    id: "enterprise-cloud",
    title: "Automated Supply Chain ERP",
    category: "SaaS & Cloud Architecture",
    image: "/images/projects/erp.png",
    url: "https://sumitdevtech.com",
    icon: Laptop,
  },
  {
    id: "industrial-tools",
    title: "Precision Engineering & Machinery",
    category: "B2B Manufacturing Portal",
    image: "/images/projects/machinery.png",
    url: "https://sumitdevtech.com",
    icon: Factory,
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto rotation every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? PROJECTS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  };

  return (
    <section 
      id="projects" 
      className="relative overflow-hidden bg-[#f7f6f3] py-16 sm:py-24 text-ink font-sans select-none border-t border-line/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Background Soft Ambient Accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-accent/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 h-48 w-[1100px] rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/15 to-orange-500/10 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 z-10">
        
        {/* ========================================================
            HEADER: LIGHT THEME CLEAN DESIGN
           ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-6xl mx-auto mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-accent uppercase mb-3">
              <span className="h-0.5 w-6 bg-accent" />
              <span>OUR PROJECTS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-ink tracking-tight leading-[1.14]">
              Explore Our <span className="text-brand">Latest Work</span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-muted max-w-xl font-normal leading-relaxed">
              From modern websites to complex web applications, we help businesses build digital products that create real impact.
            </p>
          </div>

          {/* Top-Right Round Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-accent hover:bg-accent hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Previous Project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-accent hover:bg-accent hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Next Project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ========================================================
            3D CURVED CAROUSEL CYLINDER STAGE (Clean Card Mockups)
           ======================================================== */}
        <div className="relative mx-auto flex items-center justify-center min-h-[400px] sm:min-h-[440px] [perspective:1400px] overflow-hidden py-3">
          {PROJECTS_DATA.map((proj, idx) => {
            const total = PROJECTS_DATA.length;
            // Calculate relative offset in circular array
            let diff = idx - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const absDiff = Math.abs(diff);

            // Hide cards that are too far behind in the cylinder
            if (absDiff > 2.5) return null;

            // Curved stage transforms - tighter spacing & smoother curve
            const xOffset = diff * 290;
            const zDistance = -Math.pow(absDiff, 1.3) * 80;
            const rotateY = -diff * 14;
            const scale = isCenter ? 1.05 : Math.max(0.84, 1 - absDiff * 0.08);
            const opacity = isCenter ? 1 : Math.max(0.65, 0.95 - absDiff * 0.2);
            const zIndex = 30 - Math.round(absDiff * 10);

            const Icon = proj.icon;

            return (
              <motion.div
                key={proj.id}
                animate={{
                  x: xOffset,
                  z: zDistance,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={() => setActiveIndex(idx)}
                className={`absolute top-2 w-[280px] sm:w-[330px] md:w-[360px] cursor-pointer rounded-[22px] p-3 sm:p-3.5 shadow-xl transition-all duration-300 [transform-style:preserve-3d] ${
                  isCenter
                    ? "bg-white border-2 border-accent shadow-[0_12px_40px_rgba(255,106,31,0.22)] ring-2 ring-accent/30"
                    : "bg-white/90 border border-line hover:border-accent/40 shadow-md"
                }`}
              >
                {/* Desktop Monitor Bezel Screen Mockup */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] border border-line bg-dark-2 shadow-inner">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(min-width:640px) 380px, 290px"
                    className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                  />
                  {/* Subtle top glare */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                </div>

                {/* Card Bottom Meta Bar */}
                <div className="mt-4 flex items-center justify-between px-2 pb-1">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f7f6f3] text-accent border border-line">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-sans text-sm sm:text-base font-bold text-ink leading-tight">
                        {proj.title}
                      </h3>
                      <p className="truncate text-[11px] font-medium text-muted mt-0.5">
                        {proj.category}
                      </p>
                    </div>
                  </div>

                  {/* Circular Orange Arrow CTA */}
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md hover:scale-110 active:scale-95 transition-transform"
                    title="View live website"
                  >
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Pagination Dots */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {PROJECTS_DATA.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setActiveIndex(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === activeIndex ? "w-8 bg-accent" : "w-2 bg-line hover:bg-muted"
              }`}
              aria-label={`Go to project ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-8 text-center">
          <a
            href="/all-projects"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all"
          >
            <span>View All Projects</span>
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
