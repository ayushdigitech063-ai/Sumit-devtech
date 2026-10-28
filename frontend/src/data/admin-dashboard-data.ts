import { Inbox, FolderKanban, FileText, Star } from "lucide-react";
import type { LeadStatus } from "@/types/leads";

export const stats = [
  { id: "leads", label: "New leads", value: "128", change: "+12%", icon: Inbox },
  { id: "projects", label: "Projects", value: "24", change: "+3", icon: FolderKanban },
  { id: "blogs", label: "Blog posts", value: "36", change: "+4", icon: FileText },
  { id: "testimonials", label: "Testimonials", value: "18", change: "+2", icon: Star },
];

export const serviceSplit = [
  { label: "Web design", value: 42 },
  { label: "Development", value: 31 },
  { label: "SEO and marketing", value: 27 },
];

export const latestLeads: {
  id: string; name: string; email: string; service: string; status: LeadStatus; date: string;
}[] = [
  { id: "1", name: "Rahul Sharma", email: "rahul@example.com", service: "Website design", status: "New", date: "Oct 26, 2026" },
  { id: "2", name: "Priya Mehta", email: "priya@example.com", service: "Shopify store", status: "In progress", date: "Oct 25, 2026" },
  { id: "3", name: "Amit Verma", email: "amit@example.com", service: "SEO services", status: "Won", date: "Oct 24, 2026" },
  { id: "4", name: "Neha Gupta", email: "neha@example.com", service: "React app", status: "New", date: "Oct 23, 2026" },
];