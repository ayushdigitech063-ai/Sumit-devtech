import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  FileText,
  Package,
  Briefcase,
  Star,
  Users,
  Building2,
  MapPin,
  Layers,
  PlusCircle,
  List,
  Globe,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  children?: { label: string; href: string; icon?: LucideIcon }[];
}

export const adminNav: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  {
    label: "Dynamic Services",
    icon: Layers,
    children: [
      { label: "All Services", href: "/admin/services", icon: List },
      { label: "Add New Service", href: "/admin/services/create", icon: PlusCircle },
    ],
  },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Careers & Jobs", href: "/admin/careers", icon: Briefcase },
  { label: "Team Members", href: "/admin/team", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Client Logos", href: "/admin/clients", icon: Building2 },
  { label: "SEO & Meta Manager", href: "/admin/seo", icon: Globe },
  { label: "City Sitemaps & SEO", href: "/admin/sitemap", icon: MapPin },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];
