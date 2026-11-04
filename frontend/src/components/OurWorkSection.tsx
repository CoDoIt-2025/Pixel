import React, { useState } from "react";
import { ArrowUpRight, Building2 } from "lucide-react";

const FEATURED_CASE_STUDIES = [
  {
    id: "cs-1",
    code: "PRJ-001",
    client: "Muscat Grand Mall Hospitality",
    title: "Bilingual Digital QR Catalogue & Interactive Experience",
    category: "Hospitality & Retail",
    metric: "< 0.4s",
    metricLabel: "Instant Mobile Load Time",
    description:
      "Engineered a zero-app-install interactive bilingual digital menu and boutique catalogue across 40+ dining & retail venues in Muscat, featuring real-time OMR pricing and direct WhatsApp ordering.",
    tags: ["Digital QR Menu", "Next.js", "Bilingual Arabic/English", "Muscat"],
  },
  {
    id: "cs-2",
    code: "PRJ-002",
    client: "Al Noor Specialized Clinic",
    title: "Local SEO 3-Pack Dominance & Google Business Optimization",
    category: "Local SEO & GBP",
    metric: "+210%",
    metricLabel: "Verified Phone Inquiries",
    description:
      "Transformed local Google Map visibility across Seeb, Bawshar, and Qurum. Achieved consistent Top-3 Google Map Pack positions for 35+ high-intent dental and aesthetic search queries.",
    tags: ["Google Maps Pack", "Geo-Grid Tracking", "Review Acceleration", "Oman"],
  },
  {
    id: "cs-3",
    code: "PRJ-003",
    client: "Oman Logistics & Freight LLC",
    title: "Bespoke Operations Portal & Client Quotation System",
    category: "Custom Software",
    metric: "99.9%",
    metricLabel: "Cloud Uptime & Zero Downtime",
    description:
      "Engineered an automated role-based cloud dispatch and digital consignment tracking portal, eliminating manual Excel paperwork and integrating local Oman payment gateways.",
    tags: ["FastAPI Backend", "React Dashboard", "Oman Gateway", "Cloud RBAC"],
  },
  {
    id: "cs-4",
    code: "PRJ-004",
    client: "Horizon Commercial Properties",
    title: "High-Performance Next.js Corporate Platform & SEO",
    category: "Web Engineering",
    metric: "98/100",
    metricLabel: "Google Core Web Vitals Score",
    description:
      "Designed and launched an ultra-fast corporate real estate portal in Muscat, with native Arabic RTL mirroring, interactive floorplans, and sub-1.5s mobile speed on Omantel 5G.",
    tags: ["Next.js / Tailwind", "Corporate Identity", "RTL Arabic", "Muscat"],
  },
  {
    id: "cs-5",
    code: "PRJ-005",
    client: "Dhofar Consumer Goods Trading",
    title: "High-ROAS Meta & Google Search Lead Funnels",
    category: "Performance Ads",
    metric: "4.6x",
    metricLabel: "Return on Ad Spend (ROAS)",
    description:
      "Deployed precision hyper-local geo-targeted search and Instagram advertising across Muscat, Sohar, and Salalah with server-side CAPI tracking, reducing cost per inquiry by 42%.",
    tags: ["Google Search Ads", "Meta CAPI Tracking", "Hyper-Local Oman", "ROAS"],
  },
  {
    id: "cs-6",
    code: "PRJ-006",
    client: "Al Mawaleh Hospitality & Suites",
    title: "Brand Identity, Presentation Collateral & AI Video",
    category: "Creative Media",
    metric: "4K 60fps",
    metricLabel: "AI-Accelerated Media",
    description:
      "Created luxury corporate branding guidelines, print-ready marketing collaterals, and AI-accelerated short-form promotional reels that generated over 350,000 views across the GCC.",
    tags: ["Brand Book", "AI Video Reels", "Print Collaterals", "Hospitality"],
  },
];

export const OurWorkSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const projects = FEATURED_CASE_STUDIES;

  const categories = [
    "All",
    "Local SEO & GBP",
    "Web Engineering",
    "Custom Software",
    "Hospitality & Retail",
    "Performance Ads",
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="our-work"
      className="w-full bg-[#121418] text-white py-14 sm:py-20 border-b border-[#242831] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#242831]">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Our Work & Case Studies
              </h2>
              <span className="w-10 sm:w-14 h-1 sm:h-1.5 bg-[#FACC15] rounded-full inline-block" />
            </div>
            <p className="mt-2 text-xs sm:text-sm text-[#9CA3AF] max-w-xl">
              Proven digital outcomes engineered for businesses across Muscat and the Sultanate of Oman.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? "bg-[#FACC15] text-[#121418] shadow-sm"
                    : "bg-[#1E2128] text-[#9CA3AF] hover:text-white border border-[#2B2F3A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              className="bg-[#181B22] border border-[#2B303C] hover:border-[#FACC15] rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-[#FACC15]/5"
            >
              <div>
                {/* Top Badge & Metric */}
                <div className="flex items-center justify-between pb-4 border-b border-[#242831] mb-4">
                  <div className="flex items-center gap-1.5">
                    <Building2 size={14} className="text-[#FACC15]" />
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                      {item.client}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-black text-[#FACC15]">
                      {item.metric}
                    </div>
                    <div className="text-[9px] text-[#9CA3AF] font-medium">
                      {item.metricLabel}
                    </div>
                  </div>
                </div>

                {/* Project Title */}
                <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-[#FACC15] transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-2.5 text-xs text-[#9CA3AF] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Tags & Action */}
              <div className="pt-5 mt-5 border-t border-[#242831]">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#121418] text-[#A1A5B0] border border-[#2B2F3A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#audit-request"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FACC15] hover:text-[#E5B532] transition-colors"
                >
                  <span>Request Similar Project Proposal</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

