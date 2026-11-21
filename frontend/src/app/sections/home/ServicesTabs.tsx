"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Section from "@/app/ui/Section";
import SectionHeading from "@/app/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { 
  ChevronRight, 
  Monitor, 
  PanelsTopLeft, 
  ShoppingCart, 
  Smartphone, 
  Palette, 
  Search, 
  AppWindow, 
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { fetchServices, type ServiceData } from "@/lib/services-api";

const IMG = "https://sumitdevtech.com/assets/images";

const DEFAULT_SERVICES = [
  { title: "Website Development", href: "/services/website-development-services", image: `${IMG}/services/website-development.png`, text: "From scratch to live - we code websites that load fast, look sharp, and don't break after a month.", icon: Monitor },
  { title: "WordPress Website Development", href: "/services/wordpress-website-development", image: `${IMG}/services/wordpress-development.png`, text: "We build WordPress sites you can actually manage yourself. No dependency on us for every small change.", icon: PanelsTopLeft },
  { title: "Ecommerce Website Development", href: "/services/ecommerce-website-development", image: `${IMG}/services/ecommerce-development.png`, text: "Selling online is more than just adding products. We build stores that make buying easy for your customers.", icon: ShoppingCart },
  { title: "Responsive Web Design", href: "/services/responsive-website-design", image: `${IMG}/services/responsive-design.png`, text: "Your website should work on a 5-inch phone the same way it does on a 27-inch monitor. We make sure it does.", icon: Smartphone },
  { title: "Shopify Website Development", href: "/services/shopify-website-development", image: `${IMG}/services/shopify-development.png`, text: "If you're serious about e-commerce, Shopify is worth it. We set it up the right way from day one.", icon: ShoppingCart },
  { title: "UI UX Design", href: "/services/ui-ux-designing", image: `${IMG}/services/ui-ux-design.png`, text: "Good design isn't decoration. It's the reason people stay on your site instead of hitting the back button.", icon: Palette },
  { title: "SEO Optimization", href: "/services/digital-marketing-services", image: `${IMG}/services/seo-optimization.png`, text: "Getting found on Google takes more than keywords. We handle the technical side that most agencies ignore.", icon: Search },
  { title: "Web Applications", href: "/services/web-applications", image: `${IMG}/services/web-applications.png`, text: "Got a business process that wastes your team's time? We build tools that fix that.", icon: AppWindow },
  { title: "Website Maintenance", href: "/services/website-maintenance", image: `${IMG}/services/website-maintenance.png`, text: "Sites break, get hacked, and go slow. We keep an eye on yours, so you don't have to worry about it.", icon: Wrench },
];

const DURATION = 3500;
const TICK = 80;
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export default function ServicesTabs() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const reduce = useReducedMotion();
  const total = services.length;

  useEffect(() => {
    fetchServices().then((data) => {
      if (data && data.length > 0) {
        setServices(
          data.slice(0, 9).map((s, idx) => ({
            title: s.title,
            href: `/services/${s.slug}`,
            image: DEFAULT_SERVICES[idx % DEFAULT_SERVICES.length].image,
            text: s.description || DEFAULT_SERVICES[idx % DEFAULT_SERVICES.length].text,
            icon: DEFAULT_SERVICES[idx % DEFAULT_SERVICES.length].icon,
          }))
        );
      }
    });
  }, []);

  const select = (i: number) => {
    setActive(i);
    setProgress(0);
    elapsed.current = 0;
  };

  useEffect(() => {
    if (paused || reduce || total === 0) return;
    const id = setInterval(() => {
      elapsed.current += TICK;
      if (elapsed.current >= DURATION) {
        elapsed.current = 0;
        setProgress(0);
        setActive((prev) => (prev + 1) % total);
      } else {
        setProgress(elapsed.current / DURATION);
      }
    }, TICK);
    return () => clearInterval(id);
  }, [paused, reduce, total]);

  useEffect(() => {
    const list = listRef.current;
    const btn = list?.children[active] as HTMLElement | undefined;
    if (!list || !btn || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: btn.offsetLeft - list.clientWidth / 2 + btn.clientWidth / 2,
      behavior: "smooth",
    });
  }, [active]);

  const current = services[active] || services[0];
  const IconComponent = current?.icon || Monitor;

  return (
    <Section id="services" light>
      <SectionHeading
        center
        label="Our Services"
        title={
          <>
            End-to-End <span className="text-brand">Web & Tech Solutions</span>
          </>
        }
        text="From intuitive design to robust development and high-converting marketing, we deliver full-cycle digital transformation."
      />

      <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6">
        <div
          ref={listRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="no-scrollbar flex gap-2 overflow-x-auto pb-4 pt-2"
        >
          {services.map((s, i) => {
            const isCurrent = i === active;
            return (
              <button
                key={s.title + i}
                onClick={() => select(i)}
                className={cn(
                  "relative flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200",
                  isCurrent
                    ? "bg-dark text-white shadow-md"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                )}
              >
                <span>{pad(i + 1)}</span>
                <span>{s.title}</span>
                {isCurrent && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-brand rounded-full"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-white shadow-xs">
          <div className="grid grid-cols-1 items-center gap-8 p-8 md:grid-cols-2 md:p-12">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-100 px-3.5 py-1 text-xs font-semibold text-brand">
                <IconComponent size={14} />
                <span>Specialized Domain Service</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-dark sm:text-3xl">
                {current?.title}
              </h3>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted font-normal">
                {current?.text}
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={current?.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-dark px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-black transition"
                >
                  <span>Explore Service Overview</span>
                  <ChevronRight size={16} />
                </a>
                <a
                  href="/contact-us"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <span>Request Custom Quote</span>
                </a>
              </div>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-slate-50 flex items-center justify-center p-6">
              <img
                src={current?.image}
                alt={current?.title}
                className="max-h-full max-w-full object-contain drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
