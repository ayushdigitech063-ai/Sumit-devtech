"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Button from "../../ui/Button";
import { homeServices } from "@/data/home";
import { cn } from "@/lib/utils";

const DURATION = 4000; // ms each service stays on screen
const TICK = 100;
const chips = ["Custom Code", "SEO Ready", "Mobile First"];
const pad = (n: number) => String(n).padStart(2, "0");

export default function ServicesTabs() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const elapsed = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const total = homeServices.length;
  const s = homeServices[active];

  const select = (i: number) => {
    elapsed.current = 0;
    setProgress(0);
    setActive(i);
  };

  // auto-advance (pauses while hovering / focused)
  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => {
      elapsed.current += TICK;
      if (elapsed.current >= DURATION) {
        elapsed.current = 0;
        setProgress(0);
        setActive((a) => (a + 1) % total);
      } else {
        setProgress(elapsed.current / DURATION);
      }
    }, TICK);
    return () => clearInterval(id);
  }, [paused, reduce, total]);

  // keep the active pill centred in the mobile scroll row (never scrolls the page)
  useEffect(() => {
    const list = listRef.current;
    const btn = list?.children[active] as HTMLElement | undefined;
    if (!list || !btn || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: btn.offsetLeft - list.clientWidth / 2 + btn.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  const item = (n: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.4,
      delay: 0.05 + n * 0.07,
      ease: "easeOut" as const,
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleCards = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleCards.length > 0) {
          const index = cardsRef.current.findIndex(
            (card) => card === visibleCards[0].target,
          );

          if (index !== -1) {
            setActive(index);
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      },
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="services" dark>
      <SectionHeading
        dark
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

      <div
        className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[258px_minmax(0,1fr)] lg:gap-6"
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* tabs */}
        <div
          ref={listRef}
          role="tablist"
          aria-label="Our services"
          className="relative flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 `[scrollbar-width:none]` lg:sticky lg:top-24 lg:flex-col lg:self-start lg:gap-1 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {homeServices.map((x, i) => {
            const on = i === active;
            return (
              <button
                key={x.title}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                type="button"
                onFocus={() => select(i)}
                aria-selected={on}
                className={cn(
                  "relative flex shrink-0 snap-start items-center gap-3 overflow-hidden rounded-full px-4 py-2.5 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:rounded-2xl lg:py-3",
                  on
                    ? "text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="svc-active"
                    className="absolute inset-0 rounded-full border border-accent/40 `bg-gradient-to-r` from-accent/25 to-white/5 lg:rounded-2xl"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={cn(
                    "relative font-heading text-xs font-bold",
                    on ? "text-accent-2" : "text-white/30",
                  )}
                >
                  {pad(i + 1)}
                </span>
                <span className="relative whitespace-nowrap leading-snug lg:whitespace-normal">
                  {x.title}
                </span>
                <ChevronRight
                  size={16}
                  className={cn(
                    "relative ml-auto hidden shrink-0 transition duration-300 lg:block",
                    on
                      ? "translate-x-0 text-accent opacity-100"
                      : "-translate-x-2 opacity-0",
                  )}
                />
                {on && (
                  <span
                    className="absolute bottom-0 left-0 `h-[3px]` bg-brand transition-[width] duration-100 ease-linear"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Service Cards */}
        <div
          className="grid grid-cols-2 gap-4 sm:grid-cols-1 lg:grid-row-5"
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {homeServices.map((x, i) => {
            const on = i === active;
            const Icon = x.icon;

            return (
              <button
                key={x.title}
                type="button"
                onMouseEnter={() => {
                  setActive(i);
                  setProgress(0);
                  elapsed.current = 0;
                }}
                onFocus={() => select(i)}
                aria-pressed={on}
                className={cn(
                  "group relative flex `min-h-[125px]` flex-col items-center justify-center rounded-2xl border px-3 py-5 text-center transition-all duration-300",
                  on
                    ? "border-accent/50 bg-[#152238] shadow-lg shadow-accent/5"
                    : "border-white/10 bg-[#101c2e] hover:-translate-y-1 hover:border-accent/40 hover:bg-[#142238]",
                )}
              >
                {/* Icon */}
                <span
                  className={cn(
                    "mb-3 flex `h-[53px]` `w-[53px]` items-center justify-center rounded-2xl border bg-[#0b1728] transition-colors",
                    on
                      ? "border-accent/40"
                      : "border-white/10 group-hover:border-accent/40",
                  )}
                >
                  {Icon ? (
                    <Icon
                      size={25}
                      strokeWidth={1.7}
                      className="text-accent-2 transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <ChevronRight
                      size={25}
                      strokeWidth={1.7}
                      className="text-accent-2"
                    />
                  )}
                </span>

                {/* Service name */}
                <span className="text-xl font-semibold text-white/80">
                  {x.title}
                </span>
                <p className="text-sm font-semibold text-white/50">{x.text}</p>

                {/* Active progress indicator */}
                {on && (
                  <span className="absolute inset-x-0 bottom-0 `h-[3px]` overflow-hidden rounded-b-2xl bg-white/5">
                    <span
                      className="block h-full bg-brand transition-[width] duration-100 ease-linear"
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
