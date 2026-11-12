"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight, Building2, ShoppingBag, Laptop, Stethoscope, Factory } from "lucide-react";
import { fetchProjects } from "@/lib/projects-api";

// Default fallback projects if API is not yet loaded
const DEFAULT_PROJECTS = [
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
    category: "Financial Technology",
    image: "/images/projects/case-thumb6.png",
    url: "/all-projects",
    icon: Laptop,
  },
];

export default function Projects() {
  const [projectsList, setProjectsList] = useState(DEFAULT_PROJECTS);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync real-time projects updated in Super Admin (/admin/projects)
  useEffect(() => {
    async function loadLiveProjects() {
      try {
        const res = await fetchProjects();
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
          const liveItems = res.data.map((p) => ({
            id: p._id,
            title: p.title,
            category: p.category || "Web Development",
            image: p.image || "/images/projects/case-thumb.png",
            url: p.url || "/all-projects",
            icon: Laptop,
            featured: p.featured,
          }));
          const featuredOnly = liveItems.filter((p) => p.featured);
          setProjectsList(featuredOnly.length >= 3 ? featuredOnly : liveItems);
        }
      } catch (err) {
        console.error("Could not fetch live projects:", err);
      }
    }
    loadLiveProjects();
  }, []);

  // Continuous auto-slide every 3.5 seconds
  useEffect(() => {
    if (projectsList.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projectsList.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [projectsList.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projectsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectsList.length);
  };

  const total = projectsList.length;

  return (
    <section 
      id="projects" 
      className="relative w-full py-24 bg-[#0a0a0c] text-white overflow-hidden border-t border-b border-white/5"
    >
      {/* Decorative dynamic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>Our Projects</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Explore Our <span className="text-accent underline decoration-accent/30 underline-offset-8">Latest Work</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl">
              High-converting websites, complex enterprise portals, and SaaS platforms built with cutting-edge performance.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={handlePrev}
              aria-label="Previous Project"
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-accent hover:border-accent hover:text-white flex items-center justify-center transition-all duration-300 text-zinc-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Project"
              className="w-11 h-11 rounded-full border border-white/10 bg-white/5 hover:bg-accent hover:border-accent hover:text-white flex items-center justify-center transition-all duration-300 text-zinc-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* 3D Rotational Carousel Track */}
        <div className="relative h-[480px] sm:h-[520px] md:h-[560px] w-full flex items-center justify-center [perspective:1200px]">
          {projectsList.map((proj, idx) => {
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Stable transform logic
            let translateX = 0;
            let scale = 0.72;
            let opacity = 0;
            let zIndex = 1;
            let rotateY = 0;

            if (isCenter) {
              translateX = 0;
              scale = 1;
              opacity = 1;
              zIndex = 30;
              rotateY = 0;
            } else if (isLeft) {
              translateX = -320;
              scale = 0.85;
              opacity = 0.65;
              zIndex = 20;
              rotateY = 12;
            } else if (isRight) {
              translateX = 320;
              scale = 0.85;
              opacity = 0.65;
              zIndex = 20;
              rotateY = -12;
            } else if (offset === -2) {
              translateX = -540;
              scale = 0.72;
              opacity = 0.25;
              zIndex = 10;
              rotateY = 22;
            } else if (offset === 2) {
              translateX = 540;
              scale = 0.72;
              opacity = 0.25;
              zIndex = 10;
              rotateY = -22;
            }

            return (
              <div
                key={proj.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  transform: `translate3d(${translateX}px, 0, 0) scale(${scale}) rotateY(${rotateY}deg)`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                className={`absolute w-[300px] sm:w-[420px] md:w-[500px] rounded-3xl overflow-hidden cursor-pointer select-none transition-all duration-700 ease-out will-change-transform ${
                  isCenter
                    ? "shadow-[0_20px_60px_-15px_rgba(255,106,31,0.35)] border-2 border-accent/40"
                    : "border border-white/10 hover:border-white/20"
                }`}
              >
                {/* Project Image Box */}
                <div className="relative h-[300px] sm:h-[340px] md:h-[370px] w-full bg-zinc-900 overflow-hidden group">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    priority={isCenter}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-[#0e0e12]/40 to-transparent" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white/90">
                      <proj.icon size={13} className="text-accent" />
                      {proj.category}
                    </span>
                  </div>

                  {/* Visit External Button */}
                  <a
                    href={proj.url}
                    target={proj.url.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                {/* Project Info Card Bottom Bar */}
                <div className="p-5 sm:p-6 bg-[#0e0e12] border-t border-white/5 flex items-center justify-between">
                  <div className="min-w-0 pr-4">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 truncate">
                      Responsive UI • High Speed Architecture • Custom CMS
                    </p>
                  </div>

                  <a
                    href={proj.url}
                    target={proj.url.startsWith("http") ? "_blank" : "_self"}
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-white transition-colors shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Visit</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projectsList.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIdx === activeIndex
                  ? "w-8 bg-accent"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-12 text-center">
          <a
            href="/all-projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 hover:bg-accent text-white font-semibold text-sm border border-white/10 hover:border-accent transition-all duration-300 shadow-lg hover:shadow-accent/25 hover:scale-105"
          >
            <span>View All Projects</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
