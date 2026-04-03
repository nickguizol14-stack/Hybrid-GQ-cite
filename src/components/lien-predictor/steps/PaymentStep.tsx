// src/components/lien-predictor/steps/PaymentStep.tsx
import type { WizardData } from '@/lib/lien-types';
import StepCard from '../StepCard';

interface Props {
  data: WizardData;
  onUpdate: (partial: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function PaymentStep({ data, onUpdate, onNext, onBack }: Props) {
  const canProceed = data.totalAmount !== null && data.amountPaid !== null && data.lastWorkDate !== '';

  return (
    <StepCard
      title="Payment Status"
      subtitle="This establishes your claim amount and filing timeline."
      onNext={onNext}
      onBack={onBack}
      canProceed={canProceed}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gq-gold text-xs font-semibold tracking-widest uppercase block mb-3">Total Contract Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gq-light/65 text-sm">$</span>
              <input
                type="number"
                value={data.totalAmount ?? ''}
                onChange={(e) => onUpdate({ totalAmount: e.target.value ? Number(e.target.value) : null })}
                placeholder="0"
                className="w-full bg-gq-dark border border-gq-gold/20 rounded-lg pl-8 pr-4 py-3 text-gq-light text-sm focus:outline-none focus:border-gq-gold/50"
              />
            </div>
          </div>
          <div>
            <label className="text-gq-gold text-xs font-semibold tracking-widest uppercase block mb-3">Amount Paid to Date</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gq-light/65 text-sm">$</span>
              <input
                type="number"
                value={data.amountPaid ?? ''}
                onChange={(e) => onUpdate({ amountPaid: e.target.value ? Number(e.target.value) : null })}
                placeholder="0"
                className="w-full bg-gq-dark border border-gq-gold/20 rounded-lg pl-8 pr-4 py-3 text-gq-light text-sm focus:outline-none focus:border-gq-gold/50"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-gq-gold text-xs font-semibold tracking-widest uppercase block mb-3">Last Date of Work or Materials Delivered</label>
          <input
            type="date"
            value={data.lastWorkDate}
            onChange={(e) => onUpdate({ lastWorkDate: e.target.value })}
            className="w-full bg-gq-dark border border-gq-gold/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-gq-gold/50"
          />
        </div>

        {data.totalAmount !== null && data.amountPaid !== null && (
          <div className="bg-gq-dark border border-gq-gold/10 rounded-lg p-4 flex items-center justify-between">
            <span className="text-gq-light/70 text-sm">Outstanding Balance</span>
            <span className="text-gq-light font-serif text-xl font-medium">
              ${(Math.max(0, (data.totalAmount ?? 0) - (data.amountPaid ?? 0))).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </StepCard>
  );
}
