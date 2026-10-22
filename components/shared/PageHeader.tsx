import React from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 pb-6 border-b border-slate-100", className)}>
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {children && (
          <div className="flex items-center gap-2.5 shrink-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
