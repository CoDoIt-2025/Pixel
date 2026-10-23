import React, { useState, useEffect } from "react";
import { api } from "../lib/api";
import type { Testimonial } from "../types";

const FALLBACK_ENDORSEMENTS = [
  {
    quote: "Pixel delivers the caliber of software engineering and aesthetic finesse rarely found in external partners. Exceptional work.",
    author: "Patrick Collison",
    title: "Stripe",
  },
  {
    quote: "The engineering velocity and attention to detail from the Pixel team was phenomenal. Zero-downtime migration.",
    author: "Harshil Mathur",
    title: "Razorpay",
  },
  {
    quote: "Pixel understands tactile micro-interactions and rigorous typography like few teams on earth.",
    author: "Karri Saarinen",
    title: "Linear",
  },
  {
    quote: "Sub-millisecond edge routing and ruthless performance optimization. Pixel is in a league of their own.",
    author: "Guillermo Rauch",
    title: "Vercel",
  },
];

export const ClientTicker: React.FC = () => {
  const [items, setItems] = useState<Array<{ quote: string; author: string; title: string }>>(FALLBACK_ENDORSEMENTS);

  const loadTestimonials = async () => {
    const data: Testimonial[] = await api.getTestimonials();
    if (data && data.length > 0) {
      setItems(
        data.map((t) => ({
          quote: t.quote,
          author: t.clientName,
          title: t.company || t.clientRole,
        }))
      );
    }
  };

  useEffect(() => {
    loadTestimonials();
    window.addEventListener("focus", loadTestimonials);
    const interval = setInterval(loadTestimonials, 8000);
    return () => {
      window.removeEventListener("focus", loadTestimonials);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative py-16 border-y border-slate-900 bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Subtle edge fades for smooth infinite marquee */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent z-10" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center">
          Trusted by technical leaders at high-growth companies
        </p>
      </div>
      <div className="animate-marquee flex items-center gap-6">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 p-5 rounded-xl border border-slate-800/80 bg-slate-900/90 backdrop-blur-sm flex flex-col justify-between shadow-xl hover:border-slate-700 hover:bg-slate-900 transition-colors"
          >
            <p className="text-slate-300 text-[13px] leading-relaxed mb-4">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between text-xs border-t border-slate-800/80 pt-3">
              <span className="text-white font-semibold">{item.author}</span>
              <span className="text-slate-400 font-medium">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
