import React from "react";
import {
  Building2,
  ShieldCheck,
  Languages,
  Zap,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface WhyReason {
  title: string;
  description: string;
}

interface AboutWhySectionProps {
  aboutTitle?: string;
  aboutText?: string;
  whyTitle?: string;
  whyReasons?: WhyReason[];
}

export const AboutWhySection: React.FC<AboutWhySectionProps> = ({
  aboutTitle = "About Pixel",
  aboutText,
  whyTitle = "Why Pixel",
  whyReasons,
}) => {
  const defaultReasons: WhyReason[] = [
    {
      title: "Oman-First Local Search & Map Dominance",
      description:
        "Engineered for how consumers in Muscat search and buy. We secure high-intent Google Maps 3-Pack rankings that drive real phone inquiries and footfall.",
    },
    {
      title: "End-to-End Modern Digital Capabilities",
      description:
        "From sub-1.5s Next.js web applications and generative AI discovery (GEO) to paid media funnels and digital QR menus — everything is engineered under one roof.",
    },
    {
      title: "100% Legal Client Asset Ownership",
      description:
        "You retain complete ownership of all domains, source code, hosting, Google Search Console, and advertising accounts. Zero proprietary lock-ins, guaranteed.",
    },
    {
      title: "Native Bilingual Arabic & English Execution",
      description:
        "Every creative asset, website layout, review system, and advertising campaign is crafted with authentic cultural nuance for both Omani citizens and expatriates.",
    },
  ];

  const reasons = whyReasons && whyReasons.length > 0 ? whyReasons : defaultReasons;

  // Custom or rich default narrative for About Pixel
  const defaultParagraphs = [
    "Pixel Business Solutions LLC is a Muscat-based digital solutions and engineering agency dedicated to helping businesses in the Sultanate of Oman build dominant, conversion-focused online footprints.",
    "We bridge technical precision with practical commercial execution. While many agencies rely on bloated WordPress templates and vanity metrics, Pixel engineers ultra-fast Next.js platforms, local search (Google Maps 3-Pack) systems, and Generative Engine Optimization (GEO) tailored for conversational AI models like ChatGPT and Google AI Overviews.",
    "Whether working with growing local enterprises in Seeb and Bawshar or established commercial institutions across Muscat, our mission is simple: eliminate digital friction, ensure total transparency, and generate measurable, verifiable business revenue in the Omani market.",
  ];

  const paragraphs = aboutText
    ? aboutText.split("\n\n").filter(Boolean)
    : defaultParagraphs;

  return (
    <>
      {/* ════════════════════════════════════════════
          SECTION 1 — About Pixel  (light background)
          ════════════════════════════════════════════ */}
      <section
        id="about"
        className="w-full bg-[#FAF9F5] py-16 sm:py-24 text-[#121418] border-b border-[#E5E5DF] scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Rich Corporate Narrative */}
            <div className="lg:col-span-7 space-y-6">
              {/* Header */}
              <div className="flex items-center gap-3">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#121418]">
                  {aboutTitle}
                </h2>
                <span className="w-12 h-1.5 bg-[#FACC15] rounded-full inline-block" />
              </div>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg font-bold text-[#121418] leading-snug">
                Engineering Dominant Search Visibility &amp; Modern Digital Platforms in the Sultanate of Oman.
              </p>

              {/* Story Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-[#525763] leading-relaxed">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* 3 Core Agency Pillars */}
              <div className="pt-4 border-t border-[#E5E5DF] grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FACC15]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck size={17} className="text-[#B45309]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-[#121418]">Full Ownership</h4>
                    <p className="text-[11px] text-[#717682] mt-0.5">100% client-owned code &amp; domain</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FACC15]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Languages size={17} className="text-[#B45309]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-[#121418]">Bilingual Native</h4>
                    <p className="text-[11px] text-[#717682] mt-0.5">Arabic (RTL) &amp; English (LTR)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FACC15]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap size={17} className="text-[#B45309]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-[#121418]">Sub-1.5s Speed</h4>
                    <p className="text-[11px] text-[#717682] mt-0.5">Fast on Omantel &amp; Ooredoo 5G</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Corporate Profile & Verified Credentials Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#E2E4E9] rounded-3xl p-7 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-5 border-b border-[#F0F0EB]">
                  <div className="w-11 h-11 rounded-2xl bg-[#121418] text-[#FACC15] flex items-center justify-center font-black text-lg">
                    PX
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#121418] leading-tight">
                      Pixel Business Solutions LLC
                    </h3>
                    <p className="text-xs text-[#717682] font-medium">
                      Muscat, Sultanate of Oman
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-[#525763]">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={15} className="text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#121418] block font-bold">Headquarters:</strong>
                      <span>Muscat, Sultanate of Oman &bull; Serving Seeb, Bawshar, Sohar, Salalah &amp; GCC</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Building2 size={15} className="text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#121418] block font-bold">Core Practice:</strong>
                      <span>Local SEO, Next.js Web Engineering, AI Visibility (GEO), Paid Ads &amp; Digital QR Menus</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone size={15} className="text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#121418] block font-bold">Direct Line:</strong>
                      <a href="tel:+96896935606" className="text-[#121418] hover:text-[#D97706] font-semibold">
                        +968 9693 5606
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail size={15} className="text-[#D97706] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#121418] block font-bold">Official Inquiries:</strong>
                      <a href="mailto:contact@pixelbusiness.si" className="text-[#121418] hover:text-[#D97706] font-semibold">
                        contact@pixelbusiness.si
                      </a>
                    </div>
                  </div>
                </div>

                {/* Verified Checklist */}
                <div className="pt-4 border-t border-[#F0F0EB] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#121418]">
                    <CheckCircle2 size={14} className="text-[#16A34A]" />
                    <span>Oman-registered corporate entity</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#121418]">
                    <CheckCircle2 size={14} className="text-[#16A34A]" />
                    <span>Transparent OMR pricing &amp; VAT-ready invoices</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#121418]">
                    <CheckCircle2 size={14} className="text-[#16A34A]" />
                    <span>Direct WhatsApp collaboration with engineering team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — Why Pixel  (white background)
          ════════════════════════════════════════════ */}
      <section
        className="w-full bg-white py-16 sm:py-24 text-[#121418] border-b border-[#E5E5DF]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="flex items-center gap-3 mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#121418]">
              {whyTitle}
            </h2>
            <span className="w-12 h-1.5 bg-[#FACC15] rounded-full inline-block" />
          </div>

          {/* Reason Cards — 2-column grid on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-[#FAF9F5] border border-[#E2E4E9] rounded-2xl p-6 sm:p-7 hover:border-[#FACC15] hover:shadow-md transition-all duration-200 group"
              >
                {/* Number badge */}
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#FACC15] text-[#121418] flex items-center justify-center font-black text-sm shadow-xs group-hover:scale-105 transition-transform">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3 className="font-bold text-base sm:text-lg text-[#121418] mb-1.5">
                    {reason.title}
                  </h3>
                  {reason.description && (
                    <p className="text-xs sm:text-sm text-[#525763] leading-relaxed">
                      {reason.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
