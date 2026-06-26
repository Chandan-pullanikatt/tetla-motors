"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

interface Props {
  name: string;
  tagline: string;
  hero: { type: "image" | "video"; url: string };
}

export function HeroShowcase({ name, tagline, hero }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current ? contentRef.current.querySelectorAll("[data-animate]") : [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.25 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#030712]">
      {/* Full-bleed media */}
      {hero.type === "video" ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={hero.url.replace(/\.mp4$/, "-poster.jpg")}
          src={hero.url}
        />
      ) : (
        <Image
          src={hero.url}
          alt={name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Cinematic darkening */}
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-black/30" />

      {/* Bottom content row */}
      <div
        ref={contentRef}
        className="absolute inset-x-0 bottom-0 pb-12 md:pb-16"
      >
        {/* Figma row card: 1312 wide (64px gutters) · h 80 · space-between */}
        <div className="px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Name + tagline */}
          <div>
            <h1
              data-animate
              className="text-3xl md:text-[40px] font-bold leading-none tracking-normal text-white mb-3"
            >
              {name}
            </h1>
            <p data-animate className="text-base md:text-[20px] font-normal leading-none tracking-normal text-white">
              {tagline}
            </p>
          </div>

          {/* CTAs */}
          <div data-animate className="flex gap-3 shrink-0">
            <Link
              href="#enquiry"
              className="rounded-md border border-white/40 px-6 py-3 text-[16px] font-bold leading-none text-white backdrop-blur-sm hover:bg-white/10 transition"
            >
              Test Ride
            </Link>
            <Link
              href="#enquiry"
              className="rounded-md bg-white px-6 py-3 text-[16px] font-bold leading-none text-black hover:bg-white/90 transition"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
