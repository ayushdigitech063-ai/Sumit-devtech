"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Code2, ShoppingCart, TrendingUp, MonitorSmartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const SCENES = [
  { id: "dev", label: "Development", icon: Code2, url: "yourbusiness.com" },
  { id: "shop", label: "E-Commerce", icon: ShoppingCart, url: "mystore.in/shop" },
  { id: "seo", label: "SEO", icon: TrendingUp, url: "google.com/search" },
  { id: "resp", label: "Responsive", icon: MonitorSmartphone, url: "yourbusiness.com" },
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
                    className="absolute bottom-0 left-0 `h-[3px]` bg-brand"
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
        <div className="relative `h-[300px]` overflow-hidden rounded-2xl bg-dark/70 p-4">
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
              {active === 1 && <ShopScene />}
              {active === 2 && <SeoScene />}
              {active === 3 && <ResponsiveScene />}
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

/* ---------- Scene 2: e-commerce ---------- */
const PRODUCTS = [
  { e: "👟", n: "Runner Pro", p: "₹2,499" },
  { e: "⌚", n: "Smart Watch", p: "₹3,999" },
  { e: "🎧", n: "Studio Buds", p: "₹1,799" },
];

function ShopScene() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const ts = [
      setTimeout(() => setStep(1), 1800),
      setTimeout(() => setStep(2), 3100),
      setTimeout(() => setStep(3), 4600),
    ];
    return () => ts.forEach(clearTimeout);
  }, []);

  const cart = Math.min(step, 2);

  return (
    <div className="relative flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <b className="font-heading text-sm">My Store</b>
        <div className="relative">
          <ShoppingCart size={18} />
          <motion.span
            key={cart}
            initial={{ scale: 1.9 }}
            animate={{ scale: 1 }}
            className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-bold"
          >
            {cart}
          </motion.span>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-3">
        {PRODUCTS.map((p, i) => {
          const added = (i === 0 && step >= 1) || (i === 1 && step >= 2);
          return (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-2.5"
            >
              <div className="grid flex-1 place-items-center rounded-lg `bg-gradient-to-br` from-accent/25 to-accent-2/10 text-4xl">
                {p.e}
              </div>
              <p className="mt-2 text-xs font-semibold">{p.n}</p>
              <p className="text-[11px] text-white/50">{p.p}</p>
              <motion.button
                key={String(added)}
                animate={added ? { scale: [1, 0.88, 1] } : {}}
                className={cn(
                  "mt-2 rounded-lg py-1.5 text-[11px] font-bold",
                  added ? "bg-green-500 text-white" : "bg-brand text-white"
                )}
              >
                {added ? "Added ✓" : "Add to cart"}
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute inset-x-6 bottom-1 rounded-xl bg-white px-4 py-2.5 text-center text-xs font-bold text-ink shadow-2xl"
        >
          🎉 Order placed · Payment received
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

/* ---------- Scene 4: responsive ---------- */
function Screen({ className, cards }: { className: string; cards: number }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-white/25 bg-dark-2 p-1.5", className)}>
      <div className="h-1/3 rounded bg-brand opacity-90" />
      <div className="mt-1.5 h-1.5 w-2/3 rounded bg-white/30" />
      <div className="mt-1 h-1.5 w-1/2 rounded bg-white/15" />
      <div className="mt-1.5 grid gap-1" style={{ gridTemplateColumns: `repeat(${cards}, 1fr)` }}>
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="h-5 rounded bg-white/10" />
        ))}
      </div>
    </div>
  );
}

function ResponsiveScene() {
  const devices = [
    { cls: "h-28 w-48", cards: 3, label: "Desktop" },
    { cls: "h-28 w-20", cards: 2, label: "Tablet" },
    { cls: "h-24 w-12", cards: 1, label: "Mobile" },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="flex items-end justify-center gap-5">
        {devices.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.35, type: "spring", stiffness: 140, damping: 14 }}
            className="flex flex-col items-center gap-2"
          >
            <Screen className={d.cls} cards={d.cards} />
            <span className="text-[11px] text-white/50">{d.label}</span>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold"
      >
        One design · <span className="text-accent">every screen</span>
      </motion.p>
    </div>
  );
}