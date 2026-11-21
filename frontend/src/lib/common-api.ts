import { apiFetch } from "@/lib/api";

export interface FaqItem {
  _id?: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export interface TechnologyItem {
  _id?: string;
  name: string;
  category: string;
  icon: string;
  order?: number;
}

export interface IndustryItem {
  _id?: string;
  name: string;
  iconName: string;
  image?: string;
  text: string;
  order?: number;
}

export async function fetchCommonFaqs(): Promise<FaqItem[]> {
  try {
    const data = await apiFetch<{ success: boolean; data: FaqItem[] }>("/common/faqs");
    return data && data.success ? data.data : [];
  } catch {
    return [];
  }
}

export async function fetchCommonTechnologies(): Promise<TechnologyItem[]> {
  try {
    const data = await apiFetch<{ success: boolean; data: TechnologyItem[] }>("/common/technologies");
    return data && data.success ? data.data : [];
  } catch {
    return [];
  }
}

export async function fetchCommonIndustries(): Promise<IndustryItem[]> {
  try {
    const data = await apiFetch<{ success: boolean; data: IndustryItem[] }>("/common/industries");
    return data && data.success ? data.data : [];
  } catch {
    return [];
  }
}
