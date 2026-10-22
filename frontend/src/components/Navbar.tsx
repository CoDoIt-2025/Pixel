import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, ArrowUpRight, Menu, X, Terminal } from "lucide-react";
import { sound } from "../lib/sound";

export const Navbar: React.FC = () => {
  const [soundActive, setSoundActive] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [timeUtc, setTimeUtc] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(
        now.toLocaleTimeString("en-GB", {
          timeZone: "UTC",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSoundToggle = () => {
    const active = sound.toggle();
    setSoundActive(active);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md border-b border-white/10 py-3.5"
          : "bg-transparent border-b border-white/5 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand & Studio Status */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            onClick={() => sound.click()}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 bg-white flex items-center justify-center font-mono font-bold text-black text-sm tracking-tighter transition-transform duration-300 group-hover:scale-95">
              PX
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg tracking-wider uppercase text-white leading-none">
                PIXEL
              </span>
              <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                ENGINEERING ATELIER
              </span>
            </div>
          </a>

          {/* Telemetry Indicator */}
          <div className="hidden lg:flex items-center gap-3 pl-6 border-l border-white/10 font-mono text-[11px] text-zinc-400">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-500">UTC</span>
            <span className="text-zinc-200">{timeUtc || "00:00:00"}</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-500">SF&bull;LON&bull;BLR</span>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-tech text-xs tracking-wider uppercase">
          <a
            href="#work"
            onClick={() => sound.click()}
            className="text-zinc-400 hover:text-white transition-colors relative py-1"
          >
            <span>01 // WORK</span>
          </a>
          <a
            href="#capabilities"
            onClick={() => sound.click()}
            className="text-zinc-400 hover:text-white transition-colors relative py-1"
          >
            <span>02 // CAPABILITIES</span>
          </a>
          <a
            href="#estimator"
            onClick={() => sound.click()}
            className="text-zinc-400 hover:text-white transition-colors relative py-1"
          >
            <span>03 // ESTIMATOR</span>
          </a>
          <a
            href="#atelier"
            onClick={() => sound.click()}
            className="text-zinc-400 hover:text-white transition-colors relative py-1"
          >
            <span>04 // ATELIER</span>
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Audio Haptic Toggle */}
          <button
            onClick={handleSoundToggle}
            title="Toggle Tactile Audio Feedback"
            className="p-2 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-all text-xs"
          >
            {soundActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Admin Dashboard Jump */}
          <a
            href="http://localhost:3000/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.click()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-white/15 hover:border-white text-zinc-300 hover:text-white font-mono text-[11px] transition-all"
          >
            <Terminal size={12} className="text-zinc-400" />
            <span>ADMIN_PORTAL</span>
            <ArrowUpRight size={11} className="text-zinc-500" />
          </a>

          {/* Primary CTA */}
          <a
            href="#inquire"
            onClick={() => sound.click()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-white text-black font-tech font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all hover:translate-x-0.5"
          >
            <span>INITIATE PROJECT</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => {
              sound.click();
              setMobileOpen(!mobileOpen);
            }}
            className="md:hidden p-2 border border-white/10 text-white"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-b border-white/10 px-6 py-6 flex flex-col gap-4 font-tech text-sm uppercase tracking-wider">
          <a
            href="#work"
            onClick={() => {
              sound.click();
              setMobileOpen(false);
            }}
            className="text-zinc-400 hover:text-white py-2 border-b border-white/5"
          >
            01 // WORK
          </a>
          <a
            href="#capabilities"
            onClick={() => {
              sound.click();
              setMobileOpen(false);
            }}
            className="text-zinc-400 hover:text-white py-2 border-b border-white/5"
          >
            02 // CAPABILITIES
          </a>
          <a
            href="#estimator"
            onClick={() => {
              sound.click();
              setMobileOpen(false);
            }}
            className="text-zinc-400 hover:text-white py-2 border-b border-white/5"
          >
            03 // ESTIMATOR
          </a>
          <a
            href="#atelier"
            onClick={() => {
              sound.click();
              setMobileOpen(false);
            }}
            className="text-zinc-400 hover:text-white py-2 border-b border-white/5"
          >
            04 // ATELIER
          </a>
          <a
            href="#inquire"
            onClick={() => {
              sound.click();
              setMobileOpen(false);
            }}
            className="w-full text-center py-3 bg-white text-black font-bold mt-2"
          >
            INITIATE PROJECT &rarr;
          </a>
        </div>
      )}
    </header>
  );
};
