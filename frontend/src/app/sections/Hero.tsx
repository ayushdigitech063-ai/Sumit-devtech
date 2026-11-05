"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import WordReveal from "../animation/WordReveal";
import HeroVisualInteractive from "./HeroVisualInteractive";
import HeroJourneyBar, { JOURNEY_STEPS } from "./HeroJourneyBar";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "500+", label: "Happy clients" },
  { value: "1000+", label: "Projects done" },
  { value: "4.9★", label: "Google rating" },
];

const AUTO_ROTATE_INTERVAL = 4500; // 4.5 seconds per step

const ROTATING_SERVICES = [
  "Website Development",
  "App Development",
  "Search Engine Optimization",
  "Marketing & Growth",
];

export default function Hero() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll all elements in 100% sync
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % JOURNEY_STEPS.length);
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="top"
      className="relative overflow-visible bg-gradient-to-b from-[#10131e] via-[#141826] to-[#191e2f] pt-28 sm:pt-32 pb-0 lg:pt-36 lg:pb-0 text-white"
    >
      {/* Floating 3D Crystal Gems in Background */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 12, 0],
          rotate: [0, 30, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[3%] top-[12%] z-0 h-14 w-14 rotate-12 rounded-2xl border border-white/20 bg-gradient-to-br from-white/20 via-orange-400/15 to-transparent backdrop-blur-md shadow-lg"
      />

      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
          rotate: [45, 80, 45],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute right-[10%] top-[16%] z-0 h-16 w-16 rotate-45 rounded-3xl border border-white/20 bg-gradient-to-tr from-white/20 via-amber-300/15 to-blue-400/10 backdrop-blur-md shadow-lg"
      />

      {/* Subtle modern mesh grid pattern in background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04] overflow-hidden z-0"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient lighting blooms */}
      <div className="pointer-events-none absolute right-0 -top-32 h-[580px] w-[580px] animate-blob rounded-full bg-accent/28 opacity-80 blur-[130px] overflow-hidden" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-[500px] w-[500px] animate-blob rounded-full bg-amber-400/22 opacity-70 blur-[120px] [animation-delay:-5s]" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 h-[380px] w-[650px] rounded-full bg-blue-500/18 blur-[140px]" />

      {/* Main Container */}
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 z-10">
        {/* Main 2-Column Split */}
        <div className="grid items-center gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10 pb-4">
          
          {/* LEFT CONTENT AREA */}
          <div className="z-10 w-full min-w-0">
            {/* Dynamic Word Reveal Heading */}
            <div className="w-full">
              <WordReveal
                text="Everything you need to Grow Digitally"
                dynamicTexts={ROTATING_SERVICES}
                activeIndex={activeStepIndex}
                className="text-2xl sm:text-4xl md:text-[2.75rem] lg:text-[3rem] leading-[1.14]"
                highlightClassName="text-accent"
              />
            </div>

            {/* Sub-headline description */}
            <p className="mt-3.5 sm:mt-5 mb-5 sm:mb-7 max-w-xl text-sm sm:text-base md:text-lg font-normal leading-relaxed text-white/75">
              Fast, beautiful, SEO-ready websites, apps and digital marketing —
              from startups to enterprises. Fixed pricing, zero ghosting.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Button 
                href="/contact-us"
                className="group px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300"
              >
                <span>Get Free Consultation</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                href="/project" 
                variant="outline" 
                className="border-white/25 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-white hover:bg-white/10"
              >
                View Portfolio
              </Button>
            </div>

            {/* Metrics Counters / Stats */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-6 sm:gap-8 border-t border-white/15 pt-5 sm:pt-6 md:gap-11">
              {stats.map((s) => (
                <div key={s.label}>
                  <b className="block font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {s.value}
                  </b>
                  <small className="text-[11px] sm:text-xs md:text-sm font-normal text-white/60">
                    {s.label}
                  </small>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT VISUAL: Interactive Live Workspace & Service Stage */}
          <div className="relative z-10 w-full">
            <HeroVisualInteractive
              activeIndex={activeStepIndex}
              onSelectScene={(sceneIdx) => {
                setActiveStepIndex(sceneIdx);
                setIsPaused(true);
              }}
            />
          </div>
        </div>

        {/* BOTTOM FLOATING BAR: Exactly on the border line (Half in Hero, Half in White section) */}
        <div className="relative z-40 translate-y-1/2">
          <HeroJourneyBar
            activeIndex={activeStepIndex}
            onSelectStep={(idx) => {
              setActiveStepIndex(idx);
              setIsPaused(true);
            }}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            duration={AUTO_ROTATE_INTERVAL}
          />
        </div>
      </div>
    </section>
  );
}
