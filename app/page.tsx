"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Footer } from "@/app/components/layout/Footer";
import { Reveal, Parallax } from "@/app/components/ui/GsapReveal";
import { LazyVideo } from "@/app/components/ui/LazyVideo";
import { createClient } from "@/lib/supabase/client";
import { VoicesCoverflow } from "@/app/components/sections/VoicesCoverflow";

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

// Fallback to static files when CMS videos aren't set yet
const VIDEO_DEFAULTS: Record<string, string> = {
  hero: "/v1.mp4",
  va1: "/va1.mp4",
  va2: "/va2.mp4",
  va3: "/va3.mp4",
  lineup: "/lineup.mp4",
  testimonial_1: "/pb1.jpg",
  testimonial_2: "/pb2.jpg",
  testimonial_3: "/pb3.jpg",
  testimonial_4: "/pb4.jpg",
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videos, setVideos] = useState<Record<string, string>>(VIDEO_DEFAULTS);

  // Enquiry form state
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", enquiry_type: "", message: "", newsletter: false,
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setFormStatus("sent");
      setFormData({ name: "", email: "", phone: "", enquiry_type: "", message: "", newsletter: false });
    } catch {
      setFormStatus("error");
    }
  };

  useEffect(() => {
    const loadVideos = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("site_videos").select("key, url");
      if (!data) return;
      const map: Record<string, string> = { ...VIDEO_DEFAULTS };
      data.forEach(({ key, url }) => { if (url) map[key] = url; });
      setVideos(map);
    };
    loadVideos();
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <main className="w-full overflow-x-hidden bg-black text-white">
      {/* NAV + HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={videos.hero}
        />
        <div className="absolute inset-0 bg-black/40" />

        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-16 transition-all duration-300 bg-gradient-to-b from-black/80 to-transparent">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="TETLA Logo"
              width={200}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>

          <nav className="hidden gap-8 text-sm font-medium text-gray-200 md:flex">
            <a href="#vehicles" className="hover:text-white transition-colors">Products</a>
            <a href="#ownership" className="hover:text-white transition-colors">Ownership</a>
            <a href="#dealership" className="hover:text-white transition-colors">Dealership</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#blogs" className="hover:text-white transition-colors">Blogs</a>
          </nav>

          <button
            className="flex flex-col gap-1.5 md:hidden z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`h-0.5 w-6 bg-white transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`h-0.5 w-6 bg-white transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <div className={`h-0.5 w-6 bg-white transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {mobileMenuOpen && (
            <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 text-xl font-medium text-white md:hidden">
              <a href="#vehicles" onClick={() => setMobileMenuOpen(false)}>Products</a>
              <a href="#ownership" onClick={() => setMobileMenuOpen(false)}>Ownership</a>
              <a href="#dealership" onClick={() => setMobileMenuOpen(false)}>Dealership</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#blogs" onClick={() => setMobileMenuOpen(false)}>Blogs</a>
            </div>
          )}
        </header>

        <div className="relative z-20 flex h-full flex-col justify-end pb-20">
          <div className="max-w-[1200px] px-6 md:px-16 w-full">
            <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
              TETLA <span className="font-normal">Classic</span>
            </h1>
            <p className="mt-2 text-lg text-gray-200 font-light tracking-wide">
              Efficient, stylish, and built for city rides
            </p>
            <div className="mt-8 flex items-center gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Electric Range</p>
                <p className="text-2xl font-bold">Up to 100 Km</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Full Charge</p>
                <p className="text-2xl font-bold">2 to 4 Hrs</p>
              </div>
            </div>
            <div className="mt-10 flex gap-2">
              <div className="h-1 w-8 bg-white rounded-full" />
              <div className="h-1 w-8 bg-white/30 rounded-full" />
              <div className="h-1 w-8 bg-white/30 rounded-full" />
              <div className="h-1 w-8 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE ALL VEHICLES — horizontal scroll */}
      <section id="vehicles" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <h2 className="mb-12 text-3xl font-semibold tracking-tight text-black md:text-4xl">
            Explore All Vehicles
          </h2>
          <div
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            data-lenis-prevent
          >
            {[
              { name: "TETLA Classic",  model: "RTO Model", price: "45,999",  image: "/pa1.jpg" },
              { name: "TETLA E9 Pro",   model: "RTO Model", price: "62,999",  image: "/pa3.jpg" },
              { name: "TETLA Pro Plus", model: "Premium",   price: "78,999",  image: "/pa2.jpg" },
              { name: "TETLA Ailes",    model: "Sport",     price: "89,999",  image: "/pa4.jpg" },
              { name: "TETLA Voiture",  model: "Elite",     price: "1,20,000", image: "/pa5.jpg" },
            ].map((product) => (
              <article
                key={product.name}
                className="relative flex-none w-[311px] h-[420px] overflow-hidden rounded-[12px] shadow-md snap-center cursor-pointer"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="311px"
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black px-4 py-4 z-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">
                    {product.model}
                  </p>
                  <div className="mt-1 flex items-baseline justify-between">
                    <p className="text-base font-semibold text-white">{product.name}</p>
                    <p className="text-sm font-bold text-white">₹{product.price}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-us" className="bg-[#030712] py-20 text-white md:py-28">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Why Choose Us
            </h2>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1 (Left - Tall) */}
            <Reveal delay={0.1} className="md:row-span-2">
              <article className="relative h-full min-h-[300px] md:min-h-[600px] overflow-hidden rounded-[12px] border border-white/5 bg-white/5">
                <Parallax className="absolute inset-0 h-full w-full" scale={1.1}>
                  <LazyVideo src={videos.va1} className="h-full w-full object-cover" />
                </Parallax>
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="relative z-20 flex h-full flex-col justify-start p-6">
                  <h3 className="text-2xl font-bold">On The Road To Safety</h3>
                  <p className="mt-1 text-sm text-gray-200">
                    TETLA EV Bikes Offer Advanced Safety, Strong Braking, And Clear Visibility For
                    Confident Urban Rides, Supported By Essential Rider Safety Guidance
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Card 2 (Top Right) */}
            <Reveal delay={0.2}>
              <article className="relative h-[280px] md:h-[300px] overflow-hidden rounded-[12px] border border-white/5 bg-white/5">
                <Parallax className="absolute inset-0 h-full w-full" scale={1.1}>
                  <LazyVideo src={videos.va2} className="h-full w-full object-cover" />
                </Parallax>
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="relative z-20 flex h-full flex-col justify-start p-6">
                  <h3 className="text-2xl font-bold">Low Emissions & Efficiency</h3>
                  <p className="mt-1 text-sm text-gray-200">
                    TETLA Bikes Produce Zero Emissions And Deliver Energy-Efficient Performance
                    With Extended Range And Minimal Power Use
                  </p>
                </div>
              </article>
            </Reveal>

            {/* Card 3 (Bottom Right) */}
            <Reveal delay={0.3}>
              <article className="relative h-[280px] md:h-[300px] overflow-hidden rounded-[12px] border border-white/5 bg-white/5">
                <Parallax className="absolute inset-0 h-full w-full" scale={1.1}>
                  <LazyVideo src={videos.va3} className="h-full w-full object-cover" />
                </Parallax>
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div className="relative z-20 flex h-full flex-col justify-start p-6">
                  <h3 className="text-2xl font-bold">Premium Design</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-200">
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
      <section id="voices" className="bg-white py-20 text-black md:py-28 overflow-hidden select-none">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-5 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Voices That Inspire Us
            </h2>
          </Reveal>
          <VoicesCoverflow
            items={(["testimonial_1", "testimonial_2", "testimonial_3", "testimonial_4"] as const).map((key) => {
              const src = videos[key];
              return {
                src,
                isVideo: src.includes("cloudinary.com") || src.endsWith(".mp4") || src.endsWith(".webm"),
              };
            })}
          />
        </div>
      </section>

      {/* JOIN US CTA */}
      <section id="about" className="relative h-[260px] w-full md:h-[320px]">
        <Parallax className="absolute inset-0 h-full w-full" scale={1.1} speed={0.2}>
          <LazyVideo src={videos.lineup} className="h-full w-full object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="relative z-20 flex h-full items-center justify-center px-4">
          <Reveal>
            <div className="text-center text-white">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Join Us In Redefining The Future Of Urban Mobility
              </h2>
              <p className="mt-3 text-sm text-gray-200">
                Discover smart, sustainable vehicles designed for performance, comfort, and next-gen mobility.
              </p>
              <button className="mt-6 rounded-full border border-white/80 bg-white/10 px-6 py-2 text-sm font-medium tracking-wide backdrop-blur-md transition hover:bg-white hover:text-black">
                Learn More About Us
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MEET THE FOUNDERS */}
      <section id="ownership" className="bg-white py-20 text-black md:py-28">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 px-5 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Meet the Founders
            </h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { src: "/ceo.png", name: "K T Davood", role: "CEO" },
              { src: "/cmd.png", name: "Dr Ashraf C", role: "CMD" },
              { src: "/cto.png", name: "David Haley", role: "CTO" },
            ].map((person, idx) => (
              <Reveal key={person.name} delay={idx * 0.1}>
                <article className="flex flex-col gap-4">
                  <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[12px] bg-gray-100">
                    <Parallax className="absolute inset-0 h-full w-full" scale={1.1}>
                      <Image
                        src={person.src}
                        alt={person.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover object-top"
                        loading="lazy"
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
      <section id="dealership" className="bg-[#030712] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
          <Reveal>
            <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight md:text-4xl">
              Make an Enquiry
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-[12px] bg-[#111] shadow-2xl">
              <div className="grid md:grid-cols-2">
                {/* Form Side */}
                <div className="p-8 md:p-12 lg:p-16 z-10 relative bg-[#111]">
                  {formStatus === "sent" ? (
                    <div className="flex flex-col items-center justify-center min-h-[320px] text-center">
                      <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">Message Sent!</h3>
                      <p className="text-sm text-gray-400">We'll get back to you shortly.</p>
                      <button onClick={() => setFormStatus("idle")} className="mt-6 text-xs text-gray-500 underline">
                        Send another
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleEnquiry} className="space-y-5">
                      <div className="space-y-5">
                        <input
                          required
                          className="h-14 w-full rounded-lg border border-white/5 bg-[#0A0A0A] px-4 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-white/20 transition-colors"
                          placeholder="Name *"
                          value={formData.name}
                          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        />
                        <input
                          type="email"
                          className="h-14 w-full rounded-lg border border-white/5 bg-[#0A0A0A] px-4 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-white/20 transition-colors"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        />
                        <input
                          className="h-14 w-full rounded-lg border border-white/5 bg-[#0A0A0A] px-4 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-white/20 transition-colors"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        />
                        <div className="relative">
                          <select
                            className="h-14 w-full appearance-none rounded-lg border border-white/5 bg-[#0A0A0A] px-4 text-sm text-gray-500 outline-none focus:border-white/20 transition-colors"
                            value={formData.enquiry_type}
                            onChange={(e) => setFormData((p) => ({ ...p, enquiry_type: e.target.value }))}
                          >
                            <option value="">Type of Enquiry</option>
                            <option value="Dealership">Dealership</option>
                            <option value="Test Ride">Test Ride</option>
                            <option value="Product Information">Product Information</option>
                            <option value="Service & Support">Service &amp; Support</option>
                          </select>
                          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <textarea
                          rows={4}
                          className="w-full resize-none rounded-lg border border-white/5 bg-[#0A0A0A] px-4 py-4 text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-white/20 transition-colors"
                          placeholder="Type your message"
                          value={formData.message}
                          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            id="newsletter"
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-white/20 bg-[#0A0A0A] checked:border-white checked:bg-white transition-all"
                            checked={formData.newsletter}
                            onChange={(e) => setFormData((p) => ({ ...p, newsletter: e.target.checked }))}
                          />
                          <svg
                            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black opacity-0 peer-checked:opacity-100 transition-opacity"
                            width="10" height="8" viewBox="0 0 10 8" fill="none"
                          >
                            <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <label htmlFor="newsletter" className="cursor-pointer text-sm text-gray-300 select-none">
                          Yes, subscribe me to your newsletter
                        </label>
                      </div>

                      {formStatus === "error" && (
                        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                      )}

                      <button
                        type="submit"
                        disabled={formStatus === "sending"}
                        className="mt-4 w-full rounded-lg bg-white py-4 text-sm font-bold text-black transition hover:bg-gray-100 disabled:opacity-60"
                      >
                        {formStatus === "sending" ? "Sending…" : "Send Message"}
                      </button>
                    </form>
                  )}
                </div>

                {/* Image Side */}
                <div className="relative hidden md:block h-full min-h-[600px]">
                  <Parallax className="absolute inset-0 h-full w-full" scale={1.2}>
                    <Image
                      src="/pc1.png"
                      alt="Tetla Motors"
                      fill
                      sizes="50vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/50 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <Image
                      src="/logo.png"
                      alt="TETLA Logo"
                      width={240}
                      height={96}
                      className="h-24 w-auto object-contain"
                      loading="lazy"
                    />
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
                <Reveal key={index} delay={index * 0.05}>
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-[#FAFAFA]">
                    <button
                      className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium md:px-6 md:py-5"
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
