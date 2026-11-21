"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Lightbulb, Rocket, Globe, Award } from "lucide-react";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";

export const OUR_JOURNEY = [
  {
    title: "Digital Openers",
    year: "2016",
    icon: Lightbulb,
    text: "The journey began as a web development setup in Jaipur with one straightforward goal: build websites that actually work for businesses.",
  },
  {
    title: "Sumit Digitech",
    year: "2021",
    icon: Rocket,
    text: "A dedicated SEO company was added. Because getting a website built and getting that website found on Google are both essential.",
  },
  {
    title: "Sumit DevTech",
    year: "2025",
    icon: Globe,
    text: "Launched as the complete package - development, SEO, eCommerce, web applications, UI/UX design, all under one roof.",
  },
  {
    title: "Ownership & Trust",
    year: "Present",   
    icon: Award,
    text: "Founder Sumit Kumar Mishra has been part of every stage, leading a 50+ member team delivering 1000+ projects globally.",
  },
];

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
              className="hidden md:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-0.5 bg-slate-200"
            >
              <motion.div
                style={{ scaleY, originY: 0 }}
                className="w-full h-full bg-brand"
              />
            </div>

            <div className="space-y-12 md:space-y-16">
              {OUR_JOURNEY.map((item, index) => {
                const isEven = index % 2 === 0;
                const Icon = item.icon;

                return (
                  <div
                    key={item.year + item.title}
                    className={`relative flex flex-col md:flex-row items-center gap-8 ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content Box */}
                    <div className="w-full md:w-1/2">
                      <div className="rounded-3xl border border-line bg-[#fcfbf9] p-7 sm:p-8 shadow-xs hover:shadow-md transition duration-300">
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-600 font-normal">
                          {item.text}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Center Node */}
                    <div className="z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white border-2 border-orange-500 text-orange-500 shadow-md">
                      <Icon size={20} />
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block w-1/2" />
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
