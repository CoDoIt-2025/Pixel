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
    <section className="py-16 border-y border-slate-100 bg-slate-50/50 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-6">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider text-center">
          Trusted by technical leaders at high-growth companies
        </p>
      </div>
      <div className="animate-marquee flex items-center gap-6">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 p-5 rounded-xl border border-slate-200/70 bg-white flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-colors"
          >
            <p className="text-slate-700 text-[13px] leading-relaxed mb-4">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-3">
              <span className="text-slate-900 font-semibold">{item.author}</span>
              <span className="text-slate-500 font-medium">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
