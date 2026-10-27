"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f6f9] text-ink">
      <AdminSidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-64">
        <AdminTopbar onMenu={() => setOpen(true)} />
        <main className="p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}