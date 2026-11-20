export interface SeoMetaData {
  _id?: string;
  path: string;
  pageName: string;
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl?: string;
  robots: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
  customSchemaJson?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
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

export async function fetchAllSeo(): Promise<SeoMetaData[]> {
  try {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/seo`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.list || [];
  } catch (error) {
    console.error("fetchAllSeo error:", error);
    return [];
  }
}

export async function fetchSeoByPath(path: string): Promise<SeoMetaData | null> {
  try {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/seo/by-path?path=${encodeURIComponent(path.toLowerCase())}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.seo || null;
  } catch (error) {
    console.error("fetchSeoByPath error:", error);
    return null;
  }
}

export async function saveSeoMeta(payload: Partial<SeoMetaData>): Promise<{ success: boolean; seo?: SeoMetaData; message?: string }> {
  try {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/seo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to save SEO config" };
  }
}

export async function deleteSeoMeta(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/seo/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete SEO config" };
  }
}
