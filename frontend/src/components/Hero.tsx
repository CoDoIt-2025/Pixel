import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ServiceItem } from "../data/servicesData";
import { HeroIllustration } from "./HeroIllustration";

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

  return (
    <section
      id="home"
      className="relative w-full bg-[#121418] text-white pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden select-none border-b border-[#242831]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background radial gradient accent */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FACC15]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Navigation Arrows for Desktop */}
        <button
          onClick={handlePrev}
          aria-label="Previous service"
          className="hidden md:flex absolute -left-2 lg:left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer z-20"
        >
          <ChevronLeft size={36} strokeWidth={2.5} />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next service"
          className="hidden md:flex absolute -right-2 lg:right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer z-20"
        >
          <ChevronRight size={36} strokeWidth={2.5} />
        </button>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (Desktop) / Top Section (Mobile): Service Heading, Subtitle & CTA */}
          <div className="md:col-span-6 lg:col-span-5 text-center md:text-left flex flex-col items-center md:items-start space-y-4 sm:space-y-5">
            {/* Service Title */}
            <div className="min-h-[70px] sm:min-h-[85px] flex items-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                {currentService.title}
              </h1>
            </div>

            {/* Service introduction placeholder subtitle */}
            <p className="text-sm sm:text-base text-[#9CA3AF] italic font-normal tracking-wide max-w-md">
              {currentService.introPlaceholder}
            </p>

            {/* In Mobile view: The Illustration/Banner appears between text and button */}
            <div className="md:hidden w-full flex justify-center py-2">
              <HeroIllustration
                type={currentService.illustrationType}
                bannerImage={currentService.bannerImage}
                bannerVideo={currentService.bannerVideo}
                mediaType={currentService.mediaType}
                title={currentService.title}
              />
            </div>

            {/* Learn More Yellow Button */}
            <div className="pt-2">
              <button
                onClick={() => onOpenServiceDetails(currentService)}
                className="bg-[#FACC15] hover:bg-[#E5B532] text-[#121418] font-bold text-sm sm:text-base px-7 py-3 rounded-xl sm:rounded-2xl transition-all duration-200 shadow-[0_4px_16px_rgba(250,204,21,0.3)] hover:scale-105 cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Column (Desktop): Interactive Visual Illustration or Uploaded Banner/Video */}
          <div className="hidden md:flex md:col-span-6 lg:col-span-7 justify-center lg:justify-end">
            <HeroIllustration
              type={currentService.illustrationType}
              bannerImage={currentService.bannerImage}
              bannerVideo={currentService.bannerVideo}
              mediaType={currentService.mediaType}
              title={currentService.title}
            />
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
