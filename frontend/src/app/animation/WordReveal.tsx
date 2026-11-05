"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Clean font styles matched to the 4 services
const DYNAMIC_FONT_STYLES = [
  // 0: Website Development -> Clean Sans
  {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: "600",
    letterSpacing: "-0.01em",
  },
  // 1: App Development -> Sleek Monospace
  {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
    fontWeight: "600",
    letterSpacing: "-0.02em",
  },
  // 2: Search Engine Optimization -> Clean Serif Accent with safe spacing
  {
    fontFamily: "Georgia, Cambria, 'Times New Roman', Times, serif",
    fontWeight: "600",
    fontStyle: "italic",
    letterSpacing: "-0.01em",
  },
  // 3: Marketing & Growth -> Bold Display
  {
    fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
    fontWeight: "700",
    letterSpacing: "0.01em",
  },
];

type Props = {
  text: string;
  className?: string;
  dynamicTexts?: string[];
  activeIndex?: number;
  highlightClassName?: string;
};

export default function WordReveal({
  text,
  className,
  dynamicTexts = [],
  activeIndex = 0,
  highlightClassName = "text-accent",
}: Props) {
  const currentStyle = DYNAMIC_FONT_STYLES[activeIndex % DYNAMIC_FONT_STYLES.length];
  const currentText = dynamicTexts[activeIndex % dynamicTexts.length] || "";

  // Split word into individual letters
  const letters = Array.from(currentText);

  return (
    <h1 className={cn("leading-[1.18]", className)}>
      {/* STATIC Headline: Left text "Everything you need to Grow Digitally" stays solid & fixed */}
      <span className="block font-medium tracking-normal text-white/95">
        {text}
      </span>

      {/* DYNAMIC Text: Uses fluid responsive sizing so "Search Engine Optimization" never clips or overflows */}
      {dynamicTexts.length > 0 && (
        <span className={cn(
          "mt-2 block min-h-[1.3em] overflow-visible pr-2 text-2xl sm:text-3xl md:text-[2.4rem] lg:text-[2.75rem]", 
          highlightClassName
        )}>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentText}
              className="inline-flex flex-wrap"
              style={{
                fontFamily: currentStyle.fontFamily,
                fontWeight: currentStyle.fontWeight as any,
                fontStyle: (currentStyle as any).fontStyle || "normal",
                letterSpacing: currentStyle.letterSpacing,
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.03,
                    delayChildren: 0.04,
                  },
                },
                exit: {
                  opacity: 0,
                  x: 20,
                  transition: { duration: 0.2, ease: "easeIn" },
                },
              }}
            >
              {letters.map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  className="inline-block"
                  variants={{
                    hidden: {
                      opacity: 0,
                      x: -10,
                      filter: "blur(4px)",
                    },
                    visible: {
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.3,
                        ease: [0.2, 0.65, 0.3, 0.9],
                      },
                    },
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        </span>
      )}
    </h1>
  );
}
