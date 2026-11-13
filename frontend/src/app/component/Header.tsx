"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown, PhoneCall } from "lucide-react";
import Button from "../ui/Button";
import Logo from "./Logo";
import { navLinks, serviceMenu, knowledgeHub } from "@/data/navigations";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const openQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    window.dispatchEvent(new Event("open-quote-modal"));
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar matching CEO screenshot */}
      <div className="w-full bg-[#081226] border-b border-white/10 backdrop-blur-md py-1.5 px-4 text-xs text-white/90 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-center sm:justify-between flex-wrap gap-x-6 gap-y-1">
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap justify-center font-medium text-[11.5px] sm:text-[13px]">
            <a
              href="tel:+918769668455"
              className="inline-flex items-center gap-1 text-white/90 hover:text-accent transition-colors"
            >
              <PhoneCall size={12} className="text-accent shrink-0" />
              <span className="font-bold tracking-tight text-white">+91-8769668455</span>
              <span className="text-white/70 text-[10.5px] font-normal hidden sm:inline">- Sales &amp; Marketing Team</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="tel:+916201533997"
              className="inline-flex items-center gap-1 text-white/90 hover:text-accent transition-colors"
            >
              <PhoneCall size={12} className="text-accent-2 shrink-0" />
              <span className="font-bold tracking-tight text-white">+91-6201533997</span>
              <span className="text-white/70 text-[10.5px] font-normal hidden sm:inline">- Founder Sumit Kumar Mishra</span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-white/70">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available Mon - Sat (9am - 8pm IST)
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav aria-label="Main Navigation" className="border-b border-white/10 bg-[#0e1628]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />

          {/* Desktop Nav */}
          <div className="hidden items-center gap-7 lg:flex text-sm font-semibold">
            {navLinks.map((l) =>
              l.mega ? (
                <div key={l.label} className="group relative py-2">
                  <Link
                    href="/services"
                    className="flex items-center gap-1.5 text-white/95 transition duration-200 hover:text-accent focus:outline-none"
                  >
                    <span>{l.label}</span>
                    <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <div className="invisible absolute -left-48 top-full z-50 w-[780px] pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-2xl border border-white/15 bg-[#0b162c]/98 p-6 shadow-2xl backdrop-blur-2xl">
                      <div className="grid grid-cols-4 gap-6">
                        {serviceMenu.map((cat) => (
                          <div key={cat.title}>
                            <p className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-accent">
                              {cat.title}
                            </p>
                            <div className="space-y-1">
                              {cat.items.map((i) => (
                                <Link
                                  key={i.label}
                                  href={i.href}
                                  className="group/item block rounded-lg p-2 transition duration-150 hover:bg-white/10"
                                >
                                  <span className="block text-sm font-semibold text-white transition group-hover/item:text-accent">
                                    {i.label}
                                  </span>
                                  <span className="text-xs text-white/60 group-hover/item:text-white/80">
                                    {i.desc}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : l.dropdown ? (
                <div key={l.label} className="group relative py-2">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-white/95 transition duration-200 hover:text-accent focus:outline-none"
                  >
                    <span>{l.label}</span>
                    <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="invisible absolute left-0 top-full z-50 min-w-[200px] pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-white/15 bg-[#0b162c]/98 p-2 shadow-2xl backdrop-blur-2xl">
                      {knowledgeHub.map((k) => (
                        <Link
                          key={k.label}
                          href={k.href}
                          className="block rounded-lg px-3 py-2 text-xs font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                        >
                          {k.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-white/95 transition duration-200 hover:text-accent"
                >
                  {l.label}
                </Link>
              )
            )}
          </div>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href="/"
              onClick={openQuote}
              className="bg-gradient-to-r from-accent to-accent-2 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg shadow-accent/25 hover:shadow-accent/40 transition hover:scale-102"
            >
              Get A Quote NOW
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden cursor-pointer"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Sub-Header Horizontal Strip matching CEO UI */}
        <div className="hidden lg:block border-t border-white/10 bg-[#0a1222]/90 py-1.5 px-4 text-xs font-medium text-white/80">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/services/website-design"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-white hover:bg-white/10 hover:text-accent transition duration-150"
              >
                <span>Website Design</span>
              </Link>
              <span className="text-white/30">•</span>

              <Link
                href="/services/reactjs-website-development"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-white hover:bg-white/10 hover:text-accent transition duration-150"
              >
                <span>React &amp; Next.js</span>
              </Link>
              <span className="text-white/30">•</span>

              <Link
                href="/services/wordpress-website-development"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-white hover:bg-white/10 hover:text-accent transition duration-150"
              >
                <span>WordPress</span>
              </Link>
              <span className="text-white/30">•</span>

              <Link
                href="/services/shopify-website-development"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-white hover:bg-white/10 hover:text-accent transition duration-150"
              >
                <span>Shopify Store</span>
              </Link>
              <span className="text-white/30">•</span>

              <Link
                href="/services/ecommerce-website-development"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-white hover:bg-white/10 hover:text-accent transition duration-150"
              >
                <span>E-Commerce</span>
              </Link>
              <span className="text-white/30">•</span>

              <Link
                href="/services/seo-services"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-white hover:bg-white/10 hover:text-accent transition duration-150"
              >
                <span>SEO Services</span>
              </Link>
              <span className="text-white/30">•</span>

              <Link
                href="/services/digital-marketing-services"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-white hover:bg-white/10 hover:text-accent transition duration-150"
              >
                <span>Digital Marketing</span>
              </Link>
              <span className="text-white/30">•</span>

              <Link
                href="/services/website-maintenance"
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-white hover:bg-white/10 hover:text-accent transition duration-150"
              >
                <span>Support &amp; Maintenance</span>
              </Link>
            </div>

            <Link
              href="/packages"
              className="ml-auto hidden md:inline-flex items-center gap-1 text-[11px] font-bold text-accent hover:text-accent-2 transition-colors shrink-0"
            >
              <span>View Packages →</span>
            </Link>
          </div>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <div className="border-t border-white/10 bg-[#10131e]/98 px-5 py-4 shadow-2xl backdrop-blur-2xl lg:hidden max-h-[75vh] overflow-y-auto">
            <div className="divide-y divide-white/5 space-y-1">
              {navLinks.map((l) => {
                if (l.mega) {
                  const isExpanded = mobileExpanded === l.label;
                  return (
                    <div key={l.label} className="py-2">
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(l.label)}
                        className="flex w-full items-center justify-between text-left text-sm font-semibold text-white/90 hover:text-accent"
                      >
                        <span>{l.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-accent" : ""}`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="mt-3 pl-3 space-y-4 border-l-2 border-accent/40">
                          {serviceMenu.map((cat) => (
                            <div key={cat.title} className="space-y-1.5">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                                {cat.title}
                              </p>
                              {cat.items.map((i) => (
                                <Link
                                  key={i.label}
                                  href={i.href}
                                  onClick={() => setOpen(false)}
                                  className="block py-1 text-xs text-white/80 hover:text-white"
                                >
                                  {i.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (l.dropdown) {
                  const isExpanded = mobileExpanded === l.label;
                  return (
                    <div key={l.label} className="py-2">
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(l.label)}
                        className="flex w-full items-center justify-between text-left text-sm font-semibold text-white/90 hover:text-accent"
                      >
                        <span>{l.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-accent" : ""}`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="mt-2 pl-3 space-y-1.5 border-l-2 border-accent/40">
                          {knowledgeHub.map((k) => (
                            <Link
                              key={k.label}
                              href={k.href}
                              onClick={() => setOpen(false)}
                              className="block py-1 text-xs text-white/80 hover:text-white"
                            >
                              {k.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-sm font-semibold text-white/90 hover:text-accent"
                  >
                    {l.label}
                  </Link>
                );
              })}

              <div className="pt-4">
                <Button
                  href="/"
                  onClick={openQuote}
                  className="w-full justify-center bg-gradient-to-r from-accent to-accent-2 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-lg"
                >
                  Get A Quote NOW
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
