"use client";

import React, { useState } from "react";
import { Footer } from "@/app/components/layout/Footer";
import { Reveal, Parallax } from "@/app/components/ui/GsapReveal";

const faqs = [
  {
    q: "How do I charge an EV bike?",
    a: "You can charge your EV bike using any standard household power socket. Just plug in the charger, and the bike will begin charging automatically.",
  },
  {
    q: "How much does it cost to charge an EV bike?",
    a: "Charging an EV bike is very affordable. Depending on electricity rates, a full charge usually costs much less than refueling a petrol vehicle.",
  },
  {
    q: "How long does the battery last?",
    a: "Battery life depends on the model and riding conditions, but most EV bikes offer a practical range suitable for daily city commutes.",
  },
  {
    q: "How fast can an EV bike go?",
    a: "Top speed varies by model, but most urban-focused EV bikes are designed for safe and efficient city riding speeds.",
  },
  {
    q: "Are EV bikes safe for city riding?",
    a: "Yes. With proper braking systems, lighting, and safety features, EV bikes are well-suited for city use when ridden responsibly.",
  },
  {
    q: "What makes your EV bikes different?",
    a: "A blend of premium design, efficient performance, and smart features tailored for modern urban mobility.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="w-full overflow-x-hidden bg-black text-white">
      {/* NAV + HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/v1.mp4"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <header className="relative z-20 flex items-center justify-between px-6 py-6 md:px-16">
          {/* Logo + brand */}
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="TETLA Logo" className="h-10 w-auto object-contain" />
          </div>

          {/* Nav */}
          <nav className="hidden gap-8 text-sm font-medium text-gray-200 md:flex">
            <a href="#vehicles" className="hover:text-white transition-colors">
              Products
            </a>
            <a href="#ownership" className="hover:text-white transition-colors">
              Ownership
            </a>
            <a href="#dealership" className="hover:text-white transition-colors">
              Dealership
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#blogs" className="hover:text-white transition-colors">
              Blogs
            </a>
          </nav>
        </header>

        {/* Hero text block */}
        <div className="relative z-20 flex h-full flex-col justify-end pb-20">
          <div className="max-w-[1200px] px-6 md:px-16 w-full">
            <Reveal delay={0.2}>
              <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
                TETLA <span className="font-normal">Classic</span>
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="mt-2 text-lg text-gray-200 font-light tracking-wide">
                Efficient, stylish, and built for city rides
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <div className="mt-8 flex items-center gap-8">
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                    Electric Range
                  </p>
                  <p className="text-2xl font-bold">Up to 100 Km</p>
                </div>
                <div className="h-10 w-px bg-white/20"></div>
                <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                    Full Charge
                  </p>
                  <p className="text-2xl font-bold">2 to 4 Hrs</p>
                </div>
              </div>
            </Reveal>

            {/* Indicators */}
            <Reveal delay={0.8}>
              <div className="mt-10 flex gap-2">
                <div className="h-1 w-8 bg-white rounded-full"></div>
                <div className="h-1 w-8 bg-white/30 rounded-full"></div>
                <div className="h-1 w-8 bg-white/30 rounded-full"></div>
                <div className="h-1 w-8 bg-white/30 rounded-full"></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPLORE ALL VEHICLES */}
      <section
        id="vehicles"
        className="bg-white py-20 text-black md:py-28"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-5 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Explore All Vehicles
            </h2>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { src: "/pa1.jpg" },
              { src: "/pa3.jpg" },
              { src: "/pa2.jpg" },
              { src: "/pa4.jpg" },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <article
                  className="group relative flex h-[500px] flex-col overflow-hidden rounded-3xl shadow-xl"
                >
                  <Parallax className="absolute inset-0 h-full w-full" scale={1.2} speed={0.3}>
                    <img
                      src={item.src}
                      alt="Vehicle"
                      className="h-full w-full object-cover transition-transform duration-500"
                    />
                  </Parallax>
                  {/* gradient + content */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-end gap-4 p-5 text-white z-20">
                    <div>
                      <h3 className="text-lg font-semibold">
                        TETLA Classic (RTO Model)
                      </h3>
                      <p className="mt-1 text-xs text-gray-200">
                        Efficient, stylish, and built for city rides
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.16em] text-gray-300">
                          Starting from
                        </p>
                        <p className="mt-1 text-xl font-semibold">45,999</p>
                      </div>
                      <button className="pointer-events-auto rounded-md border border-white/80 bg-black/20 px-6 py-2 text-xs font-medium tracking-wide backdrop-blur-md transition hover:bg-white hover:text-black">
                        Explore
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        id="why-us"
        className="bg-[#030712] py-20 text-white md:py-28"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Why Choose Us
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1 (Left - Tall) */}
            <Reveal delay={0.1} className="md:row-span-2">
              <article className="relative h-full min-h-[300px] md:min-h-[600px] overflow-hidden rounded-3xl border border-white/5 bg-white/5">
                <Parallax className="absolute inset-0 h-full w-full" scale={1.1}>
                  <video
                    className="h-full w-full object-cover"
                    src="/va1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </Parallax>
                <div className="absolute inset-0 bg-black/35 z-10" />
                <div className="relative z-20 flex h-full flex-col justify-start p-8 pt-10">
                  <h3 className="text-2xl font-bold">
                    On The Road To Safety
                  </h3>
                  <p className="mt-2 text-sm text-gray-200">
                    TETLA EV Bikes Offer Advanced Safety, Strong Braking, And Clear Visibility For
                    Confident Urban Rides, Supported By Essential Rider Safety Guidance
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Card 2 (Top Right) */}
            <Reveal delay={0.2}>
              <article className="relative h-[280px] md:h-[300px] overflow-hidden rounded-3xl border border-white/5 bg-white/5">
                <Parallax className="absolute inset-0 h-full w-full" scale={1.1}>
                  <video
                    className="h-full w-full object-cover"
                    src="/va2.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </Parallax>
                <div className="absolute inset-0 bg-black/35 z-10" />
                <div className="relative z-20 flex h-full flex-col justify-start p-8 pt-10">
                  <h3 className="text-xl font-bold uppercase">
                    LOW EMISSIONS & EFFICIENCY
                  </h3>
                  <p className="mt-2 text-sm text-gray-200">
                    TETLA Bikes Produce Zero Emissions And Deliver Energy-Efficient Performance
                    With Extended Range And Minimal Power Use
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Card 3 (Bottom Right) */}
            <Reveal delay={0.3}>
              <article className="relative h-[280px] md:h-[300px] overflow-hidden rounded-3xl border border-white/5 bg-white/5">
                <Parallax className="absolute inset-0 h-full w-full" scale={1.1}>
                  <video
                    className="h-full w-full object-cover"
                    src="/va3.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </Parallax>
                <div className="absolute inset-0 bg-black/35 z-10" />
                <div className="relative z-20 flex h-full flex-col justify-start p-8 pt-10">
                  <h3 className="text-xl font-bold">Premium Design</h3>
                  <p className="mt-2 max-w-2xl text-sm text-gray-200">
                    TETLA Bikes Feature A Premium Design That Blends Sleek Aesthetics With Durable,
                    High-Quality Engineering For A Refined Riding Experience.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VOICES THAT INSPIRE US */}
      <section
        id="voices"
        className="bg-white py-20 text-black md:py-28"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-5 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Voices That Inspire Us
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {["/pb1.jpg", "/pb2.jpg", "/pb3.jpg", "/pb4.jpg"].map(
              (src, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <article
                    className="group relative h-[320px] overflow-hidden rounded-3xl shadow-lg"
                  >
                    <Parallax className="absolute inset-0 h-full w-full" scale={1.2}>
                      <img
                        src={src}
                        alt="Testimonial"
                        className="h-full w-full object-cover transition-transform duration-500"
                      />
                    </Parallax>
                    <div className="absolute inset-0 bg-black/20 z-10" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="h-6 w-6 text-black"
                        >
                          <path d="M9 7.5v9l7-4.5-7-4.5z" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* JOIN US CTA */}
      <section
        id="about"
        className="relative h-[260px] w-full md:h-[320px]"
      >
        <Parallax className="absolute inset-0 h-full w-full" scale={1.1} speed={0.2}>
          <video
            className="h-full w-full object-cover"
            src="/lineup.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </Parallax>
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="relative z-20 flex h-full items-center justify-center px-4">
          <Reveal>
            <div className="text-center text-white">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Join Us In Redefining The Future Of Urban Mobility
              </h2>
              <p className="mt-3 text-sm text-gray-200">
                Discover smart, sustainable vehicles designed for performance,
                comfort, and next-gen mobility.
              </p>
              <button className="mt-6 rounded-full border border-white/80 bg-white/10 px-6 py-2 text-sm font-medium tracking-wide backdrop-blur-md transition hover:bg-white hover:text-black">
                Learn More About Us
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MEET THE FOUNDERS */}
      <section
        id="ownership"
        className="bg-white py-20 text-black md:py-28"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-5 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Meet the Founders
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                src: "/ceo.png",
                name: "K T Davood",
                role: "CEO",
              },
              {
                src: "/cmd.png",
                name: "Dr Ashraf C",
                role: "CMD",
              },
              {
                src: "/cto.png",
                name: "David Haley",
                role: "CTO",
              },
            ].map((person, idx) => (
              <Reveal key={person.name} delay={idx * 0.1}>
                <article
                  className="flex flex-col gap-4"
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100">
                    <Parallax className="absolute inset-0 h-full w-full" scale={1.1}>
                      <img
                        src={person.src}
                        alt={person.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </Parallax>
                  </div>
                  <div className="text-left">
                    <p className="text-lg font-bold text-black">{person.name}</p>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{person.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section
        id="dealership"
        className="bg-[#030712] py-20 text-white md:py-28"
      >
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <Reveal>
            <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Make an Enquiry
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-3xl bg-[#111] shadow-2xl">
              <div className="grid md:grid-cols-2">
                {/* Form Side */}
                <div className="p-8 md:p-12 lg:p-16 z-10 relative bg-[#111]">
                  <form className="space-y-5">
                    <div className="space-y-5">
                      <input
                        className="h-14 w-full rounded-lg border border-white/5 bg-[#0A0A0A] px-4 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-white/20 transition-colors"
                        placeholder="Name *"
                      />
                      <input
                        type="email"
                        className="h-14 w-full rounded-lg border border-white/5 bg-[#0A0A0A] px-4 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-white/20 transition-colors"
                        placeholder="Email Address *"
                      />
                      <input
                        className="h-14 w-full rounded-lg border border-white/5 bg-[#0A0A0A] px-4 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-white/20 transition-colors"
                        placeholder="Phone Number *"
                      />
                      <div className="relative">
                        <select className="h-14 w-full appearance-none rounded-lg border border-white/5 bg-[#0A0A0A] px-4 text-sm text-gray-500 outline-none focus:border-white/20 transition-colors">
                          <option>Type of Enquiry</option>
                          <option>Dealership</option>
                          <option>Test Ride</option>
                          <option>Product Information</option>
                          <option>Service & Support</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                      <textarea
                        rows={4}
                        className="w-full resize-none rounded-lg border border-white/5 bg-[#0A0A0A] px-4 py-4 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-white/20 transition-colors"
                        placeholder="Type your message"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id="newsletter"
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-white/20 bg-[#0A0A0A] checked:border-white checked:bg-white transition-all"
                        />
                        <svg
                          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100 transition-opacity"
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <label htmlFor="newsletter" className="cursor-pointer text-sm text-gray-300 select-none">
                        Yes, subscribe me to your newsletter
                      </label>
                    </div>

                    <button
                      type="button"
                      className="mt-4 w-full rounded-lg bg-white py-4 text-sm font-bold text-black transition hover:bg-gray-100"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Image Side */}
                <div className="relative hidden md:block h-full min-h-[600px]">
                  <Parallax className="absolute inset-0 h-full w-full" scale={1.2}>
                    <img
                      src="/pc1.png"
                      alt="Tetla Motors"
                      className="h-full w-full object-cover"
                    />
                  </Parallax>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/50 to-transparent z-10" />

                  {/* Logo Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="flex items-center gap-2">
                      <img src="/logo.png" alt="TETLA Logo" className="h-24 w-auto object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-20 text-black md:py-28">
        <div className="mx-auto max-w-[900px] px-5 sm:px-6">
          <Reveal>
            <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <Reveal key={index} delay={index * 0.1}>
                  <div
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-[#FAFAFA]"
                  >
                    <button
                      className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium md:px-6 md:py-5"
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                    >
                      <span>{item.q}</span>
                      <span className="ml-4 text-xl">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="border-t border-gray-200 px-5 pb-5 pt-3 text-sm text-gray-700 md:px-6">
                        {item.a}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
