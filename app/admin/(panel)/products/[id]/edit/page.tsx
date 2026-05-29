"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ProductForm } from "../../ProductForm";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("products").select("*").eq("id", id).single();
      if (data) {
        const specs = Object.entries(data.specs ?? {}).map(([key, value]) => ({
          key,
          value: String(value),
        }));
        setProduct({ ...data, price: String(data.price), specs: specs.length ? specs : [{ key: "", value: "" }] });
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
