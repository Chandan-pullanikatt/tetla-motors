"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    duration?: number;
}

export function Reveal({
    children,
    className,
    delay = 0,
    y = 50,
    duration = 1,
}: RevealProps) {
    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!el.current) return;

        gsap.fromTo(
            el.current,
            { y: y, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, [delay, y, duration]);

    return (
        <div ref={el} className={className}>
            {children}
        </div>
    );
}

interface ParallaxProps {
    children: React.ReactNode;
    className?: string;
    scale?: number;
    speed?: number; // 0 to 1 for parallax intensity
}

export function Parallax({
    children,
    className,
    scale = 1.2,
    speed = 0.5,
}: ParallaxProps) {
    const container = useRef<HTMLDivElement>(null);
    const target = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!container.current || !target.current) return;

        // Initial scale
        gsap.set(target.current, { scale: scale });

        // Parallax + Scale effect
        gsap.to(target.current, {
            yPercent: 20 * speed, // Move down slightly as we scroll
            scale: 1, // Scale down to 1
            ease: "none",
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
    }, [scale, speed]);

    return (
        <div ref={container} className={`overflow-hidden ${className}`}>
            <div ref={target} className="h-full w-full">
                {children}
            </div>
        </div>
    );
}
