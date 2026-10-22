import React, { useState, useEffect } from "react";
import { Check, Code, Cpu, Globe, Palette, Cloud, ArrowRight } from "lucide-react";
import type { Service } from "../types";
import { api } from "../lib/api";

const DEFAULT_SERVICES: Service[] = [
  {
    id: "SRV-001",
    title: "Enterprise Web Applications",
    category: "Web Development",
    description: "Custom high-throughput Next.js & React platforms engineered for fault-tolerant scalability.",
    iconName: "Globe",
    startingPrice: 45000,
    features: ["Next.js 16 App Router", "Sub-100ms Core Web Vitals", "Edge SSR & ISR", "Full TypeScript Coverage", "Automated E2E Testing"],
    isVisible: true,
    deliveryTime: "6-10 weeks",
    activeProjectsCount: 5,
  },
  {
    id: "SRV-002",
    title: "Enterprise AI & LLM Systems",
    category: "AI Solutions",
    description: "Bespoke generative AI copilots, retrieval-augmented generation (RAG) pipelines, and autonomous agent loops.",
    iconName: "Cpu",
    startingPrice: 60000,
    features: ["Custom Fine-tuned LLMs", "Hybrid Vector Search", "Private Data Isolation", "Streaming Inference API", "Evaluation & Guardrails"],
    isVisible: true,
    deliveryTime: "8-12 weeks",
    activeProjectsCount: 4,
  },
  {
    id: "SRV-003",
    title: "Design Systems & UX Architecture",
    category: "UI/UX Design",
    description: "World-class user interface engineering, tokenized component libraries, and interactive design prototypes.",
    iconName: "Palette",
    startingPrice: 30000,
    features: ["Figma Design Tokens", "Radix Primitives", "Micro-interaction Physics", "WCAG 2.2 AAA Accessible", "Storybook Living Documentation"],
    isVisible: true,
    deliveryTime: "4-6 weeks",
    activeProjectsCount: 3,
  },
  {
    id: "SRV-004",
    title: "Cloud & Distributed Infrastructure",
    category: "Cloud Architecture",
    description: "Terraform-managed multi-region clouds on AWS & GCP with Kubernetes orchestration and 99.999% SLA.",
    iconName: "Cloud",
    startingPrice: 50000,
    features: ["Zero-downtime Deployments", "Global Multi-region Anycast", "SOC2 Type II Preparation", "DDoS Mitigation Layer", "24/7 Telemetry Dashboards"],
    isVisible: true,
    deliveryTime: "6-8 weeks",
    activeProjectsCount: 3,
  },
];

export const ServicesMatrix: React.FC = () => {
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);

  const loadServices = async () => {
    const data = await api.getServices();
    if (data && data.length > 0) {
      setServices(data.filter((s) => s.isVisible));
    }
  };

  useEffect(() => {
    loadServices();
    window.addEventListener("focus", loadServices);
    const interval = setInterval(loadServices, 5000);
    return () => {
      window.removeEventListener("focus", loadServices);
      clearInterval(interval);
    };
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu": return <Cpu size={20} className="text-slate-900" />;
      case "Globe": return <Globe size={20} className="text-slate-900" />;
      case "Palette": return <Palette size={20} className="text-slate-900" />;
      case "Cloud": return <Cloud size={20} className="text-slate-900" />;
      default: return <Code size={20} className="text-slate-900" />;
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
            What we engineer
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            From technical discovery and architectural prototyping to high-concurrency production deployments.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="p-8 rounded-2xl border border-slate-200/80 bg-white flex flex-col justify-between hover:border-slate-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
                  {getIcon(srv.iconName)}
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-slate-950 mb-2.5">
                  {srv.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Features */}
                <div className="space-y-2 border-t border-slate-100 pt-5 mb-6">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-600">
                      <Check size={14} className="text-slate-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Commencing from</span>
                  <span className="text-slate-900 font-semibold text-base">
                    ${srv.startingPrice.toLocaleString()}
                  </span>
                </div>

                <a
                  href="#calculator"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-400 text-slate-900 font-medium hover:bg-slate-50 transition-colors"
                >
                  <span>Estimate</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
