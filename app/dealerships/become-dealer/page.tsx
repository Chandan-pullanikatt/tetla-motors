"use client";

import { Button } from "@/app/components/ui/button";

export default function BecomeDealerPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20">
            <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 max-w-5xl">
                <h1 className="text-4xl md:text-[64px] font-bold mb-8 tracking-tight leading-none text-center">
                    BECOME A <span className="text-[#00D9A3]">PARTNER</span>
                </h1>
                <p className="text-xl text-[#999] mb-16 text-center max-w-3xl mx-auto font-light">
                    Join the revolution. We are looking for visionary partners to help us accelerate the world's transition to sustainable energy.
                </p>

                <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8 md:p-12 rounded-2xl border border-[#222]">
                    <h2 className="text-2xl font-bold mb-8 text-white">Dealer Application</h2>
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-[#999] tracking-wide">Company Name</label>
                                <input type="text" className="w-full bg-black border border-[#333] rounded-lg p-4 text-white focus:outline-none focus:border-[#00D9A3] transition-colors duration-300" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-[#999] tracking-wide">Contact Person</label>
                                <input type="text" className="w-full bg-black border border-[#333] rounded-lg p-4 text-white focus:outline-none focus:border-[#00D9A3] transition-colors duration-300" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-[#999] tracking-wide">Email Address</label>
                                <input type="email" className="w-full bg-black border border-[#333] rounded-lg p-4 text-white focus:outline-none focus:border-[#00D9A3] transition-colors duration-300" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-[#999] tracking-wide">Phone Number</label>
                                <input type="tel" className="w-full bg-black border border-[#333] rounded-lg p-4 text-white focus:outline-none focus:border-[#00D9A3] transition-colors duration-300" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-[#999] tracking-wide">Proposed Location (City, Country)</label>
                            <input type="text" className="w-full bg-black border border-[#333] rounded-lg p-4 text-white focus:outline-none focus:border-[#00D9A3] transition-colors duration-300" />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-[#999] tracking-wide">Business Experience / Comments</label>
                            <textarea rows={4} className="w-full bg-black border border-[#333] rounded-lg p-4 text-white focus:outline-none focus:border-[#00D9A3] transition-colors duration-300" />
                        </div>

                        <Button size="lg" className="w-full md:w-auto px-12 py-6 text-lg">Submit Application</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
