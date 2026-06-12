"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

interface ViewAngle {
  src: string;
  label: string;
}

interface Props {
  angles: ViewAngle[];
  /** Turntable video (e.g. Cloudinary). When set, drag scrubs the rotation. */
  videoUrl?: string | null;
  /** Turntable still frames (public/360/{slug}/). Takes priority over video. */
  frames?: string[];
}

// ─── Frame-sequence spinner: true 360 from turntable stills ──────────────────
function FrameTurntable({ frames }: { frames: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const drag = useRef({ active: false, startX: 0, startFrame: 0, lastX: 0, lastT: 0, velocity: 0 });
  const glideTween = useRef<gsap.core.Tween | null>(null);

  const wrapFrame = useCallback(
    (i: number) => ((Math.round(i) % frames.length) + frames.length) % frames.length,
    [frames.length]
  );

  // Preload every frame once so dragging never stutters
  useEffect(() => {
    frames.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [frames]);

  const onPointerDown = (e: React.PointerEvent) => {
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

  return (
    <div
      ref={wrapRef}
      className="relative w-full max-w-[680px] mx-auto select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* eslint-disable-next-line @next/next/no-img-element — rapid src swap needs a plain img */}
      <img
        src={frames[frame]}
        alt={`View angle ${frame + 1} of ${frames.length}`}
        className="w-full aspect-[4/3] object-contain pointer-events-none drop-shadow-2xl"
        draggable={false}
      />
      {hintVisible && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase pointer-events-none">
          <span className="text-base">←</span>
          <span>Drag to rotate</span>
          <span className="text-base">→</span>
        </div>
      )}
    </div>
  );
}

// ─── Video turntable: autoplays a slow spin; dragging scrubs the rotation ────
function VideoTurntable({ videoUrl }: { videoUrl: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startTime: 0, lastX: 0, lastT: 0, velocity: 0 });
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [interacted, setInteracted] = useState(false);

  const wrapTime = (t: number, d: number) => ((t % d) + d) % d;

  const onPointerDown = (e: React.PointerEvent) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    v.pause();
    setInteracted(true);
    drag.current = {
      active: true,
      startX: e.clientX,
      startTime: v.currentTime,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const v = videoRef.current;
    const d = drag.current;
    if (!d.active || !v || !v.duration) return;

    const width = wrapRef.current?.clientWidth ?? 600;
    const dx = e.clientX - d.startX;
    // One full drag across the viewer = one full rotation
    v.currentTime = wrapTime(d.startTime - (dx / width) * v.duration, v.duration);

    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt; // px per ms
    d.lastX = e.clientX;
    d.lastT = now;
  };

  const onPointerUp = () => {
    const v = videoRef.current;
    const d = drag.current;
    if (!d.active || !v || !v.duration) return;
    d.active = false;

    // Momentum: let the spin glide out, then resume the idle autoplay
    const width = wrapRef.current?.clientWidth ?? 600;
    const glide = { t: v.currentTime };
    const extra = -(d.velocity * 220 / width) * v.duration; // glide distance in seconds
    gsap.to(glide, {
      t: v.currentTime + extra,
      duration: Math.min(Math.abs(d.velocity) * 0.9, 1.4),
      ease: "power2.out",
      onUpdate: () => { v.currentTime = wrapTime(glide.t, v.duration); },
      onComplete: () => {
        resumeTimer.current = setTimeout(() => v.play().catch(() => {}), 1800);
      },
    });
  };

  useEffect(() => () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full max-w-[680px] mx-auto select-none cursor-grab active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full aspect-[4/3] object-contain pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {!interacted && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase pointer-events-none">
          <span className="text-base">←</span>
          <span>Drag to rotate</span>
          <span className="text-base">→</span>
        </div>
      )}
    </div>
  );
}

// ─── Image fallback: 2-angle flip on a reflective stage ──────────────────────
function ImageTurntable({ angles }: { angles: ViewAngle[] }) {
  const [current, setCurrent] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const wobble = useRef<gsap.core.Tween | null>(null);
  const startX = useRef(0);
  const dragging = useRef(false);

  // Idle wobble — the bike slowly sways until first touched
  useEffect(() => {
    const el = imgWrapRef.current;
    if (!el) return;
    gsap.set(el, { rotateY: -7 });
    wobble.current = gsap.to(el, {
      rotateY: 7,
      duration: 5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => { wobble.current?.kill(); };
  }, []);

  const stopWobble = () => {
    wobble.current?.kill();
    wobble.current = null;
  };

  const swapTo = useCallback((next: number, direction: number) => {
    const el = imgWrapRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0.2,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        setCurrent(next);
        gsap.fromTo(
          el,
          { rotateY: direction > 0 ? 90 : -90, opacity: 0.2 },
          { rotateY: 0, opacity: 1, duration: 0.32, ease: "power2.out" }
        );
      },
    });
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === current) return;
      stopWobble();
      swapTo(idx, idx > current ? 1 : -1);
    },
    [current, swapTo]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    setHintVisible(false);
    stopWobble();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !imgWrapRef.current) return;
    const dx = e.clientX - startX.current;
    gsap.set(imgWrapRef.current, {
      rotateY: dx * 0.12,
      opacity: Math.max(0.3, 1 - Math.abs(dx) / 500),
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 80) {
      const direction = dx < 0 ? 1 : -1;
      const next = ((current + direction) + angles.length) % angles.length;
      swapTo(next, direction);
    } else if (imgWrapRef.current) {
      gsap.to(imgWrapRef.current, {
        rotateY: 0,
        opacity: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.6)",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div
        className="relative select-none cursor-grab active:cursor-grabbing w-full max-w-[640px]"
        style={{ perspective: "1400px", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={imgWrapRef} style={{ transformStyle: "preserve-3d" }}>
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={angles[current].src}
              alt={angles[current].label}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 640px"
              priority
            />
          </div>
          {/* Reflection */}
          <div
            className="relative w-full aspect-[4/3] -mt-[12%] opacity-[0.12] pointer-events-none"
            style={{
              transform: "scaleY(-1)",
              maskImage: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 38%)",
              WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 38%)",
            }}
            aria-hidden
          >
            <Image
              src={angles[current].src}
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 640px"
              loading="lazy"
            />
          </div>
        </div>

        {hintVisible && (
          <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase pointer-events-none">
            <span className="text-base">←</span>
            <span>Drag to rotate</span>
            <span className="text-base">→</span>
          </div>
        )}
      </div>

      {/* Angle selector */}
      <div className="flex items-center gap-8">
        {angles.map((angle, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className={`h-px transition-all duration-300 rounded-full ${
                i === current ? "w-14 bg-white" : "w-6 bg-white/25 group-hover:bg-white/50"
              }`}
            />
            <span
              className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${
                i === current ? "text-white" : "text-white/30 group-hover:text-white/60"
              }`}
            >
              {angle.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProductViewer360({ angles, videoUrl, frames }: Props) {
  // Need at least 8 frames for the spin to read as rotation rather than flicker
  const hasFrames = frames && frames.length >= 8;

  return (
    <div className="relative">
      {/* Stage floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(120,160,255,0.06) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      {hasFrames ? (
        <FrameTurntable frames={frames} />
      ) : videoUrl ? (
        <VideoTurntable videoUrl={videoUrl} />
      ) : (
        <ImageTurntable angles={angles} />
      )}
    </div>
  );
}
