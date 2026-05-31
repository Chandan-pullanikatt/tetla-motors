"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReelItem {
  src: string;
  isVideo: boolean;
}

interface VoicesCoverflowProps {
  items: ReelItem[];
}

const POSITIONS = {
  x:       [0,   230,  420,  580,  710],
  rotateY: [0,   -40,  -54,  -63,  -69],
  scale:   [1,  0.86, 0.74, 0.64, 0.54],
  opacity: [1,   0.9,  0.75, 0.45,   0],
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

// Separate video card: controls play/pause imperatively, loads src only when near center
function VideoCard({
  src,
  isActive,
  withinRange,
  className,
}: {
  src: string;
  isActive: boolean;
  withinRange: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause when active status changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={withinRange ? src : undefined}
      muted
      loop
      playsInline
      preload={isActive ? "auto" : "metadata"}
    />
  );
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
            duration: 0.6,
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
        className="relative h-[540px] md:h-[600px]"
        style={{ perspective: "1200px" }}
        data-lenis-prevent
      >
        {items.map((item, i) => {
          const offset = Math.abs(i - active);
          const withinRange = offset <= 2;

          return (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              onClick={() => goTo(i)}
              className="absolute left-1/2 top-1/2 w-[220px] md:w-[270px] cursor-pointer"
              style={{ willChange: "transform", transformOrigin: "center center" }}
            >
              <article
                className={`relative overflow-hidden rounded-[12px] shadow-lg transition-shadow duration-300 h-[380px] md:h-[470px] ${
                  i === active ? "shadow-black/30" : "shadow-black/10"
                }`}
              >
                <VideoCard
                  src={item.src}
                  isActive={i === active}
                  withinRange={withinRange}
                  className="h-full w-full object-cover"
                />
                {/* Subtle dark scrim on non-active cards */}
                {i !== active && (
                  <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                )}
              </article>
            </div>
          );
        })}
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
