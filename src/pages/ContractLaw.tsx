import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileText,
  Search,
  Shield,
  BookOpen,
  Briefcase,
  FileCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  Scale,
} from 'lucide-react';
import SEO from '../components/SEO';
import PracticeHero from '../components/practice/PracticeHero';
import AuthorityStrip from '../components/practice/AuthorityStrip';
import ServicesGrid from '../components/practice/ServicesGrid';
import ProcessSteps from '../components/practice/ProcessSteps';
import PracticeTestimonials from '../components/practice/PracticeTestimonials';
import PracticeFAQ from '../components/practice/PracticeFAQ';
import RelatedPractices from '../components/practice/RelatedPractices';
import PracticeCTA from '../components/practice/PracticeCTA';

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  { value: 34, label: 'Years in Practice', description: 'Drafting, negotiating, and litigating commercial contracts across every Oklahoma industry.', isNumber: true },
  { value: '13 Years', label: 'Fortune 500 Business', description: 'Corporate operations experience that shapes how Gary reads, writes, and fights over contracts.', isNumber: false },
  { value: 'Author', label: 'LexisNexis Treatise', description: 'Wrote the authoritative bar reference on Oklahoma construction contracts and lien law.', isNumber: false },
  { value: 'UCC', label: 'Expert, Articles 1-9', description: 'Deep command of Oklahoma\'s Uniform Commercial Code from sales to secured transactions.', isNumber: false },
];

const services = [
  { icon: FileText, title: 'Contract Drafting & Negotiation', description: 'Custom agreements built from litigation experience. Gary has seen how contracts fail in court hundreds of times. That shapes every clause, every definition, every risk allocation he writes.', statute: 'Oklahoma plain meaning rule' },
  { icon: Search, title: 'Contract Review & Risk Analysis', description: 'Line-by-line analysis of proposed agreements before you sign. Identifying ambiguities, missing protections, unfavorable indemnification, and terms that Oklahoma courts have struck down.' },
  { icon: Shield, title: 'Breach of Contract Litigation', description: 'Aggressive pursuit when the other side fails to perform, or strategic defense when claims are brought against you. Material breach, anticipatory repudiation, and specific performance actions.', statute: '12 O.S. Section 95' },
  { icon: BookOpen, title: 'UCC & Commercial Transactions', description: 'Sales (Article 2), leases (Article 2A), secured transactions (Article 9), negotiable instruments (Article 3), and letters of credit (Article 5). Full command of Oklahoma\'s commercial code.', statute: '12A O.S.' },
  { icon: Users, title: 'Non-Compete & Employment Agreements', description: 'Restrictive covenants, non-solicitation, confidentiality, and employment agreements drafted to the limits Oklahoma courts will enforce. Overly broad restrictions get struck down. Gary knows the line.' },
  { icon: FileCheck, title: 'Business Formation & Governance', description: 'Operating agreements, partnership agreements, shareholder agreements, and corporate bylaws. Structuring business relationships so the contract works before the dispute starts.' },
];

const interpretationRules = [
  'Parties can freely negotiate any terms absent illegality.',
  'Contracts include both expressed agreements and reasonably implied obligations.',
  'Every contract contains an implied duty of good faith and fair dealing.',
  'Contracts must be interpreted as a whole, not clause by clause.',
  'Plain language is given its ordinary meaning unless technical terms are used.',
  'Courts determine the parties\' intent at the time the contract was formed.',
  'The parol evidence rule merges all prior negotiations into the written terms.',
  'Ambiguity exists when contract language permits multiple reasonable readings.',
  'Whether ambiguity exists is a question for the judge, not the jury.',
  'Unambiguous contracts are interpreted by the judge using the "four corners" doctrine.',
  'Only the written document is considered for unambiguous contracts.',
  'For ambiguous contracts, courts may consider conduct, custom, and past dealings.',
  'Interpretation of ambiguous contracts involves both judge and jury.',
  'Ambiguous language is construed against the party that drafted the contract.',
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
  { title: 'Consultation', description: 'Gary reviews your contract situation, identifies the core issue, and evaluates your position under Oklahoma law.' },
  { title: 'Analysis', description: 'Detailed review of the agreement, relevant statutes, and comparable case outcomes to build your strategy.' },
  { title: 'Action', description: 'Precise drafting, aggressive negotiation, or litigation with Gary\'s direct and personal involvement.' },
  { title: 'Resolution', description: 'An enforceable agreement, a favorable settlement, or a courtroom verdict. 34 years of results behind every move.' },
];

const testimonials = [
  { quote: 'We faced a nasty breach of contract suit from a vendor. Gary and his team dismantled their claims before we ever saw a courtroom.', author: 'Business Owner', location: 'Moore' },
  { quote: 'Their team completely restructured our corporate governance. We are now positioned for serious growth without the liability risk.', author: 'President, Manufacturing Corp', location: 'Broken Arrow' },
  { quote: 'I can\'t count how many times Gary has saved me a fortune in legal disputes. Would never use a different lawyer.', author: 'Contractor', location: 'Oklahoma City' },
];

const faqs = [
  { question: 'What are Oklahoma\'s rules for interpreting a written contract?', answer: 'Oklahoma courts follow 14 specific rules when interpreting contracts. The most critical: contracts must be read as a whole, not clause by clause. Plain language is given its ordinary meaning unless technical terms are used. If the language is unambiguous, courts apply the "four corners" doctrine and will not consider outside evidence. If it is ambiguous, courts may consider the parties\' conduct, custom, and past dealings to determine intent. Ambiguous language is construed against the party that drafted the contract.', statute: 'Oklahoma contract interpretation doctrine' },
  { question: 'What is the statute of limitations for breach of contract in Oklahoma?', answer: 'For written contracts, you have 5 years from the date of breach to file suit (12 O.S. Section 95). For oral contracts, the limitation is 3 years. These deadlines are strict. If you miss them, your claim is permanently barred regardless of its merit. If you suspect a breach, consult an attorney before the clock runs out.', statute: '12 O.S. Section 95' },
  { question: 'Does Oklahoma require certain contracts to be in writing?', answer: 'Yes. Oklahoma\'s Statute of Frauds (15 O.S. Section 136) requires a writing for: real estate transactions, agreements that cannot be performed within one year, promises to pay the debt of another, and contracts for the sale of goods over $500 (under the UCC). Verbal agreements outside these categories are enforceable, but proving their terms in court is significantly harder.', statute: '15 O.S. Section 136' },
  { question: 'What damages can I recover for breach of contract in Oklahoma?', answer: 'Oklahoma allows recovery of compensatory damages (the benefit you would have received had the contract been performed), consequential damages (foreseeable losses caused by the breach), and in some cases, attorney fees if the contract includes a fee-shifting provision. Punitive damages are generally not available for breach of contract unless the breach also constitutes an independent tort such as fraud.', statute: '23 O.S. Section 21' },
  { question: 'What is the UCC and how does it affect my business contracts in Oklahoma?', answer: 'The Uniform Commercial Code (12A O.S.) governs commercial transactions in Oklahoma, including the sale of goods (Article 2), leases (Article 2A), negotiable instruments (Article 3), bank deposits (Article 4), secured transactions (Article 9), and more. The UCC fills in gaps that your contract does not address, and some UCC provisions apply even if your contract tries to override them. Understanding how the UCC interacts with your agreements is essential.', statute: '12A O.S.' },
  { question: 'Are non-compete agreements enforceable in Oklahoma?', answer: 'Oklahoma allows non-competes but scrutinizes them carefully. The restriction must be reasonable in geographic scope, duration (typically 1-2 years), and the activities restricted. Courts will not rewrite an overbroad non-compete to make it enforceable. If your agreement is struck down, you lose the protection entirely. Gary drafts non-competes calibrated to what Oklahoma courts will actually uphold.', statute: '15 O.S. Section 219A' },
  { question: 'How can I get out of a contract in Oklahoma?', answer: 'Oklahoma law provides several grounds to void or exit a contract: mutual mistake of a material fact, fraud or misrepresentation, duress or undue influence, unconscionability, impossibility of performance, or a material breach by the other party. Some contracts also include termination clauses that allow exit under specific conditions. The available options depend entirely on the facts of your situation and the language of the agreement.', statute: '15 O.S. Sections 51-75' },
  { question: 'Can I recover attorney fees in an Oklahoma contract dispute?', answer: 'Oklahoma follows the American Rule, meaning each side generally pays its own attorney fees. However, if your contract contains a fee-shifting provision (and many commercial contracts do), the prevailing party can recover reasonable attorney fees. Additionally, 12 O.S. Section 936 allows recovery of attorney fees in certain commercial actions. Gary reviews every contract for fee-shifting language because it fundamentally changes the economics of litigation.', statute: '12 O.S. Section 936' },
];

const relatedPractices = [
  { title: 'Construction Law', description: 'AIA contracts, ConsensusDocs, payment disputes, and lien claims in the construction industry.', href: '/construction-law' },
  { title: 'Mergers & Acquisitions', description: 'Purchase agreements, asset deals, stock transactions, and post-closing disputes.', href: '/mergers-and-acquisitions' },
  { title: 'Real Estate Law', description: 'Commercial leases, purchase agreements, title work, and property disputes.', href: '/real-estate-law' },
];

const ContractLaw = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLElement>(null);
  const rulesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overview section stagger
      const overviewEls = overviewRef.current?.querySelectorAll('.reveal-item');
      if (overviewEls) {
        gsap.fromTo(overviewEls,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: overviewRef.current, start: 'top 80%', once: true } }
        );
      }

      // 14 Rules counter and stagger
      const ruleItems = rulesRef.current?.querySelectorAll('.rule-item');
      if (ruleItems) {
        gsap.fromTo(ruleItems,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
            scrollTrigger: { trigger: rulesRef.current, start: 'top 80%', once: true } }
        );
      }

      // Rules section title
      const rulesTitle = rulesRef.current?.querySelector('.rules-title');
      if (rulesTitle) {
        gsap.fromTo(rulesTitle,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: rulesRef.current, start: 'top 85%', once: true } }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={pageRef}
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
        backgroundImage="/hero-contract.jpg"
      />

      <AuthorityStrip credentials={credentials} />

      {/* CUSTOM OVERVIEW - unique to Contract Law page */}
      <section ref={overviewRef} className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-gq-light-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply pointer-events-none" />
        <div className="container-gq relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 items-start">
            {/* Left: Content */}
            <div className="lg:col-span-3">
              <h2 className="reveal-item font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-gq-light mb-8">
                What Did the <span className="text-gq-gold">Parties Mean?</span>
              </h2>
              <div className="space-y-5 text-base sm:text-lg text-gq-light/75 leading-relaxed">
                <p className="reveal-item">
                  Every contract dispute comes down to one question: what did the parties mean? Oklahoma courts follow <strong className="text-gq-light">14 specific rules</strong> to answer that question, from the plain meaning doctrine to the parol evidence rule to the principle that ambiguous language is construed against the drafter. Gary Quinnett knows these rules because he has litigated them for 34 years.
                </p>
                <p className="reveal-item">
                  That litigation experience is what separates Gary's contract drafting from template-based lawyering. He does not draft contracts to look good on paper. He drafts them to survive a courtroom challenge. Every defined term, every performance obligation, every remedy provision is written with the knowledge of how Oklahoma judges and juries interpret contract language.
                </p>
                <p className="reveal-item">
                  Before becoming an attorney, Gary spent 13 years in Fortune 500 corporate operations. He reads contracts the way a business operator reads them: what does this cost me, what happens if they do not perform, and how fast can I get out if things go wrong. That commercial instinct, combined with his command of Oklahoma's Uniform Commercial Code (12A O.S.), produces contracts that work in the real world.
                </p>
                <p className="reveal-item text-sm text-gq-light/40 italic">
                  15 O.S. Section 136 / 12A O.S.
                </p>
              </div>
              <div className="reveal-item mt-8">
                <a href="/contact" className="inline-flex items-center gap-2 font-semibold text-gq-light border-b-2 border-gq-gold pb-1 hover:text-gq-gold transition-colors">
                  <span>Discuss Your Contract Matter</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Dark card with who we represent */}
            <div className="lg:col-span-2 reveal-item">
              <div className="relative">
                <div className="absolute -inset-3 bg-gq-gold/5 rounded-2xl -z-10 transform rotate-2" />
                <div className="bg-gq-dark p-6 sm:p-8 rounded-xl text-white shadow-2xl">
                  <h3 className="text-xl font-serif font-bold mb-5 flex items-center gap-3">
                    <Briefcase className="text-gq-gold w-6 h-6" />
                    <span>Who We Represent</span>
                  </h3>
                  <ul className="space-y-3">
                    {whoWeRepresent.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-gq-gold flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE 14 RULES - Unique to this page */}
      <section ref={rulesRef} className="py-12 sm:py-16 lg:py-24 bg-gq-dark-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

        {/* Large watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif italic text-[20rem] text-gq-gold opacity-[0.02] pointer-events-none select-none leading-none">
          14
        </div>

        <div className="container-gq relative z-10">
          <div className="rules-title max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 border border-gq-gold/20 rounded-full px-5 py-2 bg-gq-gold/5 mb-6">
              <Scale className="w-4 h-4 text-gq-gold" />
              <span className="text-gq-gold text-[10px] tracking-[3px] uppercase font-semibold">Oklahoma Contract Law</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gq-light font-medium mb-4">
              The 14 Rules Oklahoma Courts <span className="text-gq-gold italic">Use to Interpret Your Contract</span>
            </h2>
            <p className="text-gq-light/50 text-sm sm:text-base max-w-2xl mx-auto">
              When a dispute reaches the courtroom, these are the principles that determine whether your contract protects you. Gary has litigated every one of them.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            {interpretationRules.map((rule, i) => (
              <div
                key={i}
                className="rule-item flex gap-4 items-start bg-gq-dark-warm/60 border border-gq-gold/8 rounded-xl p-4 hover:border-gq-gold/25 transition-colors duration-300"
              >
                <span className="font-serif text-2xl font-semibold text-gq-gold/40 leading-none mt-0.5 w-8 flex-shrink-0 text-right">
                  {i + 1}
                </span>
                <p className="text-gq-light/70 text-sm leading-relaxed">
                  {rule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
