import { useState, useEffect } from "react";
import { SettingsProvider } from "./context/SettingsContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ClientTicker } from "./components/ClientTicker";
import { ServicesMatrix } from "./components/ServicesMatrix";
import { WorkShowcase } from "./components/WorkShowcase";
import { InteractiveScopeCalculator } from "./components/InteractiveScopeCalculator";
import { TeamRoster } from "./components/TeamRoster";
import { BlogSection } from "./components/BlogSection";
import { FAQSection } from "./components/FAQSection";
import { RFPInquiryForm } from "./components/RFPInquiryForm";
import { Footer } from "./components/Footer";
import { SplashScreen } from "./components/SplashScreen";
import { MessageCircle, ArrowUp } from "lucide-react";

export function App() {
  const [calculatorPrefill, setCalculatorPrefill] = useState<{
    service: string;
    budget: string;
    message: string;
  } | null>(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <SettingsProvider>
      {/* Intro Logo Preloader / Splash Screen */}
      <SplashScreen />

      <div className="min-h-screen bg-[#202124] text-[#F7F7F2] relative selection:bg-[#F5C542] selection:text-[#202124] antialiased">
        {/* Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <ClientTicker />
          <ServicesMatrix />
          <WorkShowcase />
          {/* Occasional Light Section for Visual Balance (#F5F4EF with charcoal #202124 text) */}
          <InteractiveScopeCalculator
            onApplyEstimate={(data) => setCalculatorPrefill(data)}
          />
          <TeamRoster />
          <BlogSection />
          <FAQSection />
          <RFPInquiryForm prefillData={calculatorPrefill} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Quick Action Widget: WhatsApp & Back to Top */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 select-none">
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2B2D31]/90 backdrop-blur-md border border-[#45484E] text-[#C4C7CC] hover:text-[#F5C542] hover:border-[#F5C542] flex items-center justify-center shadow-xl transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp size={15} />
            </button>
          )}

          <a
            href="https://wa.me/96824000000"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 p-3 sm:px-4 sm:py-2.5 rounded-full bg-[#2B2D31]/95 backdrop-blur-xl border border-[#45484E] hover:border-[#F5C542] shadow-2xl text-xs font-semibold text-[#F7F7F2] transition-all hover:scale-105"
            aria-label="Chat on WhatsApp"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <MessageCircle size={16} className="text-[#F5C542] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </SettingsProvider>
  );
}

export default App;
