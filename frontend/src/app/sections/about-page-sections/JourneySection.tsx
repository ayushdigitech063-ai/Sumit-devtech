"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import { OurJourney } from "@/data/about";

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

  return (
    <section ref={sectionRef} id="journey-section" className="relative bg-white text-black md:py-18 overflow-hidden">
      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <SectionHeading
            center
            label="Our journey"
            title={
              <>
                We Started in 2016. <span className="text-brand">We&apos;re Still Growing.</span>
              </>
            }
            text="Three brands built over 8+ years. Same founder, same team, same work ethic throughout."
          />

          <div className="mx-auto max-w-4xl relative mt-16">
            {/* Vertical progress line for desktop / tablet */}
            <div
              aria-hidden="true"
              className="hidden md:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-0.5 bg-white/10"
            >
              <motion.div
                style={{ scaleY, originY: 0 }}
                className="w-full h-full bg-brand"
              />
            </div>

            <div className="space-y-12 md:space-y-16">
              {OurJourney.map((item, index) => {
                const isEven = index % 2 === 0;
                const Icon = item.icon;

                return (
                  <div
                    key={`journey-${item.title}`}
                    className="relative flex flex-col items-center md:grid md:grid-cols-2 md:gap-14"
                  >
                    {/* Card: staggered left/right on alternating rows */}
                    <motion.div
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.7,
                        delay: shouldReduceMotion ? 0 : 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`w-full text-left ${
                        isEven ? "md:col-start-1" : "md:col-start-2"
                      }`}
                    >
                      <div className="rounded-3xl border border-white/10 bg-dark-2 p-8 backdrop-blur-xl shadow-xl transition duration-300 hover:border-accent/40 hover:bg-dark-2">
                        <div className="flex items-center gap-3 mb-4 justify-start">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold text-accent-2">
                            <Icon size={14} />
                            {item.year}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                          {item.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-white/70">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>

                    {/* Center Node / Year Badge on desktop */}
                    <div
                      aria-hidden="true"
                      className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center h-12 w-12 rounded-full border-2 border-accent bg-dark shadow-lg shadow-accent/20 z-10 font-heading font-black text-xs text-accent-2"
                    >
                      {item.year}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}