import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import { BookOpen, Shield, Briefcase, MapPin, Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text stagger
      const heroEls = containerRef.current?.querySelectorAll('.hero-reveal');
      if (heroEls) {
        gsap.fromTo(heroEls,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
        );
      }

      // Hero image
      const heroImg = containerRef.current?.querySelector('.hero-img');
      if (heroImg) {
        gsap.fromTo(heroImg,
          { clipPath: 'inset(0 100% 0 0)', scale: 1.05 },
          { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.2, delay: 0.4, ease: 'power3.inOut' }
        );
      }

      // Content sections
      const reveals = containerRef.current?.querySelectorAll('.scroll-reveal');
      reveals?.forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
        );
      });

      // Stagger groups
      const staggerGroups = containerRef.current?.querySelectorAll('.stagger-group');
      staggerGroups?.forEach((group) => {
        const items = group.querySelectorAll('.stagger-item');
        gsap.fromTo(items,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: group, start: 'top 85%', once: true } }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen will-change-transform"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <SEO title="About Gary Quinnett" description="34 years of specialized expertise in Oklahoma construction law, real estate, oil and gas, and business transactions. Author of the LexisNexis bar treatise." path="/about" />

      {/* HERO */}
      <section className="bg-gq-dark-gradient pt-36 sm:pt-44 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="absolute top-[-20%] right-[-15%] w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(var(--theme-gold-rgb), 0.05)' }} />

        <div className="container-gq relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text */}
            <div>
              <p className="hero-reveal text-gq-gold text-xs tracking-[4px] uppercase font-semibold mb-4">About the Attorney</p>
              <h1 className="hero-reveal font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gq-light font-medium leading-tight mb-6">
                Gary David <span className="block text-gq-gold italic">Quinnett</span>
              </h1>
              <p className="hero-reveal text-gq-light/60 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
                34 years of Oklahoma law. 13 years of Fortune 500 business. Author of the LexisNexis bar treatise on construction law. The attorney other attorneys learn from.
              </p>
              <div className="hero-reveal">
                <Link to="/contact" className="inline-flex btn-primary text-sm py-3 px-8 rounded-lg tracking-wide border border-gq-burgundy/30">
                  Schedule a Consultation
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="hero-img rounded-2xl overflow-hidden shadow-2xl border border-gq-gold/10 aspect-[3/4] max-w-md mx-auto lg:ml-auto">
                <img src="/gary2.jpg" alt="Gary David Quinnett, Oklahoma construction and business attorney" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS BAR */}
      <section className="bg-gq-dark border-y border-gq-gold/10">
        <div className="container-gq">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gq-gold/10 stagger-group">
            {[
              { val: '34', label: 'Years of Practice', desc: 'Focused on Oklahoma construction, real estate, and business law' },
              { val: 'Author', label: 'LexisNexis Treatise', desc: 'The definitive bar reference on Oklahoma construction law' },
              { val: 'Published', label: 'M&M Lien Book', desc: 'The industry standard guide used by contractors statewide' },
              { val: '100+', label: 'Attorneys Trained', desc: 'CLE instructor across Oklahoma on lien practice' },
            ].map((cred, i) => (
              <div key={i} className="stagger-item p-5 sm:p-6 lg:p-8 text-center">
                <div className="font-serif text-2xl sm:text-3xl text-gq-light font-medium mb-1">{cred.val}</div>
                <div className="text-gq-gold text-[9px] sm:text-[10px] tracking-[2px] uppercase font-semibold mb-2">{cred.label}</div>
                <p className="text-gq-light/35 text-xs hidden sm:block">{cred.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PRACTICE */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#FDFBF7]">
        <div className="container-gq">
          <div className="max-w-4xl">
            <div className="scroll-reveal">
              <p className="text-gq-gold text-xs tracking-[3px] uppercase font-semibold mb-3">The Practice</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-gq-light font-medium mb-6">
                Built on Business, <span className="text-gq-gold">Driven by Results</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="scroll-reveal space-y-4 text-gq-light/70 text-base leading-relaxed">
                <p>
                  The Law Offices of Gary David Quinnett, PLLC serves businesses and entrepreneurs throughout Oklahoma with aggressive, business-savvy legal representation. The firm focuses on real estate, construction, oil and gas, contract law, and mergers and acquisitions.
                </p>
                <p>
                  Before establishing his law practice, Gary spent 13 years with a Fortune 500 company. That business perspective shapes how he reads contracts, evaluates deals, and advises clients. He understands construction schedules, balance sheets, and oil leases because he has worked with them from the business side.
                </p>
              </div>
              <div className="scroll-reveal space-y-4 text-gq-light/70 text-base leading-relaxed">
                <p>
                  Gary began his involvement in the oil and gas industry in 1982 as a Landman, giving him deep knowledge that predates his legal career by a decade. That industry experience, combined with his legal expertise, allows him to advise energy clients with a depth most attorneys simply cannot match.
                </p>
                <p>
                  The firm is structured to provide top-tier legal advice at a reasonable price. As a focused practice rather than a large firm, every matter receives Gary's direct involvement. Clients work with the attorney who wrote the book, not a junior associate referencing it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BACKGROUND & EDUCATION */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gq-dark-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="container-gq relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Education */}
            <div className="scroll-reveal bg-gq-dark-warm border border-gq-gold/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-5 h-5 text-gq-gold" />
                <h3 className="font-serif text-xl text-gq-light font-medium">Education</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-2 border-gq-gold/30 pl-4">
                  <div className="font-serif text-lg text-gq-light font-medium">Juris Doctor, 1992</div>
                  <div className="text-gq-light/70 text-sm">University of Oklahoma, College of Law</div>
                </div>
                <div className="border-l-2 border-gq-gold/30 pl-4">
                  <div className="font-serif text-lg text-gq-light font-medium">B.B.A., 1985</div>
                  <div className="text-gq-light/70 text-sm">University of Oklahoma</div>
                </div>
              </div>
            </div>

            {/* Credentials */}
            <div className="scroll-reveal bg-gq-dark-warm border border-gq-gold/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-5 h-5 text-gq-gold" />
                <h3 className="font-serif text-xl text-gq-light font-medium">Professional Credentials</h3>
              </div>
              <ul className="space-y-3 stagger-group">
                {[
                  'Oklahoma Bar Association',
                  'OBA Professionalism Committee (2014 Vice Chairman)',
                  'OBA Business and Corporate Law Section',
                  'U.S. District Court, Western District of Oklahoma',
                  'South Oklahoma City Lawyer\'s Association',
                  'Lawyer of Distinction, 2021 and 2022',
                ].map((item, i) => (
                  <li key={i} className="stagger-item flex items-start gap-3 text-gq-light/60 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-gq-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Publications & Teaching */}
            <div className="scroll-reveal bg-gq-dark-warm border border-gq-gold/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-5 h-5 text-gq-gold" />
                <h3 className="font-serif text-xl text-gq-light font-medium">Publications & Teaching</h3>
              </div>
              <ul className="space-y-3 stagger-group">
                {[
                  'Author: LexisNexis bar treatise on Oklahoma construction law',
                  'Author: The Oklahoma Mechanics and Materialmen\'s Lien Book',
                  'CLE instructor on lien practice (100+ attorneys trained)',
                  'Published author in Well Servicing Magazine',
                  'Oklahoma Landman since 1982',
                  'Fortune 500 corporate operations (13 years)',
                ].map((item, i) => (
                  <li key={i} className="stagger-item flex items-start gap-3 text-gq-light/60 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-gq-gold flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#FDFBF7]">
        <div className="container-gq">
          <div className="scroll-reveal text-center mb-10 sm:mb-14">
            <p className="text-gq-gold text-xs tracking-[3px] uppercase font-semibold mb-3">How We Work</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-gq-light font-medium">Our Principles</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto stagger-group">
            {[
              { title: 'Advocate Aggressively', desc: 'We play to win. Every matter is approached with the intensity it deserves.' },
              { title: 'Integrity First', desc: 'The highest degree of professionalism in every interaction, every filing, every negotiation.' },
              { title: 'Protect Privacy', desc: 'Your business stays yours. Confidentiality is not negotiable.' },
              { title: 'Communicate Clearly', desc: 'Open, frequent, and direct. You will always know where your matter stands.' },
              { title: 'Move Fast', desc: 'Time is money on a job site and in a boardroom. We do not let legal work create delays.' },
              { title: 'Deliver Value', desc: 'Top-tier legal counsel structured at a reasonable price. No surprises.' },
            ].map((p, i) => (
              <div key={i} className="stagger-item bg-gq-dark-warm border border-gq-dark/5 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gq-gold/10 flex items-center justify-center text-gq-gold text-xs font-bold font-serif">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-serif text-lg text-gq-light font-medium">{p.title}</h3>
                </div>
                <p className="text-gq-light/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE SERVE + CONTACT */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gq-dark-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="container-gq relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Who We Serve */}
            <div className="scroll-reveal">
              <p className="text-gq-gold text-xs tracking-[3px] uppercase font-semibold mb-3">Our Clients</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-gq-light font-medium mb-6">Who We Serve</h2>
              <p className="text-gq-light/60 text-base leading-relaxed mb-4">
                Our typical client is a business owner, entrepreneur, or self-made professional who requires an attorney with both legal expertise and business acumen. The majority of our clients are in the greater Oklahoma City area, though we serve clients throughout Oklahoma.
              </p>
              <p className="text-gq-light/60 text-base leading-relaxed mb-8">
                Satisfied client referrals have led us to represent both clients and outside law firms in Texas and other states.
              </p>
              <div className="bg-gq-dark-warm border-l-2 border-gq-gold p-5 rounded-r-lg">
                <p className="font-serif text-lg text-gq-light italic">
                  "We are Oklahomans, and our focus is business in Oklahoma."
                </p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="scroll-reveal">
              <div className="bg-gq-dark-warm border border-gq-gold/10 rounded-2xl p-6 sm:p-8">
                <h3 className="font-serif text-2xl text-gq-light font-medium mb-6">Get in Touch</h3>

                <div className="space-y-5 mb-8">
                  <a href="tel:405-607-2266" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-gq-gold/10 flex items-center justify-center group-hover:bg-gq-gold/20 transition-colors">
                      <Phone className="w-4 h-4 text-gq-gold" />
                    </div>
                    <div>
                      <div className="text-gq-light font-medium group-hover:text-gq-gold transition-colors">(405) 607-2266</div>
                      <div className="text-gq-light/60 text-xs">Call directly</div>
                    </div>
                  </a>
                  <a href="mailto:gary@gq-law.com" className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-gq-gold/10 flex items-center justify-center group-hover:bg-gq-gold/20 transition-colors">
                      <Mail className="w-4 h-4 text-gq-gold" />
                    </div>
                    <div>
                      <div className="text-gq-light font-medium group-hover:text-gq-gold transition-colors">gary@gq-law.com</div>
                      <div className="text-gq-light/60 text-xs">Email Gary</div>
                    </div>
                  </a>
                </div>

                <div className="border-t border-gq-gold/10 pt-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-4 h-4 text-gq-gold mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-gq-light/80 text-sm">10005 N May Ave, Suite 120</div>
                      <div className="text-gq-light/70 text-sm">Oklahoma City, OK 73120</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-4 h-4 text-gq-gold/50 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-gq-light/70 text-sm">Dillard Group Building</div>
                      <div className="text-gq-light/35 text-sm">1800 N Interstate Dr, Suite 230, Norman, OK 73072</div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 btn-primary text-sm py-3 rounded-lg tracking-wide border border-gq-burgundy/30"
                >
                  <span>Schedule a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default AboutPage;
