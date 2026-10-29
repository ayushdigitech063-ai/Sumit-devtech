"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Logo from "./Logo";
import { navLinks, serviceMenu, knowledgeHub } from "@/data/navigations";



export default function Header() {
  const [open, setOpen] = useState(false);

 const openQuote = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();                                  
  setOpen(false);                                      
  window.dispatchEvent(new Event("open-quote-modal"));
};

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark/85 text-white backdrop-blur-xl">
      <Container className="relative flex items-center justify-between">
        <div className="py-3 pl-25"><Logo /></div>

        {/* desktop */}
        <nav className="hidden items-center gap-8 pr-25 text-sm font-medium lg:flex">
          {navLinks.map((l) =>
            l.mega ? (
              <div key={l.label} className="group py-5">
                <Link href={l.href} className="flex items-center gap-1 text-white/80 transition hover:text-white">
                  {l.label} <ChevronDown size={15} className="transition group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute inset-x-0 top-full translate-y-2 opacity-0 transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-3 gap-8 rounded-b-2xl border border-white/10 bg-dark-2 p-3 shadow-2xl">
                    {serviceMenu.map((g) => (
                      <div key={g.title}>
                        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">{g.title}</p>
                        {g.items.map((i) => (
                          <Link key={i.label} href={i.href} className="block rounded-xl p-2 transition hover:bg-white/5">
                            <span className="block font-semibold">{i.label}</span>
                            <span className="text-xs text-white/50">{i.desc}</span>
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) 
             : l.dropdown ? (
              <div key={l.label} className="group relative py-5">
                <Link
                  href={l.href}
                  className="flex items-center gap-1 whitespace-nowrap text-white/80 transition hover:text-white"
                >
                  {l.label}
                  <ChevronDown size={15} className="transition group-hover:rotate-180 group-focus-within:rotate-180" />
                </Link>

                <div className="invisible absolute left-0 top-full translate-y-2 opacity-0 transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-b-2xl border border-white/10 bg-dark-2 p-1.5 shadow-2xl">
                    {knowledgeHub.map((k) => (
                      <Link
                        key={k.label}
                        href={k.href}
                        className="block whitespace-nowrap rounded-lg px-3 py-2.5 text-accent transition hover:bg-white/5"
                      >
                        {k.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={l.label} href={l.href} className="text-white/80 transition hover:text-white">
                {l.label}
              </Link>
            )
          )}
          
          <Button href="#" onClick={openQuote} className="!px-6 !py-2.5">Get A Quote NOW</Button>
        </nav>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </Container>

      {/* mobile */}
      {open && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-white/10 bg-dark px-6 py-5 lg:hidden">
          {navLinks.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} className="block py-3 font-medium">
              {l.label}
            </Link>
          ))}
          <Button href="#" onClick={openQuote} className="mt-3">Get A Quote NOW</Button>
        </div>
      )}
    </header>
  );
}