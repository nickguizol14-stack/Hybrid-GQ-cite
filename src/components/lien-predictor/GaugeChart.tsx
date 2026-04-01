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
  const dotRef = useRef<SVGCircleElement>(null);
  const target = RATING_CONFIG[rating].angle;

  useEffect(() => {
    if (!needleRef.current || !dotRef.current) return;

    // Animate needle from far left to target
    gsap.fromTo(
      needleRef.current,
      { rotation: -90, transformOrigin: '100px 100px' },
      { rotation: target, transformOrigin: '100px 100px', duration: 1.4, delay: 0.4, ease: 'elastic.out(1, 0.6)' }
    );

    // Pop in the center dot
    gsap.fromTo(
      dotRef.current,
      { scale: 0, transformOrigin: '100px 100px' },
      { scale: 1, duration: 0.4, delay: 0.6, ease: 'back.out(3)' }
    );
  }, [target]);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 115" className="w-[150px] h-auto">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b2d3d" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
          <filter id="ndGlow">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Background arc */}
        <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="#2a2219" strokeWidth="12" strokeLinecap="round" />
        {/* Gradient arc */}
        <path d="M 15 100 A 85 85 0 0 1 185 100" fill="none" stroke="url(#gaugeGrad)" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
        {/* Needle */}
        <g ref={needleRef} style={{ transformOrigin: '100px 100px' }}>
          <line x1="100" y1="100" x2="100" y2="25" stroke="#c5a869" strokeWidth="2.5" strokeLinecap="round" filter="url(#ndGlow)" />
        </g>
        {/* Center dot */}
        <circle ref={dotRef} cx="100" cy="100" r="5" fill="#c5a869" />
        {/* Labels */}
        <text x="12" y="113" fill="#faf6f0" fontSize="7" opacity="0.25" fontFamily="Inter, sans-serif">AT RISK</text>
        <text x="162" y="113" fill="#faf6f0" fontSize="7" opacity="0.25" fontFamily="Inter, sans-serif">STRONG</text>
      </svg>
    </div>
  );
}
