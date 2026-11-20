"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { adminNav } from "@/data/admin-navigation";

type Props = { open: boolean; onClose: () => void };

export default function AdminSidebar({ open, onClose }: Props) {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    "Dynamic Services": true,
  });

  const toggleSubmenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  };

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

        <nav aria-label="Admin" className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-1">
          {adminNav.map((item) => {
            const Icon = item.icon;

            // If item has children (dropdown like Dynamic Services)
            if (item.children) {
              const isChildActive = item.children.some((child) => isActive(child.href));
              const isOpen = openMenus[item.label] ?? isChildActive;

              return (
                <div key={item.label} className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.label)}
                    className={cn(
                      "flex items-center justify-between w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                      isChildActive
                        ? "text-orange-400 bg-white/5 font-bold"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isChildActive ? "text-orange-400" : "text-slate-400"} />
                      <span>{item.label}</span>
                    </div>
                    {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  </button>

                  {/* Submenu links */}
                  {isOpen && (
                    <div className="pl-6 flex flex-col gap-1 border-l border-white/10 ml-5 my-0.5">
                      {item.children.map((child) => {
                        const active = isActive(child.href);
                        const ChildIcon = child.icon;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-150",
                              active
                                ? "bg-orange-500 text-white font-bold shadow-sm shadow-orange-500/30"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                          >
                            {ChildIcon && <ChildIcon size={14} />}
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Normal link
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href || "#"}
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
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Version Badge */}
        <div className="mt-auto border-t border-white/10 pt-4 px-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-400">
              <Sparkles size={12} className="text-orange-400" />
              Sumit DevTech v2.4
            </span>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Active
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
