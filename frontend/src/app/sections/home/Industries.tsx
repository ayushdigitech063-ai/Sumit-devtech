"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Section from "../../ui/Section";
import SectionHeading from "../../ui/SectionHeading";
import { industries } from "@/data/industries";
import { cn } from "@/lib/utils";

// Opaque tints (cards overlap, so they must not be see-through).
// They are built from theme tokens, so they follow the palette.
const tints = [
  "bg-[color-mix(in_srgb,var(--color-accent)_16%,white)]",
  "bg-[color-mix(in_srgb,var(--color-accent-2)_24%,white)]",
  "bg-light",
  "bg-[color-mix(in_srgb,var(--color-accent-2)_12%,white)]",
];

export default function Industries() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  // Depth effect: a card shrinks and dims a little as the next one covers it
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

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [shouldReduceMotion]);

  return (
    <Section id="industries">
      <SectionHeading
        label="Industries"
        title={<>We Serve <span className="text-brand">All Industries</span></>}
        text="We stay ahead in technology by understanding the unique challenges and goals of every industry we work with."
      />

      <div className="relative">
        {industries.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{ top: 88 + i * 12 }}
              className={cn(
                "group sticky mb-6 origin-top overflow-hidden rounded-3xl border border-line p-5 will-change-transform",
                "shadow-[0_-12px_36px_-20px_rgba(0,0,0,0.3)] `md:min-h-[210px]` md:p-9",
                tints[i % tints.length]
              )}
            >
              {/* optional faded image on the right (only industries with an image) */}
              {ind.image && (
                <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 md:block">
                  <Image
                    src={ind.image}
                    alt=""
                    fill
                    sizes="(min-width:768px) 340px, 0px"
                    className="object-cover opacity-20 `[mask-image:linear-gradient(90deg,transparent,#000_60%)]`"
                  />
                </div>
              )}

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative grid items-center gap-4 md:grid-cols-[auto_1fr_auto] md:gap-8"
              >
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/80 text-accent shadow-sm transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 md:h-20 md:w-20">
                  <Icon className="h-8 w-8 md:h-10 md:w-10" />
                </span>

                <div>
                  <h3 className="mb-2 text-xl font-extrabold text-ink md:text-3xl">{ind.name}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">{ind.text}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:gap-3"
                  >
                    Explore More <ArrowRight size={16} />
                  </Link>
                </div>

                <span className="hidden select-none font-heading text-6xl font-extrabold text-ink/10 md:block lg:text-7xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}