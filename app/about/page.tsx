"use client";

import { useState } from "react";
import Image from "next/image";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { JourneyTimeline } from "@/app/components/ui/JourneyTimeline";

const milestones = [
  {
    year: "2014 — Foundation",
    title: "The Journey Begins",
    desc: "Tetla was founded with a vision to make electric mobility accessible, affordable, and sustainable for everyday riders.",
  },
  {
    year: "2017 — Growth",
    title: "Scaling New Roads",
    desc: "We opened our first Experience Centers and grew a community of riders who believed in a cleaner way to move.",
  },
  {
    year: "2020 — Innovation",
    title: "Smarter Mobility",
    desc: "A new generation of Tetla EVs introduced smart features, longer range, and refined design built for modern cities.",
  },
  {
    year: "2024 — Today",
    title: "Driving the Future",
    desc: "With a growing network and an expanding lineup, Tetla continues to redefine sustainable urban transportation.",
  },
];

const founders = [
  { name: "John Jacob", role: "CEO", image: "/ceo.png" },
  { name: "James Rodri", role: "CTO", image: "/cto.png" },
  { name: "Ariana Paul", role: "CMO", image: "/cmd.png" },
  { name: "Sam George", role: "CTO", image: "/cto.png" },
];

const faqs = [
  {
    q: "How do I charge a Tetla EV bike?",
    a: "You can charge your Tetla bike using any standard household power socket. Just plug in the charger, and the bike will begin charging automatically.",
  },
  {
    q: "How much does it cost to charge a Tetla bike?",
    a: "Charging a Tetla bike is very affordable. Depending on electricity rates, a full charge usually costs ₹10–₹20, making it far cheaper than fuel-based vehicles.",
  },
  {
    q: "How long does the battery last?",
    a: "Battery life depends on the model and riding conditions, but most Tetla bikes offer a practical range suitable for daily city commutes on a single charge.",
  },
  {
    q: "How fast can a Tetla EV bike go?",
    a: "Top speed varies by model, but most urban-focused Tetla bikes are designed for safe and efficient city riding speeds.",
  },
  {
    q: "Are Tetla bikes safe for city riding?",
    a: "Yes. With proper braking systems, lighting, and safety features, Tetla bikes are well-suited for city use when ridden responsibly.",
  },
  {
    q: "What makes Tetla bikes different from other electric bikes?",
    a: "A blend of premium design, efficient performance, and smart features tailored for modern urban mobility sets Tetla apart.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full overflow-x-hidden bg-[#F5F5F5] text-[#1a1a1a]">
      <Header variant="solid" />

      {/* ── 1. BUILT FOR THE FUTURE ──────────────────────────────────────── */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
            <h1 className="text-3xl md:text-[44px] font-bold tracking-tight text-[#1a1a1a]">
              Built for the Future
            </h1>
            <p className="text-sm md:text-[15px] font-light leading-relaxed text-[#555]">
              At Tetla, we&apos;re redefining everyday transportation through{" "}
              <span className="text-[#FF0000]">smart, affordable, and sustainable electric mobility</span>.
              Our mission is to make EV ownership{" "}
              <span className="text-[#FF0000]">accessible to everyone</span> by combining{" "}
              <span className="text-[#FF0000]">innovative technology, dependable performance, and modern design</span>.
              We believe the future of transportation should be cleaner, more efficient, and built
              around the needs of today&apos;s riders.
            </p>
          </div>

          {/* 3-image strip — middle taller */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:items-start">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#dcdcdc] sm:mt-10">
              <Image src="/pb1.jpg" alt="Tetla riders" fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#dcdcdc] sm:aspect-[3/5]">
              <Image src="/pb2.jpg" alt="Tetla design" fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#dcdcdc] sm:mt-10">
              <Image src="/pb3.jpg" alt="Tetla on the road" fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. OUR JOURNEY THROUGH THE YEARS ─────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-[32px] font-semibold tracking-tight text-[#1a1a1a]">
              Our Journey Through the Years
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#666]">
              From a bold vision to a growing electric mobility brand, explore the milestones that have
              shaped Tetla&apos;s journey toward a cleaner and smarter future.
            </p>
          </div>

          {/* Timeline */}
          <JourneyTimeline milestones={milestones} />
        </div>
      </section>

      {/* ── 3. MEET THE FOUNDERS ─────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-[32px] font-semibold tracking-tight text-[#1a1a1a]">
              Meet the Founders
            </h2>
            <p className="mt-2 text-sm text-[#666]">
              Leaders Driving Tetla&apos;s Innovation and Growth Forward With Purpose
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {founders.map((f, i) => (
              <div key={f.name} className={i % 2 === 1 ? "md:mt-8" : ""}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#e8e2e2]">
                  <Image src={f.image} alt={f.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover" />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-[#1a1a1a]">{f.name}</h3>
                <p className="text-xs text-[#888]">{f.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. OUR MISSION ───────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
            <h2 className="text-2xl md:text-[40px] font-bold tracking-tight text-[#1a1a1a]">
              Our Mission
            </h2>
            <p className="text-sm md:text-[15px] font-light leading-relaxed text-[#555]">
              To accelerate the adoption of electric mobility by creating{" "}
              <span className="text-[#FF0000]">innovative, reliable, and affordable</span> electric
              vehicles that empower people to <span className="text-[#FF0000]">travel smarter</span> while
              contributing to a cleaner and more <span className="text-[#FF0000]">sustainable future.</span>
            </p>
          </div>

          {/* Bento grid */}
          <div className="mt-10 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[480fr_768fr] lg:grid-rows-[370fr_500fr] lg:aspect-[1280/600]">
            <MissionImage src="/ABOUTUS1.png" alt="Tetla design exploration" className="aspect-[480/600] lg:aspect-auto lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:h-full" />
            <MissionImage src="/ABOUTUS2.png" alt="Tetla engineering" className="aspect-[768/370] lg:aspect-auto lg:col-start-2 lg:row-start-1 lg:h-full" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:col-start-2 lg:row-start-2 lg:h-full">
              <MissionImage src="/ABOUTUS3.png" alt="Tetla riders" className="aspect-[368/500] lg:aspect-auto lg:h-full" />
              <MissionImage src="/ABOUTUS4.png" alt="Tetla team" className="aspect-[368/500] lg:aspect-auto lg:h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-[900px] px-5 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#1a1a1a]">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-[#666]">Answers to Your Most Common Questions</p>
          </div>

          <div className="space-y-3">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="overflow-hidden rounded-2xl border border-gray-200 bg-[#FAFAFA]">
                  <button
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-[#1a1a1a] md:px-6 md:py-5"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <span className="ml-4 text-xl">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-gray-200 px-5 pb-5 pt-3 text-sm text-gray-700 md:px-6">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function MissionImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#dcdcdc] ${className}`}>
      <Image src={src} alt={alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
    </div>
  );
}
