"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Feature {
  image: string;
  title: string;
  description: string;
}

interface Props {
  features: Feature[];
}

// Figma: active card 836×480 (opacity 1) · side cards 836×400 (opacity 0.5) · radius 16
const BASE_W = 836;
const ACTIVE_RATIO = 480 / BASE_W; // active height = width × this
const SIDE_RATIO = 400 / BASE_W; // side height = width × this

function circularOffset(i: number, active: number, total: number): number {
  let o = i - active;
  if (o > total / 2) o -= total;
  if (o < -total / 2) o += total;
  return o;
}

export function FeatureCoverflow({ features }: Props) {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const layout = useCallback(
    (target: number, animate: boolean) => {
      const sample = cardRefs.current[0];
      if (!sample) return;
      const w = sample.offsetWidth;
      const gap = w * 0.045; // small gap between center and peeking side cards
      const activeH = w * ACTIVE_RATIO;
      const sideH = w * SIDE_RATIO;

      // Stage height follows the active card so the section never collapses
      if (stageRef.current) stageRef.current.style.height = `${activeH}px`;

      features.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const off = circularOffset(i, target, features.length);
        const abs = Math.abs(off);
        const sign = off >= 0 ? 1 : -1;

        let x = 0;
        let opacity = 1;
        let height = activeH;
        let zIndex = 30;

        if (abs === 1) {
          x = sign * (w + gap); // sits beside the center card → only its inner edge peeks
          opacity = 0.5;
          height = sideH;
          zIndex = 20;
        } else if (abs >= 2) {
          x = sign * (w + gap) * 1.7; // pushed fully out of view
          opacity = 0;
          height = sideH;
          zIndex = 10;
        }

        const props = { xPercent: -50, yPercent: -50, x, height, opacity };
        if (animate) {
          gsap.to(el, { ...props, duration: 0.6, ease: "power3.out", overwrite: "auto" });
        } else {
          gsap.set(el, props);
        }
        el.style.zIndex = String(zIndex);
      });
    },
    [features]
  );

  useEffect(() => {
    layout(active, false);
    const onResize = () => layout(active, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, layout]);

  const goTo = useCallback(
    (next: number) => {
      const wrapped = ((next % features.length) + features.length) % features.length;
      if (wrapped === active) return;
      setActive(wrapped);
      layout(wrapped, true);
    },
    [active, features.length, layout]
  );

  return (
    <div className="relative">
      {/* Stage — side cards peek beyond it and are clipped by the section's overflow-hidden */}
      <div ref={stageRef} className="relative h-[220px]" data-lenis-prevent>
        {features.map((f, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            onClick={() => goTo(i)}
            className="absolute left-1/2 top-1/2 w-[min(836px,88vw)] cursor-pointer"
            style={{ willChange: "transform", transformOrigin: "center center" }}
          >
            <article className="relative h-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={f.image}
                alt={f.title}
                fill
                sizes="836px"
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="font-chakra text-xl md:text-2xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/70 leading-snug max-w-lg">{f.description}</p>
              </div>
            </article>
          </div>
        ))}

        {/* Arrows pinned to the center card's edges */}
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
          <div className="relative w-[min(836px,88vw)]">
            <button
              onClick={() => goTo(active - 1)}
              className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goTo(active + 1)}
              className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "h-2 w-6 bg-white" : "h-2 w-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
