"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface Frame360Props {
  /** Sequential turntable frames, sorted — one full revolution */
  frames: string[];
  className?: string;
}

/**
 * Interactive 360° image-sequence viewer.
 * - Preloads every frame before unlocking interaction (no flicker, no layout shift)
 * - Drag horizontally to rotate; wraps infinitely in both directions
 * - Momentum glide on release
 * - Angle indicator line tracks the current rotation
 */
export function Frame360({ frames, className = "" }: Frame360Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const drag = useRef({ active: false, startX: 0, startFrame: 0, lastX: 0, lastT: 0, velocity: 0 });
  const glideTween = useRef<gsap.core.Tween | null>(null);

  const ready = loadedCount >= frames.length;
  const progress = frames.length ? loadedCount / frames.length : 0;

  const wrapFrame = useCallback(
    (i: number) => ((Math.round(i) % frames.length) + frames.length) % frames.length,
    [frames.length]
  );

  // ── Smart preloading: cache every frame before unlocking interaction ──
  useEffect(() => {
    let cancelled = false;
    setLoadedCount(0);
    frames.forEach((src) => {
      const img = new window.Image();
      const done = () => { if (!cancelled) setLoadedCount((c) => c + 1); };
      img.onload = done;
      img.onerror = done;
      img.src = src;
    });
    return () => { cancelled = true; };
  }, [frames]);

  // ── Drag-to-rotate ──
  const onPointerDown = (e: React.PointerEvent) => {
    if (!ready) return;
    glideTween.current?.kill();
    setHintVisible(false);
    drag.current = {
      active: true,
      startX: e.clientX,
      startFrame: frame,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const width = wrapRef.current?.clientWidth ?? 600;
    const dx = e.clientX - d.startX;
    // One full drag across the viewer = one full revolution
    setFrame(wrapFrame(d.startFrame - (dx / width) * frames.length));

    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = now;
  };

  const onPointerUp = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    // Momentum glide
    const width = wrapRef.current?.clientWidth ?? 600;
    const proxy = { f: frame };
    const extra = -(d.velocity * 260 / width) * frames.length;
    glideTween.current = gsap.to(proxy, {
      f: frame + extra,
      duration: Math.min(Math.abs(d.velocity) * 0.8, 1.2),
      ease: "power2.out",
      onUpdate: () => setFrame(wrapFrame(proxy.f)),
    });
  };

  useEffect(() => () => { glideTween.current?.kill(); }, []);

  return (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      {/* Viewer */}
      <div
        ref={wrapRef}
        className={`relative w-full flex-1 min-h-0 flex items-center justify-center select-none ${
          ready ? "cursor-grab active:cursor-grabbing" : "cursor-wait"
        }`}
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* eslint-disable-next-line @next/next/no-img-element — rapid src swap needs a plain img */}
        <img
          src={frames[frame]}
          alt={`360 view, angle ${Math.round((frame / frames.length) * 360)}°`}
          className={`h-full w-full object-contain pointer-events-none transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-40"
          }`}
          draggable={false}
          style={{
            // Feather the studio-grey edges so the bike dissolves into the
            // dark background instead of sitting in a visible rectangle
            maskImage:
              "radial-gradient(ellipse 86% 84% at 50% 47%, #000 58%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 86% 84% at 50% 47%, #000 58%, transparent 100%)",
          }}
        />

        {/* Drag hint */}
        {ready && hintVisible && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase pointer-events-none">
            <span className="text-base">←</span>
            <span>Drag to rotate</span>
            <span className="text-base">→</span>
          </div>
        )}
      </div>

      {/* Angle indicator / load progress */}
      <div className="relative w-48 h-px bg-white/15 overflow-visible shrink-0">
        {ready ? (
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[3px] w-8 rounded-full bg-white transition-none"
            style={{ left: `${(frame / frames.length) * (100 - 100 / 6)}%` }}
          />
        ) : (
          <div
            className="absolute top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-white/60"
            style={{ width: `${progress * 100}%` }}
          />
        )}
      </div>
      {!ready && (
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 -mt-3">
          Loading {Math.round(progress * 100)}%
        </p>
      )}
    </div>
  );
}
