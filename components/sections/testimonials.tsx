"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lenis-provider";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Gold Matrix transformed my trading. The execution speed is unmatched, and the analytics tools helped me increase my win rate by 40%.",
        author: "Sarah Chen",
        role: "Professional Day Trader",
        avatar: "SC",
    },
    {
        quote: "Finally, a platform that takes security seriously. I moved my entire portfolio here and haven't looked back. The 24/7 support is incredible.",
        author: "Marcus Williams",
        role: "Crypto Investor",
        avatar: "MW",
    },
    {
        quote: "The educational resources alone are worth it. I went from complete beginner to profitable trader in just 6 months.",
        author: "Elena Rodriguez",
        role: "Forex Trader",
        avatar: "ER",
    },
];

export function TestimonialsSection() {
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

            const cards = cardsRef.current?.querySelectorAll(".testimonial-card");
            if (cards) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
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
            id="testimonials"
            className="relative py-32 bg-black overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950/50 to-black" />

            {/* Decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[200px]" />

            <div className="container relative z-10 max-w-6xl mx-auto px-6">
                <div ref={headingRef} className="text-center mb-16">
                    <span className="text-amber-400/80 text-sm uppercase tracking-[0.3em] mb-4 block">
                        Testimonials
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-sentient mb-6">
                        Trusted by Traders
                    </h2>
                    <p className="text-lg text-foreground/50 max-w-2xl mx-auto">
                        Join thousands of successful traders who chose Gold Matrix.
                    </p>
                </div>

                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="testimonial-card p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/20 transition-all duration-300"
                        >
                            <Quote className="w-8 h-8 text-amber-500/30 mb-4" />
                            <p className="text-foreground/70 leading-relaxed mb-6">
                                "{testimonial.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/20 flex items-center justify-center text-amber-300 font-medium">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <div className="font-medium text-foreground/90">
                                        {testimonial.author}
                                    </div>
                                    <div className="text-sm text-foreground/50">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
