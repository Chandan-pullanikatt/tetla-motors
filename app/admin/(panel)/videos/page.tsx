"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { VideoUpload } from "@/app/components/ui/VideoUpload";

type VideoSlot = {
  id: string;
  key: string;
  label: string;
  url: string | null;
  public_id: string | null;
};

export default function VideosPage() {
  const [slots, setSlots] = useState<VideoSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("site_videos")
        .select("*")
        .order("key");
      setSlots(data ?? []);
      setLoading(false);
    };
    load();
  }, []);

  const handleChange = async (id: string, url: string, public_id: string) => {
    setSaving(id);
    setSaved(null);

    const supabase = createClient();
    await supabase
      .from("site_videos")
      .update({ url, public_id, updated_at: new Date().toISOString() })
      .eq("id", id);

    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, url, public_id } : s))
    );

    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const handleClear = async (id: string) => {
    if (!confirm("Remove this video?")) return;
    const supabase = createClient();
    await supabase
      .from("site_videos")
      .update({ url: null, public_id: null })
      .eq("id", id);
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, url: null, public_id: null } : s))
    );
  };

  const groups = [
    {
      title: "Site Background Videos",
      keys: ["hero", "va1", "va2", "va3", "lineup"],
    },
    {
      title: "Testimonial Videos",
      keys: ["testimonial_1", "testimonial_2", "testimonial_3", "testimonial_4", "testimonial_5", "testimonial_6", "testimonial_7"],
    },
  ];

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-xl font-semibold text-gray-900">Videos</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Uploaded via Cloudinary — auto-compressed and CDN delivered
        </p>
      </div>

      <div className="px-8 py-6 space-y-8">
        {loading ? (
          <div className="py-16 text-center text-sm text-gray-400">Loading…</div>
        ) : (
          groups.map(({ title, keys }) => {
            const groupSlots = slots.filter((s) => keys.includes(s.key));
            if (groupSlots.length === 0) return null;
            return (
              <div key={title}>
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
                  {title}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-800">{slot.label}</p>
                        {saving === slot.id && (
                          <span className="text-xs text-gray-400">Saving…</span>
                        )}
                        {saved === slot.id && (
                          <span className="text-xs text-green-600">Saved!</span>
                        )}
                      </div>

                      <VideoUpload
                        value={slot.url ?? ""}
                        publicId={slot.public_id ?? ""}
                        onChange={(url, publicId) => handleChange(slot.id, url, publicId)}
                        onClear={() => handleClear(slot.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
