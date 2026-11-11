import React, { useState, useEffect } from "react";
import { Clock, ArrowRight, X, BookOpen } from "lucide-react";
import type { BlogPost } from "../types";
import { api } from "../lib/api";

const ARTICLES: BlogPost[] = [
  {
    id: "BLG-001",
    title: "How Businesses in Oman Can Dominate Local Search & Google Maps in 2026",
    slug: "how-businesses-in-oman-dominate-local-search-google-maps",
    excerpt:
      "A strategic breakdown of Google 3-Pack optimization, bilingual Arabic/English citations, and customer review systems tailored for Muscat commercial sectors.",
    content: `In the Sultanate of Oman, over 82% of smartphone users rely on Google Maps and localized searches when selecting medical clinics, dining venues, contracting firms, and retail destinations.

### 1. The Power of Proximity and Prominence
Google's local algorithm calculates ranking based on three pillars: Relevance, Distance, and Prominence. In high-density commercial zones like Qurum, Al Khuwair, and Seeb, having an actively optimized Google Business Profile (GBP) is the difference between capturing high-intent phone calls or losing them to local competitors.

### 2. Native Bilingual Arabic and English Optimization
A common mistake made by businesses in Muscat is creating an English-only listing. Over half of local Omani citizens search natively in Arabic. Ensuring your primary categories, service menus, descriptions, and weekly Google Posts are deployed in both Arabic and English doubles your searchable footprint.

### 3. Review Velocity and Sentiment
Google heavily favors profiles that steadily accumulate verified customer reviews with responsive owner interactions. Implementing frictionless review systems — such as custom QR counter stands and post-service WhatsApp review links — dramatically accelerates local trust and map ranking.`,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    author: {
      name: "Pixel Search Advisory",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      role: "SEO Director",
    },
    category: "Local SEO & Maps",
    tags: ["Google Maps", "Local SEO", "Muscat", "Oman Business"],
    status: "Published",
    views: 450,
    publishedAt: "2026-10-24",
    readingTime: "4 min read",
  },
  {
    id: "BLG-002",
    title: "Preparing for AI Search: Why ChatGPT and Google AI Overviews Matter in the GCC",
    slug: "preparing-for-ai-search-chatgpt-google-ai-overviews-gcc",
    excerpt:
      "How generative answer engines cite and synthesize brand information, and how forward-thinking Omani brands are optimizing for entity authority.",
    content: `Search is experiencing its most profound transformation in a generation. Executives, procurement heads, and consumers across Oman and the GCC increasingly bypass traditional blue search links, turning directly to ChatGPT, Perplexity, and Google AI Overviews for instant recommendations.

### 1. From Keyword Matching to Entity Authority
Traditional SEO matched string queries to on-page keywords. Generative engines (LLMs) operate on semantic knowledge graphs. They verify whether an organization is an authoritative, trusted entity across corroborating external sources like Wikidata, official business registries, and structured schema markup.

### 2. Semantic Q&A Structuring
To be retrieved by AI models via RAG (Retrieval-Augmented Generation), corporate websites must structure service information into clear, declarative question-and-answer formats. Providing concise, authoritative answers makes it effortless for AI models to synthesize your brand as the primary recommendation.`,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600",
    author: {
      name: "Pixel AI Research",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      role: "AI Discovery Lead",
    },
    category: "AI Discovery & AISO",
    tags: ["AI Search", "AEO", "Perplexity", "Knowledge Graph"],
    status: "Published",
    views: 520,
    publishedAt: "2026-10-26",
    readingTime: "5 min read",
  },
  {
    id: "BLG-003",
    title: "Why Modern Web Engineering Dictates Conversion Rates for Oman Enterprises",
    slug: "modern-web-engineering-conversion-rates-oman",
    excerpt:
      "Why slow-loading template websites bounce over 60% of mobile users on Oman telco networks, and how modern React/Next.js platforms drive qualified inquiries.",
    content: `A website is not an online brochure; it is your primary commercial salesperson. In Oman, over 80% of corporate website traffic originates from smartphones on Omantel, Ooredoo, and Vodafone 5G networks.

### 1. Speed Is Revenue
Studies consistently demonstrate that every additional second of mobile page load time reduces customer inquiries by up to 20%. Heavy, unoptimized WordPress themes with dozens of conflicting plugins often take 4 to 6 seconds to load. Modern headless architectures built with Next.js load in under 1.5 seconds.

### 2. Seamless WhatsApp & Click-to-Call Conversion
In Oman, prospective clients rarely want to fill out 10-field contact forms. Conversion funnels engineered with 1-click WhatsApp triggers and prominent click-to-call buttons achieve conversion rates 3x higher than legacy contact forms.`,
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
    author: {
      name: "Pixel Engineering",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150",
      role: "Lead Fullstack Architect",
    },
    category: "Web Engineering",
    tags: ["Next.js", "Web Performance", "Conversion Rate", "Muscat"],
    status: "Published",
    views: 390,
    publishedAt: "2026-10-28",
    readingTime: "4 min read",
  },
];

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(ARTICLES);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    api.getBlogPosts().then((dbPosts) => {
      if (dbPosts && dbPosts.length > 0) {
        setPosts(dbPosts.filter((p) => p.status === "Published"));
      }
    }).catch(() => {});
  }, []);

  return (
    <section
      id="blog"
      className="w-full bg-[#121418] text-white py-14 sm:py-20 border-b border-[#242831] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#242831]">
          <div className="reveal-on-scroll">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Blog & Industry Insights
              </h2>
              <span className="w-10 sm:w-14 h-1 sm:h-1.5 bg-[#FACC15] rounded-full inline-block" />
            </div>
            <p className="mt-2 text-xs sm:text-sm text-[#A1A5B0] max-w-xl reveal-on-scroll reveal-delay-1">
              Practical guides and strategic market analysis on search visibility, AI discovery, and web engineering in Oman.
            </p>
          </div>

          <div className="text-xs font-semibold text-[#A1A5B0] flex items-center gap-1.5 reveal-on-scroll reveal-delay-2">
            <BookOpen size={16} className="text-[#FACC15]" />
            <span>Authored by Pixel Agency Specialists</span>
          </div>
        </div>

        {/* Selected Article Reader Inline View */}
        {selectedPost && (
          <div className="mb-10 bg-[#181B22] border border-[#2B303C] rounded-3xl p-6 sm:p-10 shadow-2xl animate-in fade-in duration-200 relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#242831] hover:bg-[#2B303C] text-white flex items-center justify-center transition-colors cursor-pointer border border-[#3A4050]"
              aria-label="Close article"
            >
              <X size={18} />
            </button>

            <div className="max-w-3xl">
              <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/30">
                {selectedPost.category}
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-3 mb-4 leading-tight">
                {selectedPost.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-[#A1A5B0] pb-6 border-b border-[#242831] mb-6">
                <span>By {selectedPost.author.name}</span>
                <span>&bull;</span>
                <span>{selectedPost.publishedAt}</span>
                <span>&bull;</span>
                <span>{selectedPost.readingTime}</span>
              </div>

              <div className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed space-y-4 whitespace-pre-line font-normal">
                {selectedPost.content}
              </div>

              <div className="pt-8 mt-8 border-t border-[#242831] flex items-center justify-between">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#242831] hover:bg-[#2B303C] text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  &larr; Back to all articles
                </button>

                <a
                  href="#audit-request"
                  className="bg-[#FACC15] hover:bg-[#F59E0B] text-[#121418] font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm"
                >
                  Discuss this strategy for your business
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <article
              key={post.id}
              className={`bg-[#181B22] border border-[#2B303C] hover:border-[#FACC15] rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between hover:shadow-lg hover:shadow-[#FACC15]/5 cursor-pointer group reveal-scale reveal-delay-${(idx % 3) + 1}`}
              onClick={() => {
                setSelectedPost(post);
                const el = document.getElementById("blog");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-[#A1A5B0] mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#121418] text-[#FACC15] border border-[#2B303C]">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#A1A5B0]">
                    <Clock size={12} />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-base sm:text-lg text-white leading-snug group-hover:text-[#FACC15] transition-colors mb-2.5">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="px-6 py-4 bg-[#14161C] border-t border-[#242831] flex items-center justify-between text-xs font-bold text-white group-hover:text-[#FACC15] transition-colors">
                <span>Read Full Article</span>
                <ArrowRight
                  size={15}
                  className="text-[#FACC15] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
