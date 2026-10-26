"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import Container from "@/app/ui/Container";
import Button from "@/app/ui/Button";
import { ProjectPageData, fallbackPhone } from "@/data/projects-data";

export interface BannerCtaSectionProps {
  data?: ProjectPageData["cta"];
}

export default function BannerCtaSection({ data }: BannerCtaSectionProps) {
  const badge = data?.badge ?? "Start Your Project";
  const title = data?.title ?? "Elevating Customer";
  const highlight = data?.highlight ?? "Experience.";
  const subtitle =
    data?.subtitle ??
    "Partner with our specialized design and development team to engineer an exceptional digital product that delivers measurable commercial results.";
  const buttonText = data?.buttonText ?? "Get In Touch";
  const buttonHref = data?.buttonHref ?? "/contact-us";
  const rawPhone = data?.phoneNumber ?? fallbackPhone;
  const cleanPhone = rawPhone.replace(/-/g, "").replace(/\s+/g, "");

  return (
    <section className="relative isolate overflow-hidden bg-dark text-white py-20 md:py-28 border-t border-white/5">
      {/* Background Gradient & Animated Glow Blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-dark via-dark-2 to-dark"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-blob -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-accent-2/15 blur-3xl animate-blob [animation-delay:4s] -z-10"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1100px] relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-8 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-2xl text-center">
          {/* Subtle Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(255,106,31,0.12),transparent_70%)]"
          />

          <div className="mx-auto max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-2 mb-6">
              <Sparkles size={14} className="text-accent" />
              <span>{badge}</span>
            </div>

            {/* H2 Title */}
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl leading-tight text-white mb-6">
              {title} <span className="text-brand">{highlight}</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base text-white/75 sm:text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href={buttonHref}
                variant="primary"
                className="w-full sm:w-auto gap-2.5 shadow-xl shadow-accent/25 px-8 py-4 text-base"
              >
                {buttonText}
                <ArrowRight size={17} />
              </Button>
              <Link
                href={`tel:${cleanPhone}`}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md transition duration-300 hover:border-white/40 hover:bg-white/20 hover:-translate-y-0.5"
              >
                <Phone size={16} className="text-accent-2" />
                Call {rawPhone}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
