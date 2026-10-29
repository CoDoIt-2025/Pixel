import React, { useState, useEffect } from "react";
import {
  Check,
  Globe,
  Search,
  MapPin,
  Share2,
  Sparkles,
  QrCode,
  ArrowRight,
  Code,
  Cpu,
  Layers,
  Palette,
  Cloud,
  Smartphone,
  FileText,
  BarChart,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { Service } from "../types";
import { api } from "../lib/api";
import { useSettings } from "../context/SettingsContext";

const FALLBACK_SERVICES: Service[] = [
  {
    id: "SRV-001",
    title: "Website Design",
    category: "Website Design",
    description:
      "Give customers a clear, mobile-friendly place to understand your business and get in touch. Pixel designs websites that explain your services clearly and give visitors a straightforward way to enquire.",
    iconName: "Globe",
    startingPrice: 150,
    features: [
      "Page structure built around your services",
      "Mobile-friendly layouts and touch optimization",
      "Clear enquiry paths & click-to-call links",
      "Search-friendly structure & essential page info",
      "Content support and gap identification",
    ],
    isVisible: true,
    deliveryTime: "3-5 weeks",
    activeProjectsCount: 4,
  },
  {
    id: "SRV-002",
    title: "SEO Services",
    category: "Search Optimization",
    description:
      "Improve your website’s structure and content around the searches that matter to your business. We focus on search needs in Oman and Thrissur without false promises.",
    iconName: "Search",
    startingPrice: 100,
    features: [
      "Keyword research for Oman & Thrissur markets",
      "Service page content improvements & internal links",
      "Technical search priorities & Search Console baseline",
      "Helpful answers to real customer search questions",
      "Transparent monthly reporting on verified evidence",
    ],
    isVisible: true,
    deliveryTime: "Ongoing monthly",
    activeProjectsCount: 3,
  },
  {
    id: "SRV-003",
    title: "Google Business Profile Management",
    category: "Local Presence",
    description:
      "Keep your eligible business profile accurate, useful and up to date for customers finding you on Google. Pixel helps organize and maintain verified profile details.",
    iconName: "MapPin",
    startingPrice: 75,
    features: [
      "Business information review & category selection",
      "Opening hours & special holiday hours updates",
      "Publishing approved business photos & updates",
      "Professional customer review response support",
      "Strict compliance with Google Business Profile guidelines",
    ],
    isVisible: true,
    deliveryTime: "Monthly management",
    activeProjectsCount: 5,
  },
  {
    id: "SRV-004",
    title: "Social Media Management",
    category: "Social Media",
    description:
      "Build a consistent presence with content that explains your services, answers questions and reflects your brand. Choose platforms around your actual audience.",
    iconName: "Share2",
    startingPrice: 120,
    features: [
      "Content calendar & informative post copy",
      "Branded visual graphics & design templates",
      "Platform scheduling focused on where customers spend time",
      "Pre-publication approval workflow",
      "Authentic business updates without artificial metrics",
    ],
    isVisible: true,
    deliveryTime: "Monthly management",
    activeProjectsCount: 4,
  },
  {
    id: "SRV-005",
    title: "AI Visibility Services",
    category: "AI Discovery",
    description:
      "Make your business information clearer and easier to understand across search and AI-assisted discovery, grounded in truthful content and structured data.",
    iconName: "Sparkles",
    startingPrice: 90,
    features: [
      "Clear service explanations & entity accuracy",
      "Helpful answers to real customer decision questions",
      "Structured data (Schema.org) for visible page content",
      "Manual query checks & referral tracking",
      "Honest reporting with evidence boundaries",
    ],
    isVisible: true,
    deliveryTime: "Monthly retainer",
    activeProjectsCount: 2,
  },
  {
    id: "SRV-006",
    title: "Digital QR Menus",
    category: "Hospitality",
    description:
      "Let guests browse your restaurant or hotel menu on their mobile phones. Clear categories, readable descriptions, and OMR prices help guests choose.",
    iconName: "QrCode",
    startingPrice: 80,
    features: [
      "Mobile-optimized category & item browser",
      "Readable descriptions, approved photos & OMR prices",
      "Optional dietary tags & bilingual layout support",
      "Print-ready QR code assets with direct link fallback",
      "Simple staff update process for changing seasonal items",
    ],
    isVisible: true,
    deliveryTime: "1-2 weeks",
    activeProjectsCount: 6,
  },
];

export const ServicesMatrix: React.FC = () => {
  const { company } = useSettings();
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const loadServices = async () => {
    try {
      const data = await api.getServices();
      if (data && data.length > 0) {
        setServices(data.filter((s) => s.isVisible));
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    loadServices();
    window.addEventListener("focus", loadServices);
    const interval = setInterval(loadServices, 4000);
    return () => {
      window.removeEventListener("focus", loadServices);
      clearInterval(interval);
    };
  }, []);

  const currencyUnit = company.currency
    ? company.currency.split("(")[0].trim()
    : "OMR";

  const getIcon = (name: string) => {
    switch (name) {
      case "Globe":
        return <Globe size={22} className="text-[#202124]" />;
      case "Search":
        return <Search size={22} className="text-[#202124]" />;
      case "MapPin":
        return <MapPin size={22} className="text-[#202124]" />;
      case "Share2":
        return <Share2 size={22} className="text-[#202124]" />;
      case "Sparkles":
        return <Sparkles size={22} className="text-[#202124]" />;
      case "QrCode":
        return <QrCode size={22} className="text-[#202124]" />;
      case "Code":
        return <Code size={22} className="text-[#202124]" />;
      case "Cpu":
        return <Cpu size={22} className="text-[#202124]" />;
      case "Layers":
        return <Layers size={22} className="text-[#202124]" />;
      case "Palette":
        return <Palette size={22} className="text-[#202124]" />;
      case "Cloud":
        return <Cloud size={22} className="text-[#202124]" />;
      case "Smartphone":
        return <Smartphone size={22} className="text-[#202124]" />;
      case "FileText":
        return <FileText size={22} className="text-[#202124]" />;
      case "BarChart":
        return <BarChart size={22} className="text-[#202124]" />;
      case "ShieldCheck":
        return <ShieldCheck size={22} className="text-[#202124]" />;
      default:
        return <Globe size={22} className="text-[#202124]" />;
    }
  };

  const categories = [
    "All",
    "Website Design",
    "Search Optimization",
    "Hospitality",
    "Local Presence",
    "Social Media",
  ];

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter(
          (s) =>
            s.category?.toLowerCase() === activeCategory.toLowerCase() ||
            s.title.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <section
      id="services"
      className="py-24 sm:py-32 bg-[#202124] border-t border-[#45484E] relative"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2D31] border border-[#45484E] text-[#F5C542] text-xs font-semibold mb-3">
              <Zap size={13} className="text-[#F5C542] fill-[#F5C542]" />
              <span>Core Capabilities &bull; Live Admin Synced</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F7F7F2]">
              Choose the support your business needs
            </h2>
            <p className="mt-4 text-[#C4C7CC] text-base leading-relaxed">
              Whether you need a new website, better information in local search or a simpler way to share your menu, start with the service that matches your next priority.
            </p>
          </div>

          <a
            href="#contact"
            className="btn-primary self-start md:self-auto py-2.5 px-5 text-xs font-bold whitespace-nowrap shadow-md"
          >
            <span>Request custom proposal</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-[#F5C542] text-[#202124] font-bold shadow-md shadow-[#F5C542]/20"
                  : "bg-[#2B2D31] text-[#C4C7CC] hover:text-[#F7F7F2] border border-[#45484E]"
              }`}
            >
              {cat === "All" ? "All 6 Services" : cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv, index) => {
            const indexStr = String(index + 1).padStart(2, "0");
            return (
              <div
                key={srv.id}
                className="p-7 rounded-2xl border border-[#45484E] bg-[#2B2D31] flex flex-col justify-between transition-all duration-300 group relative overflow-hidden card-hover-gold"
              >
                {/* Large Background Index */}
                <div
                  className="absolute top-4 right-5 text-3xl font-black text-[#45484E]/40 pointer-events-none group-hover:text-[#F5C542]/30 transition-colors font-display"
                  aria-hidden="true"
                >
                  {indexStr}
                </div>

                <div>
                  {/* Icon in yellow box */}
                  <div className="w-12 h-12 rounded-xl bg-[#F5C542] flex items-center justify-center mb-6 shadow-md shadow-[#F5C542]/20 group-hover:scale-105 transition-transform">
                    {getIcon(srv.iconName)}
                  </div>

                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-bold text-[#F5C542] uppercase tracking-wider">
                      {srv.category}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#202124] border border-[#45484E] text-[#C4C7CC]">
                      {srv.deliveryTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#F7F7F2] mb-3 group-hover:text-[#F5C542] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-[#C4C7CC] text-xs sm:text-sm leading-relaxed mb-6">
                    {srv.description}
                  </p>

                  {/* Features Checklist */}
                  {srv.features && srv.features.length > 0 && (
                    <div className="space-y-2.5 border-t border-[#45484E]/70 pt-5 mb-6">
                      {srv.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs text-[#C4C7CC]"
                        >
                          <Check
                            size={14}
                            className="text-[#F5C542] flex-shrink-0 mt-0.5"
                          />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-5 border-t border-[#45484E]/70 text-xs">
                  <div>
                    <span className="text-[#C4C7CC] block text-[11px]">
                      Starting from
                    </span>
                    <span className="text-[#F5C542] font-black text-base sm:text-lg">
                      {srv.startingPrice} {currencyUnit}
                    </span>
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#45484E] hover:border-[#F5C542] bg-[#202124] text-[#F7F7F2] hover:text-[#F5C542] font-semibold transition-all group-hover:border-[#F5C542]/60"
                  >
                    <span>Discuss</span>
                    <ArrowRight size={13} className="text-[#F5C542]" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
