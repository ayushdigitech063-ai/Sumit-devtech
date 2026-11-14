export interface ClientLogoItem {
  _id: string;
  name: string;
  logo: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export async function fetchPublicClients(): Promise<ClientLogoItem[]> {
  try {
    const res = await fetch("/api/clients", { cache: "no-store" });
    const data = await res.json();
    return data.success && Array.isArray(data.data) ? data.data : [];
  } catch {
    return [];
  }
}

export async function fetchAdminClients(): Promise<ClientLogoItem[]> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch("/api/clients/admin/all", {
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
    cache: "no-store",
  });
  const data = await res.json();
  return data.success && Array.isArray(data.data) ? data.data : [];
}

export async function createAdminClient(payload: { name: string; logo: string; order?: number }) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch("/api/clients/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateAdminClient(id: string, payload: Partial<ClientLogoItem>) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch(`/api/clients/admin/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token || ""}`,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteAdminClient(id: string) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch(`/api/clients/admin/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token || ""}`,
    },
  });
  return res.json();
}
