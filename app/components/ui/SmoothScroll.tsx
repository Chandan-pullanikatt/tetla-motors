"use client";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
            ScrollTrigger.update();
        }

        gsap.ticker.add(update);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis ref={lenisRef} root options={{ lerp: 0.075, duration: 1.4, smoothWheel: true, wheelMultiplier: 0.9, syncTouch: true }}>
            {children}
        </ReactLenis>
    );
}
