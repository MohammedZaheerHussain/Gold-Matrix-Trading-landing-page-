"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lenis-provider";
import { LiveTradingChart } from "../live-trading-chart";

const stats = [
    { value: "500K+", label: "Active Traders" },
    { value: "$2B+", label: "Trading Volume" },
];

export function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Heading animation
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Description animation
            gsap.fromTo(
                descriptionRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: descriptionRef.current,
                        start: "top 85%",
                        end: "top 50%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Stats animation - staggered
            const statItems = statsRef.current?.querySelectorAll(".stat-item");
            if (statItems) {
                gsap.fromTo(
                    statItems,
                    { opacity: 0, y: 50, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: "top 80%",
                            end: "top 40%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative min-h-screen py-32 bg-black overflow-hidden"
        >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

            {/* Decorative elements */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-amber-500/3 rounded-full blur-[120px]" />

            {/* Floating Rupee Symbol - Right Side */}
            <div className="absolute right-6 md:right-16 lg:right-28 top-[60%] pointer-events-none select-none">
                <div className="animate-float-slow">
                    <span
                        className="text-[200px] md:text-[260px] lg:text-[320px] font-sentient font-bold opacity-[0.15] bg-gradient-to-b from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent"
                        style={{
                            textShadow: '0 0 100px rgba(251,191,36,0.25)',
                        }}
                    >
                        ₹
                    </span>
                </div>
            </div>

            {/* Floating Rupee Symbol - Left Side */}
            <div className="absolute left-6 md:left-16 lg:left-28 top-1/2 pointer-events-none select-none">
                <div className="animate-float-slow" style={{ animationDelay: '-3s' }}>
                    <span
                        className="text-[160px] md:text-[210px] lg:text-[260px] font-sentient font-bold opacity-[0.12] bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent"
                        style={{
                            textShadow: '0 0 80px rgba(251,191,36,0.2)',
                        }}
                    >
                        ₹
                    </span>
                </div>
            </div>

            <div className="container relative z-10 max-w-5xl mx-auto px-6 pt-80">
                {/* Heading */}
                <h2
                    ref={headingRef}
                    className="text-4xl sm:text-5xl md:text-6xl font-sentient text-center mb-8"
                >
                    Built for{" "}
                    <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                        Success
                    </span>
                </h2>

                {/* Description */}
                <p
                    ref={descriptionRef}
                    className="text-lg sm:text-xl text-foreground/60 text-center max-w-2xl mx-auto mb-20 leading-relaxed"
                >
                    Our mission is simple: empower traders to succeed. With cutting-edge technology,
                    transparent pricing, and unwavering commitment to security, Gold Matrix provides
                    the foundation for your trading journey.
                </p>

                {/* Stats Grid - Centered */}
                <div
                    ref={statsRef}
                    className="flex flex-wrap justify-center gap-8 md:gap-12"
                >
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-item text-center p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm min-w-[180px] md:min-w-[220px] opacity-0"
                        >
                            <div className="text-3xl sm:text-4xl md:text-5xl font-sentient bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm sm:text-base text-foreground/50">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Live Trading Chart - Appears behind content */}
            <LiveTradingChart />
        </section>
    );
}
