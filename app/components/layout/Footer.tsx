"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
    const [year, setYear] = useState(2025);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="bg-black text-white py-10 border-t border-[#222]">
            <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    {/* Column 1: Logo & Slogan */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <img src="/logo.png" alt="TETLA Logo" className="h-10 w-auto object-contain" />
                        </Link>
                        <p className="text-[#999] text-xs tracking-widest uppercase">
                            SWIFT, SILENT AND SUSTAINABLE
                        </p>
                    </div>

                    {/* Column 2: Products */}
                    <div>
                        <h4 className="text-[#999] mb-6 text-sm">Products</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">TETLA Classic (RTO Model)</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">TETLA E9 Pro (RTO Model)</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">TETLA Pro Plus</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">TETLA Ailes Plus</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">TETLA Voiture</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Explore */}
                    <div>
                        <h4 className="text-[#999] mb-6 text-sm">Explore</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">Service</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">Dealership</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">Saving Calculator</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">Warranty</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">TETLA Voiture</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Discover */}
                    <div>
                        <h4 className="text-[#999] mb-6 text-sm">Discover</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">FAQs</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">Blogs</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">Terms</Link></li>
                            <li><Link href="#" className="hover:text-[#00D9A3] transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Column 5: Address */}
                    <div className="text-left lg:text-right">
                        <h4 className="text-[#999] mb-6 text-sm">Registered Office Address</h4>
                        <p className="text-sm leading-relaxed mb-4">
                            Doaaa Building,<br />
                            Kunnamangalam,<br />
                            Karanthur, Calicut, Kerala<br />
                            673 571
                        </p>
                        <a href="mailto:info@tetlamotors.com" className="text-sm underline hover:text-[#00D9A3] transition-colors">
                            info@tetlamotors.com
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-center pt-4">
                    {/* Social Icons */}
                    <div className="flex gap-4 mt-6 md:mt-0">
                        <Link href="#" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition-colors text-white">
                            <Facebook size={20} fill="currentColor" className="border-none" />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition-colors text-white">
                            <Linkedin size={20} fill="currentColor" className="border-none" />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition-colors text-white">
                            <Twitter size={20} fill="currentColor" className="border-none" />
                        </Link>
                        <Link href="#" className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center hover:bg-[#333] transition-colors text-white">
                            <Instagram size={20} />
                        </Link>
                    </div>

                    {/* Copyright */}
                    <div className="text-xs font-bold tracking-wider text-white">
                        &copy; {year} BY TETLA MOTORS PRIVATE LIMITED.
                    </div>
                </div>
            </div>
        </footer>
    );
}
