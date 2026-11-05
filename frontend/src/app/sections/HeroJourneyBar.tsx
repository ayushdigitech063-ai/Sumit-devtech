"use client";
import React, { useRef } from "react";
import { 
  Code2, 
  Smartphone, 
  Search, 
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface JourneyStep {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  badge: string;
}

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "web-dev",
    category: "01",
    title: "Website Development",
    subtitle: "Next.js, React, Shopify & WordPress",
    icon: Code2,
    badge: "Web Dev",
  },
  {
    id: "app-dev",
    category: "02",
    title: "App Development",
    subtitle: "iOS & Android Cross-Platform Apps",
    icon: Smartphone,
    badge: "App Dev",
  },
  {
    id: "seo",
    category: "03",
    title: "Search Engine Optimization",
    subtitle: "Technical, On-Page & Rank #1 SEO",
    icon: Search,
    badge: "SEO",
  },
  {
    id: "marketing",
    category: "04",
    title: "Marketing & Growth",
    subtitle: "Meta/Google Ads & GMV Scaling Funnels",
    icon: TrendingUp,
    badge: "Marketing",
  },
];

interface JourneyBarProps {
  activeIndex: number;
  onSelectStep: (index: number) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
  duration?: number;
}

export default function HeroJourneyBar({
  activeIndex,
  onSelectStep,
  isPaused,
  setIsPaused,
  duration = 4500,
}: JourneyBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="w-full select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Main Bar Container - Solid high-contrast dark card with normal clean font */}
      <div className="relative rounded-2xl border border-white/20 bg-[#161822] p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl ring-1 ring-white/10 font-sans">
        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5"
        >
          {JOURNEY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeIndex;

            return (
              <button
                key={step.id}
                onClick={() => onSelectStep(idx)}
                type="button"
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-300",
                  isActive
                    ? "bg-white/15 text-white shadow-lg ring-1 ring-accent/60"
                    : "text-white/70 hover:bg-white/[0.08] hover:text-white"
                )}
              >
                {/* Icon Capsule */}
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105",
                    isActive
                      ? "bg-brand text-white shadow-md shadow-accent/40"
                      : "bg-white/10 text-white/80 group-hover:bg-white/20 group-hover:text-white"
                  )}
                >
                  <Icon size={18} strokeWidth={2} />
                </div>

                {/* Text Labels - Normal, Clean System Font (No Weird Serif or Heavy Bold) */}
                <div className="min-w-0 flex-1 overflow-hidden font-sans">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-accent-2">
                      STEP {step.category}
                    </span>
                    {isActive && (
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    )}
                  </div>
                  <h4 className="truncate text-xs sm:text-sm font-semibold leading-tight text-white mt-0.5">
                    {step.title}
                  </h4>
                  <p className="truncate text-[10.5px] font-normal text-white/60 leading-tight mt-0.5">
                    {step.subtitle}
                  </p>
                </div>

                {/* Active Progress Bar Under Step */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] overflow-hidden rounded-b-xl bg-white/10">
                    <div
                      className={cn(
                        "h-full bg-gradient-to-r from-accent to-accent-2 transition-all",
                        isPaused ? "duration-0" : "ease-linear"
                      )}
                      style={{
                        animation: isPaused
                          ? "none"
                          : `heroProgress ${duration}ms linear infinite`,
                      }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes heroProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
