import React from "react";
import {
  Briefcase,
  Clock,
  Code2,
  GraduationCap,
  LucideIcon,
  MapPin,
  MessageCircle,
  Rocket,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Opening } from "@/data/career-data";

// Add an icon here, then use its name in career-data.ts
const icons: Record<string, LucideIcon> = {
  GraduationCap,
  MessageCircle,
  Code2,
  TrendingUp,
  Users,
  Rocket,
};

export function PerkIcon({
  name,
  size = 22,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = icons[name] ?? Rocket;
  return <Icon size={size} className={className} />;
}

// Location, job type and experience in one row
export function JobMeta({ job, className }: { job: Opening; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-sm", className)}>
      <li className="inline-flex items-center gap-1.5">
        <MapPin size={14} /> {job.location}
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Briefcase size={14} /> {job.type}
      </li>
      <li className="inline-flex items-center gap-1.5">
        <Clock size={14} /> {job.experience}
      </li>
    </ul>
  );
}

export const getDepartments = (openings: Opening[]) => [
  "All",
  ...Array.from(new Set(openings.map((o) => o.department))),
];

// Fade and slide up when scrolled into view (does nothing if the visitor prefers less motion)
export const fadeUp = (reduce: boolean | null, i = 0) => ({
  initial: { opacity: 0, y: reduce ? 0 : 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay: reduce ? 0 : i * 0.07 },
});