"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingBag, 
  Building2, 
  Car, 
  Compass, 
  Cpu, 
  Palmtree, 
  Activity, 
  Layers 
} from "lucide-react";
import Button from "../../ui/Button";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  url: string;
  image: string;
  icon: React.ElementType;
}

const PROJECTS_DATA: ProjectItem[] = [
  { 
    id: "murtiwala",
    title: "The Murtiwala", 
    category: "E-Commerce Website", 
    url: "https://www.themurtiwala.com/", 
    image: "https://sumitdevtech.com/assets/images/the-murtiwala.webp",
    icon: ShoppingBag,
  },
  { 
    id: "bsix",
    title: "Bsix Engineering", 
    category: "Corporate Website", 
    url: "https://bsixengineering.com/", 
    image: "https://sumitdevtech.com/assets/images/bsix-engineering.webp",
    icon: Building2,
  },
  { 
    id: "maharashtra",
    title: "Maharashtra Cab", 
    category: "Booking Platform", 
    url: "https://maharashtracab.com/", 
    image: "https://sumitdevtech.com/assets/images/maharashtra-cab.webp",
    icon: Car,
  },
  { 
    id: "devtourist",
    title: "Dev Tourist Company", 
    category: "Travel & Tourism Website", 
    url: "https://devtouristcompany.com/", 
    image: "https://sumitdevtech.com/assets/images/devtourist-company.webp",
    icon: Compass,
  },
  { 
    id: "fingerprint",
    title: "Fingerprint Technology", 
    category: "IT Services Website", 
    url: "https://fingerprintit.com/", 
    image: "https://sumitdevtech.com/assets/images/finger-print.webp",
    icon: Cpu,
  },
  { 
    id: "snorkeling",
    title: "Snorkeling Barbados", 
    category: "Tourism Website", 
    url: "https://snorkelingbarbados.com/", 
    image: "https://sumitdevtech.com/assets/images/snorkeling-barbados.webp",
    icon: Palmtree,
  },
  { 
    id: "doctorbawa",
    title: "Doctor Bawa", 
    category: "Healthcare Medical Portal", 
    url: "https://doctorbawa.com/", 
    image: "https://sumitdevtech.com/assets/images/doctor-bawa.webp",
    icon: Activity,
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(1); // Default Bsix Engineering in center
  const [isPaused, setIsPaused] = useState(false);

  // Ultra Fast continuous auto-scroll
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
    }, 850);

    return () => clearInterval(timer);
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
      className="relative overflow-hidden bg-gradient-to-b from-[#0e1017] via-[#121520] to-[#0a0c12] py-14 sm:py-20 text-white font-sans select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Background Soft Orange Stage Lighting Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-orange-500/12 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 h-48 w-[1100px] rounded-full bg-gradient-to-r from-orange-500/20 via-amber-500/25 to-orange-500/20 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 z-10">
        
        {/* ========================================================
            HEADER: EXACT TEXT FROM USER SCREENSHOT
           ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-6xl mx-auto mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-orange-500 uppercase mb-3">
              <span className="h-0.5 w-6 bg-orange-500" />
              <span>OUR PROJECTS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-white tracking-tight leading-[1.14]">
              Explore Our <span className="text-orange-500">Latest Work</span>
            </h2>

            <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-400 max-w-xl font-normal leading-relaxed">
              From modern websites to complex web applications, we help businesses build digital products that create real impact.
            </p>
          </div>

          {/* Top-Right Round Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-95"
              aria-label="Previous Project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-95"
              aria-label="Next Project"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ========================================================
            3D CURVED CAROUSEL CYLINDER STAGE (Exact reference view)
           ======================================================== */}
        <div className="relative mx-auto flex items-center justify-center min-h-[400px] sm:min-h-[440px] [perspective:1400px] overflow-hidden py-2">
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
            const xOffset = diff * 290; // reduced gap between cards
            const zDistance = -Math.pow(absDiff, 1.3) * 80; // gentle depth push
            const rotateY = -diff * 14; // natural curve angle facing center
            const scale = isCenter ? 1.05 : Math.max(0.84, 1 - absDiff * 0.08);
            const opacity = isCenter ? 1 : Math.max(0.55, 0.95 - absDiff * 0.2);
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
                className={`absolute top-2 w-[280px] sm:w-[330px] md:w-[360px] cursor-pointer rounded-[22px] p-3 sm:p-3.5 shadow-2xl transition-colors duration-300 [transform-style:preserve-3d] ${
                  isCenter
                    ? "bg-[#181c28] border-2 border-orange-500 shadow-[0_0_45px_rgba(249,115,22,0.3)] ring-1 ring-orange-400/50"
                    : "bg-[#141722]/90 border border-white/10 hover:border-white/30"
                }`}
              >
                {/* Desktop Monitor Bezel Screen Mockup */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px] border border-white/10 bg-black shadow-inner">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(min-width:640px) 380px, 290px"
                    className="object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                  />
                  {/* Subtle top glare */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                </div>

                {/* Card Bottom Meta Bar */}
                <div className="mt-4 flex items-center justify-between px-2 pb-1">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-orange-400 border border-white/10">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-sans text-sm sm:text-base font-bold text-white leading-tight">
                        {proj.title}
                      </h3>
                      <p className="truncate text-[11px] font-normal text-slate-400 mt-0.5">
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
        <div className="mt-2 flex items-center justify-center gap-1.5">
          {PROJECTS_DATA.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setActiveIndex(dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIdx === activeIndex ? "w-8 bg-orange-500" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to project ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-5 text-center">
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
