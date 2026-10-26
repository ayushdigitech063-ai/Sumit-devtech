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
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#091426] text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/aboutPage/banner.jfif')",
        }}
      />

      {/* Dark image overlays */}
      <div className="absolute inset-0 -z-20 bg-[#071426]/70" />
      <div className="absolute inset-0 -z-10 `bg-gradient-to-r` from-[#071426]/95 via-[#071426]/80 to-[#071426]/35" />
      <div className="absolute inset-0 -z-10 `bg-gradient-to-t` from-[#071426] via-transparent to-[#071426]/20" />

      {/* Banner content */}
      <div className="mx-auto flex min-h-[680px] max-w-[1280px] items-center px-5 pb-16 pt-28 sm:px-8 lg:min-h-[760px] lg:px-12 lg:pb-20">
        <div className="w-full `max-w-[1150px]`">
          {/* Label */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#ffa20b]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#ffad19] sm:text-xs">
              About Sumit DevTech
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px] ml-9">
            Your Trusted Partner
            <br />
            in{" "}
            <span className="relative inline-block text-[#ffa20b]">
              Digital Innovation
              <span className="absolute -bottom-2 left-0 h-[3px] w-full bg-linear-to-r from-[#ffa20b] to-transparent" />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-[540px] text-sm leading-7 text-slate-300 sm:text-base sm:leading-8 ml-9">
            We help businesses embrace the future with cutting-edge AI
            solutions, innovative strategies, and technology-driven
            transformation that unlocks measurable growth and lasting
            competitive advantage.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 ml-9">
            <Link
              href="/"
              className="group inline-flex min-h-11 items-center gap-2 rounded-md bg-brand from-[#ff9f0a] to-[#ffb20b] px-5 py-3 text-xs font-bold text-[#101827] transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/20 sm:text-sm"
            >
              Get Free Consultation
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-10 grid max-w-[850px] grid-cols-2 gap-x-5 gap-y-6 border-y border-white/15 py-6 sm:mt-12 sm:grid-cols-4 sm:gap-8 sm:py-7 ml-9">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  {stat.value}
                  <span className="text-[#ffa20b]">{stat.suffix}</span>
                </p>

                <p className="mt-2 text-[9px] font-semibold tracking-[0.13em] text-slate-400 sm:text-[10px] sm:tracking-[0.16em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}