"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  Building2,
  Check,
  AlertCircle,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAdminStore } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

export default function ProjectDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const projects = useAdminStore((state) => state.projects);
  const updateProject = useAdminStore((state) => state.updateProject);
  const deleteProject = useAdminStore((state) => state.deleteProject);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="h-10 w-10 text-amber-500 mb-3" />
          <h2 className="text-xl font-bold text-slate-900">Project Not Found</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-md">
            The project you requested does not exist or may have been removed.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => router.push("/projects")}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Projects
          </Button>
        </div>
      </AdminLayout>
    );
  }

  // Toggle milestone completion
  const handleToggleMilestone = (milestoneId: string) => {
    const updatedMilestones = project.milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );

    const completedCount = updatedMilestones.filter((m) => m.completed).length;
    const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);

    updateProject(project.id, {
      milestones: updatedMilestones,
      progress: newProgress,
      status: newProgress === 100 ? "Completed" : project.status,
    });

    toast.success("Milestone updated");
  };

  const handleMarkComplete = () => {
    updateProject(project.id, {
      status: "Completed",
      progress: 100,
      spent: project.budget,
    });
    toast.success("Project marked as Completed!");
  };

  const handleDelete = () => {
    deleteProject(project.id);
    toast.success("Project removed");
    router.push("/projects");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Back Link & Header */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Projects
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                {project.code}
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {project.name}
              </h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="text-sm text-slate-500">
              Client: <span className="font-semibold text-slate-700">{project.client}</span> &bull; Category:{" "}
              <span className="font-medium text-slate-700">{project.category}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {project.status !== "Completed" && (
              <Button size="sm" onClick={handleMarkComplete}>
                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                Mark Completed
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirmOpen(true)}
              className="text-rose-600 hover:text-rose-700 hover:bg-rose-50"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              Delete
            </Button>
          </div>
        </div>

        {/* 4 Key Metrics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase">Budget</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">
                  {formatCurrency(project.budget)}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Spent: {formatCurrency(project.spent)}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <DollarSign className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase">Progress</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">
                  {project.progress}%
                </p>
                <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase">Deadline</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">
                  {formatDate(project.deadline)}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Started: {formatDate(project.startDate)}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                <Calendar className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase">Assigned Team</p>
                <p className="text-xl font-bold text-slate-900 mt-0.5">
                  {project.team.length} Engineers
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Active Sprint</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
                <Users className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Technical Scope &amp; Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div>
                  <CardTitle>Project Milestones &amp; Deliverables</CardTitle>
                  <CardDescription>
                    Click any milestone to toggle completion status and recalculate sprint progress
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {project.milestones.filter((m) => m.completed).length} of{" "}
                  {project.milestones.length} Done
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {project.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    onClick={() => handleToggleMilestone(milestone.id)}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-100/70 transition-colors cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                          milestone.completed
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {milestone.completed && <Check className="h-3.5 w-3.5" />}
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          milestone.completed
                            ? "line-through text-slate-400"
                            : "text-slate-800"
                        }`}
                      >
                        {milestone.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="h-3 w-3" />
                      <span>Due {formatDate(milestone.dueDate)}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {project.tasks && project.tasks.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Active Technical Tasks</CardTitle>
                  <CardDescription>
                    Granular engineering task assignments and completion tracking
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {project.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between px-6 py-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`h-2 w-2 rounded-full ${
                              task.status === "Done"
                                ? "bg-emerald-500"
                                : task.status === "In Progress"
                                ? "bg-indigo-500"
                                : "bg-amber-400"
                            }`}
                          />
                          <span className="font-medium text-slate-800">
                            {task.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500">
                            Assignee:{" "}
                            <span className="font-semibold text-slate-700">
                              {task.assignee}
                            </span>
                          </span>
                          <StatusBadge status={task.status} size="sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6 lg:col-span-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Assigned Team</CardTitle>
                <CardDescription>Engineers &amp; designers dedicated to this project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.team.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 leading-tight">
                          {member.name}
                        </p>
                        <p className="text-[11px] text-slate-500">{member.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      Core
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Client Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-slate-200 text-indigo-600 font-bold shadow-2xs">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{project.client}</p>
                    <p className="text-[11px] text-slate-500">Enterprise Client Partner</p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => router.push("/clients")}
                  >
                    View All Clients &amp; Accounts
                    <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <ConfirmDialog
          open={deleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          title="Delete Project?"
          description={`Permanently delete '${project.name}' and all associated tasks and sprint milestones?`}
          onConfirm={handleDelete}
        />
      </div>
    </AdminLayout>
  );
}
