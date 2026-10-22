import { useState } from "react";
import { SettingsProvider } from "./context/SettingsContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ClientTicker } from "./components/ClientTicker";
import { WorkShowcase } from "./components/WorkShowcase";
import { ServicesMatrix } from "./components/ServicesMatrix";
import { InteractiveScopeCalculator } from "./components/InteractiveScopeCalculator";
import { TeamRoster } from "./components/TeamRoster";
import { BlogSection } from "./components/BlogSection";
import { FAQSection } from "./components/FAQSection";
import { RFPInquiryForm } from "./components/RFPInquiryForm";
import { Footer } from "./components/Footer";

export function App() {
  const [calculatorPrefill, setCalculatorPrefill] = useState<{
    service: string;
    budget: string;
    message: string;
  } | null>(null);

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-white text-slate-900 relative selection:bg-slate-900 selection:text-white">
        {/* Navigation */}
        <Navbar />

      {/* Main Sections */}
      <main>
        <Hero />
        <ClientTicker />
        <WorkShowcase />
        <ServicesMatrix />
        <InteractiveScopeCalculator onApplyEstimate={(data) => setCalculatorPrefill(data)} />
        <TeamRoster />
        <BlogSection />
        <FAQSection />
        <RFPInquiryForm prefillData={calculatorPrefill} />
      </main>

        {/* Footer */}
        <Footer />
      </div>
    </SettingsProvider>
  );
}

export default App;
