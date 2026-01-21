"use client";

import { Footer } from "@/components/sections/footer";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
    };

    return (
        <main className="pt-20 min-h-screen bg-black">
            <section className="py-32 relative overflow-hidden">
                {/* Background gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950/50 to-black" />
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-amber-500/3 rounded-full blur-[120px]" />

                {/* Floating @ Symbol - Left Side */}
                <div className="absolute left-6 md:left-16 lg:left-24 top-[25%] pointer-events-none select-none">
                    <div className="animate-float-slow">
                        <span
                            className="text-[160px] md:text-[200px] lg:text-[260px] font-sentient font-bold opacity-[0.12] bg-gradient-to-b from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent"
                            style={{ textShadow: '0 0 100px rgba(251,191,36,0.25)' }}
                        >
                            @
                        </span>
                    </div>
                </div>

                {/* Floating Chat Icon - Right Side */}
                <div className="absolute right-6 md:right-16 lg:right-24 top-[55%] pointer-events-none select-none">
                    <div className="animate-float-slow" style={{ animationDelay: '-3s' }}>
                        <span
                            className="text-[120px] md:text-[160px] lg:text-[200px] opacity-[0.10] bg-gradient-to-b from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent"
                            style={{ textShadow: '0 0 80px rgba(251,191,36,0.2)' }}
                        >
                            💬
                        </span>
                    </div>
                </div>

                <div className="container relative z-10 max-w-3xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="text-amber-400/80 text-sm uppercase tracking-[0.3em] mb-4 block">
                            Get in Touch
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-sentient mb-6">
                            Contact Us
                        </h1>
                        <p className="text-lg text-foreground/50">
                            Have questions? We'd love to hear from you.
                        </p>
                    </div>

                    {/* Contact Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-foreground/70 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-foreground focus:border-amber-500/50 focus:outline-none transition-colors"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-foreground/70 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-foreground focus:border-amber-500/50 focus:outline-none transition-colors"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-foreground/70 mb-2">Subject</label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-foreground focus:border-amber-500/50 focus:outline-none transition-colors"
                                placeholder="How can we help?"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-foreground/70 mb-2">Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-foreground focus:border-amber-500/50 focus:outline-none transition-colors resize-none"
                                placeholder="Your message..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-medium hover:opacity-90 transition-opacity"
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Contact Info */}
                    <div className="mt-16 pt-16 border-t border-white/[0.05] grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="text-foreground/90 font-medium mb-2">Email</h3>
                            <p className="text-foreground/50 text-sm">support@goldmatrix.com</p>
                        </div>
                        <div>
                            <h3 className="text-foreground/90 font-medium mb-2">Phone</h3>
                            <p className="text-foreground/50 text-sm">+1 (800) GOLD-MTX</p>
                        </div>
                        <div>
                            <h3 className="text-foreground/90 font-medium mb-2">Office</h3>
                            <p className="text-foreground/50 text-sm">123 Trading Street, NY</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
