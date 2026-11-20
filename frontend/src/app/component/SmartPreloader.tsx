"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Smart Website Preloader
 * - RUNS ONLY ONCE PER SESSION: uses sessionStorage so navigating between pages never triggers it again.
 * - Auto-dismiss immediately when page is loaded (350ms fade-out)
 * - Safe fallback timer (max 650ms) ensures it never lingers or blocks
 */
export default function SmartPreloader() {
  const [mounted, setMounted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Check if already shown in this browser session
    const hasSeen = sessionStorage.getItem("has_seen_preloader");
    if (hasSeen) {
      return; // Never show again during navigation
    }

    // 2. Reduced motion check
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("has_seen_preloader", "true");
      return;
    }

    // First visit: show preloader and mark as seen
    setMounted(true);
    sessionStorage.setItem("has_seen_preloader", "true");

    const dismiss = () => {
      setFadeOut(true);
      setTimeout(() => {
        setMounted(false);
      }, 300);
    };

    if (document.readyState === "complete") {
      dismiss();
      return;
    }

    const handleLoad = () => dismiss();
    window.addEventListener("load", handleLoad, { once: true });
    const safetyTimer = setTimeout(dismiss, 650);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white transition-opacity duration-300 ease-out select-none ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-5">
        {/* Normal Company Logo */}
        <div className="relative w-56 h-16 flex items-center justify-center">
          <Image
            src="/images/logo-transparent.png"
            alt="Sumit DevTech"
            width={240}
            height={64}
            priority
            className="w-full h-auto max-h-14 object-contain"
          />
        </div>

        {/* Minimal Clean Circular Spinner in Brand Orange */}
        <div className="relative w-7 h-7 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-slate-100" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 border-r-orange-500 animate-spin" />
        </div>
      </div>
    </div>
  );
}
