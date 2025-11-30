export default function BatteryPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
        <h1 className="text-5xl md:text-[64px] font-bold mb-16 text-center tracking-tight leading-none">
          ADVANCED <span className="text-[#00D9A3]">BATTERY</span> TECH
        </h1>

        {/* Hero Image / Diagram */}
        <div className="w-full aspect-[21/9] bg-[#111] border border-[#222] rounded-2xl mb-24 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <span className="text-[#333] text-4xl font-bold z-0 tracking-widest">BATTERY ARCHITECTURE RENDER</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-32">
          <div className="text-center p-8 rounded-2xl hover:bg-[#111] transition-colors duration-300">
            <div className="text-6xl font-bold text-[#00D9A3] mb-4">4680</div>
            <div className="text-xl font-bold mb-4 text-white">Cells</div>
            <p className="text-[#999] text-sm leading-relaxed">Our proprietary 4680 cells deliver 5x more energy, 6x more power, and 16% more range.</p>
          </div>
          <div className="text-center p-8 rounded-2xl hover:bg-[#111] transition-colors duration-300">
            <div className="text-6xl font-bold text-[#00D9A3] mb-4">Struct</div>
            <div className="text-xl font-bold mb-4 text-white">Pack</div>
            <p className="text-[#999] text-sm leading-relaxed">The battery pack is part of the vehicle structure, reducing weight and improving safety.</p>
          </div>
          <div className="text-center p-8 rounded-2xl hover:bg-[#111] transition-colors duration-300">
            <div className="text-6xl font-bold text-[#00D9A3] mb-4">1M</div>
            <div className="text-xl font-bold mb-4 text-white">Mile Life</div>
            <p className="text-[#999] text-sm leading-relaxed">Designed to last over a million miles of driving with minimal degradation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Thermal Management</h2>
            <p className="text-[#ccc] leading-relaxed text-lg font-light">
              Our advanced thermal management system ensures optimal battery performance in all weather conditions.
              By maintaining the cells at their ideal operating temperature, we maximize efficiency, range, and longevity.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-[#999]">
                <span className="w-2 h-2 bg-[#00D9A3] rounded-full" />
                Liquid cooling loops
              </li>
              <li className="flex items-center gap-4 text-[#999]">
                <span className="w-2 h-2 bg-[#00D9A3] rounded-full" />
                Heat pump integration
              </li>
              <li className="flex items-center gap-4 text-[#999]">
                <span className="w-2 h-2 bg-[#00D9A3] rounded-full" />
                Pre-conditioning for supercharging
              </li>
            </ul>
          </div>
          <div className="aspect-square bg-[#111] border border-[#222] rounded-2xl flex items-center justify-center">
            <span className="text-[#333] text-xl font-bold tracking-widest">THERMAL SYSTEM DIAGRAM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
