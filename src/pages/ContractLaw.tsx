import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import {
  FileText,
  Search,
  Scale,
  Shield,
  Gavel,
  BookOpen,
  Briefcase,
  FileCheck,
  Users,
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

const credentials = [
  {
    value: 34,
    label: 'Years in Practice',
    description:
      'Drafting, negotiating, and litigating commercial contracts across every Oklahoma industry.',
    isNumber: true,
  },
  {
    value: '13 Years',
    label: 'Fortune 500 Business',
    description:
      'Corporate operations experience that shapes how Gary reads, writes, and fights over contracts.',
    isNumber: false,
  },
  {
    value: 'Author',
    label: 'LexisNexis Treatise',
    description:
      'Wrote the authoritative bar reference on Oklahoma construction contracts and lien law.',
    isNumber: false,
  },
  {
    value: 'UCC',
    label: 'Expert, Articles 1-9',
    description:
      'Deep command of Oklahoma\'s Uniform Commercial Code from sales to secured transactions.',
    isNumber: false,
  },
];

const services = [
  {
    icon: FileText,
    title: 'Contract Drafting & Negotiation',
    description:
      'Custom agreements built from litigation experience. Gary has seen how contracts fail in court hundreds of times. That shapes every clause, every definition, every risk allocation he writes.',
    statute: 'Oklahoma plain meaning rule',
  },
  {
    icon: Search,
    title: 'Contract Review & Risk Analysis',
    description:
      'Line-by-line analysis of proposed agreements before you sign. Identifying ambiguities, missing protections, unfavorable indemnification, and terms that Oklahoma courts have struck down.',
  },
  {
    icon: Shield,
    title: 'Breach of Contract Litigation',
    description:
      'Aggressive pursuit when the other side fails to perform, or strategic defense when claims are brought against you. Material breach, anticipatory repudiation, and specific performance actions.',
    statute: '12 O.S. Section 95',
  },
  {
    icon: BookOpen,
    title: 'UCC & Commercial Transactions',
    description:
      'Sales (Article 2), leases (Article 2A), secured transactions (Article 9), negotiable instruments (Article 3), and letters of credit (Article 5). Full command of Oklahoma\'s commercial code.',
    statute: '12A O.S.',
  },
  {
    icon: Users,
    title: 'Non-Compete & Employment Agreements',
    description:
      'Restrictive covenants, non-solicitation, confidentiality, and employment agreements drafted to the limits Oklahoma courts will enforce. Overly broad restrictions get struck down. Gary knows the line.',
  },
  {
    icon: FileCheck,
    title: 'Business Formation & Governance',
    description:
      'Operating agreements, partnership agreements, shareholder agreements, and corporate bylaws. Structuring business relationships so the contract works before the dispute starts.',
  },
];

const overviewParagraphs = [
  'Every contract dispute comes down to one question: what did the parties mean? Oklahoma courts follow 14 specific rules to answer that question, from the plain meaning doctrine to the parol evidence rule to the principle that ambiguous language is construed against the drafter. Gary Quinnett knows these rules because he has litigated them for 34 years.',
  'That litigation experience is what separates Gary\'s contract drafting from template-based lawyering. He does not draft contracts to look good on paper. He drafts them to survive a courtroom challenge. Every defined term, every performance obligation, every remedy provision is written with the knowledge of how Oklahoma judges and juries interpret contract language.',
  'Before becoming an attorney, Gary spent 13 years in Fortune 500 corporate operations. He reads contracts the way a business operator reads them: what does this cost me, what happens if they do not perform, and how fast can I get out if things go wrong. That commercial instinct, combined with his command of Oklahoma\'s Uniform Commercial Code (12A O.S.), produces contracts that work in the real world.',
  'Oklahoma requires certain contracts to be in writing under the Statute of Frauds (15 O.S. Section 136), including real estate transactions, agreements exceeding one year, and sales of goods over $500. For all other agreements, courts recognize both written and oral contracts. But proving the terms of an oral deal in court is a fight Gary has won and lost. He recommends putting it in writing. Every time.',
];

const whoWeRepresent = [
  'Business Owners & Operators',
  'General Contractors & Subcontractors',
  'Commercial Landlords & Tenants',
  'Buyers & Sellers of Businesses',
  'Partners & Joint Venture Participants',
  'Corporate Officers & Board Members',
];

const processSteps = [
  {
    title: 'Consultation',
    description:
      'Gary reviews your contract situation, identifies the core issue, and evaluates your position under Oklahoma law.',
  },
  {
    title: 'Analysis',
    description:
      'Detailed review of the agreement, relevant statutes, and comparable case outcomes to build your strategy.',
  },
  {
    title: 'Action',
    description:
      'Precise drafting, aggressive negotiation, or litigation with Gary\'s direct and personal involvement.',
  },
  {
    title: 'Resolution',
    description:
      'An enforceable agreement, a favorable settlement, or a courtroom verdict. 34 years of results behind every move.',
  },
];

const testimonials = [
  {
    quote:
      'We faced a nasty breach of contract suit from a vendor. Gary and his team dismantled their claims before we ever saw a courtroom.',
    author: 'Business Owner',
    location: 'Moore',
  },
  {
    quote:
      'Their team completely restructured our corporate governance. We are now positioned for serious growth without the liability risk.',
    author: 'President, Manufacturing Corp',
    location: 'Broken Arrow',
  },
  {
    quote:
      'I can\'t count how many times Gary has saved me a fortune in legal disputes. Would never use a different lawyer.',
    author: 'Contractor',
    location: 'Oklahoma City',
  },
];

const faqs = [
  {
    question: 'What are Oklahoma\'s rules for interpreting a written contract?',
    answer:
      'Oklahoma courts follow 14 specific rules when interpreting contracts. The most critical: contracts must be read as a whole, not clause by clause. Plain language is given its ordinary meaning unless technical terms are used. If the language is unambiguous, courts apply the "four corners" doctrine and will not consider outside evidence. If it is ambiguous, courts may consider the parties\' conduct, custom, and past dealings to determine intent. Ambiguous language is construed against the party that drafted the contract.',
    statute: 'Oklahoma contract interpretation doctrine',
  },
  {
    question: 'What is the statute of limitations for breach of contract in Oklahoma?',
    answer:
      'For written contracts, you have 5 years from the date of breach to file suit (12 O.S. Section 95). For oral contracts, the limitation is 3 years. These deadlines are strict. If you miss them, your claim is permanently barred regardless of its merit. If you suspect a breach, consult an attorney before the clock runs out.',
    statute: '12 O.S. Section 95',
  },
  {
    question: 'Does Oklahoma require certain contracts to be in writing?',
    answer:
      'Yes. Oklahoma\'s Statute of Frauds (15 O.S. Section 136) requires a writing for: real estate transactions, agreements that cannot be performed within one year, promises to pay the debt of another, and contracts for the sale of goods over $500 (under the UCC). Verbal agreements outside these categories are enforceable, but proving their terms in court is significantly harder.',
    statute: '15 O.S. Section 136',
  },
  {
    question: 'What damages can I recover for breach of contract in Oklahoma?',
    answer:
      'Oklahoma allows recovery of compensatory damages (the benefit you would have received had the contract been performed), consequential damages (foreseeable losses caused by the breach), and in some cases, attorney fees if the contract includes a fee-shifting provision. Punitive damages are generally not available for breach of contract unless the breach also constitutes an independent tort such as fraud.',
    statute: '23 O.S. Section 21',
  },
  {
    question: 'What is the UCC and how does it affect my business contracts in Oklahoma?',
    answer:
      'The Uniform Commercial Code (12A O.S.) governs commercial transactions in Oklahoma, including the sale of goods (Article 2), leases (Article 2A), negotiable instruments (Article 3), bank deposits (Article 4), secured transactions (Article 9), and more. The UCC fills in gaps that your contract does not address, and some UCC provisions apply even if your contract tries to override them. Understanding how the UCC interacts with your agreements is essential.',
    statute: '12A O.S.',
  },
  {
    question: 'Are non-compete agreements enforceable in Oklahoma?',
    answer:
      'Oklahoma allows non-competes but scrutinizes them carefully. The restriction must be reasonable in geographic scope, duration (typically 1-2 years), and the activities restricted. Courts will not rewrite an overbroad non-compete to make it enforceable. If your agreement is struck down, you lose the protection entirely. Gary drafts non-competes calibrated to what Oklahoma courts will actually uphold.',
    statute: '15 O.S. Section 219A',
  },
];

const relatedPractices = [
  {
    title: 'Construction Law',
    description:
      'AIA contracts, ConsensusDocs, payment disputes, and lien claims in the construction industry.',
    href: '/construction-law',
  },
  {
    title: 'Mergers & Acquisitions',
    description:
      'Purchase agreements, asset deals, stock transactions, and post-closing disputes.',
    href: '/mergers-and-acquisitions',
  },
  {
    title: 'Real Estate Law',
    description:
      'Commercial leases, purchase agreements, title work, and property disputes.',
    href: '/real-estate-law',
  },
];

const ContractLaw = () => {
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
        title="Oklahoma Contract Attorney"
        description="34 years of contract drafting, UCC litigation, and breach of contract disputes. Gary Quinnett brings Fortune 500 business experience to every Oklahoma contract matter."
        path="/contract-law"
      />

      <PracticeHero
        title="Contract Law"
        titleAccent="."
        subtitle="Every contract dispute comes down to one question: what did the parties mean? Gary has spent 34 years answering that question in Oklahoma courtrooms, and 13 years in the Fortune 500 learning how contracts work in the real world."
        backgroundImage="/hero-image.jpg"
      />

      <AuthorityStrip credentials={credentials} />

      <PracticeOverview
        title="What Did the"
        titleAccent="Parties Mean?"
        paragraphs={overviewParagraphs}
        statuteRef="15 O.S. Section 136 / 12A O.S."
        listTitle="Who We Represent"
        listIcon={Briefcase}
        listItems={whoWeRepresent}
        ctaText="Discuss Your Contract Matter"
      />

      <ServicesGrid
        title="Contract Law Services"
        subtitle="From initial drafting through courtroom enforcement. Every service informed by 34 years of knowing how contracts succeed and fail under Oklahoma law."
        services={services}
      />

      <ProcessSteps steps={processSteps} />

      <PracticeTestimonials testimonials={testimonials} />

      <PracticeFAQ faqs={faqs} schemaEnabled />

      <RelatedPractices practices={relatedPractices} />

      <PracticeCTA
        title="Ready to Protect Your Business?"
        description="Schedule a consultation with Gary Quinnett. 34 years of Oklahoma contract law, 13 years of Fortune 500 business experience, and a UCC command that covers Articles 1 through 9."
      />
    </motion.div>
  );
};

export default ContractLaw;
