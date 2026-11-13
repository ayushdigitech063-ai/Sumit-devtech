"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Quick studio entrance: 1.25s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="studio-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white px-6 select-none pointer-events-none"
        >
          {/* Top Progress Laser Line */}
          <div className="absolute top-0 inset-x-0 h-[2.5px] bg-slate-100 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
              className="h-full w-full bg-gradient-to-r from-orange-400 via-orange-500 to-[#ff6a1f]"
            />
          </div>

          {/* Center Brand Identity: Fluid Viewport Scale */}
          <div className="relative flex flex-col items-center max-w-[90vw]">
            {/* Subtle Studio Bloom */}
            <div className="pointer-events-none absolute -inset-16 rounded-full bg-orange-400/8 blur-3xl" />

            {/* Logo Wrapper (Fluid clamp size adapting to mobile, tablet, laptop, desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -6 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden p-2"
            >
              <Image
                src="/images/logo-transparent.png"
                alt="Website Development Company 4u"
                width={500}
                height={120}
                priority
                className="w-[min(75vw,420px)] h-auto object-contain"
              />

              {/* Liquid Shimmer Light Wave passing across logo */}
              <motion.div
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                  repeatDelay: 0.25,
                }}
                className="pointer-events-none absolute inset-0 w-2/3 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-22deg]"
              />
            </motion.div>

            {/* Fluid Responsive Subtitle */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-4 font-mono text-[clamp(10px,1.4vw,13px)] font-semibold tracking-[0.32em] uppercase text-slate-400 text-center"
            >
              Architecting Digital Experiences
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
