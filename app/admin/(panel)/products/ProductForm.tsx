"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VideoUpload } from "@/app/components/ui/VideoUpload";
import { Plus, X } from "lucide-react";
import type { ProductPageContent } from "@/lib/db/schema";

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
  page_content?: ProductPageContent | null;
};

const emptyPageContent = (): ProductPageContent => ({
  tagline: "",
  hero: { type: "video", url: "/v1.mp4" },
  description: "",
  stats: { range: "", fullCharge: "", topSpeed: "", runningCost: "", batteryWarranty: "" },
  showcaseImage: "",
  features: [
    { image: "", title: "", description: "" },
    { image: "", title: "", description: "" },
    { image: "", title: "", description: "" },
    { image: "", title: "", description: "" },
  ],
});

// Unsigned Cloudinary upload — returns the secure URL or null.
async function uploadToCloudinary(file: File): Promise<string | null> {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  if (!cloud || !preset) return null;
  const isVideo = file.type.startsWith("video/");
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", preset);
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/${isVideo ? "video" : "image"}/upload`,
    { method: "POST", body }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.secure_url ?? null;
}

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
  const [pc, setPc] = useState<ProductPageContent>(initial?.page_content ?? emptyPageContent());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof ProductData, v: any) =>
    setForm((p) => ({ ...p, [k]: v }));

  // Page-content helpers
  const setStat = (k: keyof ProductPageContent["stats"], v: string) =>
    setPc((p) => ({ ...p, stats: { ...p.stats, [k]: v } }));
  const setFeature = (i: number, field: "image" | "title" | "description", v: string) =>
    setPc((p) => ({
      ...p,
      features: p.features.map((f, j) => (j === i ? { ...f, [field]: v } : f)),
    }));
  const uploadFeatureImage = async (i: number, file: File) => {
    const url = await uploadToCloudinary(file);
    if (url) setFeature(i, "image", url);
  };
  const uploadShowcase = async (file: File) => {
    const url = await uploadToCloudinary(file);
    if (url) setPc((p) => ({ ...p, showcaseImage: url }));
  };
  const uploadHero = async (file: File) => {
    const url = await uploadToCloudinary(file);
    if (url) {
      const type = file.type.startsWith("video/") ? "video" : "image";
      setPc((p) => ({ ...p, hero: { type, url } }));
    }
  };

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
    const url = await uploadToCloudinary(file);
    if (url) setImage(i, url);
    else setError("Cloudinary is not configured.");
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
      pageContent: pc,
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

      {/* ── PAGE CONTENT (product landing page) ──────────────────────────── */}
      <div className="pt-4 mt-4 border-t border-gray-200">
        <h2 className="text-sm font-bold text-gray-900 mb-1">Product Page Content</h2>
        <p className="text-xs text-gray-400 mb-5">Controls the public product page (hero, description, stats, feature cards).</p>

        {/* Tagline */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">Tagline (under the name in the hero)</label>
          <input
            className={INPUT}
            value={pc.tagline}
            onChange={(e) => setPc((p) => ({ ...p, tagline: e.target.value }))}
            placeholder="Efficient, stylish, and built for city rides"
          />
        </div>

        {/* Hero media */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Hero media (image or video) — current: <span className="text-gray-700">{pc.hero.type}</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              className={`${INPUT} flex-1`}
              value={pc.hero.url}
              onChange={(e) => setPc((p) => ({ ...p, hero: { ...p.hero, url: e.target.value } }))}
              placeholder="/v1.mp4 or https://…"
            />
            <select
              className="h-11 rounded-lg border border-gray-200 px-2 text-sm text-gray-700"
              value={pc.hero.type}
              onChange={(e) => setPc((p) => ({ ...p, hero: { ...p.hero, type: e.target.value as "image" | "video" } }))}
            >
              <option value="video">Video</option>
              <option value="image">Image</option>
            </select>
            <label className="shrink-0 cursor-pointer h-11 px-3 flex items-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50">
              Upload
              <input type="file" accept="image/*,video/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadHero(f); }} />
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Description (wrap words in **double asterisks** to highlight them red)
          </label>
          <textarea
            rows={3}
            className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 resize-none"
            value={pc.description}
            onChange={(e) => setPc((p) => ({ ...p, description: e.target.value }))}
            placeholder="Combining timeless **design**, **smart technology**…"
          />
        </div>

        {/* Stats */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-2">Stats</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {([
              ["range", "Range"],
              ["fullCharge", "Full Charge"],
              ["topSpeed", "Top Speed"],
              ["runningCost", "Running Cost"],
              ["batteryWarranty", "Battery Warranty"],
            ] as const).map(([key, label]) => (
              <div key={key}>
                <span className="block text-[10px] uppercase tracking-wide text-gray-400 mb-1">{label}</span>
                <input
                  className={INPUT}
                  value={pc.stats[key]}
                  onChange={(e) => setStat(key, e.target.value)}
                  placeholder={label}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Showcase image */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-500 mb-1">Showcase image (large full-width photo)</label>
          <div className="flex gap-2 items-center">
            <input
              className={`${INPUT} flex-1`}
              value={pc.showcaseImage}
              onChange={(e) => setPc((p) => ({ ...p, showcaseImage: e.target.value }))}
              placeholder="/products/tetla-classic/showcase.jpg"
            />
            <label className="shrink-0 cursor-pointer h-11 px-3 flex items-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50">
              Upload
              <input type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadShowcase(f); }} />
            </label>
          </div>
        </div>

        {/* Feature cards */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">Feature cards (4 — shown as grid + coverflow)</label>
          <div className="space-y-3">
            {pc.features.map((f, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-3 space-y-2">
                <p className="text-[10px] uppercase tracking-wide text-gray-400">Card {i + 1}</p>
                <input
                  className={INPUT}
                  value={f.title}
                  onChange={(e) => setFeature(i, "title", e.target.value)}
                  placeholder="Built for Daily Commutes"
                />
                <textarea
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-400 resize-none"
                  value={f.description}
                  onChange={(e) => setFeature(i, "description", e.target.value)}
                  placeholder="Reliable electric mobility designed for…"
                />
                <div className="flex gap-2 items-center">
                  <input
                    className={`${INPUT} flex-1`}
                    value={f.image}
                    onChange={(e) => setFeature(i, "image", e.target.value)}
                    placeholder="/products/tetla-classic/feature-1.jpg"
                  />
                  <label className="shrink-0 cursor-pointer h-11 px-3 flex items-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50">
                    Upload
                    <input type="file" accept="image/*" className="hidden"
                      onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadFeatureImage(i, file); }} />
                  </label>
                </div>
              </div>
            ))}
          </div>
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
