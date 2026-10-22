import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: "sm" | "default";
}

export function StatusBadge({ status, className, size = "default" }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  // Emerald / Green
  if (
    normalized === "completed" ||
    normalized === "active" ||
    normalized === "published" ||
    normalized === "resolved" ||
    normalized === "approved"
  ) {
    return (
      <Badge
        variant="success"
        className={cn(size === "sm" && "text-[11px] px-2 py-0", className)}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
        {status}
      </Badge>
    );
  }

  // Indigo / Blue
  if (
    normalized === "in progress" ||
    normalized === "in_progress" ||
    normalized === "lead"
  ) {
    return (
      <Badge
        variant="default"
        className={cn(size === "sm" && "text-[11px] px-2 py-0", className)}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mr-1" />
        {status}
      </Badge>
    );
  }

  // Violet / Purple
  if (normalized === "review" || normalized === "scheduled") {
    return (
      <Badge
        variant="purple"
        className={cn(size === "sm" && "text-[11px] px-2 py-0", className)}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-1" />
        {status}
      </Badge>
    );
  }

  // Amber / Yellow
  if (
    normalized === "planning" ||
    normalized === "draft" ||
    normalized === "pending" ||
    normalized === "away" ||
    normalized === "new"
  ) {
    return (
      <Badge
        variant="warning"
        className={cn(size === "sm" && "text-[11px] px-2 py-0", className)}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-1" />
        {status}
      </Badge>
    );
  }

  // Rose / Red (Spam, Rejected, Inactive, Offline)
  if (
    normalized === "spam" ||
    normalized === "rejected" ||
    normalized === "inactive" ||
    normalized === "offline"
  ) {
    return (
      <Badge
        variant="destructive"
        className={cn(size === "sm" && "text-[11px] px-2 py-0", className)}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mr-1" />
        {status}
      </Badge>
    );
  }

  // Fallback
  return (
    <Badge
      variant="secondary"
      className={cn(size === "sm" && "text-[11px] px-2 py-0", className)}
    >
      {status}
    </Badge>
  );
}
