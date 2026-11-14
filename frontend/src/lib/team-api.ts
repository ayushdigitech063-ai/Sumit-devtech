import { apiFetch } from "./api";

export interface TeamMemberData {
  _id?: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  github?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
}

const getApiBase = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "";
  if (typeof window === "undefined") {
    if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
      return envUrl;
    }
    return "http://localhost:5000/api";
  }
  return envUrl || "/api";
};

export async function fetchTeamMembers(activeOnly = false): Promise<TeamMemberData[]> {
  try {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/team${activeOnly ? "?activeOnly=true" : ""}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

export async function createTeamMember(payload: Partial<TeamMemberData>): Promise<{ success: boolean; data?: TeamMemberData; message?: string }> {
  try {
    return await apiFetch<{ success: boolean; data?: TeamMemberData; message?: string }>("/team", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateTeamMember(id: string, payload: Partial<TeamMemberData>): Promise<{ success: boolean; data?: TeamMemberData; message?: string }> {
  try {
    return await apiFetch<{ success: boolean; data?: TeamMemberData; message?: string }>(`/team/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteTeamMember(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    return await apiFetch<{ success: boolean; message?: string }>(`/team/${id}`, {
      method: "DELETE",
    });
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
