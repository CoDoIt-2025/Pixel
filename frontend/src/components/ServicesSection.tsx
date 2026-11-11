import React, { useRef, useEffect } from "react";
import {
  MapPin,
  Search,
  Monitor,
  Layers,
  MessageSquare,
  Megaphone,
  Film,
  QrCode,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import type { ServiceItem } from "../data/servicesData";

interface ServicesSectionProps {
  services: ServiceItem[];
  selectedIndex: number;
  onSelectService: (index: number) => void;
  onOpenServiceDetails: (service: ServiceItem) => void;
}

/** Icon renderer */
const ServiceIcon: React.FC<{ iconName: string; size?: number }> = ({ iconName, size = 18 }) => {
  const props = { size, strokeWidth: 2 };
  switch (iconName) {
    case "MapPin": return <MapPin {...props} />;
    case "Search": return <Search {...props} />;
    case "Cpu": return <Sparkles {...props} />;
    case "Monitor": return <Monitor {...props} />;
    case "Layers": return <Layers {...props} />;
    case "MessageSquare": return <MessageSquare {...props} />;
    case "Megaphone": return <Megaphone {...props} />;
    case "Film": return <Film {...props} />;
    case "QrCode": return <QrCode {...props} />;
    default: return <Sparkles {...props} />;
  }
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  selectedIndex,
  onSelectService,
  onOpenServiceDetails,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isUserInteractingRef = useRef<boolean>(false);
  const resumeTimeoutRef = useRef<any>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // Triple the array for seamless infinite looping
  const loopedServices = services.length > 0 ? [...services, ...services, ...services] : [];

  const pauseAutoLoop = (resumeDelayMs = 2500) => {
    isUserInteractingRef.current = true;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
    }, resumeDelayMs);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -180 : 180;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      pauseAutoLoop(3000);
    }
  };

  // Seamless infinite loop repositioning
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el || services.length === 0) return;
    const third = el.scrollWidth / 3;
    if (third <= 0) return;

    if (el.scrollLeft >= third * 2) {
      el.scrollLeft -= third;
    } else if (el.scrollLeft <= 10) {
      el.scrollLeft += third;
    }
  };

  // Initialize scroll position in the middle set
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el && services.length > 0) {
      const third = el.scrollWidth / 3;
      el.scrollLeft = third;
    }
  }, [services]);

  // Continuous Auto-Scroll Loop (Pauses when user scrolls/interacts, resumes automatically)
  useEffect(() => {
    if (services.length === 0) return;

    const speed = 0.75; // Smooth continuous moving speed

    const autoScrollLoop = () => {
      const el = scrollContainerRef.current;
      if (el && !isUserInteractingRef.current) {
        el.scrollLeft += speed;
        const third = el.scrollWidth / 3;
        if (third > 0) {
          if (el.scrollLeft >= third * 2) {
            el.scrollLeft -= third;
          } else if (el.scrollLeft <= 5) {
            el.scrollLeft += third;
          }
        }
      }
      animFrameIdRef.current = requestAnimationFrame(autoScrollLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(autoScrollLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [services]);

  // Touch and mouse drag functionality with instant pause on interaction
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      pauseAutoLoop(3000);
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    const handleMouseLeave = () => {
      if (isDown) {
        isDown = false;
        pauseAutoLoop(1500);
      }
    };
    const handleMouseUp = () => {
      if (isDown) {
        isDown = false;
        pauseAutoLoop(2000);
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      pauseAutoLoop(3000);
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section id="services" className="relative bg-[#0E1014] text-white pt-8 sm:pt-10 select-none overflow-hidden">
      {/* ── Section Header with Navigation Controls ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex items-end justify-between gap-4">
        <div className="reveal-on-scroll">
          <div className="flex items-center gap-3 mb-1.5">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Our Services
            </h2>
            <span className="w-8 sm:w-10 h-1.5 rounded-full bg-[#FACC15] inline-block" />
          </div>
          <p className="text-xs sm:text-sm text-[#9CA3AF] reveal-on-scroll reveal-delay-1">
            Click any service to explore its full scope &amp; details.
          </p>
        </div>

        {/* Left & Right Smooth Scroll Buttons */}
        <div className="flex items-center gap-2 select-none shrink-0">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="w-8 h-8 rounded-full bg-[#1A1D24] border border-[#282C37] text-[#A1A5B0] hover:text-[#FACC15] active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="w-8 h-8 rounded-full bg-[#1A1D24] border border-[#282C37] text-[#A1A5B0] hover:text-[#FACC15] active:scale-90 flex items-center justify-center transition-all cursor-pointer shadow-sm"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Movable Infinite Loop Cards Row ── */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onTouchStart={() => pauseAutoLoop(3500)}
        onTouchMove={() => pauseAutoLoop(3500)}
        onTouchEnd={() => pauseAutoLoop(2000)}
        onMouseEnter={() => { isUserInteractingRef.current = true; }}
        onMouseLeave={() => pauseAutoLoop(1200)}
        className="flex gap-3.5 sm:gap-4 overflow-x-auto scroll-smooth py-3 px-4 sm:px-6 lg:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-x cursor-grab active:cursor-grabbing"
      >
        {loopedServices.map((service, loopIdx) => {
          const originalIndex = loopIdx % services.length;
          const isActive = originalIndex === selectedIndex;

          // Theme cycling:
          // Active -> Yellow
          // Even -> Dark Charcoal
          // Odd -> White
          let theme: "yellow" | "white" | "dark" = "dark";
          if (isActive) {
            theme = "yellow";
          } else if (originalIndex % 2 === 1) {
            theme = "white";
          } else {
            theme = "dark";
          }

          return (
            <div
              key={`${service.id}-${loopIdx}`}
              onClick={() => {
                onSelectService(originalIndex);
                onOpenServiceDetails(service);
              }}
              className={`w-[145px] sm:w-[165px] md:w-[185px] h-[195px] sm:h-[215px] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shrink-0 select-none cursor-pointer transition-all duration-300 transform hover:scale-[1.03] active:scale-95 group ${
                theme === "yellow"
                  ? "bg-[#FACC15] text-[#121418] shadow-[0_8px_20px_rgba(250,204,21,0.28)]"
                  : theme === "white"
                  ? "bg-white text-[#121418] shadow-md hover:shadow-lg"
                  : "bg-[#181B22] border border-[#282C37] text-white shadow-md hover:border-[#FACC15]/40"
              }`}
            >
              {/* Top: Icon Container */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shrink-0 ${
                  theme === "yellow"
                    ? "bg-black/10 text-[#121418]"
                    : theme === "white"
                    ? "bg-slate-100 text-[#121418]"
                    : "bg-[#FACC15]/15 border border-[#FACC15]/30 text-[#FACC15]"
                }`}
              >
                <ServiceIcon iconName={service.iconName} size={18} />
              </div>

              {/* Middle: Title & Subtitle */}
              <div className="flex-1 flex flex-col justify-center my-2">
                <h3
                  className={`text-xs sm:text-sm font-black leading-tight mb-1 line-clamp-2 ${
                    theme === "dark" ? "text-white" : "text-[#121418]"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-[10px] sm:text-[11px] leading-snug line-clamp-2 ${
                    theme === "yellow"
                      ? "text-[#121418]/80 font-semibold"
                      : theme === "white"
                      ? "text-[#525763] font-medium"
                      : "text-[#9CA3AF] font-medium"
                  }`}
                >
                  {service.shortDesc || service.subtext || service.category}
                </p>
              </div>

              {/* Bottom: Arrow Button */}
              <div className="flex justify-end pt-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 ${
                    theme === "yellow"
                      ? "bg-black/10 text-[#121418]"
                      : theme === "white"
                      ? "bg-slate-100 text-[#121418]"
                      : "bg-white/10 text-[#FACC15]"
                  }`}
                >
                  <ArrowUpRight size={13} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Organic Dual-Layer Wave Curve Transition to "About Pixel" ── */}
      <div className="relative w-full overflow-hidden leading-none z-10 pt-6 sm:pt-10 -mb-[1px] pointer-events-none">
        <svg
          className="w-full h-14 sm:h-20 md:h-24 block"
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1: Golden yellow accent wave swooshing on the right side */}
          <path
            d="M0,140 L1440,140 L1440,45 C1260,10 1020,35 780,95 C620,135 340,138 0,140 Z"
            fill="#FACC15"
          />
          {/* Layer 2: Crisp pure white organic wave flowing seamlessly into About Pixel */}
          <path
            d="M0,18 C380,18 720,82 1080,112 C1260,124 1360,134 1440,140 L1440,140 L0,140 Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  );
};
