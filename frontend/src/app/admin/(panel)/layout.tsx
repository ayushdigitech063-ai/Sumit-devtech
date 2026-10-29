import AdminShell from "@/app/component/adminComponent/AdminShell";
import { AdminSession } from "@/app/component/adminComponent/AdminSession";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSession>
      <AdminShell>{children}</AdminShell>
    </AdminSession>
  );
}