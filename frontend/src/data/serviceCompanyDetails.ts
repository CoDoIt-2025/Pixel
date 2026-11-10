export interface ServiceDeliverable {
  title: string;
  description: string;
  tag?: string;
}

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceMetric {
  label: string;
  value: string;
  subtext?: string;
}

export interface ServiceCompanyDetail {
  heroBadge: string;
  tagline: string;
  executiveSummary: string;
  whyOmanMatters: {
    title: string;
    description: string;
    points: string[];
  };
  metrics: ServiceMetric[];
  deliverables: ServiceDeliverable[];
  processSteps: ServiceProcessStep[];
  technologies: string[];
  idealFor: string[];
  faqs: ServiceFAQ[];
}

export const SERVICE_COMPANY_DETAILS: Record<string, ServiceCompanyDetail> = {
  "local-seo-gbp": {
    heroBadge: "Local Search & Google Maps • Muscat, Oman",
    tagline: "Dominate Google Maps & Capture High-Intent Local Customers Across Muscat & Oman",
    executiveSummary:
      "In the Sultanate of Oman, over 82% of smartphone users rely on Google Maps and localized 'near me' searches to select clinics, restaurants, retail stores, automotive centers, and professional service providers. At Pixel Business Solutions LLC, we engineer your Google Business Profile (GBP) and local citation ecosystem to secure top positions in the coveted Google 3-Pack across Muscat, Seeb, Bawshar, Muttrah, Salalah, and Sohar.",
    whyOmanMatters: {
      title: "Why Local Search Dominance is Critical for Oman Businesses",
      description:
        "The Omani consumer landscape is intensely mobile-first. When a prospective client searches for a service in Qurum, Al Khuwair, or Al Mouj, Google prioritizes proximity, prominence, and profile health over traditional websites. Without an actively managed, geocoded, bilingual Google Business Profile, your competitors win direct phone calls and navigation visits before prospective clients ever see your website.",
      points: [
        "76% of local mobile searches in Oman result in a phone call or physical visit within 24 hours.",
        "Bilingual Arabic and English listings are essential to capture both Omani citizens and expatriates.",
        "Verified Google Map reviews and geo-tagged visual assets build immediate consumer trust in Oman.",
      ],
    },
    metrics: [
      { label: "Target Ranking", value: "Top 3", subtext: "In Google Map Pack" },
      { label: "Avg. Call Increase", value: "+140%", subtext: "Within 90 days" },
      { label: "Profile Language", value: "Bilingual", subtext: "Arabic & English native" },
      { label: "Oman Coverage", value: "All Governorates", subtext: "Muscat to Dhofar" },
    ],
    deliverables: [
      {
        title: "Official Verification & Primary Profile Optimization",
        description:
          "Complete profile claim, Google postcard / video verification handling in Oman, primary and secondary category calibration, and keyword-rich commercial business descriptions in Arabic & English.",
        tag: "Foundation",
      },
      {
        title: "Geo-Grid Rank Tracking & Proximity Heatmaps",
        description:
          "Kilometer-by-kilometer visibility tracking across Muscat districts to measure exact ranking radius and systematically eliminate competitor strongholds.",
        tag: "Analytics",
      },
      {
        title: "Oman Local Citation Syndication & NAP Consistency",
        description:
          "Submissions to Oman Telecommunications directories, yellow pages, Apple Maps, Bing Places, and GCC business registries ensuring 100% Name, Address, and Phone accuracy.",
        tag: "Authority",
      },
      {
        title: "Customer Review Acceleration & Reputation System",
        description:
          "Custom branded QR tap cards, WhatsApp review request templates, and compliant automated review response protocols that turn satisfied clients into local ranking power.",
        tag: "Conversion",
      },
      {
        title: "Weekly Geo-Tagged Media & Google Updates",
        description:
          "High-definition photo uploads embedded with Oman EXIF GPS coordinates, weekly promotional updates, and product/service catalog maintenance inside Google Maps.",
        tag: "Engagement",
      },
      {
        title: "Spam & Duplicate Competitor Suppression",
        description:
          "Proactive monitoring and reporting of fake listings, keyword stuffing, and duplicate competitor profiles violating Google guidelines in your commercial zone.",
        tag: "Protection",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Comprehensive Audit & Geo-Grid Baseline",
        description:
          "We analyze your current Google Business Profile health, citation inconsistencies, competitor map positions, and review sentiment across Muscat.",
      },
      {
        step: "02",
        title: "Bilingual Optimization & Category Alignment",
        description:
          "We rewrite and structure your business profile, service menus, and attributes in Arabic and English, applying hyper-targeted local keyword anchors.",
      },
      {
        step: "03",
        title: "Citation Clean-up & Review System Launch",
        description:
          "We sync your business data across 40+ trusted GCC directories and equip your staff with frictionless review generation tools.",
      },
      {
        step: "04",
        title: "Continuous Geo-Posting & Rank Expansion",
        description:
          "We publish weekly geo-tagged updates, monitor competitor shifts, and deliver monthly executive KPI reports showing direct calls, clicks, and navigation requests.",
      },
    ],
    technologies: ["Google Business Profile API", "BrightLocal Geo-Grid", "Whitespark", "Google Search Console", "Schema LocalBusiness JSON-LD"],
    idealFor: [
      "Medical, Dental & Aesthetics Clinics",
      "Restaurants, Cafés & Hospitality Venues",
      "Law Firms & Corporate Financial Consultancies",
      "Automotive Dealerships & Service Centers",
      "Retail Showrooms & Home Furnishing Stores",
      "Contracting, Maintenance & Real Estate Brokers",
    ],
    faqs: [
      {
        question: "How long does it take to rank in the Google Map Pack in Muscat?",
        answer:
          "Initial visibility improvements and increased impressions typically emerge within 3 to 6 weeks. For high-competition sectors in prime Muscat districts (e.g., Al Khuwair, Seeb, Qurum), securing consistent Top-3 positions generally takes between 60 to 90 days of sustained optimization and review momentum.",
      },
      {
        question: "Do you optimize our Google Business Profile in Arabic as well as English?",
        answer:
          "Yes, absolutely. A significant portion of Omani citizens search in Arabic while expatriate residents search in English. We optimize all profile attributes, category names, services, and weekly Google posts natively in both languages to maximize total search reach.",
      },
      {
        question: "Who retains ownership of our Google Business Profile?",
        answer:
          "Your business retains 100% primary ownership at all times. Pixel Business Solutions is simply granted Agency/Manager access to execute optimizations. You never lose control of your profile, reviews, or historical data.",
      },
      {
        question: "Can you help remove fake or malicious 1-star reviews?",
        answer:
          "While Google does not allow manual deletion of genuine client opinions, we actively audit, flag, and escalate reviews that violate Google's Prohibited and Restricted Content policies (such as spam, hate speech, conflict of interest, or unverified bot attacks). Simultaneously, our review acceleration system dilutes isolated negative feedback with steady streams of verified 5-star reviews.",
      },
    ],
  },

  seo: {
    heroBadge: "Organic Search Optimization • Muscat, Oman & GCC",
    tagline: "Drive High-Intent Commercial Organic Traffic & Sustainable Search Dominance",
    executiveSummary:
      "Search Engine Optimization for modern businesses is not about vanity keyword rankings; it is about commercial revenue capture. Pixel Business Solutions LLC engineers technical, on-page, and authority architectures that position your website at the top of Google for queries that your highest-value clients in Oman and the GCC actually search for.",
    whyOmanMatters: {
      title: "Why SEO is an Unfair Competitive Advantage in Oman",
      description:
        "Many businesses in Oman rely entirely on expensive recurring pay-per-click ads that stop generating leads the minute daily ad spend runs out. Organic search in Oman remains an under-leveraged blue ocean in many B2B and consumer verticals. A technically sound, fast, and authoritative website compounds in value over time, capturing buyer intent 24/7 without per-click fees.",
      points: [
        "Organic listings receive 10x more total clicks than sponsored search ads in typical regional queries.",
        "Compounds your digital equity without recurring pay-per-click charges.",
        "Positions your company as the authoritative market leader in your sector.",
      ],
    },
    metrics: [
      { label: "Search Visibility", value: "#1 Page", subtext: "Primary Oman queries" },
      { label: "Cost Per Lead", value: "Decreasing", subtext: "Zero per-click cost" },
      { label: "Technical Score", value: "95+", subtext: "Google Core Web Vitals" },
      { label: "Reporting", value: "Monthly", subtext: "Executive KPI dashboard" },
    ],
    deliverables: [
      {
        title: "Deep Technical Crawl & Core Web Vitals Optimization",
        description:
          "Comprehensive diagnosis of crawl budget, indexation bottlenecks, JavaScript hydration issues, broken redirects, mobile responsiveness, and sub-2-second server response times.",
        tag: "Technical",
      },
      {
        title: "Commercial Oman & GCC Keyword Intent Mapping",
        description:
          "Detailed research identifying high-value transactional search terms utilized by procurement managers, corporate decision makers, and consumers across Oman and neighboring GCC markets.",
        tag: "Strategy",
      },
      {
        title: "On-Page Semantic & Content Architecture",
        description:
          "Complete optimization of title tags, meta descriptions, semantic header hierarchies (H1-H4), keyword density, image alt tags, and internal link routing.",
        tag: "On-Page",
      },
      {
        title: "Advanced Schema.org Structured Data Injection",
        description:
          "Implementation of JSON-LD schemas including Organization, Service, FAQPage, BreadcrumbList, and LocalBusiness for enhanced rich snippets in Google search results.",
        tag: "Semantic",
      },
      {
        title: "Bilingual Arabic & English Search Engineering",
        description:
          "Hreflang implementation, RTL layout compatibility, and native Arabic semantic search alignment catering to regional linguistic nuances.",
        tag: "Localization",
      },
      {
        title: "Google Search Console & GA4 Performance Dashboards",
        description:
          "Custom Looker Studio dashboards tracking organic keyword progression, impressions, click-through rates, and lead conversions without technical jargon.",
        tag: "Analytics",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Comprehensive Technical & Keyword Audit",
        description:
          "We crawl every page of your website to detect technical impediments, inspect current indexation status, and benchmark competitors in the Oman market.",
      },
      {
        step: "02",
        title: "Architecture & Semantic Optimization",
        description:
          "We restructure internal links, optimize on-page content, and deploy rich schema markup to make your site effortlessly interpretable by Google.",
      },
      {
        step: "03",
        title: "Content & Authority Expansion",
        description:
          "We produce high-value, intent-driven commercial service pages and pillar content that answer specific buyer inquiries in Oman.",
      },
      {
        step: "04",
        title: "Monitoring, Core Updates & Refinement",
        description:
          "We monitor Google search algorithm shifts, track keyword positioning, and continually optimize conversion pathways.",
      },
    ],
    technologies: ["Google Search Console", "Google Analytics 4", "Ahrefs", "Semrush", "Screaming Frog SEO Spider", "Schema.org"],
    idealFor: [
      "B2B Suppliers, Distributors & Trading Houses",
      "Oil & Gas, Engineering & Industrial Contractors",
      "Private Hospitals, Specialized Clinics & Diagnostics",
      "Universities, Private Schools & Training Institutes",
      "E-Commerce & High-Ticket Retailers",
      "Financial, Legal & Corporate Advisory Firms",
    ],
    faqs: [
      {
        question: "How long does organic SEO take to deliver measurable ROI in Oman?",
        answer:
          "Unlike saturated Western markets, the competitive landscape in Oman allows for faster ranking momentum. Noticeable organic impressions and keyword climb typically occur within 60 to 90 days. Solid, revenue-driving top-of-page positions for primary commercial terms generally mature within 4 to 6 months.",
      },
      {
        question: "Does our website need to be rebuilt for effective SEO?",
        answer:
          "Not necessarily. If your current website is built on WordPress, Shopify, Next.js, or custom code and has a clean structural foundation, we can optimize the existing codebase. If your website has severe legacy code issues or slow performance that obstructs Google indexing, we will provide a transparent recommendation.",
      },
      {
        question: "What is the difference between Local SEO and Organic SEO?",
        answer:
          "Local SEO focuses specifically on Google Maps and the localized 3-Pack based on geographical proximity in Muscat. Organic SEO targets the classic organic website results below the map pack, capturing regional, national, and international queries across Oman and the GCC.",
      },
      {
        question: "Do you guarantee #1 rankings on Google?",
        answer:
          "Google's official guidelines state that no agency can ethically guarantee a #1 ranking due to dynamic algorithm updates and competitor shifts. However, we guarantee strict adherence to Google Webmaster Guidelines, white-hat industry best practices, and transparent monthly performance reporting that consistently delivers top-tier rankings.",
      },
    ],
  },

  "ai-search-visibility": {
    heroBadge: "Generative Engine Optimization • AISO / AEO / GEO",
    tagline: "Be the Brand Recommended by ChatGPT, Google AI Overviews & Perplexity in Oman",
    executiveSummary:
      "Search is experiencing its most seismic evolution in 25 years. Tens of thousands of consumers, executives, and procurement teams in the Gulf region are bypassing standard search result links and directly asking conversational AI models: 'Who is the best corporate law firm in Muscat?' or 'Which logistics company in Oman handles cold storage?'. We engineer your brand's digital knowledge graph so LLMs cite, synthesize, and recommend your company first.",
    whyOmanMatters: {
      title: "The AI Discovery Revolution: Why Early Movers in Oman Win",
      description:
        "Large Language Models (ChatGPT, Google Gemini AI Overviews, Perplexity, Microsoft Copilot) rely on verified semantic entity relationships, structured knowledge graphs, and trusted citations. If your business is not properly indexed as an authoritative entity, AI answer engines will summarize and recommend your competitors. Establishing your entity authority now establishes a defensive moat that latecomers cannot quickly replicate.",
      points: [
        "Google AI Overviews are actively appearing in GCC search results above traditional organic links.",
        "B2B decision-makers increasingly use AI for vendor shortlisting and competitive benchmarking.",
        "Entity authority establishes permanent citation trust across AI training sets and live web retrievals.",
      ],
    },
    metrics: [
      { label: "Target Platforms", value: "ChatGPT, Gemini, Perplexity", subtext: "Multi-model citation" },
      { label: "Entity Authority", value: "Knowledge Graph", subtext: "Structured organization" },
      { label: "Schema Layer", value: "Semantic JSON-LD", subtext: "Deep entity markup" },
      { label: "Advantage", value: "First Mover", subtext: "In Oman & GCC" },
    ],
    deliverables: [
      {
        title: "AI Entity Authority Mapping & Knowledge Graph Structuring",
        description:
          "Establishing your business as an unambiguous recognized entity across Wikidata, industry registers, and semantic web indexes so LLMs clearly understand what you do, who leads your firm, and where you operate.",
        tag: "Entity",
      },
      {
        title: "Answer Engine Optimization (AEO) Content Re-engineering",
        description:
          "Formatting key corporate service pages with clear question-and-answer semantic constructs, bulleted authoritative data, and structured summaries specifically optimized for LLM RAG (Retrieval-Augmented Generation).",
        tag: "Content",
      },
      {
        title: "Deep Semantic JSON-LD Knowledge Layer",
        description:
          "Deployment of advanced Schema markup defining sameAs attributes, founder credentials, corporate affiliations, geographical coordinates, and service relationships.",
        tag: "Code",
      },
      {
        title: "Authoritative Digital Footprint Alignment",
        description:
          "Aligning brand mentions, executive biographies, press releases, and industry references across trusted Gulf repositories that LLMs scrape for live citation grounding.",
        tag: "Authority",
      },
      {
        title: "AI Engine Query Monitoring & Citation Auditing",
        description:
          "Regular prompting audits across ChatGPT Plus, Perplexity Pro, Google Gemini, and Claude to verify brand citation frequency, answer sentiment, and referral accuracy.",
        tag: "Audit",
      },
      {
        title: "Bilingual Knowledge Graph Architecture",
        description:
          "Ensuring semantic entity definitions are fully connected across both Arabic NLP models and English foundational models.",
        tag: "Bilingual",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "AI Footprint & Retrieval Audit",
        description:
          "We test dozens of industry prompts across ChatGPT, Perplexity, and Google Gemini to determine how AI currently perceives and cites your brand versus competitors.",
      },
      {
        step: "02",
        title: "Entity Authority Construction",
        description:
          "We build and connect your entity nodes across Wikidata, Google Knowledge Graph, and authoritative GCC corporate databases.",
      },
      {
        step: "03",
        title: "Semantic Content & Schema Deployment",
        description:
          "We inject deep structured data and restructure service pages into concise, authoritative RAG-optimized Q&A formats.",
      },
      {
        step: "04",
        title: "Citation Tracking & Multi-Model Refinement",
        description:
          "We track ongoing citation inclusions, refine semantic signals as LLMs release new versions, and report referral traffic growth.",
      },
    ],
    technologies: ["OpenAI ChatGPT", "Google Gemini / AI Overviews", "Perplexity AI", "Wikidata", "Schema.org Semantic Triples", "JSON-LD"],
    idealFor: [
      "Corporate Enterprise & Holding Groups",
      "Specialized Healthcare Facilities & Medical Groups",
      "Leading Law, Audit & Advisory Practices",
      "Luxury Real Estate Developers & Hospitality",
      "Tech Startups & B2B SaaS Providers in Oman",
    ],
    faqs: [
      {
        question: "What is the difference between SEO and AISO (AI Search Visibility)?",
        answer:
          "Traditional SEO focuses on ranking blue links on a search results page. AISO (AI Search Optimization / Generative Engine Optimization) optimizes your brand so that generative AI models (ChatGPT, Perplexity, Google AI Overviews) directly recommend your business as the authoritative answer within conversational summaries.",
      },
      {
        question: "Can an agency guarantee that ChatGPT or Perplexity will mention my brand?",
        answer:
          "Generative AI responses are probabilistic; no one controls OpenAI or Google's neural weights. However, AI models strictly prioritize entities with dense, verified knowledge graphs, unambiguous schema, and multiple corroborated citations across trusted sources. By engineering these exact signals, we dramatically increase the probability of your brand being the cited recommendation.",
      },
      {
        question: "Is this relevant for businesses operating in Oman today?",
        answer:
          "Extremely relevant. Google has already rolled out AI Overviews in the GCC region, and executives across Muscat utilize ChatGPT and Perplexity daily to research vendors, services, and market leaders. Getting ahead now gives you a massive first-mover advantage while competitors are still using 2018 marketing playbooks.",
      },
    ],
  },

  "website-design-development": {
    heroBadge: "Modern Web Engineering • Muscat, Oman",
    tagline: "Ultra-Fast, High-Converting Web Platforms Engineered for Oman's Leading Brands",
    executiveSummary:
      "Your website is the single most critical asset in your digital ecosystem. At Pixel Business Solutions LLC, we do not build generic template sites that look dated in six months. We engineer bespoke, mobile-first, blazing-fast web platforms built with cutting-edge frameworks (React, Next.js, Tailwind CSS) that establish immediate prestige, load in under 1.5 seconds on Oman telco networks, and convert visitors into qualified business inquiries.",
    whyOmanMatters: {
      title: "Why High-Performance Web Engineering Matters in Oman",
      description:
        "Over 80% of web traffic in Oman originates on mobile devices using Omantel, Ooredoo, and Vodafone 5G networks. Slow loading speeds, clumsy mobile menus, and poorly formatted Arabic typography cause over 60% of visitors to bounce immediately to your competitors. A bespoke, modern web application reflects corporate stability and drives tangible revenue.",
      points: [
        "Sub-2-second load times keep high-value mobile users engaged.",
        "Flawless bilingual Arabic (RTL) and English (LTR) design builds local credibility.",
        "100% full ownership of source code, hosting, and domains—no proprietary vendor lock-in.",
      ],
    },
    metrics: [
      { label: "Page Load Speed", value: "< 1.5s", subtext: "On 5G mobile networks" },
      { label: "Code Quality", value: "Production-Grade", subtext: "React / Next.js / Tailwind" },
      { label: "Language Support", value: "Bilingual", subtext: "Full RTL & LTR design" },
      { label: "Asset Ownership", value: "100%", subtext: "Full client ownership" },
    ],
    deliverables: [
      {
        title: "Bespoke UI/UX Design System in Figma",
        description:
          "Custom visual design aligned with your corporate branding guidelines, featuring responsive layouts, custom icon sets, typography hierarchies, and interactive prototypes prior to coding.",
        tag: "Design",
      },
      {
        title: "Ultra-Fast React & Next.js Frontend Architecture",
        description:
          "Handcrafted, modular code using modern frameworks ensuring zero bloat, instant page transitions, and smooth 60fps animations.",
        tag: "Engineering",
      },
      {
        title: "Bilingual Arabic & English Localization (RTL / LTR)",
        description:
          "Meticulous typography calibration using premium Arabic fonts and bidirectional CSS layout mirroring for a seamless native reading experience.",
        tag: "Localization",
      },
      {
        title: "Direct WhatsApp & Click-to-Call Conversion Funnels",
        description:
          "Frictionless lead capture mechanisms including direct Oman WhatsApp click-to-chat triggers, streamlined quote request forms, and click-to-call mobile buttons.",
        tag: "Conversion",
      },
      {
        title: "Built-In Technical SEO & Schema Foundations",
        description:
          "Comprehensive on-page technical optimization including metadata, OpenGraph social cards, XML sitemaps, robots.txt, and structured JSON-LD schema.",
        tag: "SEO",
      },
      {
        title: "Enterprise Cloud Hosting & SSL Setup",
        description:
          "Deployment to global edge CDN infrastructure (Cloudflare / Vercel / AWS) with complimentary SSL certificate, DDoS protection, and automated backups.",
        tag: "Infrastructure",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Discovery & Information Architecture",
        description:
          "We analyze your business objectives, target audience in Oman, competitor benchmarks, and structure the complete sitemap and content flow.",
      },
      {
        step: "02",
        title: "Interactive UI/UX Prototype in Figma",
        description:
          "We create high-fidelity design mockups for desktop and mobile, iterating until your leadership team approves every visual detail.",
      },
      {
        step: "03",
        title: "Fullstack Coding & Content Population",
        description:
          "We develop clean, tested code, optimize assets for extreme speed, configure bilingual Arabic/English layouts, and populate verified content.",
      },
      {
        step: "04",
        title: "Rigorous QA, Deployment & Training",
        description:
          "We test across iOS, Android, macOS, and Windows, deploy to secure cloud servers, configure analytics, and hand over complete master credentials.",
      },
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Vercel / Cloudflare Edge", "Figma"],
    idealFor: [
      "Established Corporate Enterprises & Groups",
      "Medical Centers & Specialized Clinics",
      "Luxury Real Estate & Hospitality Projects",
      "B2B Industrial, Logistics & Energy Services",
      "Professional Legal, Accounting & Consulting Practices",
    ],
    faqs: [
      {
        question: "How long does it take to design and launch a custom website?",
        answer:
          "A bespoke corporate website typically takes between 3 to 6 weeks from kickoff to live deployment, depending on the number of pages, custom features, and whether content copywriting is included.",
      },
      {
        question: "Will our team be able to update content, images, and blog posts easily?",
        answer:
          "Yes. We configure intuitive content management capabilities allowing your marketing team to edit text, publish articles, and update images without writing code.",
      },
      {
        question: "Do we own the domain, code, and hosting accounts?",
        answer:
          "100% yes. We do not hold client digital assets hostage. All domain names, source code repositories, and hosting accounts are registered under your business name.",
      },
      {
        question: "Can you integrate local Oman payment gateways like Bank Muscat or Thawani?",
        answer:
          "Yes, we have extensive experience integrating leading payment solutions in Oman including Bank Muscat PG, Thawani Pay, and international gateways such as Stripe and TAP.",
      },
    ],
  },

  "custom-software-web-apps": {
    heroBadge: "Custom Software Engineering • Muscat, Oman",
    tagline: "Tailor-Made Web Applications, Portals & Operational Digital Systems",
    executiveSummary:
      "Generic off-the-shelf software packages rarely accommodate the unique operational dynamics, compliance needs, and workflows of businesses in Oman. Pixel Business Solutions LLC architects, engineers, and maintains custom cloud software, internal staff portals, client dashboards, and automated workflow engines that save hundreds of hours of manual labor and scale seamlessly.",
    whyOmanMatters: {
      title: "Eliminate Operational Bottlenecks with Bespoke Software",
      description:
        "Many companies in Muscat still run critical operations on fractured spreadsheets, manual paper records, or rigid legacy systems that cannot integrate with local payment gateways or government requirements. Custom cloud applications centralize your operational data, enable role-based staff access, and provide executives with real-time financial and project insights.",
      points: [
        "Eliminate recurring per-user SaaS license fees with software you own permanently.",
        "Automate repetitive manual data entry, quotation generation, and invoicing.",
        "Secure, encrypted cloud storage complying with regional data privacy standards.",
      ],
    },
    metrics: [
      { label: "Uptime SLA", value: "99.9%", subtext: "High-availability cloud" },
      { label: "Architecture", value: "Fullstack", subtext: "Python FastAPI / React / Node" },
      { label: "Security", value: "RBAC & SSL", subtext: "Role-based permissions" },
      { label: "Integrations", value: "Custom APIs", subtext: "WhatsApp, ERP, Payments" },
    ],
    deliverables: [
      {
        title: "Bespoke Fullstack Web Application Architecture",
        description:
          "Engineered using enterprise-grade backends (FastAPI / Node.js) and intuitive frontends (React / Next.js) tailored precisely to your operational workflow.",
        tag: "Architecture",
      },
      {
        title: "Role-Based Access Control (RBAC) & Security",
        description:
          "Granular user permissions for administrators, department managers, field staff, and external clients with encrypted session handling.",
        tag: "Security",
      },
      {
        title: "Interactive Executive Analytics & Reporting Dashboards",
        description:
          "Real-time visual dashboards showing inventory turnover, project milestones, revenue metrics, and automated PDF export capabilities.",
        tag: "Dashboards",
      },
      {
        title: "Third-Party API & Oman Gateway Integrations",
        description:
          "Seamless connection to local payment gateways (Bank Muscat, Thawani), official WhatsApp Business API, SMS gateways, and existing ERP systems.",
        tag: "Integrations",
      },
      {
        title: "Automated Document & Invoice Generation",
        description:
          "Single-click generation of branded proposals, VAT-compliant invoices with QR codes, delivery notes, and digital contract signing.",
        tag: "Automation",
      },
      {
        title: "Continuous Cloud Deployment & Managed Backups",
        description:
          "Containerized Docker deployments on secure cloud infrastructure with daily automated database snapshots and 99.9% uptime monitoring.",
        tag: "DevOps",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Technical Discovery & Scope Specification",
        description:
          "We analyze your operational bottlenecks, map user journeys, design database entity relationships, and document complete functional specifications.",
      },
      {
        step: "02",
        title: "Wireframing & Interactive Prototype",
        description:
          "We prototype user interfaces and database workflows to validate every screen and button with your operational team before coding.",
      },
      {
        step: "03",
        title: "Iterative Agile Engineering & API Building",
        description:
          "We build frontend and backend components in bi-weekly sprints, conducting regular demonstration sessions to gather continuous feedback.",
      },
      {
        step: "04",
        title: "Testing, Data Migration & Team Training",
        description:
          "We run security audits, migrate existing spreadsheets/databases, train your staff, and provide continuous SLA maintenance.",
      },
    ],
    technologies: ["Python (FastAPI)", "React / Next.js", "PostgreSQL / SQLite", "Node.js", "Docker", "RESTful APIs", "AWS / DigitalOcean"],
    idealFor: [
      "Logistics, Freight & Fleet Management Companies",
      "Property Management & Real Estate Brokerages",
      "Healthcare Facilities with Appointment & Records Needs",
      "Wholesale Distributors & Inventory Warehouses",
      "Custom Quotation & Field Service Providers",
    ],
    faqs: [
      {
        question: "How do we decide between buying off-the-shelf software and building custom?",
        answer:
          "If your business has unique operational workflows, specialized pricing formulas, or compliance requirements that off-the-shelf software cannot handle without expensive workarounds, custom software pays for itself quickly. You own the software forever without recurring per-seat subscription licenses.",
      },
      {
        question: "Where will our business data be hosted?",
        answer:
          "We deploy your system to modern, enterprise-grade cloud servers (such as AWS, DigitalOcean, or regional Gulf data centers) with encrypted storage, automated daily backups, and strict security isolation.",
      },
      {
        question: "What happens after the software is launched?",
        answer:
          "We provide comprehensive warranty coverage post-launch, alongside ongoing maintenance, feature expansion, and technical support SLAs to ensure your software evolves alongside your business.",
      },
    ],
  },

  "social-media-content": {
    heroBadge: "Strategic Social Marketing • Muscat, Oman",
    tagline: "Authentic Storytelling & Content That Builds Brand Loyalty in Oman",
    executiveSummary:
      "Social media in the Sultanate of Oman is not about spamming generic promotional flyers. Omani consumers and corporate clients value authentic storytelling, high aesthetic production, cultural resonance, and responsive community dialogue. We create strategic, bilingual content calendars, cinematic short-form video reels, and high-impact carousels that elevate your brand reputation across Instagram, LinkedIn, and TikTok.",
    whyOmanMatters: {
      title: "Why Strategic Social Presence is Non-Negotiable in Oman",
      description:
        "Instagram and TikTok boast some of the highest per-capita daily usage rates in the world within the GCC region. Omani consumers actively research a brand's social profile before dining, booking medical appointments, or signing service agreements. An inactive or low-quality social feed immediately signals stagnation.",
      points: [
        "Instagram is the #1 discovery platform for lifestyle, medical, and dining brands in Oman.",
        "LinkedIn is the primary channel for B2B procurement, partnerships, and executive networking.",
        "Native bilingual Arabic copy creates cultural affinity and trust with local citizens.",
      ],
    },
    metrics: [
      { label: "Content Schedule", value: "Monthly", subtext: "Advance editorial calendar" },
      { label: "Formats", value: "Reels & Carousels", subtext: "High-engagement media" },
      { label: "Languages", value: "Bilingual", subtext: "Arabic & English native" },
      { label: "Reporting", value: "Detailed", subtext: "Reach, saves & inquiries" },
    ],
    deliverables: [
      {
        title: "Monthly Strategic Content Calendar",
        description:
          "Full editorial planning aligned with Omani national events, Islamic holidays, seasonal promotions, and core company milestones prepared and approved in advance.",
        tag: "Strategy",
      },
      {
        title: "High-End Visual Posts & Educational Carousels",
        description:
          "Custom graphic design following strict brand guidelines that educates prospective clients, addresses objections, and positions your leadership as industry experts.",
        tag: "Design",
      },
      {
        title: "Short-Form Video Production & Reels Direction",
        description:
          "High-definition video reels with trending audio, clean transitions, and crisp bilingual subtitle overlays optimized for Instagram Reels and TikTok algorithms.",
        tag: "Video",
      },
      {
        title: "Bilingual Arabic & English Copywriting",
        description:
          "Engaging captions written natively in authentic Arabic and polished English that speak to the cultural context of Oman.",
        tag: "Copywriting",
      },
      {
        title: "Community Engagement & Response Protocols",
        description:
          "Structured guidelines for handling customer inquiries, direct messages, and comments to convert social curiosity into phone calls and consultations.",
        tag: "Community",
      },
      {
        title: "Comprehensive Monthly Analytics & Growth Reports",
        description:
          "Detailed tracking of account reach, profile visits, follower demographics, top-performing creative assets, and lead attribution.",
        tag: "Analytics",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Brand Voice & Visual Aesthetic Audit",
        description:
          "We analyze your existing social presence, assess competitor benchmarks across Oman, and establish visual mood boards and tone-of-voice guidelines.",
      },
      {
        step: "02",
        title: "Monthly Content Calendar & Asset Production",
        description:
          "We develop the monthly calendar, script reels, design visual carousels, write bilingual captions, and submit all assets for your review.",
      },
      {
        step: "03",
        title: "Scheduled Publishing & Active Monitoring",
        description:
          "We publish at optimal engagement hours in Oman, actively monitor comment sentiment, and boost high-performing posts for maximum reach.",
      },
      {
        step: "04",
        title: "Performance Review & Strategy Iteration",
        description:
          "We analyze key metrics at month-end to double down on formats generating the highest inquiries and customer interactions.",
      },
    ],
    technologies: ["Instagram Professional", "LinkedIn Company Suite", "TikTok for Business", "Adobe Creative Cloud", "Meta Business Suite", "CapCut Pro"],
    idealFor: [
      "Premium Restaurants, Cafes & Culinary Brands",
      "Aesthetic, Dermatology & Specialized Medical Clinics",
      "Luxury Real Estate & Interior Design Studios",
      "Corporate Financial, Legal & HR Consultancies",
      "Automotive & Lifestyle Retail Showrooms",
    ],
    faqs: [
      {
        question: "Do you come on-site in Muscat to shoot photos and videos?",
        answer:
          "Yes, we organize dedicated on-site shooting sessions across Muscat to capture genuine behind-the-scenes footage, doctor/executive interviews, team highlights, and product showcases.",
      },
      {
        question: "Do we have to approve posts before they are published?",
        answer:
          "Always. We deliver the complete monthly content calendar with all graphics, video reels, and captions in advance. Nothing is published to your live accounts without your explicit sign-off.",
      },
      {
        question: "How do you measure social media success for our business?",
        answer:
          "While follower growth and likes are nice, we focus primarily on commercial metrics: profile visits, website clicks, direct message inquiries, WhatsApp click-throughs, and saves.",
      },
    ],
  },

  "google-meta-ads": {
    heroBadge: "Performance Advertising • Muscat, Oman & GCC",
    tagline: "Precision Paid Advertising Delivering High ROAS & Predictable Customer Acquisition",
    executiveSummary:
      "Stop wasting your marketing budget on randomized 'boosted posts' with zero attribution. Pixel Business Solutions LLC designs, deploys, and scales data-backed performance advertising campaigns across Google Search, Instagram, and Facebook that target qualified buyers in Oman at the exact moment they are ready to purchase.",
    whyOmanMatters: {
      title: "Why Structured Paid Media Wins in the Oman Market",
      description:
        "Digital ad costs in Oman remain favorable compared to neighboring GCC hubs like Dubai or Riyadh. However, without negative keyword filters, server-side conversion tracking, and localized Arabic ad creative, companies frequently burn through advertising budgets targeting non-buyers. We treat your advertising spend with the same rigor as an investment portfolio.",
      points: [
        "Google Search Ads capture customers with active commercial intent right now.",
        "Meta Ads (Instagram & Facebook) excel at high-converting lead forms and visual retargeting.",
        "Full conversion tracking ensures you know the exact cost per acquired customer.",
      ],
    },
    metrics: [
      { label: "Target ROAS", value: "3x – 6x", subtext: "Target return on ad spend" },
      { label: "Tracking Layer", value: "Server-Side", subtext: "Meta CAPI & GA4 Events" },
      { label: "Targeting", value: "Hyper-Local", subtext: "Muscat, Sohar, Salalah" },
      { label: "Creative Testing", value: "Continuous", subtext: "A/B copy & visuals" },
    ],
    deliverables: [
      {
        title: "High-Intent Google Search Ad Campaigns",
        description:
          "Targeting commercial search queries with exact and phrase match types, negative keyword scrubbers, and responsive search ads that maximize Quality Score and lower cost-per-click.",
        tag: "Google",
      },
      {
        title: "Meta (Instagram & Facebook) Lead Generation Funnels",
        description:
          "Native instant forms, WhatsApp direct click-to-chat campaigns, and custom landing page traffic funnels designed to generate qualified business inquiries.",
        tag: "Meta",
      },
      {
        title: "Hyper-Local Oman Geo-Fencing & Demographic Targeting",
        description:
          "Pinpoint targeting by governorate, affluent residential zones (Qurum, Al Mouj, Madinat Al Sultan Qaboos), interests, job titles, and device types.",
        tag: "Targeting",
      },
      {
        title: "Server-Side Conversions API & Meta Pixel Setup",
        description:
          "Flawless conversion tracking overcoming iOS privacy hurdles via Google Tag Manager Server-Side and Meta Conversions API (CAPI) for 100% data integrity.",
        tag: "Analytics",
      },
      {
        title: "High-Converting Creative Ad Assets & Arabic Copy",
        description:
          "Design of scroll-stopping carousel ads, video hooks, and culturally tuned Arabic and English ad copy that trigger immediate action.",
        tag: "Creative",
      },
      {
        title: "Weekly Optimization & Cost-Per-Lead Dashboards",
        description:
          "Continuous bidding optimization, budget reallocation toward top-performing ad sets, and weekly executive summaries of acquired leads.",
        tag: "Reporting",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Audience Profiling & Funnel Strategy",
        description:
          "We analyze your target customer demographics in Oman, define customer acquisition cost (CAC) goals, and choose the optimal advertising mix.",
      },
      {
        step: "02",
        title: "Tracking Infrastructure & Ad Creative Production",
        description:
          "We install the Meta Pixel, Conversions API, and Google Tag Manager, then design high-impact bilingual ad creatives and landing pages.",
      },
      {
        step: "03",
        title: "Campaign Launch & Multi-Variant A/B Testing",
        description:
          "We launch split tests across headlines, video hooks, and audience segments to identify winning creatives with the lowest cost per lead.",
      },
      {
        step: "04",
        title: "Budget Scaling & Negative Keyword Scrubbing",
        description:
          "We scale the budget on top-performing sets while actively filtering out irrelevant search terms to protect your investment.",
      },
    ],
    technologies: ["Google Ads", "Meta Ads Manager", "Google Tag Manager", "Conversions API (CAPI)", "Looker Studio", "Google Analytics 4"],
    idealFor: [
      "Clinics, Hospitals & Specialized Healthcare",
      "Real Estate Agencies & Developers",
      "B2B Equipment Suppliers, Logistics & Industrial",
      "Education, Universities & Training Providers",
      "Automotive Showrooms & Aftermarket Services",
    ],
    faqs: [
      {
        question: "How much should our business spend on monthly advertising in Oman?",
        answer:
          "We recommend starting with a minimum media spend of 150 to 300 OMR per month for local businesses to generate sufficient testing data and consistent lead flow. For larger campaigns across multiple regions in the GCC, budgets scale based on target customer acquisition volume.",
      },
      {
        question: "Do you pay the ad spend directly, or does it bill our corporate credit card?",
        answer:
          "All media spend is billed directly from Google Ads and Meta Ads to your company's corporate credit card. You maintain total transparency over every baiza spent, while we charge a transparent monthly campaign management fee.",
      },
      {
        question: "What is the difference between Google Ads and Meta (Instagram) Ads?",
        answer:
          "Google Ads captures active intent (people searching 'commercial law firm Muscat' right now). Meta Ads creates demand and captures passive interest by presenting compelling visual video offers to targeted demographics on Instagram and Facebook.",
      },
    ],
  },

  "graphic-design-ai-video": {
    heroBadge: "Visual Identity & Video Production • Muscat, Oman",
    tagline: "Compelling Corporate Aesthetics & Cutting-Edge AI Video That Stop the Scroll",
    executiveSummary:
      "Visual perception dictates trust. In a crowded marketplace, low-quality graphics or amateur video directly diminish your brand's authority. Pixel Business Solutions LLC bridges premier corporate graphic design with cutting-edge AI-accelerated video synthesis to deliver cohesive brand identities, executive presentation decks, and cinematic short-form video reels that command respect.",
    whyOmanMatters: {
      title: "Why High-Aesthetic Production Matters in the Sultanate",
      description:
        "Omani consumers and enterprise procurement officers gravitate toward brands that demonstrate prestige, modern sophistication, and cultural respect. Combining world-class graphic artistry with rapid AI video iteration allows businesses in Muscat to produce high-value marketing assets at a fraction of traditional production house timelines.",
      points: [
        "Elevates brand perception to compete with multinational enterprises.",
        "AI-accelerated video workflows deliver agency-grade reels in days rather than weeks.",
        "Print-ready vectors and digital master files for full versatility.",
      ],
    },
    metrics: [
      { label: "Turnaround Time", value: "3 – 5 Days", subtext: "For sprint deliverables" },
      { label: "Formats", value: "Vector & 4K", subtext: "Full print & digital sets" },
      { label: "Video Tech", value: "AI-Enhanced", subtext: "Motion & voice synthesis" },
      { label: "Revisions", value: "Included", subtext: "Until final satisfaction" },
    ],
    deliverables: [
      {
        title: "Comprehensive Corporate Brand Identity Systems",
        description:
          "Vector logos, corporate color palettes, bilingual typography guidelines, iconography, and comprehensive brand books for executive use.",
        tag: "Branding",
      },
      {
        title: "Executive Presentation Decks & Company Profiles",
        description:
          "Investor-grade pitch decks, corporate credentials brochures, and interactive PDF proposals designed to win institutional contracts.",
        tag: "Corporate",
      },
      {
        title: "AI-Accelerated Short-Form Video & Motion Graphics",
        description:
          "Engaging video reels leveraging generative AI for visual storyboarding, dynamic camera motions, and crisp bilingual subtitle overlays.",
        tag: "Video",
      },
      {
        title: "Marketing Collateral & Print-Ready Production Files",
        description:
          "Rollup banners, exhibition booth layouts, corporate business cards, letterheads, and vehicle wrap mockups ready for commercial printing in Muscat.",
        tag: "Print",
      },
      {
        title: "Packaging & Product Label Design",
        description:
          "Retail shelf-ready packaging design adhering to Ministry of Commerce, Industry and Investment Promotion (MOCIIP) labeling requirements.",
        tag: "Packaging",
      },
      {
        title: "Digital Advertising & Social Media Asset Kits",
        description:
          "Reusable social media template suites in Figma and Canva ensuring your internal team can produce on-brand graphics on the fly.",
        tag: "Templates",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Creative Brief & Moodboard Alignment",
        description:
          "We explore your brand positioning, study industry design benchmarks in the GCC, and establish clear aesthetic direction before starting.",
      },
      {
        step: "02",
        title: "Concept Development & Exploration",
        description:
          "Our senior designers and AI video artists produce multiple distinct visual concepts for your leadership to review and select.",
      },
      {
        step: "03",
        title: "Refinement & Polish",
        description:
          "We refine the chosen creative direction, perfecting typography kerning, color balances, sound design, and motion curves.",
      },
      {
        step: "04",
        title: "Master Asset Delivery & Style Guidelines",
        description:
          "We deliver fully layered source files (.AI, .PSD, .FIG, 4K MP4) along with clear guidelines for print and digital publishing.",
      },
    ],
    technologies: ["Adobe Illustrator", "Adobe Photoshop", "Adobe Premiere Pro", "Figma", "Runway Gen-3", "Midjourney Pro"],
    idealFor: [
      "New Ventures, Rebranding Enterprises & Holding Groups",
      "High-End Hospitality, Restaurants & Cafes",
      "Real Estate Developers & Architectural Practices",
      "Industrial Manufacturers & B2B Trading Companies",
      "Event Organizers & Exhibition Exhibitors",
    ],
    faqs: [
      {
        question: "Do you supply source files upon project completion?",
        answer:
          "Yes, unconditionally. You receive 100% full ownership along with all vector source files (.AI, .EPS, .SVG, .PDF), layered Photoshop documents, Figma workspace files, and high-resolution video exports.",
      },
      {
        question: "How do you integrate AI into your video and graphic design process?",
        answer:
          "We use generative AI to accelerate initial concept storyboarding, generate complex 3D visual environments, remove visual noise, and assist with cinematic motion graphics. Final creative direction, typography, and quality control are always meticulously executed by our senior design directors.",
      },
      {
        question: "Can you coordinate with local printing presses in Muscat?",
        answer:
          "Yes, we prepare all print files with standard commercial bleeds, CMYK color profiles, and vector paths, and we can directly liaise with your chosen print press in Muscat to ensure flawless output.",
      },
    ],
  },

  "digital-catalogues-menus-qr": {
    heroBadge: "Hospitality & Retail Digital Tech • Muscat, Oman",
    tagline: "Instant, Touchless Digital Menus & Product Catalogues for Oman Hospitality & Retail",
    executiveSummary:
      "Eliminate expensive reprinting costs, damaged paper menus, and clunky PDF downloads that take ages to open. Pixel Business Solutions LLC builds lightning-fast, mobile-optimized interactive digital menus and product catalogues accessed instantly via custom-branded QR codes. Guests browse vibrant dish photos, filter by dietary requirements, and view prices in OMR seamlessly without downloading an app.",
    whyOmanMatters: {
      title: "Elevate Guest Experience & Protect Your Margins in Oman",
      description:
        "Oman's vibrant hospitality and retail scene in Muscat, Salalah, and Nizwa caters to an international mix of citizens, GCC visitors, and tourists. An intuitive digital menu lets you update seasonal dish prices, mark items as 86'd (sold out) in real-time, and present high-resolution photography that increases average order value by up to 25%.",
      points: [
        "Loads in 0.5 seconds on any smartphone—zero app download required.",
        "Real-time instant price and menu item updating from any phone or laptop.",
        "Bilingual Arabic and English interface with dietary allergen badges.",
      ],
    },
    metrics: [
      { label: "Load Time", value: "< 0.5s", subtext: "Zero app download" },
      { label: "Order Lift", value: "+22%", subtext: "Higher average ticket" },
      { label: "Languages", value: "Bilingual", subtext: "Arabic & English native" },
      { label: "Updates", value: "Instant", subtext: "Real-time menu edits" },
    ],
    deliverables: [
      {
        title: "Mobile-First Interactive Digital Menu / Catalogue",
        description:
          "Ultra-smooth, responsive browsing experience featuring category tabs, dish photos, detailed ingredients, and OMR prices.",
        tag: "Digital",
      },
      {
        title: "Custom Branded QR Stand Artwork",
        description:
          "Print-ready artwork files for luxury acrylic table talkers, wooden blocks, metal tent cards, and window decals with durable vector QR codes.",
        tag: "Print",
      },
      {
        title: "Bilingual Arabic & English Language Switching",
        description:
          "Instant one-tap toggle between Arabic and English, allowing international tourists and local guests to read menus comfortably.",
        tag: "Localization",
      },
      {
        title: "Dietary Badges & Allergen Indicators",
        description:
          "Visual badges for Vegetarian, Vegan, Gluten-Free, Chef's Special, Spicy levels, and Halal certification to inspire diner confidence.",
        tag: "Experience",
      },
      {
        title: "Effortless Admin Dashboard for Real-Time Updates",
        description:
          "Simple web dashboard enabling your floor manager to toggle items off-menu, launch daily chef specials, or adjust prices in seconds.",
        tag: "Management",
      },
      {
        title: "Direct WhatsApp Order / Reservation Integration",
        description:
          "Optional direct WhatsApp button allowing customers to send orders, book tables, or request room service directly to your front desk.",
        tag: "Conversion",
      },
    ],
    processSteps: [
      {
        step: "01",
        title: "Menu & Item Categorization Setup",
        description:
          "We take your existing paper menu or product list, structure the categories, format bilingual titles, and organize high-resolution food photography.",
      },
      {
        step: "02",
        title: "Digital Platform Configuration",
        description:
          "We customize the digital menu styling to match your restaurant or boutique brand identity, including color palette and typography.",
      },
      {
        step: "03",
        title: "QR Code Generation & Table Stand Design",
        description:
          "We generate high-resolution QR codes linked to your permanent custom URL and design print-ready artwork for your physical venue.",
      },
      {
        step: "04",
        title: "Staff Handover & Live Deployment",
        description:
          "We train your manager on how to update daily prices, test scanning across multiple smartphones, and ensure flawless live operation.",
      },
    ],
    technologies: ["React Progressive Web App", "High-Speed CDN", "QR Engine", "Cloud Database", "WhatsApp Direct API"],
    idealFor: [
      "Fine Dining Restaurants & Casual Bistros",
      "Specialty Cafés & Coffee Roasteries in Muscat",
      "Hotels, Resorts & Beach Clubs (Poolside / Room Service)",
      "Luxury Perfume, Fashion & Jewelry Boutiques",
      "Automotive Showrooms & Furniture Catalogs",
    ],
    faqs: [
      {
        question: "Do customers need to download an application to view the menu?",
        answer:
          "No. Customers simply open their smartphone camera, point it at the QR code, and the interactive menu opens instantly in their native mobile browser in less than a second.",
      },
      {
        question: "How difficult is it for our staff to change a price or mark an item out of stock?",
        answer:
          "It takes less than 15 seconds. You access a simple password-protected dashboard from any phone or computer, toggle the switch or edit the price, and it immediately updates on all customer screens without reprinting anything.",
      },
      {
        question: "Can we use this for retail product catalogues instead of restaurant menus?",
        answer:
          "Absolutely. We have adapted this exact solution for jewelry boutiques, furniture showrooms, auto parts catalogs, and event programs across Oman.",
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════
// Official 7 Corporate Services Mappings
// ═══════════════════════════════════════════════════════════════════
SERVICE_COMPANY_DETAILS["google-business-profile-local-seo"] = {
  ...SERVICE_COMPANY_DETAILS["local-seo-gbp"],
  heroBadge: "Local Search & Google Maps • Muscat, Oman",
  tagline:
    "Google Business Profile & Local SEO: Dominate Google Maps & Drive In-Store Footfall Across Muscat & Oman",
};

SERVICE_COMPANY_DETAILS["seo-ai-visibility"] = {
  ...SERVICE_COMPANY_DETAILS["ai-search-visibility"],
  heroBadge: "Organic SEO & Generative AI Optimization • Oman",
  tagline:
    "SEO & AI Visibility: Rank on Google and Be the Recommended Choice on ChatGPT, Perplexity & AI Overviews",
  executiveSummary:
    "Search is undergoing a generational shift. Today, clients in Oman research services both through Google's organic search results and conversational AI engines like ChatGPT, Google AI Overviews, Perplexity, and Microsoft Copilot. At Pixel Business Solutions LLC, we combine rigorous technical SEO architecture with Generative Engine Optimization (GEO) so your brand is both indexed on Google and synthesized as the authoritative answer by AI models.",
};

SERVICE_COMPANY_DETAILS["social-media-management"] = {
  ...SERVICE_COMPANY_DETAILS["social-media-content"],
  heroBadge: "Social Media Strategy & Community • Oman",
  tagline:
    "Social Media Management: Build High-Engagement Brand Presence & Conversions in Oman",
};

SERVICE_COMPANY_DETAILS["digital-advertising"] = {
  ...SERVICE_COMPANY_DETAILS["google-meta-ads"],
  heroBadge: "Paid Media & Performance Funnels • Muscat, Oman",
  tagline:
    "Digital Advertising: Precision-Targeted Google Search, YouTube, and Meta Lead Funnels",
};

SERVICE_COMPANY_DETAILS["creative-content"] = {
  ...SERVICE_COMPANY_DETAILS["graphic-design-ai-video"],
  heroBadge: "Brand Identity & Media Production • Oman",
  tagline:
    "Creative Content: Corporate Identity, High-Impact Graphics & AI-Accelerated 4K Video Reels",
};

SERVICE_COMPANY_DETAILS["business-tools"] = {
  ...SERVICE_COMPANY_DETAILS["custom-software-web-apps"],
  heroBadge: "Operational Software & Digital Tools • Oman",
  tagline:
    "Business Tools: Custom Web Portals, Dashboards & Interactive Digital QR Solutions",
  executiveSummary:
    "Accelerate your day-to-day business efficiency and eliminate manual paperwork with bespoke web applications, interactive client portals, and touchless digital QR solutions designed specifically for businesses across Muscat and the Sultanate of Oman. We engineer tailored software solutions that automate customer onboarding, internal dispatching, digital catalogs, and local payment collections in OMR.",
  deliverables: [
    {
      title: "Custom Web Applications & Operational Portals",
      description:
        "Bespoke internal dashboards, customer client portals, and role-based management systems with zero legacy clutter.",
      tag: "Engineering",
    },
    {
      title: "Interactive Digital QR Menus & Retail Catalogues",
      description:
        "Touchless, sub-second smartphone catalogues with bilingual Arabic/English layouts and real-time pricing updates.",
      tag: "Digital Experience",
    },
    {
      title: "Oman Payment Gateway & Invoice Integration",
      description:
        "Bank Muscat, Thawani Pay, and regional GCC payment gateways with automated VAT-compliant invoice generation in OMR.",
      tag: "Commerce",
    },
    {
      title: "Cloud Infrastructure & High-Uptime Deployment",
      description:
        "Enterprise-grade cloud hosting with encrypted backups, SSL security, and 99.9% uptime guarantees.",
      tag: "Reliability",
    },
  ],
};


