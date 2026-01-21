"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger } from "./lenis-provider";

interface Candle {
    x: number;
    high: number;
    low: number;
    open: number;
    close: number;
    bull: boolean;
    baseClose: number;
}

// Generate initial candles with more dramatic ups and downs
function generateCandles(): Candle[] {
    const baseCandles = [
        // Opening dip
        { x: 60, high: 170, low: 220, open: 180, close: 210, bull: false },
        { x: 120, high: 190, low: 240, open: 215, close: 230, bull: false },
        // First recovery
        { x: 180, high: 180, low: 230, open: 225, close: 190, bull: true },
        { x: 240, high: 150, low: 200, open: 185, close: 160, bull: true },
        // Sharp drop
        { x: 300, high: 155, low: 210, open: 165, close: 200, bull: false },
        { x: 360, high: 180, low: 235, open: 205, close: 225, bull: false },
        // Strong rally
        { x: 420, high: 160, low: 220, open: 215, close: 170, bull: true },
        { x: 480, high: 130, low: 175, open: 165, close: 140, bull: true },
        { x: 540, high: 110, low: 150, open: 135, close: 120, bull: true },
        // Profit taking dip
        { x: 600, high: 115, low: 165, open: 125, close: 155, bull: false },
        { x: 660, high: 140, low: 190, open: 160, close: 180, bull: false },
        // Recovery wave
        { x: 720, high: 135, low: 185, open: 175, close: 145, bull: true },
        { x: 780, high: 120, low: 160, open: 140, close: 125, bull: true },
        // Minor pullback
        { x: 840, high: 125, low: 170, open: 130, close: 160, bull: false },
        // Final push up
        { x: 900, high: 115, low: 165, open: 155, close: 125, bull: true },
        { x: 960, high: 100, low: 145, open: 120, close: 110, bull: true },
        { x: 1020, high: 95, low: 130, open: 105, close: 100, bull: true },
        // Consolidation
        { x: 1080, high: 95, low: 125, open: 100, close: 115, bull: false },
        { x: 1140, high: 90, low: 120, open: 110, close: 95, bull: true },
    ];
    return baseCandles.map(c => ({ ...c, baseClose: c.close }));
}

export function LiveTradingChart() {
    const chartRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const lineRef = useRef<SVGPathElement>(null);
    const candlesGroupRef = useRef<SVGGElement>(null);
    const [candles, setCandles] = useState<Candle[]>(generateCandles);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const lastUpdateRef = useRef(0);

    // Very slow animation - updates every 2 seconds with tiny movements
    useEffect(() => {
        if (!isVisible || scrollProgress < 0.3) return;

        const interval = setInterval(() => {
            setCandles(prev => prev.map((candle) => {
                // Extremely subtle movement - just +/- 0.5px
                const movement = (Math.random() - 0.5) * 0.8;
                const newClose = Math.max(
                    candle.high + 8,
                    Math.min(candle.low - 8, candle.close + movement)
                );

                return {
                    ...candle,
                    close: newClose,
                    bull: newClose < candle.open,
                };
            }));
        }, 2500); // Update every 2.5 seconds

        return () => clearInterval(interval);
    }, [isVisible, scrollProgress]);

    // Setup scroll-triggered animations
    useEffect(() => {
        if (!chartRef.current || !svgRef.current) return;

        const ctx = gsap.context(() => {
            // Main visibility trigger
            ScrollTrigger.create({
                trigger: chartRef.current,
                start: "top 95%",
                end: "bottom 5%",
                onEnter: () => setIsVisible(true),
                onLeave: () => setIsVisible(false),
                onEnterBack: () => setIsVisible(true),
                onLeaveBack: () => setIsVisible(false),
            });

            // Scroll progress for intensity
            ScrollTrigger.create({
                trigger: chartRef.current,
                start: "top 100%",
                end: "bottom 0%",
                scrub: true,
                onUpdate: (self) => {
                    setScrollProgress(Math.min(1, self.progress * 2));
                },
            });

            // Animate the entire chart opacity and scale - immediate on load
            gsap.fromTo(
                svgRef.current,
                {
                    opacity: 0,
                    scale: 0.95,
                    y: 30,
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 1.5,
                    delay: 0.3,
                    ease: "power2.out",
                }
            );

            // Animate the price line drawing - with small delay
            if (lineRef.current) {
                const lineLength = lineRef.current.getTotalLength?.() || 2000;
                gsap.set(lineRef.current, {
                    strokeDasharray: lineLength,
                    strokeDashoffset: lineLength,
                });
                gsap.to(lineRef.current, {
                    strokeDashoffset: 0,
                    duration: 2.5,
                    delay: 0.5,
                    ease: "power1.inOut",
                });
            }

            // Animate each candle individually with stagger
            const candleElements = candlesGroupRef.current?.querySelectorAll(".candle-group");
            if (candleElements) {
                gsap.fromTo(
                    candleElements,
                    {
                        opacity: 0,
                        scaleY: 0,
                        y: 20,
                    },
                    {
                        opacity: 1,
                        scaleY: 1,
                        y: 0,
                        duration: 0.6,
                        delay: 0.4,
                        stagger: 0.06,
                        ease: "power2.out",
                    }
                );
            }
        }, chartRef);

        return () => ctx.revert();
    }, []);

    // Generate smooth path for price line
    const generateLinePath = () => {
        if (candles.length === 0) return "";
        const points = candles.map(c => ({ x: c.x, y: (c.open + c.close) / 2 }));

        // Create smooth curve using quadratic bezier
        let path = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const cpX = (prev.x + curr.x) / 2;
            path += ` Q ${cpX} ${prev.y} ${cpX} ${(prev.y + curr.y) / 2}`;
            if (i === points.length - 1) {
                path += ` T ${curr.x} ${curr.y}`;
            }
        }
        return path;
    };

    // Generate area path
    const generateAreaPath = () => {
        const linePath = generateLinePath();
        if (!linePath) return "";
        return `${linePath} L 1200 280 L 0 280 Z`;
    };

    // Calculate opacity based on scroll progress
    const candleOpacity = 0.15 + scrollProgress * 0.35;
    const lineOpacity = 0.1 + scrollProgress * 0.25;
    const glowIntensity = scrollProgress * 3;

    return (
        <div
            ref={chartRef}
            className="absolute top-0 left-0 right-0 h-[400px] overflow-hidden pointer-events-none z-[5]"
        >
            <svg
                ref={svgRef}
                viewBox="0 0 1200 300"
                className="w-full h-full"
                preserveAspectRatio="xMidYMax slice"
                style={{ opacity: 0 }}
            >
                {/* Definitions */}
                <defs>
                    <pattern id="chartGrid" width="60" height="40" patternUnits="userSpaceOnUse">
                        <path
                            d="M 60 0 L 0 0 0 40"
                            fill="none"
                            stroke={`rgba(255,255,255,${0.02 + scrollProgress * 0.02})`}
                            strokeWidth="1"
                        />
                    </pattern>
                    <linearGradient id="chartAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={`rgba(251,191,36,${0.03 + scrollProgress * 0.05})`} />
                        <stop offset="100%" stopColor="rgba(251,191,36,0)" />
                    </linearGradient>
                    <linearGradient id="chartLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={`rgba(251,191,36,${lineOpacity})`} />
                        <stop offset="50%" stopColor={`rgba(255,255,255,${lineOpacity * 0.8})`} />
                        <stop offset="100%" stopColor={`rgba(251,191,36,${lineOpacity})`} />
                    </linearGradient>
                    <filter id="candleGlow">
                        <feGaussianBlur stdDeviation={glowIntensity} result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Background grid */}
                <rect width="100%" height="100%" fill="url(#chartGrid)" />

                {/* Horizontal price levels */}
                {[100, 150, 200, 250].map((y, i) => (
                    <line
                        key={i}
                        x1="0"
                        y1={y}
                        x2="1200"
                        y2={y}
                        stroke={`rgba(255,255,255,${0.02 + scrollProgress * 0.02})`}
                        strokeWidth="1"
                        strokeDasharray="4,8"
                    />
                ))}

                {/* Area fill under line */}
                <path
                    d={generateAreaPath()}
                    fill="url(#chartAreaGradient)"
                    className="transition-all duration-1000"
                />

                {/* Main price line */}
                <path
                    ref={lineRef}
                    d={generateLinePath()}
                    fill="none"
                    stroke="url(#chartLineGradient)"
                    strokeWidth={1.5 + scrollProgress}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-1000"
                />

                {/* Candlesticks */}
                <g ref={candlesGroupRef}>
                    {candles.map((candle, i) => {
                        const bodyTop = Math.min(candle.open, candle.close);
                        const bodyHeight = Math.max(4, Math.abs(candle.close - candle.open));
                        const color = candle.bull ? "74,222,128" : "248,113,113";

                        return (
                            <g
                                key={i}
                                className="candle-group"
                                style={{
                                    transformOrigin: `${candle.x}px ${candle.low}px`,
                                    filter: scrollProgress > 0.5 ? `url(#candleGlow)` : 'none',
                                }}
                            >
                                {/* Wick */}
                                <line
                                    x1={candle.x}
                                    y1={candle.high}
                                    x2={candle.x}
                                    y2={candle.low}
                                    stroke={`rgba(${color},${candleOpacity * 0.6})`}
                                    strokeWidth="1"
                                    className="transition-all duration-1000"
                                />
                                {/* Body */}
                                <rect
                                    x={candle.x - 5}
                                    y={bodyTop}
                                    width="10"
                                    height={bodyHeight}
                                    fill={`rgba(${color},${candleOpacity})`}
                                    stroke={`rgba(${color},${candleOpacity + 0.15})`}
                                    strokeWidth="1"
                                    rx="1"
                                    className="transition-all duration-1000"
                                />
                            </g>
                        );
                    })}
                </g>

                {/* Live indicator - only when fully visible */}
                {isVisible && scrollProgress > 0.6 && (
                    <g className="animate-pulse" style={{ animationDuration: '3s' }}>
                        <circle cx="1150" cy="25" r="4" fill="rgba(34,197,94,0.8)" />
                        <text
                            x="1130"
                            y="29"
                            fill="rgba(255,255,255,0.4)"
                            fontSize="9"
                            fontFamily="monospace"
                            textAnchor="end"
                        >
                            LIVE
                        </text>
                    </g>
                )}
            </svg>

            {/* Blending gradients */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(to bottom, 
            transparent 0%, 
            rgba(0,0,0,${0.3 - scrollProgress * 0.1}) 40%, 
            rgba(0,0,0,${0.7 - scrollProgress * 0.15}) 70%, 
            rgba(0,0,0,1) 100%
          )`
                }}
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/70 via-transparent to-black/70" />
        </div>
    );
}
