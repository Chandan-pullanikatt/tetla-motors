"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

type Member = {
  id: string;
  name: string;
  role: string;
  image_url: string;
  display_order: number;
};

type FormState = {
  name: string;
  role: string;
  image_url: string;
  display_order: number;
};

const INPUT =
  "h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-800 outline-none focus:border-gray-400 transition-colors";

const empty: FormState = { name: "", role: "", image_url: "", display_order: 0 };

export default function TeamPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true });
    setMembers(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const startEdit = (member: Member) => {
    setEditId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      image_url: member.image_url ?? "",
      display_order: member.display_order,
    });
  };

  const handleImageUpload = async (file: File) => {
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `team/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file, { upsert: true });
    if (error) return;
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(path);
    setForm((p) => ({ ...p, image_url: publicUrl }));
  };

  const save = async () => {
    setSaving(true);
    const supabase = createClient();
    if (editId === "new") {
      await supabase.from("team_members").insert({
        ...form,
        display_order: members.length,
      });
    } else {
      await supabase.from("team_members").update(form).eq("id", editId);
    }
    setEditId(null);
    setForm(empty);
    await load();
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    const supabase = createClient();
    await supabase.from("team_members").delete().eq("id", id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const MemberForm = () => (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Name *</label>
          <input className={INPUT} value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="John Doe" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Role *</label>
          <input className={INPUT} value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} placeholder="CEO" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Photo</label>
        <div className="flex gap-2">
          <input
            className={`${INPUT} flex-1`}
            value={form.image_url}
            onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
            placeholder="https://… or upload"
          />
          <label className="shrink-0 cursor-pointer h-10 px-3 flex items-center rounded-lg border border-gray-200 text-xs text-gray-500 hover:bg-gray-50 bg-white transition-colors">
            Upload
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(f); }} />
          </label>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Display Order</label>
        <input type="number" className={`${INPUT} w-24`} value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: Number(e.target.value) }))} />
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={save} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors">
          <Check size={14} /> {saving ? "Saving…" : "Save"}
        </button>
        <button onClick={() => { setEditId(null); setForm(empty); }} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors">
          <X size={14} /> Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Team Members</h1>
        {editId !== "new" && (
          <button
            onClick={() => { setEditId("new"); setForm(empty); }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Plus size={15} /> Add Member
          </button>
        )}
      </div>

      <div className="px-8 py-6 space-y-4">
        {editId === "new" && <MemberForm />}

        {loading ? (
          <div className="py-16 text-center text-sm text-gray-400">Loading…</div>
        ) : members.length === 0 && editId !== "new" ? (
          <div className="py-16 text-center text-sm text-gray-400">No team members yet</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <div key={m.id}>
                {editId === m.id ? (
                  <MemberForm />
                ) : (
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="relative h-48 bg-gray-100">
                      {m.image_url ? (
                        <Image src={m.image_url} alt={m.name} fill className="object-cover object-top" />
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-300 text-4xl font-bold">
                          {m.name[0]}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-gray-900">{m.name}</p>
                      <p className="text-sm text-gray-500 uppercase tracking-wide">{m.role}</p>
                    </div>
                    <div className="px-4 pb-4 flex gap-2">
                      <button
                        onClick={() => startEdit(m)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 text-xs hover:bg-gray-50 transition-colors"
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button
                        onClick={() => remove(m.id)}
                        className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
