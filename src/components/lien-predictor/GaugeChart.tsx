// src/components/lien-predictor/GaugeChart.tsx
import { motion } from 'framer-motion';
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

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 115" className="w-[160px] h-auto">
        {/* Background arc */}
        <path
          d="M 15 100 A 85 85 0 0 1 185 100"
          fill="none"
          stroke="#2a2219"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Gradient arc */}
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b2d3d" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
          <filter id="needleGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M 15 100 A 85 85 0 0 1 185 100"
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          opacity="0.3"
        />
        {/* Animated needle */}
        <motion.g
          initial={{ rotate: -90 }}
          animate={{ rotate: config.angle }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ originX: '100px', originY: '100px', transformOrigin: '100px 100px' }}
        >
          <line
            x1="100" y1="100" x2="100" y2="25"
            stroke="#c5a869"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#needleGlow)"
          />
        </motion.g>
        {/* Center dot */}
        <motion.circle
          cx="100" cy="100" r="5"
          fill="#c5a869"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
        />
        {/* Labels */}
        <text x="12" y="113" fill="#faf6f0" fontSize="7" opacity="0.25" fontFamily="Inter, sans-serif" letterSpacing="0.5">AT RISK</text>
        <text x="162" y="113" fill="#faf6f0" fontSize="7" opacity="0.25" fontFamily="Inter, sans-serif" letterSpacing="0.5">STRONG</text>
      </svg>
    </div>
  );
}
