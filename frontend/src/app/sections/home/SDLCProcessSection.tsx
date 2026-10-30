"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Container from "@/app/ui/Container";
import SectionHeading from "@/app/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { apiFetch, ApiError } from "@/lib/api";

/* PREVIOUS STATIC IMPORTS (COMMENTED OUT FOR REFERENCE):
import { homeProcessData, type HomeProcessData } from "@/data/home-process-data";
*/

const STAGE_W = 920;
const STAGE_H = 680;
const CX = STAGE_W / 2;
const CY = STAGE_H / 2;
const R = 180; // radius of the dashed ring
const NODE = 44; // size of a numbered node
const LABEL_W = 250; // width of the text next to a node
const GAP = 14; // space between a node and its text
const AUTOPLAY_MS = 3200;

const toRad = (deg: number) => (deg * Math.PI) / 180;

// Where step i sits on the ring. Step 1 is just right of the top, then clockwise.
function place(i: number, n: number) {
  const safeN = n > 0 ? n : 1;
  const angle = 180 / safeN + (i * 360) / safeN; // degrees, clockwise from the top
  const sin = Math.sin(toRad(angle));
  const cos = Math.cos(toRad(angle));
  const vertical: "top" | "middle" | "bottom" =
    cos > 0.6 ? "top" : cos < -0.6 ? "bottom" : "middle";

  return {
    angle,
    x: CX + R * sin,
    y: CY - R * cos,
    right: sin > 0, // text goes to the right on right half, left on left half
    vertical,
  };
}

function labelStyle(p: ReturnType<typeof place>): React.CSSProperties {
  const style: React.CSSProperties = { width: LABEL_W };

  if (p.right) style.left = p.x + NODE / 2 + GAP;
  else style.right = STAGE_W - (p.x - NODE / 2 - GAP);

  if (p.vertical === "top") style.bottom = STAGE_H - (p.y - NODE / 2 - 2);
  else if (p.vertical === "bottom") style.top = p.y + NODE / 2 + 2;
  else {
    style.top = p.y;
    style.transform = "translateY(-50%)";
  }
  return style;
}

export default function HomeProcessSection() {
  const [processData, setProcessData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProcess() {
      try {
        const res = await apiFetch<any>("/home/work-process");
        if (res && res.data) {
          setProcessData(res.data);
        }
      } catch (err) {
        if (err instanceof ApiError) {
          console.error(`API Error (${err.status}):`, err.message);
        } else {
          console.error("Failed to load process section:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    loadProcess();
  }, []);

  // Backend fields fallback mapping
  const label = processData?.label || processData?.tagline || "Our Process";
  const title = processData?.title || processData?.heading || "How We Build";
  const highlight = processData?.highlight || "High-Impact Websites";
  const text = processData?.text || processData?.subheading || "A battle-tested 6-step engineering methodology.";
  const centerLabel = processData?.tagline || processData?.centerText || "Our Working Process";
  const steps: any[] = processData?.steps || processData?.items || [];

  const n = steps.length;

  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const visible = useInView(stageRef, { margin: "-100px 0px" });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Moving dot angle calculation
  const [rotation, setRotation] = useState(() => (n > 0 ? place(0, n).angle : 0));
  const previous = useRef(0);

  // Steps update hone par rotation aur index recalculate karna
  useEffect(() => {
    if (n === 0) return;
    let delta = active - previous.current;
    if (delta > n / 2) delta -= n;
    else if (delta < -n / 2) delta += n;
    setRotation((r) => r + delta * (360 / n));
    previous.current = active;
  }, [active, n]);

  // Autoplay step cycle
  useEffect(() => {
    if (reduceMotion || paused || !visible || n < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduceMotion, paused, visible, n]);

  const activate = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  // Layout shift rokne ke liye skeleton
  if (loading) {
    return (
      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <Container>
          <div className="mx-auto w-full max-w-[1100px] animate-pulse">
            <div className="mx-auto mb-3 h-5 w-28 rounded-full bg-slate-200" />
            <div className="mx-auto mb-3 h-10 w-2/3 rounded-xl bg-slate-200" />
            <div className="mx-auto mb-16 h-5 w-1/2 rounded bg-slate-200" />
            <div className="mx-auto h-[480px] w-[480px] rounded-full border-2 border-dashed border-slate-200 bg-slate-50" />
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white md:py-20">
      {/* Faint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <Container>
        <div className="relative mx-auto w-full max-w-[1100px] max-h-[1100px]">
          {/* PREVIOUS STATIC HEADING (COMMENTED OUT):
          <SectionHeading
            center
            label={data.label}
            title={
              <>
                {data.title} <span className="text-brand">{data.highlight}</span>
              </>
            }
            text={data.text}
          />
          */}

          {/* NAYA DYNAMIC HEADING */}
          <SectionHeading
            center
            label={label}
            title={
              <>
                {title} <span className="text-brand">{highlight}</span>
              </>
            }
            text={text}
          />

          {/* ---------------- Desktop: circle ---------------- */}
          {n > 0 && (
            <div className="mt-10 hidden lg:block">
              <div
                ref={stageRef}
                className="relative mx-auto"
                style={{ width: STAGE_W, height: STAGE_H }}
                onMouseLeave={() => setPaused(false)}
                onBlur={() => setPaused(false)}
              >
                {/* Soft glow behind the circle */}
                <div
                  aria-hidden="true"
                  className="absolute rounded-full bg-brand/10 blur-3xl"
                  style={{ left: CX - 220, top: CY - 220, width: 440, height: 440 }}
                />

                {/* Dashed ring */}
                <svg
                  aria-hidden="true"
                  className="absolute text-slate-300"
                  style={{ left: CX - R, top: CY - R }}
                  width={2 * R}
                  height={2 * R}
                  viewBox={`0 0 ${2 * R} ${2 * R}`}
                >
                  <circle
                    cx={R}
                    cy={R}
                    r={R - 1}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="5 7"
                  />
                </svg>

                {/* Dot that travels around the ring to the active step */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute rounded-full",
                    !reduceMotion && "transition-transform duration-700 ease-out"
                  )}
                  style={{
                    left: CX - R,
                    top: CY - R,
                    width: 2 * R,
                    height: 2 * R,
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-4 ring-brand/20" />
                </div>

                {/* Centre */}
                <div
                  className="absolute grid place-items-center rounded-full bg-white shadow-[0_10px_40px_-10px_rgba(15,23,42,0.25)]"
                  style={{ left: CX - 72, top: CY - 72, width: 144, height: 144 }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full border border-brand/30"
                    animate={
                      reduceMotion ? undefined : { scale: [1, 1.35], opacity: [0.7, 0] }
                    }
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span className="relative px-4 text-center font-heading text-xl font-bold leading-tight text-brand">
                    {centerLabel}
                  </span>
                </div>

                {/* Numbered nodes and their text */}
                {steps.map((step: any, i: number) => {
                  const p = place(i, n);
                  const isActive = i === active;
                  const stepTitle = step.title || "";
                  const stepDescription = step.description || step.text || "";

                  return (
                    <React.Fragment key={step.id || step._id || i}>
                      {/* Node */}
                      <div
                        className="absolute"
                        style={{
                          left: p.x - NODE / 2,
                          top: p.y - NODE / 2,
                          width: NODE,
                          height: NODE,
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.6 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{
                            duration: 0.5,
                            delay: reduceMotion ? 0 : i * 0.08,
                          }}
                        >
                          <button
                            type="button"
                            aria-label={`Step ${i + 1}: ${stepTitle}`}
                            aria-current={isActive ? "step" : undefined}
                            onClick={() => activate(i)}
                            onMouseEnter={() => activate(i)}
                            onFocus={() => activate(i)}
                            className={cn(
                              "grid h-11 w-11 place-items-center rounded-xl border text-sm font-bold shadow-md transition duration-300",
                              isActive
                                ? "scale-110 border-brand bg-brand text-white ring-4 ring-brand/15"
                                : "border-slate-200 bg-white text-brand hover:border-brand/50"
                            )}
                          >
                            {i + 1}
                          </button>
                        </motion.div>
                      </div>

                      {/* Text */}
                      <div
                        className={cn("absolute", p.right ? "text-left" : "text-right")}
                        style={labelStyle(p)}
                      >
                        <motion.div
                          initial={{
                            opacity: 0,
                            x: reduceMotion ? 0 : p.right ? 20 : -20,
                          }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{
                            duration: 0.6,
                            delay: reduceMotion ? 0 : i * 0.08 + 0.1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <div
                            onMouseEnter={() => activate(i)}
                            className={cn(
                              "transition-opacity duration-300",
                              isActive ? "opacity-100" : "opacity-70"
                            )}
                          >
                            <h3
                              className={cn(
                                "font-heading text-[28px] font-bold leading-[1.08] tracking-tight transition-colors duration-300 xl:text-[20px]",
                                isActive ? "text-brand" : "text-dark-3"
                              )}
                            >
                              {stepTitle}
                            </h3>
                            <p className="mt-2 text-[13px] leading-snug text-slate-500">
                              {stepDescription}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---------------- Mobile / Tablets: vertical steps ---------------- */}
          {n > 0 && (
            <ol className="relative mx-auto mt-12 max-w-xl space-y-9 lg:hidden">
              <span
                aria-hidden="true"
                className="absolute bottom-4 left-[21px] top-4 border-l border-dashed border-slate-300"
              />
              {steps.map((step: any, i: number) => {
                const stepTitle = step.title || "";
                const stepDescription = step.description || step.text || "";

                return (
                  <motion.li
                    key={step.id || step._id || i}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex gap-5"
                  >
                    <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-brand shadow-md">
                      {i + 1}
                    </span>
                    <div className="pt-1">
                      <h3 className="font-heading text-2xl font-bold leading-tight text-dark">
                        {stepTitle}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                        {stepDescription}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          )}
        </div>
      </Container>
    </section>
  );
}