import React from "react";

const ENDORSEMENTS = [
  {
    quote: "Pixel delivers the caliber of software engineering and aesthetic finesse rarely found in external partners. Their work on our treasury AI set a new benchmark.",
    author: "Patrick Collison",
    title: "CEO & Co-founder",
    company: "Stripe",
  },
  {
    quote: "The engineering velocity and attention to detail from the Pixel atelier was phenomenal. Zero-downtime migration with immaculate design polish.",
    author: "Harshil Mathur",
    title: "Founder & CEO",
    company: "Razorpay",
  },
  {
    quote: "Pixel understands tactile micro-interactions and rigorous typography like few teams on earth. Exceptional craft.",
    author: "Karri Saarinen",
    title: "Co-founder & Head of Product",
    company: "Linear",
  },
  {
    quote: "Sub-millisecond edge routing and ruthless performance optimization. Pixel is in a league of their own.",
    author: "Guillermo Rauch",
    title: "CEO & Founder",
    company: "Vercel",
  },
];

export const ClientTicker: React.FC = () => {
  return (
    <div className="py-14 border-b border-white/10 bg-zinc-950/90 overflow-hidden relative select-none">
      <div className="animate-marquee flex items-center gap-12">
        {[...ENDORSEMENTS, ...ENDORSEMENTS].map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 max-w-lg p-6 border border-white/10 bg-black/60 flex flex-col justify-between"
          >
            <p className="font-body text-zinc-300 text-sm italic leading-relaxed mb-4">
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between font-mono text-xs border-t border-white/5 pt-3">
              <div>
                <span className="text-white font-semibold block">{item.author}</span>
                <span className="text-zinc-500 text-[10px]">{item.title}</span>
              </div>
              <span className="font-tech font-bold text-zinc-400 uppercase tracking-widest text-sm">
                {item.company}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
