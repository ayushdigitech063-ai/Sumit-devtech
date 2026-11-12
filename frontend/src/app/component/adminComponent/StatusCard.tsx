import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

type Props = { label: string; value: string; change: string; icon: LucideIcon };

export default function StatCard({ label, value, change, icon: Icon }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300">
      {/* Top Row: Label & Icon */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {label}
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-500">
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>

      {/* Number Metric */}
      <div className="mt-2.5 text-[28px] font-bold text-slate-900 leading-tight">
        {value}
      </div>

      {/* Comparison Badge */}
      <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
        <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-semibold text-emerald-700 bg-emerald-50">
          <TrendingUp size={11} /> {change}
        </span>
        <span className="text-slate-400">vs last month</span>
      </div>
    </div>
  );
}
