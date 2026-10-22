"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  FolderGit2,
  CheckCircle2,
  Calendar,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAdminStore } from "@/lib/store";
import { Project, ProjectStatus, ProjectCategory } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  code: z.string().min(2, "Project code required (e.g. PX-109)"),
  client: z.string().min(2, "Client name is required"),
  category: z.enum([
    "Web Development",
    "Mobile Apps",
    "UI/UX Design",
    "Cloud Architecture",
    "AI Solutions",
  ]),
  status: z.enum(["Planning", "In Progress", "Review", "Completed"]),
  budget: z.coerce.number().min(1000, "Budget must be at least $1,000"),
  deadline: z.string().min(1, "Deadline is required"),
  progress: z.coerce.number().min(0).max(100, "Progress must be 0-100"),
  description: z.string().min(10, "Please provide a brief project summary"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function ProjectsPage() {
  const router = useRouter();
  const projects = useAdminStore((state) => state.projects);
  const addProject = useAdminStore((state) => state.addProject);
  const updateProject = useAdminStore((state) => state.updateProject);
  const deleteProject = useAdminStore((state) => state.deleteProject);

  // Filters & State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"deadline" | "budget" | "progress" | "name">("deadline");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema) as any,
    defaultValues: {
      name: "",
      code: "PX-117",
      client: "",
      category: "Web Development",
      status: "In Progress",
      budget: 85000,
      deadline: "2027-01-31",
      progress: 25,
      description: "",
    },
  });

  // Open modal for edit
  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    reset({
      name: project.name,
      code: project.code,
      client: project.client,
      category: project.category,
      status: project.status,
      budget: project.budget,
      deadline: project.deadline,
      progress: project.progress,
      description: project.description,
    });
    setIsAddOpen(true);
  };

  // Open modal for add
  const handleOpenAdd = () => {
    setEditingProject(null);
    reset({
      name: "",
      code: `PX-${Math.floor(100 + Math.random() * 900)}`,
      client: "",
      category: "Web Development",
      status: "Planning",
      budget: 75000,
      deadline: "2027-02-28",
      progress: 0,
      description: "",
    });
    setIsAddOpen(true);
  };

  const onSubmit = (data: ProjectFormData) => {
    if (editingProject) {
      updateProject(editingProject.id, {
        name: data.name,
        code: data.code,
        client: data.client,
        category: data.category as ProjectCategory,
        status: data.status as ProjectStatus,
        budget: data.budget,
        deadline: data.deadline,
        progress: data.progress,
        description: data.description,
      });
      toast.success(`Project '${data.name}' updated`);
    } else {
      addProject({
        name: data.name,
        code: data.code,
        client: data.client,
        clientId: `cli-${Date.now()}`,
        category: data.category as ProjectCategory,
        status: data.status as ProjectStatus,
        budget: data.budget,
        spent: Math.round(data.budget * (data.progress / 100)),
        deadline: data.deadline,
        startDate: new Date().toISOString().split("T")[0],
        progress: data.progress,
        description: data.description,
        team: [
          {
            id: "tm-1",
            name: "Aarav Sharma",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            role: "Tech Lead",
          },
          {
            id: "tm-2",
            name: "Priya Nair",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
            role: "Architect",
          },
        ],
        milestones: [
          { id: "m-1", title: "Project Initiation & RFC", completed: true, dueDate: data.deadline },
          { id: "m-2", title: "Core Architecture Delivery", completed: false, dueDate: data.deadline },
        ],
        tasks: [
          { id: "t-1", title: "Architecture sign-off", status: "Done", assignee: "Aarav Sharma" },
          { id: "t-2", title: "Setup staging environment", status: "In Progress", assignee: "Priya Nair" },
        ],
      });
      toast.success(`Project '${data.name}' created successfully`);
    }

    setIsAddOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteProject(deleteTarget.id);
      toast.success(`Project '${deleteTarget.name}' deleted`);
      setDeleteTarget(null);
    }
  };

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.client.toLowerCase().includes(search.toLowerCase()) ||
        p.code.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
      const matchCategory = categoryFilter === "ALL" || p.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    }).sort((a, b) => {
      if (sortBy === "deadline") return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      if (sortBy === "budget") return b.budget - a.budget;
      if (sortBy === "progress") return b.progress - a.progress;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [projects, search, statusFilter, categoryFilter, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProjects.length / pageSize) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, currentPage, pageSize]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <PageHeader
          title="Projects Directory"
          description="Manage client software deliverables, milestones, budgets, and engineering teams."
        >
          <Button size="sm" onClick={handleOpenAdd} className="shadow-xs">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Project
          </Button>
        </PageHeader>

        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by project, client, or PX code..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 h-9 text-xs"
            />
          </div>

          {/* Filters & Sorters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <Select
              value={statusFilter}
              onValueChange={(val) => {
                setStatusFilter(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[130px] h-9 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select
              value={categoryFilter}
              onValueChange={(val) => {
                setCategoryFilter(val);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[145px] h-9 text-xs">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Mobile Apps">Mobile Apps</SelectItem>
                <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                <SelectItem value="Cloud Architecture">Cloud Architecture</SelectItem>
                <SelectItem value="AI Solutions">AI Solutions</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select
              value={sortBy}
              onValueChange={(val: any) => setSortBy(val)}
            >
              <SelectTrigger className="w-[135px] h-9 text-xs">
                <ArrowUpDown className="h-3 w-3 mr-1 text-slate-400" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">Deadline</SelectItem>
                <SelectItem value="budget">Highest Budget</SelectItem>
                <SelectItem value="progress">Progress %</SelectItem>
                <SelectItem value="name">Alphabetical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table Card */}
        <Card className="overflow-hidden">
          {filteredProjects.length === 0 ? (
            <EmptyState
              title="No projects found"
              description="No projects match your current search query or filter parameters. Try clearing the filters."
              icon={FolderGit2}
              actionText="Reset Filters"
              onAction={() => {
                setSearch("");
                setStatusFilter("ALL");
                setCategoryFilter("ALL");
              }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-slate-500 border-b border-slate-100 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Project Name & Code</th>
                    <th className="py-3.5 px-4">Client</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Budget</th>
                    <th className="py-3.5 px-4">Deadline</th>
                    <th className="py-3.5 px-4 min-w-[130px]">Progress</th>
                    <th className="py-3.5 px-4">Assigned Team</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                      onClick={() => router.push(`/projects/${project.id}`)}
                    >
                      {/* Name & Code */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100/80 shrink-0">
                            {project.code}
                          </span>
                          <span className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {project.name}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {project.category}
                        </div>
                      </td>

                      {/* Client */}
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {project.client}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <StatusBadge status={project.status} size="sm" />
                      </td>

                      {/* Budget */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {formatCurrency(project.budget)}
                      </td>

                      {/* Deadline */}
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          <span>{formatDate(project.deadline)}</span>
                        </div>
                      </td>

                      {/* Progress bar */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-medium text-slate-600">
                              {project.progress}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Team Avatars */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center -space-x-2">
                          {project.team.slice(0, 3).map((member) => (
                            <Avatar
                              key={member.id}
                              className="h-7 w-7 border-2 border-white ring-1 ring-slate-100"
                              title={`${member.name} (${member.role})`}
                            >
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                          {project.team.length > 3 && (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 border-2 border-white text-[10px] font-semibold text-slate-600">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Row Actions Menu */}
                      <td className="py-3.5 px-4 text-right">
                        <div
                          className="flex items-center justify-end"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                                aria-label="Open project actions"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem
                                onClick={() => router.push(`/projects/${project.id}`)}
                              >
                                <Eye className="h-4 w-4 mr-2 text-slate-500" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleOpenEdit(project)}
                              >
                                <Edit className="h-4 w-4 mr-2 text-indigo-600" />
                                Edit Project
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => setDeleteTarget(project)}
                                className="text-rose-600 focus:text-rose-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Bar */}
          {filteredProjects.length > 0 && (
            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
              <div>
                Showing{" "}
                <span className="font-semibold text-slate-800">
                  {(currentPage - 1) * pageSize + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-slate-800">
                  {Math.min(currentPage * pageSize, filteredProjects.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-800">
                  {filteredProjects.length}
                </span>{" "}
                projects
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="iconSm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <span className="px-2 font-medium text-slate-700">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="iconSm"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Add/Edit Project Modal */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="sm:max-w-[560px]">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? "Edit Project" : "Add New Client Project"}
              </DialogTitle>
              <DialogDescription>
                Configure project scope, assign budget, set timeline, and define deliverables.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Project Name
                  </label>
                  <Input
                    placeholder="e.g. NextGen Mobile Checkout"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Project Code
                  </label>
                  <Input placeholder="PX-118" {...register("code")} />
                  {errors.code && (
                    <p className="text-xs text-rose-600">{errors.code.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Client Organization
                  </label>
                  <Input
                    placeholder="e.g. Stripe Inc"
                    {...register("client")}
                  />
                  {errors.client && (
                    <p className="text-xs text-rose-600">{errors.client.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Category
                  </label>
                  <select
                    className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:border-indigo-500"
                    {...register("category")}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Cloud Architecture">Cloud Architecture</option>
                    <option value="AI Solutions">AI Solutions</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Status
                  </label>
                  <select
                    className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:border-indigo-500"
                    {...register("status")}
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Budget ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="85000"
                    {...register("budget")}
                  />
                  {errors.budget && (
                    <p className="text-xs text-rose-600">{errors.budget.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Progress (%)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="45"
                    {...register("progress")}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Target Deadline
                </label>
                <Input type="date" {...register("deadline")} />
                {errors.deadline && (
                  <p className="text-xs text-rose-600">{errors.deadline.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Project Description & Technical Scope
                </label>
                <Textarea
                  rows={3}
                  placeholder="Detail architecture milestones, deliverables, and service objectives..."
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-xs text-rose-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  {editingProject ? "Save Changes" : "Create Project"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title="Delete Project?"
          description={`Are you sure you want to delete '${deleteTarget?.name}'? All sprint history, milestones, and task logs will be permanently removed.`}
          confirmText="Yes, Delete Project"
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdminLayout>
  );
}
