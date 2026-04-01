// src/lib/lien-types.ts

export type ClaimantRole =
  | 'general_contractor'
  | 'subcontractor'
  | 'material_supplier'
  | 'laborer'
  | 'design_professional'
  | 'equipment_rental';

export type ProjectType =
  | 'commercial'
  | 'residential_not_owner_occupied'
  | 'residential_owner_occupied'
  | 'public';

export type FactorScore = 'pass' | 'warn' | 'fail';

export type OverallRating = 'strong' | 'moderate' | 'at_risk';

export type WaiverStatus = 'none' | 'partial' | 'full';

export type NoticeStatus = 'yes' | 'no' | 'not_sure';

export interface WizardData {
  // Step 1
  role: ClaimantRole | null;
  // Step 2
  projectType: ProjectType | null;
  county: string;
  contractValue: number | null;
  // Step 3
  totalAmount: number | null;
  amountPaid: number | null;
  lastWorkDate: string; // ISO date string
  // Step 4
  preLienNoticeSent: NoticeStatus | null;
  noticeDate: string; // ISO date string
  noticeToGC: boolean;
  noticeToOwner: boolean;
  writtenContract: boolean | null;
  lienWaivers: WaiverStatus | null;
}

export interface Factor {
  id: string;
  name: string;
  score: FactorScore;
  statusLabel: string;
  description: string;
  statute: string;
}

export interface AssessmentResult {
  overallRating: OverallRating;
  factors: Factor[];
  factorsPassed: number;
  filingDeadline: string; // ISO date string
  daysRemaining: number;
  outstandingAmount: number;
  windowElapsedPercent: number;
}
