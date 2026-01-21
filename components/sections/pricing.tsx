"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lenis-provider";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Basic",
        price: "Free",
        description: "Perfect for beginners exploring the markets",
        features: [
            "Access to forex & crypto markets",
            "Basic charting tools",
            "Mobile app access",
            "Community support",
            "Educational resources",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Pro",
        price: "$29",
        period: "/month",
        description: "For serious traders who need advanced tools",
        features: [
            "Everything in Basic",
            "Advanced technical indicators",
            "AI trading signals",
            "Priority execution",
            "Dedicated account manager",
            "Lower spreads",
        ],
        cta: "Start Trading",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "Tailored solutions for institutional traders",
        features: [
            "Everything in Pro",
            "Custom API access",
            "White-label solutions",
            "Dedicated infrastructure",
            "Custom integrations",
            "VIP support line",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

export function PricingSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 50 },
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

            const cards = cardsRef.current?.querySelectorAll(".pricing-card");
            if (cards) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 75%",
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
            id="pricing"
            className="relative py-32 bg-black overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

            <div className="container relative z-10 max-w-6xl mx-auto px-6">
                <div ref={headingRef} className="text-center mb-16">
                    <span className="text-amber-400/80 text-sm uppercase tracking-[0.3em] mb-4 block">
                        Pricing
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-sentient mb-6">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
                        Choose the plan that fits your trading style. Upgrade anytime.
                    </p>
                </div>

                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`pricing-card relative p-8 rounded-2xl border transition-all duration-300 ${plan.popular
                                    ? "bg-gradient-to-b from-amber-500/10 to-transparent border-amber-500/30 scale-105"
                                    : "bg-white/[0.02] border-white/[0.05] hover:border-white/[0.1]"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full text-black text-sm font-medium">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-sentient bg-gradient-to-r from-amber-200 to-yellow-100 bg-clip-text text-transparent">
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span className="text-foreground/40">{plan.period}</span>
                                    )}
                                </div>
                                <p className="text-foreground/50 mt-2 text-sm">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-foreground/70">
                                        <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${plan.popular
                                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:opacity-90"
                                        : "bg-white/[0.05] text-foreground/80 hover:bg-white/[0.1]"
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
