import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Sun, Moon } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

export const Navbar: React.FC = () => {
  const { company, theme, toggleTheme } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
        ? "bg-[#202124]/90 backdrop-blur-xl border-b border-[#45484E]/80 py-3 shadow-2xl shadow-black/40"
        : "bg-gradient-to-b from-[#202124] to-transparent py-4 sm:py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Pixel Logo"
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_2px_8px_rgba(245,197,66,0.3)] transition-all group-hover:scale-105"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-[#202124]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[15px] sm:text-base tracking-tight text-[#F7F7F2] group-hover:text-[#F5C542] transition-colors leading-tight">
              {company.name || "Pixel Business Solutions"}
            </span>
            <span className="text-[10px] text-[#C4C7CC] tracking-wider uppercase font-semibold flex items-center gap-1.5 mt-0.5">
              <span>Oman Focus</span>
              <span className="text-[#45484E]">&bull;</span>
              <span className="text-[#F5C542]">Thrissur, Kerala</span>
            </span>
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[13px] font-semibold text-[#C4C7CC]">
          <a
            href="#home"
            className="hover:text-[#F5C542] transition-colors py-1 relative group"
          >
            <span>Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F5C542] transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#services"
            className="hover:text-[#F5C542] transition-colors py-1 relative group"
          >
            <span>Services</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F5C542] transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#projects"
            className="hover:text-[#F5C542] transition-colors py-1 relative group"
          >
            <span>Projects</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F5C542] transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#blog"
            className="hover:text-[#F5C542] transition-colors py-1 relative group"
          >
            <span>Blog</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F5C542] transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#testimonials"
            className="hover:text-[#F5C542] transition-colors py-1 relative group"
          >
            <span>Testimonials</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F5C542] transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#faq"
            className="hover:text-[#F5C542] transition-colors py-1 relative group"
          >
            <span>FAQ</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F5C542] transition-all duration-200 group-hover:w-full" />
          </a>
          <a
            href="#contact"
            className="hover:text-[#F5C542] transition-colors py-1 relative group"
          >
            <span>Contact Us</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F5C542] transition-all duration-200 group-hover:w-full" />
          </a>
        </nav>

        {/* Right CTA, Theme Toggle & Admin Quick Link */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {/* Quick Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg border border-[#45484E] bg-[#2B2D31]/70 hover:border-[#F5C542] text-[#C4C7CC] hover:text-[#F5C542] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title={theme === "light" ? "Switch to Charcoal Dark Mode" : "Switch to Ivory Light Mode"}
            aria-label="Toggle website theme"
          >
            {theme === "light" ? (
              <>
                <Moon size={15} className="text-[#F5C542]" />
                <span className="hidden md:inline text-[11px]">Dark Mode</span>
              </>
            ) : (
              <>
                <Sun size={15} className="text-[#F5C542]" />
                <span className="hidden md:inline text-[11px]">Light Mode</span>
              </>
            )}
          </button>

          <a
            href="http://localhost:3000/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#45484E] bg-[#2B2D31]/70 hover:border-[#F5C542] text-[12px] font-semibold text-[#C4C7CC] hover:text-[#F7F7F2] transition-all"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
            <span>Admin</span>
            <ArrowUpRight size={12} className="text-[#F5C542]" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#2B2D31] border border-[#45484E] text-[#C4C7CC] hover:text-[#F7F7F2] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#2B2D31]/95 backdrop-blur-2xl border-b border-[#45484E] px-6 py-6 flex flex-col gap-2.5 text-sm font-semibold text-[#F7F7F2] shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <a
            href="#home"
            onClick={() => setMobileOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-[#202124] hover:text-[#F5C542] transition-colors"
          >
            Home
          </a>
          <a
            href="#services"
            onClick={() => setMobileOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-[#202124] hover:text-[#F5C542] transition-colors"
          >
            Services
          </a>
          <a
            href="#projects"
            onClick={() => setMobileOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-[#202124] hover:text-[#F5C542] transition-colors"
          >
            Projects
          </a>
          <a
            href="#blog"
            onClick={() => setMobileOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-[#202124] hover:text-[#F5C542] transition-colors"
          >
            Blog
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-[#202124] hover:text-[#F5C542] transition-colors"
          >
            Testimonials
          </a>
          <a
            href="#faq"
            onClick={() => setMobileOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-[#202124] hover:text-[#F5C542] transition-colors"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="py-2 px-3 rounded-lg hover:bg-[#202124] hover:text-[#F5C542] transition-colors"
          >
            Contact Us
          </a>
          <div className="pt-3 border-t border-[#45484E] flex items-center justify-between">
            <a
              href="http://localhost:3000/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#C4C7CC] hover:text-[#F5C542] flex items-center gap-1.5 py-1"
            >
              <span>Open Admin Panel</span>
              <ArrowUpRight size={13} className="text-[#F5C542]" />
            </a>
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary py-2 px-3 text-xs"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
