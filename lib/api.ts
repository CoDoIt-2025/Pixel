import {
  Project,
  Client,
  TeamMember,
  Service,
  BlogPost,
  Inquiry,
  Testimonial,
  ActivityItem,
  UserSettings,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("pixel_auth_token")
      : null;

  const headers = new Headers(options?.headers);
  if (!headers.has("Content-Type") && !(options?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorMessage = `API Error: ${res.status} ${res.statusText}`;
    try {
      const errorJson = await res.json();
      errorMessage = errorJson.detail || errorJson.message || errorMessage;
    } catch {
      // fallback
    }
    throw new Error(errorMessage);
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}

export const api = {
  // Auth
  auth: {
    login: (credentials: { email: string; password: string }) =>
      request<{ access_token: string; token_type: string; user: any }>(
        "/auth/login",
        {
          method: "POST",
          body: JSON.stringify(credentials),
        }
      ),
    me: () => request<any>("/auth/me"),
  },

  // Dashboard & Stats
  dashboard: {
    getStats: () =>
      request<{
        totalRevenue: number;
        activeProjects: number;
        totalClients: number;
        openInquiries: number;
        statusDistribution: Record<string, number>;
        revenueTrajectory: Array<{ month: string; revenue: number; target: number }>;
      }>("/dashboard/stats"),
    getActivities: () => request<ActivityItem[]>("/dashboard/activities"),
  },

  // Projects
  projects: {
    list: (params?: { search?: string; status?: string; category?: string }) => {
      const q = new URLSearchParams();
      if (params?.search) q.set("search", params.search);
      if (params?.status) q.set("status", params.status);
      if (params?.category) q.set("category", params.category);
      const queryStr = q.toString() ? `?${q.toString()}` : "";
      return request<Project[]>(`/projects${queryStr}`);
    },
    get: (id: string) => request<Project>(`/projects/${id}`),
    create: (data: Omit<Project, "id">) =>
      request<Project>("/projects", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, updates: Partial<Project>) =>
      request<Project>(`/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
    delete: (id: string) =>
      request<void>(`/projects/${id}`, {
        method: "DELETE",
      }),
  },

  // Clients
  clients: {
    list: (params?: { search?: string; status?: string }) => {
      const q = new URLSearchParams();
      if (params?.search) q.set("search", params.search);
      if (params?.status) q.set("status", params.status);
      const queryStr = q.toString() ? `?${q.toString()}` : "";
      return request<Client[]>(`/clients${queryStr}`);
    },
    create: (data: Omit<Client, "id" | "createdAt">) =>
      request<Client>("/clients", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, updates: Partial<Client>) =>
      request<Client>(`/clients/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
    delete: (id: string) =>
      request<void>(`/clients/${id}`, {
        method: "DELETE",
      }),
  },

  // Team
  team: {
    list: (department?: string) => {
      const queryStr = department && department !== "ALL" ? `?department=${department}` : "";
      return request<TeamMember[]>(`/team${queryStr}`);
    },
    create: (data: Omit<TeamMember, "id">) =>
      request<TeamMember>("/team", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, updates: Partial<TeamMember>) =>
      request<TeamMember>(`/team/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
    delete: (id: string) =>
      request<void>(`/team/${id}`, {
        method: "DELETE",
      }),
  },

  // Services
  services: {
    list: () => request<Service[]>("/services"),
    create: (data: Omit<Service, "id">) =>
      request<Service>("/services", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, updates: Partial<Service>) =>
      request<Service>(`/services/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
    toggleVisibility: (id: string) =>
      request<Service>(`/services/${id}/visibility`, {
        method: "PATCH",
      }),
    delete: (id: string) =>
      request<void>(`/services/${id}`, {
        method: "DELETE",
      }),
  },

  // Blog
  blog: {
    list: (params?: { search?: string; status?: string }) => {
      const q = new URLSearchParams();
      if (params?.search) q.set("search", params.search);
      if (params?.status) q.set("status", params.status);
      const queryStr = q.toString() ? `?${q.toString()}` : "";
      return request<BlogPost[]>(`/blog${queryStr}`);
    },
    get: (idOrSlug: string) => request<BlogPost>(`/blog/${idOrSlug}`),
    create: (data: Omit<BlogPost, "id">) =>
      request<BlogPost>("/blog", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, updates: Partial<BlogPost>) =>
      request<BlogPost>(`/blog/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
    delete: (id: string) =>
      request<void>(`/blog/${id}`, {
        method: "DELETE",
      }),
  },

  // Inquiries
  inquiries: {
    list: (status?: string) => {
      const queryStr = status && status !== "ALL" ? `?status=${status}` : "";
      return request<Inquiry[]>(`/inquiries${queryStr}`);
    },
    create: (data: Omit<Inquiry, "id" | "date" | "replies">) =>
      request<Inquiry>("/inquiries", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    updateStatus: (id: string, status: Inquiry["status"]) =>
      request<Inquiry>(`/inquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    reply: (id: string, message: string, sender?: string) =>
      request<Inquiry>(`/inquiries/${id}/replies`, {
        method: "POST",
        body: JSON.stringify({ message, sender }),
      }),
    delete: (id: string) =>
      request<void>(`/inquiries/${id}`, {
        method: "DELETE",
      }),
  },

  // Testimonials
  testimonials: {
    list: (status?: string) => {
      const queryStr = status && status !== "ALL" ? `?status=${status}` : "";
      return request<Testimonial[]>(`/testimonials${queryStr}`);
    },
    create: (data: Omit<Testimonial, "id" | "date">) =>
      request<Testimonial>("/testimonials", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    updateStatus: (id: string, status: Testimonial["status"]) =>
      request<Testimonial>(`/testimonials/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    delete: (id: string) =>
      request<void>(`/testimonials/${id}`, {
        method: "DELETE",
      }),
  },

  // Settings
  settings: {
    get: () => request<UserSettings>("/settings"),
    update: (updates: Partial<UserSettings>) =>
      request<UserSettings>("/settings", {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
  },
};
