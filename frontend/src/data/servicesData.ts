export interface ServiceItem {
  id: string;
  title: string;
  subtext?: string;
  introPlaceholder: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  category: string;
  features: string[];
  illustrationType:
    | "local-seo"
    | "seo"
    | "ai-search"
    | "website"
    | "custom-software"
    | "social-media"
    | "ads"
    | "graphic-video"
    | "qr-menus";
  bannerImage?: string;
  bannerVideo?: string;
  mediaType?: "illustration" | "image" | "video";
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "local-seo-gbp",
    title: "Local SEO & GBP",
    introPlaceholder: "Service introduction placeholder.",
    shortDesc: "Short service description placeholder.",
    fullDesc:
      "Optimize your Google Business Profile and local search visibility for customers across Muscat and the Sultanate of Oman. Drive high-intent footfall, calls, and map navigation directly to your business.",
    iconName: "MapPin",
    category: "Local Search & Maps",
    illustrationType: "local-seo",
    features: [
      "Google Business Profile setup, claim & verification support",
      "Oman local directory citations & address consistency",
      "Geo-targeted keyword & category optimization for Muscat",
      "Customer review generation strategy & professional responses",
      "Local Map Pack rank tracking & transparent monthly reporting",
    ],
  },
  {
    id: "seo",
    title: "SEO",
    introPlaceholder: "Service introduction placeholder.",
    shortDesc: "Short service description placeholder.",
    fullDesc:
      "Improve your website's organic structure, search engine indexing, and content around high-intent queries that matter to your business in Oman and the GCC.",
    iconName: "Search",
    category: "Organic Search Optimization",
    illustrationType: "seo",
    features: [
      "Comprehensive technical website crawl & speed audit",
      "Commercial Oman & regional keyword search intent mapping",
      "On-page content optimization, titles, headers & metadata",
      "Internal linking architecture & structured schema",
      "Google Search Console & Google Analytics 4 performance monitoring",
    ],
  },
  {
    id: "ai-search-visibility",
    title: "AI Search Visibility",
    subtext: "AISO / AEO / GEO",
    introPlaceholder: "Service introduction placeholder.",
    shortDesc: "Short service description placeholder.",
    fullDesc:
      "Position your brand as an authoritative, cited entity across AI answer engines including ChatGPT, Google AI Overviews, Perplexity, and Microsoft Copilot.",
    iconName: "Cpu",
    category: "AI Discovery & Generative Engine Optimization",
    illustrationType: "ai-search",
    features: [
      "Entity authority mapping for AI model retrieval and citation",
      "Structured data & Schema.org JSON-LD semantic optimization",
      "Direct question-and-answer knowledge base structuring",
      "Digital footprint & brand citation alignment across authoritative sources",
      "AI engine query tracking & referral traffic observation",
    ],
  },
  {
    id: "website-design-development",
    title: "Website Design & Development",
    introPlaceholder: "Service introduction placeholder.",
    shortDesc: "Short service description placeholder.",
    fullDesc:
      "Give customers a fast, modern, mobile-friendly destination to understand your business and enquire. Built with clean code, lightning performance, and conversion focus.",
    iconName: "Monitor",
    category: "Web & Digital",
    illustrationType: "website",
    features: [
      "Mobile-first responsive UX/UI crafted for your target audience",
      "Fast page load speeds & modern accessibility standards",
      "Conversion-focused layouts with clear click-to-call actions",
      "Bilingual Arabic and English design preparation",
      "100% full ownership of source code, domain, and hosting accounts",
    ],
  },
  {
    id: "custom-software-web-apps",
    title: "Custom Software & Web Apps",
    introPlaceholder: "Service introduction placeholder.",
    shortDesc: "Short service description placeholder.",
    fullDesc:
      "Develop bespoke digital solutions, internal portals, client dashboards, and custom web applications tailored to solve unique business operational bottlenecks.",
    iconName: "Layers",
    category: "Custom Software Engineering",
    illustrationType: "custom-software",
    features: [
      "Modern fullstack web application engineering (React, Python, Node)",
      "Secure authentication, permissions & multi-tenant architecture",
      "Custom RESTful APIs & database optimization",
      "Automated operational workflows & CRM integrations",
      "Reliable cloud deployment with data backup and high uptime",
    ],
  },
  {
    id: "social-media-content",
    title: "Social Media & Content",
    introPlaceholder: "Service introduction placeholder.",
    shortDesc: "Short service description placeholder.",
    fullDesc:
      "Build a consistent, engaging brand presence with tailored creative assets, video reels, and copywriting that reflect your brand identity and answer customer questions.",
    iconName: "MessageSquare",
    category: "Social Media & Marketing",
    illustrationType: "social-media",
    features: [
      "Monthly content calendar aligned with local events & business goals",
      "Bilingual Arabic & English copywriting and captions",
      "High-impact graphic design & visual carousel creatives",
      "Community management & audience interaction guidelines",
      "Transparent monthly reporting on growth, reach, and engagement",
    ],
  },
  {
    id: "google-meta-ads",
    title: "Google & Meta Ads",
    introPlaceholder: "Service introduction placeholder.",
    shortDesc: "Short service description placeholder.",
    fullDesc:
      "Reach prospective buyers actively looking for your products or services in Oman with precision-targeted campaigns across Google Search, Instagram, and Facebook.",
    iconName: "Megaphone",
    category: "Paid Advertising & Performance Marketing",
    illustrationType: "ads",
    features: [
      "Hyper-local demographic and interest-based audience targeting",
      "Google Search, Display & YouTube video ad management",
      "Meta (Instagram & Facebook) lead generation funnels",
      "Conversion tracking, Meta Pixel & conversion API integration",
      "Continuous A/B ad creative testing and cost-per-lead optimization",
    ],
  },
  {
    id: "graphic-design-ai-video",
    title: "Graphic Design & AI Video",
    introPlaceholder: "Service introduction placeholder.",
    shortDesc: "Short service description placeholder.",
    fullDesc:
      "Elevate your brand aesthetic with professional graphic design, corporate identity collaterals, and AI-accelerated short-form video reels that capture audience attention.",
    iconName: "Film",
    category: "Creative Media & Design",
    illustrationType: "graphic-video",
    features: [
      "Brand identity kits, vector logos, color systems & typography",
      "Corporate presentation decks, brochures & digital flyers",
      "AI-assisted promotional video generation & dynamic animations",
      "High-resolution exports for print and digital publication",
      "Fast turnaround on marketing collaterals and event materials",
    ],
  },
  {
    id: "digital-catalogues-menus-qr",
    title: "Digital Catalogues, Menus & QR",
    introPlaceholder: "Service introduction placeholder.",
    shortDesc: "Short service description placeholder.",
    fullDesc:
      "Provide guests and customers with instant, touchless smartphone access to your restaurant menu or retail catalogue via custom branded QR codes.",
    iconName: "QrCode",
    category: "Hospitality & Retail Solutions",
    illustrationType: "qr-menus",
    features: [
      "Instant mobile browsing with zero app installation required",
      "Clear item categorisation, dish photos, descriptions & OMR prices",
      "Optional dietary filters, allergen badges & bilingual menus",
      "Print-ready QR stand assets with direct link fallback",
      "Simple update process for managing daily specials and seasonal prices",
    ],
  },
];

export function mapBackendServiceToItem(s: {
  id: string;
  title: string;
  category: string;
  description: string;
  iconName: string;
  startingPrice?: number;
  features: string[];
  isVisible?: boolean;
  deliveryTime?: string;
  bannerImage?: string;
  bannerVideo?: string;
  mediaType?: "illustration" | "image" | "video";
}): ServiceItem {
  const titleLower = s.title.toLowerCase();

  // Determine illustration type based on title or category
  let illustrationType: ServiceItem["illustrationType"] = "website";
  if (
    titleLower.includes("local seo") ||
    titleLower.includes("gbp") ||
    titleLower.includes("google business profile")
  ) {
    illustrationType = "local-seo";
  } else if (titleLower.includes("ai search") || titleLower.includes("aiso") || titleLower.includes("geo") || titleLower.includes("aeo")) {
    illustrationType = "ai-search";
  } else if (titleLower.includes("seo")) {
    illustrationType = "seo";
  } else if (titleLower.includes("website") || titleLower.includes("web design") || titleLower.includes("development")) {
    illustrationType = "website";
  } else if (titleLower.includes("custom software") || titleLower.includes("web app") || titleLower.includes("app")) {
    illustrationType = "custom-software";
  } else if (titleLower.includes("social") || titleLower.includes("content")) {
    illustrationType = "social-media";
  } else if (titleLower.includes("ads") || titleLower.includes("ad") || titleLower.includes("google & meta")) {
    illustrationType = "ads";
  } else if (titleLower.includes("graphic") || titleLower.includes("video") || titleLower.includes("design")) {
    illustrationType = "graphic-video";
  } else if (titleLower.includes("qr") || titleLower.includes("menu") || titleLower.includes("catalogue")) {
    illustrationType = "qr-menus";
  }

  // Find if pre-defined default item exists for baseline content
  const matched = SERVICES_DATA.find(
    (item) => item.title.toLowerCase() === titleLower || item.id === s.id
  );

  return {
    id: s.id,
    title: s.title,
    subtext:
      matched?.subtext ||
      (titleLower.includes("ai search") ? "AISO / AEO / GEO" : undefined),
    introPlaceholder: matched?.introPlaceholder || "Service introduction placeholder.",
    shortDesc: s.description || matched?.shortDesc || "Short service description placeholder.",
    fullDesc: s.description || matched?.fullDesc || s.title,
    iconName: s.iconName || matched?.iconName || "Monitor",
    category: s.category || matched?.category || "Service",
    features: s.features && s.features.length > 0 ? s.features : (matched?.features || []),
    illustrationType: matched?.illustrationType || illustrationType,
    bannerImage: s.bannerImage || matched?.bannerImage,
    bannerVideo: s.bannerVideo || matched?.bannerVideo,
    mediaType: s.mediaType || matched?.mediaType || "illustration",
  };
}

