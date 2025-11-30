export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
        <h1 className="text-5xl md:text-[64px] font-bold mb-16 text-center tracking-tight leading-none">
          OUR <span className="text-[#00D9A3]">MISSION</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
          <div className="space-y-8 text-lg text-[#ccc] font-light leading-relaxed">
            <p className="border-l-[3px] border-[#00D9A3] pl-6">
              At Tetla Motors, we are not just building cars; we are architecting the future of sustainable transportation.
              Our mission is to accelerate the world's transition to sustainable energy through high-performance electric vehicles.
            </p>
            <p className="pl-6">
              Founded with a vision to prove that electric vehicles can be better, quicker, and more fun to drive than gasoline cars,
              Tetla Motors is today building not only all-electric vehicles but also infinitely scalable clean energy generation and storage products.
            </p>
          </div>
          <div className="aspect-video bg-[#111] border border-[#222] rounded-2xl flex items-center justify-center overflow-hidden">
            <span className="text-[#333] text-2xl font-bold tracking-widest">IMAGE PLACEHOLDER</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-10 bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-[#222] rounded-2xl hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">Innovation</h3>
            <p className="text-[#999]">Pushing the boundaries of what is possible in EV technology.</p>
          </div>
          <div className="p-10 bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-[#222] rounded-2xl hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">Sustainability</h3>
            <p className="text-[#999]">Zero emissions, zero compromise on performance.</p>
          </div>
          <div className="p-10 bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-[#222] rounded-2xl hover:-translate-y-2 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">Safety</h3>
            <p className="text-[#999]">Engineered to be the safest vehicles on the road.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
