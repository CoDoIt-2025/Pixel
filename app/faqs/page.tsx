"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  HelpCircle,
  Plus,
  Search,
  Check,
  X,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  Sparkles,
  RefreshCw,
  Eye,
  EyeOff,
  Filter,
  CheckCircle2,
  Layers,
  FileQuestion,
  BookOpen,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAdminStore } from "@/lib/store";
import { FAQ } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CATEGORY_OPTIONS = [
  "General",
  "Pricing & Retainers",
  "Technical Stack",
  "IP & Legal",
  "Process & Delivery",
  "Support & SLA",
];

const faqSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  order: z.coerce.number().min(0, "Order must be 0 or higher"),
  isActive: z.boolean(),
});

type FAQFormData = z.infer<typeof faqSchema>;

export default function FAQsPage() {
  const faqs = useAdminStore((state) => state.faqs) || [];
  const addFAQ = useAdminStore((state) => state.addFAQ);
  const updateFAQ = useAdminStore((state) => state.updateFAQ);
  const toggleFAQStatus = useAdminStore((state) => state.toggleFAQStatus);
  const deleteFAQ = useAdminStore((state) => state.deleteFAQ);
  const reorderFAQs = useAdminStore((state) => state.reorderFAQs);
  const syncWithBackend = useAdminStore((state) => state.syncWithBackend);
  const backendConnected = useAdminStore((state) => state.backendConnected);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FAQ | null>(null);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [isSyncing, setIsSyncing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FAQFormData>({
    resolver: zodResolver(faqSchema) as any,
    defaultValues: {
      question: "",
      answer: "",
      category: "General",
      order: (faqs.length || 0) + 1,
      isActive: true,
    },
  });

  const isActiveWatch = watch("isActive");

  // Dynamic list of unique categories
  const categories = useMemo(() => {
    const set = new Set<string>(CATEGORY_OPTIONS);
    faqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set);
  }, [faqs]);

  // Filtered & sorted FAQs
  const filteredFAQs = useMemo(() => {
    return faqs
      .filter((faq) => {
        const matchesCategory =
          selectedCategory === "ALL" || faq.category === selectedCategory;
        const matchesStatus =
          statusFilter === "ALL" ||
          (statusFilter === "ACTIVE" && faq.isActive) ||
          (statusFilter === "INACTIVE" && !faq.isActive);
        const matchesSearch =
          search.trim() === "" ||
          faq.question.toLowerCase().includes(search.toLowerCase()) ||
          faq.answer.toLowerCase().includes(search.toLowerCase()) ||
          faq.category.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesStatus && matchesSearch;
      })
      .sort((a, b) => a.order - b.order);
  }, [faqs, selectedCategory, statusFilter, search]);

  // Statistics
  const totalCount = faqs.length;
  const activeCount = faqs.filter((f) => f.isActive).length;
  const inactiveCount = totalCount - activeCount;

  // Handlers
  const handleOpenAdd = () => {
    setEditingFAQ(null);
    reset({
      question: "",
      answer: "",
      category: "General",
      order: faqs.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQ) => {
    setEditingFAQ(faq);
    reset({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
      isActive: faq.isActive,
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: FAQFormData) => {
    if (editingFAQ) {
      updateFAQ(editingFAQ.id, data);
      toast.success("FAQ updated successfully");
    } else {
      addFAQ(data);
      toast.success("New FAQ published to backend");
    }
    setIsModalOpen(false);
    setEditingFAQ(null);
  };

  const handleToggle = (id: string, current: boolean) => {
    toggleFAQStatus(id);
    toast.success(current ? "FAQ marked as hidden" : "FAQ marked as active");
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteFAQ(deleteTarget.id);
    toast.success("FAQ item deleted permanently");
    setDeleteTarget(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= filteredFAQs.length) return;

    const newList = [...faqs];
    const currentItem = filteredFAQs[index];
    const swapItem = filteredFAQs[targetIndex];

    const currentOrder = currentItem.order;
    const swapOrder = swapItem.order;

    updateFAQ(currentItem.id, { order: swapOrder });
    updateFAQ(swapItem.id, { order: currentOrder });

    toast.success("Order updated");
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await syncWithBackend();
      toast.success("Synced FAQs with SQLite database");
    } catch {
      toast.error("Failed to sync with backend");
    } finally {
      setIsSyncing(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Pricing & Retainers":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Technical Stack":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/60";
      case "IP & Legal":
        return "bg-purple-50 text-purple-700 border-purple-200/60";
      case "Process & Delivery":
        return "bg-amber-50 text-amber-700 border-amber-200/60";
      case "Support & SLA":
        return "bg-sky-50 text-sky-700 border-sky-200/60";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <PageHeader
          title="FAQ Knowledgebase"
          description="Manage client-facing frequently asked questions, ordering, and real-time backend synchronization."
          breadcrumbs={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Business & Content" },
            { label: "FAQs" },
          ]}
        >
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSync}
              disabled={isSyncing}
              className="gap-2"
            >
              <RefreshCw className={cn("h-4 w-4", isSyncing && "animate-spin")} />
              <span>{isSyncing ? "Syncing..." : "Sync Database"}</span>
            </Button>
            <Button
              size="sm"
              onClick={handleOpenAdd}
              className="gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Add FAQ</span>
            </Button>
          </div>
        </PageHeader>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Questions"
            value={totalCount}
            icon={FileQuestion}
            iconColor="text-indigo-600 bg-indigo-50 border-indigo-100"
          />
          <StatCard
            title="Active / Published"
            value={activeCount}
            icon={CheckCircle2}
            iconColor="text-emerald-600 bg-emerald-50 border-emerald-100"
          />
          <StatCard
            title="Inactive / Draft"
            value={inactiveCount}
            icon={EyeOff}
            iconColor="text-slate-600 bg-slate-100 border-slate-200"
          />
          <StatCard
            title="Categories"
            value={categories.length}
            icon={Layers}
            iconColor="text-purple-600 bg-purple-50 border-purple-100"
          />
        </div>

        {/* Search & Filters */}
        <Card className="border-slate-200/80 shadow-xs">
          <CardContent className="p-4 space-y-3">
            <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search questions, answers, or categories..."
                  className="pl-9 pr-9 h-9 text-sm border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Status filter pills */}
              <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-lg border border-slate-200/60 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setStatusFilter("ALL")}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer",
                    statusFilter === "ALL"
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  All ({totalCount})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("ACTIVE")}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer",
                    statusFilter === "ACTIVE"
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Active ({activeCount})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("INACTIVE")}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer",
                    statusFilter === "INACTIVE"
                      ? "bg-white text-slate-900 shadow-2xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Hidden ({inactiveCount})
                </button>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-medium mr-1.5 flex items-center gap-1 shrink-0">
                <Filter className="h-3 w-3" /> Category:
              </span>
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer",
                  selectedCategory === "ALL"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                )}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer",
                    selectedCategory === cat
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQs List */}
        {filteredFAQs.length === 0 ? (
          <EmptyState
            title="No matching FAQs found"
            description={
              search || selectedCategory !== "ALL" || statusFilter !== "ALL"
                ? "Try clearing your filters or search query to find questions."
                : "Get started by creating your first frequently asked question."
            }
            icon={HelpCircle}
            actionText="Add New FAQ"
            onAction={handleOpenAdd}
          />
        ) : (
          <div className="space-y-3">
            {filteredFAQs.map((faq, index) => {
              const isExpanded = !!expandedIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className={cn(
                    "group rounded-xl border bg-white transition-all shadow-2xs hover:shadow-xs",
                    faq.isActive
                      ? "border-slate-200/80 hover:border-slate-300"
                      : "border-slate-200/60 bg-slate-50/40 opacity-75"
                  )}
                >
                  {/* Item Header */}
                  <div className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                      {/* Order indicator & Reorder buttons */}
                      <div className="flex flex-col sm:flex-row items-center gap-1 text-slate-400 shrink-0">
                        <span className="text-xs font-semibold text-slate-400 w-6 text-center tabular-nums">
                          #{faq.order}
                        </span>
                        <div className="flex sm:flex-col gap-0.5">
                          <button
                            type="button"
                            onClick={() => handleMove(index, "up")}
                            disabled={index === 0}
                            title="Move up in order"
                            className="p-1 rounded hover:bg-slate-100 disabled:opacity-20 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMove(index, "down")}
                            disabled={index === filteredFAQs.length - 1}
                            title="Move down in order"
                            className="p-1 rounded hover:bg-slate-100 disabled:opacity-20 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Question info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={cn(
                              "text-[11px] font-medium px-2 py-0.5 rounded-full border",
                              getCategoryColor(faq.category)
                            )}
                          >
                            {faq.category}
                          </span>
                          {!faq.isActive && (
                            <Badge variant="outline" className="text-[10px] text-slate-500 bg-slate-100">
                              Draft / Hidden
                            </Badge>
                          )}
                          <span className="text-[11px] text-slate-400 font-mono">
                            {faq.id}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleExpand(faq.id)}
                          className="text-left font-semibold text-sm sm:text-base text-slate-900 hover:text-indigo-600 transition-colors block w-full focus:outline-none"
                        >
                          {faq.question}
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      {/* Active toggle */}
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={faq.isActive}
                          onCheckedChange={() => handleToggle(faq.id, faq.isActive)}
                          id={`switch-${faq.id}`}
                        />
                      </div>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(faq)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-colors cursor-pointer"
                        title="Edit FAQ"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(faq)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors cursor-pointer"
                        title="Delete FAQ"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {/* Expand / Collapse toggle */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(faq.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        title={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Answer Body */}
                  {isExpanded && (
                    <div className="px-4 pb-4 sm:px-6 sm:pb-5 pt-1 border-t border-slate-100 bg-slate-50/50 rounded-b-xl animate-in fade-in-0 duration-150">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                        Answer:
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Create / Edit Modal Dialog */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[560px]">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <HelpCircle className="h-4 w-4" />
                </div>
                <div>
                  <DialogTitle>
                    {editingFAQ ? "Edit FAQ Item" : "Create New FAQ"}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500">
                    {editingFAQ
                      ? "Update existing question, answer, category, or order placement."
                      : "Add a new frequently asked question to be published to the client portal."}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
              {/* Question */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Question <span className="text-rose-500">*</span>
                </label>
                <Input
                  {...register("question")}
                  placeholder="e.g. What technical stacks and frameworks do you build with?"
                  className={cn(errors.question && "border-rose-300 focus-visible:ring-rose-500")}
                />
                {errors.question && (
                  <p className="text-xs text-rose-500 mt-1">{errors.question.message}</p>
                )}
              </div>

              {/* Category & Order Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    {...register("category")}
                    className="w-full h-9 rounded-md border border-slate-200 bg-white px-3 py-1 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-xs text-rose-500 mt-1">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Display Order
                  </label>
                  <Input
                    type="number"
                    {...register("order")}
                    min={0}
                    placeholder="1"
                    className={cn(errors.order && "border-rose-300 focus-visible:ring-rose-500")}
                  />
                  {errors.order && (
                    <p className="text-xs text-rose-500 mt-1">{errors.order.message}</p>
                  )}
                </div>
              </div>

              {/* Answer */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Answer <span className="text-rose-500">*</span>
                </label>
                <Textarea
                  {...register("answer")}
                  rows={5}
                  placeholder="Provide a comprehensive and clear explanation for prospective clients..."
                  className={cn(errors.answer && "border-rose-300 focus-visible:ring-rose-500")}
                />
                {errors.answer && (
                  <p className="text-xs text-rose-500 mt-1">{errors.answer.message}</p>
                )}
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    Publish immediately
                  </p>
                  <p className="text-[11px] text-slate-500">
                    When enabled, this FAQ is instantly visible on the public website.
                  </p>
                </div>
                <Switch
                  checked={isActiveWatch}
                  onCheckedChange={(checked) => setValue("isActive", checked)}
                />
              </div>

              <DialogFooter className="mt-4 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                >
                  {editingFAQ ? "Save Changes" : "Create FAQ"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title="Delete FAQ Item"
          description={`Are you sure you want to delete "${deleteTarget?.question}"? This will permanently remove it from both the admin console and the public website.`}
          confirmText="Delete FAQ"
          onConfirm={handleDelete}
        />
      </div>
    </AdminLayout>
  );
}
