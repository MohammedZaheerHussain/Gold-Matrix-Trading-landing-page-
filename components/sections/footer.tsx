"use client";

import Link from "next/link";
import { Logo } from "../logo";
import { Twitter, Linkedin, Github, Youtube } from "lucide-react";

const footerLinks = {
    Product: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Trading Tools", href: "#" },
        { label: "API", href: "#" },
    ],
    Company: [
        { label: "About", href: "#about" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Contact", href: "#contact" },
    ],
    Resources: [
        { label: "Blog", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Education", href: "#" },
        { label: "Market Analysis", href: "#" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Compliance", href: "#" },
        { label: "Security", href: "#" },
    ],
};

const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
    return (
        <footer className="relative py-20 bg-black border-t border-white/[0.05]">
            <div className="container max-w-6xl mx-auto px-6">
                {/* Top section */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
                    {/* Logo and tagline */}
                    <div className="col-span-2">
                        <Logo />
                        <p className="mt-4 text-foreground/50 text-sm max-w-xs">
                            Empowering traders worldwide with cutting-edge technology and
                            unwavering commitment to success.
                        </p>
                        {/* Social links */}
                        <div className="flex items-center gap-4 mt-6">
                            {socialLinks.map((social, index) => (
                                <Link
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-white/[0.1] transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-medium text-foreground/90 mb-4">{category}</h4>
                            <ul className="space-y-3">
                                {links.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom section */}
                <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-foreground/40">
                        © {new Date().getFullYear()} Gold Matrix. All rights reserved.
                    </p>
                    <p className="text-xs text-foreground/30 max-w-xl text-center md:text-right">
                        Trading involves risk. Past performance is not indicative of future results.
                        Please trade responsibly.
                    </p>
                </div>
            </div>
        </footer>
    );
}
