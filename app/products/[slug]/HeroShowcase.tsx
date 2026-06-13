"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

interface Stat {
  label: string;
  value: string;
}

interface Props {
  name: string;
  model: string;
  tagline: string;
  image: string;
  stats: Stat[];
  /** Full-bleed background video (defaults to the site hero clip) */
  video?: string;
}

export function HeroShowcase({ name, model, tagline, stats, video = "/v1.mp4" }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current ? Array.from(contentRef.current.children) : [],
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.25 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#030712]"
    >
      {/* Full-bleed cinematic video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={video}
      />

      {/* Cinematic darkening for text legibility + brand mood */}
      <div className="absolute inset-0 bg-[#030712]/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-[#030712]/70" />

      {/* Watermark model name */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-black uppercase text-white/[0.05] select-none pointer-events-none leading-none tracking-tighter"
        style={{ fontSize: "clamp(90px, 20vw, 280px)" }}
        aria-hidden
      >
        {name}
      </span>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-20">
        <div ref={contentRef} className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 w-full">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-3">{model}</p>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none mb-3">
            {name}
          </h1>
          <p className="text-base md:text-lg text-white/70 font-light mb-10 max-w-md">{tagline}</p>

          <div className="flex flex-wrap gap-3 mb-14">
            <Link
              href="#enquiry"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Order Now
            </Link>
            <Link
              href="#enquiry"
              className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:border-white/70 transition"
            >
              Book a Test Ride
            </Link>
          </div>

          <div className="flex flex-wrap gap-10 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">{s.label}</p>
                <p className="text-xl md:text-2xl font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[10px] uppercase tracking-[0.3em] pointer-events-none">
        Scroll
      </div>
    </section>
  );
}
