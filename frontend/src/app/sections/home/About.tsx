"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import CountUp from "../../ui/Countup";
import { aboutIntro, aboutYears, aboutStats, IMG } from "@/data/home";
import { cn } from "@/lib/utils";

export default function About() {
  return (
    <Section id="about">
      <SectionHeading
        center
        label="Who We Are"
        title={<>Website Design & Development Company in <span className="text-brand">Mansarovar, Jaipur</span></>}
      />

      {/* text + image */}
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="mb-9 text-base leading-relaxed text-ink/75 md:text-lg">{aboutIntro}</p>

          <div className="mb-9 flex items-center gap-4 md:gap-6">
            <b className="font-heading text-7xl font-extrabold leading-none text-ink md:text-8xl">
              <CountUp to={aboutYears.value} suffix="+" />
            </b>
            <div className="`max-w-[190px]`">
              <motion.span
                className="mb-3 block h-2 w-36 origin-left rounded-full bg-brand"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              />
              <p className="font-medium leading-snug">{aboutYears.label}</p>
            </div>
          </div>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-accent px-7 py-3 font-semibold text-accent transition duration-300 hover:bg-accent hover:text-white"
          >
            Know more About us
            <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-black/15"
            style={{ aspectRatio: "16 / 11" }}
          >
            <Image
              src={`${IMG}/about-image.webp`}
              alt="Sumit DevTech team in Jaipur"
              fill
              sizes="(min-width:1024px) 620px, 90vw"
              className="object-cover transition duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 `bg-gradient-to-t` from-dark/50 via-transparent to-dark/10" />
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold backdrop-blur">
              <span className="text-accent">●</span> Google Partner
            </span>
            <span className="absolute bottom-4 right-4 animate-float rounded-2xl bg-white px-4 py-2.5 text-sm font-bold shadow-xl">
              <span className="text-accent">★</span> 2024 Excellence Award
            </span>
          </div>
        </Reveal>
      </div>

      {/* stat cards */}
      <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:gap-5 lg:grid-cols-4">
        {aboutStats.map((s, i) => {
          const Icon = s.icon;
          const orange = i % 2 === 0;
          return (
            <Reveal key={s.label} delay={i * 0.1} className="h-full">
              <div
                className={cn(
                  "group relative h-full overflow-hidden rounded-3xl p-5 text-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl md:p-8 bg-dark hover:shadow-black/30 "
                )}
              >
                <span className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full `border-[18px] border-white/10" />
                <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-[150%]" />
                <Icon
                  strokeWidth={1.5}
                  className={cn(
                    "relative mb-5 h-9 w-9 transition duration-300 group-hover:-translate-y-1 group-hover:-rotate-6 md:mb-7 md:h-12 md:w-12",
                    orange ? "text-white" : "text-accent"
                  )}
                />
                <b className="relative block font-heading text-3xl font-extrabold md:text-5xl">
                  <CountUp to={s.value} suffix={s.suffix} />
                </b>
                <p className="relative mt-1 text-xs text-white/80 md:text-base">{s.label}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}