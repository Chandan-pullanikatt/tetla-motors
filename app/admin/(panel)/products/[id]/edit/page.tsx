"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductForm } from "../../ProductForm";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/admin/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        const specs = Object.entries(data.specs ?? {}).map(([key, value]) => ({
          key,
          value: String(value),
        }));
        setProduct({
          id: data.id,
          name: data.name,
          slug: data.slug,
          price: String(data.price),
          description: data.description ?? "",
          category: data.category ?? "bike",
          is_active: data.isActive,
          images: (data.images?.length ? data.images : [""]),
          specs: specs.length ? specs : [{ key: "", value: "" }],
          video_url: data.videoUrl ?? "",
          video_public_id: data.videoPublicId ?? "",
          page_content: data.pageContent ?? null,
        });
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <div className="px-8 py-16 text-sm text-gray-400">Loading…</div>;
  if (!product) return <div className="px-8 py-16 text-sm text-red-400">Product not found</div>;

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-xl font-semibold text-gray-900">Edit Product</h1>
      </div>
      <div className="px-8 py-6">
        <ProductForm initial={product} />
      </div>
    </div>
  );
}
