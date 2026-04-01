# Lien Predictor Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-step lien claim assessment wizard with client-side scoring based on Oklahoma Title 42, producing an interactive results page with gauge, metrics, factor analysis, and optional save-to-Supabase.

**Architecture:** Pure client-side scoring logic in `src/lib/`, React wizard UI in `src/components/lien-predictor/`, page wrapper at `/lien-predictor` route. Wizard state managed with React `useState` in the parent `PredictorWizard` component, passed down to steps. Framer Motion for step transitions. Supabase only touched when user opts to save results.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Framer Motion (step animations), date-fns (deadline math), Zod (save form validation), Supabase (optional save)

**Working directory:** `~/Projects/GQLaw-v9`

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/lib/lien-types.ts` | TypeScript types for all assessment data |
| Create | `src/lib/oklahoma-counties.ts` | Array of 77 Oklahoma county names |
| Create | `src/lib/lien-scoring.ts` | Pure scoring functions, deadline calculations |
| Create | `src/components/lien-predictor/PredictorWizard.tsx` | Wizard container, step management, progress bar |
| Create | `src/components/lien-predictor/steps/RoleStep.tsx` | Step 1: role selection |
| Create | `src/components/lien-predictor/steps/ProjectStep.tsx` | Step 2: project details |
| Create | `src/components/lien-predictor/steps/PaymentStep.tsx` | Step 3: payment status |
| Create | `src/components/lien-predictor/steps/ComplianceStep.tsx` | Step 4: notice and compliance |
| Create | `src/components/lien-predictor/GaugeChart.tsx` | SVG semi-circular gauge |
| Create | `src/components/lien-predictor/ResultsView.tsx` | Full results page |
| Create | `src/components/lien-predictor/SaveShareModal.tsx` | Contact info collection + Supabase save |
| Create | `src/pages/LienPredictor.tsx` | Page wrapper with route transition |
| Modify | `src/App.tsx` | Add `/lien-predictor` route |
| Modify | `src/sections/LienPredictor.tsx` | Update CTA to link to `/lien-predictor` |

---

### Task 1: Types and County Data

**Files:**
- Create: `src/lib/lien-types.ts`
- Create: `src/lib/oklahoma-counties.ts`

- [ ] **Step 1: Create lien-types.ts**

```ts
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
```

- [ ] **Step 2: Create oklahoma-counties.ts**

```ts
// src/lib/oklahoma-counties.ts

export const OKLAHOMA_COUNTIES = [
  'Adair', 'Alfalfa', 'Atoka', 'Beaver', 'Beckham', 'Blaine', 'Bryan',
  'Caddo', 'Canadian', 'Carter', 'Cherokee', 'Choctaw', 'Cimarron',
  'Cleveland', 'Coal', 'Comanche', 'Cotton', 'Craig', 'Creek', 'Custer',
  'Delaware', 'Dewey', 'Ellis', 'Garfield', 'Garvin', 'Grady', 'Grant',
  'Greer', 'Harmon', 'Harper', 'Haskell', 'Hughes', 'Jackson', 'Jefferson',
  'Johnston', 'Kay', 'Kingfisher', 'Kiowa', 'Latimer', 'Le Flore',
  'Lincoln', 'Logan', 'Love', 'Major', 'Marshall', 'Mayes', 'McClain',
  'McCurtain', 'McIntosh', 'Murray', 'Muskogee', 'Noble', 'Nowata',
  'Okfuskee', 'Oklahoma', 'Okmulgee', 'Osage', 'Ottawa', 'Pawnee',
  'Payne', 'Pittsburg', 'Pontotoc', 'Pottawatomie', 'Pushmataha',
  'Roger Mills', 'Rogers', 'Seminole', 'Sequoyah', 'Stephens', 'Texas',
  'Tillman', 'Tulsa', 'Wagoner', 'Washington', 'Washita', 'Woods',
  'Woodward',
] as const;

export type OklahomaCounty = (typeof OKLAHOMA_COUNTIES)[number];
```

- [ ] **Step 3: Verify compilation**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/lib/lien-types.ts src/lib/oklahoma-counties.ts
git commit -m "feat(lien-predictor): add types and Oklahoma county data"
```

---

### Task 2: Scoring Engine

**Files:**
- Create: `src/lib/lien-scoring.ts`

This is the core logic. All functions are pure (no side effects, no DOM, no Supabase). They take `WizardData` and return `AssessmentResult`.

- [ ] **Step 1: Install date-fns if not present**

```bash
cd ~/Projects/GQLaw-v9 && npm ls date-fns 2>/dev/null || npm install date-fns
```

(date-fns is already in package.json, so this should confirm it's installed.)

- [ ] **Step 2: Create lien-scoring.ts**

```ts
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
```

- [ ] **Step 3: Verify compilation**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/lib/lien-scoring.ts
git commit -m "feat(lien-predictor): add scoring engine with deadline and factor calculations"
```

---

### Task 3: SVG Gauge Component

**Files:**
- Create: `src/components/lien-predictor/GaugeChart.tsx`

- [ ] **Step 1: Create the gauge component**

```tsx
// src/components/lien-predictor/GaugeChart.tsx
import type { OverallRating } from '@/lib/lien-types';

interface GaugeChartProps {
  rating: OverallRating;
}

const RATING_CONFIG = {
  strong: { angle: 30, color: '#4ade80' },
  moderate: { angle: 0, color: '#eab308' },
  at_risk: { angle: -30, color: '#ef4444' },
} as const;

export default function GaugeChart({ rating }: GaugeChartProps) {
  const config = RATING_CONFIG[rating];

  // Needle rotation: -30deg (left/at_risk) to +30deg (right/strong)
  // SVG centered at bottom of semicircle
  const needleAngle = config.angle;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 110" className="w-[180px] h-auto">
        {/* Background arc */}
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="#2a2219"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Gradient arc */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9b2d3d" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>
        <path
          d="M 10 100 A 90 90 0 0 1 190 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.25"
        />
        {/* Needle */}
        <g transform={`rotate(${needleAngle}, 100, 100)`}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="22"
            stroke="#c5a869"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.9"
          />
        </g>
        {/* Center dot */}
        <circle cx="100" cy="100" r="6" fill="#c5a869" />
        <circle cx="100" cy="100" r="6" fill="#c5a869" filter="url(#glow)" />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Labels */}
        <text x="16" y="108" fill="#faf6f0" fontSize="7" opacity="0.3" fontFamily="Inter, sans-serif">AT RISK</text>
        <text x="80" y="108" fill="#faf6f0" fontSize="7" opacity="0.3" fontFamily="Inter, sans-serif">MODERATE</text>
        <text x="162" y="108" fill="#faf6f0" fontSize="7" opacity="0.3" fontFamily="Inter, sans-serif">STRONG</text>
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Verify compilation**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/components/lien-predictor/GaugeChart.tsx
git commit -m "feat(lien-predictor): add SVG gauge chart component"
```

---

### Task 4: Wizard Step Components

**Files:**
- Create: `src/components/lien-predictor/steps/RoleStep.tsx`
- Create: `src/components/lien-predictor/steps/ProjectStep.tsx`
- Create: `src/components/lien-predictor/steps/PaymentStep.tsx`
- Create: `src/components/lien-predictor/steps/ComplianceStep.tsx`

All steps receive `data: WizardData`, `onUpdate: (partial: Partial<WizardData>) => void`, and `onNext: () => void` as props. They follow the dark card UI pattern from the design spec.

- [ ] **Step 1: Create a shared step card wrapper style**

Each step will use the same dark card pattern. Rather than duplicating, create a simple shared wrapper in the first step file and export it. Actually, to keep files focused, create a tiny shared component:

Create `src/components/lien-predictor/StepCard.tsx`:
```tsx
// src/components/lien-predictor/StepCard.tsx
import { ReactNode } from 'react';

interface StepCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  onNext: () => void;
  canProceed: boolean;
  onBack?: () => void;
}

export default function StepCard({ title, subtitle, children, onNext, canProceed, onBack }: StepCardProps) {
  return (
    <div className="bg-[#2a2219] border border-[#C5A869]/15 rounded-2xl p-6 sm:p-8 lg:p-10">
      <h2 className="font-serif text-2xl sm:text-3xl text-gq-light font-medium mb-1">{title}</h2>
      <p className="text-gq-light/40 text-sm mb-8">{subtitle}</p>
      {children}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#C5A869]/10">
        {onBack ? (
          <button onClick={onBack} className="text-gq-light/50 hover:text-gq-light text-sm transition-colors">
            Back
          </button>
        ) : <div />}
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-[#9b2d3d] hover:bg-[#b03a4a] disabled:opacity-30 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create RoleStep.tsx**

```tsx
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
```

- [ ] **Step 3: Create ProjectStep.tsx**

```tsx
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
          <label className="text-[#C5A869] text-xs font-semibold tracking-widest uppercase block mb-3">Project Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROJECT_TYPES.map((pt) => (
              <button
                key={pt.value}
                onClick={() => onUpdate({ projectType: pt.value })}
                className={`p-3 rounded-lg border text-left text-sm transition-all ${
                  data.projectType === pt.value
                    ? 'border-[#C5A869] bg-[#C5A869]/8 text-gq-light'
                    : 'border-[#C5A869]/10 text-gq-light/60 hover:border-[#C5A869]/30'
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>
        </div>

        {/* County */}
        <div>
          <label className="text-[#C5A869] text-xs font-semibold tracking-widest uppercase block mb-3">County</label>
          <select
            value={data.county}
            onChange={(e) => onUpdate({ county: e.target.value })}
            className="w-full bg-[#1a1510] border border-[#C5A869]/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-[#C5A869]/50"
          >
            <option value="">Select county</option>
            {OKLAHOMA_COUNTIES.map((c) => (
              <option key={c} value={c}>{c} County</option>
            ))}
          </select>
        </div>

        {/* Contract Value */}
        <div>
          <label className="text-[#C5A869] text-xs font-semibold tracking-widest uppercase block mb-3">Contract / PO Value</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gq-light/40 text-sm">$</span>
            <input
              type="number"
              value={data.contractValue ?? ''}
              onChange={(e) => onUpdate({ contractValue: e.target.value ? Number(e.target.value) : null })}
              placeholder="0"
              className="w-full bg-[#1a1510] border border-[#C5A869]/20 rounded-lg pl-8 pr-4 py-3 text-gq-light text-sm focus:outline-none focus:border-[#C5A869]/50"
            />
          </div>
        </div>
      </div>
    </StepCard>
  );
}
```

- [ ] **Step 4: Create PaymentStep.tsx**

```tsx
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
            <label className="text-[#C5A869] text-xs font-semibold tracking-widest uppercase block mb-3">Total Contract Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gq-light/40 text-sm">$</span>
              <input
                type="number"
                value={data.totalAmount ?? ''}
                onChange={(e) => onUpdate({ totalAmount: e.target.value ? Number(e.target.value) : null })}
                placeholder="0"
                className="w-full bg-[#1a1510] border border-[#C5A869]/20 rounded-lg pl-8 pr-4 py-3 text-gq-light text-sm focus:outline-none focus:border-[#C5A869]/50"
              />
            </div>
          </div>
          <div>
            <label className="text-[#C5A869] text-xs font-semibold tracking-widest uppercase block mb-3">Amount Paid to Date</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gq-light/40 text-sm">$</span>
              <input
                type="number"
                value={data.amountPaid ?? ''}
                onChange={(e) => onUpdate({ amountPaid: e.target.value ? Number(e.target.value) : null })}
                placeholder="0"
                className="w-full bg-[#1a1510] border border-[#C5A869]/20 rounded-lg pl-8 pr-4 py-3 text-gq-light text-sm focus:outline-none focus:border-[#C5A869]/50"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-[#C5A869] text-xs font-semibold tracking-widest uppercase block mb-3">Last Date of Work or Materials Delivered</label>
          <input
            type="date"
            value={data.lastWorkDate}
            onChange={(e) => onUpdate({ lastWorkDate: e.target.value })}
            className="w-full bg-[#1a1510] border border-[#C5A869]/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-[#C5A869]/50"
          />
        </div>

        {data.totalAmount !== null && data.amountPaid !== null && (
          <div className="bg-[#1a1510] border border-[#C5A869]/10 rounded-lg p-4 flex items-center justify-between">
            <span className="text-gq-light/50 text-sm">Outstanding Balance</span>
            <span className="text-gq-light font-serif text-xl font-medium">
              ${(Math.max(0, (data.totalAmount ?? 0) - (data.amountPaid ?? 0))).toLocaleString()}
            </span>
          </div>
        )}
      </div>
    </StepCard>
  );
}
```

- [ ] **Step 5: Create ComplianceStep.tsx**

```tsx
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
```

- [ ] **Step 6: Verify compilation**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit`

- [ ] **Step 7: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/components/lien-predictor/StepCard.tsx src/components/lien-predictor/steps/
git commit -m "feat(lien-predictor): add wizard step components (role, project, payment, compliance)"
```

---

### Task 5: Results View

**Files:**
- Create: `src/components/lien-predictor/ResultsView.tsx`

This is the full results page. Uses the gauge, shows metrics, factor grid, and CTA. Layout matches the approved v3 mockup: gauge + metrics side-by-side, 2-column factor grid, horizontal CTA.

- [ ] **Step 1: Create ResultsView.tsx**

```tsx
// src/components/lien-predictor/ResultsView.tsx
import { format } from 'date-fns';
import type { AssessmentResult } from '@/lib/lien-types';
import GaugeChart from './GaugeChart';

interface Props {
  result: AssessmentResult;
  onSaveShare: () => void;
}

const RATING_LABELS = {
  strong: { text: 'Strong', color: 'text-[#4ade80]' },
  moderate: { text: 'Moderate', color: 'text-[#eab308]' },
  at_risk: { text: 'At Risk', color: 'text-[#ef4444]' },
} as const;

const SCORE_COLORS = {
  pass: { border: 'border-l-[#4ade80]', icon: 'bg-[#4ade80]/10 text-[#4ade80]', status: 'text-[#4ade80]' },
  warn: { border: 'border-l-[#eab308]', icon: 'bg-[#eab308]/10 text-[#eab308]', status: 'text-[#eab308]' },
  fail: { border: 'border-l-[#ef4444]', icon: 'bg-[#ef4444]/10 text-[#ef4444]', status: 'text-[#ef4444]' },
} as const;

export default function ResultsView({ result, onSaveShare }: Props) {
  const ratingLabel = RATING_LABELS[result.overallRating];
  const deadlineFormatted = format(new Date(result.filingDeadline), 'MMM d, yyyy');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <p className="text-[#C5A869] text-[9px] tracking-[4px] uppercase font-semibold mb-2">Lien Claim Assessment</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-gq-light font-medium">Your Claim Analysis</h1>
        <p className="text-gq-light/30 text-xs mt-1">Oklahoma Title 42, Sections 141-153</p>
      </div>

      {/* Top Section: Gauge + Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gauge Card */}
        <div className="bg-[#2a2219] border border-[#C5A869]/10 rounded-2xl p-6 sm:p-8 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A869] to-transparent" />
          <GaugeChart rating={result.overallRating} />
          <div className={`font-serif text-4xl font-semibold mt-2 ${ratingLabel.color}`}>{ratingLabel.text}</div>
          <p className="text-gq-light/40 text-sm mt-1">{result.factorsPassed} of {result.factors.length} factors favorable</p>
        </div>

        {/* Metrics */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#2a2219] border border-[#C5A869]/8 rounded-xl p-5 flex items-center justify-between flex-1">
            <div>
              <p className="text-[#C5A869] text-[9px] tracking-[2px] uppercase font-semibold">Days to File</p>
              <p className="text-gq-light/40 text-xs mt-0.5">Deadline: {deadlineFormatted}</p>
            </div>
            <span className={`font-serif text-3xl font-semibold ${result.daysRemaining <= 14 ? 'text-[#ef4444]' : result.daysRemaining <= 29 ? 'text-[#eab308]' : 'text-[#eab308]'}`}>
              {Math.max(0, result.daysRemaining)}
            </span>
          </div>
          <div className="bg-[#2a2219] border border-[#C5A869]/8 rounded-xl p-5 flex items-center justify-between flex-1">
            <div>
              <p className="text-[#C5A869] text-[9px] tracking-[2px] uppercase font-semibold">Claim Amount</p>
              <p className="text-gq-light/40 text-xs mt-0.5">Outstanding balance</p>
            </div>
            <span className="font-serif text-3xl font-semibold text-gq-light">
              ${result.outstandingAmount.toLocaleString()}
            </span>
          </div>
          {/* Deadline progress */}
          <div className="bg-[#2a2219] border border-[#C5A869]/8 rounded-xl p-4 flex items-center gap-4">
            <span className="text-lg">&#9201;</span>
            <div className="flex-1">
              <p className="text-gq-light text-sm font-medium">{result.windowElapsedPercent}% of filing window elapsed</p>
            </div>
            <div className="w-24 h-1.5 bg-[#333] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#4ade80] to-[#eab308]"
                style={{ width: `${result.windowElapsedPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Factor Analysis */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-serif text-xl text-gq-light font-medium whitespace-nowrap">Factor Analysis</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[#C5A869]/20 to-transparent" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {result.factors.map((factor) => {
            const colors = SCORE_COLORS[factor.score];
            return (
              <div key={factor.id} className={`bg-[#2a2219] rounded-xl p-4 border-l-[3px] ${colors.border} flex gap-3`}>
                <div className={`w-7 h-7 rounded-md flex items-center justify-center text-xs flex-shrink-0 ${colors.icon}`}>
                  {factor.score === 'pass' ? '✓' : factor.score === 'warn' ? '!' : '✕'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gq-light text-sm font-semibold">{factor.name}</span>
                    <span className={`text-[9px] font-bold tracking-wider uppercase ${colors.status}`}>{factor.statusLabel}</span>
                  </div>
                  <p className="text-gq-light/45 text-xs leading-relaxed mt-1">{factor.description}</p>
                  <p className="text-gq-light/20 text-[10px] italic mt-1">{factor.statute}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#9b2d3d]/10 to-[#2a2219]/60 border border-[#9b2d3d]/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="font-serif text-2xl text-gq-light font-medium mb-2">Ready to Protect Your Rights?</h3>
          <p className="text-gq-light/50 text-sm leading-relaxed">Share this assessment with Gary Quinnett's team. He'll review your specific situation and advise on the strongest path to recovery.</p>
        </div>
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <button
            onClick={onSaveShare}
            className="bg-gradient-to-r from-[#7A232F] via-[#9B2D3D] to-[#B03A4A] text-white px-7 py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase whitespace-nowrap hover:scale-[1.02] transition-transform"
          >
            Save & Share With Gary
          </button>
          <a href="tel:405-607-2266" className="text-gq-light/35 text-xs hover:text-gq-light/60 transition-colors">(405) 607-2266</a>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-gq-light/20 text-[9px] leading-relaxed px-8 pt-4 border-t border-[#C5A869]/5">
        This assessment is for educational purposes only and does not constitute legal advice. Every situation has unique facts that may affect your rights under Oklahoma law. Consult an attorney for advice specific to your situation.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify compilation**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/components/lien-predictor/ResultsView.tsx
git commit -m "feat(lien-predictor): add results view with gauge, metrics, factor grid, and CTA"
```

---

### Task 6: Save & Share Modal

**Files:**
- Create: `src/components/lien-predictor/SaveShareModal.tsx`

- [ ] **Step 1: Create SaveShareModal.tsx**

```tsx
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
            className="bg-[#2a2219] border border-[#C5A869]/20 rounded-2xl p-6 sm:p-8 w-full max-w-md relative"
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
                <button onClick={onClose} className="mt-6 text-[#C5A869] text-sm hover:text-[#E6D3A3] transition-colors">Close</button>
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
                      className="w-full bg-[#1a1510] border border-[#C5A869]/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-[#C5A869]/50"
                    />
                  </div>
                  <div>
                    <label className="text-gq-light/60 text-xs block mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="w-full bg-[#1a1510] border border-[#C5A869]/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-[#C5A869]/50"
                    />
                  </div>
                  <div>
                    <label className="text-gq-light/60 text-xs block mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#1a1510] border border-[#C5A869]/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-[#C5A869]/50"
                    />
                  </div>
                  <div>
                    <label className="text-gq-light/60 text-xs block mb-1">Anything else Gary should know?</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      rows={3}
                      className="w-full bg-[#1a1510] border border-[#C5A869]/20 rounded-lg px-4 py-3 text-gq-light text-sm focus:outline-none focus:border-[#C5A869]/50 resize-none"
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
                  className="w-full mt-6 bg-gradient-to-r from-[#7A232F] via-[#9B2D3D] to-[#B03A4A] text-white py-3.5 rounded-lg text-sm font-bold tracking-wide disabled:opacity-40 hover:scale-[1.01] transition-transform"
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
```

- [ ] **Step 2: Verify compilation**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/components/lien-predictor/SaveShareModal.tsx
git commit -m "feat(lien-predictor): add save and share modal with Supabase integration"
```

---

### Task 7: Wizard Container

**Files:**
- Create: `src/components/lien-predictor/PredictorWizard.tsx`

This is the orchestrator. Manages wizard state, step navigation, progress bar, and transitions between steps/results.

- [ ] **Step 1: Create PredictorWizard.tsx**

```tsx
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
```

- [ ] **Step 2: Verify compilation**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/components/lien-predictor/PredictorWizard.tsx
git commit -m "feat(lien-predictor): add wizard container with step management and progress bar"
```

---

### Task 8: Page Wrapper and Route

**Files:**
- Create: `src/pages/LienPredictor.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the page component**

```tsx
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
```

- [ ] **Step 2: Add route to App.tsx**

In `src/App.tsx`, add the import at the top alongside other page imports:

```tsx
import LienPredictorPage from './pages/LienPredictor';
```

Add the route inside the `<Routes>` block, after the `/lien-book` route:

```tsx
<Route path="/lien-predictor" element={<LienPredictorPage />} />
```

- [ ] **Step 3: Verify compilation and build**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit && npm run build`
Expected: Clean compile, build succeeds

- [ ] **Step 4: Commit**

```bash
cd ~/Projects/GQLaw-v9
git add src/pages/LienPredictor.tsx src/App.tsx
git commit -m "feat(lien-predictor): add page wrapper and /lien-predictor route"
```

---

### Task 9: Update Homepage CTA and Create Supabase Table

**Files:**
- Modify: `src/sections/LienPredictor.tsx`
- Supabase: create `lien_assessments` table

- [ ] **Step 1: Update the homepage CTA to link to the predictor**

In `src/sections/LienPredictor.tsx`, find the CTA `<a>` tag (around line 99-111) that currently links to `#contact`. Replace it with a link to `/lien-predictor`:

Change the `href` from `"#contact"` to `"/lien-predictor"`.

Replace the `onClick` handler:
```tsx
onClick={(e) => {
  e.preventDefault();
  window.location.href = '/lien-predictor';
}}
```

Change the button text from "Evaluate Your Claim Strategy" to "Assess Your Claim".

- [ ] **Step 2: Create the lien_assessments Supabase table**

Run this SQL in the Supabase dashboard SQL editor for the GQ Law project:

```sql
CREATE TABLE lien_assessments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  notes text,
  role text NOT NULL,
  project_type text NOT NULL,
  county text,
  contract_value numeric,
  amount_paid numeric,
  amount_outstanding numeric,
  last_work_date date,
  filing_deadline date,
  days_remaining integer,
  pre_lien_notice_sent text,
  notice_date date,
  notice_recipients text,
  written_contract boolean,
  lien_waivers text,
  overall_rating text NOT NULL,
  factors_passed integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE lien_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts"
  ON lien_assessments
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

- [ ] **Step 3: Verify compilation and build**

Run: `cd ~/Projects/GQLaw-v9 && npx tsc --noEmit && npm run build`

- [ ] **Step 4: Commit and push**

```bash
cd ~/Projects/GQLaw-v9
git add src/sections/LienPredictor.tsx
git commit -m "feat(lien-predictor): update homepage CTA to link to predictor tool"
git push origin main
```

---

## Post-Implementation Verification

- [ ] Navigate to `/lien-predictor` and complete all 4 steps
- [ ] Verify public project redirects at Step 2
- [ ] Verify GC path skips pre-lien notice questions
- [ ] Verify sub/supplier path shows pre-lien notice questions
- [ ] Verify results page shows correct gauge, metrics, and factors
- [ ] Verify "Save & Share" modal opens and saves to Supabase
- [ ] Verify homepage CTA links to `/lien-predictor`
- [ ] Build passes with zero errors
- [ ] Vercel deployment works
