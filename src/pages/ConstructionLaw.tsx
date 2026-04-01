import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import {
  FileText,
  Hammer,
  Shield,
  HardHat,
  Scale,
  Gavel,
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
      'Over three decades of concentrated practice in Oklahoma construction law.',
    isNumber: true,
  },
  {
    value: 'LexisNexis',
    label: 'Treatise Author',
    description:
      'Author of the LexisNexis treatise on Oklahoma construction and lien law.',
    isNumber: false,
  },
  {
    value: 'Published',
    label: 'M&M Lien Book',
    description:
      'Wrote and published the definitive guide to Oklahoma Mechanics and Materialmen\'s Lien law.',
    isNumber: false,
  },
  {
    value: 100,
    label: 'Attorneys Trained',
    description:
      'Trusted by the legal community to teach CLE courses on construction law and lien practice.',
    isNumber: true,
    suffix: '+',
  },
];

const services = [
  {
    icon: FileText,
    title: 'Contract Drafting & Review',
    description:
      'Drafting, reviewing, and negotiating AIA, ConsensusDocs, and custom construction contracts to protect your margins and allocate risk before the first shovel hits dirt.',
    statute: 'Okla. Stat. tit. 15, Contract Law',
  },
  {
    icon: Hammer,
    title: 'Mechanics Lien Claims',
    description:
      'Filing, perfecting, and enforcing Mechanics and Materialmen\'s Liens under Oklahoma\'s Title 42. Gary literally wrote the book on this process.',
    statute: 'Okla. Stat. tit. 42, SS 141-153',
  },
  {
    icon: Shield,
    title: 'Payment Bond Claims',
    description:
      'Pursuing payment bond claims on public projects where lien rights do not apply. Holding sureties accountable when general contractors fail to pay.',
    statute: 'Okla. Stat. tit. 61, SS 1-2',
  },
  {
    icon: Scale,
    title: 'Construction Defect Litigation',
    description:
      'Prosecuting and defending construction defect claims with technical precision. From foundation issues to envelope failures, we handle the complex disputes.',
  },
  {
    icon: HardHat,
    title: 'OSHA Defense & Compliance',
    description:
      'Defending against OSHA citations and building compliance programs that keep your job sites running and your workers safe.',
  },
  {
    icon: Gavel,
    title: 'Dispute Resolution',
    description:
      'Mediation, arbitration, and litigation of construction disputes. When negotiations stall, we bring the leverage and preparation to resolve the matter.',
  },
];

const overviewParagraphs = [
  'Oklahoma construction law is governed by a complex framework of statutes, regulations, and case law that touches every phase of a project. From the initial bid to final closeout, legal issues can arise that threaten schedules, budgets, and business relationships. Understanding these issues before they become disputes is the foundation of effective construction law practice.',
  'Gary Quinnett has spent over three decades in the construction law trenches. He wrote the LexisNexis treatise on Oklahoma construction law and authored the Oklahoma Mechanics and Materialmen\'s Lien Book. When other attorneys have questions about lien deadlines, bond claims, or contract risk allocation, they call Gary.',
  'Oklahoma\'s lien statutes under Title 42 provide powerful tools for contractors, subcontractors, and suppliers to secure payment for work performed. But these rights come with strict procedural requirements. Pre-lien notices, filing deadlines, and enforcement timelines must be followed precisely, or the right to payment can be lost entirely.',
  'Whether you are a general contractor protecting margins on a multimillion-dollar project, a subcontractor fighting for payment you have earned, or a property owner managing risk on new construction, Gary brings the depth of knowledge and courtroom experience to protect your interests at every stage.',
];

const whoWeRepresent = [
  'General Contractors',
  'Subcontractors',
  'Material Suppliers',
  'Property Owners',
  'Architects & Engineers',
  'Equipment Rental Companies',
];

const processSteps = [
  {
    title: 'Consultation',
    description:
      'We review your project, contracts, and situation to identify risks and opportunities.',
  },
  {
    title: 'Strategy',
    description:
      'We develop a clear legal strategy tailored to your goals, timeline, and budget.',
  },
  {
    title: 'Execution',
    description:
      'We implement the plan with precision, whether that means filing liens, negotiating, or litigating.',
  },
  {
    title: 'Resolution',
    description:
      'We drive the matter to a conclusion that protects your project and your bottom line.',
  },
];

const testimonials = [
  {
    quote:
      'Gary saved our company over $400,000 on a lien claim that two other firms said was dead. He found the path forward when nobody else could.',
    author: 'Mike R.',
    location: 'Oklahoma City, OK',
  },
  {
    quote:
      'We had a payment dispute on a major commercial project and Gary\'s knowledge of lien law was unmatched. He got us paid in full.',
    author: 'David T.',
    location: 'Tulsa, OK',
  },
];

const faqs = [
  {
    question: 'How do I file a mechanics lien in Oklahoma?',
    answer:
      'Filing a mechanics lien in Oklahoma requires several steps. First, you must provide a pre-lien notice within 75 days of last furnishing labor or materials. Then, the lien statement must be filed with the county clerk in the county where the property is located within 90 days of last furnishing. The lien statement must include specific information including the amount claimed, the property description, and the name of the property owner. An action to enforce the lien must be filed within one year of the last date of furnishing.',
    statute: 'Okla. Stat. tit. 42, SS 142',
  },
  {
    question: 'What is the deadline for filing a lien in Oklahoma?',
    answer:
      'Oklahoma requires that a mechanics lien statement be filed within 90 days after the last date on which labor was performed or materials were furnished. However, the pre-lien notice requirement has a 75-day deadline from the last date of furnishing. Missing either deadline can result in the permanent loss of your lien rights. These deadlines are strictly enforced by Oklahoma courts, so it is critical to track your dates carefully and act promptly.',
    statute: 'Okla. Stat. tit. 42, SS 142.1',
  },
  {
    question: 'Do I need a lawyer to file a mechanics lien?',
    answer:
      'While Oklahoma law does not require an attorney to file a mechanics lien, the process involves strict statutory requirements that, if not followed precisely, can invalidate your claim. The pre-lien notice, lien statement, and enforcement action all have specific content requirements and deadlines. A single error in the property description, the amount claimed, or the timing of the filing can eliminate your right to payment. Given the complexity and the stakes involved, working with an attorney experienced in Oklahoma lien law is strongly recommended.',
  },
  {
    question: 'Can I file a lien on a public project in Oklahoma?',
    answer:
      'No. Under Oklahoma law, you cannot file a mechanics lien against public property. However, Oklahoma requires payment bonds on most public construction projects. If you are unpaid on a public project, your remedy is a claim against the payment bond posted by the general contractor. Payment bond claims have their own notice and timing requirements that differ from the mechanics lien process. Acting quickly is essential because bond claim deadlines can be shorter than lien filing deadlines.',
    statute: 'Okla. Stat. tit. 61, SS 1',
  },
  {
    question: 'What happens if I miss the pre-lien notice deadline?',
    answer:
      'If you miss the 75-day pre-lien notice deadline in Oklahoma, you lose your right to file a mechanics lien for the work or materials covered by that notice period. However, this does not necessarily mean you have no remedy. You may still have breach of contract claims, unjust enrichment claims, or bond claims depending on the project type. Additionally, if you continue to furnish labor or materials after the missed notice period, you may be able to file a new pre-lien notice covering the subsequent work. Consulting with a construction attorney immediately is critical to preserve whatever rights remain.',
  },
  {
    question: 'How much does it cost to file a mechanics lien?',
    answer:
      'The county clerk filing fee for a mechanics lien in Oklahoma is relatively modest, typically under $50. However, the true cost involves ensuring the lien is properly prepared, properly timed, and properly enforceable. Attorney fees for preparing and filing a lien vary depending on the complexity of the claim. Many contractors find that the cost of professional lien filing is a small fraction of the amount recovered. If enforcement litigation is required, Oklahoma law allows the prevailing party to recover reasonable attorney fees in lien actions, making the investment even more worthwhile.',
    statute: 'Okla. Stat. tit. 42, SS 176',
  },
];

const relatedPractices = [
  {
    title: 'Real Estate Law',
    description:
      'Purchase agreements, commercial leasing, title work, and property dispute resolution for Oklahoma owners and developers.',
    href: '/real-estate-law',
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

const ConstructionLaw = () => {
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
        title="Oklahoma Construction Lawyer"
        description="Oklahoma's authority on construction law and mechanics liens. Contract drafting, lien claims, payment bond claims, defect litigation, and OSHA defense. Author of the LexisNexis treatise and Oklahoma M&M Lien Book."
        path="/construction-law"
      />

      <PracticeHero
        title="Oklahoma Construction Law"
        titleAccent="."
        subtitle="From bid to closeout, Gary Quinnett protects contractors, owners, and design professionals. He wrote the book on Oklahoma lien law. Literally."
        backgroundImage="/hero-image.jpg"
      />

      <AuthorityStrip credentials={credentials} />

      <PracticeOverview
        title="Built on"
        titleAccent="Authority."
        paragraphs={overviewParagraphs}
        statuteRef="Primary statutory framework: Okla. Stat. tit. 42, Mechanics and Materialmen's Liens"
        listTitle="Who We Represent"
        listIcon={HardHat}
        listItems={whoWeRepresent}
        ctaText="Discuss Your Construction Matter"
      />

      <ServicesGrid
        title="Construction Law Services"
        subtitle="Specialized legal counsel for every phase of the construction lifecycle."
        services={services}
      />

      <ProcessSteps steps={processSteps} />

      <PracticeTestimonials testimonials={testimonials} />

      <PracticeFAQ faqs={faqs} schemaEnabled />

      <RelatedPractices practices={relatedPractices} />

      <PracticeCTA
        title="Ready to Protect Your Project?"
        description="Do not let legal issues derail your construction project. Schedule a strategic consultation with Gary Quinnett and get the clarity you need to move forward."
      />
    </motion.div>
  );
};

export default ConstructionLaw;
