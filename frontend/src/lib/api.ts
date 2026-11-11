import type { Project, Service, TeamMember, Testimonial, BlogPost, FAQItem, SystemSettings, Client, Banner } from "../types";

export interface AuditRequestPayload {
  company_name: string;
  phone_number: string;
  google_maps_link?: string;
  google_maps_na?: boolean;
  website_link?: string;
  website_na?: boolean;
  social_media_links?: string;
  social_media_na?: boolean;
  email?: string;
}

export interface AuditRequestRecord {
  id: string;
  company_name: string;
  phone_number: string;
  google_maps_link?: string;
  google_maps_na?: boolean;
  website_link?: string;
  website_na?: boolean;
  social_media_links?: string;
  social_media_na?: boolean;
  email?: string;
  status: string;
  created_at: string;
}

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://127.0.0.1:8000/api/v1"
    : "https://api.pixelbusiness.si/api/v1");

/**
 * Normalizes any uploaded media URL so that local and production (Dokploy) URLs
 * always point to the reachable backend /uploads endpoint.
 */
export function normalizeMediaUrl(url?: string | null): string {
  if (!url) return "";
  if (url.startsWith("data:")) return url;
  if (url.includes("/uploads/")) {
    const filename = url.split("/uploads/")[1];
    const apiOrigin = API_BASE.replace(/\/api\/v1\/?$/, "");
    return `${apiOrigin}/uploads/${filename}`;
  }
  return url;
}


export const api = {
  getClients: async (): Promise<Client[]> => {
    try {
      const res = await fetch(`${API_BASE}/clients`);
      if (!res.ok) throw new Error("Failed to fetch clients");
      return await res.json();
    } catch (err) {
      console.warn("Failed fetching clients from SQLite API:", err);
      return [];
    }
  },

  getProjects: async (): Promise<Project[]> => {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return await res.json();
    } catch (err) {
      console.warn("Failed fetching projects from SQLite API:", err);
      return [];
    }
  },

  getServices: async (): Promise<Service[]> => {
    try {
      const res = await fetch(`${API_BASE}/services`);
      if (!res.ok) throw new Error("Failed to fetch services");
      return await res.json();
    } catch (err) {
      console.warn("Failed fetching services from SQLite API:", err);
      return [];
    }
  },

  getTeam: async (): Promise<TeamMember[]> => {
    try {
      const res = await fetch(`${API_BASE}/team`);
      if (!res.ok) throw new Error("Failed to fetch team");
      return await res.json();
    } catch (err) {
      console.warn("Failed fetching team from SQLite API:", err);
      return [];
    }
  },

  getBlogPosts: async (): Promise<BlogPost[]> => {
    try {
      const res = await fetch(`${API_BASE}/blog`);
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      return await res.json();
    } catch (err) {
      console.warn("Failed fetching blog posts from SQLite API:", err);
      return [];
    }
  },

  getBanners: async (): Promise<Banner[]> => {
    try {
      const res = await fetch(`${API_BASE}/banners?active_only=true`);
      if (!res.ok) throw new Error("Failed to fetch banners");
      return await res.json();
    } catch (err) {
      console.warn("Failed fetching banners from SQLite API:", err);
      return [];
    }
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const res = await fetch(`${API_BASE}/testimonials`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return await res.json();
    } catch (err) {
      console.warn("Failed fetching testimonials from SQLite API:", err);
      return [];
    }
  },

  getFAQs: async (): Promise<FAQItem[]> => {
    try {
      const res = await fetch(`${API_BASE}/faqs?active_only=true`);
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      return await res.json();
    } catch (err) {
      console.warn("Failed fetching FAQs from SQLite API:", err);
      return [];
    }
  },

  getSettings: async (): Promise<SystemSettings | null> => {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (!res.ok) throw new Error("Failed to fetch settings");
      return await res.json();
    } catch (err) {
      console.warn("Failed fetching system settings from SQLite API:", err);
      return null;
    }
  },

  updateSettings: async (updates: any): Promise<SystemSettings | null> => {
    try {
      const res = await fetch(`${API_BASE}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error("Failed to update settings");
      return await res.json();
    } catch (err) {
      console.warn("Failed updating system settings:", err);
      return null;
    }
  },

  submitInquiry: async (payload: {
    name: string;
    email: string;
    company: string;
    service: string;
    budget: string;
    message: string;
  }) => {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to submit inquiry");
    }
    return await res.json();
  },

  submitAuditRequest: async (payload: AuditRequestPayload) => {
    const res = await fetch(`${API_BASE}/audit-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to submit audit request");
    }
    return await res.json();
  },

  uploadMedia: async (file: File): Promise<{ url: string; filename: string; mediaType: "image" | "video" }> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to upload media file");
    }
    return await res.json();
  },

  updateService: async (serviceId: string, updates: Partial<Service>): Promise<Service> => {
    const res = await fetch(`${API_BASE}/services/${serviceId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to update service");
    }
    return await res.json();
  },

  createService: async (payload: {
    title: string;
    category: string;
    description: string;
    iconName?: string;
    startingPrice?: number;
    features?: string[];
    isVisible?: boolean;
    deliveryTime?: string;
    bannerImage?: string;
    bannerVideo?: string;
    mediaType?: "illustration" | "image" | "video";
  }): Promise<Service> => {
    const res = await fetch(`${API_BASE}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        iconName: "Monitor",
        startingPrice: 100,
        features: [],
        isVisible: true,
        deliveryTime: "2-4 weeks",
        ...payload,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to create service");
    }
    return await res.json();
  },

  deleteService: async (serviceId: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/services/${serviceId}`, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 204) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to delete service");
    }
  },

  getAuditRequests: async (): Promise<AuditRequestRecord[]> => {
    try {
      const res = await fetch(`${API_BASE}/audit-requests`);
      if (!res.ok) throw new Error("Failed to fetch audit requests");
      return await res.json();
    } catch (err) {
      console.warn("Failed fetching audit requests:", err);
      return [];
    }
  },

  updateAuditStatus: async (id: string, status: string): Promise<AuditRequestRecord> => {
    const res = await fetch(`${API_BASE}/audit-requests/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to update audit status");
    }
    return await res.json();
  },

  deleteAuditRequest: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/audit-requests/${id}`, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 204) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to delete audit request");
    }
  },

  createTestimonial: async (payload: {
    clientName: string;
    clientRole: string;
    company: string;
    quote: string;
    rating: number;
    project?: string;
    status?: string;
  }): Promise<Testimonial> => {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "APPROVED",
        ...payload,
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to create testimonial");
    }
    return await res.json();
  },

  deleteTestimonial: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/testimonials/${id}`, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 204) {
      throw new Error("Failed to delete testimonial");
    }
  },

  createProject: async (payload: any): Promise<Project> => {
    const res = await fetch(`${API_BASE}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Failed to create project");
    }
    return await res.json();
  },

  deleteProject: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 204) {
      throw new Error("Failed to delete project");
    }
  },
};
