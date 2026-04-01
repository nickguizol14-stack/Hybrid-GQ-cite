import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import {
  FileSignature,
  Key,
  Map,
  Home,
  Gavel,
  BookOpen,
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
import { Building2 } from 'lucide-react';

const credentials = [
  {
    value: 34,
    label: 'Years Focused',
    description:
      'Over three decades of real estate law practice serving Oklahoma owners, developers, and investors.',
    isNumber: true,
  },
  {
    value: 'LexisNexis',
    label: 'Treatise Author',
    description:
      'Author of the LexisNexis treatise on Oklahoma construction and real property law.',
    isNumber: false,
  },
  {
    value: '13 Years',
    label: 'Fortune 500 Business',
    description:
      'Gary spent 13 years in Fortune 500 corporate environments before practicing law, bringing real business acumen to every transaction.',
    isNumber: false,
  },
  {
    value: 100,
    label: 'Attorneys Trained',
    description:
      'Trusted by the Oklahoma legal community to teach CLE courses on real estate and title issues.',
    isNumber: true,
    suffix: '+',
  },
];

const services = [
  {
    icon: FileSignature,
    title: 'Purchase & Sale Agreements',
    description:
      'Drafting, reviewing, and negotiating purchase and sale agreements for commercial and residential properties. We ensure every contingency is addressed and your interests are protected from letter of intent through closing.',
    statute: 'Okla. Stat. tit. 16, Conveyances',
  },
  {
    icon: Key,
    title: 'Commercial Leasing',
    description:
      'Representing landlords and tenants in retail, office, and industrial lease negotiations. From triple net structures to build-out allowances, we draft leases that protect your position for the full term.',
  },
  {
    icon: BookOpen,
    title: 'Title Review & Curative Work',
    description:
      'Thorough title examination and curative work to identify and resolve defects, encumbrances, and clouds on title before they become deal-killers. We trace ownership chains and clear the path to closing.',
    statute: 'Okla. Stat. tit. 16, SS 71-81',
  },
  {
    icon: Map,
    title: 'Land Use & Zoning',
    description:
      'Navigating municipal zoning codes, variance applications, special use permits, and comprehensive plan amendments. We work with local planning commissions to unlock the full development potential of your property.',
  },
  {
    icon: Home,
    title: 'Quiet Title Actions',
    description:
      'Filing and prosecuting quiet title actions to establish clear ownership and resolve competing claims. Whether the issue is a missing heir, a gap in the chain of title, or adverse possession, we clear the cloud.',
    statute: 'Okla. Stat. tit. 12, SS 1141',
  },
  {
    icon: Gavel,
    title: 'Real Estate Dispute Resolution',
    description:
      'Litigating boundary disputes, easement conflicts, breach of contract claims, and specific performance actions. When a deal goes sideways, we bring the preparation and leverage to protect your investment.',
  },
];

const overviewParagraphs = [
  'Real estate is often the most valuable asset a person or business will ever hold. Whether you are acquiring a commercial property, negotiating a complex lease, or resolving a title dispute, the legal work must be precise. A single oversight in contract language or title examination can cost millions and create problems that take years to unwind.',
  'Gary Quinnett brings a unique combination of legal expertise and business experience to Oklahoma real estate law. Before practicing law, Gary spent 13 years in Fortune 500 corporate environments, giving him a perspective on transactions that most attorneys simply do not have. He understands not just the legal mechanics, but the business realities that drive every deal.',
  'Oklahoma real estate transactions are governed by Title 16 of the Oklahoma Statutes, along with a body of case law that covers everything from conveyance requirements to recording priorities. Title issues in Oklahoma can be particularly complex due to the state\'s unique history, including original land patent grants, allotment restrictions, and the interplay between state and federal law on certain properties.',
  'Whether you are a commercial developer planning a new project, an investor building a portfolio, or a landowner dealing with a boundary dispute or title defect, Gary provides the thorough analysis and strategic counsel needed to protect your investment and move your transaction forward with confidence.',
];

const whoWeRepresent = [
  'Commercial Developers',
  'Property Investors',
  'Landlords & Tenants',
  'Homebuilders',
  'Land Owners',
  'HOAs & Property Managers',
];

const processSteps = [
  {
    title: 'Consultation',
    description:
      'We review your property, transaction, or dispute to understand the full picture and identify key issues.',
  },
  {
    title: 'Strategy',
    description:
      'We develop a clear legal and business strategy aligned with your investment goals and timeline.',
  },
  {
    title: 'Execution',
    description:
      'We draft documents, conduct due diligence, negotiate terms, or file actions with precision and urgency.',
  },
  {
    title: 'Resolution',
    description:
      'We close the deal, clear the title, or resolve the dispute to protect your investment for the long term.',
  },
];

const testimonials = [
  {
    quote:
      'Gary handled a complex commercial acquisition for us that involved multiple parcels and a challenging title history. His thoroughness saved us from a six-figure problem that the seller\'s team had missed entirely.',
    author: 'Jennifer L.',
    location: 'Oklahoma City, OK',
  },
];

const faqs = [
  {
    question: 'What is a quiet title action in Oklahoma?',
    answer:
      'A quiet title action is a lawsuit filed in Oklahoma district court to establish clear ownership of real property and eliminate competing claims. It is commonly used when there are gaps in the chain of title, missing heirs, old unreleased mortgages, or adverse possession claims. The action names all potential claimants as defendants and, upon judgment, gives the plaintiff a court order confirming their ownership. Quiet title actions are frequently necessary before a property can be sold or financed because title insurance companies require a clear chain of ownership.',
    statute: 'Okla. Stat. tit. 12, SS 1141',
  },
  {
    question:
      'How long does a commercial real estate closing take in Oklahoma?',
    answer:
      'A typical commercial real estate closing in Oklahoma takes 30 to 90 days from executed purchase agreement to closing, though complex transactions can take longer. The timeline depends on several factors including the scope of due diligence, title examination and curative work, environmental assessments, survey requirements, financing contingencies, and tenant estoppel collection for income properties. Working with experienced counsel from the outset helps identify potential delays early and keep the transaction on schedule.',
  },
  {
    question: 'What should I look for in a commercial lease review?',
    answer:
      'A commercial lease review should examine several critical provisions. These include the rent structure and escalation clauses, the allocation of operating expenses (especially in triple net leases), maintenance and repair obligations, permitted use restrictions, assignment and subletting rights, default and remedy provisions, and lease renewal or termination options. For tenants, understanding your build-out allowance, co-tenancy protections, and exclusive use provisions is essential. For landlords, the lease should address personal guarantees, security deposits, and insurance requirements. Every commercial lease is a negotiation, and the initial draft is rarely the final word.',
  },
  {
    question:
      'Do I need a lawyer for a real estate transaction in Oklahoma?',
    answer:
      'Oklahoma does not legally require an attorney for real estate transactions, but the risks of proceeding without one are significant. Real estate contracts contain complex provisions regarding contingencies, representations, warranties, and remedies that can have lasting financial consequences. Title issues unique to Oklahoma, including restrictions on certain allotment lands and complex mineral rights questions, require legal expertise that title companies and real estate agents are not equipped to provide. For commercial transactions, the stakes and complexity make legal counsel essential. Even for residential purchases, an attorney review of the contract and title commitment can identify problems that save thousands of dollars.',
  },
];

const relatedPractices = [
  {
    title: 'Construction Law',
    description:
      'Contract drafting, mechanics liens, payment bond claims, and construction defect litigation for Oklahoma contractors and owners.',
    href: '/construction-law',
  },
  {
    title: 'Oil & Gas Law',
    description:
      'Lease negotiation, title opinions, OCC regulatory work, and royalty disputes for Oklahoma energy stakeholders.',
    href: '/oil-and-gas-law',
  },
  {
    title: 'Mergers & Acquisitions',
    description:
      'Deal structuring, due diligence, and risk allocation for business buyers, sellers, and private equity groups.',
    href: '/mergers-and-acquisitions',
  },
];

const RealEstateLaw = () => {
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
        title="Oklahoma Real Estate Attorney"
        description="Comprehensive real estate legal counsel for developers, investors, and property owners. Purchase agreements, commercial leasing, title work, quiet title actions, and dispute resolution. 34 years of Oklahoma real estate law experience."
        path="/real-estate-law"
      />

      <PracticeHero
        title="Oklahoma Real Estate Law"
        titleAccent="."
        subtitle="34 years of protecting what you've built. From complex acquisitions to title disputes, with the business acumen of 13 years in the Fortune 500."
        backgroundImage="/hero-realestate.jpg"
      />

      <AuthorityStrip credentials={credentials} />

      <PracticeOverview
        title="Protecting"
        titleAccent="Your Investment."
        paragraphs={overviewParagraphs}
        statuteRef="Primary statutory framework: Okla. Stat. tit. 16, Conveyances and Real Property"
        listTitle="Who We Represent"
        listIcon={Building2}
        listItems={whoWeRepresent}
        ctaText="Discuss Your Real Estate Matter"
      />

      <ServicesGrid
        title="Real Estate Law Services"
        subtitle="Strategic legal counsel for every phase of the real estate lifecycle."
        services={services}
      />

      <ProcessSteps steps={processSteps} />

      <PracticeTestimonials testimonials={testimonials} />

      <PracticeFAQ faqs={faqs} schemaEnabled />

      <RelatedPractices practices={relatedPractices} />

      <PracticeCTA
        title="Ready to Secure Your Investment?"
        description="Your real estate matters deserve experienced counsel. Schedule a consultation with Gary Quinnett and get the legal clarity your transaction or dispute requires."
      />
    </motion.div>
  );
};

export default RealEstateLaw;
