// src/components/lien-predictor/steps/RoleStep.tsx
import type { WizardData, ClaimantRole } from '@/lib/lien-types';
import StepCard from '../StepCard';

interface Props {
  data: WizardData;
  onUpdate: (partial: Partial<WizardData>) => void;
  onNext: () => void;
}

const ROLES: { value: ClaimantRole; label: string; desc: string }[] = [
  { value: 'general_contractor', label: 'General Contractor', desc: 'Direct contract with the property owner' },
  { value: 'subcontractor', label: 'Subcontractor', desc: 'Contract with the GC or another sub' },
  { value: 'material_supplier', label: 'Material Supplier', desc: 'Furnished materials to the project' },
  { value: 'laborer', label: 'Laborer', desc: 'Performed labor on the project' },
  { value: 'design_professional', label: 'Design Professional', desc: 'Architect, engineer, or surveyor' },
  { value: 'equipment_rental', label: 'Equipment Rental', desc: 'Leased or rented equipment to the project' },
];

export default function RoleStep({ data, onUpdate, onNext }: Props) {
  return (
    <StepCard
      title="Your Role"
      subtitle="This determines your notice requirements and filing deadlines under Oklahoma law."
      onNext={onNext}
      canProceed={data.role !== null}
    >
      <div className="flex flex-col gap-3">
        {ROLES.map((role) => (
          <button
            key={role.value}
            onClick={() => onUpdate({ role: role.value })}
            className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
              data.role === role.value
                ? 'border-[#C5A869] bg-[#C5A869]/8'
                : 'border-[#C5A869]/10 hover:border-[#C5A869]/30'
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              data.role === role.value ? 'border-[#C5A869]' : 'border-[#555]'
            }`}>
              {data.role === role.value && <div className="w-2.5 h-2.5 rounded-full bg-[#C5A869]" />}
            </div>
            <div>
              <div className="text-gq-light font-medium text-sm">{role.label}</div>
              <div className="text-gq-light/40 text-xs mt-0.5">{role.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </StepCard>
  );
}
