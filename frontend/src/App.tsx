import { useState, useEffect } from "react";
import { DemoTopBanner } from "./components/DemoTopBanner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ServicesSection } from "./components/ServicesSection";
import { ServicePage } from "./components/ServicePage";
import { AboutWhySection } from "./components/AboutWhySection";
import { OurWorkSection } from "./components/OurWorkSection";
import { BlogSection } from "./components/BlogSection";
import { AuditRequestSection } from "./components/AuditRequestSection";
import { FAQSection } from "./components/FAQSection";
import { TestimonialsOptionalSection } from "./components/TestimonialsOptionalSection";
import { Footer } from "./components/Footer";
import { ServiceDetailsModal } from "./components/ServiceDetailsModal";
import { SERVICES_DATA, mapBackendServiceToItem } from "./data/servicesData";
import type { ServiceItem } from "./data/servicesData";
import { api } from "./lib/api";

export function App() {
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  // Dedicated Service Page view state
  const [activeServicePage, setActiveServicePage] = useState<ServiceItem | null>(null);

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
            setSelectedServiceIndex((prev) => (prev >= mapped.length ? 0 : prev));
          }
        }
      })
      .catch((err) => {
        console.warn("Could not fetch services from API, using default data:", err);
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
    reloadCompanySettings();
  }, []);

  const handleOpenServicePage = (service: ServiceItem) => {
    setActiveServicePage(service);
    const idx = services.findIndex((s) => s.id === service.id);
    if (idx !== -1) {
      setSelectedServiceIndex(idx);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    setActiveServicePage(null);
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
          isServicePageActive={Boolean(activeServicePage)}
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
        ) : (
          /* Official Corporate Landing Page Sections */
          <>
            {/* 3. Hero Section (Interactive Service Banner with Dynamic Media) */}
            <Hero
              services={services}
              selectedIndex={selectedServiceIndex}
              onSelectService={(idx) => setSelectedServiceIndex(idx)}
              onOpenServiceDetails={(service) => handleOpenServicePage(service)}
            />

            {/* 4. Compact "Explore our services" Grid (9 Services) */}
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

            {/* 7. Blog & Industry Insights Section */}
            <BlogSection />

            {/* 8. Request a digital presence audit Form */}
            <AuditRequestSection />

            {/* 9. Frequently Asked Questions Section */}
            <FAQSection />

            {/* 10. Testimonials — optional Section */}
            <TestimonialsOptionalSection />
          </>
        )}
      </main>

      {/* 11. Official Corporate Footer */}
      <Footer onNavigateSection={scrollToSection} />

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
