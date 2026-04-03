// src/components/lien-predictor/steps/ProjectStep.tsx
import type { WizardData, ProjectType } from '@/lib/lien-types';
import { OKLAHOMA_COUNTIES } from '@/lib/oklahoma-counties';
import StepCard from '../StepCard';

interface Props {
  data: WizardData;
  onUpdate: (partial: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: 'commercial', label: 'Commercial' },
  { value: 'residential_not_owner_occupied', label: 'Residential (not owner-occupied)' },
  { value: 'residential_owner_occupied', label: 'Residential (owner-occupied)' },
  { value: 'public', label: 'Public / Government' },
];

export default function ProjectStep({ data, onUpdate, onNext, onBack }: Props) {
  const canProceed = data.projectType !== null && data.county !== '' && data.contractValue !== null;

  return (
    <StepCard
      title="Project Details"
      subtitle="Tell us about the project to determine lien eligibility."
      onNext={onNext}
      onBack={onBack}
      canProceed={canProceed}
    >
      <div className="space-y-6">
        {/* Project Type */}
        <div>
          <label className="text-gq-gold text-xs font-semibold tracking-widest uppercase block mb-3">Project Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROJECT_TYPES.map((pt) => (
              <button
                key={pt.value}
                onClick={() => onUpdate({ projectType: pt.value })}
                className={`p-3 rounded-lg border text-left text-sm transition-all ${
                  data.projectType === pt.value
                    ? 'border-gq-gold bg-gq-gold/8 text-gq-light'
                    : 'border-gq-gold/10 text-gq-light/60 hover:border-gq-gold/30'
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>
        </div>

        {/* County */}
        <div>
          <label className="text-gq-gold text-xs font-semibold tracking-widest uppercase block mb-3">County</label>
          <select
            value={data.county}
            onChange={(e) => onUpdate({ county: e.target.value })}
            className="w-full bg-gq-dark border border-gq-gold/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-gq-gold/50"
          >
            <option value="">Select county</option>
            {OKLAHOMA_COUNTIES.map((c) => (
              <option key={c} value={c}>{c} County</option>
            ))}
          </select>
        </div>

        {/* Contract Value */}
        <div>
          <label className="text-gq-gold text-xs font-semibold tracking-widest uppercase block mb-3">Contract / PO Value</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gq-light/40 text-sm">$</span>
            <input
              type="number"
              value={data.contractValue ?? ''}
              onChange={(e) => onUpdate({ contractValue: e.target.value ? Number(e.target.value) : null })}
              placeholder="0"
              className="w-full bg-gq-dark border border-gq-gold/20 rounded-lg pl-8 pr-4 py-3 text-gq-light text-sm focus:outline-none focus:border-gq-gold/50"
            />
          </div>
        </div>
      </div>
    </StepCard>
  );
}
