"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ExternalLink, MessageSquarePlus } from "lucide-react";
import Container from "@/app/ui/Container";
import { fetchTestimonials, type TestimonialItem } from "@/lib/testimonials-api";

export const TESTIMONIAL_CATEGORIES = [
  "All Stories",
  "Web Development",
  "E-Commerce",
  "Medical & Healthcare",
  "Corporate & Industrial",
  "Booking & Logistics",
] as const;

const DEFAULT_ITEMS: any[] = [
  {
    id: "test-1",
    initials: "VJ",
    name: "Dr. Vilaksh Jain",
    role: "Founder & Lead Dermatologist",
    company: "Derma Pro Center",
    projectType: "Medical & Healthcare",
    rating: 5,
    featured: true,
    avatarBg: "bg-emerald-600",
    text: "Sumit DevTech built our entire clinic appointment booking portal and patient management flow. Patient walk-ins and direct website bookings grew by 240% within the first 60 days.",
  },
  {
    id: "test-2",
    initials: "VS",
    name: "Vikram Singhania",
    role: "Managing Director",
    company: "Bsix Engineering Works",
    projectType: "Corporate & Industrial",
    rating: 5,
    featured: true,
    avatarBg: "bg-blue-600",
    text: "From technical machinery specifications to complex export quotation forms, their team understood our B2B industrial requirements instantly. Outstanding speed and communication.",
  },
  {
    id: "test-3",
    initials: "AM",
    name: "Aakash Mehta",
    role: "Co-Founder",
    company: "Goddess Craft Global",
    projectType: "E-Commerce",
    rating: 5,
    featured: true,
    avatarBg: "bg-purple-600",
    text: "Our Shopify and custom Next.js eCommerce store needed international payment gateways, currency conversion, and automated courier tracking. Sumit DevTech delivered ahead of schedule.",
  },
];

export default function TestimonialGrid() {
  const [items, setItems] = useState<any[]>(DEFAULT_ITEMS);
  const [activeCategory, setActiveCategory] = useState<string>("All Stories");

  useEffect(() => {
    fetchTestimonials().then((data) => {
      if (data && data.length > 0) {
        setItems(
          data.map((t) => ({
            id: t._id || t.id,
            name: t.name,
            initials: t.name
              ? t.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()
              : "SD",
            role: t.role,
            company: t.company,
            projectType: t.projectType || "Web Development",
            rating: t.rating || 5,
            text: t.text,
            featured: t.featured,
            avatarBg: t.avatarBg || "bg-orange-600",
          }))
        );
      }
    });
  }, []);

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === "All Stories") return items;
    return items.filter((t) => t.projectType === activeCategory);
  }, [activeCategory, items]);

  return (
    <section className="relative bg-light py-16 md:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1140px]">
          {/* Category Filter Tabs */}
          <div className="mb-12 flex flex-wrap items-center justify-center gap-2">
            {TESTIMONIAL_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-dark text-white shadow-md shadow-black/10 scale-105"
                      : "bg-white border border-line text-muted hover:text-dark hover:border-dark/30"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Testimonial Cards Masonry / Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr">
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((t, idx) => (
                <motion.div
                  key={t.id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between rounded-3xl border border-line bg-white p-7 shadow-xs hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < (t.rating || 5) ? "fill-amber-500 text-amber-500" : "text-slate-300"}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {t.projectType}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-700 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-full ${t.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-xs`}>
                      {t.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{t.name}</h3>
                      <p className="text-xs text-slate-500 font-normal">{t.role ? `${t.role}, ` : ""}{t.company}</p>
                    </div>
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
