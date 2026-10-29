import React, { useState, useEffect } from "react";
import { ShieldCheck, Target, MapPin, ArrowRight } from "lucide-react";
import { api } from "../lib/api";
import type { TeamMember } from "../types";
import { useSettings } from "../context/SettingsContext";

export const TeamRoster: React.FC = () => {
  const { company } = useSettings();
  const [team, setTeam] = useState<TeamMember[]>([]);

  const loadTeam = async () => {
    try {
      const data = await api.getTeam();
      if (data && data.length > 0) {
        setTeam(data.filter((m) => m.status === "Active"));
      }
    } catch {
      // Fallback
    }
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
    <section id="about" className="py-24 sm:py-32 bg-[#202124] text-[#F7F7F2] border-t border-[#45484E]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2D31] border border-[#45484E] text-[#F5C542] text-xs font-semibold mb-4">
              <span>About {company.name || "Pixel Business Solutions LLC"}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F7F7F2] leading-tight">
              Digital support built around your business priorities
            </h2>

            <p className="mt-6 text-[#C4C7CC] text-base leading-relaxed">
              {company.name || "Pixel Business Solutions LLC"} provides website design, SEO, Google Business Profile management, social media management, AI visibility and digital QR menu services. Our primary focus is Oman, with a secondary focus on Thrissur in Kerala.
            </p>

            <p className="mt-4 text-[#C4C7CC] text-base leading-relaxed">
              A useful online presence starts with clear information. Customers should be able to understand what you offer, find the details they need and know how to contact you. We bring these priorities into the discussion before deciding which services fit your business.
            </p>

            <p className="mt-4 text-[#C4C7CC] text-base leading-relaxed">
              Our approach is to define the scope clearly, work with accurate business information and review the work against agreed goals. We do not promise guaranteed search rankings or guaranteed placement in AI answers.
            </p>

            <div className="mt-8 pt-6 border-t border-[#45484E] flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="btn-primary"
              >
                <span>Discuss your project</span>
                <ArrowRight size={15} />
              </a>

              <a
                href="#faq"
                className="btn-secondary"
              >
                Common questions
              </a>
            </div>
          </div>

          {/* Right Highlights Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-[#2B2D31] border border-[#45484E]">
              <div className="w-10 h-10 rounded-xl bg-[#202124] border border-[#45484E] flex items-center justify-center text-[#F5C542] mb-4">
                <Target size={20} />
              </div>
              <h3 className="text-base font-bold text-[#F7F7F2] mb-1.5">
                Clear Scope Before Starting
              </h3>
              <p className="text-xs text-[#C4C7CC] leading-relaxed">
                Agreed inclusions, timeline, and responsibilities. No surprising fees or vague deliverables.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#2B2D31] border border-[#45484E]">
              <div className="w-10 h-10 rounded-xl bg-[#202124] border border-[#45484E] flex items-center justify-center text-[#F5C542] mb-4">
                <MapPin size={20} />
              </div>
              <h3 className="text-base font-bold text-[#F7F7F2] mb-1.5">
                Oman &amp; Thrissur Regional Focus
              </h3>
              <p className="text-xs text-[#C4C7CC] leading-relaxed">
                Primary delivery in Sultanate of Oman, with welcoming support for businesses serving customers in Thrissur, Kerala.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#2B2D31] border border-[#45484E]">
              <div className="w-10 h-10 rounded-xl bg-[#202124] border border-[#45484E] flex items-center justify-center text-[#F5C542] mb-4">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-[#F7F7F2] mb-1.5">
                Authentic &amp; Truthful Claims
              </h3>
              <p className="text-xs text-[#C4C7CC] leading-relaxed">
                We present realistic timelines and evidence boundaries. No fabricated AI scores or promised search positions.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Team Members from Admin Panel (if added in /team) */}
        {team && team.length > 0 && (
          <div className="pt-12 border-t border-[#45484E]">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-semibold text-[#F5C542] uppercase tracking-wider block mb-2">
                Team &amp; Personnel
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#F7F7F2]">
                Our Technical &amp; Digital Team
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="p-6 rounded-2xl border border-[#45484E] bg-[#2B2D31] hover:border-[#F5C542]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-[#202124] mb-4 border border-[#45484E]">
                      <img
                        src={member.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-base font-bold text-[#F7F7F2]">
                      {member.name}
                    </h4>
                    <span className="text-xs text-[#F5C542] block mt-0.5 font-medium">
                      {member.role}
                    </span>
                    <p className="text-xs text-[#C4C7CC] mt-2.5 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>

                  {member.skills && member.skills.length > 0 && (
                    <div className="pt-4 mt-4 border-t border-[#45484E]/60 flex flex-wrap gap-1.5">
                      {member.skills.slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded bg-[#202124] text-[#C4C7CC] text-[10px] font-medium border border-[#45484E]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
