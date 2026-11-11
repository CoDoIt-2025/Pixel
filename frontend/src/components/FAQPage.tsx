import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  ChevronDown,
  HelpCircle,
  Phone,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import type { FAQItem } from "../types";
import { api } from "../lib/api";

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "FAQ-001",
    question: "What digital services does Pixel Business Solutions provide in Oman?",
    answer:
      "We specialize in Google Business Profile management & Local SEO (Google Maps 3-Pack), Website Design & Next.js Development, Organic Technical SEO & AI Search Visibility (ChatGPT, Gemini, Perplexity), Social Media Management, Digital Paid Advertising (Google & Meta Ads), Creative Content & AI Video Reels, Custom Business Tools (portals, web apps), and touchless Digital QR Menus for restaurants.",
    category: "Services & Scope",
  },
  {
    id: "FAQ-002",
    question: "Do you handle bilingual Arabic and English implementations?",
    answer:
      "Yes, 100%. All website developments, Google Business Profiles, social media calendars, and advertising copy are natively executed in both Arabic (RTL) and English (LTR) to ensure comprehensive market reach across Omani citizens and multinational expatriates.",
    category: "Services & Scope",
  },
  {
    id: "FAQ-003",
    question: "Who owns the website source code, domain, and advertising accounts?",
    answer:
      "Your company retains 100% full legal ownership of all assets. Domain names, code repositories, cloud hosting, Google Search Console, and advertising accounts are registered under your business name. We never lock clients into proprietary hostage architectures.",
    category: "Ownership & Terms",
  },
  {
    id: "FAQ-004",
    question: "How long does a typical website design or local SEO engagement take?",
    answer:
      "A bespoke high-performance corporate website typically launches in 3 to 6 weeks. Local SEO and Google Maps optimization begins delivering increased phone calls and visibility within 30 to 60 days, with dominant 3-Pack positions established within 3 to 6 months depending on category competition.",
    category: "Timelines & Delivery",
  },
  {
    id: "FAQ-005",
    question: "Can you integrate local Oman payment gateways like Bank Muscat or Thawani?",
    answer:
      "Yes. Our engineering team has direct experience integrating Bank Muscat Payment Gateway, Thawani Pay, and international payment processors with VAT-compliant invoice generation in OMR.",
    category: "Engineering & Integration",
  },
  {
    id: "FAQ-006",
    question: "How does AI Search Visibility (GEO/AEO) differ from traditional SEO?",
    answer:
      "Traditional SEO optimizes for keyword positions on Google search results pages. Generative Engine Optimization (GEO/AEO) structures your company's data and entity authority so generative AI models like ChatGPT, Google AI Overviews, Perplexity, and Copilot cite your business as the direct, authoritative recommendation when users ask complex conversational questions.",
    category: "SEO & AI Visibility",
  },
  {
    id: "FAQ-007",
    question: "How do we get started with a digital presence audit for our company?",
    answer:
      "Simply fill out the digital audit form on this website with your company name, contact phone (+968), and existing website or Google Maps link. Our Muscat technical team will review your digital footprint and contact you within 24 business hours.",
    category: "Getting Started",
  },
  {
    id: "FAQ-008",
    question: "Do digital QR menus require guests to install an app?",
    answer:
      "No app installation is required. Guests simply scan the QR code with their phone camera, and the interactive menu opens instantly in any browser in under 0.4 seconds, with bilingual Arabic/English toggle and OMR pricing.",
    category: "Hospitality & Retail",
  },
];

interface FAQPageProps {
  onBack: () => void;
  onRequestAudit: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onBack, onRequestAudit }) => {
  const [faqs, setFaqs] = useState<FAQItem[]>(DEFAULT_FAQS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    api
      .getFAQs()
      .then((dbFaqs) => {
        if (dbFaqs && dbFaqs.length > 0) {
          setFaqs(dbFaqs);
        }
      })
      .catch(() => {});
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(faqs.map((f) => f.category || "General").filter(Boolean))),
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || (faq.category || "General") === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="w-full bg-[#FAF9F5] text-[#121418] min-h-screen">
      {/* ── Top Bar with Back Button ── */}
      <div className="bg-[#121418] border-b border-[#242831] py-4 px-4 sm:px-6 lg:px-8 sticky top-[105px] z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-[#FACC15] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>

          <span className="text-[11px] font-bold text-[#A1A5B0] uppercase tracking-wider hidden sm:inline">
            Official Knowledge Base &bull; Muscat, Oman
          </span>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <section className="bg-[#121418] text-white py-14 sm:py-20 border-b border-[#242831]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1E222B] border border-[#2B303C] text-[#FACC15] text-xs font-bold mb-4">
            <HelpCircle size={14} className="text-[#FACC15]" />
            <span>Straightforward Answers</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h1>

          <p className="text-sm sm:text-base text-[#A1A5B0] max-w-2xl mx-auto leading-relaxed mb-8">
            Clear information about our digital deliverables, search algorithms, ownership policies, timelines, and Oman market execution.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#717682]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. ownership, pricing, Google Maps, Next.js)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#1A1D24] border border-[#2B303C] text-sm text-white placeholder-[#717682] focus:outline-none focus:border-[#FACC15] transition-all shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#FACC15] text-[#121418] shadow-sm font-black"
                  : "bg-white text-[#525763] hover:text-[#121418] border border-[#E2E4E9]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-xs text-[#717682] mb-4 font-semibold">
          Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? "answer" : "answers"}
        </div>

        {/* Accordion Questions */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white border border-[#E2E4E9] rounded-2xl p-10 text-center">
            <p className="text-sm font-bold text-[#121418]">
              No questions found matching "{searchQuery}"
            </p>
            <p className="text-xs text-[#525763] mt-1">
              Try searching with different terms or reach out to us directly.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#FACC15] text-[#121418] text-xs font-bold cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={faq.id || idx}
                  className="border border-[#E2E4E9] rounded-2xl overflow-hidden transition-all bg-white shadow-xs hover:border-[#FACC15]"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#121418] hover:text-[#D97706] transition-colors cursor-pointer"
                  >
                    <span className="flex items-start gap-3">
                      <HelpCircle
                        size={18}
                        className="text-[#FACC15] shrink-0 mt-0.5"
                      />
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[#717682] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#525763] leading-relaxed border-t border-[#F0F0EB] bg-[#FAF9F5]/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── Still Have Questions Card ── */}
        <div className="mt-14 bg-[#121418] text-white rounded-3xl p-7 sm:p-10 border border-[#242831] shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FACC15]">
                <Sparkles size={14} />
                <span>Direct Consultation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Have a specific question about your project?
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A5B0] max-w-lg leading-relaxed">
                Our digital presence specialists in Muscat are ready to discuss your business requirements, timeline, and exact scope.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://wa.me/96896935606"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1EBE5D] transition-colors shadow-sm"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Us</span>
              </a>

              <a
                href="tel:+96896935606"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1E2128] border border-[#2B303C] text-white text-xs font-bold hover:border-[#FACC15] transition-colors"
              >
                <Phone size={16} className="text-[#FACC15]" />
                <span>+968 9693 5606</span>
              </a>

              <button
                onClick={onRequestAudit}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FACC15] text-[#121418] text-xs font-black hover:bg-[#F59E0B] transition-colors cursor-pointer"
              >
                <span>Request Free Audit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
