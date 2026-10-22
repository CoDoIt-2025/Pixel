"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { mockTrafficSources } from "@/data/mockAnalytics";

export function AnalyticsTrafficSources() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[240px] w-full flex items-center justify-center bg-slate-50/50 rounded-xl animate-pulse">
        <span className="text-xs text-slate-400">Loading sources...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                borderRadius: "0.75rem",
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.08)",
                fontSize: "12px",
              }}
              formatter={(val: any) => [`${val}% of traffic`, ""]}
            />
            <Pie
              data={mockTrafficSources}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={3}
              dataKey="percentage"
            >
              {mockTrafficSources.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        {mockTrafficSources.map((item) => (
          <div
            key={item.source}
            className="flex items-center justify-between text-xs px-2 py-1 rounded-md hover:bg-slate-50"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-600">{item.source}</span>
            </div>
            <span className="font-semibold text-slate-800">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
