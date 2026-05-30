"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LazyVideo } from "@/app/components/ui/LazyVideo";

interface ReelItem {
  src: string;
  isVideo: boolean;
}

interface VoicesCoverflowProps {
  items: ReelItem[];
}

const POSITIONS = {
  x:       [0,   220,  400,  550,  680],
  rotateY: [0,   -38,  -52,  -62,  -68],
  scale:   [1,  0.86, 0.74, 0.64, 0.54],
  opacity: [1,   0.95,  0.8,  0.55,   0],
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

export function VoicesCoverflow({ items }: VoicesCoverflowProps) {
  const [active, setActive] = useState(Math.floor(items.length / 2));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const layoutCards = useCallback(
    (targetIndex: number, animate: boolean) => {
      items.forEach((_, i) => {
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
    [items]
  );

  useEffect(() => {
    layoutCards(active, false);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(next, items.length - 1));
      if (clamped === active) return;
      setActive(clamped);
      layoutCards(clamped, true);
    },
    [active, items.length, layoutCards]
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
  const canNext = active < items.length - 1;

  return (
    <>
      {/* 3D Stage */}
      <div
        className="relative h-[540px] md:h-[580px]"
        style={{ perspective: "1100px" }}
        data-lenis-prevent
      >
        {items.map((item, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            onClick={() => goTo(i)}
            className="absolute left-1/2 top-1/2 w-[260px] md:w-[280px] cursor-pointer"
            style={{ willChange: "transform", transformOrigin: "center center" }}
          >
            <article
              className={`relative overflow-hidden rounded-[12px] shadow-lg transition-shadow duration-300 h-[440px] md:h-[500px] ${
                i === active ? "shadow-black/30" : "shadow-black/10"
              }`}
            >
              {item.isVideo ? (
                <LazyVideo src={item.src} className="h-full w-full object-cover" />
              ) : (
                <Image
                  src={item.src}
                  alt="Testimonial"
                  fill
                  sizes="280px"
                  className="object-cover"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-black/20 z-10" />
              {!item.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-black">
                      <path d="M9 7.5v9l7-4.5-7-4.5z" />
                    </svg>
                  </div>
                </div>
              )}
            </article>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          onClick={() => goTo(active - 1)}
          disabled={!canPrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-black shadow-sm transition hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-25"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2">
          {items.map((_, i) => (
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
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white text-black shadow-sm transition hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-25"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </>
  );
}
