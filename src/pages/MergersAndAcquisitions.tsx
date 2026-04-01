import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import {
  Briefcase,
  FileSearch,
  ShieldCheck,
  Users,
  Scale,
  Cog,
} from 'lucide-react';
import SEO from '../components/SEO';

import PracticeHero from '../components/practice/PracticeHero';
import AuthorityStrip from '../components/practice/AuthorityStrip';
import PracticeOverview from '../components/practice/PracticeOverview';
import ServicesGrid from '../components/practice/ServicesGrid';
import ProcessSteps from '../components/practice/ProcessSteps';
import PracticeTestimonials from '../components/practice/PracticeTestimonials';
import PracticeFAQ from '../components/practice/PracticeFAQ';
import RelatedPractices from '../components/practice/RelatedPractices';
import PracticeCTA from '../components/practice/PracticeCTA';

/* ------------------------------------------------------------------ */
/*  Mergers & Acquisitions Page                                       */
/* ------------------------------------------------------------------ */

const credentials = [
  {
    value: 34,
    label: 'Years Focused',
    description:
      'More than three decades of legal practice dedicated to Oklahoma business and commercial law.',
    isNumber: true as const,
  },
  {
    value: 'Treatise',
    label: 'LexisNexis Author',
    description:
      'Author of the LexisNexis treatise on Oklahoma construction and business law.',
    isNumber: false as const,
  },
  {
    value: '13 Years',
    label: 'Fortune 500 Business',
    description:
      'Gary spent 13 years in the Fortune 500 corporate world before practicing law, giving him firsthand business acumen.',
    isNumber: false as const,
  },
  {
    value: 100,
    label: 'Attorneys Trained',
    description:
      'Exposed more than 100 attorneys to advanced CLE on Oklahoma business law, transactions, and deal structuring.',
    isNumber: true as const,
    suffix: '+',
  },
];

const overviewParagraphs = [
  'Buying or selling a business is one of the most consequential decisions you will ever make. The transaction touches every part of the enterprise: contracts, employees, intellectual property, real estate, tax obligations, and regulatory compliance. Getting any one of those wrong can erode the value of the deal or create liability that persists long after closing.',
  'Gary Quinnett brings a perspective that most transaction attorneys lack. Before practicing law, he spent 13 years in the Fortune 500 corporate world. He understands the financial statements, the operational pressures, and the strategic objectives that drive a deal. That background means he negotiates purchase agreements, employment contracts, and non-competes with an understanding of how businesses actually work, not just how they look on paper.',
  'Oklahoma law governs many aspects of business acquisitions, from the Oklahoma General Corporation Act (18 O.S. 1001 et seq.) to the Oklahoma Uniform Commercial Code for asset transfers. Whether you are structuring an asset purchase, a stock purchase, or a merger, the statutory framework determines your tax treatment, successor liability exposure, and regulatory obligations.',
  'We represent business sellers, buyers, private equity groups, family-owned businesses, management teams, and corporate boards across Oklahoma. Our practice covers the full deal lifecycle from the letter of intent through post-closing integration and dispute resolution.',
];

const services = [
  {
    icon: Briefcase,
    title: 'Deal Structuring (Asset vs. Stock)',
    description:
      'Architecting the transaction to maximize tax efficiency, limit successor liability, and align with your strategic objectives. We analyze the trade-offs between asset purchases and stock purchases for every deal.',
    statute: '18 O.S. 1001 et seq.',
  },
  {
    icon: FileSearch,
    title: 'Due Diligence Review',
    description:
      'A thorough investigation into the target company. We review contracts, employment files, litigation history, regulatory compliance, real estate, intellectual property, and financial records to uncover hidden risks before you commit.',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Allocation & Indemnification',
    description:
      'Drafting definitive purchase agreements that clearly define representations, warranties, indemnification caps, baskets, and survival periods. We structure escrow and holdback provisions that protect your downside.',
  },
  {
    icon: Users,
    title: 'Non-Compete & Employment Agreements',
    description:
      'Drafting enforceable non-competition, non-solicitation, and employment agreements under Oklahoma law. We ensure key personnel stay with the business and critical relationships are protected after closing.',
    statute: '15 O.S. 219A-219B',
  },
  {
    icon: Scale,
    title: 'Corporate Governance',
    description:
      'Advising boards and shareholders on fiduciary duties, shareholder approval requirements, dissenter rights, and corporate formalities required for mergers and acquisitions under the Oklahoma General Corporation Act.',
    statute: '18 O.S. 1081-1091',
  },
  {
    icon: Cog,
    title: 'Post-Closing Integration',
    description:
      'Handling transition services agreements, assignment and assumption of contracts, regulatory notifications, and employee onboarding to ensure the value you purchased stays intact after the closing table.',
  },
];

const processSteps = [
  {
    title: 'Consultation',
    description:
      'We evaluate the transaction, your objectives, and the regulatory landscape to determine the optimal deal structure.',
  },
  {
    title: 'Strategy',
    description:
      'A detailed roadmap covering due diligence scope, deal terms, timeline, and key negotiation points.',
  },
  {
    title: 'Execution',
    description:
      'Drafting and negotiating the LOI, purchase agreement, employment contracts, and ancillary documents through closing.',
  },
  {
    title: 'Resolution',
    description:
      'Post-closing integration support, earnout monitoring, and dispute resolution if issues arise after the deal closes.',
  },
];

const testimonials = [
  {
    quote:
      'Gary understood the business side of our acquisition as well as the legal side. His Fortune 500 background meant he could speak the language of our board and our bankers. That made the entire process faster and smoother.',
    author: 'Business Owner',
    location: 'Oklahoma City, OK',
  },
  {
    quote:
      'We had been through two other law firms before finding Gary. He identified risks in the purchase agreement that nobody else caught and restructured the deal to save us significant tax liability. Worth every penny.',
    author: 'Private Equity Partner',
    location: 'Tulsa, OK',
  },
];

const faqs = [
  {
    question:
      'What is the difference between an asset purchase and a stock purchase?',
    answer:
      'In an asset purchase, the buyer acquires specific assets and assumes only the liabilities it agrees to take on. This gives the buyer more control over what it is purchasing and generally limits successor liability. In a stock purchase, the buyer acquires the ownership interests (stock or membership interests) of the entity, which means it takes on all assets and all liabilities, including unknown liabilities. Asset purchases are more common in small to mid-market transactions because they offer greater flexibility and tax benefits for the buyer, while stock purchases are often preferred by sellers because the gain is typically taxed at capital gains rates.',
  },
  {
    question: 'How long does the M&A due diligence process take?',
    answer:
      'The due diligence process typically takes 30 to 90 days, depending on the size and complexity of the target company. For a straightforward small business acquisition, a focused 30-day review may be sufficient. For larger transactions involving multiple locations, extensive contracts, regulatory compliance issues, or pending litigation, 60 to 90 days is more common. The scope of due diligence should be defined in the letter of intent and should cover financial records, contracts, employment matters, litigation, intellectual property, real estate, tax compliance, and regulatory status.',
  },
  {
    question:
      'What is a representation and warranty in an acquisition?',
    answer:
      'Representations and warranties are statements of fact made by the seller (and sometimes the buyer) in the purchase agreement. The seller represents that certain things are true about the business, such as the accuracy of financial statements, the absence of undisclosed liabilities, compliance with laws, and the enforceability of material contracts. If a representation turns out to be false, the buyer may have a claim for indemnification. The survival period, basket, cap, and escrow provisions determine how long these claims last and how much the buyer can recover. These provisions are among the most heavily negotiated terms in any acquisition.',
  },
  {
    question: 'Do I need a lawyer to sell my business in Oklahoma?',
    answer:
      'While there is no legal requirement to retain an attorney, selling a business without legal counsel is extremely risky. The purchase agreement alone typically runs 40 to 80 pages and contains representations, warranties, indemnification obligations, non-compete covenants, and closing conditions that will bind you for years after the sale. Tax structuring decisions made at the outset can mean the difference between capital gains treatment and ordinary income rates. An experienced M&A attorney will also coordinate with your accountant, financial advisor, and business broker to ensure all aspects of the transaction are handled properly and your interests are protected through closing and beyond.',
  },
];

const relatedPractices = [
  {
    title: 'Construction Law',
    description:
      'Contract drafting, mechanics lien claims, and construction dispute resolution across Oklahoma.',
    href: '/construction-law',
  },
  {
    title: 'Real Estate Law',
    description:
      'Commercial acquisitions, title review, leasing, and quiet title actions for Oklahoma properties.',
    href: '/real-estate-law',
  },
  {
    title: 'Oil & Gas Law',
    description:
      'Lease negotiation, title opinions, OCC regulatory matters, and royalty disputes for Oklahoma energy interests.',
    href: '/oil-and-gas-law',
  },
];

const MergersAndAcquisitions = () => {
  return (
    <motion.div
      className="min-h-screen will-change-transform"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <SEO
        title="Oklahoma Mergers and Acquisitions Attorney"
        description="Deal structuring, due diligence, risk allocation, and post-closing integration for Oklahoma business transactions. 34 years of legal experience with 13 years of Fortune 500 business acumen."
        path="/mergers-and-acquisitions"
      />

      <PracticeHero
        title="Mergers & Acquisitions"
        titleAccent="."
        subtitle="Buying or selling a business is one of the most consequential decisions you'll make. Gary brings 13 years of Fortune 500 business experience and 34 years of legal precision to every deal."
        backgroundImage="/hero-ma.jpg"
      />

      <AuthorityStrip credentials={credentials} />

      <PracticeOverview
        title="Business Transactions With"
        titleAccent="Business Acumen"
        paragraphs={overviewParagraphs}
        statuteRef="Oklahoma General Corporation Act, 18 O.S. 1001 et seq."
        listTitle="Who We Represent"
        listIcon={Briefcase}
        listItems={[
          'Business Sellers',
          'Business Buyers',
          'Private Equity Groups',
          'Family-Owned Businesses',
          'Management Teams',
          'Corporate Boards',
        ]}
        ctaText="Discuss Your Transaction"
      />

      <ServicesGrid
        title="Full-Lifecycle Deal Support"
        subtitle="From the letter of intent through post-closing integration, we handle every phase of your transaction."
        services={services}
      />

      <ProcessSteps steps={processSteps} />

      <PracticeTestimonials testimonials={testimonials} />

      <PracticeFAQ faqs={faqs} />

      <RelatedPractices practices={relatedPractices} />

      <PracticeCTA
        title="Ready to Close Your Deal?"
        description="Gary Quinnett brings 13 years of Fortune 500 business experience and 34 years of legal precision to every transaction. Let's discuss your deal."
      />
    </motion.div>
  );
};

export default MergersAndAcquisitions;
