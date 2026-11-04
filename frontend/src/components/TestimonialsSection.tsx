import React, { useState, useEffect } from "react";
import { Star, Quote, Sparkles } from "lucide-react";
import type { Testimonial } from "../types";
import { api } from "../lib/api";

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const data = await api.getTestimonials();
      if (Array.isArray(data)) {
        // Only display Approved testimonials on the public client frontend
        const approved = data.filter(
          (t) => t.status === "Approved" || !t.status
        );
        setTestimonials(approved);
      } else {
        setTestimonials([]);
      }
    } catch (err) {
      console.warn("Could not fetch testimonials from API:", err);
    } finally {
      setHasLoaded(true);
    }
  };

  useEffect(() => {
    fetchTestimonials();

    // Re-fetch when user refocuses tab or periodically to sync with admin mutations
    window.addEventListener("focus", fetchTestimonials);
    const interval = setInterval(fetchTestimonials, 6000);

    return () => {
      window.removeEventListener("focus", fetchTestimonials);
      clearInterval(interval);
    };
  }, []);

  // When no testimonials exist or none are approved, completely hide this section (render nothing)
  if (!hasLoaded || testimonials.length === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="w-full bg-[#121418] text-white py-16 sm:py-24 border-t border-[#242831] relative overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#242831] mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E222B] border border-[#2B303C] text-[#FACC15] text-xs font-bold mb-3">
              <Sparkles size={13} className="text-[#FACC15] fill-[#FACC15]" />
              <span>Verified Client Endorsements</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              Trusted by Industry Leaders
            </h2>
          </div>

          <p className="text-[#9CA3AF] text-sm sm:text-base max-w-md leading-relaxed">
            Real outcomes and feedback from founders, executives, and enterprise technology teams who build with Pixel.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#1A1D24] border border-[#2B303C] hover:border-[#FACC15]/40 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative group"
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
                            ? "text-[#FACC15] fill-[#FACC15]"
                            : "text-[#374151]"
                        }
                      />
                    ))}
                  </div>

                  <Quote
                    size={22}
                    className="text-[#FACC15]/30 group-hover:text-[#FACC15] transition-colors"
                  />
                </div>

                {/* Quote Body */}
                <p className="text-sm sm:text-base text-[#E5E7EB] leading-relaxed mb-6 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#2B303C] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={
                      item.avatar ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                    }
                    alt={item.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-[#374151] shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                      {item.clientName}
                    </h4>
                    <p className="text-[11px] text-[#9CA3AF] truncate">
                      {item.clientRole} &bull;{" "}
                      <span className="text-[#FACC15] font-semibold">
                        {item.company}
                      </span>
                    </p>
                  </div>
                </div>

                {item.project && (
                  <span className="hidden sm:inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#121418] border border-[#2B303C] text-[#9CA3AF] shrink-0 max-w-[120px] truncate">
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
