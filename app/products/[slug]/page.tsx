import { getProductBySlug } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { HeroShowcase } from "./HeroShowcase";
import { FeatureCoverflow } from "./FeatureCoverflow";
import { SavingsCalculator } from "./SavingsCalculator";
import { HighlightText } from "./HighlightText";
import type { ProductPageContent } from "@/lib/db/schema";

// Fallback content for products that have no page_content yet
function fallbackContent(name: string): ProductPageContent {
  return {
    tagline: "Efficient, stylish, and built for city rides",
    hero: { type: "video", url: "/v1.mp4" },
    description:
      "Experience effortless electric mobility with the TETLA Classic. Combining timeless **design**, **smart technology**, and zero-emission performance, it's built for drivers who want **sustainability** without compromising **style**.",
    stats: {
      range: "100 KM",
      fullCharge: "4 Hour",
      topSpeed: "100 KM",
      runningCost: "₹0.15/km",
      batteryWarranty: "4 Year",
    },
    showcaseImage: "/3601.jpeg",
    features: [
      { image: "/pa4.jpg", title: "Built for Daily Commutes", description: "Reliable electric mobility designed for work, shopping, and everyday travel without the fuel costs" },
      { image: "/pa2.jpg", title: "Bold Urban Design", description: "Sporty body lines, premium finishes, and vibrant colors create a design that stands out on every ride" },
      { image: "/pa3.jpg", title: "Modern LED", description: "Sharp LED headlamps provide better visibility" },
      { image: "/pa5.jpg", title: "Color Options", description: "Available in eye-catching color variants" },
    ],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const c = (product.pageContent as ProductPageContent) ?? fallbackContent(product.name);
  const stats = [
    { label: "Range", value: c.stats.range },
    { label: "Full Charge", value: c.stats.fullCharge },
    { label: "Top Speed", value: c.stats.topSpeed },
    { label: "Running Cost", value: c.stats.runningCost },
    { label: "Battery Warranty", value: c.stats.batteryWarranty },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-white text-black">
      <Header />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <HeroShowcase name={product.name} tagline={c.tagline} hero={c.hero} />

      {/* ── 2. DESCRIPTION + STATS CARD (overlapping) ────────────────────── */}
      <section className="relative bg-white">
        <div className="px-5 sm:px-8 md:px-12 lg:px-20">
          {/* Figma Frame 367: 1280 wide · radius 16 · border 1px · padding 40 */}
          <div className="relative mt-16 md:mt-[100px] rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.10)] border border-black/5 p-6 sm:p-8 md:p-10 overflow-hidden">
            {/* Faint logo watermarks — top-right & bottom-left corners (Figma: opacity 5%) */}
            <Image
              src="/logocutted.png"
              alt=""
              width={148}
              height={191}
              aria-hidden
              className="pointer-events-none select-none absolute -top-2 right-4 w-[90px] md:w-[148px] h-auto opacity-[0.05]"
            />
            <Image
              src="/logocutted.png"
              alt=""
              width={148}
              height={191}
              aria-hidden
              className="pointer-events-none select-none absolute -bottom-2 left-4 w-[90px] md:w-[148px] h-auto opacity-[0.05]"
            />

            <p className="relative z-10 text-center text-lg md:text-2xl font-medium leading-relaxed text-black/80 max-w-3xl mx-auto">
              <HighlightText text={c.description} />
            </p>

            {/* Stat strip */}
            <div className="relative z-10 mt-6 md:mt-2.5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 lg:divide-x divide-black/10">
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:px-4">
                  <p className="text-[16px] font-semibold leading-none tracking-normal text-[#5A5A5A] mb-2">{s.label}</p>
                  <p className="text-[32px] md:text-[44px] font-normal leading-none tracking-normal text-center text-[#3A3A3A]">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SHOWCASE IMAGE (full-width) ───────────────────────────────── */}
      <section className="bg-white pt-16 md:pt-[100px]">
        <div className="relative w-full aspect-[16/9] md:aspect-[1440/640] max-h-[80vh]">
          <Image
            src={c.showcaseImage}
            alt={`${product.name} showcase`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ── 4. FEATURE BENTO ─────────────────────────────────────────────── */}
      <section className="bg-white pt-16 md:pt-[100px] pb-16 md:pb-[100px]">
        <div className="px-5 sm:px-8 md:px-12 lg:px-20">
          {/* Figma block: 1280×600 — left 480, right 768, gap 32; right rows 370/500 */}
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-[480fr_768fr] lg:grid-rows-[370fr_500fr] lg:aspect-[1280/600]">
            {/* Card 1 — tall left (480×600) */}
            <BentoCard
              f={c.features[0]}
              className="aspect-[480/600] lg:aspect-auto lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:h-full"
            />
            {/* Card 2 — Bold Urban Design, top right full width (768×370) */}
            <BentoCard
              f={c.features[1]}
              className="aspect-[768/370] lg:aspect-auto lg:col-start-2 lg:row-start-1 lg:h-full"
            />
            {/* Cards 3 & 4 — bottom right split (368×500 each) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 lg:col-start-2 lg:row-start-2 lg:h-full">
              <BentoCard f={c.features[2]} className="aspect-[368/500] lg:aspect-auto lg:h-full" />
              <BentoCard f={c.features[3]} className="aspect-[368/500] lg:aspect-auto lg:h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FEATURE COVERFLOW (dark) ──────────────────────────────────── */}
      {/* Figma: full-bleed · bg #00060C · padding-y 80 · gap 24 · height 640 (80+480+80) */}
      <section className="bg-[#00060C] py-12 md:py-20 overflow-hidden">
        <FeatureCoverflow features={c.features} />
      </section>

      {/* ── 6. SAVINGS CALCULATOR (last section) ─────────────────────────── */}
      <div id="savings" className="scroll-mt-24">
        <SavingsCalculator />
      </div>

      {/* ── Hidden anchor for hero CTAs ──────────────────────────────────── */}
      <div id="enquiry" />

      <Footer />
    </div>
  );
}

function BentoCard({ f, className = "" }: { f: ProductPageContent["features"][number]; className?: string }) {
  return (
    <article className={`relative overflow-hidden rounded-2xl group ${className}`}>
      <Image
        src={f.image}
        alt={f.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-chakra text-lg md:text-xl font-bold text-white mb-1.5">{f.title}</h3>
        <p className="text-xs md:text-sm text-white/75 leading-snug max-w-sm">{f.description}</p>
      </div>
    </article>
  );
}
