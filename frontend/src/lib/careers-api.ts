import { apiFetch } from "./api";

export interface JobOpeningItem {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  isOpen: boolean;
  createdAt: string;
}

export interface ApplicationItem {
  _id: string;
  jobId?: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  candidateType?: "fresher" | "experienced";
  experienceYears?: string;
  previousCompany?: string;
  currentDesignation?: string;
  currentSalary?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  payslipUrl?: string;
  experience?: string;
  location?: string;
  portfolioLink?: string;
  coverNote?: string;
  resumeUrl: string;
  resumeFileName?: string;
  status: "Under Review" | "Shortlisted" | "Rejected" | "Hired";
  isRead: boolean;
  createdAt: string;
}

// Public: Get Openings
export async function fetchJobOpenings() {
  try {
    const res = await fetch("/api/careers/openings", { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, data: [] };
  }
}

// Admin: Manage Openings
export async function createAdminJobOpening(payload: Partial<JobOpeningItem>) {
  return apiFetch<{ success: boolean; message: string; data: JobOpeningItem }>("/careers/openings", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAdminJobOpening(id: string, payload: Partial<JobOpeningItem>) {
  return apiFetch<{ success: boolean; message: string; data: JobOpeningItem }>(`/careers/openings/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminJobOpening(id: string) {
  return apiFetch<{ success: boolean; message: string }>(`/careers/openings/${id}`, {
    method: "DELETE",
  });
}

// Admin: View and Manage Applications & Resumes
export async function fetchAdminApplications(params?: { status?: string; search?: string }) {
  const q = new URLSearchParams();
  if (params?.status) q.set("status", params.status);
  if (params?.search) q.set("search", params.search);

  return apiFetch<{ success: boolean; data: ApplicationItem[]; unreadCount: number }>(
    `/careers/applications?${q.toString()}`
  );
}

export async function updateAdminApplicationStatus(id: string, status: string) {
  return apiFetch<{ success: boolean; data: ApplicationItem }>(`/careers/applications/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function deleteAdminApplication(id: string) {
  return apiFetch<{ success: boolean; message: string }>(`/careers/applications/${id}`, {
    method: "DELETE",
  });
}
