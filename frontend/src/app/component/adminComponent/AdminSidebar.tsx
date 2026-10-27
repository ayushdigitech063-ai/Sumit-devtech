"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";
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
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-dark px-4 py-6 transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-8 flex items-start justify-between px-3">
          <Link href="/admin" onClick={onClose}>
            <span className="block font-heading text-2xl font-extrabold text-white">SUMIT</span>
            <span className="inline-block bg-yellow-400 px-2 text-[9px] font-extrabold tracking-[0.3em] text-ink">
              DEVTECH
            </span>
          </Link>
          <button onClick={onClose} aria-label="Close menu" className="grid h-9 w-9 place-items-center text-white/70 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Admin" className="flex flex-col gap-1">
          {adminNav.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition",
                  active
                    ? "bg-brand text-white shadow-lg shadow-accent/30"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon size={19} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center gap-3 rounded-2xl bg-white/10 p-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">AD</span>
          <div className="min-w-0 flex-1 text-sm font-bold text-white">
            Admin
            <div className="truncate text-xs font-semibold text-white/70">admin@yourdomain.com</div>
          </div>
          <Link href="/admin/login" aria-label="Sign out" className="grid h-9 w-9 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white">
            <LogOut size={18} />
          </Link>
        </div>
      </aside>
    </>
  );
}