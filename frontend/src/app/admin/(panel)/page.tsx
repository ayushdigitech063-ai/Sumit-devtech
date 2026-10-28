import Link from "next/link";
import { Plus } from "lucide-react";
import StatCard from "@/app/component/adminComponent/StatusCard";
import StatusBadge from "@/app/component/adminComponent/StatusBadge";
import { stats, serviceSplit, latestLeads } from "@/data/admin-dashboard-data";

export const metadata = { title: "Dashboard" };

const LINE = "M0 150 C60 140 90 90 150 100 S250 60 310 80 S420 40 480 55 S560 20 600 30";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-extrabold">Dashboard</h1>
          <p className="mt-1 text-sm text-muted">Everything happening on your website, at a glance.</p>
        </div>
        <Link href="/admin/blogs" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-lg shadow-accent/30 transition hover:-translate-y-0.5">
          <Plus size={18} aria-hidden="true" /> New post
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => <StatCard key={s.id} {...s} />)}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <section className="rounded-3xl border border-line bg-white p-6">
          <h2 className="text-lg font-extrabold">Leads over time</h2>
          <svg viewBox="0 0 600 200" role="img" aria-label="Leads per month, sample data" className="mt-4 h-56 w-full text-orange-500">
            <defs>
              <linearGradient id="adminFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={`${LINE} L600 200 L0 200Z`} fill="url(#adminFill)" />
            <path d={LINE} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </section>

        <section className="rounded-3xl border border-line bg-white p-6">
          <h2 className="text-lg font-extrabold">Leads by service</h2>
          <div className="mt-5 space-y-5">
            {serviceSplit.map((s) => (
              <div key={s.label}>
                <div className="mb-2 flex justify-between text-sm font-bold"><span>{s.label}</span><span>{s.value}%</span></div>
                <div className="h-2.5 rounded-full bg-slate-100">
                  <div className="h-2.5 rounded-full bg-brand" style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-line bg-white p-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-extrabold">Latest enquiries</h2>
          <Link href="/admin/leads" className="text-sm font-bold text-orange-700">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                <th className="px-3 py-3">Name</th><th className="px-3 py-3">Service</th>
                <th className="px-3 py-3">Status</th><th className="px-3 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {latestLeads.map((l) => (
                <tr key={l.id} className="border-b border-slate-100 font-semibold last:border-0">
                  <td className="px-3 py-4"><b>{l.name}</b><div className="text-xs text-muted">{l.email}</div></td>
                  <td className="px-3 py-4">{l.service}</td>
                  <td className="px-3 py-4"><StatusBadge status={l.status} /></td>
                  <td className="px-3 py-4 text-muted">{l.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}