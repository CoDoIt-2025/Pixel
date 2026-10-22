import React, { useState, useEffect } from "react";
import { ArrowUpRight, CheckCircle2, Layers, X } from "lucide-react";
import type { Project } from "../types";
import { api } from "../lib/api";
import { sound } from "../lib/sound";

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

  useEffect(() => {
    api.getProjects().then((data) => {
      if (data && data.length > 0) {
        setProjects(data);
      }
    });
  }, []);

  const categories = ["ALL", "AI Solutions", "Cloud Architecture", "UI/UX Design", "Web Development"];

  const filtered = activeCategory === "ALL"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="work" className="py-28 border-b border-white/10 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white inline-block" />
              <span>INDEX // 01</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-white">
              SELECTED WORKS
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.click();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1.5 transition-all uppercase tracking-wider ${
                  activeCategory === cat
                    ? "bg-white text-black font-semibold"
                    : "border border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          {filtered.map((item, index) => (
            <div
              key={item.id || index}
              onClick={() => {
                sound.tactile();
                setSelectedProject(item);
              }}
              className="group border border-white/10 hover:border-white/40 bg-zinc-950/60 p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-white/5 relative overflow-hidden"
            >
              {/* Corner Watermark */}
              <div className="absolute top-4 right-4 font-mono text-[10px] text-zinc-600 border border-white/10 px-2 py-0.5 group-hover:text-white group-hover:border-white/30 transition-colors">
                {item.code}
              </div>

              <div>
                <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 mb-4">
                  <span className="text-zinc-200 uppercase font-semibold">{item.client}</span>
                  <span className="text-zinc-600">&bull;</span>
                  <span className="text-zinc-500">{item.category}</span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white group-hover:text-zinc-200 transition-colors mb-4">
                  {item.name}
                </h3>

                <p className="font-body text-zinc-400 text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">BUDGET</span>
                    <span className="text-white font-tech font-bold text-sm">
                      ${item.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-white/10" />
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">STATUS</span>
                    <span className="text-emerald-400 font-tech font-medium">
                      {item.status} ({item.progress}%)
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 animate-fadeIn">
          <div className="bg-zinc-950 border border-white/20 max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                sound.click();
                setSelectedProject(null);
              }}
              className="absolute top-6 right-6 p-2 border border-white/10 text-zinc-400 hover:text-white hover:border-white"
            >
              <X size={18} />
            </button>

            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
              [{selectedProject.code}] // {selectedProject.client}
            </div>

            <h3 className="font-display font-extrabold text-3xl uppercase tracking-tight text-white mb-4">
              {selectedProject.name}
            </h3>

            <p className="font-body text-zinc-300 text-sm leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <div className="grid grid-cols-3 gap-4 p-4 border border-white/10 bg-white/[0.02] font-mono text-xs mb-6">
              <div>
                <span className="text-zinc-500 block text-[10px]">CATEGORY</span>
                <span className="text-white font-medium">{selectedProject.category}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">TOTAL BUDGET</span>
                <span className="text-white font-bold font-tech text-sm">${selectedProject.budget.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">PROGRESS</span>
                <span className="text-emerald-400 font-bold font-tech text-sm">{selectedProject.progress}%</span>
              </div>
            </div>

            {/* Milestones Checklist */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                <Layers size={13} />
                <span>ARCHITECTURAL MILESTONES</span>
              </h4>
              <div className="space-y-2">
                {selectedProject.milestones && selectedProject.milestones.length > 0 ? (
                  selectedProject.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-3 border border-white/10 flex items-center justify-between font-mono text-xs bg-black/40"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2
                          size={15}
                          className={m.completed ? "text-white" : "text-zinc-600"}
                        />
                        <span className={m.completed ? "text-zinc-200" : "text-zinc-500"}>
                          {m.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-600">{m.dueDate}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-500 text-xs font-mono">No milestones registered.</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  sound.click();
                  setSelectedProject(null);
                }}
                className="px-6 py-2.5 bg-white text-black font-tech font-bold text-xs uppercase tracking-wider hover:bg-zinc-200"
              >
                CLOSE ARTIFACT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
