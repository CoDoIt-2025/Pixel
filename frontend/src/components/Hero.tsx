import React from "react";
import { ArrowRight } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

export const Hero: React.FC = () => {
  const { company } = useSettings();

  return (
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Subtle Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-slate-700 text-xs font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Now accepting select commissions for Q3 / Q4</span>
        </div>

        {/* Headline */}
        <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl tracking-[-0.035em] text-slate-950 leading-[1.08] max-w-4xl mx-auto">
          Software &amp; AI engineering crafted with precision.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          {company.name} is an independent digital studio. {company.description || "We build high-throughput cloud architectures, autonomous AI pipelines, and minimalist web applications."}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-sm font-medium transition-all shadow-xs"
          >
            <span>Explore our work</span>
            <ArrowRight size={15} />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-slate-200 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-900 text-sm font-medium transition-all shadow-2xs"
          >
            Start a project
          </a>
        </div>

        {/* Subtle Stat Highlights */}
        <div className="mt-20 pt-10 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
              $2.7M+
            </div>
            <div className="text-xs text-slate-500 mt-1">Value engineered</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
              &lt;24ms
            </div>
            <div className="text-xs text-slate-500 mt-1">Global edge latency</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
              99.99%
            </div>
            <div className="text-xs text-slate-500 mt-1">SLA benchmark</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-950">
              100%
            </div>
            <div className="text-xs text-slate-500 mt-1">In-house principals</div>
          </div>
        </div>
      </div>
    </section>
  );
};
