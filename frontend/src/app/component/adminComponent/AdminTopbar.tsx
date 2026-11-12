"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  ShieldCheck,
  Settings,
  ExternalLink,
  Phone,
  Mail,
  Clock,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { useAdminSession } from "./AdminSession";
import {
  fetchAdminNotifications,
  markNotificationsRead,
  type LeadItem,
} from "@/lib/leads-api";

export default function AdminTopbar({ onMenu }: { onMenu: () => void }) {
  const { user, logout } = useAdminSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<LeadItem[]>([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const initials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .map((p) => p[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "AD"
    : "AD";

  // Load real notifications from backend
  const loadNotifications = async () => {
    try {
      const res = await fetchAdminNotifications();
      if (res.success) {
        setUnreadCount(res.unreadCount);
        setNotifications(res.notifications || []);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 15000); // Poll every 15s for live new leads
    return () => clearInterval(interval);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await markNotificationsRead();
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200/80 bg-white px-4 py-3 sm:px-8 font-sans">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          aria-label="Open menu"
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 lg:hidden shadow-2xs"
        >
          <Menu size={19} />
        </button>

        {/* Search input with sleek design */}
        <label className="relative hidden sm:block">
          <span className="sr-only">Search</span>
          <Search size={16} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search leads, posts, projects..."
            className="h-10 w-72 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/15 lg:w-96"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification Bell with Real Lead Counter */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setDropdownOpen(false);
            }}
            aria-label="Notifications"
            className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-orange-600 transition shadow-2xs cursor-pointer"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-600 px-1 text-[10.5px] font-bold text-white shadow-sm ring-2 ring-white animate-pulse">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Drawer */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-3 text-slate-800 shadow-2xl shadow-slate-900/15 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2.5 px-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Lead Alerts</h3>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification Items List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 py-1">
                {notifications.length === 0 ? (
                  <div className="py-8 text-center text-xs text-slate-400">
                    No leads or notifications yet.
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className={`p-2.5 rounded-xl transition ${
                        !item.isRead ? "bg-orange-50/60" : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-semibold text-xs text-slate-900 flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {!item.isRead && (
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {new Date(item.createdAt).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <Phone size={11} className="text-slate-400" /> {item.phone}
                        </span>
                        <span className="truncate text-orange-700 font-medium">
                          {item.service || "Inquiry"}
                        </span>
                      </div>

                      <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="capitalize px-1.5 py-0.5 rounded bg-white border border-slate-200">
                          {item.source.replace("_", " ")}
                        </span>
                        <Link
                          href="/admin/leads"
                          onClick={() => setNotifOpen(false)}
                          className="font-semibold text-orange-600 hover:underline"
                        >
                          View Lead →
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-2 pt-2 border-t border-slate-100 text-center">
                <Link
                  href="/admin/leads"
                  onClick={() => setNotifOpen(false)}
                  className="block w-full py-1.5 rounded-xl text-center text-xs font-bold text-orange-600 hover:bg-orange-50 transition"
                >
                  View All Leads in Table →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown with Logout */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => {
              setDropdownOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50 transition shadow-2xs group cursor-pointer"
            aria-expanded={dropdownOpen}
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-xs font-bold text-white shadow-sm ring-2 ring-orange-500/20">
              {initials}
            </span>
            <div className="hidden sm:block text-left">
              <span className="block text-sm font-semibold text-slate-800 leading-tight">
                {user?.name || "Admin"}
              </span>
              <span className="block text-xs font-normal text-slate-400 truncate max-w-[120px]">
                {user?.email || "sumitdevtech@admin.com"}
              </span>
            </div>
            <ChevronDown
              size={15}
              className={`text-slate-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180 text-orange-500" : "group-hover:text-slate-600"
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 shadow-xl shadow-slate-900/10 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                  <span>{user?.name || "Admin"}</span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 border border-emerald-200">
                    <ShieldCheck size={11} /> Active
                  </span>
                </div>
                <div className="text-xs text-slate-400 truncate mt-0.5 font-normal">
                  {user?.email || "sumitdevtech@admin.com"}
                </div>
              </div>

              <div className="space-y-0.5">
                <Link
                  href="/admin/leads"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <Sparkles size={15} className="text-orange-500" />
                  <span>Lead Management</span>
                </Link>

                <Link
                  href="/admin/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <Settings size={15} className="text-slate-400" />
                  <span>Account Settings</span>
                </Link>

                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <ExternalLink size={15} className="text-slate-400" />
                    <span>View Live Website</span>
                  </span>
                  <span className="text-[10px] text-slate-400">New tab</span>
                </Link>
              </div>

              <div className="mt-1 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <LogOut size={15} className="text-red-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
