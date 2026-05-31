"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  name: string;
  model: string;
  price: string;
  image: string;
  description?: string;
  slug?: string;
}

interface CoverflowSliderProps {
  products?: Product[];
  heading?: string;
  subheading?: string;
}

const DEFAULT_PRODUCTS: Product[] = [
  { name: "TETLA Classic", model: "RTO Model", price: "45,999", image: "/pa1.jpg", description: "Efficient, stylish, and built for city rides" },
  { name: "TETLA E9 Pro",  model: "RTO Model", price: "62,999", image: "/pa3.jpg", description: "Smart performance with premium comfort" },
  { name: "TETLA Pro Plus", model: "Premium",  price: "78,999", image: "/pa2.jpg", description: "Next-gen riding with advanced tech built in" },
  { name: "TETLA Ailes",   model: "Sport",     price: "89,999", image: "/pa4.jpg", description: "Built for speed, designed for the bold" },
  { name: "TETLA Voiture", model: "Elite",     price: "1,20,000", image: "/pa5.jpg", description: "The pinnacle of electric luxury on two wheels" },
];

// ─── Position lookup by distance from center (index 0 = center) ────────────
const POSITIONS = {
  x:       [0,   250,  460,  630,  780],
  rotateY: [0,   -42,  -55,  -65,  -70],
  scale:   [1,  0.88, 0.76, 0.66, 0.56],
  opacity: [1,     1,  0.9,  0.65,   0],
  zIndex:  [50,   40,   30,   20,    0],
} as const;

function getProps(offset: number) {
  const abs = Math.min(Math.abs(offset), POSITIONS.x.length - 1);
  const sign = offset >= 0 ? 1 : -1;
  return {
    x:       sign * POSITIONS.x[abs],
    rotateY: sign * POSITIONS.rotateY[abs],
    scale:   POSITIONS.scale[abs],
    opacity: POSITIONS.opacity[abs],
    zIndex:  POSITIONS.zIndex[abs],
  };
}

export function CoverflowSlider({
  products = DEFAULT_PRODUCTS,
  heading = "Explore All Vehicles",
  subheading = "Discover Tetla's smart, stylish EV bikes built for performance and convenience",
}: CoverflowSliderProps) {
  const [active, setActive] = useState(Math.floor(products.length / 2));
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const layoutCards = useCallback(
    (targetIndex: number, animate: boolean) => {
      products.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const props = getProps(i - targetIndex);

        if (animate) {
          gsap.to(el, {
            x: props.x,
            rotateY: props.rotateY,
            scale: props.scale,
            opacity: props.opacity,
            duration: 0.65,
            ease: "power3.out",
            overwrite: "auto",
          });
        } else {
          gsap.set(el, {
            xPercent: -50,
            yPercent: -50,
            x: props.x,
            rotateY: props.rotateY,
            scale: props.scale,
            opacity: props.opacity,
          });
        }
        el.style.zIndex = String(props.zIndex);
      });
    },
    [products]
  );

  useEffect(() => {
    layoutCards(active, false);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, products.length - 1));
      if (clamped === active) return;
      setActive(clamped);
      layoutCards(clamped, true);
    },
    [active, products.length, layoutCards]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(active - 1);
      if (e.key === "ArrowRight") goTo(active + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  const canPrev = active > 0;
  const canNext = active < products.length - 1;

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden select-none">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">

        {/* ── Heading ── */}
        <div className="mb-12 text-center">
          <h2
            className="leading-none text-[#333333]"
            style={{ fontWeight: 700, fontSize: "32px" }}
          >
            {heading}
          </h2>
          <p
            className="mt-2 leading-none text-[#555555]"
            style={{ fontWeight: 400, fontSize: "14px" }}
          >
            {subheading}
          </p>
        </div>

        {/* ── 3D Stage ── */}
        <div
          ref={stageRef}
          className="relative h-[400px] md:h-[520px]"
          style={{ perspective: "1100px" }}
          data-lenis-prevent
        >
          {products.map((product, i) => (
            <div
              key={product.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              onClick={() => goTo(i)}
              className="absolute left-1/2 top-1/2 w-[240px] md:w-[311px] cursor-pointer"
              style={{ willChange: "transform", transformOrigin: "center center" }}
            >
              {/* Card */}
              <div
                className={`relative overflow-hidden rounded-xl shadow-2xl transition-shadow duration-300 h-[320px] md:h-[420px] ${
                  i === active ? "shadow-black/40" : "shadow-black/10"
                }`}
              >
                {/* Full-bleed image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 240px, 311px"
                  className="object-cover"
                  loading="lazy"
                />

                {/* Gradient overlay — starts at ~38% from top (161/420), scales with card height */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none h-full"
                  style={{
                    background: "linear-gradient(to bottom, transparent 38%, #000000 100%)",
                  }}
                />

                {/* Non-active card dimmer */}
                {i !== active && (
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                )}

                {/* Overlaid content */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-0.5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-gray-400">
                    {product.model}
                  </p>
                  <p className="text-sm font-semibold text-white leading-tight">
                    {product.name}
                  </p>
                  {product.description && (
                    <p className="text-[10px] text-gray-300 leading-snug">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="text-[9px] text-gray-400">Starting from</p>
                      <p className="text-base font-bold text-white">₹{product.price}</p>
                    </div>
                    <button className="rounded-full border border-white/70 bg-transparent px-4 py-1.5 text-[10px] font-semibold text-white hover:bg-white hover:text-black transition">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Controls ── */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={() => goTo(active - 1)}
            disabled={!canPrev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-black shadow-sm transition hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-25"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? "h-2 w-6 bg-black"
                    : "h-2 w-2 bg-gray-300 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(active + 1)}
            disabled={!canNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-black shadow-sm transition hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-25"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
