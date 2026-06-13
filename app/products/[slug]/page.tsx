import { getProductBySlug } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Frame360 } from "./Frame360";
import { HeroShowcase } from "./HeroShowcase";

// ─── Static fallback data (used when DB row has no extras) ────────────────────
const PRODUCT_EXTRAS: Record<string, {
  tagline: string;
  range: string;
  chargeTime: string;
  topSpeed: string;
  motorPower: string;
  features: { title: string; desc: string }[];
  fullSpecs: { label: string; value: string }[];
}> = {
  "tetla-classic": {
    tagline: "Efficient, stylish, and built for city rides",
    range: "Up to 100 Km",
    chargeTime: "2 to 4 Hrs",
    topSpeed: "60 Km/h",
    motorPower: "1500W",
    features: [
      { title: "Smart LED Lighting", desc: "Ultra-bright adaptive LED headlamps for all road and visibility conditions" },
      { title: "Digital Instrument Cluster", desc: "Full-colour TFT display showing speed, battery level, and trip data in real time" },
      { title: "Regenerative Braking", desc: "Converts deceleration energy back into charge — every stop extends your range" },
    ],
    fullSpecs: [
      { label: "Motor", value: "1500W BLDC Hub Motor" },
      { label: "Battery", value: "60V 30Ah Lithium-ion" },
      { label: "Range", value: "Up to 100 Km" },
      { label: "Top Speed", value: "60 Km/h" },
      { label: "Charge Time", value: "2 to 4 Hours" },
      { label: "Braking", value: "Disc + Drum (CBS)" },
      { label: "Suspension (F)", value: "Telescopic Fork" },
      { label: "Suspension (R)", value: "Dual Shock Absorbers" },
      { label: "Tyre (F)", value: "90/90-12" },
      { label: "Tyre (R)", value: "90/90-12" },
      { label: "Kerb Weight", value: "115 Kg" },
      { label: "Load Capacity", value: "150 Kg" },
    ],
  },
  "tetla-e9-pro": {
    tagline: "Smart performance with premium comfort",
    range: "Up to 120 Km",
    chargeTime: "2 to 4 Hrs",
    topSpeed: "70 Km/h",
    motorPower: "2000W",
    features: [
      { title: "Pro-Tuned Suspension", desc: "Sport-calibrated front forks and mono-shock rear for a planted, confident ride" },
      { title: "Fast Charge Ready", desc: "Compatible with rapid chargers — back to full in under 3 hours" },
      { title: "Ride Mode Selection", desc: "Switch between Eco, City, and Sport modes for the performance you need" },
    ],
    fullSpecs: [
      { label: "Motor", value: "2000W BLDC Hub Motor" },
      { label: "Battery", value: "72V 32Ah Lithium-ion" },
      { label: "Range", value: "Up to 120 Km" },
      { label: "Top Speed", value: "70 Km/h" },
      { label: "Charge Time", value: "2 to 4 Hours" },
      { label: "Braking", value: "Dual Disc (ABS)" },
      { label: "Suspension (F)", value: "USD Telescopic Fork" },
      { label: "Suspension (R)", value: "Mono-shock" },
      { label: "Tyre (F)", value: "100/80-12" },
      { label: "Tyre (R)", value: "100/80-12" },
      { label: "Kerb Weight", value: "125 Kg" },
      { label: "Load Capacity", value: "160 Kg" },
    ],
  },
};

// Default extras for products not yet in the map
const DEFAULT_EXTRAS = PRODUCT_EXTRAS["tetla-classic"];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const extras = PRODUCT_EXTRAS[slug] ?? DEFAULT_EXTRAS;
  const specs = product.specs as Record<string, string> ?? {};
  const priceFormatted = Number(product.price).toLocaleString("en-IN");

  // True 360 spin: turntable stills live in public/360/{slug}/ (sorted by
  // filename). public/360/_default/ (extracted from 3dvideo.mp4 via
  // scripts/extract-360-frames.js) is the shared placeholder until each
  // product gets its own shoot.
  const readFrames = (dirName: string): string[] => {
    const dir = path.join(process.cwd(), "public", "360", dirName);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/360/${dirName}/${f}`);
  };
  const frames = readFrames(slug);
  const heroFrames = frames.length >= 8 ? frames : readFrames("_default");

  return (
    <div className="w-full overflow-x-hidden bg-[#030712] text-white">
      <Header />

      {/* ── 1. PREMIUM BANNER — full-screen dark cinematic ───────────────── */}
      <HeroShowcase
        name={product.name}
        model={specs.model ?? "RTO Model"}
        tagline={extras.tagline}
        image="/3601.jpeg"
        stats={[
          { label: "Starting from", value: `₹${priceFormatted}` },
          { label: "Range", value: extras.range },
          { label: "Charge Time", value: extras.chargeTime },
          { label: "Top Speed", value: extras.topSpeed },
        ]}
      />

      {/* ── 2. FULL-SCREEN 360° TURNTABLE ────────────────────────────────── */}
      <section className="relative h-screen w-full bg-black flex flex-col">
        <div className="pt-24 md:pt-28 text-center shrink-0">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">Interactive</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Explore Every Angle</h2>
          <p className="mt-3 text-sm text-white/40">Drag left or right to rotate</p>
        </div>
        <div className="flex-1 min-h-0 flex items-center justify-center px-5">
          <Frame360 frames={heroFrames} className="h-full w-full max-w-[1100px]" />
        </div>
      </section>

      {/* ── 3. PERFORMANCE NUMBERS ───────────────────────────────────────── */}
      <section className="bg-[#030712] py-20 border-y border-white/5">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-white/10">
            {[
              { value: extras.range, label: "Electric Range" },
              { value: extras.topSpeed, label: "Top Speed" },
              { value: extras.chargeTime, label: "Full Charge" },
              { value: extras.motorPower, label: "Motor Power" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:px-8">
                <p className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/35">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURE SPOTLIGHT — text left, image right ────────────────── */}
      <section className="bg-black py-24 md:py-36">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4">Design</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                Built for the<br />Road Ahead
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
                Every curve, every line of the {product.name} is engineered with purpose — aerodynamic efficiency meets bold, head-turning aesthetics designed for the modern urban rider.
              </p>
              <div className="space-y-6">
                {extras.features.map((f) => (
                  <div key={f.title} className="flex gap-4">
                    <div className="mt-1 w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{f.title}</p>
                      <p className="text-sm text-white/40 leading-snug">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#0d1117]">
              <Image
                src="/3602.jpeg"
                alt={`${product.name} front view`}
                fill
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FULL-BLEED BANNER ─────────────────────────────────────────── */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden bg-[#080c10] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/3601.jpeg"
            alt={product.name}
            fill
            className="object-cover object-center opacity-25"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-[#030712]" />
        </div>
        <div className="relative z-10 text-center px-5">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mb-4">The future of urban mobility</p>
          <h2
            className="font-black uppercase tracking-tighter text-white leading-none"
            style={{ fontSize: "clamp(42px, 10vw, 120px)" }}
          >
            Zero Emissions.<br />Maximum Thrill.
          </h2>
        </div>
      </section>

      {/* ── 6. TECH SPECS SCREEN ─────────────────────────────────────────── */}
      <section className="bg-[#030712] py-24 md:py-32" id="specs">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-6">
          <div className="mb-14 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">Technical</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Full Specifications</h2>
          </div>

          {/* Screen frame */}
          <div
            className="rounded-2xl border border-white/8 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0d1117 0%, #060a0f 100%)" }}
          >
            {/* Screen top bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="ml-3 text-[10px] uppercase tracking-[0.25em] text-white/20 font-mono">
                {product.name} — Technical Data Sheet
              </span>
            </div>

            {/* Spec grid */}
            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5 rounded-xl overflow-hidden">
                {extras.fullSpecs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between px-5 py-4 bg-[#0d1117]"
                  >
                    <span className="text-xs uppercase tracking-[0.18em] text-white/30 font-mono">
                      {spec.label}
                    </span>
                    <span className="text-sm font-semibold text-white font-mono">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Screen footer */}
              <div className="mt-6 flex items-center justify-between text-[10px] font-mono text-white/15 uppercase tracking-widest">
                <span>TETLA Motors — {product.name}</span>
                <span>Specifications subject to change</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CTA / ENQUIRY ─────────────────────────────────────────────── */}
      <section className="bg-white py-24 md:py-32 text-black" id="enquiry">
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-4">Own One</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Ready to Ride<br />the Future?
          </h2>
          <p className="text-base text-black/50 max-w-md mx-auto mb-10">
            Book a test ride at your nearest TETLA dealership, or place your order today. Delivery available across India.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/#dealership"
              className="rounded-full bg-black px-10 py-4 text-sm font-bold text-white hover:bg-black/80 transition"
            >
              Make an Enquiry
            </Link>
            <Link
              href="/dealerships"
              className="rounded-full border border-black/20 px-10 py-4 text-sm font-bold text-black hover:border-black/50 transition"
            >
              Find a Dealership
            </Link>
          </div>

          {/* Price callout */}
          <div className="mt-14 inline-flex items-baseline gap-2">
            <span className="text-sm text-black/30 uppercase tracking-widest">Starting from</span>
            <span className="text-4xl font-black text-black">₹{priceFormatted}</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
