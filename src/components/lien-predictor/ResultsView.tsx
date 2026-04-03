// src/components/lien-predictor/ResultsView.tsx
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import type { AssessmentResult } from '@/lib/lien-types';
import GaugeChart from './GaugeChart';

interface Props {
  result: AssessmentResult;
  onSaveShare: () => void;
}

const RATING_LABELS = {
  strong: { text: 'Strong', color: 'text-[#4ade80]' },
  moderate: { text: 'Moderate', color: 'text-[#eab308]' },
  at_risk: { text: 'At Risk', color: 'text-[#ef4444]' },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.25, duration: 0.7, ease: [0.4, 0, 0.2, 1] as const } }),
};

export default function ResultsView({ result, onSaveShare }: Props) {
  const rating = RATING_LABELS[result.overallRating];
  const deadlineDate = format(new Date(result.filingDeadline), 'MMMM d, yyyy');
  return (
    <motion.div initial="hidden" animate="visible" className="space-y-4">

      {/* Gauge + Verdict + Metrics — single card */}
      <motion.div variants={fadeUp} custom={0} className="bg-gq-dark-warm border border-gq-gold/10 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gq-gold/40 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] divide-y md:divide-y-0 md:divide-x divide-gq-gold/8">
          {/* Gauge side */}
          <div className="flex flex-col items-center justify-center p-5 sm:p-6">
            <GaugeChart rating={result.overallRating} />
            <div className={`font-serif text-2xl font-semibold mt-1 ${rating.color}`}>{rating.text}</div>
            <p className="text-gq-light/60 text-[10px] tracking-wide mt-0.5">{result.factorsPassed} of {result.factors.length} factors met</p>
          </div>

          {/* Metrics side */}
          <div className="p-5 sm:p-6 grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="text-gq-light/65 text-[10px] tracking-wider uppercase mb-1">Filing Deadline</p>
              <p className="text-gq-light font-serif text-lg font-medium">{deadlineDate}</p>
              <p className={`text-xs font-medium mt-0.5 ${result.daysRemaining <= 14 ? 'text-[#ef4444]' : result.daysRemaining <= 29 ? 'text-[#eab308]' : 'text-[#4ade80]'}`}>
                {result.daysRemaining > 0 ? `${result.daysRemaining} days remaining` : 'Deadline passed'}
              </p>
            </div>
            <div>
              <p className="text-gq-light/65 text-[10px] tracking-wider uppercase mb-1">Outstanding Amount</p>
              <p className="text-gq-light font-serif text-lg font-medium">${result.outstandingAmount.toLocaleString()}</p>
              <p className="text-gq-light/60 text-xs mt-0.5">Owed to claimant</p>
            </div>
            <div className="col-span-2">
              <div className="flex items-center justify-between text-[10px] text-gq-light/65 mb-1.5">
                <span>Filing window: {result.windowElapsedPercent}% elapsed</span>
                <span>{deadlineDate}</span>
              </div>
              <div className="w-full h-1.5 bg-gq-dark rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.windowElapsedPercent}%` }}
                  transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#4ade80] to-[#eab308]"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Factor Analysis — clean, factual table */}
      <motion.div variants={fadeUp} custom={1} className="bg-gq-dark-warm border border-gq-gold/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gq-gold/8 flex items-center justify-between">
          <h2 className="font-serif text-base text-gq-light font-medium">Statutory Compliance</h2>
          <span className="text-gq-light/20 text-[9px] tracking-wide">Oklahoma Title 42</span>
        </div>

        <table className="w-full">
          <tbody>
            {result.factors.map((factor, i) => {
              const isPassing = factor.score === 'pass';
              const isWarning = factor.score === 'warn';
              return (
                <motion.tr
                  key={factor.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.15, duration: 0.4 }}
                  className="border-b border-gq-gold/5 last:border-0"
                >
                  <td className="pl-5 py-3 w-8">
                    <span className={`text-sm ${isPassing ? 'text-[#4ade80]' : isWarning ? 'text-[#eab308]' : 'text-[#ef4444]'}`}>
                      {isPassing ? '✓' : isWarning ? '!' : '✕'}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-gq-light text-sm">{factor.name}</span>
                  </td>
                  <td className="py-3 text-right">
                    <span className={`text-xs font-medium ${isPassing ? 'text-[#4ade80]' : isWarning ? 'text-[#eab308]' : 'text-[#ef4444]'}`}>
                      {factor.statusLabel}
                    </span>
                  </td>
                  <td className="py-3 pr-5 text-right hidden sm:table-cell">
                    <span className="text-gq-light/15 text-[9px]">{factor.statute}</span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>

        {/* Expandable detail — show descriptions below table */}
        <div className="px-5 py-3 border-t border-gq-gold/8 space-y-2">
          {result.factors.filter(f => f.score !== 'pass').map((factor) => (
            <p key={factor.id} className="text-gq-light/65 text-xs leading-relaxed">
              <span className="text-gq-light/60 font-medium">{factor.name}:</span> {factor.description}
            </p>
          ))}
          {result.factors.every(f => f.score === 'pass') && (
            <p className="text-gq-light/65 text-xs">All statutory requirements appear to be met. A consultation can confirm the specifics of your claim.</p>
          )}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div variants={fadeUp} custom={2} className="bg-gq-dark-warm border border-gq-gold/10 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-serif text-xl text-gq-light font-medium mb-1">Ready to Protect Your Rights?</h3>
            <p className="text-gq-light/65 text-sm leading-relaxed">Share this assessment with Gary Quinnett's team. He'll review your specific situation and advise on the strongest path to recovery.</p>
          </div>
          <div className="flex flex-col items-center gap-2 flex-shrink-0">
            <button
              onClick={onSaveShare}
              className="bg-gradient-to-r from-gq-burgundy via-gq-burgundy to-gq-burgundy text-white h-11 px-7 rounded-lg text-xs font-bold tracking-widest uppercase whitespace-nowrap hover:brightness-110 transition-all"
            >
              Share With Gary
            </button>
            <a href="tel:405-607-2266" className="text-gq-light/60 text-xs hover:text-gq-gold transition-colors">(405) 607-2266</a>
          </div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.p variants={fadeUp} custom={3} className="text-center text-gq-light/15 text-[9px] leading-relaxed px-6">
        Educational purposes only. Not legal advice. Based on Oklahoma Title 42, Sections 141-153. Consult an attorney for guidance specific to your situation.
      </motion.p>
    </motion.div>
  );
}
