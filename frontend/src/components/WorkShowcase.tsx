import React, { useState, useEffect } from "react";
import { ArrowUpRight, CheckCircle2, X } from "lucide-react";
import type { Project } from "../types";
import { api } from "../lib/api";

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "PRJ-101",
    code: "PX-101",
    name: "Nexus Financial Cloud & Treasury AI",
    client: "Stripe Global",
    status: "In Progress",
    category: "AI Solutions",
    budget: 240000,
    spent: 168000,
    deadline: "2025-08-30",
    progress: 70,
    description: "Enterprise multi-currency automated reconciliation platform with predictive cash flow models.",
    team: [
      { id: "TM-001", name: "Sarah Connor", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", role: "Lead Architect" }
    ],
    milestones: [
      { id: "M1", title: "Core Ledger Engine & Multi-tenant Schema", completed: true, dueDate: "2025-02-28" },
      { id: "M2", title: "Machine Learning Anomaly Detection Model", completed: true, dueDate: "2025-05-15" },
      { id: "M3", title: "SOC2 Compliance & Pen-testing Audit", completed: false, dueDate: "2025-07-20" }
    ],
    tasks: []
  },
  {
    id: "PRJ-102",
    code: "PX-102",
    name: "Aether Design System & WebGL Engine",
    client: "Linear Orbit",
    status: "In Progress",
    category: "UI/UX Design",
    budget: 135000,
    spent: 82000,
    deadline: "2025-07-15",
    progress: 62,
    description: "High performance React component library with Three.js hardware acceleration and zero-runtime CSS tokens.",
    team: [
      { id: "TM-003", name: "Maya Patel", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", role: "Design Lead" }
    ],
    milestones: [
      { id: "M1", title: "Figma Token Sync & Primitive Architecture", completed: true, dueDate: "2025-03-30" },
      { id: "M2", title: "WebGL Canvas Transition Components", completed: true, dueDate: "2025-05-01" }
    ],
    tasks: []
  },
  {
    id: "PRJ-103",
    code: "PX-103",
    name: "HyperScale Cloud Gateway & Edge Proxy",
    client: "Vercel Labs",
    status: "Review",
    category: "Cloud Architecture",
    budget: 310000,
    spent: 295000,
    deadline: "2025-06-15",
    progress: 92,
    description: "Sub-millisecond global routing mesh with automated failover and dynamic cache invalidation.",
    team: [
      { id: "TM-004", name: "Marcus Vance", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", role: "Cloud Architect" }
    ],
    milestones: [
      { id: "M1", title: "Rust-based Edge Proxy Daemon", completed: true, dueDate: "2025-01-15" },
      { id: "M2", title: "Load Testing to 10M RPM", completed: true, dueDate: "2025-05-20" }
    ],
    tasks: []
  },
  {
    id: "PRJ-104",
    code: "PX-104",
    name: "Clinical Bio-Telemetry & Diagnostics Portal",
    client: "CredAI Health",
    status: "Planning",
    category: "Web Development",
    budget: 185000,
    spent: 15000,
    deadline: "2025-11-30",
    progress: 12,
    description: "Secure clinician workstation for real-time patient ECG monitoring and autonomous diagnostic triage.",
    team: [
      { id: "TM-001", name: "Sarah Connor", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", role: "Lead Architect" }
    ],
    milestones: [
      { id: "M1", title: "HIPAA Architecture Compliance Blueprint", completed: true, dueDate: "2025-05-25" }
    ],
    tasks: []
  }
];

export const WorkShowcase: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const loadProjects = async () => {
    const data = await api.getProjects();
    if (data && data.length > 0) {
      setProjects(data);
    }
  };

  useEffect(() => {
    loadProjects();
    window.addEventListener("focus", loadProjects);
    const interval = setInterval(loadProjects, 5000);
    return () => {
      window.removeEventListener("focus", loadProjects);
      clearInterval(interval);
    };
  }, []);

  const categories = ["ALL", "AI Solutions", "Cloud Architecture", "UI/UX Design", "Web Development"];

  const filtered = activeCategory === "ALL"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="work" className="py-24 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
              Selected works
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                  activeCategory === cat
                    ? "bg-slate-950 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:text-slate-950 hover:bg-slate-200/70"
                }`}
              >
                {cat === "ALL" ? "All Works" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
          {filtered.map((item, index) => (
            <div
              key={item.id || index}
              onClick={() => setSelectedProject(item)}
              className="group p-8 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span className="font-semibold text-slate-900">{item.client}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-slate-950 group-hover:text-slate-700 transition-colors mb-2.5">
                  {item.name}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Budget</span>
                    <span className="text-slate-900 font-semibold text-sm">
                      ${item.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-slate-100" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Progress</span>
                    <span className="text-emerald-600 font-medium">
                      {item.progress}% &bull; {item.status}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-slate-950 group-hover:text-white group-hover:border-slate-950 transition-all">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-xs p-4 sm:p-6 animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-950 hover:bg-slate-50"
            >
              <X size={16} />
            </button>

            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              {selectedProject.client}
            </span>

            <h3 className="text-2xl font-semibold tracking-tight text-slate-950 mb-3">
              {selectedProject.name}
            </h3>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50 text-xs mb-6">
              <div>
                <span className="text-slate-400 block text-[10px]">Category</span>
                <span className="text-slate-900 font-medium">{selectedProject.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Budget</span>
                <span className="text-slate-900 font-semibold">${selectedProject.budget.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Progress</span>
                <span className="text-emerald-600 font-semibold">{selectedProject.progress}%</span>
              </div>
            </div>

            {/* Milestones Checklist */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Key Milestones
              </h4>

              <div className="space-y-1.5">
                {selectedProject.milestones && selectedProject.milestones.length > 0 ? (
                  selectedProject.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2
                          size={15}
                          className={m.completed ? "text-emerald-500" : "text-slate-300"}
                        />
                        <span className={m.completed ? "text-slate-900 font-medium" : "text-slate-500"}>
                          {m.title}
                        </span>
                      </div>
                      <span className="text-slate-400 text-[11px]">{m.dueDate}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No milestones defined.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
