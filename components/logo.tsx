import React from "react";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Animated Trading Candles Icon */}
      <div className="relative w-10 h-10 flex items-end justify-center gap-[3px] pb-1">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Candle 1 - Green/Bull */}
        <div className="relative flex flex-col items-center animate-candle-1">
          <div className="w-[1px] h-2 bg-emerald-400" /> {/* Wick */}
          <div className="w-[5px] h-4 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-[1px]" /> {/* Body */}
          <div className="w-[1px] h-1 bg-emerald-400" /> {/* Wick */}
        </div>

        {/* Candle 2 - Red/Bear */}
        <div className="relative flex flex-col items-center animate-candle-2">
          <div className="w-[1px] h-1.5 bg-red-400" />
          <div className="w-[5px] h-5 bg-gradient-to-t from-red-500 to-red-400 rounded-[1px]" />
          <div className="w-[1px] h-1 bg-red-400" />
        </div>

        {/* Candle 3 - Gold/Bull (main) */}
        <div className="relative flex flex-col items-center animate-candle-3">
          <div className="w-[1px] h-1 bg-amber-400" />
          <div className="w-[5px] h-6 bg-gradient-to-t from-amber-500 to-yellow-400 rounded-[1px] shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          <div className="w-[1px] h-0.5 bg-amber-400" />
        </div>

        {/* Candle 4 - Green/Bull */}
        <div className="relative flex flex-col items-center animate-candle-4">
          <div className="w-[1px] h-2 bg-emerald-400" />
          <div className="w-[5px] h-3.5 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-[1px]" />
          <div className="w-[1px] h-1.5 bg-emerald-400" />
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col leading-none">
        <span className="text-lg font-sentient tracking-wide bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
          Gold Matrix
        </span>
        <span className="text-[9px] text-foreground/40 tracking-[0.3em] uppercase mt-0.5">
          Trading
        </span>
      </div>
    </Link>
  );
};
