import Link from "next/link";
import { Button } from "@/app/components/ui/button";

const products = [
  {
    id: "model-s",
    name: "Model S",
    tagline: "Plaid",
    specs: { range: "396 mi", acceleration: "1.99s", topSpeed: "200 mph" },
    image: "bg-gradient-to-br from-[#111] to-[#1a1a1a]",
  },
  {
    id: "model-x",
    name: "Model X",
    tagline: "Plaid",
    specs: { range: "333 mi", acceleration: "2.5s", topSpeed: "163 mph" },
    image: "bg-gradient-to-br from-[#111] to-[#1a1a1a]",
  },
  {
    id: "cybertruck",
    name: "Cybertruck",
    tagline: "Better Utility than a Truck with More Performance than a Sports Car",
    specs: { range: "340 mi", acceleration: "2.6s", topSpeed: "112 mph" },
    image: "bg-gradient-to-br from-[#111] to-[#1a1a1a]",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
        <h1 className="text-5xl md:text-[64px] font-bold mb-16 text-center tracking-tight leading-none">
          OUR <span className="text-[#00D9A3]">VEHICLES</span>
        </h1>

        <div className="grid grid-cols-1 gap-16 lg:gap-24">
          {products.map((product) => (
            <div key={product.id} className="relative overflow-hidden rounded-2xl bg-[#111] border border-[#222] group hover:border-[#333] transition-colors duration-500">
              <div className={`aspect-video md:aspect-[21/9] w-full ${product.image} flex items-center justify-center`}>
                <span className="text-[#222] text-6xl md:text-8xl font-bold uppercase tracking-widest select-none">{product.name}</span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-8 md:p-16">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">{product.name}</h2>
                <p className="text-xl text-[#ccc] mb-12 font-light max-w-2xl">{product.tagline}</p>

                <div className="flex flex-col lg:flex-row gap-12 lg:items-end justify-between">
                  <div className="flex gap-12 md:gap-20 text-center md:text-left">
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">{product.specs.range}</div>
                      <div className="text-sm text-[#999]">Range (EPA est.)</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">{product.specs.acceleration}</div>
                      <div className="text-sm text-[#999]">0-60 mph*</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">{product.specs.topSpeed}</div>
                      <div className="text-sm text-[#999]">Top Speed</div>
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <Link href={`/products/${product.id}`}>
                      <Button size="lg" className="px-10 py-6 text-lg">View Details</Button>
                    </Link>
                    <Button variant="outline" size="lg" className="px-10 py-6 text-lg border-[#333] hover:bg-[#111] hover:text-white hover:border-[#00D9A3]">Order Now</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
