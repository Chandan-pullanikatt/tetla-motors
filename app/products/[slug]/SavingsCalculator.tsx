"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

// Assumptions used to estimate the comparison
const PETROL_MILEAGE_KMPL = 45; // typical petrol scooter
const EV_COST_PER_KM = 0.15; // ₹ per km (matches product running-cost stat)

function formatINR(value: number) {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}

type SliderRowProps = {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  display: string;
  onChange: (v: number) => void;
};

function SliderRow({ label, hint, value, min, max, step, unit, display, onChange }: SliderRowProps) {
  return (
    <div className="py-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-base font-semibold text-[#1a1a1a]">{label}</p>
          <p className="text-xs text-[#888]">{hint}</p>
        </div>
        <p className="text-lg font-bold text-[#1a1a1a]">
          {display} <span className="text-sm font-normal text-[#888]">{unit}</span>
        </p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4 w-full cursor-pointer accent-[#FF0000]"
        style={{ accentColor: "#FF0000" }}
      />
    </div>
  );
}

export function SavingsCalculator() {
  const [distance, setDistance] = useState(15000);
  const [petrolPrice, setPetrolPrice] = useState(102);
  const [years, setYears] = useState(4);

  const { petrolCost, evCost, savings } = useMemo(() => {
    const petrolCost = (distance / PETROL_MILEAGE_KMPL) * petrolPrice * years;
    const evCost = distance * EV_COST_PER_KM * years;
    return { petrolCost, evCost, savings: Math.max(petrolCost - evCost, 0) };
  }, [distance, petrolPrice, years]);

  return (
    <section className="bg-[#F5F5F5] pt-16 md:pt-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-[32px] font-semibold tracking-tight text-[#1a1a1a]">
            Calculate Your Savings
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#666]">
            Compare your fuel costs and see how much you can save by switching from a petrol vehicle
            to an electric vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          {/* Inputs */}
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm md:p-8 lg:divide-y lg:divide-black/5">
            <SliderRow
              label="Annual Distance"
              hint="Based on your yearly commute"
              value={distance}
              min={1000}
              max={50000}
              step={500}
              unit="km"
              display={distance.toLocaleString("en-IN")}
              onChange={setDistance}
            />
            <SliderRow
              label="Petrol Price"
              hint="Local petrol per liter"
              value={petrolPrice}
              min={80}
              max={150}
              step={1}
              unit="₹/L"
              display={String(petrolPrice)}
              onChange={setPetrolPrice}
            />
            <SliderRow
              label="Years Of Ownership"
              hint="Planned duration of use"
              value={years}
              min={1}
              max={10}
              step={1}
              unit="Years"
              display={String(years)}
              onChange={setYears}
            />
          </div>

          {/* Result */}
          <div className="relative overflow-hidden rounded-2xl bg-[#111] p-6 text-white shadow-sm md:p-8">
            {/* faint logo watermark */}
            <Image
              src="/logoproduct.png"
              alt=""
              width={148}
              height={191}
              aria-hidden
              className="pointer-events-none absolute -right-2 top-1/2 h-auto w-[120px] -translate-y-1/2 select-none opacity-[0.06]"
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-white/10 py-4">
                <span className="text-sm text-gray-300">Petrol Cost</span>
                <span className="text-sm font-semibold">{formatINR(petrolCost)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 py-4">
                <span className="text-sm text-gray-300">Tetla Charging</span>
                <span className="text-sm font-semibold text-[#22C55E]">{formatINR(evCost)}</span>
              </div>

              <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-400">
                Total Potential Savings
              </p>
              <p className="mt-1 text-4xl md:text-5xl font-bold text-[#22C55E]">{formatINR(savings)}</p>

              <p className="mt-4 text-xs leading-relaxed text-gray-400">
                Estimated savings based on average driving patterns and current energy rates. Actual
                results may vary.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed product image */}
      <div className="relative mt-16 aspect-[16/10] w-full md:mt-24 md:aspect-[1440/620]">
        <Image src="/PRODUCTLAST.png" alt="Tetla electric scooter" fill sizes="100vw" className="object-cover" />
      </div>
    </section>
  );
}
