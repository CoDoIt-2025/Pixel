import React from "react";
import { ArrowUpRight, Terminal } from "lucide-react";
import { sound } from "../lib/sound";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-16 text-zinc-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-white text-black font-mono font-bold flex items-center justify-center text-xs">
                PX
              </div>
              <span className="font-display font-extrabold text-xl text-white uppercase tracking-wider">
                PIXEL
              </span>
            </div>
            <p className="font-body text-zinc-400 text-xs max-w-sm leading-relaxed">
              Atelier for autonomous AI pipelines, resilient cloud backends, and tactile monochrome user interfaces.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[11px] text-zinc-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>SERVER: FASTAPI (PY 3.14) &bull; SQLITE LOCAL DB</span>
            </div>
          </div>

          {/* Quick Jumps */}
          <div className="md:col-span-3 space-y-3 font-tech text-xs uppercase tracking-wider">
            <span className="text-white font-mono text-[11px] block text-zinc-500 mb-2">INDEX</span>
            <a href="#work" onClick={() => sound.click()} className="block hover:text-white transition-colors">
              01 // Selected Work
            </a>
            <a href="#capabilities" onClick={() => sound.click()} className="block hover:text-white transition-colors">
              02 // Capabilities
            </a>
            <a href="#estimator" onClick={() => sound.click()} className="block hover:text-white transition-colors">
              03 // Scope Estimator
            </a>
            <a href="#atelier" onClick={() => sound.click()} className="block hover:text-white transition-colors">
              04 // Engineering Atelier
            </a>
            <a href="#inquire" onClick={() => sound.click()} className="block hover:text-white transition-colors">
              05 // Inquire
            </a>
          </div>

          {/* System & Dev Links */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-white text-[11px] block text-zinc-500 mb-2">TELEMETRY &amp; PORTALS</span>
            <a
              href="http://localhost:3000/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="flex items-center justify-between p-3 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all bg-zinc-950"
            >
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-white" />
                <span>Next.js Admin Console</span>
              </div>
              <ArrowUpRight size={13} />
            </a>

            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="flex items-center justify-between p-3 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white transition-all bg-zinc-950"
            >
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">API</span>
                <span>FastAPI Swagger Docs</span>
              </div>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-600">
          <div>
            &copy; {new Date().getFullYear()} PIXEL TECHNOLOGIES INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>SF &bull; LON &bull; BLR &bull; TYO</span>
            <span>//</span>
            <span>END_OF_PAGE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
