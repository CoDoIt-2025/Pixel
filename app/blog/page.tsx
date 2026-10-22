"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Eye,
  Calendar,
  FileText,
  Clock,
  Edit,
  Trash2,
  ExternalLink,
  Tag,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdminStore } from "@/lib/store";
import { BlogPost, PostStatus } from "@/types";
import { formatDate, formatNumber } from "@/lib/utils";
import { toast } from "sonner";

export default function BlogListPage() {
  const router = useRouter();
  const blogPosts = useAdminStore((state) => state.blogPosts);
  const deleteBlogPost = useAdminStore((state) => state.deleteBlogPost);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.author.name.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchStatus = statusFilter === "ALL" || post.status === statusFilter;
      const matchCategory = categoryFilter === "ALL" || post.category === categoryFilter;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [blogPosts, search, statusFilter, categoryFilter]);

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteBlogPost(deleteTarget.id);
      toast.success(`Post '${deleteTarget.title}' deleted`);
      setDeleteTarget(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Blog & Technical Publications"
          description="Manage technical case studies, engineering blogs, announcements, and publication schedules."
        >
          <Button
            size="sm"
            onClick={() => router.push("/blog/new")}
            className="shadow-xs"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Write Article
          </Button>
        </PageHeader>

        {/* Filter Bar */}
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search title, author, or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px] h-9 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px] h-9 text-xs">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="AI & ML">AI & ML</SelectItem>
                <SelectItem value="Frontend">Frontend</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Blog Posts Data Table */}
        <Card className="overflow-hidden">
          {filteredPosts.length === 0 ? (
            <EmptyState
              title="No blog posts found"
              description="No articles match your current search or category filter."
              icon={FileText}
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
                    <th className="py-3 px-4">Article Title & Slug</th>
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Views</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                      onClick={() => router.push(`/blog/${post.id}`)}
                    >
                      <td className="py-3.5 px-4 max-w-md">
                        <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                          {post.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5 truncate">
                          /{post.slug}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-slate-700">
                            {post.author.name}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge variant="outline" className="text-[11px] font-normal">
                          {post.category}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4">
                        <StatusBadge status={post.status} size="sm" />
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {formatNumber(post.views)}
                      </td>

                      <td className="py-3.5 px-4 text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-slate-400" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="iconSm"
                            onClick={() => router.push(`/blog/${post.id}`)}
                            title="Edit Article"
                          >
                            <Edit className="h-3.5 w-3.5 text-slate-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="iconSm"
                            onClick={() => setDeleteTarget(post)}
                            title="Delete Article"
                            className="hover:text-rose-600"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-slate-400 hover:text-rose-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Delete Dialog */}
        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title="Delete Article?"
          description={`Are you sure you want to permanently delete '${deleteTarget?.title}'? This action cannot be undone.`}
          confirmText="Yes, Delete Article"
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdminLayout>
  );
}
