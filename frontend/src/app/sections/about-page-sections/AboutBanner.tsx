"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Container from "@/app/ui/Container";

const stats = [
  { value: "500", suffix: "+", label: "GLOBAL CLIENTS" },
  { value: "12", suffix: "+", label: "YEARS OF EXCELLENCE" },
  { value: "98", suffix: "%", label: "CLIENT RETENTION" },
  { value: "3", suffix: "", label: "COUNTRIES" },
];

export default function AboutBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#10131e] via-[#141826] to-[#191e2f] text-white pt-36 pb-24 md:pt-40 md:pb-28 min-h-[75vh] flex items-center border-b border-white/10">
      {/* Background ambient lighting blooms matching Package Hero */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04] overflow-hidden z-0"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute right-0 -top-32 h-[520px] w-[520px] animate-blob rounded-full bg-accent/25 opacity-70 blur-[130px] overflow-hidden" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-[460px] w-[460px] animate-blob rounded-full bg-amber-400/20 opacity-60 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-blue-500/15 blur-[140px]" />

      <Container className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-[1000px] text-center flex flex-col items-center">
          {/* Label / Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md shadow-sm">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400" />
              <span>About Sumit DevTech</span>
            </span>
          </div>

          {/* Heading matching Package & Home Hero */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.12] text-white max-w-4xl">
            Your Trusted Partner in{" "}
            <span className="text-brand">Digital Innovation</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl font-normal leading-relaxed text-white/80">
            We drive business growth through innovative web architecture, smart strategies, and technology-driven solutions.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2.5 rounded-full bg-brand px-7 py-3.5 text-sm font-heading font-bold text-white shadow-xl shadow-accent/25 transition duration-300 hover:scale-105 hover:shadow-accent/40"
            >
              Get Free Consultation
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-12 grid w-full max-w-3xl grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1 text-center">
                <div className="font-heading text-3xl sm:text-4xl lg:text-4xl font-black tracking-tight text-white">
                  <span>{stat.value}</span>
                  <span className="text-accent">{stat.suffix}</span>
                </div>
                <div className="text-xs font-medium text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
