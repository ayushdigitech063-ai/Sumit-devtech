import type { LeadStatus } from "@/types/leads";

const styles: Record<LeadStatus, string> = {
  New: "bg-orange-100 text-orange-800",
  "In progress": "bg-blue-100 text-blue-800",
  Won: "bg-green-100 text-green-800",
  Lost: "bg-red-100 text-red-800",
};

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}>
      {status}
    </span>
  );
}