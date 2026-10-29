"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "500", suffix: "+", label: "GLOBAL CLIENTS" },
  { value: "12", suffix: "+", label: "YEARS OF EXCELLENCE" },
  { value: "98", suffix: "%", label: "CLIENT RETENTION" },
  { value: "3", suffix: "", label: "COUNTRIES" },
];

export default function AboutBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-dark text-white pt-28 pb-20 md:pt-15 md:pb-18 border-b border-white/10">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/aboutPage/banner.jfif')",
        }}
      />

      {/* Dark image overlays */}
      <div className="absolute inset-0 -z-20 bg-[#071426]/75" />
    
      {/* Banner content */}
      <div className="mx-auto w-full max-w-[1100px] px-6">
        <div className="max-w-3xl">
          {/* Label / Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md shadow-sm">
              <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-emerald-400" />
              <span>About Sumit DevTech</span>
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-bold tracking-tight sm:text-3xl md:text-3xl lg:text-5xl leading-[1.08] text-white">
            Your Trusted Partner in{" "}
            <span className="text-brand">Digital Innovation</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg sm:leading-relaxed">
            We drive business growth through innovative web architecture, smart strategies, and technology-driven solutions.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2.5 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-accent/25 transition duration-300 hover:-translate-y-1"
            >
              Get Free Consultation
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-12 grid max-w-2xl grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="font-heading text-3xl lg:text-4xl font-black tracking-tight text-white">
                  <span>{stat.value}</span>
                  <span className="text-accent">{stat.suffix}</span>
                </div>
                <div className="text-xs font-medium text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}