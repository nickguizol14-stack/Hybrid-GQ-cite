import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import {
  FileCheck,
  Scale,
  History,
  Cog,
  Handshake,
  DollarSign,
  Droplet,
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
/*  Oil & Gas Law Page                                                */
/* ------------------------------------------------------------------ */

const credentials = [
  {
    value: 34,
    label: 'Years Focused',
    description:
      'More than three decades dedicated to Oklahoma business and energy law.',
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
    value: 'Since 1982',
    label: 'Industry Landman',
    description:
      'Gary began his career in the energy industry as a landman before earning his law degree.',
    isNumber: false as const,
  },
  {
    value: 100,
    label: 'Attorneys Trained',
    description:
      'Exposed more than 100 attorneys to advanced CLE on Oklahoma energy and business law topics.',
    isNumber: true as const,
    suffix: '+',
  },
];

const overviewParagraphs = [
  'Oklahoma sits at the center of American energy. Mineral rights, surface rights, royalty interests, and regulatory obligations intersect in ways that are unique to this state. Gary Quinnett has navigated that intersection since 1982, first as a landman walking title in the county courthouses, then as the attorney operators and mineral owners trust when millions of dollars are on the line.',
  'The Oklahoma Corporation Commission (OCC) regulates spacing, pooling, and unitization in ways that directly affect the value of your mineral and working interests. Whether you are an operator seeking a location exception or a mineral owner responding to a forced pooling application, you need counsel who has appeared before the OCC and understands how those proceedings translate into real-world outcomes.',
  'Royalty disputes, surface damage claims, and division order title opinions each carry their own statutory framework. Title 52 of the Oklahoma Statutes governs most oil and gas operations, while the Production Revenue Standards Act (52 O.S. 570.1 et seq.) sets strict timelines for royalty payments. Failure to comply can trigger statutory interest, penalties, and litigation.',
  'Our practice covers the full lifecycle of an energy asset, from the initial lease negotiation through drilling, production, and eventual transfer. We represent operators, mineral owners, surface owners, royalty interest holders, service companies, and working interest partners across Oklahoma.',
];

const services = [
  {
    icon: Handshake,
    title: 'Lease Negotiation',
    description:
      'Maximizing value for mineral owners and securing favorable terms for operators. We negotiate royalty rates, Pugh clauses, surface use provisions, and shut-in royalty terms that reflect current market conditions.',
    statute: 'Okla. Stat. tit. 52',
  },
  {
    icon: Scale,
    title: 'Surface Damage Claims',
    description:
      'Negotiating fair compensation for surface use and resolving disputes between landowners and operators under the Oklahoma Surface Damages Act.',
    statute: '52 O.S. 318.2 et seq.',
  },
  {
    icon: History,
    title: 'Drilling & Division Order Title Opinions',
    description:
      'Full-chain title examination from sovereignty to present. We render drilling and division order title opinions that stand up to scrutiny and satisfy the requirements of the Oklahoma Title Examination Standards.',
  },
  {
    icon: Cog,
    title: 'OCC Regulatory (Spacing, Pooling, Location Exceptions)',
    description:
      'Navigating Oklahoma Corporation Commission applications for well spacing, forced pooling, increased density, location exceptions, and unitization.',
    statute: '52 O.S. 87.1',
  },
  {
    icon: FileCheck,
    title: 'Joint Operating Agreements',
    description:
      'Drafting and negotiating JOAs based on the AAPL Model Form with Oklahoma-specific modifications for operator authority, non-consent penalties, and accounting procedures.',
  },
  {
    icon: DollarSign,
    title: 'Royalty Disputes',
    description:
      'Enforcing royalty payment obligations under the Production Revenue Standards Act. We handle underpayment claims, deduction disputes, and statutory interest recovery.',
    statute: '52 O.S. 570.1 et seq.',
  },
];

const processSteps = [
  {
    title: 'Consultation',
    description:
      'We review your mineral interests, leases, and regulatory posture to identify risks and opportunities.',
  },
  {
    title: 'Strategy',
    description:
      'A clear legal strategy tailored to your position, whether you are the operator, mineral owner, or surface owner.',
  },
  {
    title: 'Execution',
    description:
      'Filing applications, negotiating agreements, rendering title opinions, and appearing before the OCC.',
  },
  {
    title: 'Resolution',
    description:
      'Closing the transaction, securing the order, or resolving the dispute with measurable results.',
  },
];

const testimonials = [
  {
    quote:
      'Gary understood our business before we even had to explain it. He has been in the oil patch his entire career and it shows in the quality of his counsel.',
    author: 'Oklahoma Operator',
    location: 'Oklahoma City, OK',
  },
  {
    quote:
      'We needed someone who could handle the legal side and understand the business side. Gary delivered on both. His title opinions are thorough and his negotiation skills are exceptional.',
    author: 'Independent Producer',
    location: 'Tulsa, OK',
  },
];

const faqs = [
  {
    question: 'What is an OCC spacing and pooling application?',
    answer:
      'The Oklahoma Corporation Commission requires operators to obtain spacing orders before drilling. A spacing order establishes the size and shape of the drilling and spacing unit. If the operator cannot obtain voluntary leases from all mineral owners within the unit, the operator may file a pooling application under 52 O.S. 87.1(e) to force-pool the unleased interests. Mineral owners who are pooled receive statutory options including the right to participate as a working interest owner, accept a bonus and royalty, or elect cash consideration. Understanding the economic implications of each option is critical.',
    statute: '52 O.S. 87.1(e)',
  },
  {
    question: 'How are surface damages calculated in Oklahoma?',
    answer:
      'Under the Oklahoma Surface Damages Act (52 O.S. 318.2 et seq.), an operator must negotiate with the surface owner before entering the property. If the parties cannot agree, the operator must file a surface damage action with the district court. Damages are calculated based on the fair market value of the surface land actually taken, the loss of use of the surface, and any damage to improvements, crops, or timber. The court appoints appraisers to establish the amount, and the operator must post a bond before entry.',
    statute: '52 O.S. 318.2 - 318.9',
  },
  {
    question: 'What is a division order title opinion?',
    answer:
      'A division order title opinion is a legal document rendered by a licensed Oklahoma attorney that examines the chain of title for a specific well or unit and determines the ownership of all mineral, royalty, and overriding royalty interests. Operators rely on this opinion to distribute production revenue to the correct parties. The opinion traces ownership from the original patent or land grant through all subsequent conveyances, probates, and court orders. In Oklahoma, these opinions must comply with the Oklahoma Title Examination Standards adopted by the Oklahoma Bar Association.',
  },
  {
    question: 'Do I need a lawyer for an oil and gas lease in Oklahoma?',
    answer:
      'While there is no statutory requirement to have an attorney review your oil and gas lease, it is strongly recommended. A standard lease form may contain provisions that are unfavorable to the mineral owner, such as low royalty rates, broad deduction clauses, inadequate shut-in royalty provisions, or the absence of a Pugh clause. A Pugh clause limits the lease to the depths or units actually being produced, which prevents the operator from holding your entire mineral estate by production from a single well. An experienced attorney can negotiate these terms before you sign and protect your interests for the life of the lease.',
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
    title: 'Mergers & Acquisitions',
    description:
      'Deal structuring, due diligence, and risk allocation for business transactions.',
    href: '/mergers-and-acquisitions',
  },
];

const OilAndGasLaw = () => {
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
        title="Oklahoma Oil and Gas Lawyer"
        description="Representing operators, mineral owners, and surface owners in lease negotiation, title examination, OCC regulatory, and royalty disputes across Oklahoma. 34 years of energy law experience."
        path="/oil-and-gas-law"
      />

      <PracticeHero
        title="Oklahoma Oil & Gas Law"
        titleAccent="."
        subtitle="Gary has worked in Oklahoma's energy industry since 1982, first as a landman, then as the attorney operators and mineral owners trust with their most complex matters."
        backgroundImage="/hero-image.jpg"
      />

      <AuthorityStrip credentials={credentials} />

      <PracticeOverview
        title="Energy Law With"
        titleAccent="Real-World Experience"
        paragraphs={overviewParagraphs}
        statuteRef="Okla. Stat. tit. 52; Production Revenue Standards Act, 52 O.S. 570.1 et seq."
        listTitle="Who We Represent"
        listIcon={Droplet}
        listItems={[
          'Operators',
          'Mineral Owners',
          'Surface Owners',
          'Royalty Interest Holders',
          'Service Companies',
          'Working Interest Partners',
        ]}
        ctaText="Discuss Your Energy Matter"
      />

      <ServicesGrid
        title="Comprehensive Energy Counsel"
        subtitle="From the courthouse to the Corporation Commission, we cover the full lifecycle of Oklahoma oil and gas operations."
        services={services}
      />

      <ProcessSteps steps={processSteps} />

      <PracticeTestimonials testimonials={testimonials} />

      <PracticeFAQ faqs={faqs} />

      <RelatedPractices practices={relatedPractices} />

      <PracticeCTA
        title="Ready to Protect Your Interests?"
        description="Whether you are an operator, mineral owner, or surface owner, Gary Quinnett brings four decades of energy industry experience to every matter."
      />
    </motion.div>
  );
};

export default OilAndGasLaw;
