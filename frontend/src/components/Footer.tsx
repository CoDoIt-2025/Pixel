import React from "react";
import { ArrowUpRight, Mail, Phone, MapPin, Globe } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

export const Footer: React.FC = () => {
  const { company } = useSettings();
  const brandInitial = company.name ? company.name.trim().charAt(0).toUpperCase() : "P";

  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 pt-16 pb-8 text-slate-600 text-xs overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-14 border-b border-slate-200">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-950 rounded-[6px] flex items-center justify-center text-white text-xs font-bold shadow-2xs">
                {brandInitial}
              </div>
              <span className="font-semibold text-slate-950 text-base tracking-tight">
                {company.name}
              </span>
            </div>
            <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
              {company.description ||
                "Software & AI engineering studio crafting modern web platforms, autonomous inference pipelines, and design systems for enterprise leaders."}
            </p>

            {/* Direct Contact Links */}
            <div className="pt-2 space-y-1.5 text-[11px] text-slate-500">
              {company.email && (
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-slate-400" />
                  <a
                    href={`mailto:${company.email}`}
                    className="hover:text-slate-900 transition-colors"
                  >
                    {company.email}
                  </a>
                </div>
              )}
              {company.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={12} className="text-slate-400" />
                  <span>{company.phone}</span>
                </div>
              )}
              {company.address && (
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-slate-400" />
                  <span>{company.address}</span>
                </div>
              )}
              {company.website && (
                <div className="flex items-center gap-2">
                  <Globe size={12} className="text-slate-400" />
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 transition-colors"
                  >
                    {company.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 font-mono">
              STATUS: ALL SYSTEMS OPERATIONAL
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <span className="text-slate-900 font-semibold block mb-2.5">Navigation</span>
            <a href="#work" className="block text-slate-500 hover:text-slate-950 transition-colors">
              Selected Work
            </a>
            <a href="#services" className="block text-slate-500 hover:text-slate-950 transition-colors">
              Services &amp; Capabilities
            </a>
            <a href="#calculator" className="block text-slate-500 hover:text-slate-950 transition-colors">
              Cost Estimator
            </a>
            <a href="#about" className="block text-slate-500 hover:text-slate-950 transition-colors">
              Principals &amp; Team
            </a>
            <a href="#blog" className="block text-slate-500 hover:text-slate-950 transition-colors">
              Articles &amp; Research
            </a>
            <a href="#faq" className="block text-slate-500 hover:text-slate-950 transition-colors">
              FAQ
            </a>
            <a href="#contact" className="block text-slate-500 hover:text-slate-950 transition-colors">
              Start a Project
            </a>
          </div>

          {/* Quick Portals */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <span className="text-slate-900 font-semibold block mb-2.5">Internal Portals</span>
            <a
              href="http://localhost:3000/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 text-slate-700 hover:text-slate-950 transition-all shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-medium">Next.js Admin Console</span>
              </div>
              <ArrowUpRight size={13} className="text-slate-400" />
            </a>
            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 text-slate-700 hover:text-slate-950 transition-all shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="font-medium">FastAPI Swagger Docs</span>
              </div>
              <ArrowUpRight size={13} className="text-slate-400" />
            </a>
          </div>
        </div>

        {/* Bottom Metadata & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>{company.address || "Muscat, Sultanate of Oman"}</span>
            {company.taxId && (
              <>
                <span>&bull;</span>
                <span className="font-mono">{company.taxId}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Massive Antigravity-Style Editorial Watermark */}
      <div className="w-full pt-10 sm:pt-14 pb-0 overflow-hidden select-none pointer-events-none flex justify-center">
        <h2 className="text-[20vw] font-black tracking-[-0.07em] leading-[0.72] text-slate-950/90 text-center uppercase whitespace-nowrap">
          {company.name || "PIXEL"}
        </h2>
      </div>
    </footer>
  );
};
