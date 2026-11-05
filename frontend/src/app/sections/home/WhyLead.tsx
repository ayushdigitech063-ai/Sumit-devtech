"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import { 
  Award, 
  Wallet, 
  Layers, 
  Globe, 
  Headphones, 
  ShoppingCart, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { apiFetch, ApiError } from "@/lib/api";

const leadIcons = [Award, Wallet, Layers, Globe, Headphones, ShoppingCart];

const DEFAULT_CARDS = [
  {
    title: "10+ Years of Mastery",
    text: "A decade of engineering high-performance websites and digital products in Jaipur.",
    image: "/images/projects/case-thumb.png",
    details: [
      "Over 1,200 successful deliveries across various tech stacks.",
      "Dedicated in-house team of senior full-stack engineers.",
      "End-to-end SDLC agile methodology with weekly sprint reviews.",
      "Comprehensive quality control and post-launch maintenance.",
    ],
    tag: "Decade of Trust",
  },
  {
    title: "100% Fixed Pricing",
    text: "Strict zero hidden costs. What we quote in our proposal is exactly what you pay.",
    image: "/images/projects/case-thumb2.png",
    details: [
      "Transparent milestone-based payment schedules.",
      "Detailed scope-of-work documentation with zero surprises.",
      "No recurring licensing fee markups or arbitrary scope creeps.",
      "Guaranteed price lock commitment for the entire project.",
    ],
    tag: "Zero Hidden Costs",
  },
  {
    title: "Multi-Industry Domain",
    text: "Proven digital solutions across healthcare, retail, real estate, education, and SaaS.",
    image: "/images/projects/case-thumb3.png",
    details: [
      "Tailor-made features tailored to industry-specific funnels.",
      "Enterprise HIPAA/GDPR-compliant security standards.",
      "Seamless payment gateway, CRM, and ERP integrations.",
      "Custom analytics & conversion tracking pipelines.",
    ],
    tag: "Diverse Expertise",
  },
  {
    title: "Global Client Footprint",
    text: "Active clients across USA, UK, UAE & Saudi Arabia, plus trusted white-label overflow.",
    image: "/images/projects/case-thumb4.png",
    details: [
      "Time-zone aligned communication and dedicated project managers.",
      "International cross-currency Stripe & PayPal checkouts.",
      "Multi-lingual & multi-currency localization support.",
      "Proven track record with overseas startups and enterprises.",
    ],
    tag: "Worldwide Reach",
  },
  {
    title: "Zero Ghosting Guarantee",
    text: "Direct developer access and fast response times. We stay with you long after launch.",
    image: "/images/projects/case-thumb5.png",
    details: [
      "Dedicated Slack/WhatsApp channels with the core engineering team.",
      "Under 2-hour SLA response time during business hours.",
      "Free 30-day hypercare support included with every launch.",
      "Continuous server monitoring and uptime guarantee.",
    ],
    tag: "Always Available",
  },
  {
    title: "Full-Stack E-Commerce",
    text: "Revenue-focused online stores with custom payment gateways, CRM, and speed tuning.",
    image: "/images/projects/case-thumb6.png",
    details: [
      "Custom Shopify, WooCommerce, and headless Next.js Commerce builds.",
      "Instant 1-click checkout with Razorpay, Cashfree & UPI flows.",
      "High-speed architecture achieving 95+ Google PageSpeed score.",
      "Automated WhatsApp notification & order tracking funnels.",
    ],
    tag: "Revenue Engine",
  },
];

export default function WhyLead() {
  const [leadData, setLeadData] = useState<any>(null);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [drawerSide, setDrawerSide] = useState<"left" | "right">("right");
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function loadWhyLead() {
      try {
        const res = await apiFetch<any>("/home/why-lead");
        if (res && res.data) {
          setLeadData(res.data);
        }
      } catch (err) {
        if (err instanceof ApiError) {
          console.error(`API Error (${err.status}):`, err.message);
        } else {
          console.error("Failed to load why lead section:", err);
        }
      }
    }

    loadWhyLead();
  }, []);

  // Continuous auto-scrolling
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || isPaused || selectedCard) return;

    let animId: number;
    const speed = 1.0; // smooth px per frame

    const step = () => {
      if (slider) {
        slider.scrollLeft += speed;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animId);
  }, [isPaused, selectedCard]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleCardMouseEnter = (card: any, indexOnTrack: number, totalCards: number) => {
    setIsPaused(true);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    // Starting cards -> Drawer opens from LEFT
    // Last 2 cards -> Drawer opens from RIGHT
    const normalizedIdx = indexOnTrack % (totalCards / 2 || 6);
    // If it's one of the last 2 cards in the series (e.g., 4 or 5 out of 6), open from RIGHT; else from LEFT
    const side = normalizedIdx >= 4 ? "right" : "left";
    setDrawerSide(side);
    setSelectedCard(card);
  };

  const handleCardMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    // Card se mouse hat-te hi turant drawer band ho jaye
    setSelectedCard(null);
    setIsPaused(false);
  };

  const handleDrawerMouseEnter = () => {
    // If mouse is inside drawer, keep open
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleDrawerMouseLeave = () => {
    // When leaving drawer, close immediately
    setSelectedCard(null);
    setIsPaused(false);
  };

  const label = leadData?.label || leadData?.tagline || "WHY PARTNER WITH US";
  const title = leadData?.title || leadData?.heading || "Top-tier Web Agency in Rajasthan";
  
  const rawFeatures = leadData?.features || leadData?.items || leadData?.cards || leadData?.whyLead || [];
  const cardsList = rawFeatures.length > 0
    ? rawFeatures.map((f: any, i: number) => ({
        ...DEFAULT_CARDS[i % DEFAULT_CARDS.length],
        ...f,
      }))
    : DEFAULT_CARDS;

  // Duplicate cards for seamless infinite marquee loop
  const displayCards = [...cardsList, ...cardsList];

  return (
    <Section id="why-we-lead" className="relative overflow-hidden bg-white py-16 sm:py-20 font-sans">
      {/* Centered Heading */}
      <SectionHeading
        center
        label={label}
        title={
          <>
            {typeof title === "string" && title.includes("Rajasthan") ? (
              <>
                {title.replace("Rajasthan", "")}
                <span className="text-brand">Rajasthan</span>
              </>
            ) : (
              title
            )}
          </>
        }
        text="Hover or click any card to inspect full capabilities in real time."
      />

      {/* ========================================================
          3D PERSPECTIVE AUTO-SCROLLING CAROUSEL WITH IMAGES
         ======================================================== */}
      <div 
        className="relative mx-auto mt-10 w-full max-w-[1400px] px-4 overflow-hidden [perspective:1200px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Soft edge blur vignettes */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Scrollable Track with 3D tilt */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-hidden py-6 select-none scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayCards.map((card: any, idx: number) => {
            const Icon = leadIcons[idx % leadIcons.length];
            const cardTitle = card.title || "";
            const cardDescription = card.text || card.description || "";
            const cardTag = card.tag || "Feature";
            const cardImg = card.image || DEFAULT_CARDS[idx % DEFAULT_CARDS.length].image;

            return (
              <motion.div
                key={`${cardTitle}-${idx}`}
                whileHover={{
                  scale: 1.05,
                  rotateY: -4,
                  rotateX: 4,
                  z: 40,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                onMouseEnter={() => handleCardMouseEnter(card, idx, displayCards.length)}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => setSelectedCard(card)}
                className="group relative flex-shrink-0 w-[300px] sm:w-[350px] cursor-pointer rounded-2xl border border-slate-200/90 bg-[#fafbfc] overflow-hidden shadow-sm transition-all duration-300 hover:border-brand/50 hover:bg-white hover:shadow-2xl hover:shadow-orange-500/15 [transform-style:preserve-3d]"
              >
                {/* Visual Card Image Cover (Auto-displayed with subtle zoom on hover) */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={cardImg}
                    alt={cardTitle}
                    fill
                    sizes="(min-width:640px) 350px, 300px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                  {/* Top-Right Badge on Image */}
                  <span className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1 text-[10.5px] font-bold text-slate-800 shadow-md backdrop-blur-md">
                    {cardTag}
                  </span>

                  {/* Icon floating on image corner */}
                  <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/40">
                    <Icon size={19} strokeWidth={2.2} />
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand transition-colors line-clamp-1">
                    {cardTitle}
                  </h3>

                  {/* Description */}
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-500 font-normal line-clamp-2">
                    {cardDescription}
                  </p>

                  {/* Bottom View Details Link with Cursor Indicator */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-brand transition-colors">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Hover to View Details</span>
                    </span>
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (sliderRef.current) sliderRef.current.scrollLeft -= 330;
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:border-brand hover:text-brand shadow-xs transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs text-slate-400 font-medium">Auto-scrolling • Hover any card to open drawer</span>
          <button
            type="button"
            onClick={() => {
              if (sliderRef.current) sliderRef.current.scrollLeft += 330;
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:border-brand hover:text-brand shadow-xs transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ========================================================
          POP-OUT DRAWER / MODAL TRIGGERED ON HOVER & CLICK
         ======================================================== */}
      <AnimatePresence>
        {selectedCard && (
          <div className={`fixed inset-0 z-50 flex items-center ${drawerSide === "left" ? "justify-start" : "justify-end"} pointer-events-none p-0 sm:p-4`}>
            {/* Soft backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-2xs" 
            />

            {/* Slide-in Drawer from Left or Right based on card position */}
            <motion.div
              initial={{ x: drawerSide === "left" ? "-100%" : "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: drawerSide === "left" ? "-100%" : "100%", opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onMouseEnter={handleDrawerMouseEnter}
              onMouseLeave={handleDrawerMouseLeave}
              className="pointer-events-auto relative z-10 h-full sm:h-auto sm:max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-none sm:rounded-3xl border border-slate-200 bg-white shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Top Image Banner */}
              <div className="relative h-48 w-full bg-slate-900 shrink-0">
                <Image
                  src={selectedCard.image || DEFAULT_CARDS[0].image}
                  alt={selectedCard.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Close Button on image */}
                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-orange-500 transition-colors"
                >
                  <X size={16} />
                </button>

                {/* Pill Tag */}
                <div className="absolute bottom-3 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 text-white px-3 py-1 text-xs font-bold shadow-md">
                    <Sparkles size={12} />
                    <span>{selectedCard.tag || "Enterprise Standard"}</span>
                  </span>
                </div>
              </div>

              {/* Drawer Body Content */}
              <div className="p-6 sm:p-7 flex-1">
                {/* Title & Description */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {selectedCard.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {selectedCard.text || selectedCard.description}
                  </p>
                </div>

                {/* Detailed Deliverables List */}
                <div className="mt-6 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Key Deliverables & Guarantees
                  </h4>
                  {(selectedCard.details || DEFAULT_CARDS[0].details).map((item: string, i: number) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                    >
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drawer Footer CTA */}
              <div className="p-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-white transition-colors"
                >
                  Close Drawer
                </button>
                <a
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-500 shadow-md transition-all duration-300"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
}
