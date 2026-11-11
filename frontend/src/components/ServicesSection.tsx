import React, { useRef } from "react";
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
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { ServiceItem } from "../data/servicesData";
import { normalizeMediaUrl } from "../lib/api";

interface ServicesSectionProps {
  services: ServiceItem[];
  selectedIndex: number;
  onSelectService: (index: number) => void;
  onOpenServiceDetails: (service: ServiceItem) => void;
}

/** Icon renderer with inline color */
const ServiceIcon: React.FC<{ iconName: string; color: string }> = ({ iconName, color }) => {
  const props = { size: 20, strokeWidth: 1.8, style: { color } };
  switch (iconName) {
    case "MapPin": return <MapPin {...props} />;
    case "Search": return <Search {...props} />;
    case "Cpu": return <Cpu {...props} />;
    case "Monitor": return <Monitor {...props} />;
    case "Layers": return <Layers {...props} />;
    case "MessageSquare": return <MessageSquare {...props} />;
    case "Megaphone": return <Megaphone {...props} />;
    case "Film": return <Film {...props} />;
    case "QrCode": return <QrCode {...props} />;
    default: return <MapPin {...props} />;
  }
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  selectedIndex,
  onSelectService,
  onOpenServiceDetails,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="bg-[#0E1014] text-white pt-10 pb-8 border-b border-[#242831]">
      {/* ── Section Header with Navigation Controls ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Our Services
              </h2>
              <span className="w-8 sm:w-10 h-1.5 rounded-full bg-[#FACC15] inline-block" />
            </div>
            <p className="text-xs sm:text-sm text-[#9CA3AF]">
              Swipe horizontally or click any service card to view complete deliverables.
            </p>
          </div>

          {/* Left & Right Horizontal Navigation Buttons */}
          <div className="flex items-center gap-2 select-none">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1A1D24] hover:bg-[#242831] active:scale-90 text-white hover:text-[#FACC15] border border-[#2B303C] hover:border-[#FACC15] flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1A1D24] hover:bg-[#242831] active:scale-90 text-white hover:text-[#FACC15] border border-[#2B303C] hover:border-[#FACC15] flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Fluid Horizontal Scrolling Row with 3D Banner Previews ── */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-6 lg:px-8 py-3 select-none scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {services.map((service, index) => {
          const isActive = index === selectedIndex;

          return (
            <div
              key={service.id}
              onClick={() => {
                onSelectService(index);
                onOpenServiceDetails(service);
              }}
              className={`w-[270px] sm:w-[310px] shrink-0 snap-start rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer ${
                isActive
                  ? "bg-[#161920] border-[#FACC15] shadow-[0_0_24px_rgba(250,204,21,0.18)]"
                  : "bg-[#111317] hover:bg-[#161920] border-[#242831] hover:border-[#FACC15]/50 shadow-lg"
              }`}
            >
              {/* Card Top: 3D Banner Media Preview */}
              <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-[#1A1D24]">
                {service.bannerImage ? (
                  <img
                    src={normalizeMediaUrl(service.bannerImage)}
                    alt={service.title}
                    className="w-full h-full object-cover object-[75%_center] group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1A1D24] flex items-center justify-center">
                    <ServiceIcon iconName={service.iconName} color="#FACC15" />
                  </div>
                )}
                {/* Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-black/30" />

                {/* Icon floating chip */}
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-[#121418]/85 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                  <ServiceIcon iconName={service.iconName} color="#FACC15" />
                </div>

                {/* Starting price chip */}
                {service.startingPrice && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#FACC15] text-[#121418] text-[10px] font-black tracking-wide shadow-md">
                    OMR {service.startingPrice}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#111317]">
                <div>
                  <span className="text-[10px] font-bold text-[#FACC15] uppercase tracking-wider block mb-1">
                    {service.category}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#FACC15] transition-colors leading-snug line-clamp-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] line-clamp-2 mt-1.5 leading-relaxed">
                    {service.shortDesc || service.fullDesc}
                  </p>
                </div>

                {/* Footer with Action */}
                <div className="mt-4 pt-3 border-t border-[#242831] flex items-center justify-between text-xs font-semibold text-[#A1A5B0] group-hover:text-white transition-colors">
                  <span className="text-[11px] font-bold text-[#FACC15] flex items-center gap-1">
                    Explore Scope
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-[#FACC15] group-hover:text-[#121418] text-[#FACC15] flex items-center justify-center transition-all duration-200">
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom Swipe Guidance Caption ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 flex items-center justify-between text-xs text-[#717682]">
        <span className="text-[11px] font-medium text-[#9CA3AF] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-ping" />
          <span>Swipe horizontally to explore all {services.length} services</span>
        </span>
        <span className="text-[11px] text-[#717682] hidden sm:inline">
          Drag, swipe, or use arrows
        </span>
      </div>
    </section>
  );
};
