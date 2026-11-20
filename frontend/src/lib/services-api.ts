export interface FeatureChip {
  id?: string;
  label: string;
}

export interface TrustItem {
  id?: string;
  value: string;
  label: string;
}

export interface EcosystemCard {
  id?: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  colSpan?: "default" | "wide";
}

export interface ServiceItem {
  id?: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface StatItem {
  id?: string;
  numericValue: number;
  suffix: string;
  decimals?: number;
  label: string;
  subtext: string;
}

export interface IndustryItem {
  id?: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceCityOverride {
  citySlug: string;
  cityName: string;
  state?: string;
  tagline?: string;
  phone?: string;
  popularAreas?: string[];
  localKeywords?: string[];
  faqs?: ServiceFaq[];
  isActive?: boolean;
}

export interface ServiceData {
  _id?: string;
  slug: string;
  title: string;
  badge: string;
  highlight?: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;

  chips: FeatureChip[];
  trustItems: TrustItem[];

  ecosystemLabel?: string;
  ecosystemTitle?: string;
  ecosystemHighlight?: string;
  ecosystemText?: string;
  ecosystemCards: EcosystemCard[];

  servicesSectionLabel?: string;
  servicesSectionTitle?: string;
  servicesSectionHighlight?: string;
  servicesSectionText?: string;
  serviceItems: ServiceItem[];

  processLabel?: string;
  processTitle?: string;
  processHighlight?: string;
  processText?: string;
  processSteps: ProcessStep[];

  stats: StatItem[];

  industriesLabel?: string;
  industriesTitle?: string;
  industriesHighlight?: string;
  industriesText?: string;
  industries: IndustryItem[];

  faqsLabel?: string;
  faqsTitle?: string;
  faqsHighlight?: string;
  faqsText?: string;
  faqs: ServiceFaq[];

  ctaBadge?: string;
  ctaTitle?: string;
  ctaHighlight?: string;
  ctaText?: string;
  ctaBenefits: string[];
  ctaButtonText?: string;
  ctaButtonHref?: string;

  cities: ServiceCityOverride[];
  isActive: boolean;
  order: number;

  createdAt?: string;
  updatedAt?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function fetchServices(includeInactive = false): Promise<ServiceData[]> {
  try {
    const res = await fetch(`${API_BASE}/services?includeInactive=${includeInactive}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.services || [];
  } catch (error) {
    console.error("fetchServices error:", error);
    return [];
  }
}

export async function fetchServiceBySlug(slug: string): Promise<ServiceData | null> {
  try {
    const res = await fetch(`${API_BASE}/services/${encodeURIComponent(slug.toLowerCase())}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.service || null;
  } catch (error) {
    console.error("fetchServiceBySlug error:", error);
    return null;
  }
}

export async function createService(payload: Partial<ServiceData>): Promise<{ success: boolean; service?: ServiceData; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create service" };
  }
}

export async function updateService(id: string, payload: Partial<ServiceData>): Promise<{ success: boolean; service?: ServiceData; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update service" };
  }
}

export async function deleteService(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete service" };
  }
}
