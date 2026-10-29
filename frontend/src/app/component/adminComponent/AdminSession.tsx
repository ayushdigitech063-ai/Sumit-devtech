"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import type { AdminUser } from "@/types/auth";
import { getMe, logoutRequest } from "@/lib/auth-api";

type AdminSessionContextType = {
  user: AdminUser;
  logout: () => Promise<void>;
};

const AdminSessionContext = createContext<AdminSessionContextType | null>(null);

export function AdminSession({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const res = await getMe();
        if (mounted) {
          setUser(res.user);
          setLoading(false);
        }
      } catch {
        if (mounted) {
          router.replace("/admin/login");
        }
      }
    }

    checkSession();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function logout() {
    try {
      await logoutRequest();
    } catch {
      // ignore logout network errors and proceed with redirect
    } finally {
      router.replace("/admin/login");
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f9] text-ink">
        <p role="status" className="text-sm font-semibold text-muted">
          Checking your session...
        </p>
      </div>
    );
  }

  return (
    <AdminSessionContext.Provider value={{ user, logout }}>
      {children}
    </AdminSessionContext.Provider>
  );
}

export function useAdminSession() {
  const context = useContext(AdminSessionContext);
  if (!context) {
    throw new Error("useAdminSession must be used within an AdminSession provider");
  }
  return context;
}

