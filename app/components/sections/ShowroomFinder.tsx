"use client";

import { useMemo, useState } from "react";
import { Search, MapPin } from "lucide-react";

export type Showroom = {
  name: string;
  address: string;
  contact: string;
  distance: string;
  city: string;
  postcode: string;
  mapQuery: string;
};

export const showrooms: Showroom[] = [
  {
    name: "Tetla Experience Center - Karanthur",
    address: "DOAAA BUILDING, near NJAANA PETROL PUMP, Karanthur, Kozhikode 673571",
    contact: "info@tetlamotors.com · +91 96059 29312",
    distance: "2.4 KM",
    city: "Kozhikode",
    postcode: "673571",
    mapQuery: "Karanthur, Kozhikode, Kerala",
  },
  {
    name: "Tetla Experience Center - Kunnamangalam",
    address: "Doaaa Building, Kunnamangalam, Kozhikode, Kerala 673571",
    contact: "info@tetlamotors.com · +91 96059 29312",
    distance: "3.6 KM",
    city: "Kozhikode",
    postcode: "673571",
    mapQuery: "Kunnamangalam, Kozhikode, Kerala",
  },
  {
    name: "Tetla Experience Center - Mavoor Road",
    address: "Mavoor Road, Arayidathupalam, Kozhikode, Kerala 673004",
    contact: "info@tetlamotors.com · +91 96059 29312",
    distance: "4.4 KM",
    city: "Kozhikode",
    postcode: "673004",
    mapQuery: "Mavoor Road, Kozhikode, Kerala",
  },
];

export function ShowroomFinder() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return showrooms;
    return showrooms.filter(
      (s) =>
        s.city.toLowerCase().includes(q) ||
        s.postcode.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
    );
  }, [query]);

  const mapCenter = filtered[0]?.mapQuery ?? showrooms[0].mapQuery;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[400px_1fr]">
      {/* Left — list */}
      <div className="rounded-2xl border border-black/10 bg-white p-5 md:p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#1a1a1a]">Find a Showroom</h3>

        {/* Search */}
        <div className="relative mt-4">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#999]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter City or Postcode"
            className="h-11 w-full rounded-lg border border-black/10 bg-[#FAFAFA] pl-10 pr-4 text-sm text-[#1a1a1a] outline-none placeholder:text-[#999] focus:border-[#1a1a1a]/40 transition-colors"
          />
        </div>

        {/* Cards */}
        <div className="mt-4 max-h-[440px] space-y-4 overflow-y-auto pr-1">
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-[#999]">No showrooms found for “{query}”.</p>
          )}
          {filtered.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-black/10 bg-[#FAFAFA] p-4 transition-colors hover:border-black/20"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-sm font-semibold leading-snug text-[#1a1a1a]">{s.name}</h4>
                <span className="shrink-0 rounded-md bg-[#E8F8F2] px-2 py-1 text-[11px] font-semibold text-[#00A37A]">
                  {s.distance}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#666]">{s.address}</p>
              <p className="mt-1 text-xs leading-relaxed text-[#888]">{s.contact}</p>
              <a
                href="/#dealership"
                className="mt-3 flex w-full items-center justify-center rounded-lg bg-[#1a1a1a] py-2.5 text-xs font-semibold text-white transition hover:bg-black"
              >
                Book Test Ride
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Right — map */}
      <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm lg:min-h-[520px]">
        <iframe
          title="Tetla Showroom Locations"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(mapCenter)}&z=13&output=embed`}
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-[#1a1a1a] shadow-sm backdrop-blur">
          <MapPin size={14} className="text-[#FF0000]" />
          {filtered.length} {filtered.length === 1 ? "showroom" : "showrooms"} near you
        </div>
      </div>
    </div>
  );
}
