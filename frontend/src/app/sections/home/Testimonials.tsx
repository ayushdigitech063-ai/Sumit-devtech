"use client";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import Reveal from "../../animation/Reveal";
import Button from "../../ui/Button";
import { testimonials, reviewSummary } from "@/data/testimonial";

function Stars() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className="fill-accent-2 text-accent-2" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 300, behavior: "smooth" });

  return (
    <Section id="testimonials" dark>
      <div className="mx-auto w-full max-w-[1100px] px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          dark
          center
          label="Testimonials"
          title={<>What Our Clients <span className="text-brand">Say About Us</span></>}
          text="We work hard to deliver exceptional ROI and scalable growth. Read why our clients recommend us for performance marketing and SEO."
        />
        <div className="mb-12 flex gap-3">
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/30 transition hover:border-transparent hover:bg-brand md:h-12 md:w-12"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/30 transition hover:border-transparent hover:bg-brand md:h-12 md:w-12"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid items-stretch gap-6 lg:grid-cols-[240px_1fr]">
        <Reveal>
          <div className="flex h-full flex-col justify-between rounded-3xl bg-brand p-5 text-white sm:flex-row sm:items-center md:p-6 lg:flex-col lg:items-stretch gap-4">
            <div>
              <p className="text-sm font-semibold">Google Reviews</p>
              <b className="mt-2 block font-heading text-4xl font-extrabold md:text-5xl">
                {reviewSummary.rating}<span className="text-xl"> / 5</span>
              </b>
              <div className="mt-2 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className="fill-white" />)}
              </div>
            </div>
            <Button href="/" variant="light" className="shrink-0 justify-center px-5 py-2.5 text-sm">
              Write a Review
            </Button>
          </div>
        </Reveal>

        <div
          ref={ref}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 scrollbar-none"
        >
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex w-[250px] shrink-0 snap-start flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-2 hover:border-accent"
            >
              <div>
                <Stars />
                <blockquote className="mt-3 text-sm leading-relaxed text-white/80">&ldquo;{t.text}&rdquo;</blockquote>
              </div>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand font-heading text-sm font-bold text-white">
                  {t.initials}
                </span>
                <span>
                  <b className="block text-sm text-white">{t.name}</b>
                  <small className="text-xs text-white/50">{t.company}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      </div>
    </Section>
  );
}