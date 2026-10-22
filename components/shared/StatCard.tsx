"use client";

import React from "react";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  trendText?: string;
  icon: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  trendText = "vs last month",
  icon: Icon,
  iconColor = "text-indigo-600 bg-indigo-50 border-indigo-100",
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden hover:border-slate-300 transition-all", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {title}
            </p>
            <h4 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
              {value}
            </h4>
          </div>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl border shadow-xs shrink-0",
              iconColor
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {change && (
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-semibold",
                isPositive
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : "bg-rose-50 text-rose-700 border border-rose-200/60"
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3 mr-0.5" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-0.5" />
              )}
              {change}
            </span>
            <span className="text-slate-400 font-normal">{trendText}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
