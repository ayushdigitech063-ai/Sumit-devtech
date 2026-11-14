import { apiFetch } from "./api";

export interface ProjectData {
  _id: string;
  title: string;
  category: string;
  description?: string;
  url: string;
  image: string;
  featured: boolean;
  order?: number;
  createdAt?: string;
}

export async function fetchProjects(category?: string): Promise<{ success: boolean; data: ProjectData[] }> {
  try {
    const q = category && category !== "all" ? `?category=${encodeURIComponent(category)}` : "";
    const res = await fetch(`/api/projects${q}`, { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, data: [] };
  }
}

export async function createAdminProject(payload: {
  title: string;
  category: string;
  url: string;
  image: string;
  description?: string;
  featured?: boolean;
}) {
  return apiFetch<{ success: boolean; message: string; data: ProjectData }>("/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAdminProject(id: string, payload: Partial<ProjectData>) {
  return apiFetch<{ success: boolean; message: string; data: ProjectData }>(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminProject(id: string) {
  return apiFetch<{ success: boolean; message: string }>(`/projects/${id}`, {
    method: "DELETE",
  });
}

export async function fetchProjectCategories(): Promise<{ success: boolean; data: { _id: string; name: string }[] }> {
  try {
    const res = await fetch("/api/project-categories", { cache: "no-store" });
    return await res.json();
  } catch (err) {
    return { success: false, data: [] };
  }
}

export async function createProjectCategory(name: string): Promise<{ success: boolean; message?: string; data?: { _id: string; name: string } }> {
  try {
    const res = await fetch("/api/project-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function deleteProjectCategory(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`/api/project-categories/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}
