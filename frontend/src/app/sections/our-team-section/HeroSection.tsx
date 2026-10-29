"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import { team } from "@/data/team";

export interface HeroSectionProps {
  memberCount: number;
}

interface StatCounterProps {
  numericValue: number;
  suffix?: string;
  decimals?: number;
  label: string;
}

function StatCounter({ numericValue, suffix = "", decimals = 0, label }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (!inView || shouldReduceMotion) return;

    const controls = animate(0, numericValue, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(latest),
    });

    return () => controls.stop();
  }, [inView, shouldReduceMotion, numericValue]);

  const formatted = shouldReduceMotion
    ? numericValue.toFixed(decimals)
    : decimals
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toString();

  return (
    <div className="space-y-1">
      <div className="font-heading text-3xl sm:text-4xl lg:text-4xl font-black tracking-tight text-white">
        <span ref={ref}>{formatted}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm font-medium text-white/70">{label}</div>
    </div>
  );
}

export default function HeroSection({ memberCount }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden bg-dark text-white pt-28 pb-20 md:pt-15 md:pb-23 border-b border-white/10">
      {/* Background radial gradient glow & grid matching Projects hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-44 h-[520px] w-[520px] animate-blob rounded-full bg-accent opacity-30 blur-[100px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-[440px] w-[440px] animate-blob rounded-full bg-accent-2 opacity-25 blur-[100px] [animation-delay:-6s] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(#ffffff0d_1px,transparent_1px),linear-gradient(90deg,#ffffff0d_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(circle_at_60%_40%,#000,transparent_75%)] animate-grid -z-10"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Heading, Subtitle & Count-up Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-7 text-left"
            >
              {/* Badge with pulsating green dot */}
              <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md shadow-sm">
                  <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
                  <span>Meet Our Team</span>
                </span>
              </motion.div>

              {/* H1 Heading with gradient highlight */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold tracking-tight sm:text-3xl md:text-3xl lg:text-5xl leading-[1.08] text-white"
              >
                The People Behind Our <span className="text-brand">Digital Growth</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="mt-6 max-w-xl text-base text-white/80 sm:text-lg sm:leading-relaxed"
              >
               We bring together visionary leaders, skilled managers, and technical experts to build scalable digital solutions.
              </motion.p>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/contact-us" variant="primary" className="gap-2.5 shadow-xl shadow-accent/25">
                  Work With Us
                  <ArrowRight size={16} />
                </Button>
                <a
                  href="#team-grid"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  View Team Members
                </a>
              </motion.div>

              {/* Stats Row built strictly from real team data */}
              <motion.div
                variants={itemVariants}
                className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8"
              >
                <StatCounter numericValue={memberCount} suffix="+" label="Core Members" />
                <StatCounter numericValue={100} suffix="%" label="Dedicated In-House" />
                <StatCounter numericValue={10} suffix="+ Yrs" label="Leadership Exp" />
              </motion.div>
            </motion.div>

            {/* Right Column: Floating Glass Window */}
            <motion.div
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: shouldReduceMotion ? 0 : [-8, 8, -8],
              }}
              transition={{
                opacity: { duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="relative lg:col-span-5"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-linear-to-r from-accent/20 to-accent-2/15 blur-2xl -z-10"
              />

              <div className="overflow-hidden rounded-[28px] border border-white/20 bg-white/[0.08] p-5 shadow-2xl backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1 text-[11px] text-white/70">
                    <Users size={11} className="text-accent" />
                    <span>sumitdevtech.com/our-team</span>
                  </div>
                  <div className="h-3 w-3" />
                </div>

                {/* Team Founder Image Box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15 bg-dark">
                  {team[0]?.image && (
                    <Image
                      src={team[0].image}
                      alt={`${team[0].name} - ${team[0].role}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 440px, 100vw"
                      className="object-cover object-top"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-dark/90 via-dark/30 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <span className="inline-block rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                      {team[0]?.role}
                    </span>
                    <h3 className="font-heading text-lg font-bold text-white mt-1">
                      {team[0]?.name}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

