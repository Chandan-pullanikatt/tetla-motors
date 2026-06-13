"use client";

import { useEffect, useState } from "react";

type HeroContent = {
  id: string;
  headline: string;
  subheadline: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
};

const INPUT =
  "h-11 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-800 outline-none focus:border-gray-400 transition-colors";

export default function HeroPage() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/admin/hero");
      setHero(res.ok ? await res.json() : null);
      setLoading(false);
    };
    load();
  }, []);

  const set = (k: keyof HeroContent, v: string) =>
    setHero((p) => (p ? { ...p, [k]: v } : p));

  const save = async () => {
    if (!hero) return;
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        headline: hero.headline,
        subheadline: hero.subheadline,
        stat1Label: hero.stat1Label,
        stat1Value: hero.stat1Value,
        stat2Label: hero.stat2Label,
        stat2Value: hero.stat2Value,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <h1 className="text-xl font-semibold text-gray-900">Hero Content</h1>
      </div>

      <div className="px-8 py-6">
        {loading ? (
          <div className="py-16 text-center text-sm text-gray-400">Loading…</div>
        ) : !hero ? (
          <div className="py-16 text-center text-sm text-red-400">No hero content found — run the schema SQL first</div>
        ) : (
          <div className="max-w-xl space-y-5">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Main Text</h2>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Headline</label>
                <input className={INPUT} value={hero.headline} onChange={(e) => set("headline", e.target.value)} placeholder="TETLA Classic" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Subheadline</label>
                <input className={INPUT} value={hero.subheadline} onChange={(e) => set("subheadline", e.target.value)} placeholder="Efficient, stylish, and built for city rides" />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Stat 1 Label</label>
                  <input className={INPUT} value={hero.stat1Label} onChange={(e) => set("stat1Label", e.target.value)} placeholder="Electric Range" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Stat 1 Value</label>
                  <input className={INPUT} value={hero.stat1Value} onChange={(e) => set("stat1Value", e.target.value)} placeholder="Up to 100 Km" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Stat 2 Label</label>
                  <input className={INPUT} value={hero.stat2Label} onChange={(e) => set("stat2Label", e.target.value)} placeholder="Full Charge" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Stat 2 Value</label>
                  <input className={INPUT} value={hero.stat2Value} onChange={(e) => set("stat2Value", e.target.value)} placeholder="2 to 4 Hrs" />
                </div>
              </div>
            </div>

            {/* Live preview */}
            <div className="bg-black rounded-xl p-6 text-white">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Preview</p>
              <h1 className="text-3xl font-bold">{hero.headline || "—"}</h1>
              <p className="mt-1 text-sm text-gray-300">{hero.subheadline || "—"}</p>
              <div className="mt-4 flex items-center gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">{hero.stat1Label}</p>
                  <p className="text-lg font-bold">{hero.stat1Value}</p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400">{hero.stat2Label}</p>
                  <p className="text-lg font-bold">{hero.stat2Value}</p>
                </div>
              </div>
            </div>

            <button
              onClick={save}
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
            >
              {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
