import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onNavigateHome?: () => void;
  onNavigateAbout?: () => void;
  onNavigateServices?: () => void;
  onNavigateWork?: () => void;
  onNavigateBlog?: () => void;
  onNavigateContact?: () => void;
  onNavigateFaq?: () => void;
  isServicePageActive?: boolean;
  isFaqPageActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigateAbout,
  onNavigateServices,
  onNavigateWork,
  onNavigateBlog,
  onNavigateContact,
  onNavigateFaq,
  isServicePageActive = false,
  isFaqPageActive = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHomeClick = () => {
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAboutClick = () => {
    setMobileMenuOpen(false);
    if (onNavigateAbout) {
      onNavigateAbout();
    } else {
      const el = document.getElementById("about");
      if (el) {
        const yOffset = -75;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const handleServicesClick = () => {
    setMobileMenuOpen(false);
    if (onNavigateServices) {
      onNavigateServices();
    } else {
      const el = document.getElementById("services");
      if (el) {
        const yOffset = -75;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const handleWorkClick = () => {
    setMobileMenuOpen(false);
    if (onNavigateWork) {
      onNavigateWork();
    } else {
      const el = document.getElementById("our-work");
      if (el) {
        const yOffset = -75;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const handleBlogClick = () => {
    setMobileMenuOpen(false);
    if (onNavigateBlog) {
      onNavigateBlog();
    } else {
      const el = document.getElementById("blog");
      if (el) {
        const yOffset = -75;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const handleContactClick = () => {
    setMobileMenuOpen(false);
    if (onNavigateContact) {
      onNavigateContact();
    } else {
      const el = document.getElementById("audit-request");
      if (el) {
        const yOffset = -75;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const handleFaqClick = () => {
    setMobileMenuOpen(false);
    if (onNavigateFaq) {
      onNavigateFaq();
    }
  };

  return (
    <nav className="w-full bg-[#121418] border-b border-[#242831] select-none relative z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={handleHomeClick}
          className="flex items-center gap-3.5 group text-left cursor-pointer border-0 bg-transparent p-0 transition-opacity hover:opacity-95"
        >
          {/* Official 3D PX Emblem */}
          <div className="relative h-10 sm:h-12 w-auto flex items-center justify-center shrink-0">
            <img
              src="/brand/pixel-logo-3d-tight.png"
              alt="Pixel Business Solutions LLC"
              className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(250,204,21,0.25)] transition-transform duration-200 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-black text-lg sm:text-xl tracking-tight text-white leading-tight">
              PIXEL
            </span>
            <span className="text-[9px] sm:text-[10px] text-[#A1A5B0] tracking-widest font-bold uppercase">
              Business Solutions LLC
            </span>
          </div>
        </button>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium">
          {/* Home Link */}
          <button
            onClick={handleHomeClick}
            className={`relative py-1 transition-colors cursor-pointer border-0 bg-transparent ${
              !isServicePageActive
                ? "text-white font-semibold hover:text-[#FACC15]"
                : "text-[#C4C7CC] hover:text-[#FACC15]"
            }`}
          >
            Home
            {!isServicePageActive && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FACC15] rounded-full" />
            )}
          </button>

          <button
            onClick={handleAboutClick}
            className="text-[#C4C7CC] hover:text-[#FACC15] transition-colors py-1 cursor-pointer border-0 bg-transparent"
          >
            About
          </button>

          <button
            onClick={handleServicesClick}
            className={`relative py-1 transition-colors cursor-pointer border-0 bg-transparent ${
              isServicePageActive
                ? "text-[#FACC15] font-semibold"
                : "text-[#C4C7CC] hover:text-[#FACC15]"
            }`}
          >
            Services
            {isServicePageActive && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FACC15] rounded-full" />
            )}
          </button>

          <button
            onClick={handleWorkClick}
            className="text-[#C4C7CC] hover:text-[#FACC15] transition-colors py-1 cursor-pointer border-0 bg-transparent"
          >
            Our Work
          </button>

          <button
            onClick={handleBlogClick}
            className="text-[#C4C7CC] hover:text-[#FACC15] transition-colors py-1 cursor-pointer border-0 bg-transparent"
          >
            Blog
          </button>

          <button
            onClick={handleFaqClick}
            className={`relative py-1 transition-colors cursor-pointer border-0 bg-transparent ${
              isFaqPageActive
                ? "text-[#FACC15] font-semibold"
                : "text-[#C4C7CC] hover:text-[#FACC15]"
            }`}
          >
            FAQ
            {isFaqPageActive && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FACC15] rounded-full" />
            )}
          </button>

          <button
            onClick={handleContactClick}
            className="text-[#C4C7CC] hover:text-[#FACC15] transition-colors py-1 cursor-pointer border-0 bg-transparent"
          >
            Contact
          </button>
        </div>

        {/* Right CTA Button (Desktop) */}
        <div className="hidden md:flex items-center">
          <button
            onClick={handleContactClick}
            className="bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all duration-200 shadow-[0_4px_14px_rgba(250,204,21,0.25)] hover:shadow-[0_6px_20px_rgba(250,204,21,0.4)] hover:scale-[1.02] cursor-pointer border-0"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-[#FACC15] focus:outline-none transition-colors border-0 bg-transparent cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181B22] border-b border-[#2B303C] px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 font-semibold text-sm">
            <button
              onClick={handleHomeClick}
              className="text-left text-[#FACC15] py-1 border-b border-[#2B303C]/60 bg-transparent cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={handleAboutClick}
              className="text-left text-[#D1D5DB] hover:text-[#FACC15] py-1 border-b border-[#2B303C]/60 bg-transparent cursor-pointer"
            >
              About
            </button>
            <button
              onClick={handleServicesClick}
              className="text-left text-[#D1D5DB] hover:text-[#FACC15] py-1 border-b border-[#2B303C]/60 bg-transparent cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={handleWorkClick}
              className="text-left text-[#D1D5DB] hover:text-[#FACC15] py-1 border-b border-[#2B303C]/60 cursor-pointer bg-transparent"
            >
              Our Work
            </button>
            <button
              onClick={handleBlogClick}
              className="text-left text-[#D1D5DB] hover:text-[#FACC15] py-1 border-b border-[#2B303C]/60 cursor-pointer bg-transparent"
            >
              Blog
            </button>
            <button
              onClick={handleFaqClick}
              className="text-left text-[#D1D5DB] hover:text-[#FACC15] py-1 border-b border-[#2B303C]/60 cursor-pointer bg-transparent"
            >
              FAQ
            </button>
            <button
              onClick={handleContactClick}
              className="text-left text-[#D1D5DB] hover:text-[#FACC15] py-1 bg-transparent cursor-pointer"
            >
              Contact
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={handleContactClick}
              className="block w-full text-center bg-[#FACC15] text-[#121418] font-bold py-3 rounded-full text-sm shadow-md cursor-pointer border-0"
            >
              Let's Talk
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
