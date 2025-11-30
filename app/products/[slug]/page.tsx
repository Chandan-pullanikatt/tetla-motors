import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - in a real app this would come from a database or API
const products = {
  "model-s": {
    name: "Model S",
    tagline: "Plaid",
    description: "Model S Plaid has the quickest acceleration of any vehicle in production. Updated battery architecture for all Model S trims enables backto-back track runs without performance degradation.",
    specs: [
      { label: "Range", value: "396 mi" },
      { label: "0-60 mph", value: "1.99 s" },
      { label: "Top Speed", value: "200 mph" },
      { label: "Peak Power", value: "1,020 hp" },
    ],
  },
  "model-x": {
    name: "Model X",
    tagline: "Plaid",
    description: "With the most power and quickest acceleration of any SUV, Model X Plaid is the highest performing SUV ever built. All Model X powertrains deliver instant torque at any speed.",
    specs: [
      { label: "Range", value: "333 mi" },
      { label: "0-60 mph", value: "2.5 s" },
      { label: "Top Speed", value: "163 mph" },
      { label: "Peak Power", value: "1,020 hp" },
    ],
  },
  "cybertruck": {
    name: "Cybertruck",
    tagline: "Built for any planet",
    description: "Durable and rugged enough to go anywhere. Tackle anything with electronically adaptive air suspension that offers 12 inches of travel and 17 inches of clearance.",
    specs: [
      { label: "Range", value: "340 mi" },
      { label: "0-60 mph", value: "2.6 s" },
      { label: "Towing", value: "11,000 lbs" },
      { label: "Payload", value: "2,500 lbs" },
    ],
  },
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products[slug as keyof typeof products];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#111] text-[20vw] font-bold uppercase whitespace-nowrap select-none tracking-tighter">{product.name}</span>
          </div>
        </div>

        <div className="relative z-10 text-center px-6 mt-20">
          <h1 className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter">{product.name}</h1>
          <p className="text-2xl md:text-3xl text-[#ccc] mb-12 font-light">{product.tagline}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 mb-16">
            {product.specs.map((spec) => (
              <div key={spec.label}>
                <div className="text-4xl font-bold text-white mb-2">{spec.value}</div>
                <div className="text-sm text-[#999]">{spec.label}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-6 justify-center">
            <Button size="lg" className="px-12 py-6 text-lg">Order Now</Button>
            <Button variant="outline" size="lg" className="px-12 py-6 text-lg border-[#333] hover:bg-[#111] hover:text-white hover:border-[#00D9A3]">Test Drive</Button>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 tracking-tight">Beyond Ludicrous</h2>
          <p className="text-xl md:text-2xl text-[#ccc] leading-relaxed font-light">
            {product.description}
          </p>
        </div>
      </section>

      {/* Interior / Gallery Placeholder */}
      <section className="py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-video bg-[#111] border border-[#222] rounded-2xl flex items-center justify-center"><span className="text-[#333] font-bold tracking-widest">INTERIOR</span></div>
            <div className="aspect-video bg-[#111] border border-[#222] rounded-2xl flex items-center justify-center"><span className="text-[#333] font-bold tracking-widest">EXTERIOR</span></div>
          </div>
        </div>
      </section>
    </div>
  );
}
