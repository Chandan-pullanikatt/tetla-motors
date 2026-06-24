"use client";

import { useState } from "react";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { ShowroomFinder } from "@/app/components/sections/ShowroomFinder";

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

export default function DealershipsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full overflow-x-hidden bg-[#F5F5F5] text-[#1a1a1a]">
      <Header variant="solid" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6 text-center">
          <h1 className="text-3xl md:text-[40px] font-bold tracking-tight text-[#1a1a1a]">
            Find Your Tetla
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm md:text-base font-light leading-relaxed text-[#555]">
            Experience the pinnacle of automotive engineering across our growing network of curated
            retailers. From our high-reach Experience Centers to our dedicated service hubs.
          </p>
        </div>
      </section>

      {/* ── SHOWROOM FINDER ──────────────────────────────────────────────── */}
      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <ShowroomFinder />
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
