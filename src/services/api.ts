// ─────────────────────────────────────────────
// Beans & Beyond — Base API Client
// All backend calls go through this module.
// ─────────────────────────────────────────────

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  token?: string;
}

async function request<T>(
  endpoint: string,
  { method = "GET", body, token }: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? "API request failed");
  }

  return res.json() as Promise<T>;
}

// ─── Menu ────────────────────────────────────
export const menuApi = {
  getAll: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<{ success: boolean; data: unknown[] }>(`/menu${qs}`);
  },
  getById: (id: string) =>
    request<{ success: boolean; data: unknown }>(`/menu/${id}`),
  create: (data: unknown, token: string) =>
    request<{ success: boolean; data: unknown }>("/menu", {
      method: "POST", body: data, token,
    }),
  update: (id: string, data: unknown, token: string) =>
    request<{ success: boolean; data: unknown }>(`/menu/${id}`, {
      method: "PUT", body: data, token,
    }),
  delete: (id: string, token: string) =>
    request<{ success: boolean; message: string }>(`/menu/${id}`, {
      method: "DELETE", token,
    }),
};

// ─── Orders ──────────────────────────────────
export const ordersApi = {
  create: (data: unknown) =>
    request<{ success: boolean; data: unknown }>("/orders", {
      method: "POST", body: data,
    }),
  getAll: (token: string) =>
    request<{ success: boolean; data: unknown[] }>("/orders", { token }),
  getById: (id: string, token: string) =>
    request<{ success: boolean; data: unknown }>(`/orders/${id}`, { token }),
  updateStatus: (id: string, status: string, token: string) =>
    request<{ success: boolean; data: unknown }>(`/orders/${id}/status`, {
      method: "PUT", body: { status }, token,
    }),
  cancel: (id: string, token: string) =>
    request<{ success: boolean; data: unknown }>(`/orders/${id}`, {
      method: "DELETE", token,
    }),
};

// ─── Auth ────────────────────────────────────
export const authApi = {
  register: (data: unknown) =>
    request<{ success: boolean; token: string; user: unknown }>("/auth/register", {
      method: "POST", body: data,
    }),
  login: (data: unknown) =>
    request<{ success: boolean; token: string; user: unknown }>("/auth/login", {
      method: "POST", body: data,
    }),
  getMe: (token: string) =>
    request<{ success: boolean; user: unknown }>("/auth/me", { token }),
};

// ─── Contact ─────────────────────────────────
export const contactApi = {
  send: (data: unknown) =>
    request<{ success: boolean; message: string }>("/contact", {
      method: "POST", body: data,
    }),
};
