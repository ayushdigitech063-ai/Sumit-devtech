"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight, Building2, ShoppingBag, Laptop, Stethoscope, Factory } from "lucide-react";

// Project mock data with realistic web categories & verified image paths
const PROJECTS_DATA = [
  {
    id: "hvac-pro",
    title: "Commercial Climate & HVAC Infrastructure",
    category: "Commercial Services",
    image: "/images/projects/case-thumb.png",
    url: "/all-projects",
    icon: Building2,
  },
  {
    id: "goddess-craft",
    title: "Global E-Commerce Craft Store",
    category: "E-Commerce & Retail",
    image: "/images/projects/case-thumb2.png",
    url: "/all-projects",
    icon: ShoppingBag,
  },
  {
    id: "medical-care",
    title: "Clinical Hospital Management Platform",
    category: "Healthcare & MedTech",
    image: "/images/projects/case-thumb3.png",
    url: "/all-projects",
    icon: Stethoscope,
  },
  {
    id: "enterprise-cloud",
    title: "Automated Supply Chain & Logistics ERP",
    category: "SaaS & Cloud Architecture",
    image: "/images/projects/case-thumb4.png",
    url: "/all-projects",
    icon: Laptop,
  },
  {
    id: "industrial-tools",
    title: "Precision Engineering & Manufacturing",
    category: "B2B Manufacturing Portal",
    image: "/images/projects/case-thumb5.png",
    url: "/all-projects",
    icon: Factory,
  },
  {
    id: "fintech-portal",
    title: "Next-Gen Fintech Payments Portal",
    category: "Fintech & Banking",
    image: "/images/projects/case-thumb6.png",
    url: "/all-projects",
    icon: Building2,
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Non-stop auto slide every 3 seconds without pause
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    >
      {/* Background Soft Ambient Accents */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-accent/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 h-48 w-[1100px] rounded-full bg-gradient-to-r from-orange-500/10 via-amber-500/15 to-orange-500/10 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-6xl mx-auto mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-accent uppercase mb-3">
              <span className="h-0.5 w-6 bg-accent" />
              <span>Our Projects</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
              Explore Our <span className="text-brand">Latest Work</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-muted font-normal leading-relaxed">
              From modern websites to complex web applications, we help businesses build digital products that create real impact.
            </p>
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-accent hover:bg-accent hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="Previous Project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink hover:border-accent hover:bg-accent hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label="Next Project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* 
            SMOOTH HARDWARE-ACCELERATED CAROUSEL STAGE 
            No jitter / No flickering / Rock-solid fixed positioning
        */}
        <div className="relative mx-auto flex items-center justify-center h-[390px] sm:h-[430px] overflow-hidden py-3">
          {PROJECTS_DATA.map((proj, idx) => {
            const total = PROJECTS_DATA.length;
            let diff = idx - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const absDiff = Math.abs(diff);

            // Hide cards beyond 2 steps
            if (absDiff > 2) return null;

            // Stable transform geometry with CSS transitions
            const xOffset = diff * 280;
            const scale = isCenter ? 1.05 : absDiff === 1 ? 0.92 : 0.82;
            const opacity = isCenter ? 1 : absDiff === 1 ? 0.8 : 0.5;
            const zIndex = isCenter ? 30 : absDiff === 1 ? 20 : 10;
            const rotateY = diff * -12;

            const Icon = proj.icon;

            return (
              <div
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  transform: `translateX(${xOffset}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
                  zIndex: zIndex,
                  opacity: opacity,
                  willChange: "transform, opacity",
                }}
                className={`absolute top-4 w-[285px] sm:w-[335px] md:w-[370px] cursor-pointer rounded-[24px] p-3 sm:p-3.5 transition-all duration-500 ease-out select-none ${
                  isCenter
                    ? "bg-white border-2 border-accent shadow-[0_16px_40px_rgba(255,106,31,0.22)] ring-4 ring-accent/15"
                    : "bg-white/95 border border-line hover:border-accent/40 shadow-md"
                }`}
              >
                {/* Desktop Monitor Bezel Screen Mockup */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] border border-line bg-dark-2">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(min-width:640px) 380px, 290px"
                    className="object-cover object-top transition-transform duration-500 ease-out hover:scale-105"
                  />
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
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination Dots */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {PROJECTS_DATA.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setActiveIndex(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
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
