"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname();

  // If items not manually provided, generate from pathname
  const generatedItems: BreadcrumbItem[] = React.useMemo(() => {
    if (items && items.length > 0) return items;

    const segments = pathname.split("/").filter(Boolean);
    const trail: BreadcrumbItem[] = [];

    let currentPath = "";
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      currentPath += `/${seg}`;

      // Format label
      let label = seg.charAt(0).toUpperCase() + seg.slice(1);
      if (seg.startsWith("proj-") || seg.startsWith("post-")) {
        label = "Details";
      } else if (seg === "new") {
        label = "New Post";
      }

      trail.push({
        label,
        href: i === segments.length - 1 ? undefined : currentPath,
      });
    }

    return trail;
  }, [pathname, items]);

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1.5 text-xs text-slate-500", className)}>
      <Link
        href="/dashboard"
        className="flex items-center gap-1 hover:text-slate-900 transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:inline-block">Home</span>
      </Link>

      {generatedItems.map((item, index) => {
        const isLast = index === generatedItems.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-slate-900 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-800">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
