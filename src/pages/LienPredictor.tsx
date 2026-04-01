// src/pages/LienPredictor.tsx
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import PredictorWizard from '../components/lien-predictor/PredictorWizard';
import { ShieldCheck } from 'lucide-react';

const LienPredictorPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-[#1a1510] pt-36 sm:pt-40 pb-20"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {/* Page Header */}
      <div className="container-gq text-center mb-12">
        <div className="inline-flex items-center gap-2 border border-[#C5A869]/20 rounded-full px-5 py-2 bg-[#C5A869]/5 mb-6">
          <ShieldCheck className="w-4 h-4 text-[#C5A869]" strokeWidth={2} />
          <span className="text-[#C5A869] text-[10px] tracking-[3px] uppercase font-semibold">Proprietary Assessment Tool</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gq-light font-medium mb-4">
          Lien Claim <span className="text-[#C5A869] italic">Predictor</span>
        </h1>
        <p className="text-gq-light/50 text-base sm:text-lg max-w-2xl mx-auto">
          Evaluate the strength of your Oklahoma mechanics lien claim based on statutory requirements.
        </p>
      </div>

      {/* Wizard */}
      <div className="container-gq">
        <PredictorWizard />
      </div>
    </motion.div>
  );
};

export default LienPredictorPage;
