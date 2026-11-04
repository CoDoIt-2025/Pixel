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
  ArrowRight,
} from "lucide-react";
import type { ServiceItem } from "../data/servicesData";

interface ServicesSectionProps {
  services: ServiceItem[];
  selectedIndex: number;
  onSelectService: (index: number) => void;
  onOpenServiceDetails: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  selectedIndex,
  onSelectService,
  onOpenServiceDetails,
}) => {
  const touchStartXRef = useRef<number | null>(null);

  const getServiceIcon = (iconName: string, isActive: boolean) => {
    const iconProps = {
      size: 19,
      className: isActive ? "text-[#111317]" : "text-[#111317]",
      strokeWidth: 2,
    };

    switch (iconName) {
      case "MapPin":
        return <MapPin {...iconProps} />;
      case "Search":
        return <Search {...iconProps} />;
      case "Cpu":
        return <Cpu {...iconProps} />;
      case "Monitor":
        return <Monitor {...iconProps} />;
      case "Layers":
        return <Layers {...iconProps} />;
      case "MessageSquare":
        return <MessageSquare {...iconProps} />;
      case "Megaphone":
        return <Megaphone {...iconProps} />;
      case "Film":
        return <Film {...iconProps} />;
      case "QrCode":
        return <QrCode {...iconProps} />;
      default:
        return <MapPin {...iconProps} />;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      onSelectService((selectedIndex + 1) % services.length);
    } else if (diff < -40) {
      onSelectService((selectedIndex - 1 + services.length) % services.length);
    }
    touchStartXRef.current = null;
  };

  const currentService = services[selectedIndex] || services[0];

  return (
    <section
      id="services"
      className="w-full bg-[#FAF9F5] py-6 sm:py-8 text-[#121418] border-b border-[#E5E5DF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header */}
        <div className="mb-4 sm:mb-5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#121418]">
              {/* Desktop heading */}
              <span className="hidden sm:inline">Explore our services</span>
              {/* Mobile heading */}
              <span className="inline sm:hidden">Our services</span>
            </h2>
            {/* Yellow Accent Dash Bar */}
            <span className="w-8 sm:w-12 h-1 sm:h-1.5 bg-[#FACC15] rounded-full inline-block" />
          </div>

          <p className="mt-1 text-xs text-[#525763] italic">
            <span className="hidden sm:inline">
              Click any service to view its dedicated agency page & scope.
            </span>
            <span className="inline sm:hidden">Swipe through 9 services.</span>
          </p>
        </div>

        {/* Compact Desktop 3x3 Grid (Image 1 Refined & Reduced Size) */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-3.5">
          {services.map((service, index) => {
            const isActive = index === selectedIndex;

            return (
              <button
                key={service.id}
                onClick={() => {
                  onSelectService(index);
                  // Open dedicated full service page
                  onOpenServiceDetails(service);
                }}
                title={`View ${service.title} service page`}
                className={`group flex items-center gap-3 px-3 py-2.5 sm:px-3.5 sm:py-3 rounded-xl text-left transition-all duration-150 border cursor-pointer select-none ${
                  isActive
                    ? "bg-[#FACC15] border-[#FACC15] shadow-sm shadow-[#FACC15]/25"
                    : "bg-white border-[#E2E4E9] hover:border-[#FACC15] hover:shadow-sm"
                }`}
              >
                {/* Compact Icon Container with Vertical Divider (Matching wireframe) */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? "bg-black/10" : "bg-[#F4F4F0] group-hover:bg-[#FACC15]/20"
                    }`}
                  >
                    {getServiceIcon(service.iconName, isActive)}
                  </div>
                  <div
                    className={`w-[1px] h-6 sm:h-7 transition-colors ${
                      isActive ? "bg-black/20" : "bg-[#E2E4E9]"
                    }`}
                  />
                </div>

                {/* Service Title & Subtext */}
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs sm:text-sm text-[#121418] leading-tight truncate">
                    {service.title}
                  </div>
                  {service.subtext && (
                    <div
                      className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase mt-0.5 truncate ${
                        isActive ? "text-[#121418]/80" : "text-[#717682]"
                      }`}
                    >
                      {service.subtext}
                    </div>
                  )}
                </div>

                {/* Subtle Right Arrow on Hover */}
                <div className="shrink-0 text-[#717682] group-hover:text-[#121418] transition-colors pr-1 opacity-60 group-hover:opacity-100">
                  <ArrowRight size={14} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Compact Mobile Swipeable Card (Image 2) */}
        <div
          className="sm:hidden flex flex-col items-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Active Service Card in Mobile */}
          <div className="w-full bg-white border border-[#D5D8E0] rounded-xl p-3.5 shadow-sm relative">
            <div className="flex items-start gap-3">
              {/* Icon Container */}
              <div className="w-11 h-11 rounded-xl bg-[#FAF9F5] border border-[#E5E5DF] flex items-center justify-center shrink-0">
                {getServiceIcon(currentService.iconName, true)}
              </div>

              {/* Title & Short Description */}
              <div className="flex-1 min-w-0">
                <h3 className="font-extrabold text-sm text-[#121418] leading-snug">
                  {currentService.title}
                </h3>
                <p className="text-xs text-[#525763] italic mt-0.5 line-clamp-2">
                  {currentService.shortDesc}
                </p>

                {/* Learn More -> Link */}
                <button
                  onClick={() => onOpenServiceDetails(currentService)}
                  className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-[#121418] hover:text-[#D97706] transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight size={13} className="text-[#121418]" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Pagination for Mobile */}
          <div className="flex items-center gap-1.5 mt-3">
            {services.map((service, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={service.id}
                  onClick={() => onSelectService(index)}
                  aria-label={`Select service ${index + 1}`}
                  className={`transition-all duration-200 rounded-full cursor-pointer ${
                    isActive
                      ? "w-2.5 h-2 bg-[#FACC15] scale-110"
                      : "w-1.5 h-1.5 bg-[#D1D5DB]"
                  }`}
                />
              );
            })}
          </div>

          {/* Mobile Footnote */}
          <span className="text-[10px] text-[#717682] italic tracking-wide mt-1.5">
            Learn More opens the service page.
          </span>
        </div>
      </div>
    </section>
  );
};
