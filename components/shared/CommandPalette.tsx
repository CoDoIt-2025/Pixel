"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
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
  PlusCircle,
  Search,
  LogOut,
  X,
} from "lucide-react";
import { logoutUser } from "@/lib/auth";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in-0 duration-150">
      <div
        className="w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <Command className="w-full">
          <div className="flex items-center border-b border-slate-100 px-3 py-2">
            <Search className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
            <Command.Input
              placeholder="Type a command or search pages... (e.g. projects, team)"
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              autoFocus
            />
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 text-sm text-slate-700">
            <Command.Empty className="py-6 text-center text-xs text-slate-500">
              No matching results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-xs font-semibold text-slate-400 px-2 py-1.5 uppercase tracking-wider">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/dashboard"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <LayoutDashboard className="h-4 w-4 text-indigo-600" />
                <span>Dashboard Overview</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/projects"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <FolderGit2 className="h-4 w-4 text-indigo-600" />
                <span>Projects Directory</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/clients"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <Building2 className="h-4 w-4 text-indigo-600" />
                <span>Clients & Accounts</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/team"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <Users className="h-4 w-4 text-indigo-600" />
                <span>Team & Roles</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/services"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <Layers className="h-4 w-4 text-indigo-600" />
                <span>Services Catalog</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/blog"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <FileText className="h-4 w-4 text-indigo-600" />
                <span>Blog & Articles</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/inquiries"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <Mail className="h-4 w-4 text-indigo-600" />
                <span>Client Inquiries</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/testimonials"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <Star className="h-4 w-4 text-indigo-600" />
                <span>Testimonials & Reviews</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/analytics"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <BarChart3 className="h-4 w-4 text-indigo-600" />
                <span>Traffic & Analytics</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/settings"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <Settings className="h-4 w-4 text-indigo-600" />
                <span>Admin Settings</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Quick Actions" className="text-xs font-semibold text-slate-400 px-2 py-1.5 uppercase tracking-wider mt-2 border-t border-slate-100 pt-2">
              <Command.Item
                onSelect={() => runCommand(() => router.push("/projects"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <PlusCircle className="h-4 w-4 text-emerald-600" />
                <span>Create New Project</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/blog/new"))}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors"
              >
                <FileText className="h-4 w-4 text-emerald-600" />
                <span>Write New Blog Post</span>
              </Command.Item>
              <Command.Item
                onSelect={() =>
                  runCommand(() => {
                    logoutUser();
                    router.push("/login");
                  })
                }
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer hover:bg-rose-50 text-rose-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out of Pixel</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between border-t border-slate-100 px-3 py-1.5 text-[11px] text-slate-400 bg-slate-50">
            <span>Navigate with &uarr; &darr; keys</span>
            <span>Esc to close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
