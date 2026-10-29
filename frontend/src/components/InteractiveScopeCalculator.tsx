import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

interface NeedsAssessmentProps {
  onApplyEstimate: (scopeData: {
    service: string;
    budget: string;
    message: string;
  }) => void;
}

export const InteractiveScopeCalculator: React.FC<NeedsAssessmentProps> = ({ onApplyEstimate }) => {
  const [market, setMarket] = useState<string>("oman");
  const [businessType, setBusinessType] = useState<string>("services");
  const [websiteStatus, setWebsiteStatus] = useState<string>("none");
  const [mainGoal, setMainGoal] = useState<string>("enquiries");

  // Recommendation engine based on official website plan rules
  const getRecommendation = () => {
    if (businessType === "hospitality" || mainGoal === "menu") {
      return {
        service: "Digital QR Menus",
        headline: "Digital QR Menu Planning",
        explanation:
          "Because you operate a restaurant, cafe or hotel and want a simpler way for guests to browse dishes and prices on their mobile phones in OMR. Every demo dish and price is illustrative; no order or payment flow is required.",
        nextStep: "Discuss your menu structure, categories, and update workflow.",
        typicalTimeline: "1 - 2 weeks",
      };
    }

    if (websiteStatus === "none" || mainGoal === "enquiries") {
      return {
        service: "Website Design",
        headline: "Website Planning Conversation",
        explanation:
          "A website planning conversation is your best starting point because you said you do not yet have an effective website and want customers to discover your services and get in touch. This suggestion uses your answers, not a technical inspection.",
        nextStep: "Identify your services, target audience, and gather approved brand assets.",
        typicalTimeline: "3 - 5 weeks",
      };
    }

    if (mainGoal === "search" && websiteStatus === "exists") {
      return {
        service: "SEO Services",
        headline: "Search Engine Optimization Review",
        explanation:
          "Because your website is already live and your primary objective is helping Oman and regional customers find your services through search engines. We focus on content structure and search console data without false ranking guarantees.",
        nextStep: "Review existing pages and capture a Google Search Console baseline.",
        typicalTimeline: "Ongoing monthly review",
      };
    }

    if (mainGoal === "local_visits") {
      return {
        service: "Google Business Profile Management",
        headline: "Google Business Profile Eligibility & Setup",
        explanation:
          "Because you welcome local customer visits in Oman or Thrissur. Accurate address, operating hours, and verified photos ensure customers find truthful information on Google Maps.",
        nextStep: "Verify platform eligibility and owner account access.",
        typicalTimeline: "Monthly profile management",
      };
    }

    if (mainGoal === "social_consistency") {
      return {
        service: "Social Media Management",
        headline: "Social Media Content Strategy",
        explanation:
          "Because your business wants a consistent presence with content that explains services and answers customer questions. Platforms are selected around where your customers spend time.",
        nextStep: "Establish a content calendar and review approval workflow.",
        typicalTimeline: "Monthly content management",
      };
    }

    return {
      service: "AI Visibility Services",
      headline: "AI Visibility & Search Clarity",
      explanation:
        "Because you want your business information to be clearer and easier to understand across conversational AI and modern search experiences through structured data and authentic entity details.",
      nextStep: "Review entity facts, visible website answers, and Schema markup.",
      typicalTimeline: "Monthly advisory retainer",
    };
  };

  const recommendation = getRecommendation();

  const handleApply = () => {
    onApplyEstimate({
      service: recommendation.service,
      budget: "Standard proposal discussion",
      message: `Needs Assessment Result (${market === "oman" ? "Oman" : "Thrissur"} market): Interested in ${recommendation.headline}. Current website status: ${websiteStatus === "none" ? "No website yet" : "Existing website live"}. Primary goal: ${mainGoal}.`,
    });

    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="assessment" className="py-24 sm:py-32 bg-[#F5F4EF] text-[#202124] border-t border-[#45484E]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header from docx */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5E4DE] text-[#202124] text-xs font-semibold mb-3">
            <Sparkles size={13} className="text-[#F5C542] fill-[#F5C542]" />
            <span>Interactive Guided Needs Assessment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#202124]">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-[#5A5D63] text-base sm:text-lg leading-relaxed">
            Answer a few questions about your business and your goals. Our assessment will suggest a practical starting point and explain why. It uses your answers; it does not scan your website or measure your current ranking.
          </p>
        </div>

        {/* Two-Column Interactive Tool: Left Questions, Right Live Recommendation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Questions Panel */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E5E4DE] rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#202124] mb-6 flex items-center justify-between">
              <span>Tell us about your situation</span>
              <span className="text-xs font-normal text-[#5A5D63]">Select what applies</span>
            </h3>

            {/* Q1: Market */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-2.5">
                1. Where do you primarily serve customers?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMarket("oman")}
                  className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all ${
                    market === "oman"
                      ? "border-[#F5C542] bg-[#F5C542]/15 text-[#202124] ring-1 ring-[#F5C542]"
                      : "border-[#E5E4DE] bg-[#FFFFFF] text-[#5A5D63] hover:border-[#C4C7CC]"
                  }`}
                >
                  <span className="block font-bold text-[#202124]">Sultanate of Oman</span>
                  <span className="text-[11px] font-normal text-[#5A5D63]">Primary Focus</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMarket("thrissur")}
                  className={`p-3 rounded-lg border text-left text-xs font-semibold transition-all ${
                    market === "thrissur"
                      ? "border-[#F5C542] bg-[#F5C542]/15 text-[#202124] ring-1 ring-[#F5C542]"
                      : "border-[#E5E4DE] bg-[#FFFFFF] text-[#5A5D63] hover:border-[#C4C7CC]"
                  }`}
                >
                  <span className="block font-bold text-[#202124]">Thrissur, Kerala</span>
                  <span className="text-[11px] font-normal text-[#5A5D63]">Secondary Market</span>
                </button>
              </div>
            </div>

            {/* Q2: Business Type */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-2.5">
                2. What type of business do you operate?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "services", label: "Commercial Services", sub: "Trade & Professional" },
                  { id: "hospitality", label: "Dining & Hotel", sub: "Restaurants / Cafes" },
                  { id: "retail", label: "Retail Store", sub: "Physical / Local Shop" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBusinessType(item.id)}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      businessType === item.id
                        ? "border-[#F5C542] bg-[#F5C542]/15 text-[#202124] ring-1 ring-[#F5C542]"
                        : "border-[#E5E4DE] bg-[#FFFFFF] text-[#5A5D63] hover:border-[#C4C7CC]"
                    }`}
                  >
                    <span className="block font-bold text-[#202124]">{item.label}</span>
                    <span className="text-[10px] text-[#5A5D63]">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Website Status */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-2.5">
                3. What is the current status of your website?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setWebsiteStatus("none")}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    websiteStatus === "none"
                      ? "border-[#F5C542] bg-[#F5C542]/15 text-[#202124] ring-1 ring-[#F5C542]"
                      : "border-[#E5E4DE] bg-[#FFFFFF] text-[#5A5D63] hover:border-[#C4C7CC]"
                  }`}
                >
                  <span className="block font-bold text-[#202124]">No website yet</span>
                  <span className="text-[10px] text-[#5A5D63]">Starting from scratch</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWebsiteStatus("exists")}
                  className={`p-3 rounded-lg border text-left text-xs transition-all ${
                    websiteStatus === "exists"
                      ? "border-[#F5C542] bg-[#F5C542]/15 text-[#202124] ring-1 ring-[#F5C542]"
                      : "border-[#E5E4DE] bg-[#FFFFFF] text-[#5A5D63] hover:border-[#C4C7CC]"
                  }`}
                >
                  <span className="block font-bold text-[#202124]">Website is live</span>
                  <span className="text-[10px] text-[#5A5D63]">Needs review or redesign</span>
                </button>
              </div>
            </div>

            {/* Q4: Main Goal */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#202124] uppercase tracking-wider mb-2.5">
                4. What is your most important online priority right now?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: "enquiries", label: "Get customer enquiries", desc: "Clear contact details & forms" },
                  { id: "search", label: "Improve search rankings", desc: "Show up for relevant searches" },
                  { id: "local_visits", label: "Help customers find our location", desc: "Google Maps & opening hours" },
                  { id: "menu", label: "Share our food / cafe menu", desc: "Digital QR code on mobile" },
                  { id: "social_consistency", label: "Regular social media posts", desc: "Consistent branded updates" },
                  { id: "ai_clarity", label: "Accurate details in AI answers", desc: "Clear entity information" },
                ].map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setMainGoal(goal.id)}
                    className={`p-3 rounded-lg border text-left text-xs transition-all ${
                      mainGoal === goal.id
                        ? "border-[#F5C542] bg-[#F5C542]/15 text-[#202124] ring-1 ring-[#F5C542]"
                        : "border-[#E5E4DE] bg-[#FFFFFF] text-[#5A5D63] hover:border-[#C4C7CC]"
                    }`}
                  >
                    <span className="block font-bold text-[#202124]">{goal.label}</span>
                    <span className="text-[11px] text-[#5A5D63]">{goal.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendation Output Box */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E5E4DE] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-[#5A5D63] uppercase tracking-widest">
                  Suggested Starting Point
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#F5C542]/20 text-[#202124] text-[11px] font-bold">
                  Rule-based
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F4EF] border border-[#E5E4DE] mb-6">
                <span className="text-xs font-bold text-[#F5C542] uppercase tracking-wider block mb-1">
                  Recommended Service
                </span>
                <h4 className="text-xl font-bold text-[#202124]">
                  {recommendation.headline}
                </h4>
              </div>

              <div className="space-y-4 text-xs text-[#5A5D63] leading-relaxed mb-6">
                <p className="bg-[#FFFFFF] p-4 rounded-xl border border-[#E5E4DE]">
                  <strong className="text-[#202124] block mb-1">Why this fits:</strong>
                  {recommendation.explanation}
                </p>

                <div className="flex items-start gap-2.5 text-xs text-[#202124]">
                  <CheckCircle2 size={16} className="text-[#F5C542] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Next practical step:</strong> {recommendation.nextStep}
                  </span>
                </div>

                <div className="flex items-start gap-2.5 text-xs text-[#202124]">
                  <CheckCircle2 size={16} className="text-[#F5C542] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Typical timeline:</strong> {recommendation.typicalTimeline}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#FAF9F5] border border-[#E5E4DE] text-[11px] text-[#5A5D63] mb-6">
                <em>Note:</em> This result is illustrative and based entirely on your answers. It does not bind you to a quote or perform automatic data submission.
              </div>
            </div>

            {/* Yellow button with charcoal text */}
            <button
              onClick={handleApply}
              className="w-full py-3.5 px-5 rounded-lg bg-[#F5C542] hover:bg-[#E5B532] text-[#202124] font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Discuss this recommendation</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
