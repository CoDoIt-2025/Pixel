import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

export const Navbar: React.FC = () => {
  const { company } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const brandInitial = company.name ? company.name.trim().charAt(0).toUpperCase() : "P";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolled
        ? "bg-white/80 backdrop-blur-md border-b border-slate-200/80 py-3.5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 bg-slate-950 rounded-[6px] flex items-center justify-center text-white text-xs font-semibold tracking-tight transition-transform group-hover:scale-95">
            {brandInitial}
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-slate-900">
            {company.name}
          </span>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-slate-600">
          <a
            href="#work"
            className="hover:text-slate-950 transition-colors"
          >
            Work
          </a>
          <a
            href="#services"
            className="hover:text-slate-950 transition-colors"
          >
            Services
          </a>
          <a
            href="#calculator"
            className="hover:text-slate-950 transition-colors"
          >
            Estimator
          </a>
          <a
            href="#about"
            className="hover:text-slate-950 transition-colors"
          >
            Team
          </a>
          <a
            href="#blog"
            className="hover:text-slate-950 transition-colors"
          >
            Blog
          </a>
          <a
            href="#faq"
            className="hover:text-slate-950 transition-colors"
          >
            FAQ
          </a>
          <a
            href="#contact"
            className="hover:text-slate-950 transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="http://localhost:3000/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium text-slate-600 hover:text-slate-950 transition-colors"
          >
            <span>Admin</span>
            <ArrowUpRight size={13} className="text-slate-400" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-white text-[13px] font-medium tracking-tight transition-colors shadow-xs"
          >
            Start a project
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-950"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-3 text-sm font-medium text-slate-700 shadow-md">
          <a
            href="#work"
            onClick={() => setMobileOpen(false)}
            className="py-2 hover:text-slate-950"
          >
            Work
          </a>
          <a
            href="#services"
            onClick={() => setMobileOpen(false)}
            className="py-2 hover:text-slate-950"
          >
            Services
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileOpen(false)}
            className="py-2 hover:text-slate-950"
          >
            Estimator
          </a>
          <a
            href="#about"
            onClick={() => setMobileOpen(false)}
            className="py-2 hover:text-slate-950"
          >
            Team
          </a>
          <a
            href="#blog"
            onClick={() => setMobileOpen(false)}
            className="py-2 hover:text-slate-950"
          >
            Blog
          </a>
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            className="py-2 hover:text-slate-950"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="py-2 hover:text-slate-950"
          >
            Contact
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="http://localhost:3000/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 text-slate-500 hover:text-slate-950 flex items-center justify-between"
            >
              <span>Admin Console</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
