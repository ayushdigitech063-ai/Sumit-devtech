"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, TrendingUp, Smartphone, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const SCENES = [
  { id: "dev", label: "Development", icon: Code2, url: "yourbusiness.com" },
  { id: "shop", label: "App Development", icon: Smartphone, url: "yourapp.com/launch" },
  { id: "seo", label: "SEO", icon: TrendingUp, url: "google.com/search" },
  { id: "resp", label: "Marketing & Security", icon: ShieldCheck, url: "yourbusiness.com/dashboard" },
];
const DURATION = 6500; // ms per scene

export default function HeroShowcase() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % SCENES.length), DURATION);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="relative">
      <div className="animate-float rounded-[28px] border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
        {/* window bar */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
          <span className="ml-3 rounded-full bg-white/10 px-4 py-1 text-xs text-white/70">
            {SCENES[active].url}
          </span>
        </div>

        {/* tabs */}
        <div className="mb-4 grid grid-cols-4 gap-2">
          {SCENES.map((s, i) => {
            const Icon = s.icon;
            const on = i === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={cn(
                  "relative overflow-hidden rounded-xl px-2 py-2.5 text-[11px] font-semibold transition sm:text-xs",
                  on ? "bg-white/15 text-white" : "text-white/55 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon size={15} className={cn("mx-auto mb-1", on && "text-accent")} />
                {s.label}
                {on && (
                  <motion.span
                    key={active}
                    className="absolute bottom-0 left-0 h-[3px] bg-brand"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* stage */}
        <div className="relative h-[300px] overflow-hidden rounded-2xl bg-dark/70 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="h-full"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              {active === 0 && <DevScene />}
              {active === 1 && <AppScene />}
              {active === 2 && <SeoScene />}
              {active === 3 && <MarketingSecurityScene />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* floating chips */}
      {/* <div className="absolute -right-3 top-10 animate-float rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-ink shadow-2xl [animation-delay:-2s]">
        <b className="block font-heading text-xl text-accent">+128%</b>Organic traffic
      </div>
      <div className="absolute -left-6 bottom-10 animate-float rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-ink shadow-2xl [animation-delay:-3.5s]">
        <b className="block font-heading text-xl text-green-600">5–7 days</b>Standard delivery
      </div> */}
    </div>
  );
}

/* ---------- Scene 1: code typing ---------- */
type Tok = { t: string; c: string };
const CODE: Tok[] = [
  { t: "const ", c: "text-accent" }, { t: "site ", c: "text-white" }, { t: "= ", c: "text-white/60" },
  { t: "await ", c: "text-accent" }, { t: "build", c: "text-accent-2" }, { t: "({\n", c: "text-white/60" },
  { t: "  design", c: "text-white" }, { t: ": ", c: "text-white/60" }, { t: '"custom"', c: "text-green-400" }, { t: ",\n", c: "text-white/60" },
  { t: "  seo", c: "text-white" }, { t: ": ", c: "text-white/60" }, { t: "true", c: "text-accent" }, { t: ",\n", c: "text-white/60" },
  { t: "  mobile", c: "text-white" }, { t: ": ", c: "text-white/60" }, { t: '"first"', c: "text-green-400" }, { t: ",\n", c: "text-white/60" },
  { t: "  speed", c: "text-white" }, { t: ": ", c: "text-white/60" }, { t: "98", c: "text-accent-2" }, { t: ",\n", c: "text-white/60" },
  { t: "});\n\n", c: "text-white/60" },
  { t: "deploy", c: "text-accent-2" }, { t: "(site); ", c: "text-white/60" }, { t: "// live in 5–7 days", c: "text-white/35" },
];
const TOTAL = CODE.reduce((n, tok) => n + tok.t.length, 0);

function DevScene() {
  const [n, setN] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setN((v) => (v >= TOTAL ? v : v + 1)), 35);
    return () => clearInterval(id);
  }, []);

  let left = n;
  const done = n >= TOTAL;

  return (
    <div className="flex h-full flex-col justify-between">
      <pre className="whitespace-pre-wrap font-mono text-[13px] leading-6">
        {CODE.map((tok, i) => {
          const shown = tok.t.slice(0, left);
          left = Math.max(0, left - tok.t.length);
          return <span key={i} className={tok.c}>{shown}</span>;
        })}
        <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-accent align-middle" />
      </pre>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold"
        >
          <span className="rounded-lg bg-green-500/15 px-2 py-2 text-green-400">✓ Build passed</span>
          <span className="rounded-lg bg-accent-2/15 px-2 py-2 text-accent-2">98 PageSpeed</span>
          <span className="rounded-lg bg-accent/15 px-2 py-2 text-accent">SEO ready</span>
        </motion.div>
      )}
    </div>
  );
}

/*  2: app development  */
const APP_ROWS = [
  { e: "🛒", n: "Orders", v: "24 new" },
  { e: "💬", n: "Messages", v: "8 unread" },
  { e: "📍", n: "Live tracking", v: "On the way" },
];
const APP_STEPS = [
  "UI/UX design approved",
  "iOS & Android build",
  "APIs & payments integrated",
  "Published to stores",
];
function AppScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const ts = [1000, 2000, 3000, 4000].map((ms, i) => setTimeout(() => setStep(i + 1), ms));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex h-full items-center gap-4 sm:gap-5">
      {/* phone mockup */}
      <motion.div
        initial={{ opacity: 0, y: 24, rotate: -3 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="flex h-full w-[112px] shrink-0 flex-col rounded-[22px] border-2 border-white/25 bg-dark-2 p-2 sm:w-[132px]"
      >
        <span className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/20" />
        <div className="rounded-lg bg-brand p-2 text-[10px] font-bold text-white">
          Hi, Rahul 👋
          <span className="block font-normal opacity-80">Today&apos;s overview</span>
        </div>
        <div className="mt-2 flex-1 space-y-1.5">
          {APP_ROWS.map((r, i) => (
            <motion.div
              key={r.n}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.25 }}
              className="flex items-center gap-1.5 rounded-lg bg-white/5 px-1.5 py-1.5"
            >
              <span className="text-sm">{r.e}</span>
              <div className="leading-tight">
                <p className="text-[10px] font-semibold">{r.n}</p>
                <p className="text-[9px] text-white/50">{r.v}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          <span className="h-1.5 rounded-full bg-accent" />
          <span className="h-1.5 rounded-full bg-white/20" />
          <span className="h-1.5 rounded-full bg-white/20" />
        </div>
      </motion.div>

      {/* build pipeline */}
      <div className="flex-1 space-y-2.5">
        <p className="text-xs font-semibold text-white/50">Build pipeline</p>
        {APP_STEPS.map((s, i) => {
          const done = step > i;
          const active = step === i;
          return (
            <div key={s} className="flex items-center gap-2">
              <motion.span
                key={String(done)}
                animate={done ? { scale: [1, 1.3, 1] } : {}}
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                  done ? "bg-green-500 text-white" : active ? "animate-pulse bg-accent/30 text-accent" : "bg-white/10 text-white/30"
                )}
              >
                {done ? "✓" : i + 1}
              </motion.span>
              <span className={cn("text-[11px] leading-tight sm:text-xs", done ? "text-white" : "text-white/50")}>
                {s}
              </span>
            </div>
          );
        })}
      </div>

      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute inset-x-3 bottom-0 rounded-xl bg-white px-4 py-2.5 text-center text-xs font-bold text-ink shadow-2xl"
        >
          🚀 App live on Play Store &amp; App Store · 4.8★
        </motion.div>
      )}
    </div>
  );
}


/* ---------- Scene 3: SEO ---------- */
const KEYWORDS = [
  { k: "web design company jaipur", r: 1 },
  { k: "website development jaipur", r: 2 },
  { k: "shopify developer india", r: 3 },
];
const LINE = "M0 100 C40 96 60 84 90 74 S150 66 180 44 S250 28 300 8";

function SeoScene() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-white/50">Organic traffic · last 6 months</p>
          <motion.b
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="font-heading text-3xl text-accent-2"
          >
            +128%
          </motion.b>
        </div>
        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">↑ Growing</span>
      </div>

      {/* svg uses currentColor so it follows the theme */}
      <svg viewBox="0 0 300 110" className="h-28 w-full text-accent">
        <defs>
          <linearGradient id="seoFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d={`${LINE} L300 110 L0 110Z`}
          fill="url(#seoFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />
        <motion.path
          d={LINE}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        <motion.circle
          cx="300" cy="8" r="5" fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8 }}
        />
      </svg>

      <div className="space-y-2">
        {KEYWORDS.map((w, i) => (
          <motion.div
            key={w.k}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 + i * 0.3 }}
            className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs"
          >
            <span className="text-white/80">🔍 {w.k}</span>
            <span className="rounded-md bg-brand px-2 py-0.5 font-bold text-white">#{w.r}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/*  marketing */

const CAMPAIGN = [
  { k: "SEO", v: 82 },
  { k: "Ads", v: 64 },
  { k: "Social", v: 48 },
];
const SECURITY = ["SSL certificate active", "Malware scan clean", "Daily cloud backup"];

function MarketingSecurityScene() {
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    const ts = SECURITY.map((_, i) => setTimeout(() => setChecked(i + 1), 1400 + i * 700));
    return () => ts.forEach(clearTimeout);
  }, []);

  return (
    <div className="grid h-full grid-cols-2 gap-3">
      {/* marketing */}
      <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center justify-between gap-1">
          <p className="text-[11px] font-semibold text-white/60">Campaign leads</p>
          <span className="text-[10px] font-bold text-green-400">↑ 3.4x ROI</span>
        </div>
        <motion.b
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-1 font-heading text-2xl text-accent-2"
        >
          1,240
        </motion.b>
        <div className="mt-3 flex h-[120px] items-end gap-2">
          {CAMPAIGN.map((c, i) => (
            <div key={c.k} className="flex flex-1 flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: c.v * 1.2 }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.8, ease: "easeOut" }}
                className="w-full rounded-t-md bg-brand"
              />
              <span className="text-[10px] text-white/55">{c.k}</span>
            </div>
          ))}
        </div>
      </div>

      {/* security */}
      <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="relative grid h-16 w-16 place-items-center">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-accent/60"
            animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <div className="grid h-14 w-14 place-items-center rounded-full bg-green-500/15 text-green-400">
            <ShieldCheck size={28} />
          </div>
        </div>
        <p className="mt-2 text-xs font-bold">Site protected</p>
        <p className="text-[10px] text-white/50">1,284 threats blocked</p>

        <ul className="mt-3 w-full space-y-1.5">
          {SECURITY.map((s, i) => {
            const ok = checked > i;
            return (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.25 }}
                className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-[10px]"
              >
                <span className={cn("font-bold", ok ? "text-green-400" : "text-white/30")}>{ok ? "✓" : "•"}</span>
                <span className={ok ? "text-white/85" : "text-white/45"}>{s}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}