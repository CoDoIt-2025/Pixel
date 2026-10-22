import React, { useState } from "react";
import { Calculator, ArrowDown } from "lucide-react";
import { sound } from "../lib/sound";

interface ScopeCalculatorProps {
  onApplyEstimate: (scopeData: {
    service: string;
    budget: string;
    message: string;
  }) => void;
}

export const InteractiveScopeCalculator: React.FC<ScopeCalculatorProps> = ({ onApplyEstimate }) => {
  const [architecture, setArchitecture] = useState<string>("ai");
  const [scale, setScale] = useState<string>("growth");
  const [aiTier, setAiTier] = useState<string>("finetuned");
  const [speed, setSpeed] = useState<string>("standard");

  // Price Calculation Logic
  const archBasePrices: Record<string, { label: string; price: number }> = {
    web: { label: "Next.js Web Applications", price: 40000 },
    ai: { label: "Enterprise AI & LLM Systems", price: 65000 },
    cloud: { label: "Cloud & Distributed Infrastructure", price: 50000 },
    design: { label: "Design Systems & UX Architecture", price: 30000 },
  };

  const scaleMultipliers: Record<string, { label: string; mult: number }> = {
    startup: { label: "Startup / Seed Stage", mult: 1.0 },
    growth: { label: "Growth / Series A-C", mult: 1.35 },
    enterprise: { label: "Global Enterprise", mult: 1.85 },
  };

  const aiAddons: Record<string, { label: string; cost: number }> = {
    none: { label: "No Custom AI Pipeline", cost: 0 },
    api: { label: "API Ingestion & Guardrails", cost: 15000 },
    finetuned: { label: "Fine-tuned Local LLM + Vector Search", cost: 35000 },
  };

  const speedMultipliers: Record<string, { label: string; mult: number }> = {
    standard: { label: "Standard (8-10 Weeks)", mult: 1.0 },
    rush: { label: "Accelerated Sprint (4-6 Weeks)", mult: 1.25 },
  };

  const base = archBasePrices[architecture].price;
  const scaleMult = scaleMultipliers[scale].mult;
  const aiCost = aiAddons[aiTier].cost;
  const speedMult = speedMultipliers[speed].mult;

  const totalCalculated = Math.round(((base * scaleMult) + aiCost) * speedMult / 1000) * 1000;
  const lowRange = Math.round(totalCalculated * 0.95 / 1000) * 1000;
  const highRange = Math.round(totalCalculated * 1.15 / 1000) * 1000;

  const handleApply = () => {
    sound.tactile();
    onApplyEstimate({
      service: archBasePrices[architecture].label,
      budget: `$${lowRange.toLocaleString()} - $${highRange.toLocaleString()}`,
      message: `Configured Scope from Interactive Estimator: Scale: ${scaleMultipliers[scale].label}, AI: ${aiAddons[aiTier].label}, Delivery: ${speedMultipliers[speed].label}.`,
    });

    const formEl = document.getElementById("inquire");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="estimator" className="py-28 border-b border-white/10 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white inline-block" />
              <span>INDEX // 03</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-white">
              SCOPE &amp; COST ESTIMATOR
            </h2>
          </div>

          <p className="font-body text-zinc-400 text-sm max-w-md">
            Architectural sizing terminal. Configure your deliverable parameters to generate an instant estimate calibrated for enterprise benchmarks.
          </p>
        </div>

        {/* Interactive Sizing Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Core Architecture */}
            <div>
              <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-3">
                01 // SELECT CORE ARCHITECTURE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(archBasePrices).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      sound.click();
                      setArchitecture(key);
                    }}
                    className={`p-4 border text-left font-mono transition-all flex flex-col justify-between ${
                      architecture === key
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-zinc-950/40 text-zinc-300 hover:border-white/30"
                    }`}
                  >
                    <span className="text-xs uppercase font-tech font-bold">{val.label}</span>
                    <span className={`text-[11px] mt-2 block ${architecture === key ? "text-zinc-700" : "text-zinc-500"}`}>
                      Baseline: ${val.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Scale Tier */}
            <div>
              <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-3">
                02 // ORGANIZATIONAL SCALE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(scaleMultipliers).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      sound.click();
                      setScale(key);
                    }}
                    className={`p-3.5 border text-left font-mono transition-all ${
                      scale === key
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-zinc-950/40 text-zinc-300 hover:border-white/30"
                    }`}
                  >
                    <span className="text-xs uppercase font-medium">{val.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. AI / LLM Pipeline */}
            <div>
              <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-3">
                03 // AI INFERENCE &amp; VECTOR RETRIEVAL TIER
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(aiAddons).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      sound.click();
                      setAiTier(key);
                    }}
                    className={`p-3.5 border text-left font-mono transition-all ${
                      aiTier === key
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-zinc-950/40 text-zinc-300 hover:border-white/30"
                    }`}
                  >
                    <span className="text-xs uppercase font-medium block">{val.label}</span>
                    <span className={`text-[10px] mt-1 block ${aiTier === key ? "text-zinc-700" : "text-zinc-500"}`}>
                      +{val.cost > 0 ? `$${val.cost.toLocaleString()}` : "Included"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Velocity */}
            <div>
              <label className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-3">
                04 // PRODUCTION VELOCITY
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(speedMultipliers).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      sound.click();
                      setSpeed(key);
                    }}
                    className={`p-3.5 border text-left font-mono transition-all ${
                      speed === key
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-zinc-950/40 text-zinc-300 hover:border-white/30"
                    }`}
                  >
                    <span className="text-xs uppercase font-medium">{val.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sizing Readout Column */}
          <div className="lg:col-span-4 border border-white/20 p-8 bg-zinc-950 sticky top-28">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 pb-4 border-b border-white/10">
              <Calculator size={14} className="text-white" />
              <span>ESTIMATED INVESTMENT TELEMETRY</span>
            </div>

            <div className="py-8 space-y-2">
              <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
                PROJECTED CONTRACT RANGE
              </span>
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                ${lowRange.toLocaleString()} &ndash; ${highRange.toLocaleString()}
              </div>
              <p className="font-mono text-[11px] text-zinc-400 pt-2">
                All deliverables include full source code transfer, automated CI/CD, and 60-day post-launch warranty.
              </p>
            </div>

            {/* Breakdown Checklist */}
            <div className="border-t border-white/10 pt-4 space-y-2 font-mono text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Architecture</span>
                <span className="text-zinc-200">{archBasePrices[architecture].label.split(" ")[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>Scale Tier</span>
                <span className="text-zinc-200">{scaleMultipliers[scale].label.split(" ")[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>AI Layer</span>
                <span className="text-zinc-200">{aiTier === "none" ? "None" : "Integrated"}</span>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="mt-8 w-full py-4 bg-white text-black font-tech font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
            >
              <span>APPLY ESTIMATE TO INQUIRY</span>
              <ArrowDown size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
