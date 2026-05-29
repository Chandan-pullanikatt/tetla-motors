"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type BlogData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  is_published: boolean;
};

const toSlug = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-");

const INPUT =
  "h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-800 outline-none focus:border-gray-400 transition-colors";

export function BlogForm({ initial }: { initial?: Partial<BlogData> }) {
  const router = useRouter();

  const [form, setForm] = useState<BlogData>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    cover_image: initial?.cover_image ?? "",
    author: initial?.author ?? "TETLA Team",
    is_published: initial?.is_published ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof BlogData, v: any) => setForm((p) => ({ ...p, [k]: v }));

  const handleTitleChange = (title: string) => {
    setForm((p) => ({ ...p, title, slug: p.slug || toSlug(title) }));
  };

  const handleCoverUpload = async (file: File) => {
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `blogs/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file, { upsert: true });
    if (error) return;
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(path);
    set("cover_image", publicUrl);
  };

  const save = async () => {
    setSaving(true);
    setError("");

    const supabase = createClient();
    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      cover_image: form.cover_image,
      author: form.author,
      is_published: form.is_published,
      published_at: form.is_published ? new Date().toISOString() : null,
    };

    let err;
    if (initial?.id) {
      ({ error: err } = await supabase.from("blogs").update(payload).eq("id", initial.id));
    } else {
      ({ error: err } = await supabase.from("blogs").insert(payload));
    }

    if (err) {
      setError(err.message);
      setSaving(false);
      return;
    }

    router.push("/admin/blogs");
    router.refresh();
  };

  return (
    <div className="max-w-3xl space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Title *</label>
        <input
          className={INPUT}
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Your blog post title"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Slug *</label>
          <input
            className={INPUT}
            value={form.slug}
            onChange={(e) => set("slug", toSlug(e.target.value))}
            placeholder="your-post-slug"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Author</label>
          <input
            className={INPUT}
            value={form.author}
            onChange={(e) => set("author", e.target.value)}
            placeholder="TETLA Team"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Cover Image</label>
        <div className="flex gap-2">
          <input
            className={`${INPUT} flex-1`}
            value={form.cover_image}
            onChange={(e) => set("cover_image", e.target.value)}
            placeholder="https://… or upload"
          />
          <label className="shrink-0 cursor-pointer h-11 px-3 flex items-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 transition-colors">
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleCoverUpload(file);
              }}
            />
          </label>
        </div>
        {form.cover_image && (
          <img
            src={form.cover_image}
            alt="Cover"
            className="mt-2 h-32 rounded-lg object-cover border border-gray-200"
          />
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Excerpt</label>
        <textarea
          rows={2}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 resize-none transition-colors"
          value={form.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
          placeholder="Short description shown in blog listings…"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Content</label>
        <textarea
          rows={16}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 resize-y transition-colors font-mono"
          value={form.content}
          onChange={(e) => set("content", e.target.value)}
          placeholder="Write your blog post content here…"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={form.is_published}
            onChange={(e) => set("is_published", e.target.checked)}
          />
          <div className={`w-10 h-5 rounded-full transition-colors ${form.is_published ? "bg-black" : "bg-gray-200"}`} />
          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.is_published ? "translate-x-5" : ""}`} />
        </div>
        <span className="text-sm text-gray-700">Publish immediately</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving…" : initial?.id ? "Update Post" : "Create Post"}
        </button>
        <button
          onClick={() => router.push("/admin/blogs")}
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
