export interface SiteSettingsData {
  _id?: string;
  phone1Number: string;
  phone1Label: string;
  phone2Number: string;
  phone2Label: string;
  availabilityText: string;
  companyEmail?: string;
  whatsappNumber?: string;
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

export async function fetchPublicSettings(): Promise<SiteSettingsData> {
  const fallback: SiteSettingsData = {
    phone1Number: "+91-8769668455",
    phone1Label: "Sales & Marketing Team",
    phone2Number: "+91-6201533997",
    phone2Label: "Founder Sumit Kumar Mishra",
    availabilityText: "Available Mon - Sat (9am - 8pm IST)",
    companyEmail: "info@websitedevelopmentcompany4u.com",
    whatsappNumber: "+916201533997",
  };

  try {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/settings/public`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return fallback;
    const data = await res.json();
    return data.settings || fallback;
  } catch (error) {
    return fallback;
  }
}

export async function updateSiteSettings(payload: Partial<SiteSettingsData>): Promise<{ success: boolean; settings?: SiteSettingsData; message?: string }> {
  try {
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase}/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update settings" };
  }
}
