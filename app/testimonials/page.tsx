"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Star,
  Plus,
  Search,
  Check,
  X,
  Trash2,
  Quote,
  Building2,
  FolderGit2,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAdminStore } from "@/lib/store";
import { Testimonial, TestimonialStatus } from "@/types";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

const testimonialSchema = z.object({
  clientName: z.string().min(2, "Client name is required"),
  clientRole: z.string().min(2, "Client role is required"),
  company: z.string().min(2, "Company is required"),
  avatar: z.string().url("Valid avatar URL required"),
  rating: z.coerce.number().min(1).max(5),
  quote: z.string().min(15, "Quote must be at least 15 characters"),
  project: z.string().min(2, "Referenced project is required"),
  status: z.enum(["Pending", "Approved", "Rejected"]),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

export default function TestimonialsPage() {
  const testimonials = useAdminStore((state) => state.testimonials);
  const addTestimonial = useAdminStore((state) => state.addTestimonial);
  const updateTestimonialStatus = useAdminStore((state) => state.updateTestimonialStatus);
  const deleteTestimonial = useAdminStore((state) => state.deleteTestimonial);

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema) as any,
    defaultValues: {
      clientName: "",
      clientRole: "VP of Engineering",
      company: "",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      quote: "",
      project: "Custom Web Application",
      status: "Approved",
    },
  });

  const handleOpenAdd = () => {
    reset({
      clientName: "",
      clientRole: "CTO / Head of Engineering",
      company: "",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      rating: 5,
      quote: "",
      project: "Enterprise Core Migration",
      status: "Approved",
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: TestimonialFormData) => {
    addTestimonial(data);
    toast.success(`Testimonial from ${data.clientName} added`);
    setIsModalOpen(false);
  };

  const handleSetStatus = (id: string, status: TestimonialStatus, clientName: string) => {
    updateTestimonialStatus(id, status);
    toast.success(`Testimonial from ${clientName} marked as ${status}`);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteTestimonial(deleteTarget.id);
      toast.success("Testimonial deleted");
      setDeleteTarget(null);
    }
  };

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => {
      const matchStatus = statusFilter === "ALL" || t.status === statusFilter;
      const matchSearch =
        t.clientName.toLowerCase().includes(search.toLowerCase()) ||
        t.company.toLowerCase().includes(search.toLowerCase()) ||
        t.project.toLowerCase().includes(search.toLowerCase()) ||
        t.quote.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [testimonials, statusFilter, search]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Testimonials & Client Endorsements"
          description="Manage published reviews, executive quotes, star ratings, and website showcase approvals."
        >
          <Button size="sm" onClick={handleOpenAdd} className="shadow-xs">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Testimonial
          </Button>
        </PageHeader>

        {/* Filter and Search Bar */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {["ALL", "Approved", "Pending", "Rejected"].map((tab) => {
              const count =
                tab === "ALL"
                  ? testimonials.length
                  : testimonials.filter((t) => t.status === tab).length;

              return (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    statusFilter === tab
                      ? "bg-indigo-600 text-white shadow-xs font-semibold"
                      : "bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900"
                  }`}
                >
                  <span>{tab === "ALL" ? "All Reviews" : tab}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      statusFilter === tab
                        ? "bg-indigo-700 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by client, company, or quote..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        {filteredTestimonials.length === 0 ? (
          <EmptyState
            title="No testimonials found"
            description="No reviews match your selected filter criteria."
            icon={Star}
            actionText="Reset Filter"
            onAction={() => {
              setStatusFilter("ALL");
              setSearch("");
            }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredTestimonials.map((item) => (
              <Card
                key={item.id}
                className="hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <CardContent className="p-5 space-y-4">
                  {/* Top: Star Ratings & Status Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= item.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <StatusBadge status={item.status} size="sm" />
                  </div>

                  {/* Quote Body */}
                  <div className="relative">
                    <Quote className="h-6 w-6 text-slate-200 absolute -top-1 -left-1 opacity-50 -z-1" />
                    <p className="text-xs text-slate-700 leading-relaxed italic relative z-10 pl-2">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Project reference */}
                  <div className="rounded-lg bg-slate-50 p-2 text-[11px] text-slate-500 flex items-center gap-1.5 border border-slate-100">
                    <FolderGit2 className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                    <span className="truncate font-medium">{item.project}</span>
                  </div>

                  {/* Client Info & Action Controls */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={item.avatar} alt={item.clientName} />
                        <AvatarFallback>{item.clientName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-900 leading-tight">
                          {item.clientName}
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          {item.clientRole}, {item.company}
                        </p>
                      </div>
                    </div>

                    {/* Quick Approve / Reject / Delete buttons */}
                    <div className="flex items-center gap-1">
                      {item.status !== "Approved" && (
                        <button
                          onClick={() =>
                            handleSetStatus(item.id, "Approved", item.clientName)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer"
                          title="Approve Testimonial"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {item.status !== "Rejected" && (
                        <button
                          onClick={() =>
                            handleSetStatus(item.id, "Rejected", item.clientName)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-colors cursor-pointer"
                          title="Reject Testimonial"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteTarget(item)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Testimonial Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Client Testimonial</DialogTitle>
              <DialogDescription>
                Record client praise, quote attribution, and star rating.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 pt-2">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Client Name</label>
                  <Input placeholder="Patrick Collison" {...register("clientName")} />
                  {errors.clientName && (
                    <p className="text-xs text-rose-600">{errors.clientName.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Company</label>
                  <Input placeholder="Stripe" {...register("company")} />
                  {errors.company && (
                    <p className="text-xs text-rose-600">{errors.company.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Role Title</label>
                  <Input placeholder="CEO & Co-Founder" {...register("clientRole")} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Star Rating</label>
                  <select
                    className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:border-indigo-500"
                    {...register("rating")}
                  >
                    <option value="5">★★★★★ (5 Stars)</option>
                    <option value="4">★★★★☆ (4 Stars)</option>
                    <option value="3">★★★☆☆ (3 Stars)</option>
                    <option value="2">★★☆☆☆ (2 Stars)</option>
                    <option value="1">★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Referenced Project
                </label>
                <Input placeholder="Stripe Unified Billing Portal" {...register("project")} />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Avatar Image URL</label>
                <Input placeholder="https://..." {...register("avatar")} />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Testimonial Quote</label>
                <Textarea
                  rows={3}
                  placeholder="The Pixel engineering team delivered outstanding speed and zero production regressions..."
                  {...register("quote")}
                />
                {errors.quote && (
                  <p className="text-xs text-rose-600">{errors.quote.message}</p>
                )}
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
                  Save Testimonial
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title="Delete Testimonial?"
          description={`Are you sure you want to remove the testimonial from ${deleteTarget?.clientName}?`}
          confirmText="Yes, Delete"
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdminLayout>
  );
}
