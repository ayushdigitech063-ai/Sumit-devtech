import { apiFetch } from "./api";
import type { AdminUser } from "@/types/auth";

export function loginRequest(email: string, password: string):Promise<{ user: AdminUser }> {
  return apiFetch<{ user: AdminUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logoutRequest(): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("/auth/logout", {
    method: "POST",
  });
}

export function getMe(): Promise<{ user: AdminUser }> {
  return apiFetch<{ user: AdminUser }>("/auth/me", {
    method: "GET",
  });
}

