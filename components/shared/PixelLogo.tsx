import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PixelLogoProps {
  collapsed?: boolean;
  className?: string;
}

export function PixelLogo({ collapsed = false, className }: PixelLogoProps) {
  return (
    <Link
      href="/dashboard"
      className={cn("flex items-center gap-2.5 group select-none", className)}
    >
      {/* Geometric Pixel Mark */}
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200 transition-transform group-hover:scale-105">
        <div className="grid grid-cols-2 gap-1 p-1.5">
          <div className="h-2 w-2 rounded-[2px] bg-white" />
          <div className="h-2 w-2 rounded-[2px] bg-indigo-200" />
          <div className="h-2 w-2 rounded-[2px] bg-indigo-300" />
          <div className="h-2 w-2 rounded-[2px] bg-white" />
        </div>
      </div>

      {!collapsed && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Pixel
            </span>
            <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-600 border border-indigo-100">
              Admin
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            Enterprise Studio
          </span>
        </div>
      )}
    </Link>
  );
}
