"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminNav } from "@/data/admin-navigation";

type Props = { open: boolean; onClose: () => void };

export default function AdminSidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-2xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0f1117] border-r border-white/10 px-4 py-6 transition-transform duration-300 lg:translate-x-0 font-sans shadow-2xl",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Logo Header */}
        <div className="mb-8 flex items-center justify-between px-2">
          <Link href="/admin" onClick={onClose} className="flex items-center gap-2 group">
            <Image
              src="/images/logo-white-text.png"
              alt="Sumit DevTech"
              width={200}
              height={50}
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Navigation
        </div>

        <nav aria-label="Admin" className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
          {adminNav.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200",
                  active
                    ? "bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/25 font-bold"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon size={18} className={active ? "text-white" : "text-slate-400"} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Version Badge */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-slate-400">Panel Version</span>
            </div>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-orange-500/15 text-orange-400 border border-orange-500/25">
              v2.4.0
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
