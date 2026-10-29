import React, { useState, useEffect } from "react";

interface SplashScreenProps {
  onComplete?: () => void;
  brandName?: string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  brandName = "Pixel Business Solutions LLC",
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Smooth progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.random() * 25 + 15;
        return Math.min(prev + step, 100);
      });
    }, 120);

    // Fade out after progress reaches completion
    const exitTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1400);

    // Fully remove from DOM
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
      if (onComplete) onComplete();
    }, 1900);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#202124] flex flex-col items-center justify-center select-none transition-all duration-600 ease-out ${
        isFadingOut
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      aria-hidden="true"
    >
      {/* Background Ambience: Radiant Golden Ambient Glow */}
      <div
        className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(245,197,66,0.18)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none animate-pulse"
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Center Logo Stage */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="relative mb-6">
          {/* Logo with 3D drop shadow and breath animation */}
          <img
            src="/logo.png"
            alt="Pixel Logo"
            className="w-36 sm:w-48 h-auto object-contain drop-shadow-[0_20px_45px_rgba(245,197,66,0.35)] animate-float"
          />

          {/* Golden glow behind logo */}
          <div className="absolute -inset-4 bg-[#F5C542]/15 blur-2xl rounded-full -z-10" />
        </div>

        {/* Brand Name */}
        <h2 className="font-display font-black text-xl sm:text-2xl text-[#F7F7F2] tracking-tight mb-1">
          {brandName}
        </h2>
        <span className="text-xs text-[#C4C7CC] tracking-widest uppercase font-semibold mb-8 flex items-center gap-2">
          <span>Sultanate of Oman</span>
          <span className="text-[#45484E]">&bull;</span>
          <span className="text-[#F5C542]">Digital Solutions</span>
        </span>

        {/* Loading Progress Bar */}
        <div className="w-48 sm:w-60 h-1.5 bg-[#2B2D31] border border-[#45484E] rounded-full overflow-hidden p-[1px] relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#F5C542] via-[#FFE58F] to-[#F5C542] rounded-full transition-all duration-200 ease-out shadow-[0_0_12px_rgba(245,197,66,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Loading Indicator Text */}
        <span className="text-[11px] font-medium text-[#C4C7CC] mt-3">
          Loading experience...
        </span>
      </div>
    </div>
  );
};
