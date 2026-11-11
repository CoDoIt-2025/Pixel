import React, { useState, useEffect } from "react";
import { ChevronDown, HelpCircle, Phone, MessageCircle, ArrowRight } from "lucide-react";
import type { FAQItem } from "../types";
import { api } from "../lib/api";

const FAQS_LIST: FAQItem[] = [
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

interface FAQSectionProps {
  onOpenFullFaqPage?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenFullFaqPage }) => {
  const [faqs, setFaqs] = useState<FAQItem[]>(FAQS_LIST);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    api
      .getFAQs()
      .then((dbFaqs) => {
        if (dbFaqs && dbFaqs.length > 0) {
          setFaqs(dbFaqs);
        }
      })
      .catch(() => {});
  }, []);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="w-full bg-white text-[#121418] py-16 sm:py-24 border-b border-[#E5E5DF] scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Direct "Browse Full FAQ Page" Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#E5E5DF]">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#121418]">
                Frequently Asked Questions
              </h2>
              <span className="w-10 sm:w-14 h-1 sm:h-1.5 bg-[#FACC15] rounded-full inline-block" />
            </div>
            <p className="mt-2 text-xs sm:text-sm text-[#525763]">
              Straightforward answers regarding our deliverables, timelines, pricing, and Oman market execution.
            </p>
          </div>

          {onOpenFullFaqPage && (
            <button
              onClick={onOpenFullFaqPage}
              className="px-5 py-2.5 rounded-xl bg-[#121418] hover:bg-[#FACC15] hover:text-[#121418] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Browse Full FAQ Page</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.slice(0, 6).map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.id || idx}
                className="border border-[#E2E4E9] rounded-2xl overflow-hidden transition-all bg-[#FAF9F5] shadow-xs hover:border-[#FACC15]"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#121418] hover:text-[#D97706] transition-colors cursor-pointer"
                >
                  <span className="flex items-start gap-3">
                    <HelpCircle size={18} className="text-[#FACC15] shrink-0 mt-0.5" />
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
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#525763] leading-relaxed border-t border-[#E5E5DF] bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All Questions CTA Button */}
        {onOpenFullFaqPage && (
          <div className="mt-8 text-center">
            <button
              onClick={onOpenFullFaqPage}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF9F5] border border-[#E2E4E9] hover:border-[#FACC15] hover:bg-white text-xs font-bold text-[#121418] transition-all cursor-pointer shadow-xs"
            >
              <span>View All Questions &amp; Knowledge Base</span>
              <ArrowRight size={14} className="text-[#D97706]" />
            </button>
          </div>
        )}

        {/* Direct WhatsApp Consultation Card */}
        <div className="mt-10 p-6 rounded-2xl bg-[#FAF9F5] border border-[#E5E5DF] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-extrabold text-sm text-[#121418]">
              Have a specific question about your project?
            </h4>
            <p className="text-xs text-[#525763] mt-0.5">
              Our technical team in Muscat is ready to discuss your requirements.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href="https://wa.me/96896935606"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-xs hover:bg-[#1EBE5D] transition-colors"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Us</span>
            </a>
            <a
              href="tel:+96896935606"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#121418] text-white text-xs font-bold hover:bg-[#2B2F3A] transition-colors"
            >
              <Phone size={14} className="text-[#FACC15]" />
              <span>+968 9693 5606</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
