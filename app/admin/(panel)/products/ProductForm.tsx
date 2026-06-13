"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VideoUpload } from "@/app/components/ui/VideoUpload";
import { Plus, X } from "lucide-react";

type Spec = { key: string; value: string };

type ProductData = {
  id?: string;
  name: string;
  slug: string;
  price: string;
  description: string;
  category: string;
  is_active: boolean;
  images: string[];
  specs: Spec[];
  video_url: string;
  video_public_id: string;
};

const toSlug = (s: string) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-");

const INPUT =
  "h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-800 outline-none focus:border-gray-400 transition-colors";

export function ProductForm({ initial }: { initial?: Partial<ProductData> }) {
  const router = useRouter();

  const [form, setForm] = useState<ProductData>({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    price: initial?.price ?? "",
    description: initial?.description ?? "",
    category: initial?.category ?? "bike",
    is_active: initial?.is_active ?? true,
    images: initial?.images ?? [""],
    specs: initial?.specs ?? [{ key: "", value: "" }],
    video_url: initial?.video_url ?? "",
    video_public_id: initial?.video_public_id ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof ProductData, v: any) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleNameChange = (name: string) => {
    setForm((p) => ({ ...p, name, slug: p.slug || toSlug(name) }));
  };

  const setImage = (i: number, val: string) => {
    const imgs = [...form.images];
    imgs[i] = val;
    set("images", imgs);
  };

  const setSpec = (i: number, field: "key" | "value", val: string) => {
    const specs = [...form.specs];
    specs[i] = { ...specs[i], [field]: val };
    set("specs", specs);
  };

  const handleImageUpload = async (i: number, file: File) => {
    // Unsigned Cloudinary upload (same preset as video uploads)
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloud || !preset) {
      setError("Cloudinary is not configured.");
      return;
    }
    const body = new FormData();
    body.append("file", file);
    body.append("upload_preset", preset);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
      method: "POST",
      body,
    });
    if (!res.ok) return;
    const data = await res.json();
    if (data.secure_url) setImage(i, data.secure_url);
  };

  const save = async () => {
    setSaving(true);
    setError("");

    const specsObj = Object.fromEntries(
      form.specs.filter((s) => s.key).map((s) => [s.key, s.value])
    );
    const images = form.images.filter(Boolean);
    const payload = {
      name: form.name,
      slug: form.slug,
      price: String(form.price || 0),
      description: form.description,
      category: form.category,
      isActive: form.is_active,
      images,
      specs: specsObj,
      videoUrl: form.video_url || null,
      videoPublicId: form.video_public_id || null,
    };

    const res = initial?.id
      ? await fetch(`/api/admin/products/${initial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

    if (!res.ok) {
      const { error: err } = await res.json().catch(() => ({ error: "Save failed" }));
      setError(err ?? "Save failed");
      setSaving(false);
      return;
    }

    router.push("/admin/products");
    router.refresh();
  };

  return (
    <div className="max-w-2xl space-y-5">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">Product Name *</label>
          <input
            className={INPUT}
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="TETLA Classic"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-500 mb-1">Slug *</label>
          <input
            className={INPUT}
            value={form.slug}
            onChange={(e) => set("slug", toSlug(e.target.value))}
            placeholder="tetla-classic"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Price (₹) *</label>
          <input
            type="number"
            className={INPUT}
            value={form.price}
            onChange={(e) => set("price", e.target.value)}
            placeholder="45999"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
          <select
            className={INPUT}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            <option value="bike">Bike</option>
            <option value="scooter">Scooter</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
        <textarea
          rows={4}
          className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 resize-none transition-colors"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Product description…"
        />
      </div>

      {/* Images */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Images</label>
        <div className="space-y-2">
          {form.images.map((img, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={`${INPUT} flex-1`}
                value={img}
                onChange={(e) => setImage(i, e.target.value)}
                placeholder="https://… or upload below"
              />
              <label className="shrink-0 cursor-pointer h-11 px-3 flex items-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 transition-colors">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(i, file);
                  }}
                />
              </label>
              {form.images.length > 1 && (
                <button
                  onClick={() => set("images", form.images.filter((_, j) => j !== i))}
                  className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => set("images", [...form.images, ""])}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Plus size={12} /> Add image
          </button>
        </div>
      </div>

      {/* Product Video */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Product Video (optional)</label>
        <VideoUpload
          value={form.video_url}
          publicId={form.video_public_id}
          onChange={(url, publicId) => setForm((p) => ({ ...p, video_url: url, video_public_id: publicId }))}
          onClear={() => setForm((p) => ({ ...p, video_url: "", video_public_id: "" }))}
        />
      </div>

      {/* Specs */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-2">Specs (key–value)</label>
        <div className="space-y-2">
          {form.specs.map((spec, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={`${INPUT} flex-1`}
                value={spec.key}
                onChange={(e) => setSpec(i, "key", e.target.value)}
                placeholder="Top Speed"
              />
              <input
                className={`${INPUT} flex-1`}
                value={spec.value}
                onChange={(e) => setSpec(i, "value", e.target.value)}
                placeholder="45 km/h"
              />
              {form.specs.length > 1 && (
                <button
                  onClick={() => set("specs", form.specs.filter((_, j) => j !== i))}
                  className="shrink-0 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => set("specs", [...form.specs, { key: "", value: "" }])}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Plus size={12} /> Add spec
          </button>
        </div>
      </div>

      {/* Active toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            checked={form.is_active}
            onChange={(e) => set("is_active", e.target.checked)}
          />
          <div className={`w-10 h-5 rounded-full transition-colors ${form.is_active ? "bg-black" : "bg-gray-200"}`} />
          <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.is_active ? "translate-x-5" : ""}`} />
        </div>
        <span className="text-sm text-gray-700">Active (visible on site)</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {saving ? "Saving…" : initial?.id ? "Update Product" : "Create Product"}
        </button>
        <button
          onClick={() => router.push("/admin/products")}
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
