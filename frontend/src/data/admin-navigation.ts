import {
  LayoutDashboard, Inbox, FolderKanban, FileText, Package, Star, Settings,
  type LucideIcon,
} from "lucide-react";

export const adminNav: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Inbox },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Packages", href: "/admin/packages", icon: Package },
  { label: "Testimonials", href: "/admin/testimonials", icon: Star },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];