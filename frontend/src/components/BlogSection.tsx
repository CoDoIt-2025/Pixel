import React, { useState, useEffect } from "react";
import { ArrowUpRight, Clock, Calendar, X, ArrowRight } from "lucide-react";
import type { BlogPost } from "../types";
import { api } from "../lib/api";

const FALLBACK_INSIGHTS: BlogPost[] = [
  {
    id: "BLG-001",
    title: "What to prepare before building your business website",
    slug: "what-to-prepare-before-building-your-business-website",
    excerpt: "A practical checklist of service information, images, contact details and decisions to prepare before your website project begins.",
    content: `# What to Prepare Before Building Your Business Website

Before choosing a design, gather the information your customers need. A website project is easier to plan when your services, contact details and priorities are clear. Start with the checklist below, then discuss what is missing with your website team.

### 1. Define the Main Customer Action
What do you want a visitor to do after arriving at your website? Whether it's calling your office, sending a WhatsApp message, or requesting a quote, every page should support that goal.

### 2. List Your Services and Audience
Write down each service you provide, who it serves in Oman or Thrissur, and the typical questions customers ask before deciding.

### 3. Gather Approved Brand Assets
Collect high-resolution versions of your logo, brand colors, and authentic photographs of your premises, products, or team.

### 4. Confirm Public Contact Details
Ensure you have verified phone numbers, business email addresses, accurate opening hours, and clear physical location details.

### 5. Agree Ownership and Maintenance
Decide who in your business will review drafts, approve content changes, and manage website updates after launch.

You do not need every detail ready to start the conversation. Tell us what you have and where you need support.`,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    author: { name: "Pixel Editorial Team", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", role: "Digital Advisory" },
    category: "Website Planning",
    tags: ["Website Design", "Oman Business", "Planning", "Digital Strategy"],
    status: "Published",
    views: 420,
    publishedAt: "2026-10-23",
    readingTime: "5 min read",
  },
  {
    id: "BLG-002",
    title: "What to look for in a digital QR menu",
    slug: "what-to-look-for-in-a-digital-qr-menu",
    excerpt: "From readable categories to an agreed update process, explore the details that matter when choosing a menu for your restaurant or hotel.",
    content: `# What to Look for in a Digital QR Menu

For restaurants and cafes in Oman, a digital QR menu is more than a digital copy of a paper brochure. It is an opportunity to make browsing dishes smooth, clear, and convenient for guests.

### 1. Fast Mobile Loading on Every Device
Guests shouldn't wait for heavy PDF downloads. A lightweight web menu loads instantly in any mobile browser without requiring app installations.

### 2. Clear Categories and Readable Descriptions
Organize dishes into logical sections: Appetizers, Main Courses, Desserts, and Beverages. Include clear descriptions and pricing in OMR.

### 3. Simple Update Workflow
Menus change with seasonality and market prices. Ensure your setup allows swift updates to prices or items without reprinting physical QR codes.

### 4. High-Contrast, Clean Layout
Low-light dining environments demand high contrast, legible typography, and intuitive scrolling.

### 5. Clear Demarcation of Features
Start with a pure browsing menu. Add ordering or payment workflows only when your point-of-sale systems and staff are ready to support them.`,
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
    author: { name: "Pixel Editorial Team", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", role: "Hospitality Solutions" },
    category: "Digital Menus",
    tags: ["QR Menu", "Hospitality", "Restaurants Oman", "OMR Pricing"],
    status: "Published",
    views: 380,
    publishedAt: "2026-10-24",
    readingTime: "4 min read",
  },
  {
    id: "BLG-003",
    title: "SEO and AI visibility explained without the promises",
    slug: "seo-and-ai-visibility-explained-without-promises",
    excerpt: "Understand where useful content and clear business information help, and why no provider can guarantee search positions or AI recommendations.",
    content: `# SEO and AI Visibility Explained Without the Promises

Search and discovery are evolving with generative search features and conversational AI assistants. However, the core principles of building an enduring digital presence remain grounded in truth and clarity.

### The Reality of Rankings
Search engines and AI platforms adjust their algorithms dynamically. No agency or consultant can guarantee first-place rankings or exclusive mentions in AI answers.

### What Actually Works:
1. **Accurate Business Entities**: Consistent business name, phone, address, and operating hours across your website and Google Business Profile.
2. **Helpful Answers to Real Questions**: Publishing direct answers that genuine customers seek before purchasing.
3. **Structured Data**: Standard Schema.org markup that helps search crawlers parse services, locations, and FAQs accurately.
4. **Regular Performance Reviews**: Tracking impressions, clicks, and verified leads using Google Search Console over meaningful periods.`,
    coverImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600",
    author: { name: "Pixel Editorial Team", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", role: "Search & AI Advisory" },
    category: "SEO & AI Visibility",
    tags: ["SEO", "AI Visibility", "Oman Business", "Truth in Search"],
    status: "Published",
    views: 510,
    publishedAt: "2026-10-25",
    readingTime: "6 min read",
  },
];

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(FALLBACK_INSIGHTS);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const fetchBlogPosts = async () => {
    const data = await api.getBlogPosts();
    if (data && data.length > 0) {
      setPosts(data.filter((p) => p.status === "Published"));
    }
  };

  useEffect(() => {
    fetchBlogPosts();
    const handleFocus = () => fetchBlogPosts();
    window.addEventListener("focus", handleFocus);
    const interval = setInterval(fetchBlogPosts, 6000);

    return () => {
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="blog" className="py-24 sm:py-32 bg-[#202124] text-[#F7F7F2] border-t border-[#45484E]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header from docx */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#45484E]">
          <div>
            <span className="text-xs font-semibold text-[#F5C542] uppercase tracking-wider block mb-2">
              Insights &amp; Practical Guides
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F7F7F2]">
              Practical ideas for your website and digital presence
            </h2>
          </div>

          <p className="text-[#C4C7CC] text-sm max-w-md leading-relaxed">
            Explore clear explanations of website planning, search visibility, social media and digital menus written to help business owners understand their options.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer rounded-2xl border border-[#45484E] bg-[#2B2D31] overflow-hidden flex flex-col justify-between hover:border-[#F5C542]/60 hover:shadow-xl transition-all"
            >
              <div>
                <div className="w-full h-48 overflow-hidden bg-[#202124] relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 bg-[#202124]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#F5C542] border border-[#45484E]">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-[11px] text-[#C4C7CC] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#F5C542]" />
                      {post.publishedAt || "October 2026"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-[#F5C542]" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#F7F7F2] group-hover:text-[#F5C542] transition-colors leading-snug mb-2.5">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#C4C7CC] line-clamp-3 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#45484E]/50 flex items-center justify-between text-xs font-semibold text-[#F5C542] group-hover:translate-x-0.5 transition-transform">
                <span>Read article</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          ))}
        </div>

        {/* Blog Enquiry CTA Box (from docx) */}
        <div className="mt-16 p-8 rounded-2xl bg-[#2B2D31] border border-[#45484E] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-[#F7F7F2] mb-2">
              Have a question about your business website?
            </h3>
            <p className="text-xs text-[#C4C7CC] leading-relaxed">
              Tell us what you are trying to improve. We can discuss which service or next step fits your needs.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-primary whitespace-nowrap"
          >
            <span>Discuss your project</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#2B2D31] border border-[#45484E] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl text-[#F7F7F2]">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#202124] border border-[#45484E] text-[#C4C7CC] hover:text-[#F7F7F2] hover:border-[#F5C542] transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-[#202124] border border-[#45484E] text-[#F5C542] text-[11px] font-bold">
                {selectedPost.category}
              </span>
              <span className="text-xs text-[#C4C7CC]">
                {selectedPost.readingTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#F7F7F2] mb-4">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-3 pb-6 border-b border-[#45484E] mb-6 text-xs text-[#C4C7CC]">
              <span>Author: {selectedPost.author?.name || "Pixel Editorial"}</span>
              <span>&bull;</span>
              <span>Published: {selectedPost.publishedAt || "October 2026"}</span>
            </div>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[#C4C7CC] leading-relaxed space-y-4">
              {selectedPost.content.split("\n\n").map((para, pIdx) => {
                if (para.startsWith("### ")) {
                  return (
                    <h4 key={pIdx} className="text-base font-bold text-[#F7F7F2] mt-4 mb-2">
                      {para.replace("### ", "")}
                    </h4>
                  );
                }
                if (para.startsWith("# ")) {
                  return null;
                }
                return <p key={pIdx}>{para}</p>;
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-[#45484E] flex justify-between items-center">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 rounded-lg border border-[#45484E] bg-[#202124] text-xs font-semibold text-[#F7F7F2] hover:bg-[#34373C]"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedPost(null)}
                className="btn-primary text-xs"
              >
                Discuss your project
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
