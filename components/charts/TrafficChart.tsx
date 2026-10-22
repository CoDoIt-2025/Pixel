"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { mockTrafficData } from "@/data/mockAnalytics";
import { formatNumber } from "@/lib/utils";

export function TrafficChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[280px] w-full flex items-center justify-center bg-slate-50/50 rounded-xl animate-pulse">
        <span className="text-xs text-slate-400">Loading traffic metrics...</span>
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={mockTrafficData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="month"
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
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: "10px", fontSize: "12px" }}
          />
          <Bar
            dataKey="visitors"
            name="Unique Visitors"
            fill="#6366F1"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="pageViews"
            name="Total Page Views"
            fill="#C7D2FE"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
