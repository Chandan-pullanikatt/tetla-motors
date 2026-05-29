"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Users, Package, BookOpen, Inbox } from "lucide-react";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  enquiry_type: string;
  status: string;
  created_at: string;
};

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-yellow-50 text-yellow-700",
  closed: "bg-green-50 text-green-700",
};

export default function DashboardPage() {
  const [stats, setStats] = useState({
    newLeads: 0,
    totalLeads: 0,
    products: 0,
    blogs: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();

      const [
        { count: totalLeads },
        { count: newLeads },
        { count: products },
        { count: blogs },
        { data: leads },
      ] = await Promise.all([
        supabase.from("leads").select("*", { count: "exact", head: true }),
        supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("blogs").select("*", { count: "exact", head: true }).eq("is_published", true),
        supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      setStats({
        totalLeads: totalLeads ?? 0,
        newLeads: newLeads ?? 0,
        products: products ?? 0,
        blogs: blogs ?? 0,
      });
      setRecentLeads(leads ?? []);
      setLoading(false);
    };

    load();
  }, []);

  const cards = [
    { label: "New Leads", value: stats.newLeads, icon: Inbox, color: "text-blue-600" },
    { label: "Total Leads", value: stats.totalLeads, icon: Users, color: "text-purple-600" },
    { label: "Products", value: stats.products, icon: Package, color: "text-orange-600" },
    { label: "Published Blogs", value: stats.blogs, icon: BookOpen, color: "text-green-600" },
  ];

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500">{label}</p>
                <Icon size={18} className={color} />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? "—" : value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Leads */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Leads</h2>
            <a href="/admin/leads" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              View all →
            </a>
          </div>
          {loading ? (
            <div className="px-5 py-10 text-center text-sm text-gray-400">Loading…</div>
          ) : recentLeads.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-gray-400">No leads yet</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Name", "Phone", "Type", "Status", "Date"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-gray-900">{lead.name}</td>
                    <td className="px-5 py-3 text-gray-500">{lead.phone || "—"}</td>
                    <td className="px-5 py-3 text-gray-500">{lead.enquiry_type || "—"}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400">
                      {new Date(lead.created_at).toLocaleDateString()}
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
