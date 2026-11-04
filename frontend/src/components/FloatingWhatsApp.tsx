import React from "react";
import { sound } from "../lib/sound";

interface FloatingWhatsAppProps {
  phone?: string;
  defaultMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phone = "+968 9693 5606",
  defaultMessage = "Hello Pixel Business Solutions, I would like to inquire about your services.",
}) => {
  // Clean phone number for WhatsApp wa.me link (digits only)
  const cleanPhone = phone.replace(/[^0-9]/g, "") || "96896935606";
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 pointer-events-auto select-none"
    >
      {/* Floating pill badge / tooltip */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sound.click()}
        className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg shadow-black/5 text-[#121418] hover:text-[#1EBE5D] hover:border-[#25D366]/40 transition-all duration-300 transform hover:shadow-xl"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-bold tracking-tight">Chat with us</span>
      </a>

      {/* Floating Circular WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Pixel on WhatsApp"
        onClick={() => sound.click()}
        className="relative group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Soft pulse glow background */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 blur-md group-hover:opacity-50 transition-opacity animate-pulse" />

        {/* WhatsApp Icon image from /WhatsApp.svg.webp */}
        <img
          src="/WhatsApp.svg.webp"
          alt="WhatsApp"
          className="relative w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(37,211,102,0.35)] transition-transform duration-300 group-hover:rotate-6"
        />

        {/* Online green indicator badge on the icon */}
        <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white shadow-xs" />
        </span>
      </a>
    </aside>
  );
};
