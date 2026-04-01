// src/components/lien-predictor/StepCard.tsx
import { ReactNode } from 'react';

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
    <div className="bg-[#2a2219] border border-[#C5A869]/15 rounded-2xl p-6 sm:p-8 lg:p-10">
      <h2 className="font-serif text-2xl sm:text-3xl text-gq-light font-medium mb-1">{title}</h2>
      <p className="text-gq-light/40 text-sm mb-8">{subtitle}</p>
      {children}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#C5A869]/10">
        {onBack ? (
          <button onClick={onBack} className="text-gq-light/50 hover:text-gq-light text-sm transition-colors">
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
