import React from "react";
import { ArrowDownRight, Compass, Cpu, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { sound } from "../lib/sound";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-between border-b border-white/10 bg-grid-pattern overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Top Metadata Blueprint Ribbon */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10 font-mono text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-white inline-block animate-ping" />
            <span className="text-white font-semibold">PIXEL PROTOCOL 0.1</span>
            <span className="text-zinc-600">//</span>
            <span>AUTONOMOUS SOFTWARE &amp; AI ENGINEERING</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2">
              <Compass size={13} className="text-zinc-500" />
              <span>COORDINATES: 37.7749&deg; N, 122.4194&deg; W</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>SYSTEMS NOMINAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center Manifesto Typography */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full my-auto py-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-zinc-300 font-mono text-xs uppercase tracking-wider">
            <Sparkles size={12} className="text-white" />
            <span>BESPOKE DIGITAL ARTIFACTS FOR INDUSTRY TITANS</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[0.92] uppercase text-white">
            WE ENGINEER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-600">
              FOR THE FRONTIER.
            </span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-start">
            <p className="md:col-span-7 font-body text-zinc-400 text-lg sm:text-xl font-light leading-relaxed">
              Pixel is an elite software atelier. We craft autonomous AI
              infrastructures, fault-tolerant cloud backends, and tactile
              monochrome web applications for enterprises that refuse mediocrity.
            </p>

            <div className="md:col-span-5 flex flex-wrap gap-4 items-center md:justify-end">
              <a
                href="#work"
                onClick={() => sound.tactile()}
                className="px-7 py-3.5 bg-white text-black font-tech font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2 group"
              >
                <span>EXPLORE WORK</span>
                <ArrowDownRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>

              <a
                href="#inquire"
                onClick={() => sound.click()}
                className="px-7 py-3.5 border border-white/20 hover:border-white text-white font-tech font-semibold text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                REQUEST SCOPE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Architectural Spec Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/10 font-mono">
          <div className="p-6 border-r border-b border-white/10 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-2 text-zinc-500 text-xs mb-2">
              <Cpu size={14} className="text-zinc-400" />
              <span>STACK_CORE</span>
            </div>
            <div className="font-tech text-xl font-bold text-white tracking-wide">
              FASTAPI &bull; NEXT 16
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Async Python backend + React 19 Turbopack
            </p>
          </div>

          <div className="p-6 border-r border-b border-white/10 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-2 text-zinc-500 text-xs mb-2">
              <Layers size={14} className="text-zinc-400" />
              <span>LATENCY_BENCH</span>
            </div>
            <div className="font-tech text-xl font-bold text-white tracking-wide">
              &lt; 24ms
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Sub-millisecond SQLite query execution
            </p>
          </div>

          <div className="p-6 border-r border-b border-white/10 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-2 text-zinc-500 text-xs mb-2">
              <ShieldCheck size={14} className="text-zinc-400" />
              <span>DEPLOYED_VALUE</span>
            </div>
            <div className="font-tech text-xl font-bold text-white tracking-wide">
              $870,000+
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Active enterprise contract deliverables
            </p>
          </div>

          <div className="p-6 border-r border-b border-white/10 hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-2 text-zinc-500 text-xs mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>DISPONIBILITY</span>
            </div>
            <div className="font-tech text-xl font-bold text-white tracking-wide">
              Q3 / Q4 2026
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Accepting 2 new enterprise commissions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
