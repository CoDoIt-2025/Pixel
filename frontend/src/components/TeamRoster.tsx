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
    bio: "Obsessed with tactile micro-interactions and minimalist typography.",
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
    status: "Active",
    joinDate: "2023-11-20",
    bio: "Designing 99.999% uptime multi-region cloud infrastructures.",
    location: "London, UK",
  },
];

export const TeamRoster: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>(DEFAULT_TEAM);

  const loadTeam = async () => {
    const data = await api.getTeam();
    if (data && data.length > 0) setTeam(data);
  };

  useEffect(() => {
    loadTeam();
    window.addEventListener("focus", loadTeam);
    const interval = setInterval(loadTeam, 5000);
    return () => {
      window.removeEventListener("focus", loadTeam);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="about" className="py-24 sm:py-32 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
            Principals &amp; architects
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Direct access to seasoned engineers. We never employ account managers or intermediary layers &mdash; you collaborate directly with the makers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 mb-5 border border-slate-100">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-base font-semibold text-slate-950">
                  {member.name}
                </h3>
                <span className="text-xs text-slate-500 block mt-0.5">
                  {member.role}
                </span>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex flex-wrap gap-1.5">
                {member.skills.slice(0, 3).map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
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
