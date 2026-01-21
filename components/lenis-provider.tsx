"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface LenisProviderProps {
    children: React.ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        // Sync Lenis with GSAP ScrollTrigger
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        // Update ScrollTrigger on Lenis scroll
        const lenis = lenisRef.current?.lenis;
        if (lenis) {
            lenis.on("scroll", ScrollTrigger.update);
        }

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                lerp: 0.08, // Smooth interpolation (lower = smoother, slower)
                duration: 1.5, // Animation duration
                smoothWheel: true,
                wheelMultiplier: 0.8, // Slower scroll for cinematic feel
                touchMultiplier: 1.5,
                infinite: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}

// Export GSAP and ScrollTrigger for use in other components
export { gsap, ScrollTrigger };
