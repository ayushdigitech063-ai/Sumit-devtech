"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ExperienceCelebrationProps {
  targetYears?: number;
  label?: string;
  subLabel?: string;
}

export default function ExperienceCelebrationCard({
  targetYears = 12,
  label = "Years of Expertise in Business",
  subLabel = "Trusted across India & Global clients",
}: ExperienceCelebrationProps) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isCelebrated, setIsCelebrated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  const startAnimation = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;

    const totalDuration = 1800; // 1.8s
    const steps = targetYears || 12;
    const intervalTime = totalDuration / steps;

    let count = 0;
    const timer = setInterval(() => {
      count += 1;
      setCurrentNumber(count);
      if (count >= steps) {
        clearInterval(timer);
        setIsCelebrated(true);
      }
    }, intervalTime);
  };

  useEffect(() => {
    // Robust Intersection Observer that fires reliably when in viewport
    const element = cardRef.current;
    if (!element) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    // Fallback: If for some reason observer doesn't fire after 1s, start automatically
    const fallbackTimer = setTimeout(() => {
      startAnimation();
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [targetYears]);

  const progressPercent = Math.min(100, Math.round((currentNumber / (targetYears || 12)) * 100));

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-sm transition-all duration-300 hover:shadow-md"
    >
      {/* Celebration Confetti & Sparkles Overlay when reaching 12 */}
      {isCelebrated && (
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {/* Confetti particles */}
          {[...Array(20)].map((_, i) => {
            const colors = ["#f97316", "#eab308", "#3b82f6", "#10b981", "#ec4899", "#8b5cf6"];
            const color = colors[i % colors.length];
            const startX = 20 + (i * 3.5);
            const targetX = (Math.random() - 0.5) * 180;
            const targetY = - (Math.random() * 90 + 30);

            return (
              <motion.span
                key={i}
                initial={{ opacity: 1, scale: 0, x: `${startX}%`, y: "50%" }}
                animate={{
                  opacity: [1, 1, 0],
                  scale: [0, 1.3, 0.7],
                  x: `calc(${startX}% + ${targetX}px)`,
                  y: `${targetY}px`,
                  rotate: [0, Math.random() * 360],
                }}
                transition={{
                  duration: 1.4,
                  delay: i * 0.025,
                  ease: "easeOut",
                }}
                style={{ backgroundColor: color }}
                className="absolute h-2.5 w-2.5 rounded-sm shadow-xs"
              />
            );
          })}

          {/* Floating celebratory glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.7, 0], scale: [0.8, 1.5, 2] }}
            transition={{ duration: 1.2 }}
            className="absolute left-6 top-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-orange-400/30 blur-2xl"
          />
        </div>
      )}

      <div className="relative z-10 flex items-center gap-5 sm:gap-6">
        {/* Left: Number Counting (0 to 12+) */}
        <div className="flex items-baseline shrink-0">
          <motion.span
            key={currentNumber}
            animate={isCelebrated ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.4 }}
            className="font-sans text-5xl sm:text-6xl font-bold text-slate-900 leading-none tracking-tight"
          >
            {currentNumber}
          </motion.span>
          <span className="font-sans text-4xl sm:text-5xl font-bold text-orange-500 leading-none">
            +
          </span>
        </div>

        {/* Right: Progress line from 0 to 12 + Celebration Badge */}
        <div className="border-l border-slate-200 pl-4 sm:pl-5 min-w-0 flex-1">
          {/* Progress Tracker Line (fills from 0% to 100% as counter reaches 12) */}
          <div className="mb-2 relative">
            <div className="h-2 w-full max-w-[220px] rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-150 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
              {label}
            </p>
            {/* Pop-in Celebration Badge on 12 */}
            {isCelebrated && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="inline-flex items-center gap-1 rounded-full bg-orange-50 border border-orange-200 px-2 py-0.5 text-[10px] font-bold text-orange-600 shadow-2xs shrink-0"
              >
                <Sparkles size={11} className="text-orange-500 animate-spin" style={{ animationDuration: "3s" }} />
                <span>12 Years Completed! 🎉</span>
              </motion.span>
            )}
          </div>

          <p className="text-[11px] text-slate-500 font-normal mt-0.5">
            {subLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
