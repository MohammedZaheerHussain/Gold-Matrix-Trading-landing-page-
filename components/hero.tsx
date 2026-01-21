"use client";

import Link from "next/link";
import { GL } from "./gl";
import { Button } from "./ui/button";
import { useState } from "react";


export function Hero() {
  const [hovering, setHovering] = useState(false);
  return (
    <div className="flex flex-col h-svh justify-between relative">
      <GL hovering={hovering} />

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10 pt-24">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient text-balance">
          Elevate Your
          <br />
          Trading Experience
        </h1>
        <p className="text-sm sm:text-base text-foreground/50 text-balance mt-6 max-w-[460px] mx-auto">
          Unlock your trading potential in a fully regulated environment, powered by Gold Matrix
        </p>

        <Link className="contents" href="#signup">
          <Button
            className="mt-10 rounded-full bg-white text-black hover:bg-white/90 px-8 py-3 text-sm font-medium"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            Sign Up & Trade
          </Button>
        </Link>
      </div>



      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  );
}
