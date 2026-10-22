import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
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
import { initialProjects } from "@/data/mockProjects";
import { initialClients } from "@/data/mockClients";
import { initialTeam } from "@/data/mockTeam";
import { initialServices } from "@/data/mockServices";
import { initialBlogPosts } from "@/data/mockBlog";
import { initialInquiries } from "@/data/mockInquiries";
import { initialTestimonials } from "@/data/mockTestimonials";
import { initialActivities } from "@/data/mockActivities";
import { initialSettings } from "@/data/mockSettings";

interface AdminState {
  projects: Project[];
  clients: Client[];
  team: TeamMember[];
  services: Service[];
  blogPosts: BlogPost[];
  inquiries: Inquiry[];
  testimonials: Testimonial[];
  activities: ActivityItem[];
  settings: UserSettings;
  sidebarCollapsed: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  // Project Actions
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Client Actions
  addClient: (client: Omit<Client, "id" | "createdAt">) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  // Team Actions
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // Service Actions
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceVisibility: (id: string) => void;

  // Blog Actions
  addBlogPost: (post: Omit<BlogPost, "id">) => void;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // Inquiry Actions
  updateInquiryStatus: (id: string, status: Inquiry["status"]) => void;
  replyToInquiry: (id: string, replyMessage: string, senderName?: string) => void;
  deleteInquiry: (id: string) => void;

  // Testimonial Actions
  addTestimonial: (testimonial: Omit<Testimonial, "id" | "date">) => void;
  updateTestimonialStatus: (id: string, status: Testimonial["status"]) => void;
  deleteTestimonial: (id: string) => void;

  // Settings Actions
  updateSettings: (updates: Partial<UserSettings>) => void;

  // Reset
  resetToDefaults: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      projects: initialProjects,
      clients: initialClients,
      team: initialTeam,
      services: initialServices,
      blogPosts: initialBlogPosts,
      inquiries: initialInquiries,
      testimonials: initialTestimonials,
      activities: initialActivities,
      settings: initialSettings,
      sidebarCollapsed: false,

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Project Actions
      addProject: (project) =>
        set((state) => {
          const newProject: Project = {
            ...project,
            id: `proj-${Date.now()}`,
          };
          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            user: "Admin",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            action: "created new project",
            target: newProject.name,
            time: "Just now",
            type: "project",
          };
          return {
            projects: [newProject, ...state.projects],
            activities: [newActivity, ...state.activities],
          };
        }),

      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),

      // Client Actions
      addClient: (client) =>
        set((state) => {
          const newClient: Client = {
            ...client,
            id: `cli-${Date.now()}`,
            createdAt: new Date().toISOString().split("T")[0],
          };
          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            user: "Admin",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            action: "onboarded new client",
            target: newClient.company,
            time: "Just now",
            type: "client",
          };
          return {
            clients: [newClient, ...state.clients],
            activities: [newActivity, ...state.activities],
          };
        }),

      updateClient: (id, updates) =>
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),

      deleteClient: (id) =>
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
        })),

      // Team Actions
      addTeamMember: (member) =>
        set((state) => {
          const newMember: TeamMember = {
            ...member,
            id: `tm-${Date.now()}`,
          };
          return { team: [newMember, ...state.team] };
        }),

      updateTeamMember: (id, updates) =>
        set((state) => ({
          team: state.team.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),

      deleteTeamMember: (id) =>
        set((state) => ({
          team: state.team.filter((m) => m.id !== id),
        })),

      // Service Actions
      addService: (service) =>
        set((state) => {
          const newService: Service = {
            ...service,
            id: `srv-${Date.now()}`,
          };
          return { services: [...state.services, newService] };
        }),

      updateService: (id, updates) =>
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),

      deleteService: (id) =>
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        })),

      toggleServiceVisibility: (id) =>
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, isVisible: !s.isVisible } : s
          ),
        })),

      // Blog Actions
      addBlogPost: (post) =>
        set((state) => {
          const newPost: BlogPost = {
            ...post,
            id: `post-${Date.now()}`,
          };
          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            user: "Admin",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            action: "created article",
            target: newPost.title,
            time: "Just now",
            type: "blog",
          };
          return {
            blogPosts: [newPost, ...state.blogPosts],
            activities: [newActivity, ...state.activities],
          };
        }),

      updateBlogPost: (id, updates) =>
        set((state) => ({
          blogPosts: state.blogPosts.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      deleteBlogPost: (id) =>
        set((state) => ({
          blogPosts: state.blogPosts.filter((p) => p.id !== id),
        })),

      // Inquiry Actions
      updateInquiryStatus: (id, status) =>
        set((state) => ({
          inquiries: state.inquiries.map((inq) =>
            inq.id === id ? { ...inq, status } : inq
          ),
        })),

      replyToInquiry: (id, replyMessage, senderName = "Alex Vance (Admin)") =>
        set((state) => {
          const newReply = {
            id: `rep-${Date.now()}`,
            sender: senderName,
            message: replyMessage,
            timestamp: new Date().toISOString(),
          };
          return {
            inquiries: state.inquiries.map((inq) =>
              inq.id === id
                ? {
                    ...inq,
                    status: "Resolved",
                    replies: [...inq.replies, newReply],
                  }
                : inq
            ),
          };
        }),

      deleteInquiry: (id) =>
        set((state) => ({
          inquiries: state.inquiries.filter((inq) => inq.id !== id),
        })),

      // Testimonial Actions
      addTestimonial: (testimonial) =>
        set((state) => {
          const newTestimonial: Testimonial = {
            ...testimonial,
            id: `test-${Date.now()}`,
            date: new Date().toISOString().split("T")[0],
          };
          return {
            testimonials: [newTestimonial, ...state.testimonials],
          };
        }),

      updateTestimonialStatus: (id, status) =>
        set((state) => ({
          testimonials: state.testimonials.map((t) =>
            t.id === id ? { ...t, status } : t
          ),
        })),

      deleteTestimonial: (id) =>
        set((state) => ({
          testimonials: state.testimonials.filter((t) => t.id !== id),
        })),

      // Settings Actions
      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),

      resetToDefaults: () =>
        set({
          projects: initialProjects,
          clients: initialClients,
          team: initialTeam,
          services: initialServices,
          blogPosts: initialBlogPosts,
          inquiries: initialInquiries,
          testimonials: initialTestimonials,
          activities: initialActivities,
          settings: initialSettings,
        }),
    }),
    {
      name: "pixel_admin_storage_v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
