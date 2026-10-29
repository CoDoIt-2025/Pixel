import React, { useState, useEffect } from "react";
import { Plus, Minus, HelpCircle, MessageSquare } from "lucide-react";
import type { FAQItem } from "../types";
import { api } from "../lib/api";

const FALLBACK_FAQS: FAQItem[] = [
  {
    id: "FAQ-001",
    question: "What services does Pixel offer?",
    answer:
      "We offer website design, SEO, Google Business Profile management, social media management, AI visibility and digital QR menus for restaurants and hotels.",
    category: "Services & Scope",
  },
  {
    id: "FAQ-002",
    question: "Which markets do you focus on?",
    answer:
      "Oman is our primary focus. We also welcome enquiries from businesses in Thrissur, Kerala. Tell us where you operate and where your customers are so the plan can reflect your market.",
    category: "Markets",
  },
  {
    id: "FAQ-003",
    question: "Can I choose just one service?",
    answer:
      "Yes. Start with the service you need, or tell us your goal if you are unsure. Any recommendation will explain its purpose and what is included.",
    category: "Services & Scope",
  },
  {
    id: "FAQ-004",
    question: "How much will my project cost?",
    answer:
      "The cost depends on the number of pages, content, features and ongoing support involved. Share your requirements with us so we can discuss a proposal based on your needs.",
    category: "Pricing",
  },
  {
    id: "FAQ-005",
    question: "How long does a project take?",
    answer:
      "The schedule depends on scope, content readiness, approvals and any integrations. We agree a realistic project timeline after reviewing requirements rather than promising the same delivery time for every business.",
    category: "Process & Timelines",
  },
  {
    id: "FAQ-006",
    question: "Do you guarantee search rankings or AI mentions?",
    answer:
      "No. Search engines and AI providers decide what appears in their results. We focus on clear content, accurate information and agreed improvements, then review the evidence available.",
    category: "SEO & AI",
  },
  {
    id: "FAQ-007",
    question: "Can you work with my existing website?",
    answer:
      "We can discuss improvements to an existing website after reviewing its setup, access requirements and your goals. Some requests may need targeted enhancements while others benefit from a redesign.",
    category: "Website Design",
  },
  {
    id: "FAQ-008",
    question: "Are hosting and ongoing updates included?",
    answer:
      "These are stated explicitly in your proposal. We ensure you know who owns the domain and accounts, what support is included and how updates are handled after launch.",
    category: "Website Design",
  },
  {
    id: "FAQ-009",
    question: "Does a QR menu include ordering and payments?",
    answer:
      "Not automatically. A digital QR menu helps guests browse dishes and prices easily on their phones. Ordering, payments and point-of-sale integrations require separate planning and agreement.",
    category: "Hospitality",
  },
  {
    id: "FAQ-010",
    question: "How do I get started?",
    answer:
      "Use the contact form on our website to share your business details, the service you are interested in and your main priority. We will follow up to discuss a practical starting point.",
    category: "Getting Started",
  },
];

export const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(FALLBACK_FAQS);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const fetchFAQs = async () => {
    try {
      const data = await api.getFAQs();
      if (data && data.length > 0) {
        setFaqs(data.filter((f) => f.isActive !== false));
      }
    } catch {
      // Keep fallback
    }
  };

  useEffect(() => {
    fetchFAQs();
    const handleFocus = () => fetchFAQs();
    window.addEventListener("focus", handleFocus);
    const interval = setInterval(fetchFAQs, 6000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = [
    "All",
    "Services & Scope",
    "Pricing",
    "Process & Timelines",
    "SEO & AI",
    "Hospitality",
  ];

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter(
          (f) =>
            f.category?.toLowerCase() === activeCategory.toLowerCase() ||
            f.question.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 bg-[#202124] text-[#F7F7F2] border-t border-[#45484E] relative"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header from docx */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2D31] border border-[#45484E] text-[#F5C542] text-xs font-semibold mb-3">
            <HelpCircle size={14} className="text-[#F5C542]" />
            <span>Honest &amp; Clear Answers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F7F7F2]">
            Questions about working with Pixel
          </h2>
          <p className="mt-4 text-[#C4C7CC] text-base leading-relaxed">
            Find answers to common questions about our services and project planning. For details specific to your business, tell us what you need and we can discuss the scope.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-[#F5C542] text-[#202124] font-bold shadow-md shadow-[#F5C542]/20"
                  : "bg-[#2B2D31] text-[#C4C7CC] hover:text-[#F7F7F2] border border-[#45484E]"
              }`}
            >
              {cat === "All" ? "All 10 Questions" : cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#2B2D31] border-[#F5C542]/60 shadow-xl shadow-black/30"
                    : "bg-[#2B2D31]/80 border-[#45484E] hover:border-[#F5C542]/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base text-[#F7F7F2] leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#F5C542] text-[#202124]"
                        : "bg-[#202124] text-[#C4C7CC] border border-[#45484E]"
                    }`}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#C4C7CC] leading-relaxed border-t border-[#45484E]/50">
                    <p>{faq.answer}</p>
                    {faq.category && (
                      <span className="inline-block mt-3 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#202124] text-[#F5C542] border border-[#45484E]">
                        {faq.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt for custom questions */}
        <div className="mt-12 p-6 rounded-2xl bg-[#2B2D31] border border-[#45484E] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#202124] border border-[#45484E] flex items-center justify-center text-[#F5C542]">
              <MessageSquare size={18} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#F7F7F2]">
                Have a specific question about your project?
              </h4>
              <p className="text-xs text-[#C4C7CC]">
                We discuss scopes openly without obligation.
              </p>
            </div>
          </div>

          <a href="#contact" className="btn-primary py-2 px-4 text-xs">
            Ask our team
          </a>
        </div>
      </div>
    </section>
  );
};
