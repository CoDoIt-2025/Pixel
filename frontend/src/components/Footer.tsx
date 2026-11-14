import React from "react";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

interface FooterProps {
  onNavigateSection?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const { company } = useSettings();
  const phone = company.phone || "+968 9696 7420";
  const email = company.email || "contact@pixelbusiness.si";
  const address = company.address || "H9MX+HMV, Souk Al Ghubrah St, Muscat, Oman";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -75;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="w-full bg-[#121418] text-white pt-12 sm:pt-16 pb-8 select-none border-t border-[#242831]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#242831]">
          {/* Company Brand Column */}
          <div className="md:col-span-5 space-y-3.5 reveal-on-scroll">
            <div className="flex items-center gap-3.5">
              <img
                src="/brand/pixel-logo-3d-tight.png"
                alt="Pixel Business Solutions LLC"
                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_8px_rgba(250,204,21,0.25)] shrink-0"
              />
              <div>
                <h4 className="font-extrabold text-lg text-white leading-tight">
                  Pixel Business Solutions LLC
                </h4>
                <p className="text-[10px] text-[#A1A5B0] font-semibold uppercase tracking-widest">
                  Premier Digital Solutions in Oman
                </p>
              </div>
            </div>

            <p className="text-xs text-[#9CA3AF] leading-relaxed max-w-sm">
              Helping companies in Muscat and across the Sultanate of Oman build dominant local search visibility, AI answer engine citations, bespoke web platforms, and measurable commercial growth.
            </p>

            <div className="flex flex-col gap-2 pt-1 text-xs text-[#C4C7CC]">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#FACC15] shrink-0" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#FACC15] shrink-0" />
                <a
                  href={`tel:${cleanPhone}`}
                  className="hover:text-[#FACC15] transition-colors"
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#FACC15] shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-[#FACC15] transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3 reveal-on-scroll reveal-delay-1">
            <h5 className="font-black text-xs uppercase tracking-wider text-white">
              Navigation
            </h5>
            <ul className="space-y-2 text-xs text-[#A1A5B0]">
              <li>
                <button
                  onClick={(e) => scrollTo("home", e)}
                  className="hover:text-[#FACC15] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => scrollTo("about", e)}
                  className="hover:text-[#FACC15] transition-colors cursor-pointer"
                >
                  About Pixel &amp; Why Pixel
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => scrollTo("services", e)}
                  className="hover:text-[#FACC15] transition-colors cursor-pointer"
                >
                  Explore Services
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => scrollTo("our-work", e)}
                  className="hover:text-[#FACC15] transition-colors cursor-pointer"
                >
                  Our Work &amp; Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => scrollTo("audit-request", e)}
                  className="hover:text-[#FACC15] transition-colors cursor-pointer"
                >
                  Request An Audit
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => scrollTo("blog", e)}
                  className="hover:text-[#FACC15] transition-colors cursor-pointer"
                >
                  Blog &amp; Industry Insights
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => scrollTo("faq", e)}
                  className="hover:text-[#FACC15] transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Consultation CTA */}
          <div className="md:col-span-4 bg-[#181B22] border border-[#2B303C] rounded-2xl p-5 space-y-3 reveal-scale reveal-delay-2">
            <h5 className="font-black text-xs uppercase tracking-wider text-[#FACC15]">
              Request An Audit
            </h5>
            <p className="text-xs text-[#9CA3AF] leading-relaxed">
              Ready to improve your Google Maps 3-Pack rank or launch a new web platform in Oman?
            </p>
            <button
              onClick={(e) => scrollTo("audit-request", e)}
              className="w-full py-2.5 bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Request Free Presence Audit</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* Official Corporate Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#717682] gap-2">
          <span>
            &copy; {new Date().getFullYear()} Pixel Business Solutions LLC. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <span>Muscat, Sultanate of Oman</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
