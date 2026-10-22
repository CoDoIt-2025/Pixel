import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import type { FAQItem } from "../types";
import { api } from "../lib/api";

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "FAQ-001",
    question: "How do you structure engagements and pricing?",
    answer: "We primarily work on fixed-fee, milestone-based engagements with clear deliverables and acceptance criteria. For ongoing scaling and embedded architecture, we offer dedicated monthly engineering retainers. You always know exact budgets upfront with zero hidden fees.",
    category: "Pricing & Retainers",
  },
  {
    id: "FAQ-002",
    question: "What technical stacks and frameworks do you build with?",
    answer: "Our core stack comprises React 19, Next.js 16 App Router, TypeScript, Python (FastAPI), PyTorch, PostgreSQL, Vector databases, and cloud infrastructure on AWS & GCP managed via Terraform. We prioritize high throughput, sub-50ms latency, and rock-solid reliability.",
    category: "Technical Stack",
  },
  {
    id: "FAQ-003",
    question: "Do we retain 100% ownership of the intellectual property?",
    answer: "Yes, absolutely. All code, design assets, trained models, architectural schemas, and documentation are 100% your intellectual property. Full IP assignment and repository access are transferred upon milestone completion.",
    category: "IP & Legal",
  },
  {
    id: "FAQ-004",
    question: "How quickly can your team kick off a new engagement?",
    answer: "Following our initial technical discovery call and mutual scope sign-off, we can typically mobilize a dedicated team of principal engineers within 1 to 2 weeks.",
    category: "Process & Delivery",
  },
  {
    id: "FAQ-005",
    question: "Can you collaborate with our existing in-house engineering team?",
    answer: "Yes. We frequently embed as a specialized strike team alongside internal CTOs, VP of Engineering, or product teams to accelerate critical zero-to-one initiatives, rebuild architectures, or implement complex AI capabilities.",
    category: "General",
  },
  {
    id: "FAQ-006",
    question: "What post-launch warranty and SLA support is included?",
    answer: "Every production deliverable comes with a comprehensive 60-day post-launch warranty covering bug fixes, edge case resolution, performance profiling, and hands-on team handover sessions.",
    category: "Support & SLA",
  },
];

export const FAQSection: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(DEFAULT_FAQS);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const fetchFAQs = async () => {
    try {
      const data = await api.getFAQs();
      if (data && data.length > 0) {
        setFaqs(data.filter((f) => f.isActive !== false));
      }
    } catch {
      // Keep existing or default
    }
  };

  useEffect(() => {
    fetchFAQs();
    // Auto refresh when tab regains focus or every 6 seconds to capture Admin Panel updates
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

  return (
    <section id="faq" className="py-24 sm:py-32 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-950">
            Everything you need to know
          </h2>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            Have questions about working with Pixel? Here are answers to the most common inquiries from founders and enterprise leaders.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className="rounded-xl border border-slate-200/80 bg-white transition-all overflow-hidden shadow-2xs hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-slate-900 tracking-tight">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0 transition-colors">
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom prompt */}
        <div className="mt-12 text-center text-xs text-slate-500">
          <span>Still have a question? </span>
          <a
            href="#contact"
            className="text-slate-900 font-semibold underline underline-offset-4 hover:text-slate-700"
          >
            Reach out directly to our principals &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
