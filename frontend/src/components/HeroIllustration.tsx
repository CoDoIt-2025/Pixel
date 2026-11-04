import React from "react";

interface HeroIllustrationProps {
  type: string;
  bannerImage?: string;
  bannerVideo?: string;
  mediaType?: "illustration" | "image" | "video";
  title?: string;
}

export const HeroIllustration: React.FC<HeroIllustrationProps> = ({
  type,
  bannerImage,
  bannerVideo,
  mediaType,
  title,
}) => {
  const hasCustomVideo = Boolean(bannerVideo && (mediaType === "video" || !mediaType));
  const hasCustomImage = Boolean(bannerImage && (mediaType === "image" || (!mediaType && !hasCustomVideo)));

  return (
    <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[480px] aspect-[4/3] flex items-center justify-center select-none">
      {/* Background Golden Waves / Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#FACC15]/20 via-[#FACC15]/10 to-transparent blur-3xl opacity-75" />
        <svg
          className="absolute w-full h-full text-[#FACC15]/30 overflow-visible"
          viewBox="0 0 500 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 20 280 C 140 220, 220 320, 360 250 C 420 220, 470 190, 500 230"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-40"
          />
          <path
            d="M -10 230 C 120 180, 250 280, 380 200 C 440 160, 480 170, 520 210"
            stroke="#FACC15"
            strokeWidth="1.2"
            className="opacity-50"
          />
          <path
            d="M 50 200 C 180 150, 280 240, 420 180"
            stroke="#FACC15"
            strokeWidth="0.8"
            className="opacity-30"
          />
        </svg>
      </div>

      {/* Main Illustration Assembly based on Service Type or Uploaded Media */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Render browser window + 3D perspective grid + pin */}
        <div className="relative w-[280px] sm:w-[320px] md:w-[350px]">
          {/* Browser Window Card */}
          <div className="w-full bg-[#1A1D24] border border-[#3A3E48] rounded-xl shadow-2xl overflow-hidden transition-all duration-500">
            {/* Window Header */}
            <div className="h-7 bg-[#242832] px-3 flex items-center gap-1.5 border-b border-[#323744]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <div className="mx-auto w-32 h-2.5 rounded-full bg-[#1A1D24]/70 border border-[#3A3E48]/50 flex items-center justify-center">
                <span className="text-[8px] text-[#9CA3AF] truncate px-1">
                  {hasCustomVideo ? "video.preview" : hasCustomImage ? "banner.jpg" : "pixel.om"}
                </span>
              </div>
            </div>

            {/* Window Content: Custom Video, Custom Image, or Vector Mockup */}
            {hasCustomVideo ? (
              <div className="relative w-full h-[155px] sm:h-[185px] bg-[#0A0B0E] overflow-hidden flex items-center justify-center">
                <video
                  src={bannerVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-xs text-[10px] text-white px-2 py-0.5 rounded-full flex items-center gap-1.5 font-medium border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  <span>Banner Video</span>
                </div>
              </div>
            ) : hasCustomImage ? (
              <div className="relative w-full h-[155px] sm:h-[185px] bg-[#0A0B0E] overflow-hidden flex items-center justify-center">
                <img
                  src={bannerImage}
                  alt={title || "Service Banner"}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="p-4 bg-gradient-to-b from-[#F7F7F4] to-[#EDEDE8] text-[#1A1D24] min-h-[140px] flex flex-col justify-center">
                {type === "local-seo" && (
                  <div className="flex items-center gap-4">
                    {/* Store Awning Graphic */}
                    <div className="shrink-0 w-20 h-20 rounded-xl bg-[#1A1D24] p-2 flex flex-col items-center justify-center shadow-md relative overflow-hidden border border-[#2D313B]">
                      {/* Awning stripes */}
                      <div className="w-full flex h-4 rounded-t overflow-hidden">
                        <div className="w-1/4 bg-[#FACC15]" />
                        <div className="w-1/4 bg-[#2D313B]" />
                        <div className="w-1/4 bg-[#FACC15]" />
                        <div className="w-1/4 bg-[#2D313B]" />
                      </div>
                      {/* Store front door/window */}
                      <div className="w-12 h-9 border-2 border-[#FACC15]/80 rounded-b flex items-center justify-center mt-0.5">
                        <div className="w-3.5 h-6 bg-[#FACC15]/20 rounded-t border-t border-x border-[#FACC15]/60" />
                      </div>
                    </div>
                    {/* Content Placeholder Lines */}
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-3.5 bg-[#D1D5DB] rounded-md font-semibold text-[10px] flex items-center px-2 text-[#374151]">
                        Google Maps Verified
                      </div>
                      <div className="w-full h-2.5 bg-[#E5E7EB] rounded-full" />
                      <div className="w-5/6 h-2.5 bg-[#E5E7EB] rounded-full" />
                      <div className="flex items-center gap-1 pt-1">
                        <span className="text-[#F59E0B] text-xs">★★★★★</span>
                        <span className="text-[10px] text-[#6B7280] font-medium">5.0 (Oman)</span>
                      </div>
                    </div>
                  </div>
                )}

                {type === "seo" && (
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-20 h-20 rounded-xl bg-[#1A1D24] p-3 flex items-center justify-center shadow-md border border-[#2D313B]">
                      <svg className="w-10 h-10 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="w-24 h-3 bg-[#10B981]/20 border border-[#10B981]/40 text-[#047857] text-[9px] font-bold px-1.5 rounded flex items-center">
                        #1 Organic Result
                      </div>
                      <div className="w-full h-2.5 bg-[#D1D5DB] rounded-full" />
                      <div className="w-4/5 h-2 bg-[#E5E7EB] rounded-full" />
                      <div className="w-2/3 h-2 bg-[#E5E7EB] rounded-full" />
                    </div>
                  </div>
                )}

                {type === "ai-search" && (
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-20 h-20 rounded-xl bg-[#1A1D24] p-3 flex items-center justify-center shadow-md border border-[#2D313B]">
                      <div className="relative">
                        <div className="w-9 h-9 rounded-lg border-2 border-[#FACC15] flex items-center justify-center font-bold text-xs text-[#FACC15]">
                          AI
                        </div>
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-[11px] font-bold text-[#1F2937]">
                        AI Overview / Knowledge Graph
                      </div>
                      <div className="w-full h-2 bg-[#D1D5DB] rounded-full" />
                      <div className="w-5/6 h-2 bg-[#E5E7EB] rounded-full" />
                      <div className="flex items-center gap-1.5 text-[9px] text-[#4B5563]">
                        <span className="px-1.5 py-0.5 rounded bg-[#FACC15]/30 font-semibold text-[#854D0E]">
                          ChatGPT / Gemini / Perplexity
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {type === "website" && (
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-20 h-20 rounded-xl bg-[#1A1D24] p-3 flex items-center justify-center shadow-md border border-[#2D313B]">
                      <svg className="w-10 h-10 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-[11px] font-bold text-[#1F2937]">Responsive Web Experience</div>
                      <div className="flex gap-2">
                        <div className="flex-1 h-8 bg-white border border-[#E5E7EB] rounded p-1">
                          <div className="w-full h-1.5 bg-[#D1D5DB] rounded mb-1" />
                          <div className="w-2/3 h-1.5 bg-[#FACC15] rounded" />
                        </div>
                        <div className="w-6 h-8 bg-white border border-[#E5E7EB] rounded p-0.5">
                          <div className="w-full h-1 bg-[#D1D5DB] rounded mb-0.5" />
                          <div className="w-full h-1 bg-[#FACC15] rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {type === "custom-software" && (
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-20 h-20 rounded-xl bg-[#1A1D24] p-3 flex items-center justify-center shadow-md border border-[#2D313B]">
                      <svg className="w-10 h-10 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-[11px] font-bold text-[#1F2937]">Portal & Database Architecture</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="h-4 bg-[#E5E7EB] rounded flex items-center px-1 text-[8px] font-mono">GET /api/v1</div>
                        <div className="h-4 bg-[#10B981]/20 rounded flex items-center px-1 text-[8px] font-mono text-[#047857]">200 OK</div>
                      </div>
                      <div className="w-full h-2 bg-[#E5E7EB] rounded-full" />
                    </div>
                  </div>
                )}

                {type === "social-media" && (
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-20 h-20 rounded-xl bg-[#1A1D24] p-3 flex items-center justify-center shadow-md border border-[#2D313B]">
                      <svg className="w-10 h-10 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-[11px] font-bold text-[#1F2937]">Community & Content Feed</div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#FACC15] flex items-center justify-center text-[10px] font-bold">P</div>
                        <div className="w-32 h-2.5 bg-[#D1D5DB] rounded-full" />
                      </div>
                      <div className="w-full h-2 bg-[#E5E7EB] rounded-full" />
                    </div>
                  </div>
                )}

                {type === "ads" && (
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-20 h-20 rounded-xl bg-[#1A1D24] p-3 flex items-center justify-center shadow-md border border-[#2D313B]">
                      <svg className="w-10 h-10 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-[11px] font-bold text-[#1F2937]">Google & Meta Ads Campaign</div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#6B7280]">Targeting: Muscat, Oman</span>
                        <span className="font-bold text-[#047857]">ROI +4.2x</span>
                      </div>
                      <div className="w-full h-2 bg-[#E5E7EB] rounded-full" />
                    </div>
                  </div>
                )}

                {type === "graphic-video" && (
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-20 h-20 rounded-xl bg-[#1A1D24] p-3 flex items-center justify-center shadow-md border border-[#2D313B]">
                      <svg className="w-10 h-10 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-[11px] font-bold text-[#1F2937]">Motion Graphics & AI Video</div>
                      <div className="w-full h-8 bg-[#1A1D24] rounded flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-[#FACC15] flex items-center justify-center">
                          <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-[#1A1D24] ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {type === "qr-menus" && (
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 w-20 h-20 rounded-xl bg-[#1A1D24] p-2 flex items-center justify-center shadow-md border border-[#2D313B]">
                      <svg className="w-12 h-12 text-[#FACC15]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="text-[11px] font-bold text-[#1F2937]">Instant Smartphone QR Menu</div>
                      <div className="w-full h-2.5 bg-[#D1D5DB] rounded-full" />
                      <div className="w-3/4 h-2 bg-[#E5E7EB] rounded-full" />
                      <span className="inline-block text-[9px] text-[#854D0E] bg-[#FACC15]/30 px-1.5 py-0.5 rounded font-medium">
                        Zero app install needed
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Perspective Map Grid underneath with Yellow Location Pin */}
          <div className="relative -mt-6 sm:-mt-8 flex justify-center">
            {/* 3D Perspective Plane */}
            <div
              className="w-[280px] sm:w-[320px] h-24 sm:h-28 rounded-xl bg-[#242833]/90 border border-[#FACC15]/30 shadow-2xl overflow-hidden"
              style={{
                transform: "perspective(300px) rotateX(45deg)",
                backgroundImage:
                  "linear-gradient(to right, rgba(250, 204, 21, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(250, 204, 21, 0.25) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {/* Glowing center area */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#FACC15]/10 to-[#FACC15]/20" />
            </div>

            {/* 3D Yellow Map Pin Marker */}
            <div className="absolute bottom-6 sm:bottom-8 z-20 flex flex-col items-center animate-bounce duration-1000">
              <div className="relative">
                {/* Pin head */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FDE047] via-[#FACC15] to-[#EAB308] shadow-[0_8px_20px_rgba(250,204,21,0.5)] border-2 border-white flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1A1D24]" />
                </div>
                {/* Pin tip */}
                <div className="w-0 h-0 border-x-[6px] border-x-transparent border-t-[10px] border-t-[#EAB308] mx-auto -mt-1" />
              </div>
              {/* Pin shadow on grid */}
              <div className="w-7 h-2 rounded-full bg-black/60 blur-[2px] mt-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
