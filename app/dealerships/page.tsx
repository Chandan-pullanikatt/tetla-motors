import Link from "next/link";
import { Button } from "@/app/components/ui/button";

const dealers = [
  { name: "Tetla Los Angeles", address: "123 Sunset Blvd, Los Angeles, CA", phone: "(323) 555-0101" },
  { name: "Tetla New York", address: "456 Broadway, New York, NY", phone: "(212) 555-0102" },
  { name: "Tetla Miami", address: "789 Ocean Dr, Miami, FL", phone: "(305) 555-0103" },
  { name: "Tetla London", address: "10 Downing St, London, UK", phone: "+44 20 7946 0000" },
  { name: "Tetla Berlin", address: "Unter den Linden 1, Berlin, DE", phone: "+49 30 123456" },
  { name: "Tetla Tokyo", address: "1-1 Chiyoda, Tokyo, JP", phone: "+81 3 1234 5678" },
];

export default function DealershipsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h1 className="text-5xl md:text-[64px] font-bold mb-6 tracking-tight leading-none">
              FIND A <span className="text-[#00D9A3]">DEALER</span>
            </h1>
            <p className="text-[#999] max-w-xl text-lg font-light">
              Experience Tetla Motors in person. Visit one of our showrooms to see our vehicles up close and schedule a test drive.
            </p>
          </div>
          <Link href="/dealerships/become-dealer">
            <Button size="lg" className="mt-8 md:mt-0 px-10 py-6 text-lg">Become a Dealer</Button>
          </Link>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-96 bg-[#111] rounded-2xl mb-16 flex items-center justify-center border border-[#222]">
          <span className="text-2xl font-bold text-[#333] tracking-widest">INTERACTIVE MAP PLACEHOLDER</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dealers.map((dealer, index) => (
            <div key={index} className="p-8 bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-2xl border border-[#222] hover:border-[#00D9A3]/50 transition-colors duration-300 group">
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#00D9A3] transition-colors">{dealer.name}</h3>
              <p className="text-[#999] text-sm mb-6">{dealer.address}</p>
              <p className="text-[#00D9A3] text-sm font-medium mb-6">{dealer.phone}</p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="w-full border-[#333] hover:bg-[#222] text-white">Directions</Button>
                <Button variant="secondary" size="sm" className="w-full bg-[#222] hover:bg-[#333] text-white">Call</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
