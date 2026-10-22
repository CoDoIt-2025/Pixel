"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useAdminStore } from "@/lib/store";

const STATUS_COLORS: Record<string, string> = {
  "In Progress": "#6366F1", // Indigo
  Review: "#8B5CF6", // Violet
  Planning: "#F59E0B", // Amber
  Completed: "#10B981", // Emerald
};

export function ProjectStatusChart() {
  const [mounted, setMounted] = useState(false);
  const projects = useAdminStore((state) => state.projects);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = React.useMemo(() => {
    const counts: Record<string, number> = {
      "In Progress": 0,
      Review: 0,
      Planning: 0,
      Completed: 0,
    };

    projects.forEach((p) => {
      if (counts[p.status] !== undefined) {
        counts[p.status]++;
      }
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
      color: STATUS_COLORS[name] || "#94A3B8",
    }));
  }, [projects]);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  if (!mounted) {
    return (
      <div className="h-[260px] w-full flex items-center justify-center bg-slate-50/50 rounded-xl animate-pulse">
        <span className="text-xs text-slate-400">Loading chart...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[200px] w-full">
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
              formatter={(val: any) => [`${val} Projects`, ""]}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-slate-900 leading-none">{total}</span>
          <span className="text-[11px] font-medium text-slate-400 mt-0.5">Total</span>
        </div>
      </div>

      {/* Custom Clean Legend */}
      <div className="grid grid-cols-2 gap-2 w-full pt-3 border-t border-slate-100 mt-2">
        {data.map((item) => {
          const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div key={item.name} className="flex items-center justify-between text-xs px-2 py-1 rounded-md bg-slate-50/70">
              <div className="flex items-center gap-1.5 truncate">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 truncate">{item.name}</span>
              </div>
              <span className="font-semibold text-slate-800 ml-1">
                {item.value} <span className="text-slate-400 text-[10px]">({pct}%)</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
