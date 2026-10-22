"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  FileCode,
  Image as ImageIcon,
  Sparkles,
  Clock,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BlogPost, PostStatus } from "@/types";
import { useAdminStore } from "@/lib/store";
import { toast } from "sonner";

const blogEditorSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().min(10, "Please provide a brief excerpt"),
  content: z.string().min(20, "Content must have at least 20 characters"),
  category: z.string().min(2, "Category is required"),
  tagsString: z.string().min(2, "Enter comma separated tags"),
  coverImage: z.string().url("Valid cover image URL required"),
  status: z.enum(["Draft", "Published", "Scheduled"]),
});

type BlogEditorFormData = z.infer<typeof blogEditorSchema>;

interface BlogEditorProps {
  initialPost?: BlogPost;
}

export function BlogEditor({ initialPost }: BlogEditorProps) {
  const router = useRouter();
  const addBlogPost = useAdminStore((state) => state.addBlogPost);
  const updateBlogPost = useAdminStore((state) => state.updateBlogPost);

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogEditorFormData>({
    resolver: zodResolver(blogEditorSchema) as any,
    defaultValues: {
      title: initialPost?.title || "",
      slug: initialPost?.slug || "",
      excerpt: initialPost?.excerpt || "",
      content:
        initialPost?.content ||
        `# Writing Modern Web Systems\n\nExplain technical architecture, engineering benchmarks, or design rationale here...\n\n## Implementation Details\n\n\`\`\`typescript\nexport const example = () => "Hello World";\n\`\`\``,
      category: initialPost?.category || "Engineering",
      tagsString: initialPost?.tags.join(", ") || "Next.js, TypeScript, Architecture",
      coverImage:
        initialPost?.coverImage ||
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
      status: initialPost?.status || "Draft",
    },
  });

  const titleValue = watch("title");
  const contentValue = watch("content");

  // Auto-generate slug when title changes
  const handleGenerateSlug = () => {
    if (titleValue) {
      const generated = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generated);
      toast.info("Slug generated from title");
    }
  };

  const onSubmit = (data: BlogEditorFormData) => {
    const tagsArray = data.tagsString
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Calculate approximate reading time (200 words/min)
    const wordCount = data.content.trim().split(/\s+/).length;
    const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    if (initialPost) {
      updateBlogPost(initialPost.id, {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        tags: tagsArray,
        coverImage: data.coverImage,
        status: data.status,
        readingTime,
      });
      toast.success(`Article '${data.title}' saved`);
    } else {
      addBlogPost({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        tags: tagsArray,
        coverImage: data.coverImage,
        author: {
          name: "Alex Vance",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
          role: "Managing Director",
        },
        status: data.status,
        views: 0,
        publishedAt: new Date().toISOString().split("T")[0],
        readingTime,
      });
      toast.success(`Article '${data.title}' published`);
    }

    router.push("/blog");
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Articles
        </Link>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setValue("status", "Draft");
              handleSubmit(onSubmit)();
            }}
          >
            <Save className="h-4 w-4 mr-1.5" />
            Save as Draft
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => {
              setValue("status", "Published");
              handleSubmit(onSubmit)();
            }}
          >
            <Send className="h-4 w-4 mr-1.5" />
            Publish Article
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Content Area (8 cols) */}
          <div className="space-y-5 lg:col-span-8">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Article Title
              </label>
              <Input
                placeholder="e.g. Scaling Next.js App Router for 10M Concurrent Sessions"
                className="text-base font-semibold"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-rose-600">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="h-3 w-3" />
                  Auto-generate from title
                </button>
              </div>
              <div className="flex items-center">
                <span className="inline-flex h-9 items-center rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 px-3 text-xs text-slate-400 font-mono">
                  pixel.dev/blog/
                </span>
                <Input
                  className="rounded-l-none font-mono text-xs"
                  placeholder="scaling-nextjs-app-router"
                  {...register("slug")}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Summary / Excerpt
              </label>
              <Textarea
                rows={2}
                placeholder="Brief meta description and article hook shown on index cards..."
                {...register("excerpt")}
              />
            </div>

            {/* Markdown Editor / Preview Switcher */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Article Body (Markdown)
                </label>
                <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab("edit")}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                      activeTab === "edit"
                        ? "bg-white text-indigo-600 shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <FileCode className="h-3.5 w-3.5" />
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md font-medium transition-colors cursor-pointer ${
                      activeTab === "preview"
                        ? "bg-white text-indigo-600 shadow-2xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Live Preview
                  </button>
                </div>
              </div>

              {activeTab === "edit" ? (
                <Textarea
                  rows={16}
                  className="font-mono text-xs leading-relaxed"
                  placeholder="Write in standard Markdown format (# headings, `code`, lists)..."
                  {...register("content")}
                />
              ) : (
                <div className="min-h-[380px] rounded-xl border border-slate-200 bg-white p-6 prose prose-slate max-w-none text-sm leading-relaxed overflow-y-auto">
                  <div className="whitespace-pre-line text-slate-800 font-sans">
                    {contentValue}
                  </div>
                </div>
              )}
              {errors.content && (
                <p className="text-xs text-rose-600">{errors.content.message}</p>
              )}
            </div>
          </div>

          {/* Sidebar Metadata (4 cols) */}
          <div className="space-y-5 lg:col-span-4">
            <Card>
              <CardContent className="p-5 space-y-4 text-xs">
                <h4 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">
                  Publication Settings
                </h4>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Status</label>
                  <select
                    className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:border-indigo-500"
                    {...register("status")}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Scheduled">Scheduled</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Category</label>
                  <select
                    className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-900 shadow-xs focus:outline-none focus:border-indigo-500"
                    {...register("category")}
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">
                    Tags (comma-separated)
                  </label>
                  <Input
                    placeholder="Next.js, React, Tailwind, Cloud"
                    {...register("tagsString")}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">
                    Cover Image URL
                  </label>
                  <Input
                    placeholder="https://images.unsplash.com/..."
                    {...register("coverImage")}
                  />
                </div>

                {/* Article statistics preview */}
                <div className="rounded-lg bg-slate-50 p-3 space-y-1 border border-slate-100">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Estimated Length:</span>
                    <span className="font-semibold text-slate-800">
                      {contentValue ? contentValue.trim().split(/\s+/).length : 0} words
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Read Time:</span>
                    <span className="font-semibold text-slate-800">
                      {Math.max(
                        1,
                        Math.ceil(
                          (contentValue ? contentValue.trim().split(/\s+/).length : 0) /
                            200
                        )
                      )}{" "}
                      min read
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
