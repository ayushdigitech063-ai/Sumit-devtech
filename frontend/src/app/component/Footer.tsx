"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa6";
import Container from "../ui/Container";
import Logo from "./Logo";
import Ctaband from "./Ctaband";
import { site } from "@/data/site";
import { quickLinks, footerServices } from "@/data/navigations";
import { usePathname } from "next/navigation";

const socials = [
  { icon: FaFacebookF, href: site.social.facebook, label: "Facebook" },
  { icon: FaLinkedinIn, href: site.social.linkedin, label: "LinkedIn" },
  { icon: FaInstagram, href: site.social.instagram, label: "Instagram" },
  { icon: FaPinterestP, href: site.social.pinterest, label: "Pinterest" },
];

const chips = [
  "Global Solutions",
  "Innovative Ideas",
  "Secure & Reliable",
  "Performance Driven",
];

const MAP =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d222.4589007694437!2d75.75856075232439!3d26.86086013947661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5b1fb7df14f%3A0x6f91323404d6895d!2sSumit%20DevTech!5e0!3m2!1sen!2sin!4v1769665936895!5m2!1sen!2sin";

const linkCls =
  "block py-1 text-white/60 transition hover:translate-x-1 hover:text-accent";

export default function Footer() {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      {pathname !== "/career" && <Ctaband />}

      <footer
        ref={footerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden bg-[#070e1d] text-white/70 border-t border-white/10 select-none"
      >
        {/* ==========================================================
            INTERACTIVE MOUSE-FOLLOWING GIANT "SUMIT DEV TECH" WATERMARK
           ========================================================== */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0"
        >
          {/* Base Layer: Subtle Hollow Outline Text */}
          <span
            className="w-full text-center font-heading font-black tracking-wider uppercase select-none opacity-20"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 8rem)",
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
              color: "transparent",
              lineHeight: 1,
            }}
          >
            SUMIT DEVTECH
          </span>

          {/* Reveal Layer: Illuminated Gradient Hologram Revealed by Cursor Torch */}
          <span
            className="w-full text-center font-heading font-black tracking-wider uppercase select-none absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 8rem)",
              backgroundImage: "linear-gradient(135deg, #ff6a1f 0%, #ffb703 50%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1,
              opacity: isHovered ? 0.95 : 0,
              maskImage: `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 80%)`,
              WebkitMaskImage: `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 80%)`,
            }}
          >
            SUMIT DEVTECH
          </span>
        </div>

        {/* Ambient Torch Glow following mouse */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[120px] transition-opacity duration-300 z-0"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Main Content Grid (Elevated with relative z-10) */}
        <Container className="relative z-10 grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.2fr]">
          {/* Company Information */}
          <div>
            <Logo />

            <p className="mb-3 mt-3 max-w-sm text-xs leading-5">
              Web design, development and digital marketing company in Jaipur -
              building fast, secure and SEO-ready websites for businesses
              worldwide.
            </p>

            <ul className="mb-4 grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs font-medium text-white">
              {chips.map((c) => (
                <li key={c} className="flex items-center gap-1.5">
                  <Check size={13} className="shrink-0 text-accent" />
                  {c}
                </li>
              ))}
            </ul>

            <div className="flex gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-brand"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-3 text-base font-bold text-white">Quick Links</h4>

            {quickLinks.map((l) => (
              <Link key={l.label} href={l.href} className={linkCls}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 text-base font-bold text-white">Services</h4>

            {footerServices.map((l) => (
              <Link key={l.label} href={l.href} className={linkCls}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact Information */}
          <div className="text-xs">
            <h4 className="mb-3 text-base font-bold text-white">Contact Us</h4>

            <a
              href={`tel:${site.phones[0].replace(/-/g, "")}`}
              className="mb-2 flex items-center gap-2 hover:text-accent text-white/90"
            >
              <Phone size={14} className="shrink-0 text-accent" />
              {site.phones[0]}
            </a>

            <a
              href={`mailto:${site.email}`}
              className="mb-2 flex items-center gap-2 hover:text-accent text-white/90"
            >
              <Mail size={14} className="shrink-0 text-accent" />
              {site.email}
            </a>

            <p className="mb-3 flex gap-2 text-white/70">
              <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
              {site.address}
            </p>
          </div>
        </Container>

        {/* Copyright */}
        <div className="relative z-10 border-t border-white/10 bg-[#050a14]/60 backdrop-blur-sm">
          <Container className="flex flex-wrap items-center justify-between gap-2 py-4 text-xs">
            <p>© Copyright 2026 | Powered by Sumit DevTech</p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 mr-24">
              <Link href="#" className="hover:text-accent">
                Privacy Policy
              </Link>

              <Link href="#" className="hover:text-accent">
                Support
              </Link>

              <Link href="#" className="hover:text-accent">
                Terms &amp; Conditions
              </Link>
            </div>
          </Container>
        </div>
      </footer>
    </>
  );
}
