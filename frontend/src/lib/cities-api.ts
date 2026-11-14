const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface CityLocationData {
  _id?: string;
  slug: string;
  name: string;
  state: string;
  country: string;
  tagline?: string;
  phone?: string;
  popularAreas: string[];
  localKeywords: string[];
  isActive?: boolean;
  createdAt?: string;
}

export async function fetchCities(activeOnly = false): Promise<CityLocationData[]> {
  try {
    const res = await fetch(`${API_BASE}/cities${activeOnly ? "?activeOnly=true" : ""}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.cities || [];
  } catch (error) {
    console.error("Failed to fetch cities from backend:", error);
    return [];
  }
}

export async function createCity(payload: Partial<CityLocationData>): Promise<{ success: boolean; city?: CityLocationData; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/cities`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateCity(id: string, payload: Partial<CityLocationData>): Promise<{ success: boolean; city?: CityLocationData; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/cities/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteCity(id: string): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/cities/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
