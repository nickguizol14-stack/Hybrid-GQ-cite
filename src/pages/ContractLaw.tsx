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
    label: 'Years Focused',
    description:
      'Three decades of drafting and litigating commercial contracts across Oklahoma.',
    isNumber: true,
  },
  {
    value: 'Author',
    label: 'LexisNexis Treatise',
    description:
      'Authored the definitive bar treatise on Oklahoma construction law.',
    isNumber: false,
  },
  {
    value: '13 Years',
    label: 'Fortune 500 Business',
    description:
      'Business experience that informs practical, commercial-minded contract drafting.',
    isNumber: false,
  },
  {
    value: 100,
    label: 'Attorneys Trained',
    description:
      'Teaching contract best practices through CLE courses across Oklahoma.',
    isNumber: true,
    suffix: '+',
  },
];

const services = [
  {
    icon: FileText,
    title: 'Contract Drafting',
    description:
      'Custom agreements tailored to your specific transaction, industry, and risk profile. Never template-based.',
  },
  {
    icon: Search,
    title: 'Contract Review',
    description:
      'Detailed analysis of proposed agreements identifying hidden risks, missing protections, and unfavorable terms before you sign.',
  },
  {
    icon: Scale,
    title: 'Contract Negotiation',
    description:
      'Strategic negotiation of terms, representations, warranties, and indemnification provisions that protect your position.',
  },
  {
    icon: Shield,
    title: 'Breach of Contract',
    description:
      'Aggressive pursuit of damages when the other side fails to perform, or defense when claims are brought against you.',
  },
  {
    icon: Gavel,
    title: 'Dispute Resolution',
    description:
      'Mediation, arbitration, and litigation strategy tailored to the most efficient path to resolution.',
  },
  {
    icon: BookOpen,
    title: 'Non-Compete & Employment',
    description:
      'Drafting and enforcing restrictive covenants, non-competes, and employment agreements that Oklahoma courts will uphold.',
  },
];

const overviewParagraphs = [
  'A contract is only as strong as the language it contains. Too many Oklahoma businesses rely on generic templates or handshake agreements that leave critical terms undefined. When a dispute arises, ambiguous language becomes your opponent\'s best weapon.',
  'Gary Quinnett approaches every contract with the perspective of someone who has spent 13 years in Fortune 500 business operations and 34 years in litigation. He knows how contracts fail because he has litigated the consequences hundreds of times. That perspective shapes every clause, every definition, every risk allocation.',
  'Whether you need a complex construction contract reviewed before signing, a commercial lease negotiated to protect your interests, or a non-compete agreement that will hold up in Oklahoma courts, the approach is always the same: precise language, clear risk allocation, and enforceable terms.',
  'Oklahoma follows the plain meaning rule for contract interpretation (Oklahoma Uniform Commercial Code, 12A O.S. Section 2-202). If your contract says what it means, courts will enforce it. If it does not, you are at the mercy of interpretation. Gary makes sure your contracts say exactly what they mean.',
];

const whoWeRepresent = [
  'Business Owners',
  'Contractors & Subcontractors',
  'Commercial Landlords & Tenants',
  'Buyers & Sellers',
  'Partners & Joint Ventures',
  'Corporate Officers & Boards',
];

const processSteps = [
  {
    title: 'Consultation',
    description:
      'Initial assessment of your contract needs and timeline.',
  },
  {
    title: 'Strategy',
    description:
      'Clear plan for drafting, review, or dispute resolution.',
  },
  {
    title: 'Execution',
    description:
      'Precise drafting and aggressive advocacy with Gary\'s direct involvement.',
  },
  {
    title: 'Resolution',
    description:
      'Enforceable agreements or favorable outcomes backed by 34 years of experience.',
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
];

const faqs = [
  {
    question: 'What should I look for before signing a commercial contract in Oklahoma?',
    answer:
      'Every commercial contract should clearly define the scope of work, payment terms, timeline, liability limitations, dispute resolution mechanisms, and termination provisions. In Oklahoma, courts enforce the plain meaning of contract language (12A O.S. Section 2-202), so ambiguous terms work against you. Have an attorney review the agreement before signing.',
  },
  {
    question: 'What constitutes a breach of contract in Oklahoma?',
    answer:
      'A breach occurs when one party fails to perform a material obligation under the agreement without legal excuse. Oklahoma recognizes both material breach (which excuses the other party\'s performance) and minor breach (which entitles the non-breaching party to damages but does not discharge the contract). The distinction matters significantly for your legal options.',
  },
  {
    question: 'Are verbal contracts enforceable in Oklahoma?',
    answer:
      'Yes, with limitations. Oklahoma\'s Statute of Frauds (15 O.S. Section 136) requires certain contracts to be in writing, including real estate transactions, agreements that cannot be performed within one year, and contracts for goods over $500. All other verbal agreements are technically enforceable, though proving their terms in court is significantly more difficult.',
  },
  {
    question: 'How long do I have to sue for breach of contract in Oklahoma?',
    answer:
      'Oklahoma\'s statute of limitations for written contracts is 5 years from the date of breach (12 O.S. Section 95). For oral contracts, the limitation is 3 years. Missing these deadlines permanently bars your claim, regardless of its merit.',
  },
  {
    question: 'Can I include a non-compete clause in an employment contract in Oklahoma?',
    answer:
      'Yes, but Oklahoma courts scrutinize non-compete agreements carefully. To be enforceable, the restriction must be reasonable in geographic scope, duration, and the activities restricted. Overly broad non-competes are routinely struck down. Gary drafts non-competes that balance protection with enforceability.',
  },
];

const relatedPractices = [
  {
    title: 'Construction Law',
    description:
      'Contract drafting and disputes for the construction industry.',
    href: '/construction-law',
  },
  {
    title: 'Mergers & Acquisitions',
    description:
      'Deal structuring, due diligence, and transaction agreements.',
    href: '/mergers-and-acquisitions',
  },
  {
    title: 'Real Estate Law',
    description:
      'Purchase agreements, leases, and commercial transactions.',
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
        title="Oklahoma Contract Law Attorney"
        description="Experienced contract drafting, review, negotiation, and dispute resolution for Oklahoma businesses. 34 years of protecting commercial interests."
        path="/contract-law"
      />

      <PracticeHero
        title="Contract Law"
        titleAccent="."
        subtitle="Every business relationship starts with a contract. Gary Quinnett brings 34 years of legal precision and 13 years of Fortune 500 business experience to ensure your agreements protect what matters most."
        backgroundImage="/hero-image.jpg"
      />

      <AuthorityStrip credentials={credentials} />

      <PracticeOverview
        title="Contracts That"
        titleAccent="Protect You."
        paragraphs={overviewParagraphs}
        statuteRef="12A O.S. Section 2-202"
        listTitle="Who We Represent"
        listIcon={Briefcase}
        listItems={whoWeRepresent}
        ctaText="Discuss Your Contract Matter"
      />

      <ServicesGrid
        title="Contract Law Services"
        subtitle="Precise legal counsel for drafting, negotiation, and enforcement of business agreements."
        services={services}
      />

      <ProcessSteps steps={processSteps} />

      <PracticeTestimonials testimonials={testimonials} />

      <PracticeFAQ faqs={faqs} schemaEnabled />

      <RelatedPractices practices={relatedPractices} />

      <PracticeCTA
        title="Ready to Protect Your Business?"
        description="Schedule a consultation with Gary Quinnett. 34 years of Oklahoma contract law. Precise, aggressive, effective."
      />
    </motion.div>
  );
};

export default ContractLaw;
