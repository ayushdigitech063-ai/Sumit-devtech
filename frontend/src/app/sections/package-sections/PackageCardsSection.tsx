  "use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Clock, Users, Sparkles, HelpCircle } from "lucide-react";
import Container from "@/app/ui/Container";
import { packageCategories, packageFaqs } from "@/data/packages-data";

export default function PackageCardsSection() {
  const [activeTab, setActiveTab] = useState<string>("web-dev");

  const currentCategory =
    packageCategories.find((cat) => cat.id === activeTab) || packageCategories[0];

  return (
    <section className="relative bg-light py-16 md:py-24">
      {/* Background radial dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1140px]">
          {/* Category Switcher Tabs */}
          <div className="mb-14 flex flex-col items-center">
            <div className="inline-flex">
              {packageCategories.map((cat) => {
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`rounded-full px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-dark text-white shadow-md shadow-black/10 scale-102"
                        : "text-muted hover:text-dark hover:bg-light/60"
                    }`}
                  >
                    {cat.title.split(" ")[0]} Packages
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-xs sm:text-sm text-muted text-center max-w-lg">
              {currentCategory.description}
            </p>
          </div>

          {/* Pricing Grid */}
          <motion.div
            layout
            className={`grid gap-8 auto-rows-fr ${
              currentCategory.plans.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {currentCategory.plans.map((plan, idx) => (
                <motion.div
                  key={plan.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className={`group relative flex flex-col justify-between rounded-3xl p-7 sm:p-9 transition-all duration-300 ${
                    plan.popular
                      ? "bg-dark text-white shadow-2xl ring-2 ring-accent hover:-translate-y-2"
                      : "bg-white text-ink border border-line shadow-sm hover:shadow-xl hover:border-accent/40 hover:-translate-y-1.5"
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3.5 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-accent/30">
                        <Sparkles size={11} /> {plan.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    {/* Plan Title & Tagline */}
                    <div className="mb-6">
                      <h3
                        className={`font-heading text-xl sm:text-2xl font-extrabold ${
                          plan.popular ? "text-white" : "text-ink"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                          plan.popular ? "text-white/70" : "text-muted"
                        }`}
                      >
                        {plan.tagline}
                      </p>
                    </div>

                    {/* Price Block */}
                    <div className="mb-6 border-b pb-6 border-line/60">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`font-heading text-3xl sm:text-4xl font-black tracking-tight ${
                            plan.popular ? "text-white" : "text-ink"
                          }`}
                        >
                          {plan.price}
                        </span>
                        <span
                          className={`text-xs font-semibold ${
                            plan.popular ? "text-white/60" : "text-muted"
                          }`}
                        >
                          / {plan.period}
                        </span>
                      </div>

                      {/* Delivery & Ideal For pills */}
                      <div className="mt-4 flex flex-col gap-2">
                        <div
                          className={`flex items-center gap-2 text-xs font-semibold ${
                            plan.popular ? "text-white/80" : "text-ink/80"
                          }`}
                        >
                          <Clock size={13} className="text-accent" />
                          <span>Delivery: {plan.deliveryTime}</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 text-xs font-medium ${
                            plan.popular ? "text-white/60" : "text-muted"
                          }`}
                        >
                          <Users size={13} className="text-accent-2" />
                          <span className="truncate">{plan.idealFor}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      <div
                        className={`text-xs font-bold uppercase tracking-wider ${
                          plan.popular ? "text-accent" : "text-accent"
                        }`}
                      >
                        What&apos;s Included:
                      </div>
                      <ul className="space-y-2.5">
                        {plan.features.map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            className={`flex items-start gap-2.5 text-xs sm:text-sm leading-snug ${
                              plan.popular ? "text-white/85" : "text-ink/85"
                            }`}
                          >
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                              <Check size={11} strokeWidth={3} />
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Plan CTA */}
                  <div className="pt-4">
                    <Link
                      href={plan.ctaHref}
                      className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-all duration-300 ${
                        plan.popular
                          ? "bg-brand text-white shadow-lg shadow-accent/30 hover:scale-102 hover:shadow-accent/50"
                          : "border border-dark/15 bg-light text-dark hover:bg-dark hover:text-white"
                      }`}
                    >
                      {plan.ctaText}
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

