"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Layout,
  Smartphone,
  Palette,
  Code2,
  ShoppingCart,
  RefreshCw,
  Flame,
  Gauge,
  Tablet,
  Monitor,
  Maximize,
  Cpu,
  Eye,
  Zap,
  Sliders,
  CheckCircle2,
  Search,
  CreditCard,
  Package,
  Globe,
  BarChart3,
  Layers,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import { ServicePageData, EcosystemCard } from "@/types/service-page";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Smartphone,
  Palette,
  Code2,
  ShoppingCart,
  RefreshCw,
  Flame,
  Gauge,
  Tablet,
  Monitor,
  Maximize,
  Cpu,
  Eye,
  Zap,
  Sliders,
  CheckCircle2,
  Search,
  CreditCard,
  Package,
  Globe,
  BarChart3,
  Layers,
  Sparkles,
};
const LEFT_SHIFT = [
  "lg:translate-x-6",
  "lg:-translate-x-2",
  "lg:-translate-x-2",
  "lg:translate-x-8",
];
const RIGHT_SHIFT = [
  "lg:-translate-x-6",
  "lg:translate-x-2",
  "lg:translate-x-2",
  "lg:-translate-x-8",
];
const ROW_START = [
  "lg:row-start-1",
  "lg:row-start-2",
  "lg:row-start-3",
  "lg:row-start-4",
  "lg:row-start-5",
  "lg:row-start-6",
];
const ROW_SPAN = [
  "lg:row-span-1",
  "lg:row-span-1",
  "lg:row-span-2",
  "lg:row-span-3",
  "lg:row-span-4",
  "lg:row-span-5",
  "lg:row-span-6",
];

export interface DesignEcosystemSectionProps {
  data?: ServicePageData["ecosystem"];
  label?: string;
  title?: React.ReactNode;
  text?: string;
  cards?: EcosystemCard[];
  /** Name of the icon shown on top of the platform, for example "ShoppingCart" */
  centerIconName?: string;
}


const SLABS = [
  { y: 52, glow: "bg-accent/40", border: "border-accent/80" },
  { y: 26, glow: "bg-accent/25", border: "border-accent/60" },
  { y: 0, glow: "bg-accent/15", border: "border-accent/40" },
  { y: -26, glow: "bg-accent/10", border: "border-white/20" },
];

function Platform({
  Icon,
  reduceMotion,
}: {
  Icon: LucideIcon;
  reduceMotion: boolean | null;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto h-[280px] max-w-[350px] scale-90 sm:h-[340px] sm:scale-100"
    >
      {/* Light on the floor under the platform */}
      <div className="absolute bottom-6 left-1/2 h-20 w-64 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" />

      {/* Stacked slabs, bottom one first */}
      {SLABS.map((slab, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -ml-24 -mt-24"
          style={{
            transform: `translateY(${slab.y}px) rotateX(58deg) rotateZ(45deg)`,
          }}
        >
          <div
            className={cn(
              "relative h-48 w-48 rounded-[2rem] border-2 bg-gradient-to-br from-white/10 via-dark to-black",
              slab.border
            )}
          >
            <div
              className={cn(
                "absolute inset-0 -z-10 rounded-[2rem] blur-xl",
                slab.glow
              )}
            />
            {i === SLABS.length - 1 && (
              <div className="absolute inset-5 rounded-2xl border border-accent/30" />
            )}
          </div>
        </div>
      ))}

      {/* Floating icon */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ marginLeft: -32, marginTop: -92 }}
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute -inset-5 rounded-full bg-accent/30 blur-2xl" />
        <Icon size={64} strokeWidth={1.6} className="relative text-accent" />
      </motion.div>
    </div>
  );
}

function EcosystemItem({
  card,
  index,
  reduceMotion,
}: {
  card: EcosystemCard;
  index: number;
  reduceMotion: boolean | null;
}) {
  const Icon = iconMap[card.iconName] || Layout;
  const side = index % 2 === 0 ? "left" : "right"; // 01 left, 02 right, 03 left ...
  const row = Math.floor(index / 2); // the row inside its column

  return (
    <div
      className={cn(
        "relative",
        side === "left" ? "lg:col-start-1" : "lg:col-start-3",
        "h-full", side === "left" ? "transform-[perspective(1000px)_rotateY(10deg)]" : "transform-[perspective(1000px)_rotateY(-10deg)]",
        ROW_START[Math.min(row, ROW_START.length - 1)],
          side === "left"
            ? LEFT_SHIFT[row % LEFT_SHIFT.length]
            : RIGHT_SHIFT[row % RIGHT_SHIFT.length]
      )}
    >
      {/* Line that points at the platform (desktop only) */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1/2 hidden h-px w-10 lg:block",
          side === "left"
            ? "left-full bg-gradient-to-r from-accent/60 to-transparent lg:rotate-3"
            : "right-full bg-gradient-to-l from-accent/60 to-transparent lg:rotate-2"
        )}
      />
      <motion.div
        initial={{
          opacity: 0,
          x: reduceMotion ? 0 : side === "left" ? -32 : 32,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          duration: 0.6,
          delay: reduceMotion ? 0 : index * 0.07,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-white/10 bg-dark/80 p-5 shadow-xl backdrop-blur-xl transition-colors duration-300 hover:border-accent/50 hover:bg-white/[0.04]"
      >
        {/* Glow in the corner, brighter on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition duration-500 group-hover:bg-accent/25"
        />

        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent transition duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-dark">
          <Icon size={22} />
        </div>

        <div className="relative min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            {/* {card.badge && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                <Sparkles size={10} className="text-accent" />
                {card.badge}
              </span>
            )} */}
          </div>

          <h3 className="mt-0.5 font-heading text-lg font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-accent-2">
            {card.title}
          </h3>

          <p className="mt-1.5 text-[13px] leading-relaxed text-white/60">
            {card.description}
          </p>
        </div>
      </motion.div>
      </div>
  );
}


export default function DesignEcosystemSection({
  data,
  label: labelProp,
  title: titleProp,
  text: textProp,
  cards: cardsProp,
  centerIconName: centerIconProp,
}: DesignEcosystemSectionProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  const label = data?.label ?? labelProp ?? "Full-Stack Design Hub";
  const title = titleProp ?? (
    data ? (
      <>
        {data.title}{" "}
        {data.highlight && <span className="text-brand">{data.highlight}</span>}
      </>
    ) : (
      <>
        Our Core Web Design{" "}
        <span className="text-brand">Ecosystem</span>
      </>
    )
  );
  const text =
    data?.text ??
    textProp ??
    "An integrated end-to-end framework uniting human-centered wireframing, high-fidelity visual styling, and high-velocity frontend engineering.";
  const cards = (data?.cards ?? cardsProp ?? []).slice(0, 12);

  // The icon on the platform can come from the data or from a prop
  const centerIconName =
    centerIconProp ??
    (data as { centerIconName?: string } | undefined)?.centerIconName;
  const CenterIcon = (centerIconName && iconMap[centerIconName]) || Layers;

  const rows = Math.min(Math.max(Math.ceil(cards.length / 2), 1), 6);

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-dark-2/95 text-white md:py-15">
      {/* Background soft ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-90 w-90 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-accent-2/10 blur-3xl"
      />

      <Container>
        <div className="mx-auto w-full max-w-[1200px]">
          <SectionHeading
            center
            dark
            label={label}
            title={title}
            text={text}
          />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)_minmax(0,1fr)] lg:gap-x-10 lg:gap-y-8">
            {/* Platform: on top for phones, in the middle on desktop */}
            <div
              className={cn(
                "sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:self-center",
                ROW_SPAN[rows]
              )}
            >
              <Platform Icon={CenterIcon} reduceMotion={shouldReduceMotion} />
            </div>

            {cards.map((card, index) => (
              <EcosystemItem
                key={card.id}
                card={card}
                index={index}
                reduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}