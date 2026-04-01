// src/components/lien-predictor/GaugeChart.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import type { OverallRating } from '@/lib/lien-types';

interface GaugeChartProps {
  rating: OverallRating;
}

const RATING_CONFIG = {
  strong: { angle: 30 },
  moderate: { angle: 0 },
  at_risk: { angle: -30 },
} as const;

export default function GaugeChart({ rating }: GaugeChartProps) {
  const needleRef = useRef<SVGGElement>(null);
  const target = RATING_CONFIG[rating].angle;

  useEffect(() => {
    const el = needleRef.current;
    if (!el) return;

    // Set initial rotation via SVG transform attribute
    el.setAttribute('transform', 'rotate(-90, 100, 100)');

    // Animate using a proxy object — most reliable way to animate SVG transforms
    const proxy = { angle: -90 };
    gsap.to(proxy, {
      angle: target,
      duration: 1.6,
      delay: 0.5,
      ease: 'elastic.out(1, 0.55)',
      onUpdate: () => {
        el.setAttribute('transform', `rotate(${proxy.angle}, 100, 100)`);
      },
    });
  }, [target]);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-[150px] h-auto">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b2d3d" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
          <filter id="ndGlow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background arc */}
        <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="#2a2219" strokeWidth="14" strokeLinecap="round" />
        {/* Gradient arc */}
        <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="url(#gaugeGrad)" strokeWidth="14" strokeLinecap="round" opacity="0.25" />

        {/* Needle group — rotates around center (100, 100) */}
        <g ref={needleRef}>
          {/* Needle line */}
          <line x1="100" y1="100" x2="100" y2="30" stroke="#c5a869" strokeWidth="3" strokeLinecap="round" filter="url(#ndGlow)" />
          {/* Pointer tip (small triangle) */}
          <polygon points="95,35 105,35 100,20" fill="#c5a869" />
        </g>

        {/* Center dot */}
        <circle cx="100" cy="100" r="7" fill="#1a1510" stroke="#c5a869" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="3" fill="#c5a869" />

        {/* Labels */}
        <text x="10" y="118" fill="#faf6f0" fontSize="7" opacity="0.25" fontFamily="Inter, sans-serif">AT RISK</text>
        <text x="160" y="118" fill="#faf6f0" fontSize="7" opacity="0.25" fontFamily="Inter, sans-serif">STRONG</text>
      </svg>
    </div>
  );
}
