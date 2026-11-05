"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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
    <header className="fixed top-0 inset-x-0 z-50 pt-4 sm:pt-5 transition-all duration-300 pointer-events-none">
      <div className="mx-auto w-full max-w-5xl px-4 relative">
        {/* Floating Pill Navbar with slightly taller height & clear font */}
        <div className="pointer-events-auto relative flex items-center justify-between rounded-full border border-white/15 bg-dark/85 px-6 py-2.5 shadow-2xl backdrop-blur-xl">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation with increased font & comfortable spacing */}
          <nav className="hidden items-center gap-6 text-[13.5px] font-medium lg:flex">
            {navLinks.map((l) =>
              l.mega ? (
                <div key={l.label} className="group py-2">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-white/85 transition duration-200 hover:text-white focus:outline-none"
                  >
                    <span>{l.label}</span>
                    <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <div className="invisible absolute left-1/2 -translate-x-1/2 top-full w-full max-w-3xl pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-2xl border border-white/10 bg-dark-2/95 p-6 shadow-2xl backdrop-blur-2xl">
                      <div className="grid grid-cols-3 gap-6">
                        {serviceMenu.map((g) => (
                          <div key={g.title} className="space-y-2.5">
                            <p className="border-b border-white/10 pb-1.5 text-xs font-bold uppercase tracking-wider text-accent">
                              {g.title}
                            </p>
                            <div className="space-y-1">
                              {g.items.map((i) => (
                                <Link
                                  key={i.label}
                                  href={i.href}
                                  className="group/item block rounded-lg p-2 transition duration-150 hover:bg-white/5"
                                >
                                  <span className="block text-sm font-semibold text-white transition group-hover/item:text-accent">
                                    {i.label}
                                  </span>
                                  <span className="text-xs text-white/50 group-hover/item:text-white/70">
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
                    className="flex items-center gap-1.5 whitespace-nowrap text-white/85 transition duration-200 hover:text-white focus:outline-none"
                  >
                    <span>{l.label}</span>
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
                    />
                  </button>

                  {/* Standard Dropdown with Light / Dark theme polish */}
                  <div className="invisible absolute left-1/2 -translate-x-1/2 top-full min-w-[210px] pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#14151a]/95 p-2 shadow-2xl backdrop-blur-2xl">
                      {knowledgeHub.map((k) => (
                        <Link
                          key={k.label}
                          href={k.href}
                          className="block rounded-xl px-4 py-2.5 text-xs font-semibold text-white/85 transition-all duration-200 hover:bg-white/10 hover:text-accent"
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
                  className="text-white/85 transition duration-200 hover:text-white"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center">
            <Button href="#" onClick={openQuote} className="!rounded-full !px-5 !py-2 text-[13px] font-semibold shadow-md">
              Get A Quote NOW
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="rounded-full p-2 text-white hover:bg-white/10 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <div className="pointer-events-auto mt-2 max-h-[75vh] overflow-y-auto rounded-2xl border border-white/10 bg-dark/95 p-5 shadow-2xl backdrop-blur-2xl lg:hidden">
            <div className="divide-y divide-white/5 space-y-1">
              {navLinks.map((l) => {
                if (l.mega) {
                  const isExpanded = mobileExpanded === l.label;
                  return (
                    <div key={l.label} className="py-2">
                      <button
                        type="button"
                        onClick={() => toggleMobileSubmenu(l.label)}
                        className="flex w-full items-center justify-between py-1.5 text-left text-sm font-medium text-white/90 hover:text-white"
                      >
                        <span>{l.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-accent" : "text-white/60"}`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="mt-2 space-y-3 rounded-xl bg-white/[0.04] p-3 border border-white/5">
                          {serviceMenu.map((g) => (
                            <div key={g.title} className="space-y-1">
                              <p className="text-xs font-bold uppercase tracking-wider text-accent">
                                {g.title}
                              </p>
                              <div className="pl-2 space-y-1">
                                {g.items.map((i) => (
                                  <Link
                                    key={i.label}
                                    href={i.href}
                                    onClick={() => setOpen(false)}
                                    className="block py-1 text-xs text-white/70 hover:text-white"
                                  >
                                    {i.label}
                                  </Link>
                                ))}
                              </div>
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
                        className="flex w-full items-center justify-between py-1.5 text-left text-sm font-medium text-white/90 hover:text-white"
                      >
                        <span>{l.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-180 text-accent" : "text-white/60"}`}
                        />
                      </button>
                      {isExpanded && (
                        <div className="mt-2 space-y-1 rounded-xl bg-white/[0.04] p-2.5 border border-white/5">
                          {knowledgeHub.map((k) => (
                            <Link
                              key={k.label}
                              href={k.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2 text-xs text-white/80 hover:bg-white/5 hover:text-white"
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
                  <div key={l.label} className="py-2">
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block py-1.5 text-sm font-medium text-white/90 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 pb-1">
              <Button href="#" onClick={openQuote} className="w-full justify-center !rounded-full !py-2.5 text-xs">
                Get A Quote NOW
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
