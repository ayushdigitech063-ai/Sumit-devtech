"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "@/app/ui/Section";
import SectionHeading from "@/app/ui/SectionHeading";
import { homeServices } from "@/data/home";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const DURATION = 3500; // ms each service tab stays active before advancing
const TICK = 80;
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export default function ServicesTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const listRef = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const reduce = useReducedMotion();
  const total = homeServices.length;

  const select = (i: number) => {
    setActive(i);
    setProgress(0);
    elapsed.current = 0;
  };

  // Smooth Auto-advance carousel loop across services
  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => {
      elapsed.current += TICK;
      if (elapsed.current >= DURATION) {
        elapsed.current = 0;
        setProgress(0);
        setActive((prev) => (prev + 1) % total);
      } else {
        setProgress(elapsed.current / DURATION);
      }
    }, TICK);
    return () => clearInterval(id);
  }, [paused, reduce, total]);

  // Keep active pill centered on horizontal scroll without jumping
  useEffect(() => {
    const list = listRef.current;
    const btn = list?.children[active] as HTMLElement | undefined;
    if (!list || !btn || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: btn.offsetLeft - list.clientWidth / 2 + btn.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <Section id="services" className="relative overflow-hidden bg-[#f7f6f3] border-t border-line/60 py-16 sm:py-20 font-sans">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          label="Our Services"
          center={true}
          title={
            <>
              Smart IT Solutions That Power Your{" "}
              <span className="text-brand">Digital Success.</span>
            </>
          }
          text="We started Sumit DevTech with one goal - to help businesses in Jaipur and across India get online properly, not just cheaply."
        />

        {/* TOP: Horizontal Row of Category Pills (Centered & Horizontal) */}
        <div
          ref={listRef}
          role="tablist"
          aria-label="Our services"
          className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            elapsed.current = 0;
          }}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => {
            setPaused(false);
            elapsed.current = 0;
          }}
        >
          {homeServices.map((x, i) => {
            const on = i === active;
            return (
              <button
                key={x.title}
                type="button"
                onMouseEnter={() => select(i)}
                onClick={() => select(i)}
                onFocus={() => select(i)}
                aria-selected={on}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 sm:gap-2.5 overflow-hidden rounded-full px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 focus-visible:outline-none cursor-pointer",
                  on
                    ? "text-ink shadow-md bg-white border border-slate-200"
                    : "text-muted hover:bg-black/5 hover:text-ink border border-transparent bg-black/[0.03]",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="svc-row-pill"
                    className="absolute inset-0 rounded-full border border-accent/40 bg-white shadow-sm -z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 font-sans text-xs font-bold",
                    on ? "text-accent" : "text-muted/60",
                  )}
                >
                  {pad(i + 1)}
                </span>
                <span className="relative z-10 whitespace-nowrap leading-snug font-sans">
                  {x.title}
                </span>

                {/* Active progress bar filling up underneath active pill */}
                {on && (
                  <span
                    className="absolute bottom-0 left-0 h-[2.5px] bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-75 ease-linear z-20 rounded-full"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* BOTTOM: Horizontal Cards Grid (Responsive Multi-Column Row Layout) */}
        <div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            elapsed.current = 0;
          }}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => {
            setPaused(false);
            elapsed.current = 0;
          }}
        >
          {homeServices.map((x, i) => {
            const on = i === active;
            const Icon = x.icon;

            return (
              <button
                key={x.title}
                type="button"
                onMouseEnter={() => select(i)}
                onClick={() => select(i)}
                onFocus={() => select(i)}
                className={cn(
                  "group relative flex min-h-[160px] sm:min-h-[175px] flex-col items-center justify-center rounded-2xl border p-5 text-center transition-all duration-300 overflow-hidden cursor-pointer",
                  on
                    ? "border-accent bg-white shadow-xl shadow-accent/15 -translate-y-1.5 ring-1 ring-accent/30"
                    : "border-line bg-white/80 hover:-translate-y-1 hover:border-accent/40 hover:bg-white hover:shadow-lg hover:shadow-black/5",
                )}
              >
                {/* Metallic light sheen sweep effect on hover */}
                <span className="pointer-events-none absolute -inset-y-full -left-[100%] w-[120%] -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/80 to-transparent transition-all duration-700 ease-out group-hover:left-[150%]" />

                {/* Icon Bubble */}
                <span
                  className={cn(
                    "mb-3 flex h-13 w-13 items-center justify-center rounded-2xl border transition-all duration-300",
                    on
                      ? "border-accent/40 bg-accent/10 shadow-sm scale-110"
                      : "border-line bg-[#f7f6f3] group-hover:border-accent/30 group-hover:bg-accent/5",
                  )}
                >
                  {Icon ? (
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                      className={cn(
                        "transition-transform duration-300 group-hover:scale-110",
                        on ? "text-accent" : "text-slate-700"
                      )}
                    />
                  ) : (
                    <ChevronRight
                      size={24}
                      strokeWidth={1.8}
                      className="text-accent"
                    />
                  )}
                </span>

                {/* Service Title */}
                <span className="font-sans text-base sm:text-lg font-bold text-ink leading-snug">
                  {x.title}
                </span>

                {/* Short Description */}
                <p className="mt-1.5 font-sans text-xs sm:text-[13px] font-medium text-muted leading-relaxed line-clamp-2">
                  {x.text}
                </p>

                {/* Active progress indicator line at bottom */}
                {on && (
                  <span className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden rounded-b-2xl bg-black/5">
                    <span
                      className="block h-full bg-gradient-to-r from-accent to-accent-2 transition-[width] duration-75 ease-linear"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
