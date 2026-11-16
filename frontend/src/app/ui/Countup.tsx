"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

type Props = {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
  margin?: any;
};

export default function Countup({
  to,
  suffix = "",
  prefix = "",
  decimals,
  duration = 1.8,
  className,
  margin = "-80px",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  const decPlaces =
    decimals !== undefined
      ? decimals
      : to % 1 !== 0
      ? to.toString().split(".")[1]?.length || 1
      : 0;

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        setVal(decPlaces > 0 ? parseFloat(v.toFixed(decPlaces)) : Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration, decPlaces]);

  const shown = reduce ? to : val;
  const formatted =
    decPlaces > 0
      ? shown.toFixed(decPlaces)
      : shown.toLocaleString("en-IN");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
