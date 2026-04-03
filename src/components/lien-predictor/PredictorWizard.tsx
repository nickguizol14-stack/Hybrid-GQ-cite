// src/components/lien-predictor/PredictorWizard.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WizardData } from '@/lib/lien-types';
import { calculateAssessment, getInitialWizardData } from '@/lib/lien-scoring';
import { trackEvent } from '@/lib/analytics';
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
  const [isCalculating, setIsCalculating] = useState(false);
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
      trackEvent('lien_assessment_step', { step: String(step + 1) });
      setStep(step + 1);
    } else {
      trackEvent('lien_assessment_complete');
      setIsCalculating(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // Calculating animation timer
  useEffect(() => {
    if (!isCalculating) return;
    const timer = setTimeout(() => {
      setIsCalculating(false);
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 2800);
    return () => clearTimeout(timer);
  }, [isCalculating]);

  const result = showResults ? calculateAssessment(data) : null;

  // Calculating screen
  if (isCalculating) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gq-dark-warm border border-gq-gold/15 rounded-2xl p-10 sm:p-14 text-center"
        >
          {/* Animated rings */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <motion.div
              className="absolute inset-0 border-2 border-gq-gold/20 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-2 border-2 border-gq-gold/30 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
            />
            <motion.div
              className="absolute inset-4 border-2 border-gq-gold rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-2 h-2 bg-gq-gold rounded-full absolute -top-1" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-3 h-3 bg-gq-gold rounded-full"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>

          <h2 className="font-serif text-2xl text-gq-light font-medium mb-2">Analyzing Your Claim</h2>
          <p className="text-gq-light/65 text-sm mb-6">Evaluating against Oklahoma Title 42 requirements...</p>

          {/* Animated checklist */}
          <div className="flex flex-col gap-2 max-w-xs mx-auto text-left">
            {['Filing deadlines', 'Notice compliance', 'Contract status', 'Waiver review', 'Project eligibility'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.4 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.4 + 0.3, type: 'spring', stiffness: 300 }}
                  className="w-5 h-5 rounded-full bg-[#4ade80]/15 flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-[#4ade80] text-xs">&#10003;</span>
                </motion.div>
                <span className="text-gq-light/60 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Public project redirect screen
  if (publicProjectRedirect) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gq-dark-warm border border-gq-gold/15 rounded-2xl p-8 sm:p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-[#eab308]/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">&#9888;</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-gq-light font-medium mb-4">Public Project Detected</h2>
          <p className="text-gq-light/60 text-sm leading-relaxed mb-6 max-w-md mx-auto">
            Mechanics and materialmen's liens are not available on public property under Oklahoma law. However, payment bond claims may be available under the Public Competitive Bidding Act.
          </p>
          <p className="text-gq-light/65 text-xs mb-8">61 O.S. Section 1</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => { setPublicProjectRedirect(false); update({ projectType: null }); }}
              className="text-gq-light/70 hover:text-gq-light text-sm transition-colors px-6 py-3"
            >
              Go Back
            </button>
            <a
              href="/contact"
              className="bg-gradient-to-r from-gq-burgundy via-gq-burgundy to-gq-burgundy text-white px-8 py-3 rounded-lg text-sm font-bold tracking-wide"
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
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <span className="text-gq-gold text-[10px] tracking-[3px] uppercase font-semibold">
            Step {step + 1} of {STEP_LABELS.length}
          </span>
          <div className="flex-1 h-[3px] bg-[#333] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gq-gold to-gq-gold rounded-full transition-all duration-500"
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

    </div>
  );
}
