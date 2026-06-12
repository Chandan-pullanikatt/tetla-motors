"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { Frame360 } from "./Frame360";

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
  /** Turntable frames — when set, the hero bike becomes a drag-to-rotate 360 viewer */
  frames?: string[];
}

export function HeroShowcase({ name, model, tagline, image, stats, frames }: Props) {
  const has360 = !!frames && frames.length >= 8;
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const bikeRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance timeline ──
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.4 }
      )
        .fromTo(
          bikeRef.current,
          { y: 90, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2 },
          0.2
        )
        .fromTo(
          contentRef.current ? Array.from(contentRef.current.children) : [],
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.09 },
          0.55
        );

      // ── Idle float — the bike gently hovers ──
      gsap.to(bikeRef.current, {
        y: "-=14",
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.4,
      });

      // ── Glow pulse ──
      gsap.to(glowRef.current, {
        opacity: 0.6,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // ── Mouse-move 3D parallax ──
      const rotX = gsap.quickTo(tiltRef.current, "rotationX", { duration: 0.6, ease: "power2.out" });
      const rotY = gsap.quickTo(tiltRef.current, "rotationY", { duration: 0.6, ease: "power2.out" });
      const wmX = gsap.quickTo(watermarkRef.current, "x", { duration: 0.9, ease: "power2.out" });
      const wmY = gsap.quickTo(watermarkRef.current, "y", { duration: 0.9, ease: "power2.out" });

      const onMove = (e: MouseEvent) => {
        const el = sectionRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;  // -1 … 1
        const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        if (!has360) {
          // Tilt parallax would fight the drag-to-rotate gesture in 360 mode
          rotY(nx * 7);
          rotX(-ny * 5);
        }
        wmX(nx * -26);
        wmY(ny * -12);
      };
      const onLeave = () => {
        rotX(0); rotY(0); wmX(0); wmY(0);
      };

      const el = sectionRef.current;
      el?.addEventListener("mousemove", onMove);
      el?.addEventListener("mouseleave", onLeave);
      return () => {
        el?.removeEventListener("mousemove", onMove);
        el?.removeEventListener("mouseleave", onLeave);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end pb-16 pt-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #e4e6e7 0%, #d6dadb 55%, #c6cacc 100%)",
      }}
    >
      {/* Watermark name */}
      <span
        ref={watermarkRef}
        className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-black uppercase text-black/[0.06] select-none pointer-events-none leading-none tracking-tighter"
        style={{ fontSize: "clamp(80px, 18vw, 220px)" }}
        aria-hidden
      >
        {name}
      </span>

      {/* Soft studio spotlight from above */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 38%, rgba(255,255,255,0.65) 0%, transparent 65%)",
        }}
      />

      {/* Grounding contact shadow under the bike */}
      <div
        className="absolute left-1/2 top-[72%] -translate-x-1/2 w-[46vw] max-w-[620px] h-[60px] rounded-[50%] pointer-events-none blur-2xl"
        style={{ background: "rgba(40,46,54,0.28)" }}
        aria-hidden
      />

      {/* Hero product: 360 drag viewer when frames exist, else 3D-tilt image */}
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          has360 ? "" : "pointer-events-none"
        }`}
        style={{ perspective: "1200px" }}
      >
        <div ref={tiltRef} style={{ transformStyle: "preserve-3d" }}>
          <div ref={bikeRef} className="relative w-[94vw] max-w-[1150px]">
            {has360 ? (
              <Frame360 frames={frames!} />
            ) : (
              <div className="relative aspect-[4/3]">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-contain drop-shadow-[0_50px_90px_rgba(0,0,0,0.85)]"
                  sizes="(max-width: 768px) 85vw, 780px"
                  priority
                />
                {/* Ground shadow */}
                <div
                  className="absolute left-1/2 bottom-[2%] -translate-x-1/2 w-[70%] h-[26px] rounded-[50%] bg-black/60 blur-xl"
                  aria-hidden
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content overlay */}
      <div ref={contentRef} className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 w-full">
        <p className="text-[11px] uppercase tracking-[0.3em] text-black/40 mb-3">{model}</p>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-none mb-3 [text-shadow:0_2px_20px_rgba(255,255,255,0.6)]">
          {name}
        </h1>
        <p className="text-base md:text-lg text-black/60 font-light mb-10 max-w-md">{tagline}</p>

        <div className="flex flex-wrap gap-3 mb-14">
          <Link
            href="#enquiry"
            className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white hover:bg-black/80 transition"
          >
            Order Now
          </Link>
          <Link
            href="#enquiry"
            className="rounded-full border border-black/25 px-8 py-3 text-sm font-semibold text-black hover:border-black/60 transition"
          >
            Book a Test Ride
          </Link>
        </div>

        <div className="flex flex-wrap gap-10 border-t border-black/10 pt-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/40 mb-1">{s.label}</p>
              <p className="text-xl md:text-2xl font-bold text-black">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
