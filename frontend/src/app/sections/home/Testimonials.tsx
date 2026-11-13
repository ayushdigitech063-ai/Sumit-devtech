"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import Button from "../../ui/Button";
import { testimonials as defaultTestimonials, reviewSummary } from "@/data/testimonial";
import { fetchTestimonials } from "@/lib/testimonials-api";

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
  const [items, setItems] = useState<any[]>(defaultTestimonials);

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
            avatarBg: t.avatarBg || "bg-orange-500",
            avatarUrl: t.avatarUrl,
          }));
          setItems(mapped);
        }
      } catch (err) {
        console.error("Failed to load live testimonials:", err);
      }
    }
    loadLiveTestimonials();
  }, []);

  return (
    <Section className="bg-light relative overflow-hidden py-20 sm:py-24">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <Reveal>
        <SectionHeading
          center
          label="Client Stories"
          title={
            <>
              What Our Clients <span className="text-orange-500">Say About Us</span>
            </>
          }
          text="Verified feedback from founders, surgeons, and enterprises who trust us with their digital growth."
        />
      </Reveal>

      {/* Continuous Right-to-Left Marquee Carousel - Centered with Side Margin */}
      <div className="relative mt-10 mx-auto w-full max-w-[1160px] overflow-hidden px-2 rounded-3xl [mask-image:linear-gradient(90deg,transparent,black_5%,black_95%,transparent)]">
        <div className="group flex w-max animate-marquee gap-6 py-4 hover:[animation-play-state:paused]">
          {/* First Set */}
          {items.map((t) => (
            <div
              key={`row1-${t.id}`}
              className="w-[300px] sm:w-[350px] md:w-[360px] shrink-0 rounded-2xl border border-line bg-card p-6 md:p-7 flex flex-col justify-between hover:border-orange-500/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Stars rating={t.rating} />
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200/60">
                    {t.projectType}
                  </span>
                </div>
                <blockquote className="text-muted text-sm md:text-base leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-line">
                {t.avatarUrl ? (
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-line shrink-0"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-full ${
                      t.avatarBg ?? "bg-orange-500"
                    } text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-md`}
                  >
                    {t.initials}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-heading font-bold text-dark text-sm md:text-base truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted truncate">
                    {t.role ? `${t.role}, ` : ""}
                    <span className="font-medium text-dark/80">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Second Set for Infinite Loop */}
          {items.map((t) => (
            <div
              key={`row2-${t.id}`}
              className="w-[300px] sm:w-[350px] md:w-[360px] shrink-0 rounded-2xl border border-line bg-card p-6 md:p-7 flex flex-col justify-between hover:border-orange-500/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Stars rating={t.rating} />
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200/60">
                    {t.projectType}
                  </span>
                </div>
                <blockquote className="text-muted text-sm md:text-base leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-line">
                {t.avatarUrl ? (
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-line shrink-0"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-full ${
                      t.avatarBg ?? "bg-orange-500"
                    } text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-md`}
                  >
                    {t.initials}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-heading font-bold text-dark text-sm md:text-base truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted truncate">
                    {t.role ? `${t.role}, ` : ""}
                    <span className="font-medium text-dark/80">{t.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Metric Banner */}
      <div className="mt-14 mx-auto max-w-4xl rounded-2xl border border-line bg-card/60 backdrop-blur p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-heading text-3xl md:text-4xl font-extrabold text-orange-500">
              {reviewSummary.rating}★
            </div>
            <div className="text-xs md:text-sm text-muted mt-1">
              Average Rating
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl md:text-4xl font-extrabold text-dark">
              {reviewSummary.totalReviews}
            </div>
            <div className="text-xs md:text-sm text-muted mt-1">
              Google Reviews
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl md:text-4xl font-extrabold text-dark">
              {reviewSummary.recommendationRate}
            </div>
            <div className="text-xs md:text-sm text-muted mt-1">
              Recommendation Rate
            </div>
          </div>
          <div>
            <div className="font-heading text-3xl md:text-4xl font-extrabold text-orange-500">
              {reviewSummary.projectsDelivered}
            </div>
            <div className="text-xs md:text-sm text-muted mt-1">
              Projects Delivered
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-line text-center">
          <Link
            href={reviewSummary.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-orange-600 hover:text-orange-700 transition hover:underline"
          >
            <span>Read all reviews on Google Business Profile</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button href="/testimonial" variant="outline">
          View All Client Stories
        </Button>
      </div>
    </Section>
  );
}
