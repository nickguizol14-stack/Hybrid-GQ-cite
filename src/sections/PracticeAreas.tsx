import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const practiceAreas = [
  {
    id: 'construction',
    number: '01',
    title: 'Construction Law',
    link: '/construction-law',
    shortDesc: 'Protecting the people who build Oklahoma.',
    description:
      "Oklahoma's go-to counsel for contractors, subcontractors, and suppliers. From contract negotiation through dispute resolution, we protect the people who build.",
    services: [
      'Contract drafting & review',
      "Mechanics' & materialmen's liens",
      'Payment bond claims',
      'Dispute resolution & litigation',
    ],
  },
  {
    id: 'ma',
    number: '02',
    title: 'Mergers & Acquisitions',
    link: '/mergers-and-acquisitions',
    shortDesc: 'Precision and acumen for high-stakes deals.',
    description:
      "Buying or selling a business is one of the biggest decisions you'll make. We bring legal precision and business acumen to every deal, ensuring your interests are secured.",
    services: [
      'Sale & acquisition transactions',
      'Asset vs. stock structuring',
      'Due diligence review',
      'Deal negotiation',
    ],
  },
  {
    id: 'realestate',
    number: '03',
    title: 'Real Estate Law',
    link: '/real-estate-law',
    shortDesc: 'Safeguarding your commercial assets.',
    description:
      "Real estate is about protecting what you've built. We negotiate and defend contracts that safeguard your assets, whether you're buying, selling, or developing.",
    services: [
      'Purchase & sale agreements',
      'Commercial leases',
      'Title review & clearance',
      'Dispute resolution',
    ],
  },
  {
    id: 'oilgas',
    number: '04',
    title: 'Oil & Gas Law',
    link: '/oil-and-gas-law',
    shortDesc: 'Representing operators and mineral owners.',
    description:
      'Oklahoma runs on energy. We represent operators, mineral owners, and service companies in contract matters, protecting your interests where the stakes are high.',
    services: [
      'Contract negotiation',
      'Joint operating agreements',
      'Surface use agreements',
      'Regulatory compliance',
    ],
  },
];

const PracticeAreas = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // Default first one open
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
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

      // Accordion container animation
      gsap.fromTo(
        accordionRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="practice-areas"
      className="w-full bg-gq-dark-gradient py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="container-gq relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center md:text-left mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#C5A869]/20 pb-8">
          <div>
            <h2 className="font-serif font-medium text-gq-light text-[3rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl mb-4">
              Practice <span className="text-gq-gold-gradient italic">Areas</span>
            </h2>
          </div>
          <p className="text-gq-light/70 text-lg max-w-md font-light tracking-wide md:text-right">
            Four decades of focused expertise in the areas that matter most to Oklahoma businesses.
          </p>
        </div>

        {/* Horizontal Accordion Container */}
        <div
          ref={accordionRef}
          className="flex flex-col lg:flex-row w-full lg:h-[650px] border border-[#C5A869]/30 rounded-2xl overflow-hidden shadow-2xl bg-[#1A1510]"
        >
          {practiceAreas.map((area, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={area.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setHoveredIndex(isHovered ? null : index);
                  }
                }}
                className={`relative group border-b lg:border-b-0 lg:border-r border-[#C5A869]/20 last:border-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden flex flex-col lg:flex-row
                  ${isHovered ? 'lg:flex-[3] bg-[#2A2219]' : 'lg:flex-1 bg-[#1A1510] hover:bg-[#231C14]'}
                `}
              >
                {/* Background Hover Highlight */}
                <div
                  className={`absolute inset-0 bg-gradient-to-b from-[#C5A869]/10 to-transparent opacity-0 transition-opacity duration-700 ${isHovered ? 'opacity-100' : ''}`}
                />

                {/* Vertical Header (Visible when collapsed on Desktop, always top on Mobile) */}
                <div
                  className={`p-6 lg:p-8 flex lg:flex-col justify-between items-center lg:items-start lg:w-32 lg:min-w-[8rem] shrink-0 border-r-0 lg:border-r border-[#C5A869]/10 transition-colors duration-500
                    ${isHovered ? 'border-transparent' : ''}
                  `}
                >
                  <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-8 w-full">
                    {/* Number */}
                    <span className="font-sans font-light text-sm tracking-widest text-[#C5A869] opacity-70">
                      /{area.number}
                    </span>

                    {/* Vertical Title (Desktop) / Horizontal Title (Mobile) */}
                    <h3
                      className="font-serif font-medium text-[1.3rem] leading-tight sm:text-2xl lg:text-3xl text-gq-light lg:whitespace-nowrap lg:rotate-180 lg:[writing-mode:vertical-lr] tracking-wide"
                    >
                      {area.title}
                    </h3>
                  </div>

                  {/* Icon/Arrow indicator */}
                  <div className={`mt-auto transition-transform duration-500 hidden lg:block ${isHovered ? '-rotate-45 text-[#C5A869]' : 'text-[#C5A869]/30'}`}>
                    <ArrowRight className="w-6 h-6" strokeWidth={1} />
                  </div>
                </div>

                {/* Expanded Content Area */}
                <div
                  className={`flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${isHovered ? 'max-h-[1000px] lg:max-h-none opacity-100' : 'max-h-0 lg:max-h-none lg:opacity-0 hidden lg:block'}
                  `}
                >
                  <div className="p-6 lg:p-10 lg:pl-12 h-full flex flex-col justify-center min-w-[280px] lg:min-w-[450px]">

                    <h4 className="font-serif text-[1.4rem] sm:text-2xl md:text-3xl lg:text-4xl text-[#E6D3A3] mb-4 sm:mb-6 font-medium leading-[1.2] pt-4 lg:pt-0">
                      {area.shortDesc}
                    </h4>

                    <p className="text-gq-light/70 text-base lg:text-lg leading-relaxed mb-8 max-w-lg font-light">
                      {area.description}
                    </p>

                    <div className="mb-10 lg:mb-12">
                      <div className="text-xs uppercase tracking-[0.2em] text-[#C5A869] mb-4 font-semibold">Key Capabilities</div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {area.services.map((service, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-[#C5A869] mt-1.5 w-1 h-1 rounded-full bg-[#C5A869] shrink-0" />
                            <span className="text-gq-light/90 text-sm font-light tracking-wide">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (area.link) {
                            navigate(area.link);
                            window.scrollTo(0, 0);
                          }
                        }}
                        className="inline-flex items-center gap-4 text-gq-light hover:text-[#C5A869] transition-colors group/btn"
                      >
                        <span className="font-sans text-sm tracking-widest uppercase relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#C5A869] after:origin-bottom-right after:transition-transform after:duration-300 group-hover/btn:after:scale-x-100 group-hover/btn:after:origin-bottom-left">
                          Explore Practice Area
                        </span>
                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover/btn:rotate-0 transition-transform duration-500" strokeWidth={1.5} />
                      </button>
                    </div>

                  </div>
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
