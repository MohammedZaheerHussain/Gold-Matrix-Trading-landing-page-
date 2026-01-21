"use client";

import Link from "next/link";
import { GL } from "./gl";
import { Button } from "./ui/button";
import { useState } from "react";
import { LiveTradingChart } from "./live-trading-chart";

// Trading Chart Background Component
function TradingChart() {
  return (
    <div className="absolute -bottom-24 left-0 right-0 h-[400px] overflow-hidden pointer-events-none z-[5]">
      <svg
        viewBox="0 0 1200 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="60" height="40" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Horizontal price levels */}
        {[80, 140, 200, 260].map((y, i) => (
          <line
            key={i}
            x1="0"
            y1={y}
            x2="1200"
            y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        ))}

        {/* Area chart fill */}
        <path
          d="M0,280 L0,220 Q100,190 200,200 T400,160 T600,180 T800,140 T1000,150 T1200,120 L1200,280 Z"
          fill="url(#areaGradient)"
          className="animate-pulse-slow"
        />
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* Main price line */}
        <path
          d="M0,220 Q100,190 200,200 T400,160 T600,180 T800,140 T1000,150 T1200,120"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="2"
          className="animate-draw-line"
        />

        {/* Candlesticks */}
        {[
          { x: 60, y: 215, high: 195, low: 235, open: 205, close: 200, bull: true },
          { x: 120, y: 200, high: 180, low: 220, open: 195, close: 210, bull: false },
          { x: 180, y: 195, high: 175, low: 215, open: 200, close: 180, bull: true },
          { x: 240, y: 185, high: 165, low: 205, open: 175, close: 195, bull: false },
          { x: 300, y: 175, high: 155, low: 195, open: 185, close: 165, bull: true },
          { x: 360, y: 168, high: 148, low: 188, open: 160, close: 178, bull: false },
          { x: 420, y: 160, high: 140, low: 180, open: 170, close: 150, bull: true },
          { x: 480, y: 165, high: 145, low: 185, open: 155, close: 175, bull: false },
          { x: 540, y: 170, high: 150, low: 190, open: 180, close: 160, bull: true },
          { x: 600, y: 175, high: 155, low: 195, open: 165, close: 185, bull: false },
          { x: 660, y: 165, high: 145, low: 185, open: 175, close: 155, bull: true },
          { x: 720, y: 155, high: 135, low: 175, open: 145, close: 165, bull: false },
          { x: 780, y: 145, high: 125, low: 165, open: 155, close: 135, bull: true },
          { x: 840, y: 150, high: 130, low: 170, open: 140, close: 160, bull: false },
          { x: 900, y: 148, high: 128, low: 168, open: 158, close: 138, bull: true },
          { x: 960, y: 145, high: 125, low: 165, open: 135, close: 155, bull: false },
          { x: 1020, y: 140, high: 120, low: 160, open: 150, close: 130, bull: true },
          { x: 1080, y: 135, high: 115, low: 155, open: 125, close: 145, bull: false },
          { x: 1140, y: 128, high: 108, low: 148, open: 138, close: 118, bull: true },
        ].map((candle, i) => (
          <g
            key={i}
            className="chart-candle"
            style={{
              animationDelay: `${i * 0.1}s`,
              transformOrigin: `${candle.x}px ${candle.low}px`
            }}
          >
            {/* Wick */}
            <line
              x1={candle.x}
              y1={candle.high}
              x2={candle.x}
              y2={candle.low}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
              className="candle-wick"
            />
            {/* Body */}
            <rect
              x={candle.x - 5}
              y={Math.min(candle.open, candle.close)}
              width="10"
              height={Math.abs(candle.close - candle.open)}
              fill={candle.bull ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)"}
              stroke={candle.bull ? "rgba(74,222,128,0.25)" : "rgba(248,113,113,0.25)"}
              strokeWidth="1"
              rx="1"
              className="candle-body"
              style={{
                animationDelay: `${i * 0.15 + 0.5}s`,
                animationDuration: `${2 + (i % 3) * 0.5}s`
              }}
            />
            {/* Glow effect for bull candles */}
            {candle.bull && (
              <rect
                x={candle.x - 5}
                y={Math.min(candle.open, candle.close)}
                width="10"
                height={Math.abs(candle.close - candle.open)}
                fill="rgba(74,222,128,0.05)"
                className="candle-glow"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            )}
          </g>
        ))}

        {/* Price labels on right */}
        {[
          { y: 100, label: "1.2450" },
          { y: 150, label: "1.2400" },
          { y: 200, label: "1.2350" },
          { y: 250, label: "1.2300" },
        ].map((item, i) => (
          <text
            key={i}
            x="1170"
            y={item.y}
            fill="rgba(255,255,255,0.06)"
            fontSize="10"
            fontFamily="monospace"
            textAnchor="end"
          >
            {item.label}
          </text>
        ))}
      </svg>

      {/* Industry-grade multi-layer blending system */}
      {/* Primary vertical blend - smooth exponential falloff */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            rgba(0,0,0,1) 0%,
            rgba(0,0,0,0.95) 8%,
            rgba(0,0,0,0.8) 20%,
            rgba(0,0,0,0.5) 40%,
            rgba(0,0,0,0.2) 60%,
            rgba(0,0,0,0) 80%
          )`
        }}
      />

      {/* Secondary radial vignette - center spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 120% 80% at 50% 120%,
            transparent 0%,
            transparent 30%,
            rgba(0,0,0,0.3) 60%,
            rgba(0,0,0,0.7) 100%
          )`
        }}
      />

      {/* Horizontal edge feathering */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to right,
            rgba(0,0,0,0.8) 0%,
            rgba(0,0,0,0.3) 10%,
            transparent 25%,
            transparent 75%,
            rgba(0,0,0,0.3) 90%,
            rgba(0,0,0,0.8) 100%
          )`
        }}
      />

      {/* Top blend zone - where gold wave meets chart */}
      <div
        className="absolute top-0 left-0 right-0 h-[50%] pointer-events-none"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(0,0,0,0.9) 0%,
            rgba(0,0,0,0.6) 30%,
            rgba(0,0,0,0.2) 70%,
            transparent 100%
          )`
        }}
      />

      {/* Soft noise overlay for film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

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

        <Link className="contents" href="#download">
          <Button
            className="mt-10 rounded-full bg-white text-black hover:bg-white/90 px-8 py-3 text-sm font-medium"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            Download Now
          </Button>
        </Link>
      </div>

      {/* Bottom spacer */}
      <div className="h-16" />
    </div>
  );
}

