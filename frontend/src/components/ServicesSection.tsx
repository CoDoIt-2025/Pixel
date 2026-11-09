import React from "react";
import {
  MapPin,
  Search,
  Cpu,
  Monitor,
  Layers,
  MessageSquare,
  Megaphone,
  Film,
  QrCode,
  ArrowRight,
} from "lucide-react";
import type { ServiceItem } from "../data/servicesData";

interface ServicesSectionProps {
  services: ServiceItem[];
  selectedIndex: number;
  onSelectService: (index: number) => void;
  onOpenServiceDetails: (service: ServiceItem) => void;
}

/** Returns the matching Lucide icon component for a given icon name string */
const getServiceIcon = (iconName: string, className: string) => {
  const props = { size: 20, className, strokeWidth: 1.75 };
  switch (iconName) {
    case "MapPin":       return <MapPin {...props} />;
    case "Search":       return <Search {...props} />;
    case "Cpu":          return <Cpu {...props} />;
    case "Monitor":      return <Monitor {...props} />;
    case "Layers":       return <Layers {...props} />;
    case "MessageSquare": return <MessageSquare {...props} />;
    case "Megaphone":    return <Megaphone {...props} />;
    case "Film":         return <Film {...props} />;
    case "QrCode":       return <QrCode {...props} />;
    default:             return <MapPin {...props} />;
  }
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  selectedIndex,
  onSelectService,
  onOpenServiceDetails,
}) => {
  return (
    <section
      id="services"
      className="w-full bg-[#121418] text-white"
    >
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Our Services
          </h2>
          <span className="w-10 h-1.5 bg-[#FACC15] rounded-full inline-block" />
        </div>
        <p className="mt-1.5 text-sm text-[#A1A5B0]">
          Tap any service to explore its full scope &amp; details.
        </p>
      </div>

      {/* ── Full-width Horizontal Tile Band ── */}
      <div className="border-t border-[#242831]">
        {services.map((service, index) => {
          const isActive = index === selectedIndex;

          return (
            <button
              key={service.id}
              onClick={() => {
                onSelectService(index);
                onOpenServiceDetails(service);
              }}
              title={`View ${service.title} details`}
              className={`
                group w-full flex items-center gap-5 px-4 sm:px-8 lg:px-12 py-5 sm:py-6
                border-b border-[#242831] text-left cursor-pointer select-none
                transition-all duration-200 ease-out
                ${isActive
                  ? "bg-[#FACC15]"
                  : "bg-[#121418] hover:bg-[#1D2026]"
                }
              `}
            >
              {/* ── Icon ── */}
              <div
                className={`
                  w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200
                  ${isActive
                    ? "bg-black/15"
                    : "bg-[#FACC15]/10 group-hover:bg-[#FACC15]/20"
                  }
                `}
              >
                {getServiceIcon(
                  service.iconName,
                  isActive
                    ? "text-[#121418]"
                    : "text-[#FACC15] group-hover:text-[#FACC15]"
                )}
              </div>

              {/* ── Title + Subtext ── */}
              <div className="flex-1 min-w-0">
                <div
                  className={`font-bold text-sm sm:text-base leading-tight transition-colors duration-200 ${
                    isActive ? "text-[#121418]" : "text-white"
                  }`}
                >
                  {service.title}
                </div>
                {service.subtext && (
                  <div
                    className={`text-[11px] font-semibold tracking-widest uppercase mt-0.5 transition-colors duration-200 ${
                      isActive ? "text-[#121418]/75" : "text-[#FACC15]/70"
                    }`}
                  >
                    {service.subtext}
                  </div>
                )}
              </div>

              {/* ── Category Tag (desktop only) ── */}
              <div
                className={`hidden lg:block text-xs font-medium shrink-0 max-w-[200px] text-right transition-colors duration-200 ${
                  isActive ? "text-[#121418]/60" : "text-[#525763] group-hover:text-[#A1A5B0]"
                }`}
              >
                {service.category}
              </div>

              {/* ── Arrow ── */}
              <div
                className={`shrink-0 transition-all duration-200 group-hover:translate-x-1 ${
                  isActive ? "text-[#121418]" : "text-[#FACC15]"
                }`}
              >
                <ArrowRight size={18} />
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Bottom padding ── */}
      <div className="h-6" />
    </section>
  );
};
