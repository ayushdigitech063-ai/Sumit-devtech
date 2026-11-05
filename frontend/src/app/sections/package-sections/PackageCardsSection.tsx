"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  Clock,
  Users,
  Sparkles,
  Lock,
  ChevronRight,
  X,
  Phone,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Container from "@/app/ui/Container";
import { packageCategories } from "@/data/packages-data";

export default function PackageCardsSection() {
  const [activeTab, setActiveTab] = useState<string>("web-dev");
  const [unlockedPlans, setUnlockedPlans] = useState<Record<string, boolean>>({});

  // Lead modal state
  const [selectedPlanForUnlock, setSelectedPlanForUnlock] = useState<{
    id: string;
    name: string;
    price: string;
  } | null>(null);

  // Form submission state
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "" });
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentCategory =
    packageCategories.find((cat) => cat.id === activeTab) || packageCategories[0];

  const handleOpenUnlockModal = (plan: { id: string; name: string; price: string }) => {
    setSelectedPlanForUnlock(plan);
    setFormSent(false);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSent(true);

      // Unlock the plan!
      if (selectedPlanForUnlock) {
        setUnlockedPlans((prev) => ({
          ...prev,
          [selectedPlanForUnlock.id]: true,
        }));
      }

      // Automatically close modal after brief confirmation
      setTimeout(() => {
        setSelectedPlanForUnlock(null);
        setFormSent(false);
        setLeadForm({ name: "", email: "", phone: "" });
      }, 1400);
    }, 800);
  };

  return (
    <section className="relative bg-light py-16 md:py-20">
      {/* Background radial dot grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1050px]">
          {/* Main Section Header with Bouncing Heading */}
          <div className="mb-10 flex flex-col items-center text-center">
            {/* 1-Line Section Heading with continuous smooth bounce animation */}
            <motion.h2
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink leading-tight mb-3"
            >
              Choose the Perfect <span className="text-brand">Package for Your Business</span>
            </motion.h2>

            {/* Short Description */}
            <p className="max-w-2xl text-xs sm:text-sm md:text-base text-muted font-normal leading-relaxed">
              {currentCategory.description}
            </p>
          </div>

          {/* Pricing Grid with compact cards */}
          <motion.div
            layout
            className={`grid gap-6 auto-rows-fr ${
              currentCategory.plans.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {currentCategory.plans.map((plan, idx) => {
                const isUnlocked = unlockedPlans[plan.id];

                return (
                  <motion.div
                    key={plan.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                    className={`group relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-300 ${
                      plan.popular
                        ? "bg-dark text-white shadow-xl ring-2 ring-accent hover:-translate-y-1.5"
                        : "bg-white text-ink border border-line shadow-sm hover:shadow-lg hover:border-accent/40 hover:-translate-y-1"
                    }`}
                  >
                    {/* Popular Badge */}
                    {plan.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md shadow-accent/30">
                          <Sparkles size={10} /> {plan.badge}
                        </span>
                      </div>
                    )}

                    <div>
                      {/* Plan Title & Tagline */}
                      <div className="mb-4">
                        <h3
                          className={`font-heading text-xl sm:text-2xl font-extrabold ${
                            plan.popular ? "text-white" : "text-ink"
                          }`}
                        >
                          {plan.name}
                        </h3>
                        <p
                          className={`text-xs mt-1 leading-relaxed ${
                            plan.popular ? "text-white/70" : "text-muted"
                          }`}
                        >
                          {plan.tagline}
                        </p>
                      </div>

                      {/* Price Block: Blurred by default + Swipe to Unlock */}
                      <div className="mb-5 border-b pb-4 border-line/60 relative">
                        <div className="relative">
                          {/* Price Display */}
                          <div
                            className={`flex items-baseline gap-2 transition-all duration-500 ${
                              isUnlocked ? "filter-none select-auto" : "blur-md select-none opacity-40 pointer-events-none"
                            }`}
                          >
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

                          {/* Swipe / Click to Unlock Overlay */}
                          {!isUnlocked && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenUnlockModal({
                                    id: plan.id,
                                    name: plan.name,
                                    price: plan.price,
                                  })
                                }
                                className="group/swipe relative flex items-center gap-2 overflow-hidden rounded-full bg-accent/95 hover:bg-accent px-4 py-2 text-xs font-bold text-white shadow-md shadow-accent/30 transition-all duration-300 hover:scale-105 active:scale-95"
                              >
                                <Lock size={12} className="text-white/90" />
                                <span>Swipe to Unlock Price</span>
                                <motion.span
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                  className="inline-flex"
                                >
                                  <ChevronRight size={14} />
                                </motion.span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Delivery & Ideal For pills (Compact) */}
                        <div className="mt-4 flex flex-col gap-1.5 text-xs">
                          <div
                            className={`flex items-center gap-2 font-semibold ${
                              plan.popular ? "text-white/80" : "text-ink/80"
                            }`}
                          >
                            <Clock size={12} className="text-accent" />
                            <span>Delivery: {plan.deliveryTime}</span>
                          </div>
                          <div
                            className={`flex items-center gap-2 font-medium ${
                              plan.popular ? "text-white/60" : "text-muted"
                            }`}
                          >
                            <Users size={12} className="text-accent-2" />
                            <span className="truncate">{plan.idealFor}</span>
                          </div>
                        </div>
                      </div>

                      {/* Features List (Compact Spacing) */}
                      <div className="space-y-2 mb-6">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-accent">
                          What&apos;s Included:
                        </div>
                        <ul className="space-y-2">
                          {plan.features.map((feat, fIdx) => (
                            <li
                              key={fIdx}
                              className={`flex items-start gap-2 text-xs leading-snug ${
                                plan.popular ? "text-white/85" : "text-ink/85"
                              }`}
                            >
                              <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                                <Check size={10} strokeWidth={3} />
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Plan CTA Button (only shown once unlocked) */}
                    {isUnlocked && (
                      <div className="pt-2">
                        <Link
                          href={plan.ctaHref}
                          className={`flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs sm:text-sm font-heading font-bold transition-all duration-300 ${
                            plan.popular
                              ? "bg-brand text-white shadow-md shadow-accent/30 hover:scale-102 hover:shadow-accent/50"
                              : "border border-dark/15 bg-light text-dark hover:bg-dark hover:text-white"
                          }`}
                        >
                          {plan.ctaText}
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>

      {/* LEAD CAPTURE POPUP MODAL */}
      <AnimatePresence>
        {selectedPlanForUnlock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-3xl bg-white p-7 text-ink shadow-2xl border border-line"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPlanForUnlock(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-muted hover:text-ink hover:bg-black/5 transition-colors"
              >
                <X size={18} />
              </button>

              {!formSent ? (
                <>
                  <div className="text-center mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3.5 py-1 text-xs font-bold text-accent mb-2">
                      <ShieldCheck size={14} />
                      Instant Pricing Unlock
                    </span>
                    <h3 className="font-heading text-2xl font-bold text-ink">
                      Unlock {selectedPlanForUnlock.name} Pricing
                    </h3>
                    <p className="text-xs text-muted mt-1 max-w-xs mx-auto">
                      Enter your contact details to instantly reveal the pricing and get a personalized project quotation.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-ink/80 mb-1">Full Name *</label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                          type="text"
                          required
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full rounded-xl border border-line bg-light py-2.5 pl-10 pr-4 text-xs text-ink outline-none transition focus:border-accent focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink/80 mb-1">Phone / WhatsApp Number *</label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                          type="tel"
                          required
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-line bg-light py-2.5 pl-10 pr-4 text-xs text-ink outline-none transition focus:border-accent focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-ink/80 mb-1">Email Address (Optional)</label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                          type="email"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          placeholder="rahul@company.com"
                          className="w-full rounded-xl border border-line bg-light py-2.5 pl-10 pr-4 text-xs text-ink outline-none transition focus:border-accent focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-brand py-3 text-xs sm:text-sm font-heading font-bold text-white shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                      >
                        {loading ? "Unlocking Price..." : "Reveal Pricing & Get Quote →"}
                      </button>
                    </div>

                    <p className="text-[10px] text-center text-muted/70 pt-1">
                      🔒 100% Privacy. Zero Spam. No credit card required.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-6">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-ink">Pricing Unlocked!</h4>
                  <p className="text-xs text-muted mt-1">
                    Revealing {selectedPlanForUnlock.name} package pricing on your screen now...
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
