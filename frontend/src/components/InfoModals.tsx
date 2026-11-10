import React, { useState, useEffect } from "react";
import { X, HelpCircle, Briefcase, BookOpen, ShieldCheck, Layers, ChevronDown } from "lucide-react";
import { api } from "../lib/api";
import type { FAQItem, BlogPost, Project } from "../types";

// Common Modal Container
const ModalContainer: React.FC<{
  title: string;
  icon: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, icon, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
    <div
      className="relative w-full max-w-2xl bg-[#1E2128] border border-[#373A43] text-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[88vh] flex flex-col animate-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between pb-4 border-b border-[#323640]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FACC15]/10 border border-[#FACC15]/20 flex items-center justify-center text-[#FACC15]">
            {icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">{title}</h3>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-[#2B2F3A] hover:bg-[#383D4B] text-[#C4C7CC] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      <div className="py-5 overflow-y-auto space-y-4 pr-1">{children}</div>

      <div className="pt-4 border-t border-[#323640] flex justify-end">
        <button
          onClick={onClose}
          className="bg-[#2B2F3A] hover:bg-[#383D4B] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  </div>
);

// 1. FAQ Modal
export const FAQModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    api.getFAQs().then((data) => {
      if (data && data.length > 0) {
        setFaqs(data);
      } else {
        // Fallback verified FAQs from website plan
        setFaqs([
          {
            id: "1",
            question: "What services does Pixel offer?",
            answer:
              "We offer Local SEO & Google Business Profile management, organic SEO, AI search visibility (AISO / AEO / GEO), website design & development, custom software & web applications, social media management, Google & Meta ads, graphic design & AI video, and digital QR menus for restaurants and hotels.",
            category: "Services",
            order: 1,
            isActive: true,
          },
          {
            id: "2",
            question: "Which markets do you focus on?",
            answer:
              "Oman is our primary focus (Muscat and governorates). We also support clients in Thrissur, Kerala and regional GCC businesses looking for focused digital visibility.",
            category: "Markets",
            order: 2,
            isActive: true,
          },
          {
            id: "3",
            question: "How does the digital presence audit work?",
            answer:
              "Submit your company name, phone number, and any links you currently have (Maps, website, or social media). Our specialists conduct an in-depth review of your NAP consistency, indexing status, keyword visibility, and local competitors in Oman, then provide straightforward recommendations.",
            category: "Process",
            order: 3,
            isActive: true,
          },
          {
            id: "4",
            question: "Do you guarantee #1 search rankings or AI mentions?",
            answer:
              "No agency can honestly guarantee #1 rankings, as Google and AI providers constantly update their algorithms. We focus on rigorous technical optimization, accurate local schema, truthful citations, and proven search architectures that maximize your real customer acquisition.",
            category: "SEO",
            order: 4,
            isActive: true,
          },
        ]);
      }
    });
  }, []);

  return (
    <ModalContainer
      title="Frequently Asked Questions"
      icon={<HelpCircle size={22} />}
      onClose={onClose}
    >
      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.id}
              className="border border-[#323640] rounded-2xl bg-[#16181E] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-white hover:text-[#FACC15] transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={16}
                  className={`text-[#FACC15] transition-transform duration-200 shrink-0 ml-2 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-[#A1A5B0] leading-relaxed border-t border-[#262A34] pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
};

// 2. Careers Modal
export const CareersModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <ModalContainer
    title="Careers at Pixel"
    icon={<Briefcase size={22} />}
    onClose={onClose}
  >
    <div className="space-y-4 text-sm text-[#D1D5DB] leading-relaxed">
      <p>
        Pixel Business Solutions LLC is expanding its digital marketing, search engineering, and software development capabilities in Muscat, Oman.
      </p>
      <div className="bg-[#16181E] p-4 rounded-2xl border border-[#323640] space-y-2">
        <h4 className="font-bold text-white text-sm">Open Talent Inquiries:</h4>
        <ul className="list-disc list-inside space-y-1 text-xs text-[#A1A5B0]">
          <li>Local SEO & Google Business Profile Specialists (Muscat)</li>
          <li>Bilingual Arabic/English Copywriters & Social Strategists</li>
          <li>Fullstack React / Python Software Engineers</li>
          <li>Digital Media & AI Video Creative Artists</li>
        </ul>
      </div>
      <p className="text-xs text-[#A1A5B0]">
        Interested in joining our team? Send your portfolio and CV to{" "}
        <a
          href="mailto:careers@pixelbusiness.si"
          className="text-[#FACC15] font-semibold underline"
        >
          careers@pixelbusiness.si
        </a>
        .
      </p>
    </div>
  </ModalContainer>
);

// 3. Blog Modal
export const BlogModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    api.getBlogPosts().then((data) => {
      if (data && data.length > 0) setPosts(data);
      else {
        setPosts([
          {
            id: "1",
            title: "Why Google Business Profile is Crucial for Muscat Retail & Services",
            excerpt:
              "Local searchers in Oman rely on Google Maps for opening hours, directions, and instant WhatsApp inquiries.",
            category: "Local SEO",
            readingTime: "4 min read",
            publishedAt: "2026-10-24",
            slug: "local-seo-muscat",
            content: "",
            coverImage: "",
            tags: [],
            status: "Published",
            views: 120,
            author: { name: "Pixel Team", avatar: "", role: "Search Strategists" },
          },
          {
            id: "2",
            title: "Navigating Generative AI Search: What Businesses in Oman Need to Know",
            excerpt:
              "How ChatGPT search and Google AI Overviews cite local business entities and structured knowledge.",
            category: "AI Search",
            readingTime: "5 min read",
            publishedAt: "2026-10-26",
            slug: "generative-ai-search-oman",
            content: "",
            coverImage: "",
            tags: [],
            status: "Published",
            views: 95,
            author: { name: "Pixel Team", avatar: "", role: "AI & Search" },
          },
        ]);
      }
    });
  }, []);

  return (
    <ModalContainer
      title="Pixel Insights & Blog"
      icon={<BookOpen size={22} />}
      onClose={onClose}
    >
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-2xl bg-[#16181E] border border-[#323640] space-y-2 hover:border-[#FACC15]/40 transition-colors"
          >
            <div className="flex items-center justify-between text-[11px] text-[#A1A5B0]">
              <span className="text-[#FACC15] font-semibold">{post.category}</span>
              <span>{post.readingTime}</span>
            </div>
            <h4 className="font-bold text-sm text-white">{post.title}</h4>
            <p className="text-xs text-[#A1A5B0]">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </ModalContainer>
  );
};

// 4. Privacy Modal
export const PrivacyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <ModalContainer
    title="Privacy Policy"
    icon={<ShieldCheck size={22} />}
    onClose={onClose}
  >
    <div className="space-y-3 text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
      <p>
        Pixel Business Solutions LLC ("Pixel") respects your privacy and is dedicated to protecting all client information collected via this website.
      </p>
      <h4 className="font-bold text-white text-sm pt-1">Information We Collect</h4>
      <p className="text-xs text-[#A1A5B0]">
        When submitting an audit request or contacting us, you may provide your company name, telephone number, email, and digital URLs (such as Google Maps or website links). This information is exclusively used to evaluate your digital presence and communicate audit findings.
      </p>
      <h4 className="font-bold text-white text-sm pt-1">Data Protection & Client Ownership</h4>
      <p className="text-xs text-[#A1A5B0]">
        We do not sell or lease client contact information to any third parties. All accounts, assets, and source materials created during client engagements remain 100% client property.
      </p>
    </div>
  </ModalContainer>
);

// 5. Our Work Showcase Modal
export const WorkModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.getProjects().then((data) => {
      if (data && data.length > 0) setProjects(data);
    });
  }, []);

  return (
    <ModalContainer
      title="Our Work & Capabilities"
      icon={<Layers size={22} />}
      onClose={onClose}
    >
      <div className="space-y-4">
        {projects.length > 0 ? (
          projects.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-[#16181E] border border-[#323640] space-y-1.5"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#FACC15] font-semibold">{p.category}</span>
                <span className="text-[#10B981] font-bold">{p.status}</span>
              </div>
              <h4 className="font-bold text-sm text-white">{p.name}</h4>
              <p className="text-xs text-[#A1A5B0]">{p.description}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-xs text-[#A1A5B0]">
            Permission-cleared case studies are prepared for prospective clients upon request.
          </div>
        )}
      </div>
    </ModalContainer>
  );
};
