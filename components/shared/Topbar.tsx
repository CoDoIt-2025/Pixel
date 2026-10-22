"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Bell,
  Menu,
  Plus,
  User,
  Settings,
  LogOut,
  RotateCcw,
  CheckCheck,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CommandPalette } from "./CommandPalette";
import { logoutUser, getSessionUser, DEMO_USER } from "@/lib/auth";
import { useAdminStore } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onMobileMenuOpen: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "inquiry" | "project" | "review";
}

const mockNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "New High-Value Inquiry",
    description: "CredAI Financial requested a custom private LLM proposal ($75k - $100k).",
    time: "10 mins ago",
    read: false,
    type: "inquiry",
  },
  {
    id: "notif-2",
    title: "Milestone Completed",
    description: "PCI-DSS Hardening passed for Razorpay OmniChannel POS.",
    time: "45 mins ago",
    read: false,
    type: "project",
  },
  {
    id: "notif-3",
    title: "New Testimonial Received",
    description: "Patrick Collison (Stripe) submitted a 5-star review.",
    time: "2 hours ago",
    read: false,
    type: "review",
  },
  {
    id: "notif-4",
    title: "Traffic Milestone",
    description: "Website sessions exceeded 30,000 monthly unique visitors.",
    time: "1 day ago",
    read: true,
    type: "project",
  },
];

export function Topbar({ onMobileMenuOpen }: TopbarProps) {
  const router = useRouter();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const resetToDefaults = useAdminStore((state) => state.resetToDefaults);
  const user = getSessionUser() || DEMO_USER;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleLogout = () => {
    logoutUser();
    toast.info("Signed out successfully");
    router.push("/login");
  };

  const handleResetData = () => {
    resetToDefaults();
    toast.success("Demo dataset reset to initial state");
  };

  return (
    <>
      <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200/90 bg-white/95 backdrop-blur-md px-4 sm:px-6">
        {/* Left Side: Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuOpen}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
            aria-label="Open navigation drawer"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Quick Search Bar / Cmd+K Trigger */}
          <button
            onClick={() => setPaletteOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-slate-200/90 bg-slate-50/70 hover:bg-slate-100/80 px-3 py-1.5 text-xs text-slate-500 transition-colors w-44 sm:w-64 justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span>Search everything...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-500 shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: Quick Action, Notifications, User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Action Button */}
          <Button
            size="sm"
            onClick={() => router.push("/projects")}
            className="hidden sm:inline-flex"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Project
          </Button>

          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/90 bg-white text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4 text-slate-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <Badge variant="default" className="text-[10px] py-0 px-1.5">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Mark read
                  </button>
                )}
              </div>

              <div className="max-h-72 divide-y divide-slate-100 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "flex flex-col gap-1 p-3 text-xs transition-colors hover:bg-slate-50 cursor-pointer",
                      !item.read && "bg-indigo-50/30"
                    )}
                    onClick={() => {
                      setNotifications((prev) =>
                        prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
                      );
                      if (item.type === "inquiry") router.push("/inquiries");
                      if (item.type === "project") router.push("/projects");
                      if (item.type === "review") router.push("/testimonials");
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">{item.title}</span>
                      <span className="text-[10px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 p-2 text-center bg-slate-50">
                <button
                  onClick={() => router.push("/inquiries")}
                  className="text-xs text-indigo-600 font-medium hover:underline inline-flex items-center gap-1"
                >
                  View all inquiries & alerts
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Avatar Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-100 transition-colors cursor-pointer select-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-800 leading-none">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight mt-0.5">
                    {user.role}
                  </span>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <User className="h-4 w-4 text-slate-500 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="h-4 w-4 text-slate-500 mr-2" />
                Admin Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleResetData}>
                <RotateCcw className="h-4 w-4 text-amber-500 mr-2" />
                Reset Demo Data
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-rose-600 focus:text-rose-600">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Global Command Palette */}
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  );
}
