import { apiFetch } from "./api";

export interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readTime: string;
  authorName: string;
  authorRole: string;
  featured: boolean;
  published: boolean;
  tags: string[];
  createdAt: string;
}

export async function fetchPublicBlogs(params?: { category?: string; search?: string }) {
  try {
    const q = new URLSearchParams();
    if (params?.category && params.category !== "All Articles") q.set("category", params.category);
    if (params?.search) q.set("search", params.search);

    const res = await fetch(`/api/blogs?${q.toString()}`, { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, data: [] };
  }
}

export async function fetchAdminBlogs() {
  return apiFetch<{ success: boolean; data: BlogItem[] }>("/blogs/admin/all");
}

export async function createAdminBlog(payload: Partial<BlogItem>) {
  return apiFetch<{ success: boolean; message: string; data: BlogItem }>("/blogs", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAdminBlog(id: string, payload: Partial<BlogItem>) {
  return apiFetch<{ success: boolean; message: string; data: BlogItem }>(`/blogs/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteAdminBlog(id: string) {
  return apiFetch<{ success: boolean; message: string }>(`/blogs/${id}`, {
    method: "DELETE",
  });
}
