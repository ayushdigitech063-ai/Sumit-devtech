import type { LeadStatus } from "@/types/leads";

const styles: Record<LeadStatus, string> = {
  New: "bg-orange-100 text-orange-800",
  "In progress": "bg-blue-100 text-blue-800",
  Converted: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-rose-100 text-rose-800",
  Won: "bg-emerald-100 text-emerald-800",
  Lost: "bg-rose-100 text-rose-800",
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  const displayLabel = status === "Won" ? "Converted" : status === "Lost" ? "Cancelled" : status;
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${styles[status] || "bg-slate-100 text-slate-800"}`}>
      {displayLabel}
    </span>
  );
}
