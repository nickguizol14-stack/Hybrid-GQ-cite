// src/components/lien-predictor/ResultsView.tsx
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Phone } from 'lucide-react';
import type { AssessmentResult } from '@/lib/lien-types';
import GaugeChart from './GaugeChart';

interface Props {
  result: AssessmentResult;
  onSaveShare: () => void;
}

const RATING_LABELS = {
  strong: { text: 'Strong', color: 'text-[#4ade80]', bg: 'bg-[#4ade80]' },
  moderate: { text: 'Moderate', color: 'text-[#eab308]', bg: 'bg-[#eab308]' },
  at_risk: { text: 'At Risk', color: 'text-[#ef4444]', bg: 'bg-[#ef4444]' },
} as const;

const SCORE_STYLES = {
  pass: { dot: 'bg-[#4ade80]', text: 'text-[#4ade80]', bg: 'bg-[#4ade80]/5' },
  warn: { dot: 'bg-[#eab308]', text: 'text-[#eab308]', bg: 'bg-[#eab308]/5' },
  fail: { dot: 'bg-[#ef4444]', text: 'text-[#ef4444]', bg: 'bg-[#ef4444]/5' },
} as const;

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } },
  item: { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } },
};

export default function ResultsView({ result, onSaveShare }: Props) {
  const rating = RATING_LABELS[result.overallRating];
  const deadlineDate = format(new Date(result.filingDeadline), 'MMM d, yyyy');

  return (
    <motion.div
      variants={stagger.container}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {/* Top: Gauge + Rating + Key Metrics in one card */}
      <motion.div
        variants={stagger.item}
        className="bg-[#2a2219] border border-[#C5A869]/10 rounded-2xl p-5 sm:p-7 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A869] to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-center">
          {/* Left: Gauge + verdict */}
          <div className="flex flex-col items-center md:items-center md:pr-6 md:border-r md:border-[#C5A869]/10">
            <GaugeChart rating={result.overallRating} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.4, type: 'spring' }}
              className="text-center mt-1"
            >
              <div className={`font-serif text-3xl font-semibold ${rating.color}`}>{rating.text}</div>
              <p className="text-gq-light/35 text-xs mt-0.5">{result.factorsPassed} of {result.factors.length} factors favorable</p>
            </motion.div>
          </div>

          {/* Right: Key metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#1a1510]/60 rounded-xl p-4">
              <p className="text-[#C5A869] text-[9px] tracking-[2px] uppercase font-semibold mb-1">Days to File</p>
              <span className={`font-serif text-3xl font-semibold block ${result.daysRemaining <= 14 ? 'text-[#ef4444]' : result.daysRemaining <= 29 ? 'text-[#eab308]' : 'text-gq-light'}`}>
                {Math.max(0, result.daysRemaining)}
              </span>
              <p className="text-gq-light/30 text-[10px] mt-0.5">{deadlineDate}</p>
            </div>
            <div className="bg-[#1a1510]/60 rounded-xl p-4">
              <p className="text-[#C5A869] text-[9px] tracking-[2px] uppercase font-semibold mb-1">Claim Amount</p>
              <span className="font-serif text-3xl font-semibold text-gq-light block">
                ${result.outstandingAmount >= 1000 ? `${Math.round(result.outstandingAmount / 1000)}K` : result.outstandingAmount.toLocaleString()}
              </span>
              <p className="text-gq-light/30 text-[10px] mt-0.5">Outstanding</p>
            </div>
            {/* Filing window bar spanning both columns */}
            <div className="col-span-2 bg-[#1a1510]/60 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-gq-light/50 text-[10px]">Filing window</span>
                  <span className="text-gq-light/70 text-[10px] font-medium">{result.windowElapsedPercent}% elapsed</span>
                </div>
                <div className="w-full h-1.5 bg-[#333] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.windowElapsedPercent}%` }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-[#4ade80] to-[#eab308]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Factor Analysis */}
      <motion.div variants={stagger.item}>
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-serif text-lg text-gq-light font-medium">Factor Analysis</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#C5A869]/15 to-transparent" />
          <span className="text-gq-light/20 text-[10px] italic">42 O.S. Sections 141-153</span>
        </div>

        <div className="bg-[#2a2219] border border-[#C5A869]/10 rounded-2xl overflow-hidden divide-y divide-[#C5A869]/5">
          {result.factors.map((factor, i) => {
            const style = SCORE_STYLES[factor.score];
            return (
              <motion.div
                key={factor.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
                className={`flex items-center gap-4 px-5 py-3.5 ${style.bg}`}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${style.dot}`} />
                <span className="text-gq-light text-sm font-medium flex-1">{factor.name}</span>
                <span className={`text-[10px] font-bold tracking-wider uppercase ${style.text}`}>{factor.statusLabel}</span>
                <span className="text-gq-light/15 text-[9px] hidden sm:block w-28 text-right">{factor.statute}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={stagger.item}
        className="relative rounded-2xl overflow-hidden"
      >
        {/* Background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9b2d3d]/20 via-[#2a2219] to-[#2a2219]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9b2d3d]/40 to-transparent" />

        <div className="relative p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-serif text-xl sm:text-2xl text-gq-light font-medium mb-1">Ready to Protect Your Rights?</h3>
            <p className="text-gq-light/45 text-xs sm:text-sm leading-relaxed">Share this assessment with Gary Quinnett's team. He'll review your specific situation and advise on the strongest path to recovery.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="tel:405-607-2266" className="w-11 h-11 rounded-xl bg-[#C5A869]/10 flex items-center justify-center text-[#C5A869] hover:bg-[#C5A869]/20 transition-colors">
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={onSaveShare}
              className="bg-gradient-to-r from-[#7A232F] via-[#9B2D3D] to-[#B03A4A] text-white h-11 px-6 rounded-xl text-xs font-bold tracking-widest uppercase whitespace-nowrap hover:brightness-110 transition-all"
            >
              Share With Gary
            </button>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.p
        variants={stagger.item}
        className="text-center text-gq-light/15 text-[9px] leading-relaxed px-6"
      >
        Educational purposes only. Not legal advice. Based on Oklahoma Title 42, Sections 141-153. Consult an attorney for guidance specific to your situation.
      </motion.p>
    </motion.div>
  );
}
