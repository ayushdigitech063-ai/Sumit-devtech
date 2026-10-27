import type { LucideIcon } from "lucide-react";

type Props = { label: string; value: string; change: string; icon: LucideIcon };

export default function StatCard({ label, value, change, icon: Icon }: Props) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6">
      <div className="flex items-center justify-between text-sm font-bold text-muted">
        {label}
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-700">
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <div className="mt-3 font-heading text-4xl font-extrabold">{value}</div>
      <p className="mt-1 text-sm text-muted">
        <b className="text-green-700">{change}</b> vs last month
      </p>
    </div>
  );
}