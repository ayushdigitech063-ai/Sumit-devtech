"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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

  // Smooth auto-scroll continuous loop every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CASE_STUDIES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

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
    >
      <div className="relative mx-auto w-full max-w-[1360px] px-6 sm:px-8 z-10">
        
        {/* HEADER */}
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

        {/* 
            SMOOTH 3D PERSPECTIVE AUTO-SCROLLING CARDS STAGE
            Hardware accelerated via CSS transforms & transition
        */}
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

            const isDarkCard = isCenter; // Center active card always gets dark hero styling

            return (
              <div
                key={study.id}
                onClick={() => setActiveIndex(idx)}
                style={{
                  transform: `translateX(${xPosition}px) scale(${scale}) perspective(1200px) rotateY(${rotateY}deg)`,
                  zIndex: zIndex,
                  opacity: opacity,
                  willChange: "transform, opacity",
                }}
                className={`absolute top-0 w-[320px] sm:w-[370px] md:w-[400px] cursor-pointer rounded-[32px] p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-600 ease-out font-sans ${
                  isDarkCard
                    ? "bg-[#181c26] text-white border-2 border-orange-500/40 shadow-2xl ring-4 ring-orange-500/10"
                    : "bg-white text-slate-900 border border-slate-200/90 shadow-xl"
                }`}
              >
                {/* Top Pill & Step Number */}
                <div className="flex items-center justify-between pb-3">
                  <span className={`rounded-full px-3 py-0.8 text-[11px] font-semibold tracking-wider uppercase border ${
                    isDarkCard ? "bg-orange-950/70 text-orange-400 border-orange-800/60" : study.tagColor
                  }`}>
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
                <div className={`mt-5 rounded-2xl p-3 overflow-hidden ${isDarkCard ? "bg-slate-900/80 border border-slate-800" : "bg-slate-50/70 border border-slate-100"}`}>
                  {/* Phone Mockup Preview */}
                  {study.previewType === "mobile" && study.mobileData && (
                    <div className="relative mx-auto w-48 rounded-[22px] border-[3px] border-slate-800 bg-white p-2.5 text-slate-800 shadow-md">
                      <div className="mb-2 text-center text-[10px] text-slate-400">
                        Good Morning, <b className="text-slate-700">{study.mobileData.userName}</b>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-2 text-center">
                        <span className="text-[9px] text-slate-400">Total Balance</span>
                        <div className="text-sm font-extrabold text-slate-900">{study.mobileData.balance}</div>
                        <span className="text-[8.5px] font-bold text-emerald-600">{study.mobileData.growth}</span>
                      </div>
                    </div>
                  )}

                  {/* Heartbeat Monitor Preview */}
                  {study.previewType === "health" && study.healthData && (
                    <div className="relative mx-auto flex h-32 w-full max-w-[240px] flex-col items-center justify-center rounded-2xl bg-[#121620] border border-slate-700/60 p-4 text-center">
                      <div className="flex items-center gap-2 text-white">
                        <span className="text-red-500 text-base animate-pulse">❤️</span>
                        <span className="text-2xl font-black">{study.healthData.bpm}</span>
                        <span className="text-xs text-slate-400">bpm</span>
                      </div>
                      <div className="mt-3 h-1.5 w-32 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full w-2/3 bg-emerald-500 rounded-full animate-pulse" />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-2">{study.healthData.status}</span>
                    </div>
                  )}

                  {/* Credit Card Preview */}
                  {study.previewType === "card" && study.cardData && (
                    <div className="relative mx-auto h-28 w-52 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 p-3.5 text-white shadow-md border border-slate-700">
                      <div className="flex justify-between items-center text-xs font-bold text-emerald-400">
                        <span>{study.cardData.brand}</span>
                        <span className="text-[9px] text-slate-400 uppercase">Card</span>
                      </div>
                      <div className="mt-6 flex items-center justify-between text-xs tracking-widest font-mono text-slate-300">
                        <span className="h-3 w-4 bg-amber-400 rounded-xs" />
                        <span>{study.cardData.cardNumber}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Metrics Row */}
                <div className={`mt-5 grid grid-cols-3 gap-2 border-t pt-4 text-center ${
                  isDarkCard ? "border-slate-800 text-white" : "border-slate-100 text-slate-900"
                }`}>
                  {study.stats.map((s, idx) => (
                    <div key={idx}>
                      <div className="text-base sm:text-lg font-black tracking-tight">{s.value}</div>
                      <div className={`text-[10px] font-medium leading-tight mt-0.5 ${
                        isDarkCard ? "text-slate-400" : "text-slate-500"
                      }`}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons & Dots */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition shadow-sm active:scale-95 cursor-pointer"
            aria-label="Previous Case Study"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-1.5">
            {CASE_STUDIES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setActiveIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === activeIndex ? "w-8 bg-orange-500" : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition shadow-sm active:scale-95 cursor-pointer"
            aria-label="Next Case Study"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
