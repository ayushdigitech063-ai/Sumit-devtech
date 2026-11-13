"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, animate, useInView, useReducedMotion } from "framer-motion";
import Container from "@/app/ui/Container";
import { ServicePageData, StatItem } from "@/types/service-page";

export interface StatsSectionProps {
  data?: ServicePageData["stats"];
  stats?: StatItem[];
}

function AnimatedMetric({ item }: { item: StatItem }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!inView || shouldReduceMotion) return;

    const controls = animate(0, item.numericValue, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(latest);
      },
    });

    return () => controls.stop();
  }, [inView, shouldReduceMotion, item.numericValue]);

  const formatted = shouldReduceMotion
    ? item.numericValue.toFixed(item.decimals || 0)
    : item.decimals
    ? displayValue.toFixed(item.decimals)
    : Math.floor(displayValue).toString();

  return (
    <span ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand tracking-tight">
      {formatted}
      <span>{item.suffix}</span>
    </span>
  );
}

export default function StatsSection({ data, stats: statsProp }: StatsSectionProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const stats = data?.items ?? statsProp ?? [];

  return (
    <section className="relative bg-[#f8fafc] text-ink md:py-16 border-y border-line/60 overflow-hidden">
      {/* Background Subtle Gradient Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(#e2e8f0 1.2px, transparent 1.2px)",
          backgroundSize: "28px 28px",
        }}
      />

      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-line bg-white shadow-sm hover:shadow-md transition duration-200"
              >
                <AnimatedMetric item={stat} />
                <div className="text-base font-semibold text-ink mt-2">
                  {stat.label}
                </div>
                <div className="text-xs text-muted mt-1.5 leading-relaxed">
                  {stat.subtext}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
