// src/lib/resources-data.ts

export type ResourceType = 'guide' | 'checklist' | 'reference';
export type PracticeCategory = 'construction' | 'oil-gas' | 'real-estate' | 'contracts' | 'general';

export interface Resource {
  slug: string;
  title: string;
  excerpt: string;
  type: ResourceType;
  category: PracticeCategory;
  categoryLabel: string;
  readTime: string;
  relatedPractice: string;
  relatedPracticeHref: string;
}

export const TYPE_LABELS: Record<ResourceType, string> = {
  guide: 'Guide',
  checklist: 'Checklist',
  reference: 'Oklahoma Law Reference',
};

export const CATEGORY_LABELS: Record<PracticeCategory, string> = {
  construction: 'Construction Law',
  'oil-gas': 'Oil & Gas Law',
  'real-estate': 'Real Estate Law',
  contracts: 'Contract Law',
  general: 'General',
};

export const resources: Resource[] = [
  // CONSTRUCTION LAW
  {
    slug: 'oklahoma-mechanics-lien-laws',
    title: 'Key Oklahoma Laws on Mechanics and Materialmen\'s Liens',
    excerpt: 'A section-by-section breakdown of Oklahoma Title 42, Sections 141 through 153. Filing requirements, deadlines, pre-lien notice rules, subcontractor rights, trust fund provisions, and penalties for fraudulent statements.',
    type: 'reference',
    category: 'construction',
    categoryLabel: 'Construction Law',
    readTime: '12 min read',
    relatedPractice: 'Construction Law',
    relatedPracticeHref: '/construction-law',
  },
  {
    slug: 'construction-bond-claims-oklahoma',
    title: 'Construction Bond Claims in Oklahoma: A Practical Guide',
    excerpt: 'When mechanics liens are not available, payment bond claims provide an alternative path to recovery. How performance bonds and payment bonds work, when to file a bond claim notice, and what happens after the surety company investigates.',
    type: 'guide',
    category: 'construction',
    categoryLabel: 'Construction Law',
    readTime: '8 min read',
    relatedPractice: 'Construction Law',
    relatedPracticeHref: '/construction-law',
  },

  // OIL & GAS
  {
    slug: 'oklahoma-surface-damage-agreements',
    title: 'Oklahoma Surface Damage Agreements: What Landowners and Operators Need to Know',
    excerpt: 'The Oklahoma Surface Damages Act (Title 52, Sections 318.2 through 318.9) governs the relationship between drilling operators and surface owners. Bond requirements, notice obligations, the appraisal process, and treble damage penalties.',
    type: 'guide',
    category: 'oil-gas',
    categoryLabel: 'Oil & Gas Law',
    readTime: '10 min read',
    relatedPractice: 'Oil & Gas Law',
    relatedPracticeHref: '/oil-and-gas-law',
  },
  {
    slug: 'oklahoma-surface-damage-laws',
    title: 'Key Oklahoma Laws on Surface Damages',
    excerpt: 'The complete statutory framework governing surface damage compensation in Oklahoma. Definitions, notice requirements, bonding obligations, the three-appraiser process, jury trial rights, and treble damage penalties for willful violations.',
    type: 'reference',
    category: 'oil-gas',
    categoryLabel: 'Oil & Gas Law',
    readTime: '10 min read',
    relatedPractice: 'Oil & Gas Law',
    relatedPracticeHref: '/oil-and-gas-law',
  },
  {
    slug: 'royalty-payment-audit-checklist',
    title: 'Royalty Payment Audit Checklist for Oklahoma Mineral Owners',
    excerpt: 'A practical framework for verifying your royalty payments are accurate. How to compare OCC operator reports, Tax Commission purchaser reports, and your own records to identify discrepancies in volume, pricing, and improper deductions.',
    type: 'checklist',
    category: 'oil-gas',
    categoryLabel: 'Oil & Gas Law',
    readTime: '6 min read',
    relatedPractice: 'Oil & Gas Law',
    relatedPracticeHref: '/oil-and-gas-law',
  },

  // REAL ESTATE
  {
    slug: 'oklahoma-statute-of-frauds',
    title: 'Oklahoma Statute of Frauds: Which Contracts Must Be in Writing',
    excerpt: 'Oklahoma\'s Statute of Frauds (15 O.S. Section 136) requires certain agreements to be in writing to be enforceable. Real estate transactions, long-term agreements, guaranty obligations, and the agent authority requirements that apply.',
    type: 'reference',
    category: 'real-estate',
    categoryLabel: 'Real Estate Law',
    readTime: '7 min read',
    relatedPractice: 'Real Estate Law',
    relatedPracticeHref: '/real-estate-law',
  },
  {
    slug: 'commercial-lease-tenant-checklist',
    title: 'The Tenant\'s Checklist: 14 Points to Negotiate Before Signing a Commercial Lease',
    excerpt: 'Pre-drafted landlord leases favor the property owner. This 14-point checklist covers rent increases, renewal options, signage rights, personal guarantees, competitive restrictions, and tenant improvement allowances.',
    type: 'checklist',
    category: 'real-estate',
    categoryLabel: 'Real Estate Law',
    readTime: '8 min read',
    relatedPractice: 'Real Estate Law',
    relatedPracticeHref: '/real-estate-law',
  },

  // CONTRACT LAW
  {
    slug: 'oklahoma-contract-interpretation-rules',
    title: 'The 14 Rules Oklahoma Courts Use to Interpret Written Contracts',
    excerpt: 'When a contract dispute reaches the courtroom, Oklahoma courts apply 14 specific principles to determine what the parties meant. The plain meaning doctrine, the parol evidence rule, the four corners analysis, and how ambiguity is resolved.',
    type: 'reference',
    category: 'contracts',
    categoryLabel: 'Contract Law',
    readTime: '9 min read',
    relatedPractice: 'Contract Law',
    relatedPracticeHref: '/contract-law',
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find(r => r.slug === slug);
}

export function getResourcesByCategory(category: PracticeCategory): Resource[] {
  return resources.filter(r => r.category === category);
}

export function getResourcesByType(type: ResourceType): Resource[] {
  return resources.filter(r => r.type === type);
}
