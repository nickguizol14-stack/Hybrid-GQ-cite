// src/components/lien-predictor/PredictorWizard.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WizardData } from '@/lib/lien-types';
import { calculateAssessment, getInitialWizardData } from '@/lib/lien-scoring';
import RoleStep from './steps/RoleStep';
import ProjectStep from './steps/ProjectStep';
import PaymentStep from './steps/PaymentStep';
import ComplianceStep from './steps/ComplianceStep';
import ResultsView from './ResultsView';
import SaveShareModal from './SaveShareModal';

const STEP_LABELS = ['Your Role', 'Project', 'Payment', 'Compliance'];

export default function PredictorWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>(getInitialWizardData);
  const [showResults, setShowResults] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [publicProjectRedirect, setPublicProjectRedirect] = useState(false);

  const update = (partial: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const handleNext = () => {
    // Check for public project at end of step 2
    if (step === 1 && data.projectType === 'public') {
      setPublicProjectRedirect(true);
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const result = showResults ? calculateAssessment(data) : null;

  // Public project redirect screen
  if (publicProjectRedirect) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#2a2219] border border-[#C5A869]/15 rounded-2xl p-8 sm:p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-[#eab308]/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">&#9888;</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-gq-light font-medium mb-4">Public Project Detected</h2>
          <p className="text-gq-light/60 text-sm leading-relaxed mb-6 max-w-md mx-auto">
            Mechanics and materialmen's liens are not available on public property under Oklahoma law. However, payment bond claims may be available under the Public Competitive Bidding Act.
          </p>
          <p className="text-gq-light/40 text-xs mb-8">61 O.S. Section 1</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => { setPublicProjectRedirect(false); update({ projectType: null }); }}
              className="text-gq-light/50 hover:text-gq-light text-sm transition-colors px-6 py-3"
            >
              Go Back
            </button>
            <a
              href="/contact"
              className="bg-gradient-to-r from-[#7A232F] via-[#9B2D3D] to-[#B03A4A] text-white px-8 py-3 rounded-lg text-sm font-bold tracking-wide"
            >
              Contact Gary About Bond Claims
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Results view
  if (showResults && result) {
    return (
      <div className="max-w-4xl mx-auto">
        <ResultsView result={result} onSaveShare={() => setShowSaveModal(true)} />
        <SaveShareModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          wizardData={data}
          result={result}
        />
      </div>
    );
  }

  // Wizard steps
  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#C5A869] text-[10px] tracking-[3px] uppercase font-semibold">
            Step {step + 1} of {STEP_LABELS.length}
          </span>
          <div className="flex-1 h-[3px] bg-[#333] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8e733e] to-[#C5A869] rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {step === 0 && <RoleStep data={data} onUpdate={update} onNext={handleNext} />}
          {step === 1 && <ProjectStep data={data} onUpdate={update} onNext={handleNext} onBack={handleBack} />}
          {step === 2 && <PaymentStep data={data} onUpdate={update} onNext={handleNext} onBack={handleBack} />}
          {step === 3 && <ComplianceStep data={data} onUpdate={update} onNext={handleNext} onBack={handleBack} />}
        </motion.div>
      </AnimatePresence>

      {/* Peek of next step */}
      {step < 3 && (
        <div className="mt-3 bg-[#2a2219] border border-[#C5A869]/8 rounded-2xl p-4 opacity-25">
          <p className="font-serif text-lg text-gq-light">{STEP_LABELS[step + 1]}</p>
        </div>
      )}
    </div>
  );
}
