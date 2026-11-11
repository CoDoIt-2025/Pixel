import { useState, useEffect, useMemo } from "react";
import { DemoTopBanner } from "./components/DemoTopBanner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import type { HeroSlideItem } from "./components/Hero";
import { ServicesSection } from "./components/ServicesSection";
import { ServicePage } from "./components/ServicePage";
import { AboutWhySection } from "./components/AboutWhySection";
import { OurWorkSection } from "./components/OurWorkSection";
import { BlogSection } from "./components/BlogSection";
import { AuditRequestSection } from "./components/AuditRequestSection";
import { FAQSection } from "./components/FAQSection";
import { FAQPage } from "./components/FAQPage";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { ServiceDetailsModal } from "./components/ServiceDetailsModal";
import { SERVICES_DATA, mapBackendServiceToItem } from "./data/servicesData";
import type { ServiceItem } from "./data/servicesData";
import type { Banner } from "./types";
import { api, normalizeMediaUrl } from "./lib/api";

export function App() {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [customBanners, setCustomBanners] = useState<Banner[]>([]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  // Dedicated Service Page view state
  const [activeServicePage, setActiveServicePage] = useState<ServiceItem | null>(null);

  // Dedicated FAQ Page view state
  const [isFaqPageActive, setIsFaqPageActive] = useState(false);

  // Optional quick preview modal
  const [activeModalService, setActiveModalService] =
    useState<ServiceItem | null>(null);

  // About & Why Pixel settings from SQLite backend
  const [companySettings, setCompanySettings] = useState<any>({});

  // Hydrate all services directly from backend database
  const reloadServicesFromBackend = () => {
    api
      .getServices()
      .then((dbServices) => {
        if (dbServices && dbServices.length > 0) {
          const visibleServices = dbServices.filter((s) => s.isVisible !== false);
          if (visibleServices.length > 0) {
            const mapped = visibleServices.map(mapBackendServiceToItem);
            setServices(mapped);
          }
        }
      })
      .catch((err) => {
        console.warn("Could not fetch services from API, using default data:", err);
      });
  };

  // Hydrate custom standalone hero banners from backend
  const reloadBannersFromBackend = () => {
    api
      .getBanners()
      .then((data) => {
        if (data && data.length > 0) {
          setCustomBanners(data);
        } else {
          setCustomBanners([]);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch banners from API:", err);
      });
  };

  // Hydrate About Pixel & Why Pixel content from SQLite settings
  const reloadCompanySettings = () => {
    api
      .getSettings()
      .then((res) => {
        if (res && res.company) {
          setCompanySettings(res.company);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch company settings:", err);
      });
  };

  useEffect(() => {
    reloadServicesFromBackend();
    reloadBannersFromBackend();
    reloadCompanySettings();
  }, []);

  // Combined Hero Slides: Services with showInBanner + Custom Admin Banners
  const heroSlides = useMemo<HeroSlideItem[]>(() => {
    // 1. Services enabled for the hero banner
    const enabledServices = services.filter((s) => s.showInBanner !== false);
    const serviceSlides: HeroSlideItem[] = enabledServices.map((srv) => ({
      id: `srv-${srv.id}`,
      title: srv.title,
      introPlaceholder: srv.introPlaceholder,
      bannerImage: normalizeMediaUrl(srv.bannerImage),
      bannerVideo: normalizeMediaUrl(srv.bannerVideo),
      mediaType: srv.mediaType,
      badgeText: srv.mediaType === "video" ? "Video Banner" : "Commercial Banner Showcase",
      ctaText: "Learn More",
      service: srv,
    }));

    // 2. Custom standalone banners uploaded in Admin Panel
    const bannerSlides: HeroSlideItem[] = customBanners
      .filter((b) => b.isActive !== false)
      .map((b) => ({
        id: `bnr-${b.id}`,
        title: b.title,
        introPlaceholder: b.subtitle || "Commercial campaign & capabilities showcase.",
        bannerImage: b.mediaType === "image" ? normalizeMediaUrl(b.mediaUrl) : undefined,
        bannerVideo: b.mediaType === "video" ? normalizeMediaUrl(b.mediaUrl) : undefined,
        mediaType: b.mediaType,
        badgeText: b.badgeText || (b.mediaType === "video" ? "Video Showcase" : "Brand Campaign"),
        ctaText: b.ctaText || "Learn More",
        ctaLink: b.ctaLink || "#audit-request",
        isCustomBanner: true,
      }));

    const combined = [...serviceSlides, ...bannerSlides];
    return combined.length > 0 ? combined : serviceSlides;
  }, [services, customBanners]);

  useEffect(() => {
    if (selectedServiceIndex >= heroSlides.length) {
      setSelectedServiceIndex(0);
    }
  }, [heroSlides.length, selectedServiceIndex]);

  const handleOpenServicePage = (service: ServiceItem) => {
    setActiveServicePage(service);
    setIsFaqPageActive(false);
    const idx = services.findIndex((s) => s.id === service.id);
    if (idx !== -1) {
      setSelectedServiceIndex(idx);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    setActiveServicePage(null);
    setIsFaqPageActive(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -105; // Account for combined sticky header height
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 70);
  };

  const handleNavigateHome = () => {
    setActiveServicePage(null);
    setIsFaqPageActive(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateFaq = () => {
    setActiveServicePage(null);
    setIsFaqPageActive(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#121418] flex flex-col font-sans selection:bg-[#FACC15] selection:text-[#121418]">
      {/* 1. Combined Sticky Corporate Header (Top Info Bar + Main Navigation) */}
      <header className="sticky top-0 z-50 w-full shadow-md">
        <DemoTopBanner />
        <Navbar
          onNavigateHome={handleNavigateHome}
          onNavigateAbout={() => scrollToSection("about")}
          onNavigateServices={() => scrollToSection("services")}
          onNavigateWork={() => scrollToSection("our-work")}
          onNavigateBlog={() => scrollToSection("blog")}
          onNavigateContact={() => scrollToSection("audit-request")}
          onNavigateFaq={handleNavigateFaq}
          isServicePageActive={Boolean(activeServicePage)}
          isFaqPageActive={isFaqPageActive}
        />
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
        {activeServicePage ? (
          /* Dedicated Company-Grade Service Page View */
          <ServicePage
            service={activeServicePage}
            allServices={services}
            onBack={handleNavigateHome}
            onSelectService={(s) => handleOpenServicePage(s)}
          />
        ) : isFaqPageActive ? (
          /* Dedicated Company FAQ Page View */
          <FAQPage
            onBack={handleNavigateHome}
            onRequestAudit={() => {
              setIsFaqPageActive(false);
              scrollToSection("audit-request");
            }}
          />
        ) : (
          /* Official Corporate Landing Page Sections */
          <>
            {/* 3. Hero Section (Combined Services & Uploaded Banners) */}
            <Hero
              slides={heroSlides}
              selectedIndex={selectedServiceIndex}
              onSelectService={(idx) => setSelectedServiceIndex(idx)}
              onOpenServiceDetails={(service) => handleOpenServicePage(service)}
              onNavigateLink={(link) => {
                if (link.startsWith("#")) {
                  scrollToSection(link.replace("#", ""));
                } else {
                  window.location.href = link;
                }
              }}
            />

            {/* 4. Compact "Explore our services" Grid (All active services) */}
            <ServicesSection
              services={services}
              selectedIndex={selectedServiceIndex}
              onSelectService={(idx) => setSelectedServiceIndex(idx)}
              onOpenServiceDetails={(service) => handleOpenServicePage(service)}
            />

            {/* 5. About Pixel & Why Pixel Section (Live from SQLite CMS, zero grey bars) */}
            <AboutWhySection
              aboutTitle={companySettings.aboutTitle}
              aboutText={companySettings.aboutText}
              whyTitle={companySettings.whyTitle}
              whyReasons={companySettings.whyReasons}
            />

            {/* 6. Our Work & Case Studies Section */}
            <OurWorkSection />

            {/* 7. Request a digital presence audit Form (Placed before Blog as requested) */}
            <AuditRequestSection />

            {/* 8. Blog & Industry Insights Section */}
            <BlogSection />

            {/* 9. Interactive FAQ Accordion Section with Full Page Link */}
            <FAQSection onOpenFullFaqPage={handleNavigateFaq} />

            {/* 10. Client Testimonials (Live from Admin/SQLite, completely hidden if empty) */}
            <TestimonialsSection />
          </>
        )}
      </main>

      {/* 11. Official Corporate Footer */}
      <Footer
        onNavigateSection={(id) => {
          if (id === "faq") {
            handleNavigateFaq();
          } else {
            scrollToSection(id);
          }
        }}
      />

      {/* 12. Floating WhatsApp Conversion Widget */}
      <FloatingWhatsApp phone={companySettings.phone} />

      {/* Optional Quick Service Details Modal */}
      {activeModalService && (
        <ServiceDetailsModal
          service={activeModalService}
          onClose={() => setActiveModalService(null)}
          onRequestAudit={() => scrollToSection("audit-request")}
        />
      )}
    </div>
  );
}

export default App;
