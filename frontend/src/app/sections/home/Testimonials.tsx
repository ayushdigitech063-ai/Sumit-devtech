"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import Button from "../../ui/Button";
import { testimonials, reviewSummary } from "@/data/testimonial";

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
    <Section id="testimonials" className="bg-[#f7f6f3] border-t border-line/60">
      <div className="mx-auto w-full max-w-[1100px] px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            center
            label="Testimonials"
            title={
              <>
                What Our Clients <span className="text-brand">Say About Us</span>
              </>
            }
            text="We work hard to deliver exceptional ROI and scalable growth. Read why our clients recommend us for performance marketing and SEO."
          />
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[240px_1fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-3xl bg-brand p-5 text-white sm:flex-row sm:items-center md:p-6 lg:flex-col lg:items-stretch gap-4 shadow-lg shadow-accent/20">
              <div>
                <p className="text-sm font-semibold text-white/90">Google Reviews</p>
                <b className="mt-2 block font-heading text-4xl font-extrabold md:text-5xl text-white">
                  {reviewSummary.rating}
                  <span className="text-xl"> / 5</span>
                </b>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-white text-white" />
                  ))}
                </div>
              </div>
              <Button
                href="/"
                variant="light"
                className="shrink-0 justify-center px-5 py-2.5 text-sm bg-white text-dark hover:bg-white/90"
              >
                Write a Review
              </Button>
            </div>
          </Reveal>

          <div
            ref={ref}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-none"
          >
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex w-[260px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
              >
                <div>
                  <Stars />
                  <blockquote className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-4">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-5 flex items-center gap-3 pt-3 border-t border-line/60">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand font-heading text-sm font-bold text-white shadow-sm">
                    {t.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-heading text-sm font-bold text-ink">
                      {t.name}
                    </p>
                    <p className="truncate text-xs text-muted">
                      {t.role || t.company || "Client"}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
