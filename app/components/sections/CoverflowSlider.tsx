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
  slug?: string;
}

interface CoverflowSliderProps {
  products?: Product[];
  heading?: string;
}

const DEFAULT_PRODUCTS: Product[] = [
  { name: "TETLA Classic", model: "RTO Model", price: "45,999", image: "/pa1.jpg" },
  { name: "TETLA E9 Pro",  model: "RTO Model", price: "62,999", image: "/pa3.jpg" },
  { name: "TETLA Pro Plus", model: "Premium",  price: "78,999", image: "/pa2.jpg" },
  { name: "TETLA Ailes",   model: "Sport",     price: "89,999", image: "/pa4.jpg" },
  { name: "TETLA Voiture", model: "Elite",     price: "1,20,000", image: "/pa5.jpg" },
];

// ─── Position lookup by distance from center (index 0 = center) ────────────
const POSITIONS = {
  x:       [0,   250,  460,  630,  780],
  rotateY: [0,   -42,  -55,  -65,  -70],  // negative = right cards lean left
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
}: CoverflowSliderProps) {
  const [active, setActive] = useState(Math.floor(products.length / 2));
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Layout all cards at current active index ──────────────────────────────
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
        // z-index updates immediately — no interpolation needed
        el.style.zIndex = String(props.zIndex);
      });
    },
    [products]
  );

  // ── Initial layout ────────────────────────────────────────────────────────
  useEffect(() => {
    layoutCards(active, false);
  }, []);

  // ── Navigation ────────────────────────────────────────────────────────────
  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, products.length - 1));
      if (clamped === active) return;
      setActive(clamped);
      layoutCards(clamped, true);
    },
    [active, products.length, layoutCards]
  );

  // Keyboard arrows
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
  const current = products[active];

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden select-none">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">

        {/* ── Heading ── */}
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
            {heading}
          </h2>
          <p className="hidden text-sm text-gray-400 md:block">
            {active + 1} / {products.length}
          </p>
        </div>

        {/* ── 3D Stage ── */}
        <div
          ref={stageRef}
          className="relative h-[480px] md:h-[540px]"
          style={{ perspective: "1100px" }}
          data-lenis-prevent
        >
          {products.map((product, i) => (
            <div
              key={product.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              onClick={() => goTo(i)}
              className="absolute left-1/2 top-1/2 w-[260px] md:w-[300px] cursor-pointer"
              style={{ willChange: "transform", transformOrigin: "center center" }}
            >
              {/* Card */}
              <div
                className={`relative overflow-hidden rounded-2xl shadow-2xl transition-shadow duration-300 ${
                  i === active ? "shadow-black/40" : "shadow-black/10"
                }`}
              >
                {/* Image */}
                <div className="relative h-[340px] md:h-[390px] bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="300px"
                    className="object-cover"
                    loading="lazy"
                  />
                  {/* Subtle overlay on non-active cards */}
                  {i !== active && (
                    <div className="absolute inset-0 bg-black/10" />
                  )}
                </div>

                {/* Info bar */}
                <div className="bg-black px-4 py-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">
                    {product.model}
                  </p>
                  <div className="mt-1 flex items-baseline justify-between">
                    <p className="text-base font-semibold text-white">{product.name}</p>
                    <p className="text-sm font-bold text-white">₹{product.price}</p>
                  </div>
                </div>
              </div>

              {/* "Explore" CTA — only on center card */}
              {i === active && (
                <div className="mt-4 flex justify-center">
                  <button className="rounded-full border border-black/20 bg-white px-6 py-2 text-xs font-semibold tracking-wide text-black shadow-sm transition hover:bg-black hover:text-white">
                    Explore
                  </button>
                </div>
              )}
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

          {/* Dot indicators */}
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
