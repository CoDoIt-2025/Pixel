import type { Project, Service, TeamMember, Testimonial } from "../types";

const API_BASE = "http://127.0.0.1:8000/api/v1";

export const api = {
  getProjects: async (): Promise<Project[]> => {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      return await res.json();
    } catch {
      return [];
    }
  },

  getServices: async (): Promise<Service[]> => {
    try {
      const res = await fetch(`${API_BASE}/services`);
      if (!res.ok) throw new Error("Failed to fetch services");
      return await res.json();
    } catch {
      return [];
    }
  },

  getTeam: async (): Promise<TeamMember[]> => {
    try {
      const res = await fetch(`${API_BASE}/team`);
      if (!res.ok) throw new Error("Failed to fetch team");
      return await res.json();
    } catch {
      return [];
    }
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    try {
      const res = await fetch(`${API_BASE}/testimonials?status=Approved`);
      if (!res.ok) throw new Error("Failed to fetch testimonials");
      return await res.json();
    } catch {
      return [];
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
};
