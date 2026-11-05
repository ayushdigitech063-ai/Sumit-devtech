"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Users, 
  Star, 
  FolderOpen, 
  ThumbsUp, 
  Zap, 
  Smartphone, 
  Search, 
  CheckCircle2 
} from "lucide-react";
import Section from "../../ui/Section";
import Reveal from "../../animation/Reveal";
import CountUp from "../../ui/Countup";
import ExperienceCelebrationCard from "./ExperienceCelebrationCard";
import AutoTeamSlider from "./AutoTeamSlider";
import { cn } from "@/lib/utils";
import { apiFetch, ApiError } from "@/lib/api";

// 4 Stats card icons & light-mode accent styles
const STAT_STYLES = [
  {
    icon: Users,
    bubbleBg: "bg-orange-50 text-orange-600 border-orange-100",
    hoverBorder: "hover:border-orange-300",
  },
  {
    icon: Star,
    bubbleBg: "bg-amber-50 text-amber-600 border-amber-100",
    hoverBorder: "hover:border-amber-300",
  },
  {
    icon: FolderOpen,
    bubbleBg: "bg-blue-50 text-blue-600 border-blue-100",
    hoverBorder: "hover:border-blue-300",
  },
  {
    icon: ThumbsUp,
    bubbleBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
    hoverBorder: "hover:border-emerald-300",
  },
];

export default function About() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAbout() {
      try {
        const res = await apiFetch<any>("/home/about");
        if (res && res.data) {
          setAboutData(res.data);
        }
      } catch (err) {
        if (err instanceof ApiError) {
          console.error(`API Error (${err.status}):`, err.message);
        } else {
          console.error("Failed to load about section:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    loadAbout();
  }, []);

  if (loading) {
    return (
      <Section id="about" className="pt-28 sm:pt-32 md:pt-36 bg-[#fafbfc]">
        <div className="mx-auto w-full max-w-[1240px] px-6 animate-pulse">
          <div className="mx-auto mb-10 h-8 w-44 rounded-full bg-slate-200" />
          <div className="mx-auto mb-14 h-12 w-3/4 rounded-xl bg-slate-200" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="h-72 rounded-3xl bg-slate-200" />
            <div className="h-72 rounded-3xl bg-slate-200" />
          </div>
        </div>
      </Section>
    );
  }

  // Fallback defaults
  const tagline = aboutData?.tagline || "WHO WE ARE";
  const heading = aboutData?.heading || "Top Web Design & Development Agency in Jaipur";
  const description = aboutData?.description || "We engineer high-performance web applications, custom eCommerce portals, and scalable mobile apps. Built for speed, mobile supremacy, and top search engine rankings from day one.";
  const experienceYears = parseInt(aboutData?.experienceYears || "12", 10) || 12;
  const experienceLabel = aboutData?.experienceLabel || "Years of Tech Expertise in Business";
  const buttonText = aboutData?.buttonText || "Know more About us";
  const imageUrl = aboutData?.image?.url || "/images/aboutPage/group_photo_1.png";
  const badges = aboutData?.badges || ["Google Certified Partner", "2026 Tech Excellence"];
  const metricCards = aboutData?.metricCards?.length > 0 ? aboutData.metricCards : [
    { label: "Full-time Developers", value: "20+" },
    { label: "Happy Clients", value: "600+" },
    { label: "Projects Delivered", value: "1,200+" },
    { label: "Client Satisfaction", value: "100%" },
  ];

  return (
    <Section id="about" className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-[#f8fafc] pt-28 sm:pt-32 md:pt-36 pb-20 font-sans text-slate-800">
      {/* Subtle modern background ambient pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(#e2e8f0 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />
      
      {/* Soft warm ambient bloom on top right */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-orange-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-0 bottom-1/4 h-80 w-80 rounded-full bg-blue-400/8 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-10 z-10">
        
        {/* ========================================================
            HEADER: MODERN AGENCY CENTERED TITLE
           ======================================================== */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-orange-50/80 px-4 py-1.5 text-xs font-bold text-orange-600 shadow-2xs backdrop-blur-md mb-4 uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>{tagline}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-slate-900 tracking-normal leading-[1.25]">
            {heading.includes("Jaipur") ? (
              <>
                {heading.replace("Jaipur", "")}
                <span className="text-orange-500 font-bold">
                  Jaipur
                </span>
              </>
            ) : (
              heading
            )}
          </h2>
        </div>

        {/* ========================================================
            2-COLUMN GRID: LEFT STORY + RIGHT FLOATING TEAM VISUAL
           ======================================================== */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1.15fr] lg:gap-14">
          
          {/* LEFT CONTENT */}
          <Reveal>
            <div className="space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
                {description}
              </p>

              {/* 3 Modern Feature Micro-Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 pb-2">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-xs font-bold text-slate-800 shadow-2xs">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                    <Zap size={14} className="fill-orange-500" />
                  </div>
                  <span>Ultra Fast Speed</span>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-xs font-bold text-slate-800 shadow-2xs">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Smartphone size={14} />
                  </div>
                  <span>Mobile First</span>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 text-xs font-bold text-slate-800 shadow-2xs">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                    <Search size={14} />
                  </div>
                  <span>SEO Ready #1</span>
                </div>
              </div>

              {/* Interactive 0-to-12 Progress & Milestone Celebration Card */}
              <ExperienceCelebrationCard
                targetYears={experienceYears}
                label={experienceLabel}
                subLabel="Trusted across India & Global clients"
              />

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  href="/about-company"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-slate-900/15 transition-all duration-300 hover:bg-orange-500 hover:shadow-orange-500/25"
                >
                  <span>{buttonText}</span>
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* RIGHT VISUAL: AUTO-SLIDING TEAM SHOWCASE WITH FLOATING GLASS BADGES */}
          <Reveal delay={0.15}>
            <AutoTeamSlider primaryImage={imageUrl} badges={badges} />
          </Reveal>
        </div>

        {/* ========================================================
            BOTTOM: 4 LIGHT-THEME BENTO METRIC CARDS
           ======================================================== */}
        <div className="mt-14 sm:mt-18 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {metricCards.map((card: any, i: number) => {
            const style = STAT_STYLES[i % STAT_STYLES.length];
            const Icon = style.icon;

            const numericValue = parseInt(String(card.value).replace(/[^0-9]/g, ""), 10) || 0;
            const suffix = String(card.value).replace(/[0-9]/g, "") || "";

            return (
              <Reveal key={card.label || i} delay={i * 0.08}>
                <div
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-orange-500/15 cursor-pointer",
                    style.hoverBorder
                  )}
                >
                  {/* Diagonal Metallic Glass Light-Shine Sweep across entire card */}
                  <span className="pointer-events-none absolute -inset-y-full -left-[100%] w-[120%] -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/90 to-transparent transition-all duration-700 ease-out group-hover:left-[150%]" />

                  {/* Soft Ambient Spotlight behind content on hover */}
                  <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-orange-400/20 to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Top: Icon Bubble with Light Pastel Accent */}
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110", style.bubbleBg)}>
                      <Icon size={20} strokeWidth={2.2} />
                    </div>
                    <CheckCircle2 size={15} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  </div>

                  {/* Number Counter */}
                  <b className="relative z-10 block font-sans text-3xl sm:text-4xl font-bold text-slate-900 tracking-normal">
                    <CountUp to={numericValue} suffix={suffix} />
                  </b>

                  {/* Label */}
                  <p className="relative z-10 mt-1 text-xs sm:text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                    {card.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </Section>
  );
}
