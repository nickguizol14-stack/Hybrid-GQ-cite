// src/lib/lien-scoring.ts
import { addMonths, addDays, differenceInDays, parseISO } from 'date-fns';
import type {
  WizardData,
  AssessmentResult,
  Factor,
  FactorScore,
  OverallRating,
} from './lien-types';

function isOriginalContractor(role: WizardData['role']): boolean {
  return role === 'general_contractor';
}

function getFilingDeadline(role: WizardData['role'], lastWorkDate: string): Date {
  const base = parseISO(lastWorkDate);
  // GCs get 4 calendar months; everyone else gets 90 days
  return isOriginalContractor(role) ? addMonths(base, 4) : addDays(base, 90);
}

function scoreFilingDeadline(daysRemaining: number): Factor {
  let score: FactorScore;
  let statusLabel: string;

  if (daysRemaining <= 0) {
    score = 'fail';
    statusLabel = 'Expired';
  } else if (daysRemaining <= 14) {
    score = 'warn';
    statusLabel = `${daysRemaining} days left - urgent`;
  } else if (daysRemaining <= 29) {
    score = 'warn';
    statusLabel = `${daysRemaining} days remaining`;
  } else {
    score = 'pass';
    statusLabel = `${daysRemaining} days remaining`;
  }

  return {
    id: 'filing_deadline',
    name: 'Filing Deadline',
    score,
    statusLabel,
    description:
      daysRemaining <= 0
        ? 'Your filing window has closed. Consult an attorney immediately about your options.'
        : `Your lien must be filed by the deadline to preserve your claim rights.`,
    statute: '42 O.S. Section 142',
  };
}

function scorePreLienNotice(data: WizardData, lastWorkDate: string): Factor {
  // GCs don't need pre-lien notice
  if (isOriginalContractor(data.role)) {
    return {
      id: 'pre_lien_notice',
      name: 'Pre-Lien Notice',
      score: 'pass',
      statusLabel: 'Not required',
      description: 'As the original contractor, pre-lien notice is not required under Oklahoma law.',
      statute: '42 O.S. Section 142.6',
    };
  }

  // Check exemptions
  const isExemptResidential =
    data.projectType === 'residential_not_owner_occupied';
  const isUnder10K =
    data.contractValue !== null &&
    data.contractValue < 10000 &&
    data.projectType !== 'residential_owner_occupied';

  if (isExemptResidential || isUnder10K) {
    return {
      id: 'pre_lien_notice',
      name: 'Pre-Lien Notice',
      score: 'pass',
      statusLabel: 'Exempt',
      description: isExemptResidential
        ? 'Non-owner-occupied residential projects (4 or fewer units) are exempt from the pre-lien notice requirement.'
        : 'Claims under $10,000 on non-owner-occupied projects are exempt from pre-lien notice.',
      statute: '42 O.S. Section 142.6',
    };
  }

  if (data.preLienNoticeSent === 'no') {
    return {
      id: 'pre_lien_notice',
      name: 'Pre-Lien Notice',
      score: 'fail',
      statusLabel: 'Not sent',
      description: 'Pre-lien notice is required for your claimant type. Without it, your lien may be unenforceable.',
      statute: '42 O.S. Section 142.6',
    };
  }

  if (data.preLienNoticeSent === 'not_sure') {
    return {
      id: 'pre_lien_notice',
      name: 'Pre-Lien Notice',
      score: 'warn',
      statusLabel: 'Verify',
      description: 'You should confirm whether pre-lien notice was properly sent. This is a critical requirement.',
      statute: '42 O.S. Section 142.6',
    };
  }

  // Notice was sent - check timing and recipients
  if (data.noticeDate) {
    const daysSinceWork = differenceInDays(
      parseISO(data.noticeDate),
      parseISO(lastWorkDate)
    );
    if (daysSinceWork > 75) {
      return {
        id: 'pre_lien_notice',
        name: 'Pre-Lien Notice',
        score: 'fail',
        statusLabel: 'Late',
        description: 'Notice was sent after the 75-day window. This may invalidate the notice requirement.',
        statute: '42 O.S. Section 142.6',
      };
    }
  }

  const sentToBoth = data.noticeToGC && data.noticeToOwner;
  if (!sentToBoth) {
    return {
      id: 'pre_lien_notice',
      name: 'Pre-Lien Notice',
      score: 'warn',
      statusLabel: 'Partial',
      description: `Notice should be sent to both the general contractor and property owner. You indicated it was only sent to ${data.noticeToGC ? 'the GC' : 'the owner'}.`,
      statute: '42 O.S. Section 142.6',
    };
  }

  return {
    id: 'pre_lien_notice',
    name: 'Pre-Lien Notice',
    score: 'pass',
    statusLabel: 'Compliant',
    description: 'Notice was sent to both the GC and owner within the 75-day window.',
    statute: '42 O.S. Section 142.6',
  };
}

function scoreWrittenContract(data: WizardData): Factor {
  if (data.writtenContract) {
    return {
      id: 'written_contract',
      name: 'Written Contract',
      score: 'pass',
      statusLabel: 'Documented',
      description: 'A written contract strengthens enforceability and makes proving the claim amount straightforward.',
      statute: '42 O.S. Section 141',
    };
  }

  return {
    id: 'written_contract',
    name: 'Written Contract',
    score: 'warn',
    statusLabel: 'Oral only',
    description: 'Oklahoma permits liens under oral contracts, but proving the agreed amount can be more difficult without written documentation.',
    statute: '42 O.S. Section 141',
  };
}

function scoreLienWaivers(data: WizardData): Factor {
  if (data.lienWaivers === 'full') {
    return {
      id: 'lien_waivers',
      name: 'Lien Waivers',
      score: 'fail',
      statusLabel: 'Full waiver',
      description: 'A full lien waiver has been signed. This may extinguish your right to file a lien on this project.',
      statute: 'Oklahoma common law',
    };
  }

  if (data.lienWaivers === 'partial') {
    return {
      id: 'lien_waivers',
      name: 'Lien Waivers',
      score: 'warn',
      statusLabel: 'Partial waiver',
      description: 'A partial waiver reduces the enforceable lien amount to the remaining balance not covered by the waiver.',
      statute: 'Oklahoma common law',
    };
  }

  return {
    id: 'lien_waivers',
    name: 'Lien Waivers',
    score: 'pass',
    statusLabel: 'Clear',
    description: 'No lien waivers have been signed. Your full claim amount is unencumbered.',
    statute: 'Oklahoma common law',
  };
}

function scoreProjectEligibility(data: WizardData): Factor {
  if (data.projectType === 'public') {
    return {
      id: 'project_eligibility',
      name: 'Project Eligibility',
      score: 'fail',
      statusLabel: 'Ineligible',
      description: 'M&M liens are not available on public property. Payment bond claims may be an alternative.',
      statute: '42 O.S. Section 141',
    };
  }

  return {
    id: 'project_eligibility',
    name: 'Project Eligibility',
    score: 'pass',
    statusLabel: 'Eligible',
    description: 'This is a private project. Mechanics and materialmen\'s liens are available under Oklahoma law.',
    statute: '42 O.S. Section 141',
  };
}

function calculateOverallRating(factors: Factor[]): OverallRating {
  const failCount = factors.filter((f) => f.score === 'fail').length;
  const warnCount = factors.filter((f) => f.score === 'warn').length;

  if (failCount > 0) return 'at_risk';
  if (warnCount >= 2) return 'moderate';
  return 'strong';
}

export function calculateAssessment(data: WizardData): AssessmentResult {
  const lastWorkDate = data.lastWorkDate;
  const filingDeadline = getFilingDeadline(data.role, lastWorkDate);
  const today = new Date();
  const daysRemaining = differenceInDays(filingDeadline, today);

  const totalDaysInWindow = isOriginalContractor(data.role)
    ? differenceInDays(filingDeadline, parseISO(lastWorkDate))
    : 90;
  const daysElapsed = totalDaysInWindow - daysRemaining;
  const windowElapsedPercent = Math.min(
    100,
    Math.max(0, Math.round((daysElapsed / totalDaysInWindow) * 100))
  );

  const outstandingAmount =
    (data.totalAmount ?? 0) - (data.amountPaid ?? 0);

  const factors: Factor[] = [
    scoreFilingDeadline(daysRemaining),
    scorePreLienNotice(data, lastWorkDate),
    scoreWrittenContract(data),
    scoreLienWaivers(data),
    scoreProjectEligibility(data),
  ];

  const factorsPassed = factors.filter((f) => f.score === 'pass').length;
  const overallRating = calculateOverallRating(factors);

  return {
    overallRating,
    factors,
    factorsPassed,
    filingDeadline: filingDeadline.toISOString(),
    daysRemaining,
    outstandingAmount,
    windowElapsedPercent,
  };
}

export function getInitialWizardData(): WizardData {
  return {
    role: null,
    projectType: null,
    county: '',
    contractValue: null,
    totalAmount: null,
    amountPaid: null,
    lastWorkDate: '',
    preLienNoticeSent: null,
    noticeDate: '',
    noticeToGC: false,
    noticeToOwner: false,
    writtenContract: null,
    lienWaivers: null,
  };
}
