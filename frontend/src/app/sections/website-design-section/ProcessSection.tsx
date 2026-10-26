"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { CheckCircle2, Layers } from "lucide-react";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import { ServicePageData, ProcessStep } from "@/types/service-page";

export interface ProcessSectionProps {
  data?: ServicePageData["process"];
  label?: string;
  title?: React.ReactNode;
  text?: string;
  steps?: ProcessStep[];
}

export default function ProcessSection({
  data,
  label: labelProp,
  title: titleProp,
  text: textProp,
  steps: stepsProp,
}: ProcessSectionProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const label = data?.label ?? labelProp ?? "Proven Workflow";
  const title = titleProp ?? (
    data ? (
      <>
        {data.title}{" "}
        {data.highlight && <span className="text-brand">{data.highlight}</span>}
      </>
    ) : (
      <>
        Our 4-Step Web Design{" "}
        <span className="text-brand">Process</span>
      </>
    )
  );
  const text =
    data?.text ??
    textProp ??
    "From initial concepts and architecture to high-fidelity Figma models and responsive frontend code, our process is transparent, structured, and milestone-driven.";
  const steps = data?.steps ?? stepsProp ?? [];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0.1, 1]);

  return (
    <section ref={sectionRef} className="relative bg-dark text-white md:py-18 overflow-hidden">
      {/* Background glow elements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[500px] w-[600px] bg-accent/10 blur-[120px] rounded-full"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1100px]">
          <SectionHeading
            center
            dark
            label={label}
            title={title}
            text={text}
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
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center md:grid md:grid-cols-2 md:gap-14"
                >
                  {/* Step Card: on odd index, place on left; on even, place on right */}
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
                    <div className="rounded-3xl border border-white/10 bg-dark-2/80 p-8 backdrop-blur-xl shadow-xl transition duration-300 hover:border-accent/40 hover:bg-dark-2">
                      <div className="flex items-center gap-3 mb-4 justify-start">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold text-accent-2">
                          <Layers size={13} />
                          Step {step.number}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                        {step.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-white/70 mb-5">
                        {step.description}
                      </p>

                      <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs font-medium text-emerald-400 justify-start">
                        <CheckCircle2 size={15} />
                        <span>Deliverable: {step.deliverable}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center Node / Number Badge on desktop */}
                  <div
                    aria-hidden="true"
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center h-12 w-12 rounded-full border-2 border-accent bg-dark shadow-lg shadow-accent/20 z-10 font-heading font-black text-accent-2"
                  >
                    {step.number}
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
