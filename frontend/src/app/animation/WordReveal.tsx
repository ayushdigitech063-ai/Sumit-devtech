"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = { text: string; delay?: number; className?: string };

export default function WordReveal({ text, delay = 0, className }: Props) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.14em] align-top">
          <motion.span
            className={cn("inline-block", className)}
            initial={{ y: "110%", rotate: 6, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: delay + i * 0.09, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}