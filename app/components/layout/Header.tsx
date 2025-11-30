"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/app/lib/utils";

const navLinks = [
    { name: "Products", href: "/products" },
    { name: "Ownership", href: "/ownership" },
    { name: "Dealership", href: "/dealerships" },
    { name: "About", href: "/about" },
    { name: "Blogs", href: "/blog" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            gsap.to(menuRef.current, {
                x: 0,
                duration: 0.5,
                ease: "power3.out",
            });
        } else {
            gsap.to(menuRef.current, {
                x: "100%",
                duration: 0.5,
                ease: "power3.in",
            });
        }
    }, [isOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <header
            ref={headerRef}
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
                scrolled ? "bg-black/80 backdrop-blur-md py-3 border-b border-white/10" : "bg-transparent py-4"
            )}
        >
            <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 flex flex-row items-center gap-8">
                {/* Logo */}
                <Link href="/" className="flex flex-row items-center gap-2 z-50 shrink-0">
                    <div className="relative w-5 h-5">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#FF0000]">
                            <path d="M12 2L2 5V11C2 16.55 6.16 21.74 12 23C17.84 21.74 22 16.55 22 11V5L12 2Z" stroke="currentColor" strokeWidth="2" fill="none" />
                            <path d="M12 6V17" stroke="currentColor" strokeWidth="2" />
                            <path d="M8 6H16" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold tracking-tighter text-[#FF0000]">TETLA</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="flex flex-row items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-white hover:text-gray-300 transition-colors duration-300 tracking-wide whitespace-nowrap no-underline"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Toggle - Auto pushed to right */}
                <div className="md:hidden ml-auto z-50">
                    <button
                        className="text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Nav Overlay */}
                <div
                    ref={menuRef}
                    className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 md:hidden translate-x-full"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-2xl font-bold text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
