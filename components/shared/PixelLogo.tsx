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
      {/* Geometric Monochrome Pixel Mark */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white shadow-xs transition-transform group-hover:scale-105 border border-zinc-800">
        <div className="grid grid-cols-2 gap-1 p-1.5">
          <div className="h-2 w-2 rounded-[2px] bg-white" />
          <div className="h-2 w-2 rounded-[2px] bg-zinc-500" />
          <div className="h-2 w-2 rounded-[2px] bg-zinc-400" />
          <div className="h-2 w-2 rounded-[2px] bg-white" />
        </div>
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
          <span className="text-[11px] font-medium text-zinc-400">
            Enterprise Studio
          </span>
        </div>
      )}
    </Link>
  );
}
