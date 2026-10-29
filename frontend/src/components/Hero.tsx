import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Search,
  QrCode,
  MapPin,
  Layers,
  Compass,
  UtensilsCrossed,
  ShieldCheck,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { useSettings } from "../context/SettingsContext";

interface HeroPreview {
  id: string;
  badge: string;
  title: string;
  description: string;
  deliverables: string[];
  metrics: string;
  tag: string;
}

const HERO_PREVIEWS: HeroPreview[] = [
  {
    id: "web",
    badge: "Website Design",
    title: "Clear, High-Converting Websites for Oman",
    description:
      "Modern, responsive layouts engineered around your core services, click-to-call enquiry paths, fast Core Web Vitals, and search-ready information architecture.",
    deliverables: [
      "Mobile-first responsive architecture",
      "Direct WhatsApp & click-to-call flows",
      "Search-friendly metadata & page speed",
    ],
    metrics: "3 - 5 Weeks Delivery • From 150 OMR",
    tag: "High Conversion",
  },
  {
    id: "seo",
    badge: "SEO Services",
    title: "Truthful Search Visibility in Oman & Regional Markets",
    description:
      "Search Console baselines, keyword architecture for Oman & Thrissur, content enhancements, and transparent monthly performance reviews without false guarantees.",
    deliverables: [
      "Oman & Thrissur keyword targeting",
      "Google Search Console audit baseline",
      "Evidence-backed monthly reporting",
    ],
    metrics: "Ongoing Monthly • From 100 OMR",
    tag: "Zero False Guarantees",
  },
  {
    id: "qr",
    badge: "Digital QR Menus",
    title: "Interactive Mobile Browsing with OMR Prices",
    description:
      "Instant mobile browsing for restaurants, cafes and hotels in Oman. Clean dish categories, bilingual Arabic/English, and easy staff price updates.",
    deliverables: [
      "Bilingual Arabic/English menu display",
      "Authentic OMR pricing & dietary tags",
      "Instant mobile loading without apps",
    ],
    metrics: "1 - 2 Weeks Rollout • From 80 OMR",
    tag: "Hospitality Focus",
  },
  {
    id: "gbp",
    badge: "Google Business Profile",
    title: "Accurate Local Maps & Customer Discovery",
    description:
      "Organize verified business hours, addresses, approved photos, and professional review responses strictly aligned with Google guidelines.",
    deliverables: [
      "Verified address & business hours care",
      "High-resolution approved photo publishing",
      "Professional review response management",
    ],
    metrics: "Monthly Care • From 75 OMR",
    tag: "Verified Local Presence",
  },
];

export const Hero: React.FC = () => {
  const { company } = useSettings();
  const [activePreview, setActivePreview] = useState<string>("web");

  const currentPreview =
    HERO_PREVIEWS.find((p) => p.id === activePreview) || HERO_PREVIEWS[0];

  return (
    <section className="relative pt-24 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32 bg-[#202124] overflow-hidden select-none">
      {/* Background Ambience: Radiant Golden Glow & Dot Grid */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[580px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(245,197,66,0.18),transparent)] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Subtle radial ambient orbs on sides */}
      <div
        className="absolute -top-24 -left-24 w-96 h-96 bg-[#F5C542]/6 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-24 w-[420px] h-[420px] bg-[#F5C542]/8 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Top Hero Stage: Mobile-Optimized Top Mascot + Desktop 2-Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12 sm:mb-16">
          
          {/* Mobile-Only Mascot Stage: Welcoming hero on phones */}
          <div className="lg:hidden flex flex-col items-center justify-center pt-2 pb-1 relative">
            <div
              className="absolute w-52 h-52 bg-[radial-gradient(circle,rgba(245,197,66,0.25)_0%,transparent_70%)] rounded-full blur-xl pointer-events-none"
              aria-hidden="true"
            />
            <img
              src="/bird.png"
              alt="Pixel Robot Bird Mascot"
              className="w-40 sm:w-48 h-auto object-contain animate-float drop-shadow-[0_15px_30px_rgba(245,197,66,0.3)] relative z-10 select-none"
            />
            <div
              className="w-28 sm:w-36 h-3 bg-black/70 rounded-full blur-sm animate-shadow-pulse -mt-1.5"
              aria-hidden="true"
            />
          </div>

          {/* Headline, Description & CTAs Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Hero Headline with Golden Gradient Accent */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.035em] text-[#F7F7F2] leading-[1.12]">
              Websites and digital marketing for businesses in{" "}
              <span className="text-gradient-gold">
                Oman
              </span>
            </h1>

            {/* Hero Introduction from Admin Settings */}
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#C4C7CC] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {company.description ||
                "Pixel Business Solutions LLC helps businesses build a clearer online presence through website design, SEO, Google Business Profile management, social media management and AI visibility. For restaurants and hotels, we also offer digital QR menus."}
            </p>

            {/* Responsive Action Buttons: Full width on small mobile, side-by-side on sm+ */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <a
                href="#contact"
                className="btn-primary text-sm sm:text-base py-3 sm:py-3.5 px-7 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#F5C542]/30 w-full sm:w-auto"
              >
                <span>Discuss your project</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="#assessment"
                className="btn-secondary text-sm sm:text-base py-3 sm:py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Sparkles size={15} className="text-[#F5C542]" />
                <span>Guided Needs Assessment</span>
              </a>
            </div>

            {/* Micro Confidence Metrics Chips */}
            <div className="mt-7 pt-5 border-t border-[#45484E]/50 flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs">
              <div className="px-3 py-1.5 rounded-full bg-[#2B2D31]/80 border border-[#45484E] text-[#F7F7F2] flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
                <span>6 Core Services</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-[#2B2D31]/80 border border-[#45484E] text-[#F7F7F2] flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Bilingual AR/EN</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-[#2B2D31]/80 border border-[#45484E] text-[#F7F7F2] flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C542]" />
                <span>Oman Focus</span>
              </div>
            </div>
          </div>

          {/* Desktop-Only Mascot Stage: Expansive on large screens */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center justify-center relative">
            {/* Concentric Glow Backdrop */}
            <div
              className="absolute w-72 h-72 sm:w-88 sm:h-88 bg-[radial-gradient(circle,rgba(245,197,66,0.22)_0%,transparent_70%)] rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute w-52 h-52 bg-[#F5C542]/10 rounded-full blur-xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Floating 3D Robot Bird Image Only */}
            <div className="relative z-10 flex flex-col items-center">
              <img
                src="/bird.png"
                alt="Pixel Robot Bird Mascot"
                className="w-64 sm:w-80 md:w-92 lg:w-96 h-auto object-contain animate-float drop-shadow-[0_25px_35px_rgba(245,197,66,0.25)] select-none hover:scale-105 transition-transform"
              />

              {/* Dynamic Animated Ground Shadow */}
              <div
                className="w-40 sm:w-56 h-4 bg-black/60 rounded-full blur-md animate-shadow-pulse -mt-2"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Interactive Quick-Pill Service Previewer */}
        <div className="mt-8 max-w-4xl mx-auto">
          {/* Interactive Selector Tabs: Scrollable on mobile */}
          <div className="flex items-center sm:justify-center gap-2 overflow-x-auto pb-3 mb-4 select-none">
            {HERO_PREVIEWS.map((preview) => {
              const isActive = activePreview === preview.id;
              return (
                <button
                  key={preview.id}
                  onClick={() => setActivePreview(preview.id)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? "bg-[#F5C542] text-[#202124] shadow-lg shadow-[#F5C542]/25 scale-105 font-bold"
                      : "bg-[#2B2D31]/80 text-[#C4C7CC] hover:text-[#F7F7F2] border border-[#45484E] hover:border-[#F5C542]/50 backdrop-blur-sm"
                  }`}
                >
                  {preview.id === "web" && <Globe size={13} />}
                  {preview.id === "seo" && <Search size={13} />}
                  {preview.id === "qr" && <QrCode size={13} />}
                  {preview.id === "gbp" && <MapPin size={13} />}
                  <span>{preview.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Spotlight Card */}
          <div className="p-5 sm:p-8 rounded-2xl bg-[#2B2D31] border border-[#45484E] shadow-2xl text-left relative overflow-hidden transition-all duration-300 card-hover-gold">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5C542]/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-[#45484E]/70 mb-4">
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#F5C542] uppercase tracking-wider block mb-1">
                  Spotlight Capability &bull; {currentPreview.badge}
                </span>
                <h2 className="text-lg sm:text-2xl font-bold text-[#F7F7F2]">
                  {currentPreview.title}
                </h2>
              </div>
              <span className="self-start sm:self-auto px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#202124] text-[#F5C542] border border-[#45484E] whitespace-nowrap shadow-sm">
                {currentPreview.tag}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#C4C7CC] leading-relaxed mb-5 max-w-2xl">
              {currentPreview.description}
            </p>

            {/* Deliverables Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-5 sm:mb-6 pt-3 border-t border-[#45484E]/50">
              {currentPreview.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#F7F7F2]">
                  <CheckCircle2 size={13} className="text-[#F5C542] flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs text-[#C4C7CC]">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-3 border-t border-[#45484E]/70">
              <span className="text-xs font-semibold text-[#F7F7F2] flex items-center gap-2">
                <Clock size={13} className="text-[#F5C542]" />
                <span>{currentPreview.metrics}</span>
              </span>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5C542] hover:text-[#FFE28A] group self-start sm:self-auto"
              >
                <span>Plan this scope for your business</span>
                <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        {/* 4 Key Pillars of Integrity */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#45484E] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto text-left">
          <div className="p-3.5 sm:p-4.5 rounded-xl bg-[#2B2D31]/80 border border-[#45484E] hover:border-[#F5C542]/50 transition-all card-hover-gold">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#202124] border border-[#45484E] flex items-center justify-center text-[#F5C542] mb-2 sm:mb-3">
              <Layers size={15} />
            </div>
            <div className="text-lg sm:text-2xl font-black tracking-tight text-[#F5C542]">
              6 Services
            </div>
            <div className="text-[11px] sm:text-xs text-[#C4C7CC] mt-0.5 sm:mt-1 font-medium">
              Web, SEO, GBP, Social, AI &amp; QR
            </div>
          </div>

          <div className="p-3.5 sm:p-4.5 rounded-xl bg-[#2B2D31]/80 border border-[#45484E] hover:border-[#F5C542]/50 transition-all card-hover-gold">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#202124] border border-[#45484E] flex items-center justify-center text-[#F5C542] mb-2 sm:mb-3">
              <Compass size={15} />
            </div>
            <div className="text-lg sm:text-2xl font-black tracking-tight text-[#F7F7F2]">
              Oman First
            </div>
            <div className="text-[11px] sm:text-xs text-[#C4C7CC] mt-0.5 sm:mt-1 font-medium">
              Muscat &amp; regional GCC
            </div>
          </div>

          <div className="p-3.5 sm:p-4.5 rounded-xl bg-[#2B2D31]/80 border border-[#45484E] hover:border-[#F5C542]/50 transition-all card-hover-gold">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#202124] border border-[#45484E] flex items-center justify-center text-[#F5C542] mb-2 sm:mb-3">
              <UtensilsCrossed size={15} />
            </div>
            <div className="text-lg sm:text-2xl font-black tracking-tight text-[#F5C542]">
              OMR Menus
            </div>
            <div className="text-[11px] sm:text-xs text-[#C4C7CC] mt-0.5 sm:mt-1 font-medium">
              Bilingual hospitality QR suites
            </div>
          </div>

          <div className="p-3.5 sm:p-4.5 rounded-xl bg-[#2B2D31]/80 border border-[#45484E] hover:border-[#F5C542]/50 transition-all card-hover-gold">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#202124] border border-[#45484E] flex items-center justify-center text-[#F5C542] mb-2 sm:mb-3">
              <ShieldCheck size={15} />
            </div>
            <div className="text-lg sm:text-2xl font-black tracking-tight text-[#F7F7F2]">
              Truthful
            </div>
            <div className="text-[11px] sm:text-xs text-[#C4C7CC] mt-0.5 sm:mt-1 font-medium">
              Zero false ranking claims
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
