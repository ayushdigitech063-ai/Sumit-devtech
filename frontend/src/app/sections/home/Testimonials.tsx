"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import Button from "../../ui/Button";
import { testimonials as defaultTestimonials, reviewSummary } from "@/data/testimonial";
import { fetchTestimonials, type TestimonialItem } from "@/lib/testimonials-api";

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-1 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-current" : "text-line"}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<any[]>(defaultTestimonials);

  useEffect(() => {
    async function loadLiveTestimonials() {
      try {
        const live = await fetchTestimonials();
        if (live && live.length > 0) {
          const mapped = live.map((t) => ({
            id: t._id || t.id,
            name: t.name,
            initials: t.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
            role: t.role,
            company: t.company,
            projectType: t.projectType,
            rating: t.rating || 5,
            text: t.text,
            featured: t.featured,
            avatarBg: t.avatarBg || "bg-accent",
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

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let animationFrameId: number;
    let isPaused = false;

    const onMouseEnter = () => {
      isPaused = true;
    };
    const onMouseLeave = () => {
      isPaused = false;
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    const scrollStep = () => {
      if (!isPaused && container) {
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth - 1
        ) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <Section className="bg-light relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <Reveal>
        <SectionHeading
          center
          label="Client Stories"
          title="Real businesses. Measurable results."
          text="Verified feedback from founders, surgeons, and enterprises who trust us with their digital growth."
        />
      </Reveal>

      {/* Testimonials Carousel */}
      <div
        ref={ref}
        tabIndex={0}
        aria-label="Client testimonials carousel"
        className="flex gap-6 overflow-x-auto no-scrollbar py-6 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-accent/40 rounded-2xl"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className="w-[340px] md:w-[420px] shrink-0 rounded-2xl border border-line bg-card p-6 md:p-8 flex flex-col justify-between hover:border-accent/50 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Stars rating={t.rating} />
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/10 text-accent">
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
                    t.avatarBg ?? "bg-accent"
                  } text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-md`}
                >
                  {t.initials}
                </div>
              )}
              <div>
                <p className="font-heading font-bold text-dark text-sm md:text-base">
                  {t.name}
                </p>
                <p className="text-xs text-muted">
                  {t.role ? `${t.role}, ` : ""}
                  <span className="font-medium text-dark/80">{t.company}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust metric banner */}
      <div className="mt-12 mx-auto max-w-4xl rounded-2xl border border-line bg-card/60 backdrop-blur p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-heading text-3xl md:text-4xl font-extrabold text-accent">
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
            <div className="font-heading text-3xl md:text-4xl font-extrabold text-accent">
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
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-accent hover:underline"
          >
            <span>Read all reviews on Google Business Profile</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Button href="/testimonial" variant="outline">
          View All Client Stories
        </Button>
      </div>
    </Section>
  );
}
