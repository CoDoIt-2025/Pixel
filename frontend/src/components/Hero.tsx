import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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

const renderHighlightedTitle = (title: string) => {
  if (title.includes("&")) {
    const parts = title.split("&");
    return (
      <>
        <span>{parts[0]}</span>
        <span className="text-[#FACC15]">&amp;{parts.slice(1).join("&")}</span>
      </>
    );
  }
  const words = title.split(" ");
  if (words.length > 2) {
    const firstPart = words.slice(0, words.length - 2).join(" ");
    const lastPart = words.slice(words.length - 2).join(" ");
    return (
      <>
        <span>{firstPart} </span>
        <span className="text-[#FACC15]">{lastPart}</span>
      </>
    );
  }
  return title;
};

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
          badgeText: srv.mediaType === "video" ? "Video Banner" : "Grow Your Local Business",
          ctaText: "Learn More",
          service: srv,
        }));

  const currentItem = activeItems[selectedIndex] || activeItems[0] || {
    id: "default",
    title: "Pixel Business Solutions",
    introPlaceholder: "Enterprise software and AI engineering studio.",
  };

  const touchStartXRef = useRef<number | null>(null);
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
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 30) {
      handleNext();
    } else if (diff < -30) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  const hasVideo = Boolean(
    currentItem.bannerVideo && (currentItem.mediaType === "video" || !currentItem.mediaType)
  );
  const hasImage = Boolean(
    currentItem.bannerImage && (currentItem.mediaType === "image" || (!currentItem.mediaType && !hasVideo))
  );

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
      className="relative w-full min-h-[290px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[460px] bg-[#121418] text-white pt-5 pb-5 sm:pt-9 sm:pb-9 overflow-hidden select-none border-b border-[#242831] flex flex-col justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Full Hero Background Media (Image or Looping Video) */}
      {hasVideo ? (
        <video
          key={currentItem.bannerVideo}
          src={normalizeMediaUrl(currentItem.bannerVideo)}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-[85%_center] sm:object-center z-0 transition-opacity duration-700 animate-in fade-in-50"
        />
      ) : hasImage ? (
        <img
          key={currentItem.bannerImage}
          src={normalizeMediaUrl(currentItem.bannerImage)}
          alt={currentItem.title}
          className="absolute inset-0 w-full h-full object-cover object-[85%_center] sm:object-center z-0 transition-opacity duration-700 animate-in fade-in-50"
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

      {/* 2. Refined, Balanced Gradient Overlays (Bright, visible background image with crisp text contrast on left) */}
      {/* Solid to transparent gradient: left side is dark for text, right side is open for the 3D visual */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#121418] via-[#121418]/90 via-55% sm:via-45% to-transparent z-0 pointer-events-none" />
      {/* Smooth bottom edge blend into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-10 sm:h-16 bg-gradient-to-t from-[#121418] to-transparent z-0 pointer-events-none" />

      {/* 3. Foreground Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Content Layout — Left-aligned content contained in left ~62% on mobile */}
        <div className="flex flex-col items-start text-left w-[62%] sm:w-[58%] md:w-auto md:max-w-xl space-y-2.5 sm:space-y-3.5">
          {/* Title */}
          <h1
            key={currentItem.id || currentItem.title}
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] animate-in fade-in duration-500"
          >
            {renderHighlightedTitle(currentItem.title)}
          </h1>

          {/* Subtitle */}
          <p
            key={`sub-${currentItem.id || currentItem.title}`}
            className="text-[11px] sm:text-xs md:text-sm text-[#D1D5DB] font-medium leading-snug max-w-xs md:max-w-md line-clamp-3 sm:line-clamp-none drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] animate-in fade-in duration-500"
          >
            {currentItem.introPlaceholder}
          </p>

          {/* Action Yellow Button ("Learn More →") */}
          <div className="pt-0.5 sm:pt-1">
            <button
              onClick={handleActionClick}
              className="inline-flex items-center gap-1.5 bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-black text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full transition-all duration-200 shadow-[0_4px_14px_rgba(250,204,21,0.35)] hover:shadow-[0_6px_20px_rgba(250,204,21,0.5)] active:scale-95 cursor-pointer"
            >
              <span>{currentItem.ctaText || "Learn More"}</span>
              <ArrowRight size={13} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile: Minimal sleek swipe indicator */}
          <div className="sm:hidden pt-2 flex items-center gap-2 select-none">
            <div className="flex items-center gap-1">
              {activeItems.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === selectedIndex
                      ? "w-3.5 bg-[#FACC15] shadow-[0_0_6px_rgba(250,204,21,0.8)]"
                      : "w-1 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-white/50 font-medium tracking-tight">
              Swipe to change
            </span>
          </div>

          {/* Desktop / Tablet: Full Pagination Pill */}
          <div className="hidden sm:flex pt-3 items-center justify-start select-none">
            <div className="inline-flex items-center gap-2.5 bg-[#121418]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#FACC15] hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
              >
                <ChevronLeft size={14} strokeWidth={2.4} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5 px-0.5">
                {activeItems.map((item, index) => {
                  const isActive = index === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectService(index)}
                      aria-label={`Select ${item.title}`}
                      className={`transition-all duration-300 rounded-full cursor-pointer ${
                        isActive
                          ? "w-2.5 h-2.5 bg-[#FACC15] shadow-[0_0_8px_rgba(250,204,21,0.9)] scale-110"
                          : "w-1.5 h-1.5 bg-[#4B5563] hover:bg-[#9CA3AF]"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#FACC15] hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
              >
                <ChevronRight size={14} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
