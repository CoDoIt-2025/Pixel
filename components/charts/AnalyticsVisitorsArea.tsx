"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "@/lib/utils";

const timelineData = [
  { date: "Oct 1", visitors: 4200, pageViews: 11200 },
  { date: "Oct 3", visitors: 4800, pageViews: 12900 },
  { date: "Oct 5", visitors: 5100, pageViews: 14100 },
  { date: "Oct 7", visitors: 4900, pageViews: 13500 },
  { date: "Oct 9", visitors: 5600, pageViews: 15400 },
  { date: "Oct 11", visitors: 6200, pageViews: 17200 },
  { date: "Oct 13", visitors: 5900, pageViews: 16100 },
  { date: "Oct 15", visitors: 6700, pageViews: 18900 },
  { date: "Oct 17", visitors: 7100, pageViews: 19800 },
  { date: "Oct 19", visitors: 7500, pageViews: 21400 },
];

export function AnalyticsVisitorsArea() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[280px] w-full flex items-center justify-center bg-slate-50/50 rounded-xl animate-pulse">
        <span className="text-xs text-slate-400">Loading timeline data...</span>
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={timelineData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="visGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="pvGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="date"
            stroke="#94A3B8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94A3B8"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => `${val / 1000}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#FFFFFF",
              borderRadius: "0.75rem",
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.08)",
              fontSize: "12px",
            }}
            formatter={(val: any) => [formatNumber(Number(val)), ""]}
          />
          <Area
            type="monotone"
            dataKey="pageViews"
            name="Page Views"
            stroke="#3B82F6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#pvGradient)"
          />
          <Area
            type="monotone"
            dataKey="visitors"
            name="Unique Visitors"
            stroke="#6366F1"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#visGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
