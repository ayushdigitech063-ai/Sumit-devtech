"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, Star, FolderOpen, ThumbsUp } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import CountUp from "../../ui/Countup";
import { cn } from "@/lib/utils";
import { apiFetch, ApiError } from "@/lib/api";

/* PREVIOUS STATIC IMPORTS (COMMENTED OUT FOR REFERENCE):
import { aboutIntro, aboutYears, aboutStats, IMG } from "@/data/home";
*/

// Charo cards ke icons sequence mein
const statIcons = [Users, Star, FolderOpen, ThumbsUp];

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

  // Layout shift rokne ke liye simple placeholder
  if (loading) {
    return (
      <Section id="about">
        <div className="mx-auto w-full max-w-[1100px] px-6 animate-pulse">
          <div className="mx-auto mb-10 h-8 w-44 rounded-full bg-ink/10" />
          <div className="mx-auto mb-14 h-12 w-3/4 rounded-xl bg-ink/10" />
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="h-64 rounded-2xl bg-ink/10" />
            <div className="h-64 rounded-2xl bg-ink/10" />
          </div>
        </div>
      </Section>
    );
  }

  // Fallback defaults agar data pending ho ya database empty ho
  const tagline = aboutData?.tagline || "Who We Are";
  const heading = aboutData?.heading || "Website Design & Development Company in Mansarovar, Jaipur";
  const description = aboutData?.description || "We work on everything - simple HTML sites, WordPress, eCommerce stores, custom web applications, and business management systems.";
  const experienceYears = parseInt(aboutData?.experienceYears || "10", 10) || 10;
  const experienceLabel = aboutData?.experienceLabel || "Years of Expertise in Business";
  const buttonText = aboutData?.buttonText || "Know more About us";
  const imageUrl = aboutData?.image?.url || "/images/about-image.webp";
  const badges = aboutData?.badges || ["Google Partner", "2024 Excellence Award"];
  const metricCards = aboutData?.metricCards || [];

  return (
    <Section id="about">
      <div className="mx-auto w-full max-w-[1100px] px-6">
        {/* PREVIOUS STATIC HEADING (COMMENTED OUT):
        <SectionHeading
          center
          label="Who We Are"
          title={<>Website Design & Development Company in <span className="text-brand">Mansarovar, Jaipur</span></>}
        />
        */}

        {/* NAYA DYNAMIC HEADING */}
        <SectionHeading
          center
          label={tagline}
          title={
            <>
              {heading.includes("Mansarovar, Jaipur") ? (
                <>
                  {heading.replace("Mansarovar, Jaipur", "")}
                  <span className="text-brand">Mansarovar, Jaipur</span>
                </>
              ) : (
                heading
              )}
            </>
          }
        />

        {/* text + image */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            {/* PREVIOUS STATIC INTRO (COMMENTED OUT):
            <p className="mb-9 text-base leading-relaxed text-ink/75 md:text-lg">{aboutIntro}</p>
            */}

            {/* NAYA DYNAMIC DESCRIPTION */}
            <p className="mb-9 text-base leading-relaxed text-ink/75 md:text-lg">
              {description}
            </p>

            <div className="mb-9 flex items-center gap-4 md:gap-6">
              <b className="font-heading text-7xl font-extrabold leading-none text-ink md:text-8xl">
                {/* PREVIOUS STATIC COUNTUP (COMMENTED OUT):
                <CountUp to={aboutYears.value} suffix="+" />
                */}

                {/* NAYA DYNAMIC COUNTUP */}
                <CountUp to={experienceYears} suffix="+" />
              </b>
              <div className="max-w-[190px]">
                <motion.span
                  className="mb-3 block h-2 w-36 origin-left rounded-full bg-brand"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
                {/* PREVIOUS STATIC LABEL (COMMENTED OUT):
                <p className="font-medium leading-snug">{aboutYears.label}</p>
                */}

                {/* NAYA DYNAMIC LABEL */}
                <p className="font-medium leading-snug">{experienceLabel}</p>
              </div>
            </div>

            {/* PREVIOUS STATIC LINK (COMMENTED OUT):
            <Link
              href="/about-company"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-accent px-7 py-3 font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white"
            >
              Know more About us
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            */}

            {/* DIRECT /about-company LINK (NO BACKEND DEPENDENCY) */}
            <Link
              href="/about-company"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-accent px-7 py-3 font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white"
            >
              {buttonText}
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-black/15"
              style={{ aspectRatio: "16 / 11" }}
            >
              {/* PREVIOUS STATIC IMAGE (COMMENTED OUT):
              <Image
                src={`${IMG}/about-image.webp`}
                alt="Sumit DevTech team in Jaipur"
                fill
                sizes="(min-width:1024px) 620px, 90vw"
                className="object-cover transition duration-1000 group-hover:scale-105"
              />
              */}

              {/* NAYA CLOUDINARY IMAGE */}
              <Image
                src={imageUrl}
                alt="Sumit DevTech team in Jaipur"
                fill
                sizes="(min-width:1024px) 620px, 90vw"
                className="object-cover transition duration-1000 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-dark/10" />

              {/* PREVIOUS STATIC BADGES (COMMENTED OUT):
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold backdrop-blur">
                <span className="text-accent">●</span> Google Partner
              </span>
              <span className="absolute bottom-4 right-4 animate-float rounded-2xl bg-white px-4 py-2.5 text-sm font-bold shadow-xl">
                <span className="text-accent">★</span> 2024 Excellence Award
              </span>
              */}

              {/* NAYE DYNAMIC BADGES */}
              {badges[0] && (
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold backdrop-blur">
                  <span className="text-accent">●</span> {badges[0]}
                </span>
              )}

              {badges[1] && (
                <span className="absolute bottom-4 right-4 animate-float rounded-2xl bg-white px-4 py-2.5 text-sm font-bold shadow-xl">
                  <span className="text-accent">★</span> {badges[1]}
                </span>
              )}
            </div>
          </Reveal>
        </div>

        {/* stat cards */}
        {/* PREVIOUS STATIC STAT CARDS MAP (COMMENTED OUT):
        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:gap-5 lg:grid-cols-4">
          {aboutStats.map((s, i) => {
            const Icon = s.icon;
            const orange = i % 2 === 0;
            return (
              <Reveal key={s.label} delay={i * 0.1}>
                <div
                  className={cn(
                    "group relative h-45 w-55 overflow-hidden rounded-3xl p-5 text-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl md:p-5 bg-dark hover:shadow-black/30 "
                  )}
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[150%]" />
                  <Icon
                    strokeWidth={1.5}
                    className={cn(
                      "relative mb-4 h-4 w-4 transition duration-300 group-hover:-translate-y-1 group-hover:-rotate-6 md:mb-7 md:h-7 md:w-7",
                      orange ? "text-white" : "text-accent"
                    )}
                  />
                  <b className="relative block font-heading text-3xl font-extrabold md:text-3xl">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </b>
                  <p className="relative mt-1 text-xs text-white/80 md:text-base">{s.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        */}

        {/* NAYA DYNAMIC METRIC CARDS MAP WITH ORIGINAL ICONS */}
        {metricCards.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:gap-5 lg:grid-cols-4">
            {metricCards.map((card: any, i: number) => {
              const Icon = statIcons[i % statIcons.length];
              const orange = i % 2 === 0;

              // String value me se number aur suffix alag alag nikalna (e.g. "15+" -> 15 aur "+")
              const numericValue = parseInt(String(card.value).replace(/[^0-9]/g, ""), 10) || 0;
              const suffix = String(card.value).replace(/[0-9]/g, "") || "";

              return (
                <Reveal key={card.label || i} delay={i * 0.1}>
                  <div
                    className={cn(
                      "group relative h-45 w-full overflow-hidden rounded-3xl p-5 text-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl md:p-5 bg-dark hover:shadow-black/30"
                    )}
                  >
                    <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[150%]" />
                    <Icon
                      strokeWidth={1.5}
                      className={cn(
                        "relative mb-4 h-4 w-4 transition duration-300 group-hover:-translate-y-1 group-hover:-rotate-6 md:mb-7 md:h-7 md:w-7",
                        orange ? "text-white" : "text-accent"
                      )}
                    />
                    <b className="relative block font-heading text-3xl font-extrabold md:text-3xl">
                      <CountUp to={numericValue} suffix={suffix} />
                    </b>
                    <p className="relative mt-1 text-xs text-white/80 md:text-base">
                      {card.label}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}