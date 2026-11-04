import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export const DemoTopBanner: React.FC = () => {
  return (
    <div className="w-full bg-[#FACC15] text-[#111317] font-extrabold text-[11px] sm:text-[12px] py-1.5 px-4 sm:px-6 flex items-center justify-between select-none shadow-xs sticky top-0 z-50">
      {/* Left: Location & Commercial Reg */}
      <div className="hidden md:flex items-center gap-2">
        <MapPin size={13} className="text-[#111317] shrink-0" />
        <span>Muscat, Sultanate of Oman</span>
        <span className="text-[#111317]/60">&bull;</span>
        <span className="font-bold text-[10px] uppercase tracking-wider text-[#111317]/80">
          CR: 1049281
        </span>
      </div>

      {/* Center: Official Tagline */}
      <div className="flex-1 text-center font-black tracking-wide">
        <span className="hidden sm:inline">
          Pixel Business Solutions LLC &bull; Premier Digital Solutions &amp; Engineering Agency
        </span>
        <span className="inline sm:hidden flex items-center justify-center gap-1.5">
          <MapPin size={12} />
          <span>Muscat, Oman &bull; +968 9693 5606</span>
        </span>
      </div>

      {/* Right: Direct Contact Links */}
      <div className="hidden lg:flex items-center gap-4 text-[11px]">
        <a
          href="tel:+96896935606"
          className="flex items-center gap-1.5 hover:underline transition-all"
        >
          <Phone size={12} className="text-[#111317]" />
          <span>+968 9693 5606</span>
        </a>
        <span className="text-[#111317]/60">&bull;</span>
        <a
          href="mailto:contact@pixelbusiness.om"
          className="flex items-center gap-1.5 hover:underline transition-all"
        >
          <Mail size={12} className="text-[#111317]" />
          <span>contact@pixelbusiness.om</span>
        </a>
      </div>
    </div>
  );
};
