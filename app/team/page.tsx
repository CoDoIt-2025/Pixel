"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Users,
  Code,
  Sparkles,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAdminStore } from "@/lib/store";
import { TeamMember, Department, TeamStatus } from "@/types";
import { toast } from "sonner";

const memberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  department: z.enum([
    "Engineering",
    "Design",
    "Product",
    "Cloud & DevOps",
    "AI & Research",
  ]),
  skillsString: z.string().min(2, "Enter comma-separated skills (e.g. React, Python)"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(5, "Phone is required"),
  status: z.enum(["Active", "Away", "Offline"]),
  location: z.string().min(2, "Location is required"),
  bio: z.string().min(5, "Brief bio required"),
  avatar: z.string().url("Valid image URL required"),
});

type MemberFormData = z.infer<typeof memberSchema>;

const DEPARTMENTS = [
  "ALL",
  "Engineering",
  "Design",
  "Product",
  "Cloud & DevOps",
  "AI & Research",
];

export default function TeamPage() {
  const team = useAdminStore((state) => state.team);
  const addTeamMember = useAdminStore((state) => state.addTeamMember);
  const updateTeamMember = useAdminStore((state) => state.updateTeamMember);
  const deleteTeamMember = useAdminStore((state) => state.deleteTeamMember);

  const [activeDept, setActiveDept] = useState("ALL");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema) as any,
    defaultValues: {
      name: "",
      role: "",
      department: "Engineering",
      skillsString: "TypeScript, React, Node.js",
      email: "",
      phone: "+91 98450 00000",
      status: "Active",
      location: "Bengaluru, India",
      bio: "Software craftsman passionate about high scalability.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    },
  });

  const handleOpenAdd = () => {
    setEditingMember(null);
    reset({
      name: "",
      role: "",
      department: "Engineering",
      skillsString: "TypeScript, React, Node.js",
      email: "",
      phone: "+91 98450 00000",
      status: "Active",
      location: "Bengaluru, India",
      bio: "Software craftsman passionate about high scalability.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    reset({
      name: member.name,
      role: member.role,
      department: member.department,
      skillsString: member.skills.join(", "),
      email: member.email,
      phone: member.phone,
      status: member.status,
      location: member.location,
      bio: member.bio,
      avatar: member.avatar,
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: MemberFormData) => {
    const skillsArray = data.skillsString
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingMember) {
      updateTeamMember(editingMember.id, {
        name: data.name,
        role: data.role,
        department: data.department,
        skills: skillsArray,
        email: data.email,
        phone: data.phone,
        status: data.status,
        location: data.location,
        bio: data.bio,
        avatar: data.avatar,
      });
      toast.success(`Updated ${data.name}'s profile`);
    } else {
      addTeamMember({
        name: data.name,
        role: data.role,
        department: data.department,
        skills: skillsArray,
        email: data.email,
        phone: data.phone,
        status: data.status,
        location: data.location,
        bio: data.bio,
        avatar: data.avatar,
        joinDate: new Date().toISOString().split("T")[0],
      });
      toast.success(`Team member ${data.name} added`);
    }
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteTeamMember(deleteTarget.id);
      toast.success(`${deleteTarget.name} removed from team`);
      setDeleteTarget(null);
    }
  };

  const filteredTeam = useMemo(() => {
    return team.filter((m) => {
      const matchDept = activeDept === "ALL" || m.department === activeDept;
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase()) ||
        m.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      return matchDept && matchSearch;
    });
  }, [team, activeDept, search]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Team & Engineering Talent"
          description="Manage software engineers, designers, product managers, and cloud architects."
        >
          <Button size="sm" onClick={handleOpenAdd} className="shadow-xs">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Team Member
          </Button>
        </PageHeader>

        {/* Department Filter Tabs & Search Bar */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Horizontal Department Pill Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    activeDept === dept
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                  }`}
                >
                  {dept === "ALL" ? "All Departments" : dept}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search member, role, or skill..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Team Grid */}
        {filteredTeam.length === 0 ? (
          <EmptyState
            title="No team members found"
            description="No members match your current department and search filter. Try clearing filters."
            icon={Users}
            actionText="Show All Members"
            onAction={() => {
              setActiveDept("ALL");
              setSearch("");
            }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTeam.map((member) => (
              <Card
                key={member.id}
                className="hover:border-slate-300 transition-all group flex flex-col justify-between"
              >
                <CardContent className="p-5 space-y-4">
                  {/* Top: Avatar, Name, Status, Action */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-xs">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                            member.status === "Active"
                              ? "bg-emerald-500"
                              : member.status === "Away"
                              ? "bg-amber-400"
                              : "bg-slate-400"
                          }`}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                          {member.name}
                        </h3>
                        <p className="text-xs text-indigo-600 font-medium leading-tight">
                          {member.role}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {member.department}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="iconSm"
                        onClick={() => handleOpenEdit(member)}
                      >
                        <Edit className="h-3.5 w-3.5 text-slate-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="iconSm"
                        onClick={() => setDeleteTarget(member)}
                        className="hover:text-rose-600"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-slate-400 hover:text-rose-600" />
                      </Button>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Skills tags */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Core Skills
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Info Footer */}
                  <div className="pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="h-3 w-3 shrink-0 text-slate-400" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 truncate">
                      <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
                      <span className="truncate">{member.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </DialogTitle>
              <DialogDescription>
                Assign role, department, technical skillset, and communication channels.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-2">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Full Name</label>
                  <Input placeholder="Aarav Sharma" {...register("name")} />
                  {errors.name && (
                    <p className="text-xs text-rose-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Role Title</label>
                  <Input placeholder="Staff Frontend Engineer" {...register("role")} />
                  {errors.role && (
                    <p className="text-xs text-rose-600">{errors.role.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Department</label>
                  <select
                    className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:border-indigo-500"
                    {...register("department")}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="AI & Research">AI & Research</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Status</label>
                  <select
                    className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:border-indigo-500"
                    {...register("status")}
                  >
                    <option value="Active">Active</option>
                    <option value="Away">Away</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Skills (comma-separated)
                </label>
                <Input
                  placeholder="TypeScript, React, Next.js, GraphQL, PostgreSQL"
                  {...register("skillsString")}
                />
                {errors.skillsString && (
                  <p className="text-xs text-rose-600">{errors.skillsString.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email</label>
                  <Input placeholder="name@pixel.dev" {...register("email")} />
                  {errors.email && (
                    <p className="text-xs text-rose-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Phone</label>
                  <Input placeholder="+91 98450 00000" {...register("phone")} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Location</label>
                  <Input placeholder="Bengaluru, India" {...register("location")} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Avatar Image URL</label>
                  <Input placeholder="https://..." {...register("avatar")} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Bio</label>
                <Textarea
                  rows={2}
                  placeholder="Short professional summary..."
                  {...register("bio")}
                />
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm">
                  {editingMember ? "Save Changes" : "Add Member"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title="Remove Team Member?"
          description={`Are you sure you want to remove ${deleteTarget?.name}? They will be unassigned from any active projects.`}
          confirmText="Yes, Remove Member"
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdminLayout>
  );
}
