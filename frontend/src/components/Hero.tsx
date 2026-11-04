import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ServiceItem } from "../data/servicesData";

interface HeroProps {
  services: ServiceItem[];
  selectedIndex: number;
  onSelectService: (index: number) => void;
  onOpenServiceDetails: (service: ServiceItem) => void;
}

export const Hero: React.FC<HeroProps> = ({
  services,
  selectedIndex,
  onSelectService,
  onOpenServiceDetails,
}) => {
  const currentService = services[selectedIndex] || services[0];
  const touchStartXRef = useRef<number | null>(null);

  const handlePrev = () => {
    onSelectService((selectedIndex - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    onSelectService((selectedIndex + 1) % services.length);
  };

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
    currentService.bannerVideo && (currentService.mediaType === "video" || !currentService.mediaType)
  );
  const hasImage = Boolean(
    currentService.bannerImage && (currentService.mediaType === "image" || (!currentService.mediaType && !hasVideo))
  );
  const hasMedia = hasVideo || hasImage;

  return (
    <section
      id="home"
      className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] bg-[#121418] text-white pt-8 pb-12 sm:pt-14 sm:pb-16 overflow-hidden select-none border-b border-[#242831] flex flex-col justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. Full Hero Background Media (Image or Looping Video) */}
      {hasVideo ? (
        <video
          key={currentService.bannerVideo}
          src={currentService.bannerVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-opacity duration-700 animate-in fade-in-50"
        />
      ) : hasImage ? (
        <img
          key={currentService.bannerImage}
          src={currentService.bannerImage}
          alt={currentService.title}
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
        {/* Navigation Arrows for Desktop */}
        <button
          onClick={handlePrev}
          aria-label="Previous service"
          className="hidden md:flex absolute -left-2 lg:left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center text-white/80 hover:text-white bg-[#121418]/50 hover:bg-[#121418]/80 border border-white/10 backdrop-blur-xs transition-all cursor-pointer z-20 shadow-md"
        >
          <ChevronLeft size={36} strokeWidth={2.5} />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next service"
          className="hidden md:flex absolute -right-2 lg:right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center text-white/80 hover:text-white bg-[#121418]/50 hover:bg-[#121418]/80 border border-white/10 backdrop-blur-xs transition-all cursor-pointer z-20 shadow-md"
        >
          <ChevronRight size={36} strokeWidth={2.5} />
        </button>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[300px] sm:min-h-[360px]">
          {/* Left Column: Service Heading, Subtitle & CTA */}
          <div className="md:col-span-7 lg:col-span-6 text-center md:text-left flex flex-col items-center md:items-start space-y-4 sm:space-y-6">
            {/* Service Title */}
            <div className="min-h-[60px] sm:min-h-[75px] flex items-center">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
                {currentService.title}
              </h1>
            </div>

            {/* Service introduction placeholder subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-[#D1D5DB] font-medium tracking-wide max-w-lg leading-relaxed drop-shadow-sm">
              {currentService.introPlaceholder}
            </p>

            {/* Learn More Yellow Button */}
            <div className="pt-2">
              <button
                onClick={() => onOpenServiceDetails(currentService)}
                className="bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-black text-sm sm:text-base px-8 py-3.5 rounded-xl sm:rounded-2xl transition-all duration-200 shadow-[0_4px_20px_rgba(250,204,21,0.35)] hover:shadow-[0_6px_28px_rgba(250,204,21,0.5)] hover:scale-105 cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column: Intentionally open and unobstructed so the full background banner / video is completely visible! (No right-side rectangle card) */}
          <div className="hidden md:flex md:col-span-5 lg:col-span-6 justify-end items-end h-full">
            {hasMedia && (
              <div className="bg-[#121418]/65 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs text-white/90 flex items-center gap-2 shadow-xl mb-4 select-none">
                <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-pulse" />
                <span className="font-bold tracking-wide">
                  {hasVideo ? "Video Banner" : "Commercial Banner Showcase"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-2">
          <div className="flex items-center gap-2 sm:gap-2.5">
            {services.map((service, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={service.id}
                  onClick={() => onSelectService(index)}
                  aria-label={`Select ${service.title}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "w-3 h-3 bg-[#FACC15] shadow-[0_0_8px_rgba(250,204,21,0.8)] scale-110"
                      : "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#4B5563] hover:bg-[#9CA3AF]"
                  }`}
                />
              );
            })}
          </div>

          {/* Mobile Caption: "Swipe to explore services" */}
          <span className="md:hidden text-xs text-[#9CA3AF] font-medium tracking-wide mt-1">
            Swipe to explore services
          </span>
        </div>
      </div>
    </section>
  );
};
