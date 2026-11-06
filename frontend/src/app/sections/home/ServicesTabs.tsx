"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Section from "@/app/ui/Section";
import SectionHeading from "@/app/ui/SectionHeading";
import { homeServices } from "@/data/home";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export default function ServicesTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 1
  const listRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const elapsed = useRef(0);

  const select = (i: number) => {
    setActive(i);
    setProgress(0);
    elapsed.current = 0;
  };

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

  return (
    <Section id="services" className="bg-[#f7f6f3] border-t border-line/60">
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

      <div
        className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[258px_minmax(0,1fr)] lg:gap-6"
        onMouseLeave={() => setPaused(false)}
      >
        {/* tabs */}
        <div
          ref={listRef}
          role="tablist"
          aria-label="Our services"
          className="relative flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:sticky lg:top-24 lg:flex-col lg:self-start lg:gap-1.5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
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
                onMouseEnter={() => select(i)}
                onClick={() => select(i)}
                onFocus={() => select(i)}
                aria-selected={on}
                className={cn(
                  "relative flex shrink-0 snap-start items-center gap-3 overflow-hidden rounded-full px-4 py-2.5 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:rounded-2xl lg:py-3.5",
                  on
                    ? "text-ink shadow-sm"
                    : "text-muted hover:bg-black/5 hover:text-ink",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="svc-active"
                    className="absolute inset-0 rounded-full border border-accent/40 bg-white lg:rounded-2xl shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className={cn(
                    "relative font-heading text-xs font-bold",
                    on ? "text-accent" : "text-muted/60",
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
                    className="absolute bottom-0 left-0 h-[3px] bg-brand transition-[width] duration-100 ease-linear"
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
                  select(i);
                  setProgress(0);
                  elapsed.current = 0;
                }}
                onFocus={() => select(i)}
                className={cn(
                  "group relative flex min-h-[125px] flex-col items-center justify-center rounded-2xl border px-4 py-5 text-center transition-all duration-300",
                  on
                    ? "border-accent bg-white shadow-xl shadow-accent/10 -translate-y-1"
                    : "border-line bg-white/70 hover:-translate-y-1 hover:border-accent/40 hover:bg-white hover:shadow-lg hover:shadow-black/5",
                )}
              >
                {/* Icon */}
                <span
                  className={cn(
                    "mb-3 flex h-[53px] w-[53px] items-center justify-center rounded-2xl border transition-colors",
                    on
                      ? "border-accent/40 bg-accent/10"
                      : "border-line bg-[#f7f6f3] group-hover:border-accent/30 group-hover:bg-accent/5",
                  )}
                >
                  {Icon ? (
                    <Icon
                      size={25}
                      strokeWidth={1.7}
                      className={cn("transition-transform duration-300 group-hover:scale-110", on ? "text-accent" : "text-dark/80")}
                    />
                  ) : (
                    <ChevronRight
                      size={25}
                      strokeWidth={1.7}
                      className="text-accent"
                    />
                  )}
                </span>

                {/* Service name */}
                <span className="text-xl font-bold text-ink">
                  {x.title}
                </span>
                <p className="mt-1 text-sm font-medium text-muted">{x.text}</p>

                {/* Active progress indicator */}
                {on && (
                  <span className="absolute inset-x-0 bottom-0 h-[3px] overflow-hidden rounded-b-2xl bg-black/5">
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
