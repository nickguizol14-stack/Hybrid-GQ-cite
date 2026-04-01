// src/components/lien-predictor/ResultsView.tsx
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

const SCORE_COLORS = {
  pass: { border: 'border-l-[#4ade80]', icon: 'bg-[#4ade80]/10 text-[#4ade80]', status: 'text-[#4ade80]' },
  warn: { border: 'border-l-[#eab308]', icon: 'bg-[#eab308]/10 text-[#eab308]', status: 'text-[#eab308]' },
  fail: { border: 'border-l-[#ef4444]', icon: 'bg-[#ef4444]/10 text-[#ef4444]', status: 'text-[#ef4444]' },
} as const;

export default function ResultsView({ result, onSaveShare }: Props) {
  const ratingLabel = RATING_LABELS[result.overallRating];
  const deadlineFormatted = format(new Date(result.filingDeadline), 'MMM d, yyyy');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <p className="text-[#C5A869] text-[9px] tracking-[4px] uppercase font-semibold mb-2">Lien Claim Assessment</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-gq-light font-medium">Your Claim Analysis</h1>
        <p className="text-gq-light/30 text-xs mt-1">Oklahoma Title 42, Sections 141-153</p>
      </div>

      {/* Top Section: Gauge + Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gauge Card */}
        <div className="bg-[#2a2219] border border-[#C5A869]/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A869] to-transparent" />
          <GaugeChart rating={result.overallRating} />
          <div className={`font-serif text-4xl font-semibold mt-2 ${ratingLabel.color}`}>{ratingLabel.text}</div>
          <p className="text-gq-light/40 text-sm mt-1">{result.factorsPassed} of {result.factors.length} factors favorable</p>
        </div>

        {/* Metrics */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#2a2219] border border-[#C5A869]/8 rounded-xl p-5 flex items-center justify-between flex-1">
            <div>
              <p className="text-[#C5A869] text-[9px] tracking-[2px] uppercase font-semibold">Days to File</p>
              <p className="text-gq-light/40 text-xs mt-0.5">Deadline: {deadlineFormatted}</p>
            </div>
            <span className={`font-serif text-3xl font-semibold ${result.daysRemaining <= 14 ? 'text-[#ef4444]' : result.daysRemaining <= 29 ? 'text-[#eab308]' : 'text-[#eab308]'}`}>
              {Math.max(0, result.daysRemaining)}
            </span>
          </div>
          <div className="bg-[#2a2219] border border-[#C5A869]/8 rounded-xl p-5 flex items-center justify-between flex-1">
            <div>
              <p className="text-[#C5A869] text-[9px] tracking-[2px] uppercase font-semibold">Claim Amount</p>
              <p className="text-gq-light/40 text-xs mt-0.5">Outstanding balance</p>
            </div>
            <span className="font-serif text-3xl font-semibold text-gq-light">
              ${result.outstandingAmount.toLocaleString()}
            </span>
          </div>
          {/* Deadline progress */}
          <div className="bg-[#2a2219] border border-[#C5A869]/8 rounded-xl p-4 flex items-center gap-4">
            <span className="text-lg">&#9201;</span>
            <div className="flex-1">
              <p className="text-gq-light text-sm font-medium">{result.windowElapsedPercent}% of filing window elapsed</p>
            </div>
            <div className="w-24 h-1.5 bg-[#333] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#4ade80] to-[#eab308]"
                style={{ width: `${result.windowElapsedPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Factor Analysis */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-serif text-xl text-gq-light font-medium whitespace-nowrap">Factor Analysis</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#C5A869]/20 to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.factors.map((factor) => {
            const colors = SCORE_COLORS[factor.score];
            return (
              <div key={factor.id} className={`bg-[#2a2219] rounded-xl p-4 border-l-[3px] ${colors.border} flex gap-3`}>
                <div className={`w-7 h-7 rounded-md flex items-center justify-center text-xs flex-shrink-0 ${colors.icon}`}>
                  {factor.score === 'pass' ? '✓' : factor.score === 'warn' ? '!' : '✕'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gq-light text-sm font-semibold">{factor.name}</span>
                    <span className={`text-[9px] font-bold tracking-wider uppercase ${colors.status}`}>{factor.statusLabel}</span>
                  </div>
                  <p className="text-gq-light/45 text-xs leading-relaxed mt-1">{factor.description}</p>
                  <p className="text-gq-light/20 text-[10px] italic mt-1">{factor.statute}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#9b2d3d]/10 to-[#2a2219]/60 border border-[#9b2d3d]/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="font-serif text-2xl text-gq-light font-medium mb-2">Ready to Protect Your Rights?</h3>
          <p className="text-gq-light/50 text-sm leading-relaxed">Share this assessment with Gary Quinnett's team. He'll review your specific situation and advise on the strongest path to recovery.</p>
        </div>
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <button
            onClick={onSaveShare}
            className="bg-gradient-to-r from-[#7A232F] via-[#9B2D3D] to-[#B03A4A] text-white px-7 py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase whitespace-nowrap hover:scale-[1.02] transition-transform"
          >
            Save & Share With Gary
          </button>
          <a href="tel:405-607-2266" className="text-gq-light/35 text-xs hover:text-gq-light/60 transition-colors">(405) 607-2266</a>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-gq-light/20 text-[9px] leading-relaxed px-8 pt-4 border-t border-[#C5A869]/5">
        This assessment is for educational purposes only and does not constitute legal advice. Every situation has unique facts that may affect your rights under Oklahoma law. Consult an attorney for advice specific to your situation.
      </p>
    </div>
  );
}
