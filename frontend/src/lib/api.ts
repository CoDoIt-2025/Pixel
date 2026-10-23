import type { Project, Service, TeamMember, Testimonial, BlogPost, FAQItem, SystemSettings } from "../types";

const API_BASE =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://127.0.0.1:8000/api/v1"
    : "https://api.pixelbusiness.si/api/v1");


export const api = {
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
