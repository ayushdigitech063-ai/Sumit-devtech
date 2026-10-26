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
    <span ref={ref} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-brand tracking-tight">
      {formatted}
      <span>{item.suffix}</span>
    </span>
  );
}

export default function StatsSection({ data, stats: statsProp }: StatsSectionProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const stats = data?.items ?? statsProp ?? [];

  return (
    <section className="relative bg-dark-2 text-white md:py-15 border-y border-white/10 overflow-hidden">
      {/* Background Subtle Gradient Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"
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
                className="flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
              >
                <AnimatedMetric item={stat} />
                <div className="text-base font-bold text-white mt-2">
                  {stat.label}
                </div>
                <div className="text-xs text-white/50 mt-1">
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
