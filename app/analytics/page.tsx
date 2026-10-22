"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Users,
  Eye,
  TrendingDown,
  TrendingUp,
  Clock,
  Calendar,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnalyticsVisitorsArea } from "@/components/charts/AnalyticsVisitorsArea";
import { AnalyticsTrafficSources } from "@/components/charts/AnalyticsTrafficSources";
import {
  mockAnalyticsOverview,
  mockTopPages,
  mockDeviceBreakdown,
  mockTopCountries,
} from "@/data/mockAnalytics";
import { formatNumber } from "@/lib/utils";
import { toast } from "sonner";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d");

  const handleDateChange = (val: string) => {
    setDateRange(val);
    toast.info(`Analytics filtered to ${val === "7d" ? "last 7 days" : val === "30d" ? "last 30 days" : val === "90d" ? "last 90 days" : "year to date"}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header with Date-range selector */}
        <PageHeader
          title="Traffic & User Analytics"
          description="Audience telemetry, acquisition channels, device usage, and engagement metrics on pixel.dev."
        >
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={handleDateChange}>
              <SelectTrigger className="w-[160px] h-9 text-xs">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
                <SelectItem value="ytd">Year to Date (2026)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PageHeader>

        {/* 4 Stat Overview Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Unique Visitors"
            value={formatNumber(mockAnalyticsOverview.totalVisitors)}
            change={mockAnalyticsOverview.visitorsTrend}
            isPositive={true}
            trendText="vs prior period"
            icon={Users}
            iconColor="text-indigo-600 bg-indigo-50 border-indigo-100"
          />
          <StatCard
            title="Total Page Views"
            value={formatNumber(mockAnalyticsOverview.pageViews)}
            change={mockAnalyticsOverview.pageViewsTrend}
            isPositive={true}
            trendText="3.02 views / user"
            icon={Eye}
            iconColor="text-blue-600 bg-blue-50 border-blue-100"
          />
          <StatCard
            title="Bounce Rate"
            value={`${mockAnalyticsOverview.bounceRate}%`}
            change={mockAnalyticsOverview.bounceRateTrend}
            isPositive={true}
            trendText="industry avg 45%"
            icon={TrendingDown}
            iconColor="text-emerald-600 bg-emerald-50 border-emerald-100"
          />
          <StatCard
            title="Avg. Session Duration"
            value={mockAnalyticsOverview.avgSessionDuration}
            change={mockAnalyticsOverview.durationTrend}
            isPositive={true}
            trendText="deep reading index"
            icon={Clock}
            iconColor="text-amber-600 bg-amber-50 border-amber-100"
          />
        </div>

        {/* Visitors Area Chart & Traffic Sources Donut */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Timeline Chart (8 cols) */}
          <Card className="lg:col-span-8">
            <CardHeader className="pb-2">
              <CardTitle>Audience & Session Velocity</CardTitle>
              <CardDescription>
                Unique daily visitors and page impression volume over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsVisitorsArea />
            </CardContent>
          </Card>

          {/* Traffic Sources (4 cols) */}
          <Card className="lg:col-span-4">
            <CardHeader className="pb-2">
              <CardTitle>Traffic Acquisition Sources</CardTitle>
              <CardDescription>Breakdown by origin channels</CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsTrafficSources />
            </CardContent>
          </Card>
        </div>

        {/* Top Pages Table & Device Breakdown / Countries */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Top Pages Table (8 cols) */}
          <Card className="lg:col-span-8 overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>Top Performing Pages & Case Studies</CardTitle>
              <CardDescription>
                Most viewed technical documentation, blogs, and capability pages
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/70 text-slate-500 border-y border-slate-100 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Page Title & Path</th>
                      <th className="py-3 px-4">Views</th>
                      <th className="py-3 px-4">Unique</th>
                      <th className="py-3 px-4">Bounce</th>
                      <th className="py-3 px-4">Avg Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockTopPages.map((page, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-semibold text-slate-900 truncate">
                            {page.title}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 truncate">
                            {page.path}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {formatNumber(page.views)}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {formatNumber(page.uniqueVisitors)}
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium">
                          {page.bounceRate}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {page.avgDuration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Devices & Top Countries (4 cols) */}
          <div className="space-y-6 lg:col-span-4">
            {/* Device Breakdown */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                {mockDeviceBreakdown.map((dev) => (
                  <div key={dev.device} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600 font-medium">{dev.device}</span>
                      <span className="font-semibold text-slate-900">
                        {dev.percentage}%{" "}
                        <span className="text-slate-400 font-normal">
                          ({formatNumber(dev.count)})
                        </span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${dev.percentage}%`,
                          backgroundColor: dev.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Top Countries */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Top Geographic Markets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5 text-xs">
                {mockTopCountries.map((c) => (
                  <div key={c.code} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1 py-0.5 rounded">
                          {c.code}
                        </span>
                        <span className="text-slate-700">{c.country}</span>
                      </div>
                      <span className="font-semibold text-slate-900">
                        {formatNumber(c.visitors)}{" "}
                        <span className="text-slate-400 font-normal">({c.percentage}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${c.percentage * 2.5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
