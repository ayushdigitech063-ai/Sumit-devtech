"use client";

import React, { useState } from "react";
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
  MousePointerClick,
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
  "lg:translate-x-4",
  "lg:-translate-x-2",
  "lg:-translate-x-2",
  "lg:translate-x-6",
];
const RIGHT_SHIFT = [
  "lg:-translate-x-4",
  "lg:translate-x-2",
  "lg:translate-x-2",
  "lg:-translate-x-6",
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
  centerIconName?: string;
}

const SLABS = [
  { y: 52, glow: "bg-accent/40", border: "border-accent/80" },
  { y: 26, glow: "bg-accent/25", border: "border-accent/60" },
  { y: 0, glow: "bg-accent/15", border: "border-accent/40" },
  { y: -26, glow: "bg-accent/10", border: "border-white/20" },
];

function InteractivePlatform({
  Icon,
  reduceMotion,
  onClick,
  isExploded,
}: {
  Icon: LucideIcon;
  reduceMotion: boolean | null;
  onClick: () => void;
  isExploded: boolean;
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className="group relative mx-auto h-[300px] max-w-[360px] cursor-pointer scale-90 sm:h-[350px] sm:scale-100 select-none focus:outline-none"
      title="Click to trigger animated card reveal!"
    >
      {/* Light on the floor under the platform */}
      <div className="absolute bottom-4 left-1/2 h-24 w-72 -translate-x-1/2 rounded-full bg-accent/35 blur-3xl transition-all duration-500 group-hover:bg-accent/50 group-hover:scale-110" />

      {/* Stacked slabs */}
      {SLABS.map((slab, i) => (
        <motion.div
          key={i}
          animate={
            isExploded
              ? {
                  y: [slab.y, slab.y + (i - 1.5) * 18, slab.y],
                  rotateZ: [45, 45 + (i % 2 === 0 ? 8 : -8), 45],
                }
              : undefined
          }
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -ml-24 -mt-24 transition-transform duration-300 group-hover:scale-105"
          style={{
            transform: `translateY(${slab.y}px) rotateX(58deg) rotateZ(45deg)`,
          }}
        >
          <div
            className={cn(
              "relative h-48 w-48 rounded-[2rem] border-2 bg-gradient-to-br from-white/15 via-dark to-black shadow-2xl transition duration-300 group-hover:border-accent",
              slab.border
            )}
          >
            <div
              className={cn(
                "absolute inset-0 -z-10 rounded-[2rem] blur-xl transition duration-300 group-hover:blur-2xl",
                slab.glow
              )}
            />
            {i === SLABS.length - 1 && (
              <div className="absolute inset-5 rounded-2xl border border-accent/40 group-hover:border-accent/80 transition" />
            )}
          </div>
        </motion.div>
      ))}

      {/* Floating Center Icon */}
      <motion.div
        className="absolute left-1/2 top-1/2"
        style={{ marginLeft: -32, marginTop: -92 }}
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute -inset-5 rounded-full bg-accent/40 blur-2xl group-hover:bg-accent/60 transition" />
        <Icon size={64} strokeWidth={1.8} className="relative text-accent transition-transform duration-300 group-hover:scale-110" />
      </motion.div>

      {/* "Click Me" interactive hint pill */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/90 bg-white/95 px-3.5 py-1 text-[11px] font-bold text-accent shadow-md backdrop-blur-md transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-105">
          <MousePointerClick size={13} className="animate-bounce" />
          <span>Click to Replay</span>
        </span>
      </div>
    </div>
  );
}

function EcosystemItem({
  card,
  index,
  animationCycle,
}: {
  card: EcosystemCard;
  index: number;
  animationCycle: number;
}) {
  const Icon = iconMap[card.iconName] || Layout;
  const side = index % 2 === 0 ? "left" : "right"; // 01 left, 02 right, 03 left ...
  const row = Math.floor(index / 2); // the row inside its column

  return (
    <div
      className={cn(
        "relative",
        side === "left" ? "lg:col-start-1" : "lg:col-start-3",
        "h-full",
        side === "left"
          ? "transform-[perspective(1000px)_rotateY(10deg)]"
          : "transform-[perspective(1000px)_rotateY(-10deg)]",
        ROW_START[Math.min(row, ROW_START.length - 1)],
        side === "left"
          ? LEFT_SHIFT[row % LEFT_SHIFT.length]
          : RIGHT_SHIFT[row % RIGHT_SHIFT.length]
      )}
    >
      {/* 
        Connector ray that starts INSIDE the black platform body 
        and goes all the way into the card.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1/2 hidden h-4 items-center -translate-y-1/2 lg:flex z-0",
          side === "left"
            ? "left-[100%] right-[-140px]" 
            : "right-[100%] left-[-140px] flex-row-reverse"
        )}
      >
        {/* Animated full-reach connector ray */}
        <motion.div
          key={`line-${animationCycle}-${index}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.55,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          style={{ originX: side === "left" ? 1 : 0 }}
          className={cn(
            "h-[2px] w-full",
            side === "left"
              ? "bg-gradient-to-l from-accent via-accent to-accent/40"
              : "bg-gradient-to-r from-accent via-accent to-accent/40"
          )}
        />
        {/* Glowing Terminal Node right at the Card edge */}
        <motion.div
          key={`dot-${animationCycle}-${index}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1 + 0.35,
          }}
          className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgba(255,106,31,0.9)] border-2 border-white"
        />
      </div>

      {/* Card: Animates bursting out sequentially 1, 2, 3... */}
      <motion.div
        key={`card-${animationCycle}-${index}`}
        initial={{
          opacity: 0,
          scale: 0.85,
          x: side === "left" ? 70 : -70,
          y: 20,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          duration: 0.65,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-line/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10 z-10"
      >
        {/* Glow in the corner, brighter on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-accent/10 blur-2xl transition duration-500 group-hover:bg-accent/25"
        />

        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-[#f7f6f3] text-accent transition duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:border-accent shadow-xs">
          <Icon size={22} />
        </div>

        <div className="relative min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-0.5 font-heading text-lg font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent">
            {card.title}
          </h3>

          <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
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
  const [animationCycle, setAnimationCycle] = useState(0);
  const [isExploded, setIsExploded] = useState(false);

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

  const centerIconName =
    centerIconProp ??
    (data as { centerIconName?: string } | undefined)?.centerIconName;
  const CenterIcon = (centerIconName && iconMap[centerIconName]) || Layers;

  const rows = Math.min(Math.max(Math.ceil(cards.length / 2), 1), 6);

  const triggerAnimation = () => {
    setIsExploded(true);
    setAnimationCycle((prev) => prev + 1);
    setTimeout(() => setIsExploded(false), 600);
  };

  return (
    <section className="relative overflow-hidden border-t border-line/60 bg-[#f7f6f3] text-ink md:py-20">
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
            label={label}
            title={title}
            text={text}
          />

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-8 items-center">
            {/* Interactive Platform: In the middle */}
            <div
              className={cn(
                "sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:self-center z-10",
                ROW_SPAN[rows]
              )}
            >
              <InteractivePlatform
                Icon={CenterIcon}
                reduceMotion={shouldReduceMotion}
                onClick={triggerAnimation}
                isExploded={isExploded}
              />
            </div>

            {/* Surrounding Cards */}
            {cards.map((card, index) => (
              <EcosystemItem
                key={`${card.id}-${animationCycle}`}
                card={card}
                index={index}
                animationCycle={animationCycle}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
