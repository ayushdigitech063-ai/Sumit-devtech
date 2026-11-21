"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import Button from "../../ui/Button";
import { fetchTestimonials } from "@/lib/testimonials-api";

const DEFAULT_TESTIMONIALS = [
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
    projectType: "E-Commerce & Retail",
    rating: 5,
    featured: true,
    avatarBg: "bg-purple-600",
    text: "Our Shopify and custom Next.js eCommerce store needed international payment gateways, currency conversion, and automated courier tracking. Sumit DevTech delivered ahead of schedule.",
  },
];

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-amber-500 text-amber-500" : "text-slate-300"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [items, setItems] = useState<any[]>(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    async function loadLiveTestimonials() {
      try {
        const live = await fetchTestimonials();
        if (live && live.length > 0) {
          const mapped = live.map((t) => ({
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
            projectType: t.projectType || "Client Story",
            rating: t.rating || 5,
            text: t.text,
            featured: t.featured,
            avatarBg: t.avatarBg || "bg-orange-600",
          }));
          setItems(mapped);
        }
      } catch (err) {
        console.warn("Using default testimonials", err);
      }
    }

    loadLiveTestimonials();
  }, []);

  return (
    <Section id="testimonials" className="bg-[#fcfbf9]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
              Verified Client Stories
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-2 font-heading tracking-tight">
              What Founders Say About <span className="text-brand">Sumit DevTech</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl">
              Real results, genuine feedback, and long-term partnerships built with businesses across India and globally.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/testimonial"
              className="inline-flex items-center gap-2 rounded-xl bg-dark px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-black transition"
            >
              <span>View All 120+ Reviews</span>
              <ExternalLink size={15} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {items.slice(0, 3).map((t, idx) => (
            <Reveal key={t.id || idx}>
              <div className="h-full flex flex-col justify-between rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-xs hover:shadow-md transition duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Stars rating={t.rating} />
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
