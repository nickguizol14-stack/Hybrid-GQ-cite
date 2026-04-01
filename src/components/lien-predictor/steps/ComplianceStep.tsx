// src/components/lien-predictor/steps/ComplianceStep.tsx
import type { WizardData, NoticeStatus, WaiverStatus } from '@/lib/lien-types';
import StepCard from '../StepCard';

interface Props {
  data: WizardData;
  onUpdate: (partial: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ComplianceStep({ data, onUpdate, onNext, onBack }: Props) {
  const isGC = data.role === 'general_contractor';
  const canProceed = data.writtenContract !== null && data.lienWaivers !== null &&
    (isGC || data.preLienNoticeSent !== null);

  return (
    <StepCard
      title="Notice and Compliance"
      subtitle="These procedural requirements determine whether your lien is enforceable."
      onNext={onNext}
      onBack={onBack}
      canProceed={canProceed}
    >
      <div className="space-y-8">
        {/* Pre-Lien Notice (not shown for GCs) */}
        {!isGC && (
          <div>
            <label className="text-[#C5A869] text-xs font-semibold tracking-widest uppercase block mb-3">Did you send a pre-lien notice?</label>
            <div className="flex gap-3">
              {(['yes', 'no', 'not_sure'] as NoticeStatus[]).map((val) => (
                <button
                  key={val}
                  onClick={() => onUpdate({ preLienNoticeSent: val })}
                  className={`flex-1 p-3 rounded-lg border text-sm text-center transition-all ${
                    data.preLienNoticeSent === val
                      ? 'border-[#C5A869] bg-[#C5A869]/8 text-gq-light'
                      : 'border-[#C5A869]/10 text-gq-light/60 hover:border-[#C5A869]/30'
                  }`}
                >
                  {val === 'yes' ? 'Yes' : val === 'no' ? 'No' : 'Not Sure'}
                </button>
              ))}
            </div>

            {data.preLienNoticeSent === 'yes' && (
              <div className="mt-4 space-y-4 pl-4 border-l-2 border-[#C5A869]/20">
                <div>
                  <label className="text-gq-light/50 text-xs block mb-2">When was it sent?</label>
                  <input
                    type="date"
                    value={data.noticeDate}
                    onChange={(e) => onUpdate({ noticeDate: e.target.value })}
                    className="w-full bg-[#1a1510] border border-[#C5A869]/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-[#C5A869]/50"
                  />
                </div>
                <div>
                  <label className="text-gq-light/50 text-xs block mb-2">Who did you send it to?</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.noticeToGC}
                        onChange={(e) => onUpdate({ noticeToGC: e.target.checked })}
                        className="w-4 h-4 rounded border-[#C5A869]/30 bg-[#1a1510] accent-[#C5A869]"
                      />
                      <span className="text-gq-light/70 text-sm">General Contractor</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={data.noticeToOwner}
                        onChange={(e) => onUpdate({ noticeToOwner: e.target.checked })}
                        className="w-4 h-4 rounded border-[#C5A869]/30 bg-[#1a1510] accent-[#C5A869]"
                      />
                      <span className="text-gq-light/70 text-sm">Property Owner</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Written Contract */}
        <div>
          <label className="text-[#C5A869] text-xs font-semibold tracking-widest uppercase block mb-3">Do you have a written contract?</label>
          <div className="flex gap-3">
            {[true, false].map((val) => (
              <button
                key={String(val)}
                onClick={() => onUpdate({ writtenContract: val })}
                className={`flex-1 p-3 rounded-lg border text-sm text-center transition-all ${
                  data.writtenContract === val
                    ? 'border-[#C5A869] bg-[#C5A869]/8 text-gq-light'
                    : 'border-[#C5A869]/10 text-gq-light/60 hover:border-[#C5A869]/30'
                }`}
              >
                {val ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>

        {/* Lien Waivers */}
        <div>
          <label className="text-[#C5A869] text-xs font-semibold tracking-widest uppercase block mb-3">Have you signed any lien waivers?</label>
          <div className="flex gap-3">
            {(['none', 'partial', 'full'] as WaiverStatus[]).map((val) => (
              <button
                key={val}
                onClick={() => onUpdate({ lienWaivers: val })}
                className={`flex-1 p-3 rounded-lg border text-sm text-center transition-all ${
                  data.lienWaivers === val
                    ? 'border-[#C5A869] bg-[#C5A869]/8 text-gq-light'
                    : 'border-[#C5A869]/10 text-gq-light/60 hover:border-[#C5A869]/30'
                }`}
              >
                {val === 'none' ? 'No' : val === 'partial' ? 'Partial' : 'Full'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </StepCard>
  );
}
