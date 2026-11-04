import React from "react";

export const TestimonialsOptionalSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF9F5] py-8 sm:py-10 select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashed Border Card Container */}
        <div className="border border-dashed border-[#A8ADB8] rounded-2xl p-6 sm:p-7 text-center bg-white/40">
          <h3 className="font-extrabold text-sm sm:text-base text-[#121418] tracking-tight">
            Testimonials — optional
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[#717682] italic">
            {/* Desktop text */}
            <span className="hidden sm:inline">
              Hidden at launch until verified feedback is available.
            </span>
            {/* Mobile text */}
            <span className="inline sm:hidden">Hidden at launch.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

