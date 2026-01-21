"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lenis-provider";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How do I get started with Gold Matrix?",
        answer: "Getting started is easy! Simply sign up for a free account, complete the verification process, and make your first deposit. Our onboarding guide will walk you through everything.",
    },
    {
        question: "What trading instruments are available?",
        answer: "Gold Matrix offers access to over 10,000 instruments including forex pairs, cryptocurrencies, stocks, indices, and commodities. Trade major, minor, and exotic pairs 24/5.",
    },
    {
        question: "How secure is Gold Matrix?",
        answer: "Security is our top priority. We use bank-grade encryption, cold storage for crypto assets, and two-factor authentication. We're fully regulated and segregate client funds.",
    },
    {
        question: "What are the fees and spreads?",
        answer: "We offer competitive spreads starting from 0.1 pips on major forex pairs. No hidden fees – what you see is what you pay. Pro accounts get even tighter spreads.",
    },
    {
        question: "Can I trade on mobile?",
        answer: "Absolutely! Our mobile apps for iOS and Android offer the full trading experience. Execute trades, analyze charts, and manage your portfolio on the go.",
    },
];

function FAQItem({ question, answer, isOpen, onClick }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="border-b border-white/[0.05] last:border-none">
            <button
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <span className="text-lg font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                    {question}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-foreground/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            <div
                ref={contentRef}
                className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 pb-6" : "max-h-0"
                    }`}
            >
                <p className="text-foreground/60 leading-relaxed">{answer}</p>
            </div>
        </div>
    );
}

export function FAQSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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

            gsap.fromTo(
                faqRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: faqRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="faq"
            className="relative py-32 bg-black overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

            {/* Decorative glow orbs */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-amber-500/3 rounded-full blur-[120px]" />

            {/* Floating ? Symbol - Left Side */}
            <div className="absolute left-6 md:left-16 lg:left-24 top-[30%] pointer-events-none select-none">
                <div className="animate-float-slow">
                    <span
                        className="text-[160px] md:text-[200px] lg:text-[260px] font-sentient font-bold opacity-[0.10] bg-gradient-to-b from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent"
                        style={{ textShadow: '0 0 100px rgba(251,191,36,0.25)' }}
                    >
                        ?
                    </span>
                </div>
            </div>

            {/* Floating Lightbulb Icon - Right Side */}
            <div className="absolute right-6 md:right-16 lg:right-24 top-[55%] pointer-events-none select-none">
                <div className="animate-float-slow" style={{ animationDelay: '-3s' }}>
                    <span
                        className="text-[120px] md:text-[160px] lg:text-[200px] opacity-[0.12] bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent"
                        style={{ textShadow: '0 0 80px rgba(251,191,36,0.2)' }}
                    >
                        💡
                    </span>
                </div>
            </div>

            <div className="container relative z-10 max-w-3xl mx-auto px-6">
                <div ref={headingRef} className="text-center mb-16">
                    <span className="text-amber-400/80 text-sm uppercase tracking-[0.3em] mb-4 block">
                        FAQ
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-sentient mb-6">
                        Questions? Answers.
                    </h2>
                    <p className="text-lg text-foreground/50">
                        Everything you need to know about Gold Matrix.
                    </p>
                </div>

                <div
                    ref={faqRef}
                    className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 md:p-8"
                >
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
