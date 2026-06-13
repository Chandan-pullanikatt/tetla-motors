"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  isActive: boolean;
  createdAt: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    setProducts(res.ok ? await res.json() : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={15} /> Add Product
        </Link>
      </div>

      <div className="px-8 py-6">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-sm text-gray-400">Loading…</div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-400">No products yet</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Name", "Category", "Price", "Status", ""].map((h, i) => (
                    <th key={i} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="px-5 py-3 text-gray-500 capitalize">{p.category}</td>
                    <td className="px-5 py-3 text-gray-700">₹{Number(p.price).toLocaleString("en-IN")}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${p.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs hover:bg-gray-50 transition-colors"
                        >
                          <Pencil size={12} /> Edit
                        </Link>
                        <button
                          onClick={() => deleteProduct(p.id)}
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
