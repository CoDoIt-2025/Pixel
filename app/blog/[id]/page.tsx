import { initialBlogPosts } from "@/data/mockBlog";
import EditBlogPostClient from "./EditBlogPostClient";

export function generateStaticParams() {
  return initialBlogPosts.map((post) => ({ id: post.id }));
}

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditBlogPostClient id={id} />;
}
