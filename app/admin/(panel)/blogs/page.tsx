"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2 } from "lucide-react";

type Blog = {
  id: string;
  title: string;
  slug: string;
  author: string;
  is_published: boolean;
  created_at: string;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("blogs")
      .select("id, title, slug, author, is_published, created_at")
      .order("created_at", { ascending: false });
    setBlogs(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const supabase = createClient();
    await supabase.from("blogs").delete().eq("id", id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  const togglePublish = async (blog: Blog) => {
    const supabase = createClient();
    await supabase.from("blogs").update({
      is_published: !blog.is_published,
      published_at: !blog.is_published ? new Date().toISOString() : null,
    }).eq("id", blog.id);
    await load();
  };

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Blogs</h1>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={15} /> New Post
        </Link>
      </div>

      <div className="px-8 py-6">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-sm text-gray-400">Loading…</div>
          ) : blogs.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-400">No blog posts yet</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Title", "Author", "Status", "Date", ""].map((h, i) => (
                    <th key={i} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{blog.title}</td>
                    <td className="px-5 py-3 text-gray-500">{blog.author}</td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => togglePublish(blog)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                          blog.is_published
                            ? "bg-green-50 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {blog.is_published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-5 py-3 text-gray-400">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs hover:bg-gray-50 transition-colors"
                        >
                          <Pencil size={12} /> Edit
                        </Link>
                        <button
                          onClick={() => deleteBlog(blog.id)}
                          className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
