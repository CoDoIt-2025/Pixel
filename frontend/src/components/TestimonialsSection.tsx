import React, { useState, useEffect } from "react";
import { Star, Quote, Sparkles } from "lucide-react";
import type { Testimonial } from "../types";
import { api } from "../lib/api";

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    clientName: "Patrick Collison",
    clientRole: "CEO & Co-Founder",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    rating: 5,
    quote:
      "The Pixel engineering team operates with an obsessive dedication to code quality and systems reliability that matches Stripe's own standards. Their sovereign cloud architecture exceeded our highest benchmarks.",
    project: "Unified Billing Portal",
    status: "Approved",
    date: "Sep 2026",
  },
  {
    id: "test-2",
    clientName: "Harshil Mathur",
    clientRole: "CEO & Co-Founder",
    company: "Razorpay",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    rating: 5,
    quote:
      "Pixel helped us build our offline-capable omnichannel POS dashboard from zero to live merchant production in under four months. Outstanding speed, zero production regressions.",
    project: "OmniChannel POS",
    status: "Approved",
    date: "Aug 2026",
  },
  {
    id: "test-3",
    clientName: "Karri Saarinen",
    clientRole: "Head of Product",
    company: "Linear",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    rating: 5,
    quote:
      "Pixel's craft in frontend performance and AI inference pipelines is rare. They built our issue triage agent with meticulous attention to keyboard shortcuts, latency, and aesthetic subtlety.",
    project: "Workflow Automation SDK",
    status: "Approved",
    date: "Oct 2026",
  },
  {
    id: "test-4",
    clientName: "Deepinder Goyal",
    clientRole: "Founder & CEO",
    company: "Zomato",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    rating: 5,
    quote:
      "When 100,000 orders stream across kitchen screens in peak dinner hours, seconds matter. Pixel's tablet UI has been virtually uncrashable under grueling real-world kitchen environments.",
    project: "Kitchen Pulse 2.0",
    status: "Approved",
    date: "Sep 2026",
  },
];

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    FALLBACK_TESTIMONIALS
  );

  const fetchTestimonials = async () => {
    try {
      const data = await api.getTestimonials();
      if (data && data.length > 0) {
        const approved = data.filter((t) => t.status === "Approved" || !t.status);
        if (approved.length > 0) {
          setTestimonials(approved);
        }
      }
    } catch {
      // Keep fallbacks
    }
  };

  useEffect(() => {
    fetchTestimonials();
    window.addEventListener("focus", fetchTestimonials);
    const interval = setInterval(fetchTestimonials, 6000);

    return () => {
      window.removeEventListener("focus", fetchTestimonials);
      clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 bg-[#202124] text-[#F7F7F2] border-t border-[#45484E] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#45484E] mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2D31] border border-[#45484E] text-[#F5C542] text-xs font-semibold mb-3">
              <Sparkles size={13} className="text-[#F5C542] fill-[#F5C542]" />
              <span>Verified Client Feedback &bull; Live Admin Synced</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F7F7F2]">
              Trusted by leading businesses
            </h2>
          </div>

          <p className="text-[#C4C7CC] text-sm max-w-md leading-relaxed">
            Real outcomes and feedback from founders, executives, and commercial teams who partnered with Pixel for their digital platforms.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#2B2D31] border border-[#45484E] flex flex-col justify-between card-hover-gold relative group"
            >
              <div>
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={
                          i < (item.rating || 5)
                            ? "text-[#F5C542] fill-[#F5C542]"
                            : "text-[#45484E]"
                        }
                      />
                    ))}
                  </div>

                  <Quote
                    size={22}
                    className="text-[#F5C542]/40 group-hover:text-[#F5C542] transition-colors"
                  />
                </div>

                {/* Quote Body */}
                <p className="text-sm sm:text-base text-[#F7F7F2] leading-relaxed mb-6 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#45484E]/70 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      item.avatar ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                    }
                    alt={item.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-[#45484E]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#F7F7F2]">
                      {item.clientName}
                    </h4>
                    <p className="text-[11px] text-[#C4C7CC]">
                      {item.clientRole} &bull; <span className="text-[#F5C542]">{item.company}</span>
                    </p>
                  </div>
                </div>

                {item.project && (
                  <span className="hidden sm:inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#202124] border border-[#45484E] text-[#C4C7CC]">
                    {item.project}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
