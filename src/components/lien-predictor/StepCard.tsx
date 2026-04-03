// src/components/lien-predictor/StepCard.tsx
import type { ReactNode } from 'react';

interface StepCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  onNext: () => void;
  canProceed: boolean;
  onBack?: () => void;
}

export default function StepCard({ title, subtitle, children, onNext, canProceed, onBack }: StepCardProps) {
  return (
    <div className="bg-gq-dark-warm border border-gq-gold/15 rounded-2xl p-5 sm:p-6 lg:p-8">
      <h2 className="font-serif text-xl sm:text-2xl text-gq-light font-medium mb-0.5">{title}</h2>
      <p className="text-gq-light/65 text-xs sm:text-sm mb-5">{subtitle}</p>
      {children}
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-gq-gold/10">
        {onBack ? (
          <button onClick={onBack} className="text-gq-light/70 hover:text-gq-light text-sm transition-colors">
            Back
          </button>
        ) : <div />}
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-[#9b2d3d] hover:bg-[#b03a4a] disabled:opacity-30 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
