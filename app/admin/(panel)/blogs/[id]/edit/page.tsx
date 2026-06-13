"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BlogForm } from "../../BlogForm";

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/admin/blogs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setBlog({
          id: data.id,
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt ?? "",
          content: data.content ?? "",
          cover_image: data.coverImage ?? "",
          author: data.author ?? "TETLA Team",
          is_published: data.isPublished,
        });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <div className="px-8 py-16 text-sm text-gray-400">Loading…</div>;
  if (!blog) return <div className="px-8 py-16 text-sm text-red-400">Post not found</div>;

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-xl font-semibold text-gray-900">Edit Post</h1>
      </div>
      <div className="px-8 py-6">
        <BlogForm initial={blog} />
      </div>
    </div>
  );
}
