"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { BlogEditor } from "@/components/shared/BlogEditor";
import { useAdminStore } from "@/lib/store";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditBlogPostClient({ id }: { id: string }) {
  const router = useRouter();
  const blogPosts = useAdminStore((state) => state.blogPosts);
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <AlertCircle className="h-10 w-10 text-amber-500 mb-3" />
          <h2 className="text-xl font-bold text-slate-900">Article Not Found</h2>
          <p className="text-sm text-slate-500 mt-1 max-w-md">
            The article you are trying to edit does not exist or may have been deleted.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => router.push("/blog")}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back to Blog
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <BlogEditor initialPost={post} />
    </AdminLayout>
  );
}
