"use client";
import { Bell, Menu, Search } from "lucide-react";
import { useAdminSession } from "./AdminSession";

export default function AdminTopbar({ onMenu }: { onMenu: () => void }) {
  const { user } = useAdminSession();

  const initials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "AD"
    : "AD";
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line bg-white/80 px-4 py-3 backdrop-blur-xl sm:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white lg:hidden">
          <Menu size={20} />
        </button>
        <label className="relative hidden sm:block">
          <span className="sr-only">Search</span>
          <Search size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            placeholder="Search leads, posts, projects"
            className="h-11 w-72 rounded-full border border-line bg-white pl-11 pr-4 text-sm outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/15 lg:w-96"
          />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button aria-label="Notifications" className="relative grid h-11 w-11 place-items-center rounded-full border border-line bg-white">
          <Bell size={19} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-orange-500" />
        </button>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-bold text-white">{initials}</span>
      </div>
    </header>
  );
}