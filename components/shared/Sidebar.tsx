"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Users,
  Building2,
  Layers,
  FileText,
  Mail,
  Star,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";
import { PixelLogo } from "./PixelLogo";
import { cn } from "@/lib/utils";
import { useAdminStore } from "@/lib/store";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeKey?: "inquiries" | "testimonials";
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Projects", href: "/projects", icon: FolderGit2 },
      { label: "Clients", href: "/clients", icon: Building2 },
      { label: "Team", href: "/team", icon: Users },
    ],
  },
  {
    group: "Business & Content",
    items: [
      { label: "Services", href: "/services", icon: Layers },
      { label: "Blog / Posts", href: "/blog", icon: FileText },
      { label: "Inquiries", href: "/inquiries", icon: Mail, badgeKey: "inquiries" },
      { label: "Testimonials", href: "/testimonials", icon: Star, badgeKey: "testimonials" },
    ],
  },
  {
    group: "Analytics & Config",
    items: [
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const collapsed = useAdminStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useAdminStore((state) => state.toggleSidebar);
  const inquiries = useAdminStore((state) => state.inquiries);
  const testimonials = useAdminStore((state) => state.testimonials);

  // Badge counts
  const newInquiriesCount = inquiries.filter((i) => i.status === "New").length;
  const pendingTestimonialsCount = testimonials.filter((t) => t.status === "Pending").length;

  const renderContent = (isMobile = false) => (
    <div className="flex h-full flex-col justify-between">
      <div>
        {/* Logo and collapse trigger */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-100">
          <PixelLogo collapsed={!isMobile && collapsed} />
          {isMobile ? (
            <button
              onClick={onMobileClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200/80 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {/* Navigation list */}
        <div className="space-y-6 px-3 py-4">
          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              {(!collapsed || isMobile) && (
                <h4 className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {grp.group}
                </h4>
              )}
              <div className="space-y-0.5">
                {grp.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  const Icon = item.icon;

                  let badgeCount = 0;
                  if (item.badgeKey === "inquiries") badgeCount = newInquiriesCount;
                  if (item.badgeKey === "testimonials") badgeCount = pendingTestimonialsCount;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={isMobile ? onMobileClose : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150 select-none",
                        isActive
                          ? "bg-indigo-50/80 text-indigo-700 shadow-xs font-semibold"
                          : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                      )}
                      title={collapsed && !isMobile ? item.label : undefined}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-indigo-600" />
                      )}

                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive
                            ? "text-indigo-600"
                            : "text-slate-400 group-hover:text-slate-600"
                        )}
                      />

                      {(!collapsed || isMobile) && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}

                      {(!collapsed || isMobile) && badgeCount > 0 && (
                        <span className="rounded-full bg-indigo-600 px-1.5 py-0.2 text-[10px] font-bold text-white">
                          {badgeCount}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / System Status card */}
      {(!collapsed || isMobile) && (
        <div className="p-3 border-t border-slate-100">
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-800">
                Pixel Studio v2.4
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 leading-tight">
              Production edge systems operational.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex fixed left-0 top-0 bottom-0 z-30 flex-col border-r border-slate-200/90 bg-white transition-all duration-300 ease-in-out",
          collapsed ? "w-[72px]" : "w-[240px]"
        )}
      >
        {renderContent(false)}
      </aside>

      {/* Mobile Drawer Backdrop & Panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
          />
          <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-2xl flex flex-col z-50">
            {renderContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
