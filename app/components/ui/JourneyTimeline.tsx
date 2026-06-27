"use client";

import { useEffect, useRef, useState } from "react";

export type Milestone = {
  year: string;
  title: string;
  desc: string;
};

/* ──────────────────────────────────────────────────────────────────────────
   Geometry (computed once, in SVG user units — viewBox is stretched to fit
   the container width via preserveAspectRatio="none", and the stroke keeps a
   constant width thanks to vector-effect="non-scaling-stroke").
   ────────────────────────────────────────────────────────────────────────── */
const VB_W = 1000;
const GAP = 300; // vertical distance between milestone nodes
const PAD = 120; // tail length above the first / below the last node
const CENTER = VB_W / 2;
const AMP = 165; // how far nodes swing left / right of the centre

function nodeX(i: number) {
  // even → right, odd → left  (first card sits on the right, like the design)
  return i % 2 === 0 ? CENTER + AMP : CENTER - AMP;
}

/** Smooth (Catmull-Rom → cubic bézier) path through a list of points. */
function buildPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export function JourneyTimeline({ milestones }: { milestones: Milestone[] }) {
  const N = milestones.length;

  // node positions (cards + dots) and the full set of anchors (with tails)
  const nodes = milestones.map((_, i) => ({ x: nodeX(i), y: PAD + i * GAP }));
  const VB_H = PAD * 2 + (N - 1) * GAP;
  const anchors = [{ x: CENTER, y: 0 }, ...nodes, { x: CENTER, y: VB_H }];
  const pathD = buildPath(anchors);

  return (
    <>
      {/* ── Mobile: simple left-aligned timeline (the S-curve needs width) ── */}
      <div className="md:hidden">
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-[#FF0000]/25" />
          <div className="space-y-10">
            {milestones.map((m, i) => (
              <Reveal key={m.year} className="relative" delay={i * 80}>
                <span className="absolute left-4 top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-white bg-[#FF0000] shadow" />
                <div className="ml-10">
                  <Card m={m} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Desktop: animated S-curve ── */}
      <div className="hidden md:block">
        <SCurve
          milestones={milestones}
          nodes={nodes}
          pathD={pathD}
          vbW={VB_W}
          vbH={VB_H}
        />
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

function SCurve({
  milestones,
  nodes,
  pathD,
  vbW,
  vbH,
}: {
  milestones: Milestone[];
  nodes: { x: number; y: number }[];
  pathD: string;
  vbW: number;
  vbH: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const progRef = useRef<SVGPathElement>(null);
  const lenRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const prog = progRef.current;
    const base = baseRef.current;
    if (!wrap || !prog || !base) return;

    const len = base.getTotalLength();
    lenRef.current = len;
    prog.style.strokeDasharray = `${len}`;
    prog.style.strokeDashoffset = `${len}`;

    const update = () => {
      rafRef.current = 0;
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section top hits 80% of the viewport,
      // 1 by the time most of it has scrolled past the middle.
      const progress = (vh * 0.8 - rect.top) / (rect.height * 0.75);
      const clamped = Math.min(1, Math.max(0, progress));
      prog.style.strokeDashoffset = `${len * (1 - clamped)}`;
    };

    const onScroll = () => {
      if (rafRef.current) return; // throttle to one update per frame → no lag
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathD]);

  return (
    <div ref={wrapRef} className="relative w-full" style={{ aspectRatio: `${vbW} / ${vbH}` }}>
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="journey-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF4D4D" />
            <stop offset="100%" stopColor="#FF0000" />
          </linearGradient>
          <filter id="journey-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#FF0000" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* faint full track */}
        <path
          ref={baseRef}
          d={pathD}
          fill="none"
          stroke="#000"
          strokeOpacity="0.1"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {/* red, draws in on scroll */}
        <path
          ref={progRef}
          d={pathD}
          fill="none"
          stroke="url(#journey-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#journey-glow)"
          style={{ transition: "stroke-dashoffset 0.15s linear" }}
        />
      </svg>

      {/* dots */}
      {nodes.map((n, i) => (
        <span
          key={`dot-${i}`}
          className="absolute z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#FF0000] shadow-[0_0_0_4px_rgba(255,0,0,0.15)]"
          style={{ left: `${(n.x / vbW) * 100}%`, top: `${(n.y / vbH) * 100}%` }}
        />
      ))}

      {/* cards */}
      {milestones.map((m, i) => {
        const onRight = i % 2 === 0;
        const n = nodes[i];
        return (
          <div
            key={m.year}
            className="absolute w-[33%] max-w-[340px] -translate-y-1/2"
            style={{
              top: `${(n.y / vbH) * 100}%`,
              ...(onRight
                ? { left: `calc(${(n.x / vbW) * 100}% + 18px)` }
                : { right: `calc(${100 - (n.x / vbW) * 100}% + 18px)` }),
            }}
          >
            <Reveal delay={i * 60} x={onRight ? 40 : -40}>
              <Card m={m} />
            </Reveal>
          </div>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */

function Card({ m }: { m: Milestone }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm md:p-6">
      <span className="inline-block rounded-md bg-[#FFEDED] px-3 py-1 text-xs font-semibold text-[#FF0000]">
        {m.year}
      </span>
      <h3 className="mt-3 text-lg font-bold text-[#1a1a1a]">{m.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#666]">{m.desc}</p>
    </div>
  );
}

/**
 * Lightweight fade/slide-in on scroll using IntersectionObserver.
 * Uses GPU-friendly transform + opacity only → no layout thrash, no lag.
 */
function Reveal({
  children,
  className = "",
  style,
  delay = 0,
  x = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  x?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? "translate3d(0,0,0)" : `translate3d(${x}px, ${y}px, 0)`,
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
