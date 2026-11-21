"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { 
  ArrowRight,
  ShoppingCart,
  Plane,
  HeartPulse,
  Dumbbell,
  Film,
  GraduationCap,
  Utensils,
  Landmark,
  BookOpen,
  Building2,
  type LucideIcon,
} from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import { cn } from "@/lib/utils";
import { fetchCommonIndustries, type IndustryItem } from "@/lib/common-api";

const ICON_MAP: Record<string, LucideIcon> = {
  ShoppingCart,
  Plane,
  HeartPulse,
  Dumbbell,
  Film,
  GraduationCap,
  Utensils,
  Landmark,
  BookOpen,
  Building2,
};

const STATIC_FALLBACK_INDUSTRIES = [
  { name: "Ecommerce", iconName: "ShoppingCart", image: "https://sumitdevtech.com/assets/images/Ecommerce.webp", text: "We build high-performing eCommerce websites that drive sales and enhance customer experience. From Shopify and WooCommerce to fully customized online stores, we focus on secure payments, mobile optimization, speed, and conversion-focused design to maximize revenue." },
  { name: "Travel", iconName: "Plane", text: "Booking-ready travel and tourism websites that showcase destinations, packages and enquiries in a way that turns visitors into travelers." },
  { name: "Healthcare", iconName: "HeartPulse", text: "Trustworthy, clear and easy-to-contact websites for clinics, doctors and hospitals, with appointment-friendly design." },
  { name: "Fitness", iconName: "Dumbbell", text: "Energetic websites for gyms, studios and trainers, with class schedules, memberships and easy sign-ups." },
  { name: "Entertainment", iconName: "Film", text: "Engaging, media-rich websites and platforms built to hold attention and grow your audience." },
  { name: "Education", iconName: "GraduationCap", text: "Institute websites, course platforms and learning portals that make admissions and learning simple." },
  { name: "Restaurant", iconName: "Utensils", text: "Appetizing websites with menus, online ordering and reservations that bring more people through the door." },
  { name: "Finance", iconName: "Landmark", text: "Secure, credible and compliant-minded websites for financial services, advisors and fintech products." },
  { name: "Blogging", iconName: "BookOpen", text: "Fast, SEO-friendly blogs with clean reading layouts and easy publishing tools." },
];

const tints = [
  "bg-[color-mix(in_srgb,var(--color-accent)_16%,white)]",
  "bg-[color-mix(in_srgb,var(--color-accent-2)_24%,white)]",
  "bg-light",
  "bg-[color-mix(in_srgb,var(--color-accent-2)_12%,white)]",
];

export default function Industries() {
  const [list, setList] = useState<IndustryItem[]>(STATIC_FALLBACK_INDUSTRIES);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    fetchCommonIndustries().then((data) => {
      if (data && data.length > 0) {
        setList(data);
      }
    });
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) return;
    let ticking = false;

    const update = () => {
      const cards = cardRefs.current;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!card) return;
        if (!next) {
          card.style.transform = "";
          card.style.filter = "";
          return;
        }
        const top = parseFloat(getComputedStyle(card).top) || 0;
        const p = Math.min(1, Math.max(0, 1 - (next.getBoundingClientRect().top - top) / card.offsetHeight));
        card.style.transform = `scale(${1 - p * 0.05})`;
        card.style.filter = `brightness(${1 - p * 0.06})`;
      });
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion, list]);

  return (
    <Section id="industries">
      <SectionHeading
        center
        label="Industries"
        title={<>Industries We <span className="text-brand">Serve</span></>}
        text="From healthcare and education to retail and finance, we build digital solutions tailored to the needs of every sector."
      />

      <div className="relative mx-auto max-w-4xl space-y-6 pb-12">
        {list.map((ind, i) => {
          const Icon = ICON_MAP[ind.iconName] || Building2;
          return (
            <div
              key={ind.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{ top: `${96 + i * 20}px` }}
              className={cn(
                "sticky rounded-3xl border border-line p-8 shadow-sm transition-transform duration-150 will-change-transform md:p-10",
                tints[i % tints.length]
              )}
            >
              <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <div className="mb-4 inline-flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-2xs">
                      <Icon className="text-accent" size={24} />
                    </span>
                    <h3 className="text-2xl font-bold text-dark">{ind.name}</h3>
                  </div>
                  <p className="max-w-xl text-base leading-relaxed text-muted">
                    {ind.text}
                  </p>
                  <Link
                    href="/contact-us"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
                  >
                    <span>Discuss Your {ind.name} Project</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>

                {ind.image ? (
                  <div className="relative mx-auto h-44 w-full max-w-xs overflow-hidden rounded-2xl md:h-48 md:w-64">
                    <Image
                      src={ind.image}
                      alt={ind.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
