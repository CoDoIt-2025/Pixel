"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DollarSign,
  FolderGit2,
  Building2,
  Mail,
  ArrowUpRight,
  Plus,
  Clock,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { ProjectStatusChart } from "@/components/charts/ProjectStatusChart";
import { TrafficChart } from "@/components/charts/TrafficChart";
import { useAdminStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const projects = useAdminStore((state) => state.projects);
  const clients = useAdminStore((state) => state.clients);
  const inquiries = useAdminStore((state) => state.inquiries);
  const activities = useAdminStore((state) => state.activities);

  // Compute live metrics from store
  const totalRevenue = clients.reduce((acc, c) => acc + c.totalSpend, 0);
  const activeProjectsCount = projects.filter(
    (p) => p.status === "In Progress" || p.status === "Review"
  ).length;
  const newClientsCount = clients.length;
  const openInquiriesCount = inquiries.filter(
    (i) => i.status === "New" || i.status === "In Progress"
  ).length;

  const recentInquiries = inquiries.slice(0, 5);
  const recentActivities = activities.slice(0, 6);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <PageHeader
          title="Dashboard Overview"
          description="Real-time performance, active client projects, and executive operations for Pixel."
        >
          <Button
            size="sm"
            onClick={() => router.push("/projects")}
            className="shadow-xs"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            New Project
          </Button>
        </PageHeader>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(totalRevenue)}
            change="+14.2%"
            isPositive={true}
            trendText="vs previous cycle"
            icon={DollarSign}
            iconColor="text-indigo-600 bg-indigo-50 border-indigo-100"
          />
          <StatCard
            title="Active Projects"
            value={activeProjectsCount}
            change="+8.4%"
            isPositive={true}
            trendText="4 delivered this quarter"
            icon={FolderGit2}
            iconColor="text-blue-600 bg-blue-50 border-blue-100"
          />
          <StatCard
            title="Total Clients"
            value={newClientsCount}
            change="+12.5%"
            isPositive={true}
            trendText="across 4 countries"
            icon={Building2}
            iconColor="text-emerald-600 bg-emerald-50 border-emerald-100"
          />
          <StatCard
            title="Open Inquiries"
            value={openInquiriesCount}
            change="-4.1%"
            isPositive={true}
            trendText="avg reply time 1.4h"
            icon={Mail}
            iconColor="text-amber-600 bg-amber-50 border-amber-100"
          />
        </div>

        {/* First Chart Row: Revenue & Project Breakdown */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Revenue Chart (8 cols) */}
          <Card className="lg:col-span-8">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Revenue & Financial Trajectory</CardTitle>
                <CardDescription>
                  12-month trailing revenue vs targets across enterprise engagements
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/analytics")}
                className="h-8 text-xs text-slate-600"
              >
                Analytics
                <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <RevenueChart />
            </CardContent>
          </Card>

          {/* Project Status Donut Chart (4 cols) */}
          <Card className="lg:col-span-4">
            <CardHeader className="pb-2">
              <CardTitle>Project Status Breakdown</CardTitle>
              <CardDescription>
                Active sprint distributions across 16 client workstreams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectStatusChart />
            </CardContent>
          </Card>
        </div>

        {/* Second Chart & Activity Row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Traffic Bar Chart (7 cols) */}
          <Card className="lg:col-span-7">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Website Traffic & Growth</CardTitle>
                <CardDescription>
                  Monthly unique visitors vs total page views on pixel.dev
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/analytics")}
                className="h-8 text-xs text-slate-600"
              >
                Full Metrics
                <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <TrafficChart />
            </CardContent>
          </Card>

          {/* Activity Feed (5 cols) */}
          <Card className="lg:col-span-5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Audit log of engineering and operational milestones
                </CardDescription>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <Avatar className="h-7 w-7 mt-0.5 shrink-0">
                    <AvatarImage src={act.avatar} alt={act.user} />
                    <AvatarFallback>{act.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-slate-700 leading-snug">
                      <span className="font-semibold text-slate-900">{act.user}</span>{" "}
                      {act.action}{" "}
                      <span className="font-semibold text-indigo-600">{act.target}</span>
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>{act.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Third Row: Recent Inquiries Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle>Recent Client Inquiries</CardTitle>
              <CardDescription>
                Inbound requests and partnership RFP submissions from prospective clients
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/inquiries")}
              className="h-8 text-xs text-indigo-600 hover:text-indigo-700"
            >
              View All ({inquiries.length})
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-slate-500 border-y border-slate-100 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Contact & Company</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Budget Range</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentInquiries.map((inq) => (
                    <tr
                      key={inq.id}
                      className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                      onClick={() => router.push("/inquiries")}
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{inq.name}</div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {inq.company} &bull; {inq.email}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-700">
                        {inq.service}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        {inq.budget}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {formatDate(inq.date)}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={inq.status} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push("/inquiries");
                          }}
                        >
                          Reply
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
