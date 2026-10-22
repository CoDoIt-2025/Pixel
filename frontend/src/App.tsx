import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ClientTicker } from "./components/ClientTicker";
import { WorkShowcase } from "./components/WorkShowcase";
import { ServicesMatrix } from "./components/ServicesMatrix";
import { InteractiveScopeCalculator } from "./components/InteractiveScopeCalculator";
import { TeamRoster } from "./components/TeamRoster";
import { RFPInquiryForm } from "./components/RFPInquiryForm";
import { Footer } from "./components/Footer";

export function App() {
  const [calculatorPrefill, setCalculatorPrefill] = useState<{
    service: string;
    budget: string;
    message: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-white selection:text-black">
      {/* Subtle Grain Overlay for High-End Editorial Feel */}
      <div className="grain-overlay" />

      {/* Main Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <ClientTicker />
        <WorkShowcase />
        <ServicesMatrix />
        <InteractiveScopeCalculator onApplyEstimate={(data) => setCalculatorPrefill(data)} />
        <TeamRoster />
        <RFPInquiryForm prefillData={calculatorPrefill} />
      </main>

      {/* Architectural Studio Footer */}
      <Footer />
    </div>
  );
}

export default App;
