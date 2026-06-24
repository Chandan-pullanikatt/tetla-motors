"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";

const stats = [
  { label: "Experience Center", value: "9" },
  { label: "Upcoming Center", value: "12" },
  { label: "Location", value: "3+" },
  { label: "Award", value: "12" },
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

export default function RetailPartnerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full overflow-x-hidden bg-[#F5F5F5] text-[#1a1a1a]">
      <Header variant="solid" />

      {/* ── HERO HEADING ─────────────────────────────────────────────────── */}
      <section className="pt-28 pb-6 md:pt-32 md:pb-8">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-[40px] font-bold tracking-tight text-[#1a1a1a]">
                Partner with Tetla
              </h1>
              <p className="mt-3 text-sm md:text-[15px] font-light leading-relaxed text-[#555]">
                We are expanding our global footprint to bring the Tetla experience to the world&apos;s
                most vibrant markets. We invite visionaries and established retail leaders to join us
                in redefining sustainable luxury mobility.
              </p>
            </div>
            <Link
              href="/dealerships/become-dealer"
              className="shrink-0 rounded-md bg-[#1a1a1a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ───────────────────────────────────────────────────── */}
      <section>
        <div className="relative aspect-[16/9] w-full md:aspect-[1440/520]">
          <Image
            src="/RETAILPARTNER.png"
            alt="Tetla Experience Center storefront"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* ── INTRO CARD + STATS ───────────────────────────────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <div className="relative -mt-10 overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.10)] md:-mt-14 md:p-10">
            {/* Faint logo watermarks */}
            <Image
              src="/logoproduct.png"
              alt=""
              width={148}
              height={191}
              aria-hidden
              className="pointer-events-none absolute -top-2 right-4 h-auto w-[80px] select-none opacity-[0.05] md:w-[120px]"
            />
            <Image
              src="/logoproduct.png"
              alt=""
              width={148}
              height={191}
              aria-hidden
              className="pointer-events-none absolute -bottom-2 left-4 h-auto w-[80px] select-none opacity-[0.05] md:w-[120px]"
            />

            <p className="relative z-10 mx-auto max-w-3xl text-center text-lg md:text-[26px] font-medium leading-relaxed text-[#1a1a1a]">
              Join a retail network that&apos;s driving the transition to electric mobility. With{" "}
              <span className="text-[#FF0000]">innovative EVs</span>,{" "}
              <span className="text-[#FF0000]">trusted support</span>, and a vision for a{" "}
              <span className="text-[#FF0000]">cleaner future</span>, Tetla empowers partners to grow
              alongside one of the <span className="text-[#FF0000]">fastest-evolving</span> industries
              in transportation.
            </p>

            {/* Stat strip */}
            <div className="relative z-10 mt-8 grid grid-cols-2 gap-y-8 sm:grid-cols-4 md:divide-x md:divide-black/10">
              {stats.map((s) => (
                <div key={s.label} className="text-center md:px-4">
                  <p className="mb-2 text-[13px] font-medium leading-none text-[#5A5A5A]">{s.label}</p>
                  <p className="text-[32px] md:text-[40px] font-normal leading-none text-[#3A3A3A]">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
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
