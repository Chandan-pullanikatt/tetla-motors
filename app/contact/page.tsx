"use client";

import React from "react";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted! (Connect this to your backend service)");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-20">
        {/* Hero section */}
        <section className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] font-bold tracking-tight mb-3">
            GET IN <span className="text-[#00D9A3]">TOUCH</span>
          </h1>
          <p className="text-base sm:text-lg text-[#999999] font-light">
            We&apos;re here to answer any questions you may have
          </p>
        </section>

        {/* Content wrapper */}
        <div className="grid gap-10 lg:gap-20 lg:grid-cols-[1fr,1.5fr] items-start">
          {/* Info section */}
          <div className="flex flex-col gap-10">
            <div className="border-l-[3px] border-[#00D9A3] pl-6">
              <h3 className="text-lg sm:text-xl font-semibold tracking-wide mb-4">
                Headquarters
              </h3>
              <p className="text-sm sm:text-base text-[#cccccc] mb-2">
                123 Electric Avenue
              </p>
              <p className="text-sm sm:text-base text-[#cccccc] mb-2">
                Silicon Valley, CA 94000
              </p>
              <p className="text-sm sm:text-base text-[#cccccc]">United States</p>
            </div>

            <div className="border-l-[3px] border-[#00D9A3] pl-6">
              <h3 className="text-lg sm:text-xl font-semibold tracking-wide mb-4">
                Support
              </h3>
              <p className="mb-2">
                <a
                  href="mailto:support@tetlamotors.com"
                  className="text-sm sm:text-base text-[#cccccc] hover:text-[#00D9A3] transition-colors duration-300"
                >
                  support@tetlamotors.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+18001234567"
                  className="text-sm sm:text-base text-[#cccccc] hover:text-[#00D9A3] transition-colors duration-300"
                >
                  +1 (800) 123-4567
                </a>
              </p>
            </div>

            <div className="border-l-[3px] border-[#00D9A3] pl-6">
              <h3 className="text-lg sm:text-xl font-semibold tracking-wide mb-4">
                Media Inquiries
              </h3>
              <p>
                <a
                  href="mailto:press@tetlamotors.com"
                  className="text-sm sm:text-base text-[#cccccc] hover:text-[#00D9A3] transition-colors duration-300"
                >
                  press@tetlamotors.com
                </a>
              </p>
            </div>
          </div>

          {/* Form section */}
          <div className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] p-6 sm:p-8 rounded-2xl border border-[#222222]">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name row */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-xs sm:text-sm font-medium text-[#aaaaaa] tracking-[0.08em]"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full rounded-lg border border-[#333333] bg-black px-4 py-3 text-sm sm:text-base text-white transition-colors duration-300 focus:outline-none focus:border-[#00D9A3] focus:bg-[#0a0a0a]"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-xs sm:text-sm font-medium text-[#aaaaaa] tracking-[0.08em]"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full rounded-lg border border-[#333333] bg-black px-4 py-3 text-sm sm:text-base text-white transition-colors duration-300 focus:outline-none focus:border-[#00D9A3] focus:bg-[#0a0a0a]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-[#aaaaaa] tracking-[0.08em]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg border border-[#333333] bg-black px-4 py-3 text-sm sm:text-base text-white transition-colors duration-300 focus:outline-none focus:border-[#00D9A3] focus:bg-[#0a0a0a]"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-xs sm:text-sm font-medium text-[#aaaaaa] tracking-[0.08em]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full min-h-[160px] rounded-lg border border-[#333333] bg-black px-4 py-3 text-sm sm:text-base text-white transition-colors duration-300 focus:outline-none focus:border-[#00D9A3] focus:bg-[#0a0a0a] resize-y"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-lg bg-white px-4 py-4 text-sm sm:text-base font-semibold text-black tracking-[0.08em] transition-all duration-300 hover:bg-[#00D9A3] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,217,163,0.3)] active:translate-y-0"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
