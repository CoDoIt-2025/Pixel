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
  FAQ,
} from "@/types";
import { initialProjects } from "@/data/mockProjects";
import { initialClients } from "@/data/mockClients";
import { initialTeam } from "@/data/mockTeam";
import { initialServices } from "@/data/mockServices";
import { initialBlogPosts } from "@/data/mockBlog";
import { initialInquiries } from "@/data/mockInquiries";
import { initialTestimonials } from "@/data/mockTestimonials";
import { initialFAQs } from "@/data/mockFAQs";
import { initialActivities } from "@/data/mockActivities";
import { initialSettings } from "@/data/mockSettings";
import { api } from "@/lib/api";

interface AdminState {
  projects: Project[];
  clients: Client[];
  team: TeamMember[];
  services: Service[];
  blogPosts: BlogPost[];
  inquiries: Inquiry[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  activities: ActivityItem[];
  settings: UserSettings;
  sidebarCollapsed: boolean;
  backendConnected: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  syncWithBackend: () => Promise<void>;

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

  // FAQ Actions
  addFAQ: (faq: Omit<FAQ, "id" | "createdAt">) => void;
  updateFAQ: (id: string, updates: Partial<FAQ>) => void;
  toggleFAQStatus: (id: string) => void;
  deleteFAQ: (id: string) => void;
  reorderFAQs: (newOrderedList: FAQ[]) => void;

  // Settings Actions
  updateSettings: (updates: Partial<UserSettings>) => void;

  // Reset
  resetToDefaults: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      projects: initialProjects,
      clients: initialClients,
      team: initialTeam,
      services: initialServices,
      blogPosts: initialBlogPosts,
      inquiries: initialInquiries,
      testimonials: initialTestimonials,
      faqs: initialFAQs,
      activities: initialActivities,
      settings: initialSettings,
      sidebarCollapsed: false,
      backendConnected: false,

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      // Sync store with SQLite backend
      syncWithBackend: async () => {
        try {
          const [
            projects,
            clients,
            team,
            services,
            blogPosts,
            inquiries,
            testimonials,
            faqs,
            activities,
            settings,
          ] = await Promise.all([
            api.projects.list().catch(() => null),
            api.clients.list().catch(() => null),
            api.team.list().catch(() => null),
            api.services.list().catch(() => null),
            api.blog.list().catch(() => null),
            api.inquiries.list().catch(() => null),
            api.testimonials.list().catch(() => null),
            api.faqs.list().catch(() => null),
            api.dashboard.getActivities().catch(() => null),
            api.settings.get().catch(() => null),
          ]);

          set((state) => ({
            backendConnected: true,
            projects: projects && projects.length > 0 ? projects : state.projects,
            clients: clients && clients.length > 0 ? clients : state.clients,
            team: team && team.length > 0 ? team : state.team,
            services: services && services.length > 0 ? services : state.services,
            blogPosts: blogPosts && blogPosts.length > 0 ? blogPosts : state.blogPosts,
            inquiries: inquiries && inquiries.length > 0 ? inquiries : state.inquiries,
            testimonials: testimonials && testimonials.length > 0 ? testimonials : state.testimonials,
            faqs: faqs && faqs.length > 0 ? faqs : state.faqs,
            activities: activities && activities.length > 0 ? activities : state.activities,
            settings: settings ? settings : state.settings,
          }));
        } catch {
          set({ backendConnected: false });
        }
      },

      // Project Actions
      addProject: (project) => {
        const tempId = `PRJ-${Date.now()}`;
        const newProject: Project = { ...project, id: tempId };
        const newActivity: ActivityItem = {
          id: `act-${Date.now()}`,
          user: "Admin",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          action: "created new project",
          target: newProject.name,
          time: "Just now",
          type: "project",
        };

        set((state) => ({
          projects: [newProject, ...state.projects],
          activities: [newActivity, ...state.activities],
        }));

        // Sync with SQLite backend
        api.projects
          .create(project)
          .then((saved) => {
            set((state) => ({
              projects: state.projects.map((p) => (p.id === tempId ? saved : p)),
            }));
          })
          .catch(() => {});
      },

      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));

        api.projects.update(id, updates).catch(() => {});
      },

      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));

        api.projects.delete(id).catch(() => {});
      },

      // Client Actions
      addClient: (client) => {
        const tempId = `CLI-${Date.now()}`;
        const newClient: Client = {
          ...client,
          id: tempId,
          createdAt: new Date().toISOString().split("T")[0],
        };

        set((state) => ({
          clients: [newClient, ...state.clients],
        }));

        api.clients
          .create(client)
          .then((saved) => {
            set((state) => ({
              clients: state.clients.map((c) => (c.id === tempId ? saved : c)),
            }));
          })
          .catch(() => {});
      },

      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));

        api.clients.update(id, updates).catch(() => {});
      },

      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
        }));

        api.clients.delete(id).catch(() => {});
      },

      // Team Actions
      addTeamMember: (member) => {
        const tempId = `TM-${Date.now()}`;
        const newMember: TeamMember = {
          ...member,
          id: tempId,
        };

        set((state) => ({
          team: [newMember, ...state.team],
        }));

        api.team
          .create(member)
          .then((saved) => {
            set((state) => ({
              team: state.team.map((m) => (m.id === tempId ? saved : m)),
            }));
          })
          .catch(() => {});
      },

      updateTeamMember: (id, updates) => {
        set((state) => ({
          team: state.team.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        }));

        api.team.update(id, updates).catch(() => {});
      },

      deleteTeamMember: (id) => {
        set((state) => ({
          team: state.team.filter((m) => m.id !== id),
        }));

        api.team.delete(id).catch(() => {});
      },

      // Service Actions
      addService: (service) => {
        const tempId = `SRV-${Date.now()}`;
        const newService: Service = { ...service, id: tempId };

        set((state) => ({
          services: [...state.services, newService],
        }));

        api.services
          .create(service)
          .then((saved) => {
            set((state) => ({
              services: state.services.map((s) => (s.id === tempId ? saved : s)),
            }));
          })
          .catch(() => {});
      },

      updateService: (id, updates) => {
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        }));

        api.services.update(id, updates).catch(() => {});
      },

      deleteService: (id) => {
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        }));

        api.services.delete(id).catch(() => {});
      },

      toggleServiceVisibility: (id) => {
        set((state) => ({
          services: state.services.map((s) =>
            s.id === id ? { ...s, isVisible: !s.isVisible } : s
          ),
        }));

        api.services.toggleVisibility(id).catch(() => {});
      },

      // Blog Actions
      addBlogPost: (post) => {
        const tempId = `BLG-${Date.now()}`;
        const newPost: BlogPost = { ...post, id: tempId };

        set((state) => ({
          blogPosts: [newPost, ...state.blogPosts],
        }));

        api.blog
          .create(post)
          .then((saved) => {
            set((state) => ({
              blogPosts: state.blogPosts.map((b) => (b.id === tempId ? saved : b)),
            }));
          })
          .catch(() => {});
      },

      updateBlogPost: (id, updates) => {
        set((state) => ({
          blogPosts: state.blogPosts.map((b) =>
            b.id === id ? { ...b, ...updates } : b
          ),
        }));

        api.blog.update(id, updates).catch(() => {});
      },

      deleteBlogPost: (id) => {
        set((state) => ({
          blogPosts: state.blogPosts.filter((b) => b.id !== id),
        }));

        api.blog.delete(id).catch(() => {});
      },

      // Inquiry Actions
      updateInquiryStatus: (id, status) => {
        set((state) => ({
          inquiries: state.inquiries.map((inq) =>
            inq.id === id ? { ...inq, status } : inq
          ),
        }));

        api.inquiries.updateStatus(id, status).catch(() => {});
      },

      replyToInquiry: (id, replyMessage, senderName = "Sarah Connor") => {
        const newReply = {
          id: `rep-${Date.now()}`,
          sender: senderName,
          message: replyMessage,
          timestamp: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        set((state) => ({
          inquiries: state.inquiries.map((inq) =>
            inq.id === id
              ? {
                  ...inq,
                  status: inq.status === "New" ? "In Progress" : inq.status,
                  replies: [...inq.replies, newReply],
                }
              : inq
          ),
        }));

        api.inquiries.reply(id, replyMessage, senderName).catch(() => {});
      },

      deleteInquiry: (id) => {
        set((state) => ({
          inquiries: state.inquiries.filter((inq) => inq.id !== id),
        }));

        api.inquiries.delete(id).catch(() => {});
      },

      // Testimonial Actions
      addTestimonial: (testimonial) => {
        const tempId = `TST-${Date.now()}`;
        const newTestimonial: Testimonial = {
          ...testimonial,
          id: tempId,
          date: new Date().toISOString().split("T")[0],
        };

        set((state) => ({
          testimonials: [newTestimonial, ...state.testimonials],
        }));

        api.testimonials
          .create(testimonial)
          .then((saved) => {
            set((state) => ({
              testimonials: state.testimonials.map((t) => (t.id === tempId ? saved : t)),
            }));
          })
          .catch(() => {});
      },

      updateTestimonialStatus: (id, status) => {
        set((state) => ({
          testimonials: state.testimonials.map((t) =>
            t.id === id ? { ...t, status } : t
          ),
        }));

        api.testimonials.updateStatus(id, status).catch(() => {});
      },

      deleteTestimonial: (id) => {
        set((state) => ({
          testimonials: state.testimonials.filter((t) => t.id !== id),
        }));

        api.testimonials.delete(id).catch(() => {});
      },

      // FAQ Actions
      addFAQ: (faq) => {
        const tempId = `FAQ-${Date.now()}`;
        const newFAQ: FAQ = { ...faq, id: tempId };
        const newActivity: ActivityItem = {
          id: `act-${Date.now()}`,
          user: "Admin",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          action: "created new FAQ",
          target: newFAQ.question.slice(0, 40) + "...",
          time: "Just now",
          type: "faq",
        };

        set((state) => ({
          faqs: [...state.faqs, newFAQ],
          activities: [newActivity, ...state.activities],
        }));

        api.faqs
          .create(faq)
          .then((saved) => {
            set((state) => ({
              faqs: state.faqs.map((f) => (f.id === tempId ? saved : f)),
            }));
          })
          .catch(() => {});
      },

      updateFAQ: (id, updates) => {
        set((state) => ({
          faqs: state.faqs.map((f) => (f.id === id ? { ...f, ...updates } : f)),
        }));

        api.faqs.update(id, updates).catch(() => {});
      },

      toggleFAQStatus: (id) => {
        set((state) => ({
          faqs: state.faqs.map((f) =>
            f.id === id ? { ...f, isActive: !f.isActive } : f
          ),
        }));

        api.faqs.toggle(id).catch(() => {});
      },

      deleteFAQ: (id) => {
        const target = get().faqs?.find((f) => f.id === id);
        const newActivity: ActivityItem = {
          id: `act-${Date.now()}`,
          user: "Admin",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          action: "deleted FAQ",
          target: target?.question.slice(0, 40) || "FAQ Item",
          time: "Just now",
          type: "faq",
        };

        set((state) => ({
          faqs: state.faqs.filter((f) => f.id !== id),
          activities: [newActivity, ...state.activities],
        }));

        api.faqs.delete(id).catch(() => {});
      },

      reorderFAQs: (newOrderedList) => {
        set({ faqs: newOrderedList });
        newOrderedList.forEach((faq, index) => {
          if (faq.order !== index + 1) {
            api.faqs.update(faq.id, { order: index + 1 }).catch(() => {});
          }
        });
      },

      // Settings Actions
      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));

        api.settings.update(updates).catch(() => {});
      },

      resetToDefaults: () => {
        set({
          projects: initialProjects,
          clients: initialClients,
          team: initialTeam,
          services: initialServices,
          blogPosts: initialBlogPosts,
          inquiries: initialInquiries,
          testimonials: initialTestimonials,
          faqs: initialFAQs,
          activities: initialActivities,
          settings: initialSettings,
        });
      },
    }),
    {
      name: "pixel_admin_storage_v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
