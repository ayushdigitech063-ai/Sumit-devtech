export interface TestimonialItem {
  _id?: string;
  id?: string;
  name: string;
  role?: string;
  company: string;
  projectType: string;
  rating: number;
  text: string;
  featured?: boolean;
  avatarUrl?: string;
  avatarBg?: string;
  order?: number;
  createdAt?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchTestimonials(): Promise<TestimonialItem[]> {
  try {
    const res = await fetch(`${API_BASE}/testimonials`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load testimonials");
    return await res.json();
  } catch (err) {
    console.error("fetchTestimonials error:", err);
    return [];
  }
}

export async function createTestimonial(data: Partial<TestimonialItem>): Promise<TestimonialItem> {
  const res = await fetch(`${API_BASE}/testimonials`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create testimonial");
  }
  return res.json();
}

export async function updateTestimonial(id: string, data: Partial<TestimonialItem>): Promise<TestimonialItem> {
  const res = await fetch(`${API_BASE}/testimonials/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update testimonial");
  }
  return res.json();
}

export async function deleteTestimonial(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/testimonials/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete testimonial");
  }
}
