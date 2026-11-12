import { apiFetch } from "./api";

export interface LeadSubmission {
  name: string;
  email?: string;
  phone: string;
  service?: string;
  source: "contact_form" | "quote_popup" | "chatbot" | "package_unlock" | "career_apply";
  message?: string;
  countryCode?: string;
  metadata?: Record<string, any>;
}

export interface LeadItem {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  service?: string;
  source: "contact_form" | "quote_popup" | "chatbot" | "package_unlock" | "career_apply";
  status: "New" | "In progress" | "Won" | "Lost";
  message?: string;
  countryCode?: string;
  metadata?: Record<string, any>;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

// Public API call: submit a new lead from anywhere on the website
export async function submitLead(payload: LeadSubmission): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Failed to submit lead:", error);
    return { success: false, message: error.message || "Failed to submit lead." };
  }
}

// Admin API calls
export async function fetchAdminLeads(params?: { status?: string; source?: string; search?: string; page?: number; limit?: number }) {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.source) query.set("source", params.source);
  if (params?.search) query.set("search", params.search);
  if (params?.page) query.set("page", String(params.page));
  if (params?.limit) query.set("limit", String(params.limit));

  return apiFetch<{ success: boolean; data: LeadItem[]; total: number; unreadCount: number; page: number; totalPages: number }>(
    `/leads?${query.toString()}`
  );
}

export async function fetchAdminNotifications() {
  return apiFetch<{ success: boolean; unreadCount: number; notifications: LeadItem[] }>("/leads/notifications");
}

export async function markNotificationsRead(leadId?: string) {
  return apiFetch<{ success: boolean; message: string }>("/leads/notifications/read", {
    method: "POST",
    body: JSON.stringify({ leadId }),
  });
}

export async function updateAdminLeadStatus(id: string, status: "New" | "In progress" | "Won" | "Lost") {
  return apiFetch<{ success: boolean; data: LeadItem }>(`/leads/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteAdminLead(id: string) {
  return apiFetch<{ success: boolean; message: string }>(`/leads/${id}`, {
    method: "DELETE",
  });
}

export async function fetchDashboardSummary() {
  return apiFetch<{
    success: boolean;
    stats: { totalLeads: number; newLeads: number; inProgressLeads: number; wonLeads: number };
    latestLeads: LeadItem[];
    serviceSplit: { _id: string; count: number }[];
  }>("/leads/summary");
}
