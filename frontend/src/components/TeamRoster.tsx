import React, { useState, useEffect } from "react";
import type { TeamMember } from "../types";
import { api } from "../lib/api";

const DEFAULT_TEAM: TeamMember[] = [
  {
    id: "TM-001",
    name: "Sarah Connor",
    role: "VP of Engineering",
    department: "Engineering",
    skills: ["FastAPI", "Next.js", "System Architecture", "PostgreSQL", "Rust"],
    email: "sarah.connor@pixel.dev",
    phone: "+1 555 019 2834",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    status: "Active",
    joinDate: "2023-04-12",
    bio: "12+ years building distributed backend platforms and reactive frontends.",
    location: "San Francisco, CA",
  },
  {
    id: "TM-002",
    name: "Alex Mercer",
    role: "Staff AI Engineer",
    department: "AI & Research",
    skills: ["PyTorch", "Transformers", "LLMs", "LangChain", "Vector DBs"],
    email: "alex.mercer@pixel.dev",
    phone: "+1 555 019 5821",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    status: "Active",
    joinDate: "2023-08-01",
    bio: "Former research fellow focusing on inference optimization and agentic workflows.",
    location: "Austin, TX",
  },
  {
    id: "TM-003",
    name: "Maya Patel",
    role: "Principal UI/UX Designer",
    department: "Design",
    skills: ["Figma", "Design Systems", "Prototyping", "WebGL", "Motion"],
    email: "maya.patel@pixel.dev",
    phone: "+91 98 7654 3210",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
    status: "Active",
    joinDate: "2024-01-15",
    bio: "Obsessed with tactile micro-interactions and minimalist monochrome typography.",
    location: "Bengaluru, India",
  },
  {
    id: "TM-004",
    name: "Marcus Vance",
    role: "Lead Cloud Architect",
    department: "Cloud & DevOps",
    skills: ["Kubernetes", "AWS", "Terraform", "CI/CD", "Prometheus"],
    email: "marcus.vance@pixel.dev",
    phone: "+44 20 7946 0888",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    status: "Away",
    joinDate: "2023-11-20",
    bio: "Designing 99.999% uptime multi-region cloud infrastructures.",
    location: "London, UK",
  },
];

export const TeamRoster: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM);

  useEffect(() => {
    api.getTeam().then((data) => {
      if (data && data.length > 0) setTeam(data);
    });
  }, []);

  return (
    <section id="atelier" className="py-28 border-b border-white/10 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white inline-block" />
              <span>INDEX // 04</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-white">
              ENGINEERING ATELIER
            </h2>
          </div>

          <p className="font-body text-zinc-400 text-sm max-w-md">
            Direct access to senior principals. We do not employ account managers or junior buffers &mdash; you collaborate directly with the engineers shipping your product.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {team.map((member) => (
            <div
              key={member.id}
              className="border border-white/10 p-6 bg-zinc-950/60 flex flex-col justify-between hover:border-white/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/10 border border-white/15 overflow-hidden">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px]">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        member.status === "Active" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                      }`}
                    />
                    <span className="text-zinc-500 uppercase">{member.status}</span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight group-hover:text-zinc-200 transition-colors">
                  {member.name}
                </h3>
                <span className="font-mono text-xs text-zinc-400 block mt-0.5">
                  {member.role}
                </span>
                <span className="font-mono text-[11px] text-zinc-600 block mt-1">
                  [{member.location}]
                </span>

                <p className="font-body text-zinc-400 text-xs mt-4 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Skills Tags */}
              <div className="pt-6 mt-6 border-t border-white/5 flex flex-wrap gap-1.5">
                {member.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 border border-white/10 bg-white/[0.02] font-mono text-[10px] text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
