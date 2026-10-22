import React, { useState } from "react";
import { ArrowDown } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

interface ScopeCalculatorProps {
  onApplyEstimate: (scopeData: {
    service: string;
    budget: string;
    message: string;
  }) => void;
}

export const InteractiveScopeCalculator: React.FC<ScopeCalculatorProps> = ({ onApplyEstimate }) => {
  const { company } = useSettings();
  const currencySymbol = company.currency?.includes("OMR")
    ? "OMR "
    : company.currency?.includes("USD")
    ? "$"
    : company.currency
    ? `${company.currency} `
    : "$";

  const [architecture, setArchitecture] = useState<string>("ai");
  const [scale, setScale] = useState<string>("growth");
  const [aiTier, setAiTier] = useState<string>("finetuned");
  const [speed, setSpeed] = useState<string>("standard");

  const archBasePrices: Record<string, { label: string; price: number }> = {
    web: { label: "Web Applications", price: 40000 },
    ai: { label: "AI & LLM Copilots", price: 65000 },
    cloud: { label: "Cloud Infrastructure", price: 50000 },
    design: { label: "Design Systems", price: 30000 },
  };

  const scaleMultipliers: Record<string, { label: string; mult: number }> = {
    startup: { label: "Early Stage", mult: 1.0 },
    growth: { label: "Growth", mult: 1.35 },
    enterprise: { label: "Enterprise", mult: 1.85 },
  };

  const aiAddons: Record<string, { label: string; cost: number }> = {
    none: { label: "None", cost: 0 },
    api: { label: "API Ingestion", cost: 15000 },
    finetuned: { label: "Custom Fine-tuned LLM", cost: 35000 },
  };

  const speedMultipliers: Record<string, { label: string; mult: number }> = {
    standard: { label: "Standard (8-10 wks)", mult: 1.0 },
    rush: { label: "Sprint (4-6 wks)", mult: 1.25 },
  };

  const base = archBasePrices[architecture].price;
  const scaleMult = scaleMultipliers[scale].mult;
  const aiCost = aiAddons[aiTier].cost;
  const speedMult = speedMultipliers[speed].mult;

  const totalCalculated = Math.round(((base * scaleMult) + aiCost) * speedMult / 1000) * 1000;
  const lowRange = Math.round(totalCalculated * 0.95 / 1000) * 1000;
  const highRange = Math.round(totalCalculated * 1.15 / 1000) * 1000;

  const handleApply = () => {
    onApplyEstimate({
      service: archBasePrices[architecture].label,
      budget: `${currencySymbol}${lowRange.toLocaleString()} - ${currencySymbol}${highRange.toLocaleString()}`,
      message: `Configured Scope: Scale: ${scaleMultipliers[scale].label}, AI: ${aiAddons[aiTier].label}, Delivery: ${speedMultipliers[speed].label}.`,
    });

    const formEl = document.getElementById("contact");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculator" className="py-24 sm:py-32 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
            Interactive scope &amp; cost calculator
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Select your architectural requirements to generate an instant project estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-8 space-y-7">
            {/* 1. Core Service */}
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">
                1. Select Core Service
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(archBasePrices).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setArchitecture(key)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      architecture === key
                        ? "border-slate-950 bg-slate-950 text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <span className="text-sm font-medium block">{val.label}</span>
                    <span className={`text-xs mt-1 block ${architecture === key ? "text-slate-300" : "text-slate-500"}`}>
                      From ${val.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Scale */}
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">
                2. Company Scale
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {Object.entries(scaleMultipliers).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setScale(key)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      scale === key
                        ? "border-slate-950 bg-slate-950 text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <span className="text-xs font-medium">{val.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. AI / Intelligence */}
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">
                3. AI &amp; Inference Pipeline
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {Object.entries(aiAddons).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAiTier(key)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      aiTier === key
                        ? "border-slate-950 bg-slate-950 text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <span className="text-xs font-medium block">{val.label}</span>
                    <span className={`text-[11px] mt-0.5 block ${aiTier === key ? "text-slate-300" : "text-slate-400"}`}>
                      +{val.cost > 0 ? `${currencySymbol}${val.cost.toLocaleString()}` : "Included"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Velocity */}
            <div>
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-3">
                4. Project Velocity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(speedMultipliers).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSpeed(key)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      speed === key
                        ? "border-slate-950 bg-slate-950 text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <span className="text-xs font-medium">{val.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sizing Readout Sticky Card */}
          <div className="lg:col-span-4 p-7 rounded-2xl border border-slate-200/80 bg-slate-50/80 sticky top-24 shadow-2xs">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3">
              Estimated Investment
            </span>

            <div className="text-3xl font-semibold tracking-tight text-slate-950 mb-1">
              {currencySymbol}{lowRange.toLocaleString()} &ndash; {currencySymbol}{highRange.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed pb-6 border-b border-slate-200">
              Includes full source ownership, automated CI/CD setup, and 60 days of warranty support.
            </p>

            {/* Summary lines */}
            <div className="py-4 space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Architecture</span>
                <span className="text-slate-900 font-medium">{archBasePrices[architecture].label}</span>
              </div>
              <div className="flex justify-between">
                <span>Company Scale</span>
                <span className="text-slate-900 font-medium">{scaleMultipliers[scale].label}</span>
              </div>
              <div className="flex justify-between">
                <span>AI Pipeline</span>
                <span className="text-slate-900 font-medium">{aiTier === "none" ? "None" : "Included"}</span>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="mt-4 w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold tracking-tight transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Apply estimate to inquiry</span>
              <ArrowDown size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
