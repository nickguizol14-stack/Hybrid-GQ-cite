// src/components/lien-predictor/SaveShareModal.tsx
import { useState } from 'react';
import { z } from 'zod/v4';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { WizardData, AssessmentResult } from '@/lib/lien-types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  wizardData: WizardData;
  result: AssessmentResult;
}

const saveSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Please enter a valid email'),
  phone: z.string().optional().default(''),
  notes: z.string().optional().default(''),
});

export default function SaveShareModal({ isOpen, onClose, wizardData, result }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = saveSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Please check your input');
      return;
    }

    setIsSubmitting(true);

    const { error: dbError } = await supabase.from('lien_assessments').insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      notes: parsed.data.notes || null,
      role: wizardData.role,
      project_type: wizardData.projectType,
      county: wizardData.county,
      contract_value: wizardData.contractValue,
      amount_paid: wizardData.amountPaid,
      amount_outstanding: result.outstandingAmount,
      last_work_date: wizardData.lastWorkDate,
      filing_deadline: result.filingDeadline,
      days_remaining: result.daysRemaining,
      pre_lien_notice_sent: wizardData.preLienNoticeSent,
      notice_date: wizardData.noticeDate || null,
      notice_recipients: [
        wizardData.noticeToGC && 'gc',
        wizardData.noticeToOwner && 'owner',
      ].filter(Boolean).join(',') || null,
      written_contract: wizardData.writtenContract,
      lien_waivers: wizardData.lienWaivers,
      overall_rating: result.overallRating,
      factors_passed: result.factorsPassed,
    });

    setIsSubmitting(false);

    if (dbError) {
      console.error('Save assessment error:', dbError);
      setError('Something went wrong. Please try calling us directly.');
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gq-dark-warm border border-gq-gold/20 rounded-2xl p-6 sm:p-8 w-full max-w-md relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gq-light/30 hover:text-gq-light transition-colors">
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#4ade80]/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-[#4ade80]" />
                </div>
                <h3 className="font-serif text-xl text-gq-light font-medium mb-2">Assessment Shared</h3>
                <p className="text-gq-light/50 text-sm">Gary's team will review your situation and reach out within 24 hours.</p>
                <button onClick={onClose} className="mt-6 text-gq-gold text-sm hover:text-gq-gold transition-colors">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-serif text-xl text-gq-light font-medium mb-1">Share With Gary's Team</h3>
                <p className="text-gq-light/40 text-sm mb-6">Your assessment details will be included automatically.</p>

                <div className="space-y-4">
                  <div>
                    <label className="text-gq-light/60 text-xs block mb-1">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="w-full bg-gq-dark border border-gq-gold/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-gq-gold/50"
                    />
                  </div>
                  <div>
                    <label className="text-gq-light/60 text-xs block mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full bg-gq-dark border border-gq-gold/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-gq-gold/50"
                    />
                  </div>
                  <div>
                    <label className="text-gq-light/60 text-xs block mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-gq-dark border border-gq-gold/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-gq-gold/50"
                    />
                  </div>
                  <div>
                    <label className="text-gq-light/60 text-xs block mb-1">Anything else Gary should know?</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      rows={3}
                      className="w-full bg-gq-dark border border-gq-gold/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-gq-gold/50 resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="mt-4 bg-red-900/20 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-gradient-to-r from-gq-burgundy via-gq-burgundy to-gq-burgundy text-white py-3.5 rounded-lg text-sm font-bold tracking-wide disabled:opacity-40 hover:scale-[1.01] transition-transform"
                >
                  {isSubmitting ? 'Sending...' : 'Share Assessment'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
