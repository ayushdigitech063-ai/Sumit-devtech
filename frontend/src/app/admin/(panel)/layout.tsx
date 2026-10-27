import AdminShell from "@/app/component/adminComponent/AdminShell";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}