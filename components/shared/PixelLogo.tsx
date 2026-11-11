import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/lib/store";

interface PixelLogoProps {
  collapsed?: boolean;
  className?: string;
}

export function PixelLogo({ collapsed = false, className }: PixelLogoProps) {
  const companyName = useAdminStore((state) => state.settings?.company?.name) || "Pixel";

  return (
    <Link
      href="/dashboard"
      className={cn("flex items-center gap-2.5 group select-none", className)}
    >
      {/* Official 3D PX Brand Mark */}
      <div className="relative flex h-9 w-9 items-center justify-center shrink-0 transition-transform group-hover:scale-105">
        <img
          src="/brand/pixel-logo-3d-tight.png"
          alt="Pixel Logo"
          className="h-8 w-auto object-contain filter drop-shadow-[0_2px_6px_rgba(250,204,21,0.3)]"
        />
      </div>

      {!collapsed && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold tracking-tight text-zinc-950 transition-colors uppercase">
              {companyName}
            </span>
            <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-900 border border-zinc-200">
              Admin
            </span>
          </div>
          <span className="text-[11px] font-medium text-zinc-500">
            Muscat, Sultanate of Oman
          </span>
        </div>
      )}
    </Link>
  );
}
