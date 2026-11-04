import React, { useRef, useState, useEffect } from "react";
import type { ServiceItem } from "../data/servicesData";

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
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
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
      className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] bg-[#121418] text-white pt-8 pb-12 sm:pt-14 sm:pb-16 overflow-hidden select-none border-b border-[#242831] flex flex-col justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Full Hero Background Media (Image or Looping Video) */}
      {hasVideo ? (
        <video
          key={currentItem.bannerVideo}
          src={currentItem.bannerVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-opacity duration-700 animate-in fade-in-50"
        />
      ) : hasImage ? (
        <img
          key={currentItem.bannerImage}
          src={currentItem.bannerImage}
          alt={currentItem.title}
          className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-opacity duration-700 animate-in fade-in-50"
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

      {/* 2. Gradient Overlays for High Contrast & Visual Depth */}
      {/* Left-to-right gradient: dark on left for text legibility, transparent on right for full banner view */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#121418] via-[#121418]/85 md:via-[#121418]/70 to-[#121418]/25 z-0 pointer-events-none" />
      {/* Top and bottom subtle vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121418]/60 via-transparent to-[#121418]/80 z-0 pointer-events-none" />

      {/* 3. Foreground Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[300px] sm:min-h-[360px]">
          {/* Left Column: Heading, Subtitle & CTA */}
          <div className="md:col-span-7 lg:col-span-6 text-center md:text-left flex flex-col items-center md:items-start space-y-4 sm:space-y-6">
            {/* Title */}
            <div className="min-h-[60px] sm:min-h-[75px] flex items-center">
              <h1
                key={currentItem.id || currentItem.title}
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md animate-in fade-in duration-500"
              >
                {currentItem.title}
              </h1>
            </div>

            {/* Subtitle */}
            <p
              key={`sub-${currentItem.id || currentItem.title}`}
              className="text-sm sm:text-base lg:text-lg text-[#D1D5DB] font-medium tracking-wide max-w-lg leading-relaxed drop-shadow-sm animate-in fade-in duration-500"
            >
              {currentItem.introPlaceholder}
            </p>

            {/* Action Yellow Button */}
            <div className="pt-2">
              <button
                onClick={handleActionClick}
                className="bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-black text-sm sm:text-base px-8 py-3.5 rounded-xl sm:rounded-2xl transition-all duration-200 shadow-[0_4px_20px_rgba(250,204,21,0.35)] hover:shadow-[0_6px_28px_rgba(250,204,21,0.5)] hover:scale-105 cursor-pointer"
              >
                {currentItem.ctaText || "Learn More"}
              </button>
            </div>
          </div>

          {/* Right Column: Intentionally open so background banner / video is completely visible */}
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

        {/* Bottom Pagination Dots */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5">
            {activeItems.map((item, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectService(index)}
                  aria-label={`Select ${item.title}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "w-3 h-3 bg-[#FACC15] shadow-[0_0_8px_rgba(250,204,21,0.8)] scale-110"
                      : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#4B5563] hover:bg-[#9CA3AF]"
                  }`}
                />
              );
            })}
          </div>

          {/* Mobile Caption */}
          <span className="md:hidden text-xs text-[#9CA3AF] font-medium tracking-wide mt-1">
            Swipe to explore showcase
          </span>
        </div>
      </div>
    </section>
  );
};
