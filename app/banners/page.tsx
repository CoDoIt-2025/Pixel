"use client";

import React, { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Plus,
  Trash2,
  Edit2,
  Sparkles,
  Upload,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { useAdminStore } from "@/lib/store";
import { Banner } from "@/types";
import { toast } from "sonner";

export default function BannersPage() {
  const banners = useAdminStore((state) => state.banners);
  const addBanner = useAdminStore((state) => state.addBanner);
  const updateBanner = useAdminStore((state) => state.updateBanner);
  const deleteBanner = useAdminStore((state) => state.deleteBanner);
  const toggleBannerActive = useAdminStore((state) => state.toggleBannerActive);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [ctaText, setCtaText] = useState("Learn More");
  const [ctaLink, setCtaLink] = useState("#audit-request");
  const [badgeText, setBadgeText] = useState("Featured Showcase");
  const [isActive, setIsActive] = useState(true);

  // Uploading state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenAdd = () => {
    setEditingBanner(null);
    setTitle("");
    setSubtitle("");
    setMediaUrl("");
    setMediaType("image");
    setCtaText("Learn More");
    setCtaLink("#audit-request");
    setBadgeText("Commercial Showcase");
    setIsActive(true);
    setUploadError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setTitle(banner.title);
    setSubtitle(banner.subtitle || "");
    setMediaUrl(banner.mediaUrl);
    setMediaType(banner.mediaType);
    setCtaText(banner.ctaText || "Learn More");
    setCtaLink(banner.ctaLink || "#audit-request");
    setBadgeText(banner.badgeText || "Commercial Showcase");
    setIsActive(banner.isActive);
    setUploadError("");
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    try {
      const isImg = file.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|svg)$/i.test(file.name);

      if (isImg) {
        const { uploadToImgBB } = await import("@/lib/imgbb");
        const res = await uploadToImgBB(file);
        setMediaUrl(res.url);
        setMediaType("image");
        toast.success("Photo uploaded to ImgBB Cloud CDN successfully!");
      } else {
        const formData = new FormData();
        formData.append("file", file);

        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
        const res = await fetch(`${API_BASE}/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.detail || "Upload failed");
        }

        const data = await res.json();
        setMediaUrl(data.url);
        setMediaType("video");
        toast.success("Video uploaded successfully!");
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to upload file");
      toast.error(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a banner title");
      return;
    }
    if (!mediaUrl.trim()) {
      toast.error("Please upload or provide an image/video URL for the banner");
      return;
    }

    if (editingBanner) {
      updateBanner(editingBanner.id, {
        title,
        subtitle,
        mediaUrl,
        mediaType,
        ctaText,
        ctaLink,
        badgeText,
        isActive,
      });
      toast.success(`Banner '${title}' updated`);
    } else {
      addBanner({
        title,
        subtitle,
        mediaUrl,
        mediaType,
        ctaText,
        ctaLink,
        badgeText,
        isActive,
        sortOrder: banners.length,
      });
      toast.success(`Banner '${title}' created and added to Hero rotation`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteBanner(deleteTarget.id);
      toast.success(`Banner '${deleteTarget.title}' removed`);
      setDeleteTarget(null);
    }
  };

  const activeCount = banners.filter((b) => b.isActive).length;
  const videoCount = banners.filter((b) => b.mediaType === "video").length;
  const imageCount = banners.filter((b) => b.mediaType === "image").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <PageHeader
          title="Hero Banners & Campaigns"
          description="Manage standalone custom photo and video showcases that cycle in the public website Hero banner alongside services."
        >
          <Button onClick={handleOpenAdd} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4" />
            Upload New Banner
          </Button>
        </PageHeader>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-white border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Banners</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{banners.length}</p>
          </Card>
          <Card className="p-4 bg-white border-slate-200">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Active in Hero</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">{activeCount}</p>
          </Card>
          <Card className="p-4 bg-white border-slate-200">
            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Video Showcases</span>
            <p className="text-2xl font-black text-amber-700 mt-1">{videoCount}</p>
          </Card>
          <Card className="p-4 bg-white border-slate-200">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Photo Showcases</span>
            <p className="text-2xl font-black text-blue-700 mt-1">{imageCount}</p>
          </Card>
        </div>

        {/* Banners Grid */}
        {banners.length === 0 ? (
          <EmptyState
            title="No custom hero banners yet"
            description="Upload your first corporate photo or video loop to showcase special campaigns, products, or company credentials in the top hero slider."
            actionText="Upload Banner"
            onAction={handleOpenAdd}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((b) => (
              <Card
                key={b.id}
                className="overflow-hidden border-slate-200 flex flex-col justify-between group hover:shadow-lg transition-all duration-200 bg-white"
              >
                <div>
                  {/* Media Preview Box */}
                  <div className="relative aspect-video w-full bg-[#121418] overflow-hidden">
                    {b.mediaType === "video" ? (
                      <video
                        src={b.mediaUrl}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={b.mediaUrl}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Media Type & Badge Pills */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#121418]/80 text-white backdrop-blur-md border border-white/20">
                        {b.mediaType === "video" ? (
                          <VideoIcon className="h-3 w-3 text-amber-400" />
                        ) : (
                          <ImageIcon className="h-3 w-3 text-blue-400" />
                        )}
                        {b.mediaType === "video" ? "Video" : "Photo"}
                      </span>

                      {b.badgeText && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/20 text-white backdrop-blur-md">
                          {b.badgeText}
                        </span>
                      )}
                    </div>

                    {/* Active Status Badge */}
                    <div className="absolute top-3 right-3">
                      {b.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white shadow-sm">
                          <Eye className="h-2.5 w-2.5" />
                          Live in Hero
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-500/80 text-white shadow-sm">
                          <EyeOff className="h-2.5 w-2.5" />
                          Hidden
                        </span>
                      )}
                    </div>

                    {/* Title in preview */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-base leading-tight drop-shadow-md">
                        {b.title}
                      </h3>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3 text-xs">
                    {/* Subtitle */}
                    {b.subtitle && (
                      <p className="text-slate-600 line-clamp-2 leading-relaxed">
                        {b.subtitle}
                      </p>
                    )}

                    {/* CTA target */}
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                      <LinkIcon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-900">{b.ctaText || "Learn More"}</span>
                      <span className="text-slate-400 truncate">({b.ctaLink || "#audit-request"})</span>
                    </div>
                  </CardContent>
                </div>

                {/* Footer Controls */}
                <div className="p-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={b.isActive}
                      onCheckedChange={() => toggleBannerActive(b.id)}
                    />
                    <span className="text-xs font-medium text-slate-700">
                      {b.isActive ? "In Hero Rotation" : "Paused"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenEdit(b)}
                      className="h-8 px-2 text-slate-600 hover:text-slate-900"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteTarget(b)}
                      className="h-8 px-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Create / Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[560px]">
            <form onSubmit={handleSave}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-indigo-600" />
                  <span>{editingBanner ? "Edit Hero Banner" : "Upload Hero Banner"}</span>
                </DialogTitle>
                <DialogDescription>
                  Configure standalone photos or looping video showcases to be cycled in the website Hero section.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-3">
                {/* File Upload Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Banner Media (Photo or Video)
                  </label>

                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-indigo-400 transition-colors bg-slate-50/50">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/mp4,video/webm,video/quicktime"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="banner-file-input"
                    />

                    {mediaUrl ? (
                      <div className="space-y-3">
                        <div className="relative aspect-video max-h-40 mx-auto rounded-lg overflow-hidden bg-black border border-slate-200">
                          {mediaType === "video" ? (
                            <video src={mediaUrl} muted autoPlay loop playsInline className="w-full h-full object-cover" />
                          ) : (
                            <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <label
                            htmlFor="banner-file-input"
                            className="cursor-pointer text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
                          >
                            Replace File
                          </label>
                          <span className="text-slate-300">&bull;</span>
                          <button
                            type="button"
                            onClick={() => setMediaUrl("")}
                            className="text-xs text-rose-500 hover:text-rose-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label htmlFor="banner-file-input" className="cursor-pointer block space-y-2 py-3">
                        <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                        <div>
                          <p className="text-xs font-bold text-indigo-600">Click to upload photo or video</p>
                          <p className="text-[11px] text-slate-400">Images host directly on ImgBB CDN • Videos support MP4, WebM</p>
                        </div>
                      </label>
                    )}

                    {isUploading && (
                      <p className="text-xs font-semibold text-indigo-600 animate-pulse mt-2">
                        Uploading media file...
                      </p>
                    )}
                    {uploadError && (
                      <p className="text-xs text-rose-600 font-medium mt-1">{uploadError}</p>
                    )}
                  </div>

                  {/* Or Manual Direct URL */}
                  <div className="pt-1">
                    <Input
                      placeholder="Or enter direct image/video URL (e.g. /uploads/... or https://...)"
                      value={mediaUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        setMediaUrl(val);
                        if (val.endsWith(".mp4") || val.endsWith(".webm") || val.endsWith(".mov")) {
                          setMediaType("video");
                        }
                      }}
                      className="text-xs"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Banner Headline / Title</label>
                  <Input
                    placeholder="e.g. High-Speed Corporate Cloud Architectures"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Subtitle & Description</label>
                  <Textarea
                    rows={2}
                    placeholder="Brief description displayed directly underneath the banner headline..."
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                  />
                </div>

                {/* Grid: Badge & CTA */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Badge Text</label>
                    <Input
                      placeholder="e.g. Commercial Showcase"
                      value={badgeText}
                      onChange={(e) => setBadgeText(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Button Text</label>
                    <Input
                      placeholder="e.g. Learn More / Request Audit"
                      value={ctaText}
                      onChange={(e) => setCtaText(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Button Target / Link</label>
                  <Input
                    placeholder="e.g. #audit-request, #services, #our-work, or full URL"
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                  />
                </div>

                {/* Active in Hero toggle */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block">Show in Hero Banner Rotation</label>
                    <span className="text-[11px] text-slate-400">
                      When enabled, this banner immediately cycles in the public homepage hero.
                    </span>
                  </div>
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  {editingBanner ? "Save Changes" : "Create Banner"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          title="Delete Hero Banner"
          description={`Are you sure you want to permanently delete the banner '${deleteTarget?.title}'? It will be removed from the homepage hero rotation immediately.`}
          confirmText="Delete Banner"
          destructive={true}
          onConfirm={handleDelete}
        />
      </div>
    </AdminLayout>
  );
}
