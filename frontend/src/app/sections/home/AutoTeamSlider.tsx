"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface AutoTeamSliderProps {
  primaryImage?: string;
  badges: string[];
}

const TEAM_PHOTOS = [
  "/images/aboutPage/group_photo_1.png",
  "/images/aboutPage/group_photo_2.png",
  "/images/aboutPage/group_photo_3.png",
  "/images/aboutPage/group_photo_4.png",
];

export default function AutoTeamSlider({ primaryImage, badges }: AutoTeamSliderProps) {
  // If primaryImage is provided, make sure it's the first in list
  const photos = primaryImage
    ? [primaryImage, ...TEAM_PHOTOS.filter((p) => p !== primaryImage)]
    : TEAM_PHOTOS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3800); // changes every 3.8 seconds

    return () => clearInterval(interval);
  }, [isPaused, photos.length]);

  return (
    <div
      className="relative mx-auto w-full max-w-[560px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Outer decorative back-card border glow */}
      <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-tr from-orange-400/25 via-amber-200/20 to-blue-400/20 blur-lg opacity-70" />

      {/* Frame Container */}
      <div className="relative overflow-hidden rounded-[28px] border-4 border-white bg-white shadow-2xl shadow-slate-300/50">
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={photos[currentIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={photos[currentIndex]}
                alt={`Sumit DevTech Agency Team Jaipur - Slide ${currentIndex + 1}`}
                fill
                sizes="(min-width:1024px) 560px, 90vw"
                className="object-cover"
                priority={currentIndex === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator inside image at bottom-center */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 backdrop-blur-md">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-5 bg-orange-500" : "w-1.5 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Badge 1: Top-Left Google Partner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute -top-3.5 -left-3 sm:-left-5 z-20 flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xl backdrop-blur-md"
      >
        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>{badges[0] || "Google Certified Partner"}</span>
      </motion.div>

      {/* Floating Badge 2: Bottom-Right Tech Excellence */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute -bottom-3.5 -right-2 sm:-right-4 z-20 flex items-center gap-2 rounded-2xl border border-orange-200/80 bg-white/95 px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-900 shadow-xl backdrop-blur-md"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-600 font-black">
          ★
        </span>
        <span>{badges[1] || "2026 Tech Excellence"}</span>
      </motion.div>
    </div>
  );
}
