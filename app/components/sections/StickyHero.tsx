"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StickyHeroProps {
  videoSrc: string;
  headline?: string;
  subheadline?: string;
  stat1?: { label: string; value: string };
  stat2?: { label: string; value: string };
}

export function StickyHero({
  videoSrc,
  headline = "TETLA Classic",
  subheadline = "Efficient, stylish, and built for city rides",
  stat1 = { label: "Electric Range", value: "Up to 100 Km" },
  stat2 = { label: "Full Charge", value: "2 to 4 Hrs" },
}: StickyHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current || !videoWrapRef.current) return;

    const ctx = gsap.context(() => {
      // Scale-down + border-radius reveal driven by scroll
      gsap.fromTo(
        videoWrapRef.current,
        { scale: 1.3, borderRadius: "0px" },
        {
          scale: 1,
          borderRadius: "28px",
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top top",
            end: "40% top",
            scrub: 1.4,
          },
        }
      );

      // Hero text fades and lifts out before the video settles
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -28,
            ease: "power2.in",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top top",
              end: "14% top",
              scrub: 1,
            },
          }
        );
      }
    }, trackRef);

    return () => ctx.revert();
  }, []);

  // Split: first word bold, rest normal (e.g. "TETLA Classic" → bold + light)
  const words = headline.split(" ");
  const firstWord = words[0];
  const rest = words.slice(1).join(" ");

  return (
    <div ref={trackRef} className="relative h-[200vh]">
      {/* Sticky viewport — bg-black shows through rounded corners at scroll end */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">

        {/* ── Animated video frame ── */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 overflow-hidden will-change-transform"
        >
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Gradient inside the frame so it clips with border-radius */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        </div>

        {/* ── Hero text — lives outside the scaled frame so it doesn't distort ── */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-20 flex flex-col justify-end pb-20 px-6 md:px-16"
        >
          <div className="max-w-[1200px] w-full">
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
              {firstWord}{" "}
              {rest && <span className="font-normal">{rest}</span>}
            </h1>
            <p className="mt-2 text-lg font-light tracking-wide text-gray-200">
              {subheadline}
            </p>

            <div className="mt-8 flex items-center gap-8">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-gray-400">
                  {stat1.label}
                </p>
                <p className="text-2xl font-bold text-white">{stat1.value}</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.22em] text-gray-400">
                  {stat2.label}
                </p>
                <p className="text-2xl font-bold text-white">{stat2.value}</p>
              </div>
            </div>

            <div className="mt-10 flex gap-2">
              <div className="h-1 w-8 rounded-full bg-white" />
              <div className="h-1 w-8 rounded-full bg-white/30" />
              <div className="h-1 w-8 rounded-full bg-white/30" />
              <div className="h-1 w-8 rounded-full bg-white/30" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
