import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

export const DemoTopBanner: React.FC = () => {
  const { company } = useSettings();
  const phone = company.phone || "+968 9696 7420";
  const email = company.email || "contact@pixelbusiness.si";
  const address = company.address || "H9MX+HMV, Souk Al Ghubrah St, Muscat, Oman";
  const cleanPhone = phone.replace(/[^0-9+]/g, "");

  return (
    <div className="w-full bg-[#FACC15] text-[#111317] select-none shadow-xs relative z-10 py-1.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* ── Mobile View: Perfectly Centered Row with Icon & Contact ── */}
        <div className="flex md:hidden items-center justify-center gap-1.5 w-full text-center py-0.5">
          <MapPin size={13} className="text-[#111317] shrink-0" />
          <span className="font-extrabold text-[11px] text-[#111317] tracking-tight">
            Muscat, Oman &bull;{" "}
            <a href={`tel:${cleanPhone}`} className="hover:underline">
              {phone}
            </a>
          </span>
        </div>

        {/* ── Desktop & Tablet View: Balanced 3-Column Layout ── */}
        <div className="hidden md:flex items-center justify-between w-full font-extrabold text-[12px]">
          {/* Left: Location */}
          <div className="flex items-center gap-1.5 text-left shrink-0">
            <MapPin size={13} className="text-[#111317] shrink-0" />
            <span>{address}</span>
          </div>

          {/* Center: Brand Tagline */}
          <div className="text-center font-black tracking-wide px-4 truncate">
            <span>{company.name || "Pixel Business Solutions LLC"} &bull; Premier Digital Solutions &amp; Engineering Agency</span>
          </div>

          {/* Right: Direct Contact Links */}
          <div className="flex items-center gap-3.5 text-[11px] shrink-0">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1 hover:underline transition-all font-black"
            >
              <Phone size={12} className="text-[#111317]" />
              <span>{phone}</span>
            </a>
            <span className="text-[#111317]/60">&bull;</span>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-1 hover:underline transition-all font-semibold"
            >
              <Mail size={12} className="text-[#111317]" />
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
