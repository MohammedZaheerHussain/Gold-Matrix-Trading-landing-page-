"use client";

import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <div className="fixed z-50 pt-6 md:pt-8 top-0 left-0 w-full">
      <header className="flex items-center justify-between container">
        {/* Left Navigation */}
        <nav className="flex max-lg:hidden items-center gap-x-10">
          <Link
            className="inline-block text-sm text-foreground/70 hover:text-foreground/100 duration-150 transition-colors ease-out"
            href="#about"
          >
            About
          </Link>
          <button className="inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground/100 duration-150 transition-colors ease-out">
            Trading
            <ChevronDown className="w-4 h-4" />
          </button>
          <Link
            className="inline-block text-sm text-foreground/70 hover:text-foreground/100 duration-150 transition-colors ease-out"
            href="#contact"
          >
            Contact
          </Link>
          <Link
            className="inline-block text-sm text-foreground/70 hover:text-foreground/100 duration-150 transition-colors ease-out"
            href="#faq"
          >
            FAQ
          </Link>
          <button className="inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground/100 duration-150 transition-colors ease-out">
            ENG
            <ChevronDown className="w-4 h-4" />
          </button>
        </nav>

        {/* Right Buttons */}
        <div className="flex max-lg:hidden items-center gap-2">
          <Button 
            variant="ghost" 
            className="rounded-full text-foreground/80 hover:text-foreground hover:bg-white/10 px-5 py-2 text-sm"
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            className="rounded-full border-foreground/20 bg-white text-black hover:bg-white/90 px-5 py-2 text-sm"
          >
            Sign up
          </Button>
        </div>
        <MobileMenu />
      </header>
    </div>
  );
};
