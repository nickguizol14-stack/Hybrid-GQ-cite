// src/components/lien-predictor/GaugeChart.tsx
import type { OverallRating } from '@/lib/lien-types';

interface GaugeChartProps {
  rating: OverallRating;
}

const RATING_CONFIG = {
  strong: { angle: 30, color: '#4ade80' },
  moderate: { angle: 0, color: '#eab308' },
  at_risk: { angle: -30, color: '#ef4444' },
} as const;

export default function GaugeChart({ rating }: GaugeChartProps) {
  const config = RATING_CONFIG[rating];

  // Needle rotation: -30deg (left/at_risk) to +30deg (right/strong)
  // SVG centered at bottom of semicircle
  const needleAngle = config.angle;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 110" className="w-[180px] h-auto">
        {/* Background arc */}
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="#2a2219"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Gradient arc */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b2d3d" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.25"
        />
        {/* Needle */}
        <g transform={`rotate(${needleAngle}, 100, 100)`}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="22"
            stroke="#c5a869"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>
        {/* Center dot */}
        <circle cx="100" cy="100" r="6" fill="#c5a869" />
        <circle cx="100" cy="100" r="6" fill="#c5a869" filter="url(#glow)" />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Labels */}
        <text x="16" y="108" fill="#faf6f0" fontSize="7" opacity="0.3" fontFamily="Inter, sans-serif">AT RISK</text>
        <text x="80" y="108" fill="#faf6f0" fontSize="7" opacity="0.3" fontFamily="Inter, sans-serif">MODERATE</text>
        <text x="162" y="108" fill="#faf6f0" fontSize="7" opacity="0.3" fontFamily="Inter, sans-serif">STRONG</text>
      </svg>
    </div>
  );
}
