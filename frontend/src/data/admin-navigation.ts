import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  FileText,
  Package,
  Briefcase,
  Star,
  Building2,
  MapPin,
  Settings,
  type LucideIcon,
} from "lucide-react";

export const adminNav: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Careers & Jobs", href: "/admin/careers", icon: Briefcase },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Client Logos", href: "/admin/clients", icon: Building2 },
  { label: "City Sitemaps & SEO", href: "/admin/sitemap", icon: MapPin },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];
