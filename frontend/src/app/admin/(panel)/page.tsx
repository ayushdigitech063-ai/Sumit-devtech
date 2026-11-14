"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ArrowUpRight, TrendingUp, Users, Layers, Inbox, FolderKanban, FileText, Star, RefreshCw } from "lucide-react";
import StatCard from "@/app/component/adminComponent/StatusCard";
import StatusBadge from "@/app/component/adminComponent/StatusBadge";
import { fetchDashboardSummary, type LeadItem } from "@/lib/leads-api";
import { fetchPublicBlogs } from "@/lib/blogs-api";

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
  const [serviceSplit, setServiceSplit] = useState<{ label: string; value: number }[]>([]);
  const [timeline, setTimeline] = useState<{ label: string; count: number }[]>([]);
  const [timeView, setTimeView] = useState<"Monthly" | "Quarterly">("Monthly");
  const [totalBlogs, setTotalBlogs] = useState<number>(2);
  const [loading, setLoading] = useState(true);

  const loadSummary = async () => {
    try {
      const [res, blogsRes] = await Promise.all([
        fetchDashboardSummary(),
        fetchPublicBlogs(),
      ]);

      if (blogsRes && blogsRes.success && Array.isArray(blogsRes.data)) {
        setTotalBlogs(blogsRes.data.length);
      }

      if (res.success) {
        setStats(res.stats);
        if (res.latestLeads) {
          setLatestLeads(res.latestLeads);
        }

        if (res.timeline && res.timeline.length > 0) {
          setTimeline(res.timeline);
        }

        if (res.serviceSplit && res.serviceSplit.length > 0) {
          const total = res.serviceSplit.reduce((acc, curr) => acc + curr.count, 0) || 1;
          setServiceSplit(
            res.serviceSplit.map((s) => ({
              label: s._id || "General Inquiry",
              value: Math.round((s.count / total) * 100),
            }))
          );
        } else {
          setServiceSplit([]);
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
      label: "Converted Leads",
      value: String(stats.wonLeads),
      change: "Converted",
      icon: Star,
    },
    {
      id: "blogs",
      label: "Published blogs",
      value: String(totalBlogs),
      change: `${totalBlogs} live`,
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
              <button
                type="button"
                onClick={() => setTimeView("Monthly")}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  timeView === "Monthly"
                    ? "bg-white shadow-2xs text-slate-900 font-semibold"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setTimeView("Quarterly")}
                className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                  timeView === "Quarterly"
                    ? "bg-white shadow-2xs text-slate-900 font-semibold"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Quarterly
              </button>
            </div>
          </div>

          <div className="relative mt-6">
            {/* Dynamic Interactive Chart from Real Database Leads */}
            <div className="h-56 w-full flex items-end justify-between gap-3 px-2 pt-6">
              {timeline.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                  Waiting for initial lead timeline entries...
                </div>
              ) : (
                timeline.map((item, idx) => {
                  const maxVal = Math.max(...timeline.map((t) => t.count), 1);
                  const heightPercent = Math.max(Math.round((item.count / maxVal) * 100), 14);
                  const isLatest = idx === timeline.length - 1;

                  return (
                    <div key={item.label} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      <span className="text-[11px] font-bold text-slate-800 opacity-80 group-hover:scale-110 transition">
                        {item.count}
                      </span>

                      <div className="w-full max-w-[48px] h-full flex items-end">
                        <div
                          className={`w-full rounded-t-xl transition-all duration-700 ${
                            isLatest
                              ? "bg-gradient-to-t from-orange-600 to-amber-500 shadow-md shadow-orange-500/20"
                              : "bg-slate-200 hover:bg-orange-300"
                          }`}
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>

                      <span className={`text-xs font-semibold ${isLatest ? "text-orange-600 font-bold" : "text-slate-400"}`}>
                        {item.label}
                        {isLatest && " (Now)"}
                      </span>
                    </div>
                  );
                })
              )}
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
              {serviceSplit.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No leads recorded yet.</p>
              ) : (
                serviceSplit.map((s, idx) => (
                  <div key={s.label}>
                    <div className="mb-1.5 flex justify-between text-sm font-medium">
                      <span className="text-slate-700 truncate max-w-[200px]">{s.label}</span>
                      <span className="font-semibold text-slate-900">{s.value}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          idx === 0
                            ? "bg-orange-500"
                            : idx === 1
                            ? "bg-amber-500"
                            : idx === 2
                            ? "bg-blue-500"
                            : "bg-emerald-500"
                        }`}
                        style={{ width: `${s.value}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Database Lead Sync</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Dynamic
            </span>
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
