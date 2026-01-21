"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lenis-provider";
import {
    Shield,
    Zap,
    BarChart3,
    Lock,
    Globe,
    Headphones
} from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Lightning Fast Execution",
        description: "Execute trades in milliseconds with our cutting-edge infrastructure.",
    },
    {
        icon: Shield,
        title: "Bank-Grade Security",
        description: "Your funds are protected with military-grade encryption and cold storage.",
    },
    {
        icon: BarChart3,
        title: "Advanced Analytics",
        description: "Real-time charts, indicators, and AI-powered market insights.",
    },
    {
        icon: Lock,
        title: "Fully Regulated",
        description: "Licensed and regulated in multiple jurisdictions worldwide.",
    },
    {
        icon: Globe,
        title: "Global Markets",
        description: "Access 10,000+ instruments across forex, crypto, stocks, and commodities.",
    },
    {
        icon: Headphones,
        title: "24/7 Expert Support",
        description: "Dedicated account managers and round-the-clock technical support.",
    },
];

export function FeaturesSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Heading animation
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Feature cards - staggered reveal
            const cards = gridRef.current?.querySelectorAll(".feature-card");
            if (cards) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 80, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.9,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 80%",
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
            id="features"
            className="relative py-32 bg-black overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950/50 to-black" />

            {/* Decorative glow orbs */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-amber-500/3 rounded-full blur-[120px]" />

            {/* Floating Lock Icon - Left Side */}
            <div className="absolute left-6 md:left-16 lg:left-24 top-[30%] pointer-events-none select-none">
                <div className="animate-float-slow">
                    <span
                        className="text-[140px] md:text-[180px] lg:text-[220px] opacity-[0.08] bg-gradient-to-b from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent"
                        style={{ textShadow: '0 0 80px rgba(251,191,36,0.2)' }}
                    >
                        🔒
                    </span>
                </div>
            </div>

            {/* Floating Rocket Icon - Right Side */}
            <div className="absolute right-6 md:right-16 lg:right-24 top-[55%] pointer-events-none select-none">
                <div className="animate-float-slow" style={{ animationDelay: '-3s' }}>
                    <span
                        className="text-[120px] md:text-[160px] lg:text-[200px] opacity-[0.10] bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent"
                        style={{ textShadow: '0 0 80px rgba(251,191,36,0.2)' }}
                    >
                        🚀
                    </span>
                </div>
            </div>

            <div className="container relative z-10 max-w-6xl mx-auto px-6">
                {/* Heading */}
                <div ref={headingRef} className="text-center mb-20">
                    <span className="text-amber-400/80 text-sm uppercase tracking-[0.3em] mb-4 block">
                        Why Gold Matrix
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-sentient mb-6">
                        Powerful Features
                    </h2>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
                        Everything you need to trade with confidence and precision.
                    </p>
                </div>

                {/* Features Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="feature-card group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/20 hover:bg-white/[0.04] transition-all duration-500"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-6 h-6 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-medium mb-3 text-foreground/90">
                                {feature.title}
                            </h3>
                            <p className="text-foreground/50 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
