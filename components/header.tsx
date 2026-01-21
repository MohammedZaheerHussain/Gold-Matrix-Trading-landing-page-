"use client";

import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { Logo } from "./logo";
import { useEffect, useState } from "react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full transition-all duration-300 ${scrolled
        ? "pt-3 md:pt-4 bg-black/80 backdrop-blur-xl border-b border-amber-500/10"
        : "pt-6 md:pt-8"
        }`}
    >
      <header className="flex items-center justify-between container pb-3">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Center Navigation */}
        <nav className="flex max-lg:hidden items-center gap-x-12 absolute left-1/2 -translate-x-1/2">
          <Link
            className={`inline-block text-lg font-sentient font-medium tracking-wide transition-colors duration-150 ease-out ${scrolled
              ? "text-amber-200/90 hover:text-amber-100"
              : "text-foreground/80 hover:text-foreground"
              }`}
            href="/about"
          >
            About
          </Link>
          <Link
            className={`inline-block text-lg font-sentient font-medium tracking-wide transition-colors duration-150 ease-out ${scrolled
              ? "text-amber-200/90 hover:text-amber-100"
              : "text-foreground/80 hover:text-foreground"
              }`}
            href="/trading"
          >
            Features
          </Link>
          <Link
            className={`inline-block text-lg font-sentient font-medium tracking-wide transition-colors duration-150 ease-out ${scrolled
              ? "text-amber-200/90 hover:text-amber-100"
              : "text-foreground/80 hover:text-foreground"
              }`}
            href="/pricing"
          >
            Pricing
          </Link>
          <Link
            className={`inline-block text-lg font-sentient font-medium tracking-wide transition-colors duration-150 ease-out ${scrolled
              ? "text-amber-200/90 hover:text-amber-100"
              : "text-foreground/80 hover:text-foreground"
              }`}
            href="/contact"
          >
            Contact
          </Link>
          <Link
            className={`inline-block text-lg font-sentient font-medium tracking-wide transition-colors duration-150 ease-out ${scrolled
              ? "text-amber-200/90 hover:text-amber-100"
              : "text-foreground/80 hover:text-foreground"
              }`}
            href="/faq"
          >
            FAQ
          </Link>
        </nav>

        {/* Right Buttons */}
        <div className="flex max-lg:hidden items-center gap-2">
          <Link
            href="/download"
            className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-sentient font-semibold hover:opacity-90 px-7 py-3 text-base transition-all duration-150 shadow-lg shadow-amber-500/20"
          >
            Download App
          </Link>
        </div>
        <MobileMenu />
      </header>
    </div>
  );
};
