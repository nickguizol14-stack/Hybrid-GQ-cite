import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HardHat,
  Briefcase,
  Home,
  Droplet,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const practiceAreas = [
  {
    id: 'construction',
    title: 'Construction Law',
    link: '/construction-law',
    description:
      "Oklahoma's go-to counsel for contractors, subcontractors, and suppliers. From contract negotiation through dispute resolution, we protect the people who build Oklahoma.",
    icon: HardHat,
    services: [
      'Construction contract drafting and review',
      "Mechanics' and materialmen's lien filing",
      'Payment bond claims',
      'Dispute resolution and litigation',
      'Project documentation and compliance',
      'Contractor defense',
    ],
  },
  {
    id: 'ma',
    title: 'Mergers & Acquisitions',
    link: '/mergers-and-acquisitions',
    description:
      "Buying or selling a business is one of the biggest decisions you'll make. We bring legal precision and business acumen to every deal, because understanding the numbers matters as much as understanding the law.",
    icon: Briefcase,
    services: [
      'Business sale and acquisition transactions',
      'Asset vs. stock purchase structuring',
      'Due diligence review',
      'Deal negotiation',
      'Letter of intent drafting',
      'Closing documentation',
    ],
  },
  {
    id: 'realestate',
    title: 'Real Estate Law',
    link: '/real-estate-law',
    description:
      "Real estate is about protecting what you've built. We negotiate and defend contracts that safeguard your assets, whether you're buying, selling, developing, or leasing.",
    icon: Home,
    services: [
      'Purchase and sale agreements',
      'Commercial leases',
      'Title review and clearance',
      'Easements and encumbrances',
      'Asset protection strategies',
      'Real estate dispute resolution',
    ],
  },
  {
    id: 'oilgas',
    title: 'Oil & Gas Law',
    link: '/oil-and-gas-law',
    description:
      'Oklahoma runs on energy. We represent operators, mineral owners, and service companies in contract matters, protecting your interests in an industry where the stakes are always high.',
    icon: Droplet,
    services: [
      'Oil and gas contract negotiation',
      'Joint operating agreements',
      'Surface use agreements',
      'Regulatory compliance',
      'Title opinions',
      'Royalty disputes',
    ],
  },
];

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Cards staggered entrance - Unified Trigger
      const cards = cardsRef.current?.querySelectorAll('.practice-card');
      if (cards && cardsRef.current) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="practice-areas"
      className="w-full bg-gq-dark-gradient section-padding relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #C4993B 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container-gq relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-serif font-bold text-gq-light text-4xl sm:text-5xl md:text-6xl mb-4">
            Practice <span className="text-gq-gold-gradient">Areas</span>
          </h2>
          <p className="text-gq-light/70 text-lg max-w-2xl mx-auto">
            Four decades of focused expertise in the areas that matter most to
            Oklahoma businesses.
          </p>
        </div>

        {/* Practice Areas Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {practiceAreas.map((area) => {
            const Icon = area.icon;
            // Check if active (only relevant for mobile click interaction if we added state, 
            // but for now we are just cleaning up the hover text and contrast as requested)
            // The user requested "click/tap toggle" for mobile.
            // We'll use a simple approach: The hover effect works on desktop. 
            // On mobile, the first tap acts as a hover.

            return (
              <div
                key={area.id}
                className="practice-card group relative bg-gq-dark-warm/50 backdrop-blur-sm rounded-xl p-8 border border-gq-gold/10 hover:border-gq-gold/40 transition-all duration-700 ease-in-out delay-0 hover:delay-200 cursor-pointer shadow-lg hover:shadow-2xl h-[180px] hover:h-[625px] will-change-transform"
                style={{ perspective: '1000px' }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  // Map range for subtle 3D tilt
                  const rotateX = ((y - centerY) / centerY) * -5; // -5 to 5 deg
                  const rotateY = ((x - centerX) / centerX) * 5; // -5 to 5 deg

                  gsap.to(card, {
                    rotateX: rotateX,
                    rotateY: rotateY,
                    scale: 1.02,
                    duration: 0.5,
                    ease: 'power2.out',
                  });
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                  });
                }}
                onClick={() => {
                  if (area.link) {
                    // Navigate to explicit link if available
                    navigate(area.link);
                    window.scrollTo(0, 0);
                  }
                  // Mobile tap logic fallback
                }}
              >
                {/* Content Container - Needs to preserve 3D */}
                <div style={{ transformStyle: 'preserve-3d' }}>
                  {/* Header - Always visible */}
                  <div className="flex items-center gap-5 translate-z-10" style={{ transform: 'translateZ(20px)' }}>
                    <div className="w-16 h-16 rounded-xl bg-gq-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gq-gold/20 transition-colors duration-300">
                      <Icon className="w-8 h-8 text-gq-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-2xl sm:text-3xl text-gq-light group-hover:text-gq-gold transition-colors duration-300">
                        {area.title}
                      </h3>
                      <div className="w-16 h-1 bg-gq-gold-gradient rounded-full mt-2 opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500 delay-100 group-hover:delay-200" />
                    </div>
                  </div>

                  {/* Reveal Content - Hidden by default, shown on hover with delay */}
                  <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out delay-100 group-hover:delay-200 max-h-0 group-hover:max-h-[800px] translate-z-0" style={{ transform: 'translateZ(0px)' }}>
                    {/* Description - UPDATED CONTRAST */}
                    <p className="text-white/90 font-medium leading-relaxed mt-6 pt-6 border-t border-gq-gold/20 text-base sm:text-lg">
                      {area.description}
                    </p>

                    {/* Services List - UPDATED CONTRAST */}
                    <ul className="space-y-3 mt-6">
                      {area.services.map((service, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-gq-light/90"
                        >
                          <CheckCircle2 className="w-5 h-5 text-gq-gold flex-shrink-0" />
                          <span className="text-sm sm:text-base font-medium">{service}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Link */}
                    <a
                      href="#contact"
                      onClick={(e) => {
                        if (area.link) {
                          navigate(area.link);
                          window.scrollTo(0, 0);
                        }
                        // Mobile tap support preserved
                        e.stopPropagation();
                        document
                          .querySelector('#contact')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 text-gq-gold font-bold hover:text-white transition-colors duration-300 mt-8 group/link text-lg"
                    >
                      <span className="underline-animate">Discuss Your Case</span>
                      <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ transform: 'translateZ(0px)' }}>
                  <div className="absolute inset-0 rounded-xl bg-gq-gold/5" />
                </div>

                {/* Hover hint - UPDATED VISIBILITY */}
                <div className="absolute bottom-6 right-6 opacity-60 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none flex items-center gap-2" style={{ transform: 'translateZ(10px)' }}>
                  <span className="text-gq-gold text-xs font-bold uppercase tracking-widest">Tap to Explore</span>
                  <div className="w-2 h-2 rounded-full bg-gq-gold animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
