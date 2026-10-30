export class ApiError extends Error {
  status: number;


  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";


export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }


  // Calls http://localhost:5000/api${path} directly
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: "include", // 'include' is required for cross-port (3000 -> 5000) cookies
    cache: "no-store",
  });


  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }


  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message: unknown }).message === "string"
        ? (data as { message: string }).message
        : "Something went wrong. Please try again.";
    throw new ApiError(response.status, message);
  }


  return data as T;
}