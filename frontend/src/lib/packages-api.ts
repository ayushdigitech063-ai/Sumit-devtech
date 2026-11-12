import { apiFetch } from "./api";

export interface PackagePlanItem {
  _id: string;
  name: string;
  category: string;
  tagline: string;
  price: string;
  period: string;
  deliveryTime: string;
  idealFor: string;
  popular: boolean;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export async function fetchPublicPackages() {
  try {
    const res = await fetch("/api/packages", { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, data: [] };
  }
}

export async function createAdminPackage(payload: Partial<PackagePlanItem>) {
  return apiFetch<{ success: boolean; message: string; data: PackagePlanItem }>("/packages", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAdminPackage(id: string, payload: Partial<PackagePlanItem>) {
  return apiFetch<{ success: boolean; message: string; data: PackagePlanItem }>(`/packages/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminPackage(id: string) {
  return apiFetch<{ success: boolean; message: string }>(`/packages/${id}`, {
    method: "DELETE",
  });
}
