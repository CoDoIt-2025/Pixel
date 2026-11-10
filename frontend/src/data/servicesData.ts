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
  showInBanner?: boolean;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "google-business-profile-local-seo",
    title: "Google Business Profile & Local SEO",
    subtext: "Google Maps & 3-Pack Dominance",
    introPlaceholder: "Dominate Google Maps & Capture High-Intent Local Customers Across Muscat & Oman.",
    shortDesc:
      "Optimize your Google Business Profile and local search visibility for customers across Muscat and Oman. Drive high-intent footfall, calls, and map navigation directly to your business.",
    fullDesc:
      "Optimize your Google Business Profile and local search visibility for customers across Muscat and the Sultanate of Oman. Drive high-intent footfall, calls, and map navigation directly to your business.",
    iconName: "MapPin",
    category: "Local Search & Maps",
    illustrationType: "local-seo",
    bannerImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&auto=format&fit=crop&q=80",
    mediaType: "image",
    showInBanner: true,
    features: [
      "Google Business Profile setup, claim & official video verification",
      "Oman local directory citations & 100% NAP consistency",
      "Geo-targeted keyword & category optimization for Muscat districts",
      "Customer review acceleration strategy & professional responses",
      "Local 3-Pack rank tracking & transparent monthly reporting",
    ],
  },
  {
    id: "website-design-development",
    title: "Website Design & Development",
    subtext: "High-Speed Next.js Platforms",
    introPlaceholder: "Custom corporate web engineering crafted for speed, trust, and conversions.",
    shortDesc:
      "Give customers a fast, modern, mobile-friendly destination to understand your business and enquire. Built with clean code, lightning performance, and conversion focus.",
    fullDesc:
      "Give customers a fast, modern, mobile-friendly destination to understand your business and enquire. Built with clean code, lightning performance, and conversion focus.",
    iconName: "Monitor",
    category: "Web & Digital Engineering",
    illustrationType: "website",
    bannerImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=80",
    mediaType: "image",
    showInBanner: true,
    features: [
      "Mobile-first responsive UX/UI crafted for Oman & GCC audiences",
      "Sub-1.5s mobile load speeds on Omantel, Ooredoo & Vodafone 5G",
      "Conversion-focused layouts with clear 1-click WhatsApp actions",
      "Bilingual Arabic (RTL) and English (LTR) native design",
      "100% full legal client ownership of code, domain, and accounts",
    ],
  },
  {
    id: "seo-ai-visibility",
    title: "SEO & AI Visibility",
    subtext: "AISO / AEO / GEO & Organic Search",
    introPlaceholder: "Position your brand as an authoritative, cited entity in Google and AI answer engines.",
    shortDesc:
      "Optimize your organic website structure for Google and position your brand as the primary cited entity across ChatGPT, Google AI Overviews, Perplexity, and Copilot.",
    fullDesc:
      "Optimize your organic website structure for Google and position your brand as the primary cited entity across ChatGPT, Google AI Overviews, Perplexity, and Copilot.",
    iconName: "Cpu",
    category: "Search & Generative AI Discovery",
    illustrationType: "ai-search",
    bannerImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1600&auto=format&fit=crop&q=80",
    mediaType: "image",
    showInBanner: true,
    features: [
      "Comprehensive technical website crawl, speed & core web vitals audit",
      "Entity authority mapping for ChatGPT, Perplexity & Google AI Overviews",
      "Structured data & Schema.org JSON-LD semantic optimization",
      "Commercial Oman & regional GCC search intent keyword architecture",
      "Direct Q&A knowledge base structuring for generative model retrieval",
    ],
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    subtext: "Content Calendars & Community",
    introPlaceholder: "Build a consistent, engaging brand presence across Instagram, LinkedIn, and TikTok.",
    shortDesc:
      "Build a consistent, engaging brand presence with tailored creative assets, video reels, and copywriting that reflect your brand identity and answer customer questions in Oman.",
    fullDesc:
      "Build a consistent, engaging brand presence with tailored creative assets, video reels, and copywriting that reflect your brand identity and answer customer questions in Oman.",
    iconName: "MessageSquare",
    category: "Social Media & Brand Growth",
    illustrationType: "social-media",
    bannerImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&auto=format&fit=crop&q=80",
    mediaType: "image",
    showInBanner: true,
    features: [
      "Monthly content calendar aligned with local Oman events & holidays",
      "Bilingual Arabic & English copywriting, captions & tone of voice",
      "High-impact graphic design carousels & visual story collaterals",
      "Active community management & audience inquiry routing",
      "Transparent monthly reporting on growth, reach, and engagement",
    ],
  },
  {
    id: "digital-advertising",
    title: "Digital Advertising",
    subtext: "Google & Meta Paid Campaigns",
    introPlaceholder: "Precision-targeted campaigns driving qualified inquiries and measurable ROAS.",
    shortDesc:
      "Reach prospective buyers actively looking for your products or services in Oman with precision-targeted campaigns across Google Search, Instagram, and Facebook.",
    fullDesc:
      "Reach prospective buyers actively looking for your products or services in Oman with precision-targeted campaigns across Google Search, Instagram, and Facebook.",
    iconName: "Megaphone",
    category: "Paid Media & Performance Funnels",
    illustrationType: "ads",
    bannerImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80",
    mediaType: "image",
    showInBanner: true,
    features: [
      "Hyper-local demographic and interest-based audience targeting in Oman",
      "Google Search, YouTube video ads & high-intent search campaign management",
      "Meta (Instagram & Facebook) lead generation funnels with instant forms",
      "Conversion tracking, Meta Pixel & server-side Conversion API (CAPI)",
      "Continuous A/B ad creative testing and cost-per-lead reduction",
    ],
  },
  {
    id: "creative-content",
    title: "Creative Content",
    subtext: "Graphic Design & AI Video Reels",
    introPlaceholder: "Corporate brand collaterals and high-definition AI-assisted media production.",
    shortDesc:
      "Elevate your brand aesthetic with professional graphic design, corporate identity collaterals, and AI-accelerated short-form video reels that capture audience attention in Oman.",
    fullDesc:
      "Elevate your brand aesthetic with professional graphic design, corporate identity collaterals, and AI-accelerated short-form video reels that capture audience attention in Oman.",
    iconName: "Film",
    category: "Brand Identity & Media Production",
    illustrationType: "graphic-video",
    bannerImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&auto=format&fit=crop&q=80",
    mediaType: "image",
    showInBanner: true,
    features: [
      "Brand identity kits, vector logos, color systems & typography guidelines",
      "Corporate presentation decks, company profiles, brochures & digital flyers",
      "AI-assisted promotional video generation & dynamic 4K animations",
      "High-resolution exports optimized for digital platforms & commercial print",
      "Fast turnaround on marketing collaterals and corporate event materials",
    ],
  },
  {
    id: "business-tools",
    title: "Business Tools",
    subtext: "Custom Web Apps & Digital Portals",
    introPlaceholder: "Bespoke internal portals, client dashboards, and custom software systems.",
    shortDesc:
      "Develop bespoke digital solutions, internal portals, client dashboards, and custom software tailored to solve operational bottlenecks for businesses in Oman.",
    fullDesc:
      "Develop bespoke digital solutions, internal portals, client dashboards, and custom software tailored to solve operational bottlenecks for businesses in Oman.",
    iconName: "Layers",
    category: "Software & Operational Solutions",
    illustrationType: "custom-software",
    bannerImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&auto=format&fit=crop&q=80",
    mediaType: "image",
    showInBanner: true,
    features: [
      "Modern fullstack web application engineering (React, Next.js, Python)",
      "Secure authentication, permissions & multi-tenant architecture",
      "Bank Muscat & local Oman payment gateway integration with OMR invoicing",
      "Custom API connections, webhook sync, and CRM dispatching",
      "Reliable cloud deployment with data backup and high uptime guarantees",
    ],
  },
  {
    id: "digital-menu-qr-solutions",
    title: "Digital Menu & QR Solutions for Restaurants",
    subtext: "Touchless Smart Menus & Hospitality QR",
    introPlaceholder: "Interactive bilingual QR menus and digital catalogues for restaurants and cafes.",
    shortDesc:
      "Touchless interactive digital QR menus for restaurants, specialty cafés, and luxury hotels across Oman with instant updates, bilingual Arabic/English toggle, and OMR pricing.",
    fullDesc:
      "Touchless interactive digital QR menus for restaurants, specialty cafés, and luxury hotels across Oman with instant updates, bilingual Arabic/English toggle, and OMR pricing.",
    iconName: "QrCode",
    category: "Hospitality & Retail Systems",
    illustrationType: "qr-menus",
    bannerImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80",
    mediaType: "image",
    showInBanner: true,
    features: [
      "Sub-second camera scan with zero app installation required for guests",
      "Interactive bilingual Arabic and English menu presentation",
      "Instant price and availability updates via smartphone dashboard",
      "High-definition culinary photography, allergen tags & dietary badges",
      "Durable high-gloss table QR stands and counter displays",
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
  showInBanner?: boolean;
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
  } else if (titleLower.includes("ai") || titleLower.includes("aiso") || titleLower.includes("geo") || titleLower.includes("aeo") || titleLower.includes("seo")) {
    illustrationType = "ai-search";
  } else if (titleLower.includes("qr") || titleLower.includes("menu") || titleLower.includes("restaurant") || titleLower.includes("catalogue")) {
    illustrationType = "qr-menus";
  } else if (titleLower.includes("website") || titleLower.includes("web design") || titleLower.includes("development")) {
    illustrationType = "website";
  } else if (titleLower.includes("tool") || titleLower.includes("custom software") || titleLower.includes("web app") || titleLower.includes("app")) {
    illustrationType = "custom-software";
  } else if (titleLower.includes("social")) {
    illustrationType = "social-media";
  } else if (titleLower.includes("ad") || titleLower.includes("advertising")) {
    illustrationType = "ads";
  } else if (titleLower.includes("creative") || titleLower.includes("graphic") || titleLower.includes("video") || titleLower.includes("content")) {
    illustrationType = "graphic-video";
  }

  // Find if pre-defined default item exists for baseline content
  const matched = SERVICES_DATA.find(
    (item) => item.title.toLowerCase() === titleLower || item.id === s.id
  );

  return {
    id: s.id,
    title: s.title,
    subtext: matched?.subtext || (titleLower.includes("ai") ? "AISO / AEO / GEO" : undefined),
    introPlaceholder: matched?.introPlaceholder || "Service introduction placeholder.",
    shortDesc: s.description || matched?.shortDesc || "Short service description placeholder.",
    fullDesc: s.description || matched?.fullDesc || s.title,
    iconName: s.iconName || matched?.iconName || "Monitor",
    category: s.category || matched?.category || "Service",
    features: s.features && s.features.length > 0 ? s.features : (matched?.features || []),
    illustrationType: matched?.illustrationType || illustrationType,
    bannerImage: s.bannerImage || matched?.bannerImage,
    bannerVideo: s.bannerVideo || matched?.bannerVideo,
    mediaType: (s.mediaType as any) || matched?.mediaType || (s.bannerImage || matched?.bannerImage ? "image" : "illustration"),
    showInBanner: s.showInBanner !== false,
  };
}
