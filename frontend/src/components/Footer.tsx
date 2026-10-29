import React from "react";
import { ArrowUpRight, Mail, Phone, MapPin, QrCode } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

export const Footer: React.FC = () => {
  const { company } = useSettings();

  return (
    <footer className="bg-[#202124] border-t border-[#45484E] pt-16 pb-12 text-[#C4C7CC] text-xs">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-[#45484E]">

          {/* Brand & Overview */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Pixel Logo"
                className="h-7 w-auto object-contain drop-shadow-md"
              />
              <span className="font-bold text-[#F7F7F2] text-base tracking-tight">
                {company.name || "Pixel Business Solutions LLC"}
              </span>
            </div>

            <p className="text-xs text-[#C4C7CC] max-w-sm leading-relaxed">
              Helping businesses build a clearer online presence through website design, SEO, Google Business Profile management, social media management, AI visibility and digital QR menus.
            </p>

            <div className="pt-2 space-y-2 text-[11px] text-[#C4C7CC]">
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-[#F5C542]" />
                <a
                  href="mailto:contact@pixelbusiness.om"
                  className="hover:text-[#F5C542] transition-colors"
                >
                  contact@pixelbusiness.om
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-[#F5C542]" />
                <span>+968 2400 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#F5C542]" />
                <span>Muscat, Sultanate of Oman &bull; Supporting Thrissur, Kerala</span>
              </div>
            </div>
          </div>

          {/* Six Services Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-[#F7F7F2] uppercase tracking-wider">
              Six Core Services
            </h4>
            <ul className="space-y-2 text-[11px] text-[#C4C7CC]">
              <li>
                <a href="#services" className="hover:text-[#F5C542] transition-colors">
                  Website Design for Oman Businesses
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F5C542] transition-colors">
                  SEO &amp; Search Optimization
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F5C542] transition-colors">
                  Google Business Profile Management
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F5C542] transition-colors">
                  Social Media Strategy &amp; Calendars
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F5C542] transition-colors">
                  AI Visibility &amp; Entity Data
                </a>
              </li>
              <li>
                <a href="#qr-demo" className="hover:text-[#F5C542] transition-colors flex items-center gap-1.5 text-[#F5C542]">
                  <QrCode size={12} />
                  <span>Digital QR Menus (Hospitality)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation & Site Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#F7F7F2] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-[11px] text-[#C4C7CC]">
              <li>
                <a href="#home" className="hover:text-[#F5C542] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#F5C542] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#F5C542] transition-colors">
                  Projects &amp; Delivery
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-[#F5C542] transition-colors">
                  Blog &amp; Insights
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#F5C542] transition-colors">
                  Client Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F5C542] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#F5C542] transition-colors">
                  Contact Us
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="http://localhost:3000/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7F7F2] transition-colors flex items-center gap-1 text-[#F5C542]"
                >
                  <span>Admin Panel Console</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#C4C7CC]">
          <div>
            &copy; 2026 Pixel Business Solutions LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Primary Focus: Sultanate of Oman</span>
            <span>&bull;</span>
            <span>Secondary Market: Thrissur, Kerala</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
