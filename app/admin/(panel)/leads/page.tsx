"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  enquiry_type: string;
  message: string;
  newsletter: boolean;
  status: string;
  notes: string;
  created_at: string;
};

const STATUSES = ["all", "new", "contacted", "closed"];

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700",
  contacted: "bg-yellow-50 text-yellow-700",
  closed: "bg-green-50 text-green-700",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editState, setEditState] = useState<Record<string, { status: string; notes: string }>>({});

  const loadLeads = async () => {
    setLoading(true);
    const supabase = createClient();
    let q = supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter);
    const { data } = await q;
    setLeads(data ?? []);
    setLoading(false);
  };

  useEffect(() => { loadLeads(); }, [filter]);

  const toggle = (id: string, lead: Lead) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      setEditState((prev) => ({
        ...prev,
        [id]: { status: lead.status, notes: lead.notes ?? "" },
      }));
    }
  };

  const saveEdit = async (id: string) => {
    setSaving(id);
    const supabase = createClient();
    const { status, notes } = editState[id];
    await supabase.from("leads").update({ status, notes }).eq("id", id);
    await loadLeads();
    setSaving(null);
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    const supabase = createClient();
    await supabase.from("leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const counts = leads.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
      </div>

      <div className="px-8 py-6 space-y-4">
        {/* Filter tabs */}
        <div className="flex gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                filter === s
                  ? "bg-black text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {s}
              {s !== "all" && counts[s] ? (
                <span className="ml-1.5 text-xs opacity-70">({counts[s]})</span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="py-16 text-center text-sm text-gray-400">Loading…</div>
          ) : leads.length === 0 ? (
            <div className="py-16 text-center text-sm text-gray-400">No leads found</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Date", "Name", "Phone", "Email", "Type", "Status", ""].map((h, i) => (
                    <th key={i} className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const isOpen = expandedId === lead.id;
                  const edit = editState[lead.id] ?? { status: lead.status, notes: lead.notes ?? "" };
                  return (
                    <>
                      <tr
                        key={lead.id}
                        className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => toggle(lead.id, lead)}
                      >
                        <td className="px-5 py-3 text-gray-400 whitespace-nowrap">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-3 font-medium text-gray-900">{lead.name}</td>
                        <td className="px-5 py-3 text-gray-500">{lead.phone || "—"}</td>
                        <td className="px-5 py-3 text-gray-500">{lead.email || "—"}</td>
                        <td className="px-5 py-3 text-gray-500">{lead.enquiry_type || "—"}</td>
                        <td className="px-5 py-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[lead.status] ?? "bg-gray-100 text-gray-600"}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-400">
                          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </td>
                      </tr>

                      {isOpen && (
                        <tr key={`${lead.id}-detail`} className="bg-gray-50 border-b border-gray-100">
                          <td colSpan={7} className="px-5 py-4">
                            <div className="space-y-3">
                              {lead.message && (
                                <div>
                                  <p className="text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Message</p>
                                  <p className="text-sm text-gray-700 bg-white border border-gray-200 rounded-lg px-4 py-3">
                                    {lead.message}
                                  </p>
                                </div>
                              )}

                              <div className="flex gap-3 flex-wrap items-end">
                                <div>
                                  <p className="text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Status</p>
                                  <select
                                    value={edit.status}
                                    onChange={(e) =>
                                      setEditState((prev) => ({
                                        ...prev,
                                        [lead.id]: { ...edit, status: e.target.value },
                                      }))
                                    }
                                    className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-gray-400"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="closed">Closed</option>
                                  </select>
                                </div>

                                <div className="flex-1 min-w-[200px]">
                                  <p className="text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Notes</p>
                                  <input
                                    type="text"
                                    value={edit.notes}
                                    onChange={(e) =>
                                      setEditState((prev) => ({
                                        ...prev,
                                        [lead.id]: { ...edit, notes: e.target.value },
                                      }))
                                    }
                                    placeholder="Add internal notes…"
                                    className="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-gray-400"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>

                                <button
                                  onClick={(e) => { e.stopPropagation(); saveEdit(lead.id); }}
                                  disabled={saving === lead.id}
                                  className="h-9 px-4 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
                                >
                                  {saving === lead.id ? "Saving…" : "Save"}
                                </button>

                                <button
                                  onClick={(e) => { e.stopPropagation(); deleteLead(lead.id); }}
                                  className="h-9 px-3 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
