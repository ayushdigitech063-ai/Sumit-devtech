"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Props = { to: number; suffix?: string; duration?: number; className?: string };

export default function Countup({ to, suffix = "", duration = 1.8, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  const shown = reduce ? to : val;

  return (
    <span ref={ref} className={className}>
      {shown.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}