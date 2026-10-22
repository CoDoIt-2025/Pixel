"use client";

import React from "react";
import { AdminLayout } from "@/components/shared/AdminLayout";
import { BlogEditor } from "@/components/shared/BlogEditor";

export default function NewBlogPostPage() {
  return (
    <AdminLayout>
      <BlogEditor />
    </AdminLayout>
  );
}
