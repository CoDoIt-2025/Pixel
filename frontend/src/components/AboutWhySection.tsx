import React from "react";

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
  aboutText = "Pixel Business Solutions LLC is a Muscat-based digital agency committed to helping businesses in Oman establish a dominant online presence. We bridge technical precision with practical execution — from local search and AI visibility to high-converting websites and digital solutions.",
  whyTitle = "Why Pixel",
  whyReasons,
}) => {
  const defaultReasons: WhyReason[] = [
    {
      title: "Reason one",
      description:
        "Oman-first market expertise tailored for local search, customer behavior, and verified map presence.",
    },
    {
      title: "Reason two",
      description:
        "End-to-end digital capabilities under one roof — website engineering, SEO, AI search visibility, and paid media.",
    },
    {
      title: "Reason three",
      description:
        "Measurable business growth, direct communication, and 100% full client ownership of all digital assets.",
    },
  ];

  const reasons = whyReasons && whyReasons.length > 0 ? whyReasons : defaultReasons;

  // Split aboutText by double newlines or render clean paragraphs
  const paragraphs = aboutText
    ? aboutText.split("\n\n").filter(Boolean)
    : [
        "Pixel Business Solutions LLC is a Muscat-based digital agency committed to helping businesses in Oman establish a dominant online presence. We bridge technical precision with practical execution — from local search and AI visibility to high-converting websites and digital solutions.",
      ];

  return (
    <section id="about" className="w-full bg-[#FAF9F5] py-12 sm:py-16 text-[#121418] border-b border-[#E5E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: About Pixel */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#121418]">
                {aboutTitle}
              </h2>
              <span className="w-10 sm:w-14 h-1 sm:h-1.5 bg-[#FACC15] rounded-full inline-block" />
            </div>

            {/* Authentic Brand Narrative for Oman (Loaded dynamically from admin/backend) */}
            <div className="space-y-3 max-w-lg">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-sm sm:text-base text-[#525763] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: Why Pixel */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#121418]">
                {whyTitle}
              </h2>
              <span className="w-10 sm:w-14 h-1 sm:h-1.5 bg-[#FACC15] rounded-full inline-block" />
            </div>

            {/* Yellow Bullet Points matching Image (Loaded dynamically from admin/backend) */}
            <div className="space-y-4 pt-1">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FACC15] mt-1.5 shrink-0 shadow-xs" />
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#121418]">
                      {reason.title}
                    </h3>
                    {reason.description && (
                      <p className="text-xs sm:text-sm text-[#525763] mt-0.5 leading-relaxed">
                        {reason.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
