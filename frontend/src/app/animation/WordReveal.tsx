
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  delay?: number;
  className?: string;
  dynamicTexts?: string[];
  interval?: number;
  highlightClassName?: string;
};

export default function WordReveal({
  text,
  delay = 0,
  className,
  dynamicTexts = [],
  interval = 2500,
  highlightClassName = "text-orange-500",
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (dynamicTexts.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [dynamicTexts, interval]);

  return (
    <>
    <h1 className={cn("font-bold leading-tight", className)}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-top"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotate: 6, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.09,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}

      {dynamicTexts.length > 0 && (
        <>
          {" "}
          <span className={cn("inline-block", highlightClassName)}>
            <AnimatePresence mode="wait">
              <motion.span
                key={dynamicTexts[activeIndex]}
                className="inline-block"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {dynamicTexts[activeIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </>
      )}
    </h1>
    </>
  );
}
