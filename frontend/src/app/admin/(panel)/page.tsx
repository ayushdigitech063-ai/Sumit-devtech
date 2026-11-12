"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ArrowUpRight, TrendingUp, Users, Layers, Inbox, FolderKanban, FileText, Star, RefreshCw } from "lucide-react";
import StatCard from "@/app/component/adminComponent/StatusCard";
import StatusBadge from "@/app/component/adminComponent/StatusBadge";
import { fetchDashboardSummary, type LeadItem } from "@/lib/leads-api";

// Refined SVG curved chart line
const LINE = "M0 130 C70 120 120 75 190 85 S290 45 360 60 S460 25 520 40 S580 15 620 20";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    inProgressLeads: 0,
    wonLeads: 0,
  });
  const [latestLeads, setLatestLeads] = useState<LeadItem[]>([]);
  const [serviceSplit, setServiceSplit] = useState<{ label: string; value: number }[]>([
    { label: "Web design", value: 45 },
    { label: "Next.js / Custom Code", value: 30 },
    { label: "E-Commerce / Shopify", value: 25 },
  ]);
  const [loading, setLoading] = useState(true);

  const loadSummary = async () => {
    try {
      const res = await fetchDashboardSummary();
      if (res.success) {
        setStats(res.stats);
        if (res.latestLeads && res.latestLeads.length > 0) {
          setLatestLeads(res.latestLeads);
        }
        if (res.serviceSplit && res.serviceSplit.length > 0) {
          const total = res.serviceSplit.reduce((acc, curr) => acc + curr.count, 0) || 1;
          setServiceSplit(
            res.serviceSplit.map((s) => ({
              label: s._id || "Other Services",
              value: Math.round((s.count / total) * 100),
            }))
          );
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
    const interval = setInterval(loadSummary, 15000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      id: "leads",
      label: "Total leads",
      value: String(stats.totalLeads),
      change: `+${stats.newLeads} new`,
      icon: Inbox,
    },
    {
      id: "in_progress",
      label: "In progress",
      value: String(stats.inProgressLeads),
      change: "Active",
      icon: FolderKanban,
    },
    {
      id: "won",
      label: "Won (Closed)",
      value: String(stats.wonLeads),
      change: "Converted",
      icon: Star,
    },
    {
      id: "blogs",
      label: "Published blogs",
      value: "36",
      change: "+4 live",
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-6 font-sans pb-10 text-slate-800">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-black">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time client leads & inquiries overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
          >
            <Users size={16} className="text-slate-400" />
            <span>Manage All Leads ({stats.totalLeads})</span>
          </Link>

          <button
            onClick={loadSummary}
            title="Refresh statistics"
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 shadow-2xs"
          >
            <RefreshCw size={15} className={loading ? "animate-spin text-orange-500" : ""} />
          </button>
        </div>
      </div>

      {/* 4 Metric Counter Cards */}
      <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((s) => (
          <StatCard key={s.id} {...s} />
        ))}
      </div>

      {/* Middle Analytics: Leads Trend Graph + Service Share Breakdown */}
      <div className="grid gap-6 xl:grid-cols-[1.75fr_1fr]">
        {/* Interactive Growth Wave Chart Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-black">
                  Leads over time
                </h2>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <TrendingUp size={12} /> Live Inquiries
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Real-time submissions through Chatbot, Exit Modal & Contact Forms</p>
            </div>

            <div className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-50 p-1 rounded-lg border border-slate-200">
              <span className="px-2.5 py-1 bg-white rounded-md shadow-2xs text-slate-900 font-semibold">Monthly</span>
              <span className="px-2 py-1 text-slate-400">Quarterly</span>
            </div>
          </div>

          <div className="relative mt-4">
            <svg
              viewBox="0 0 620 180"
              role="img"
              aria-label="Leads per month graph"
              className="h-56 w-full text-orange-500 overflow-visible"
            >
              <defs>
                <linearGradient id="adminWaveGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff6a1f" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="620" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="620" y2="90" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="620" y2="140" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

              {/* Gradient Area Fill */}
              <path d={`${LINE} L620 180 L0 180Z`} fill="url(#adminWaveGlow)" />

              {/* Wave Stroke */}
              <path
                d={LINE}
                fill="none"
                stroke="#ff6a1f"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Highlight Target Indicator Dot at Peak */}
              <circle cx="600" cy="22" r="4.5" fill="#ff6a1f" stroke="#ffffff" strokeWidth="2.5" />
            </svg>

            <div className="flex items-center justify-between text-xs text-slate-400 mt-2 px-1">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct (Peak)</span>
            </div>
          </div>
        </section>

        {/* Breakdown by Service Card */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-black">
                  Leads by service
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Top requested services from clients</p>
              </div>
              <span className="p-1.5 rounded-lg bg-orange-50 text-orange-600 border border-orange-100">
                <Layers size={16} />
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {serviceSplit.map((s, idx) => (
                <div key={s.label}>
                  <div className="mb-1.5 flex justify-between text-sm font-medium">
                    <span className="text-slate-700">{s.label}</span>
                    <span className="font-semibold text-slate-900">{s.value}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        idx === 0
                          ? "bg-orange-500"
                          : idx === 1
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Database Lead Sync</span>
            <span className="font-semibold text-emerald-600">Active</span>
          </div>
        </section>
      </div>

      {/* Latest Leads Table Card */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-black">
              Latest enquiries & leads
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Live incoming inquiries from website visitors</p>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700 transition"
          >
            <span>View all leads</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[580px] text-left text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500">
                <th className="px-4 py-3">NAME & CONTACT</th>
                <th className="px-4 py-3">SERVICE</th>
                <th className="px-4 py-3">SOURCE</th>
                <th className="px-4 py-3">STATUS</th>
                <th className="px-4 py-3">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {latestLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-400">
                    No leads generated yet. When a visitor submits a quote or contacts you, it will appear here!
                  </td>
                </tr>
              ) : (
                latestLeads.map((l) => (
                  <tr key={l._id} className="transition-colors hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className="block font-semibold text-slate-800 text-sm">{l.name}</span>
                      <span className="text-xs text-slate-500 font-normal">{l.phone}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 font-normal">
                      {l.service || "General"}
                    </td>
                    <td className="px-4 py-3 text-xs capitalize text-slate-500">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                        {l.source.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={l.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-400 font-normal">
                      {new Date(l.createdAt).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
