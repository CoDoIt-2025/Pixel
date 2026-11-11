import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ServiceItem } from "../data/servicesData";
import { normalizeMediaUrl } from "../lib/api";

export interface HeroSlideItem {
  id: string;
  title: string;
  introPlaceholder: string;
  bannerImage?: string;
  bannerVideo?: string;
  mediaType?: "illustration" | "image" | "video";
  badgeText?: string;
  ctaText?: string;
  ctaLink?: string;
  isCustomBanner?: boolean;
  service?: ServiceItem;
}

interface HeroProps {
  slides?: HeroSlideItem[];
  services?: ServiceItem[];
  selectedIndex: number;
  onSelectService: (index: number) => void;
  onOpenServiceDetails: (service: ServiceItem) => void;
  onNavigateLink?: (link: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  slides,
  services = [],
  selectedIndex,
  onSelectService,
  onOpenServiceDetails,
  onNavigateLink,
}) => {
  // Normalize items to HeroSlideItem array
  const activeItems: HeroSlideItem[] =
    slides && slides.length > 0
      ? slides
      : services.map((srv) => ({
          id: srv.id,
          title: srv.title,
          introPlaceholder: srv.introPlaceholder,
          bannerImage: srv.bannerImage,
          bannerVideo: srv.bannerVideo,
          mediaType: srv.mediaType,
          badgeText: srv.mediaType === "video" ? "Video Banner" : "Commercial Banner Showcase",
          ctaText: "Learn More",
          service: srv,
        }));

  const currentItem = activeItems[selectedIndex] || activeItems[0] || {
    id: "default",
    title: "Pixel Business Solutions",
    introPlaceholder: "Enterprise software and AI engineering studio.",
  };

  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = () => {
    onSelectService((selectedIndex - 1 + activeItems.length) % activeItems.length);
  };

  const handleNext = () => {
    onSelectService((selectedIndex + 1) % activeItems.length);
  };

  // Automatically advance to the next service/banner every 5 seconds (pauses when user hovers)
  useEffect(() => {
    if (!activeItems || activeItems.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      onSelectService((selectedIndex + 1) % activeItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [selectedIndex, activeItems, isPaused, onSelectService]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;
    
    // Only switch slide if horizontal swipe is intentional and stronger than vertical scroll
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const hasVideo = Boolean(
    currentItem.bannerVideo && (currentItem.mediaType === "video" || !currentItem.mediaType)
  );
  const hasImage = Boolean(
    currentItem.bannerImage && (currentItem.mediaType === "image" || (!currentItem.mediaType && !hasVideo))
  );
  const hasMedia = hasVideo || hasImage;

  const handleActionClick = () => {
    if (currentItem.service) {
      onOpenServiceDetails(currentItem.service);
    } else if (currentItem.ctaLink) {
      if (onNavigateLink) {
        onNavigateLink(currentItem.ctaLink);
      } else if (currentItem.ctaLink.startsWith("#")) {
        const targetId = currentItem.ctaLink.replace("#", "");
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -105;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      } else {
        window.location.href = currentItem.ctaLink;
      }
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[500px] sm:min-h-[520px] lg:min-h-[560px] bg-[#121418] text-white pt-8 pb-10 sm:pt-14 sm:pb-16 overflow-hidden select-none border-b border-[#242831] flex flex-col justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Full Hero Background Media (Image or Looping Video) */}
      {/* On mobile screens, focus position is set to 78% where the 3D mockups sit */}
      {hasVideo ? (
        <video
          key={currentItem.bannerVideo}
          src={normalizeMediaUrl(currentItem.bannerVideo)}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[78%_center] sm:object-center z-0 transition-opacity duration-700 animate-in fade-in-50"
        />
      ) : hasImage ? (
        <img
          key={currentItem.bannerImage}
          src={normalizeMediaUrl(currentItem.bannerImage)}
          alt={currentItem.title}
          className="absolute inset-0 w-full h-full object-cover object-[78%_center] sm:object-center z-0 transition-opacity duration-700 animate-in fade-in-50"
        />
      ) : (
        /* Fallback dark mesh pattern with golden radial accents when no custom media is uploaded */
        <div className="absolute inset-0 z-0 bg-[#121418] overflow-hidden">
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#FACC15]/8 rounded-full blur-[120px] pointer-events-none" />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(250, 204, 21, 0.4) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
      )}

      {/* 2. Refined, Balanced Gradient Overlays */}
      {/* Mobile: Bottom-up scrim so text is 100% readable while top/right 3D mockup stays crisp */}
      {/* Desktop: Gentle left scrim so text is readable while wide right image is unobstructed */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-[#121418]/85 to-[#121418]/30 sm:bg-gradient-to-r sm:from-[#121418]/90 sm:via-[#121418]/45 sm:to-transparent z-0 pointer-events-none" />
      {/* Smooth bottom edge blend into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#121418] to-transparent z-0 pointer-events-none" />

      {/* 3. Foreground Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-center min-h-[300px] sm:min-h-[360px]">
          {/* Left Column: Heading, Subtitle & CTA */}
          <div className="md:col-span-7 lg:col-span-6 text-center md:text-left flex flex-col items-center md:items-start space-y-3 sm:space-y-5">
            {/* Mobile Pill Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#121418]/80 backdrop-blur-md border border-[#FACC15]/40 px-3 py-1 rounded-full text-[11px] font-bold text-[#FACC15] shadow-lg mb-1 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse" />
              <span>{currentItem.badgeText || (hasVideo ? "Video Banner" : "Commercial Showcase")}</span>
            </div>

            {/* Title */}
            <h1
              key={currentItem.id || currentItem.title}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-[1.1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] animate-in fade-in duration-500 max-w-xl"
            >
              {currentItem.title}
            </h1>

            {/* Subtitle */}
            <p
              key={`sub-${currentItem.id || currentItem.title}`}
              className="text-xs sm:text-base lg:text-lg text-white/90 font-medium tracking-wide max-w-lg leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] animate-in fade-in duration-500 line-clamp-3 sm:line-clamp-none"
            >
              {currentItem.introPlaceholder}
            </p>

            {/* Action Yellow Button */}
            <div className="pt-2 w-full sm:w-auto">
              <button
                onClick={handleActionClick}
                className="w-full sm:w-auto bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-black text-sm sm:text-base px-8 py-3.5 rounded-xl sm:rounded-2xl transition-all duration-200 shadow-[0_4px_20px_rgba(250,204,21,0.35)] hover:shadow-[0_6px_28px_rgba(250,204,21,0.5)] active:scale-95 cursor-pointer text-center"
              >
                {currentItem.ctaText || "Learn More"}
              </button>
            </div>
          </div>

          {/* Right Column: Intentionally open on desktop so background 3D banner is completely visible */}
          <div className="hidden md:flex md:col-span-5 lg:col-span-6 justify-end items-end h-full">
            {hasMedia && (
              <div className="bg-[#121418]/65 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs text-white/90 flex items-center gap-2 shadow-xl mb-4 select-none">
                <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-pulse" />
                <span className="font-bold tracking-wide">
                  {currentItem.badgeText || (hasVideo ? "Video Banner" : "Commercial Banner Showcase")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Pagination with Left & Right Navigation Arrows */}
        <div className="mt-6 sm:mt-12 flex flex-col items-center justify-center gap-2 select-none">
          <div className="inline-flex items-center gap-2 sm:gap-3.5 bg-[#121418]/80 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/10 shadow-xl">
            {/* Left Navigation Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#FACC15] hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
            >
              <ChevronLeft size={18} strokeWidth={2.4} />
            </button>

            {/* Mobile Slide Counter (01 / 09) */}
            <div className="flex sm:hidden items-center px-2 text-xs font-bold text-white/90 tracking-wider">
              <span className="text-[#FACC15] font-black">{String(selectedIndex + 1).padStart(2, "0")}</span>
              <span className="text-[#4B5563] mx-1.5">/</span>
              <span className="text-[#9CA3AF]">{String(activeItems.length).padStart(2, "0")}</span>
            </div>

            {/* Pagination Dots (Tablet & Desktop) */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-2.5 px-1">
              {activeItems.map((item, index) => {
                const isActive = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectService(index)}
                    aria-label={`Select ${item.title}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? "w-3 h-3 bg-[#FACC15] shadow-[0_0_10px_rgba(250,204,21,0.9)] scale-110"
                        : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#4B5563] hover:bg-[#9CA3AF]"
                    }`}
                  />
                );
              })}
            </div>

            {/* Right Navigation Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#FACC15] hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
            >
              <ChevronRight size={18} strokeWidth={2.4} />
            </button>
          </div>

          {/* Mobile Caption */}
          <span className="sm:hidden text-[11px] text-[#9CA3AF] font-medium tracking-wide">
            Swipe or tap arrows to explore
          </span>
        </div>
      </div>
    </section>
  );
};
