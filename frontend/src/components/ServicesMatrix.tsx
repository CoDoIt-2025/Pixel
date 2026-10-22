import React, { useState, useEffect } from "react";
import { Check, Code, Cpu, Globe, Palette, Cloud } from "lucide-react";
import type { Service } from "../types";
import { api } from "../lib/api";
import { sound } from "../lib/sound";

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
    features: ["Figma Design Tokens", "Radix / Tailwind v4 Primitives", "Micro-interaction Physics", "WCAG 2.2 AAA Accessible", "Storybook Living Documentation"],
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
    features: ["Zero-downtime Blue/Green Deployments", "Global Multi-region Anycast", "SOC2 Type II Preparation", "DDoS Mitigation Layer", "24/7 Telemetry Dashboards"],
    isVisible: true,
    deliveryTime: "6-8 weeks",
    activeProjectsCount: 3,
  },
];

export const ServicesMatrix: React.FC = () => {
  const [services, setServices] = useState<Service[]>(DEFAULT_SERVICES);

  useEffect(() => {
    api.getServices().then((data) => {
      if (data && data.length > 0) {
        setServices(data.filter((s) => s.isVisible));
      }
    });
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu": return <Cpu size={22} className="text-white" />;
      case "Globe": return <Globe size={22} className="text-white" />;
      case "Palette": return <Palette size={22} className="text-white" />;
      case "Cloud": return <Cloud size={22} className="text-white" />;
      default: return <Code size={22} className="text-white" />;
    }
  };

  return (
    <section id="capabilities" className="py-28 border-b border-white/10 bg-zinc-950/80 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white inline-block" />
              <span>INDEX // 02</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-white">
              CORE CAPABILITIES
            </h2>
          </div>

          <p className="font-body text-zinc-400 text-sm max-w-md">
            We operate as an integrated technical partner, taking end-to-end responsibility from computational theory to high-availability deployment.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          {services.map((srv, idx) => (
            <div
              key={srv.id || idx}
              className="border border-white/10 hover:border-white/40 p-8 sm:p-10 bg-black/60 flex flex-col justify-between transition-all duration-300 group relative"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 border border-white/15 bg-white/5 flex items-center justify-center">
                    {getIcon(srv.iconName)}
                  </div>
                  <span className="font-mono text-zinc-600 text-sm font-semibold">
                    0{idx + 1} // CAPABILITY
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white mb-3">
                    {srv.title}
                  </h3>
                  <p className="font-body text-zinc-400 text-sm leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="pt-4 border-t border-white/10 space-y-2.5">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 font-mono text-xs text-zinc-300">
                      <Check size={14} className="text-zinc-500 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Timeline Footer */}
              <div className="pt-8 mt-8 border-t border-white/10 flex items-center justify-between font-mono">
                <div>
                  <span className="text-zinc-500 text-[10px] block uppercase">COMMENCING FROM</span>
                  <span className="text-white font-tech font-bold text-lg">
                    ${srv.startingPrice.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-zinc-500 text-[10px] block uppercase">CYCLE DURATION</span>
                  <span className="text-zinc-300 font-tech text-sm font-medium">
                    {srv.deliveryTime}
                  </span>
                </div>

                <a
                  href="#estimator"
                  onClick={() => sound.click()}
                  className="px-4 py-2 border border-white/20 hover:border-white text-white text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all"
                >
                  ESTIMATE &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
