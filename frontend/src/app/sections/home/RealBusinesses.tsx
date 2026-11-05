"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface CaseStudy {
  id: string;
  stepNumber: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  previewType: "mobile" | "card" | "health";
  mobileData?: {
    userName: string;
    balance: string;
    growth: string;
    transactions: { name: string; date: string; amount: string }[];
  };
  cardData?: {
    brand: string;
    cardNumber: string;
  };
  healthData?: {
    bpm: number;
    status: string;
  };
  stats: { label: string; value: string }[];
  url: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "fintech",
    stepNumber: "01",
    tag: "FINTECH",
    tagColor: "bg-orange-50 text-orange-600 border-orange-200",
    title: "Building the future of digital banking",
    description: "A secure, scalable and intuitive platform used by 1M+ customers across India.",
    previewType: "mobile",
    mobileData: {
      userName: "Aarav",
      balance: "₹2,48,930",
      growth: "▲ 12.3% this month",
      transactions: [
        { name: "Zomato", date: "Aug 12, 2026", amount: "-₹1,240" },
      ],
    },
    stats: [
      { label: "User Growth", value: "3x" },
      { label: "Faster Transactions", value: "40%" },
      { label: "Platform Uptime", value: "99.9%" },
    ],
    url: "/project",
  },
  {
    id: "healthcare",
    stepNumber: "02",
    tag: "HEALTHCARE",
    tagColor: "bg-orange-950/70 text-orange-400 border-orange-800/60",
    title: "Smarter care for healthier tomorrows",
    description: "A HIPAA-compliant patient portal with automated workflows and real-time care coordination.",
    previewType: "health",
    healthData: {
      bpm: 72,
      status: "Optimal Rhythm",
    },
    stats: [
      { label: "Faster Onboarding", value: "60%" },
      { label: "Operational Efficiency", value: "2x" },
      { label: "User Satisfaction", value: "4.8/5" },
    ],
    url: "/project",
  },
  {
    id: "saas",
    stepNumber: "03",
    tag: "SAAS",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    title: "Scaling a product for global markets",
    description: "We helped GlobalPay scale their payment infrastructure to support multi-currency transactions worldwide.",
    previewType: "card",
    cardData: {
      brand: "GlobalPay",
      cardNumber: "•••• 4582",
    },
    stats: [
      { label: "Revenue Growth", value: "5x" },
      { label: "Fraud Reduction", value: "70%" },
      { label: "Countries Supported", value: "50+" },
    ],
    url: "/project",
  },
];

export default function RealBusinesses() {
  const [activeIndex, setActiveIndex] = useState(1); // Default center on 02 Healthcare
  const [isPaused, setIsPaused] = useState(false);

  // Fast auto-scroll cycle every 1.8 seconds with snappy smooth transition
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CASE_STUDIES.length);
    }, 1800);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CASE_STUDIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % CASE_STUDIES.length);
  };

  return (
    <section 
      id="real-businesses" 
      className="relative overflow-hidden bg-white py-18 sm:py-24 text-slate-800 font-sans select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative mx-auto w-full max-w-[1360px] px-6 sm:px-8 z-10">
        
        {/* ========================================================
            HEADER: SUMIT DEVTECH BRAND THEME (ORANGE / AMBER ACCENT)
           ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-orange-600 mb-3 uppercase">
            <span className="h-px w-6 bg-orange-500" />
            <span>PROVEN IMPACT</span>
            <span className="h-px w-6 bg-orange-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans text-slate-900 tracking-tight leading-[1.18]">
            Real businesses. <span className="text-orange-500">Measurable results.</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed font-normal font-sans">
            From ambitious startups to global enterprises, we build scalable software solutions that solve real-world problems.
          </p>
        </div>

        {/* ========================================================
            3D PERSPECTIVE AUTO-SCROLLING CARDS STAGE
           ======================================================== */}
        <div className="relative mx-auto flex items-center justify-center min-h-[580px] sm:min-h-[640px] [perspective:1400px]">
          {CASE_STUDIES.map((study, idx) => {
            const offset = (idx - activeIndex + CASE_STUDIES.length) % CASE_STUDIES.length;
            const isCenter = offset === 0;
            const isRight = offset === 1;
            const isLeft = offset === CASE_STUDIES.length - 1;

            let xPosition = 0;
            let rotateY = 0;
            let zIndex = 10;
            let scale = 1;
            let opacity = 1;

            if (isCenter) {
              xPosition = 0;
              rotateY = 0;
              zIndex = 30;
              scale = 1.05;
              opacity = 1;
            } else if (isLeft) {
              xPosition = -330;
              rotateY = 16;
              zIndex = 20;
              scale = 0.92;
              opacity = 0.85;
            } else if (isRight) {
              xPosition = 330;
              rotateY = -16;
              zIndex = 20;
              scale = 0.92;
              opacity = 0.85;
            }

            const isDarkCard = study.id === "healthcare";

            return (
              <motion.div
                key={study.id}
                animate={{
                  x: xPosition,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={() => setActiveIndex(idx)}
                className={`absolute top-0 w-[320px] sm:w-[370px] md:w-[400px] cursor-pointer rounded-[32px] p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-colors duration-300 font-sans ${
                  isDarkCard
                    ? "bg-[#181c26] text-white border border-slate-700/80 shadow-2xl"
                    : "bg-white text-slate-900 border border-slate-200/90 shadow-xl"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Top Pill & Step Number */}
                <div className="flex items-center justify-between pb-3">
                  <span className={`rounded-full px-3 py-0.8 text-[11px] font-semibold tracking-wider uppercase border ${study.tagColor}`}>
                    {study.tag}
                  </span>
                  <span className={`text-sm font-semibold ${isDarkCard ? "text-slate-400" : "text-slate-400"}`}>
                    {study.stepNumber}
                  </span>
                </div>

                {/* Title */}
                <h3 className={`mt-2 text-xl sm:text-2xl font-bold font-sans leading-tight ${isDarkCard ? "text-white" : "text-slate-900"}`}>
                  {study.title}
                </h3>

                {/* Description */}
                <p className={`mt-2 text-xs sm:text-sm font-normal font-sans leading-relaxed ${isDarkCard ? "text-slate-300" : "text-slate-500"}`}>
                  {study.description}
                </p>

                {/* View Case Study CTA */}
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href={study.url}
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold transition-all ${
                      isDarkCard ? "text-orange-400 hover:text-orange-300" : "text-slate-800 hover:text-orange-600"
                    }`}
                  >
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      isDarkCard ? "bg-orange-500/20 text-orange-400" : "bg-orange-100 text-orange-600"
                    }`}>
                      <ArrowRight size={13} />
                    </span>
                    <span>View Case Study</span>
                  </a>
                </div>

                {/* Visual Preview Box */}
                <div className="mt-5 rounded-2xl bg-slate-50/70 p-3 overflow-hidden">
                  {/* Phone Mockup Preview */}
                  {study.previewType === "mobile" && study.mobileData && (
                    <div className="relative mx-auto w-48 rounded-[22px] border-[3px] border-slate-800 bg-white p-2.5 text-slate-800 shadow-md">
                      <div className="mx-auto mb-1.5 h-2 w-12 rounded-full bg-black flex items-center justify-center">
                        <span className="h-0.5 w-0.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="text-[9px]">
                        <span className="text-slate-400">Good Morning,</span>
                        <div className="font-bold text-slate-900">{study.mobileData.userName}</div>
                        <div className="mt-1.5 rounded-lg bg-slate-50 p-1.5 border border-slate-100">
                          <span className="text-[7.5px] text-slate-400">Total Balance</span>
                          <div className="text-xs font-black text-slate-900">{study.mobileData.balance}</div>
                          <span className="text-[7.5px] font-bold text-emerald-600">{study.mobileData.growth}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Healthcare Monitor Preview */}
                  {study.previewType === "health" && study.healthData && (
                    <div className="relative mx-auto h-36 w-full rounded-2xl bg-[#11141e] p-4 text-white shadow-lg flex flex-col items-center justify-center">
                      <div className="text-2xl font-black text-white flex items-center gap-1.5">
                        <span className="text-rose-500 text-lg">❤️</span>
                        <span>{study.healthData.bpm}</span>
                        <span className="text-[10px] text-slate-400 font-normal">bpm</span>
                      </div>
                      <div className="mt-2 h-1.5 w-32 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-3/4 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                    </div>
                  )}

                  {/* SaaS Virtual Card Preview */}
                  {study.previewType === "card" && study.cardData && (
                    <div className="relative mx-auto h-36 w-full rounded-2xl bg-gradient-to-tr from-[#161a26] to-[#222838] p-4 text-white shadow-lg flex flex-col justify-between">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="flex items-center gap-1 font-bold text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span>{study.cardData.brand}</span>
                        </span>
                        <span className="text-slate-400">Card</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-8 rounded bg-amber-400/80" />
                        <span className="font-mono text-xs tracking-wider text-slate-300">
                          {study.cardData.cardNumber}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom 3 Metrics Footer */}
                <div className={`mt-5 pt-4 border-t flex items-center justify-between text-center ${isDarkCard ? "border-slate-800 text-slate-300" : "border-slate-100 text-slate-700"}`}>
                  {study.stats.map((s, sIdx) => (
                    <div key={sIdx} className="flex-1">
                      <div className={`text-base sm:text-lg font-black ${isDarkCard ? "text-white" : "text-slate-900"}`}>
                        {s.value}
                      </div>
                      <div className="text-[9px] font-medium text-slate-400 mt-0.5 leading-tight">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
