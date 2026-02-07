import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Users, Clock, Star, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  {
    value: 34,
    prefix: '',
    suffix: '',
    label: 'Years of Experience',
    description:
      'Specialized legal expertise in Oklahoma construction, business, and energy law',
    icon: Clock,
    isNumber: true,
  },
  {
    value: null,
    display: 'Author',
    label: 'Lexis Nexis Treatise',
    description:
      'Wrote the definitive bar treatise on Oklahoma construction law that other attorneys study',
    icon: BookOpen,
    isNumber: false,
  },
  // Years distinguished item removed per user request
  {
    value: null,
    display: 'Published',
    label: 'Lien Book Author',
    description:
      'Author of "The Oklahoma Mechanics and Materialmen\'s Lien Book", the industry standard',
    icon: FileText,
    isNumber: false,
  },
  {
    value: 100,
    prefix: '',
    suffix: '+',
    label: 'Attorneys Trained',
    description:
      'Teaching CLE courses on construction law and lien practice across Oklahoma',
    icon: Users,
    isNumber: true,
  },
  // $10M+ Item removed per user request
];

const Credentials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial hidden state for title
      gsap.set(titleRef.current, { y: 30, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 20, opacity: 0 });

      // Title animation on scroll
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(titleRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
          });
          gsap.to(subtitleRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
            ease: 'power3.out',
          });
        },
      });

      // Cards animation on scroll - Unified Trigger
      const cards = cardsRef.current?.querySelectorAll('.credential-card');
      if (cards && cardsRef.current) {
        // Prepare cards heavily hidden
        gsap.set(cards, { y: 50, opacity: 0 });

        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            // Animate cards in
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
            });

            // Animate numbers
            cards.forEach((card, index) => {
              const numberEl = card.querySelector('.number-display');
              const cred = credentials[index];

              if (cred.isNumber && numberEl && cred.value !== null) {
                const obj = { value: 0 };
                gsap.to(obj, {
                  value: cred.value,
                  duration: 2.0,
                  // Delay matches the stagger of the card appearing + a little beat
                  delay: index * 0.1 + 0.2,
                  ease: 'power2.out',
                  onUpdate: () => {
                    numberEl.textContent =
                      (cred.prefix || '') +
                      Math.round(obj.value) +
                      (cred.suffix || '');
                  },
                });
              }
            });
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="credentials"
      className="w-full bg-gq-light-gradient py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gq-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gq-burgundy/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container-gq relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2
            ref={titleRef}
            className="font-serif font-bold text-gq-dark text-3xl sm:text-4xl md:text-5xl mb-3"
          >
            Proven <span className="text-gq-gold-gradient">Authority</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-gq-dark/70 text-base max-w-xl mx-auto"
          >
            Three decades of specialized experience. Recognition from the highest
            levels of the legal profession.
          </p>
        </div>

        {/* Credentials Grid - Centered Layout */}
        <div
          ref={cardsRef}
          className="flex flex-wrap justify-center gap-4 lg:gap-6 max-w-6xl mx-auto"
        >
          {credentials.map((cred, index) => {
            const Icon = cred.icon;
            return (
              <div
                key={index}
                className="credential-card group relative bg-white rounded-lg p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex-1 min-w-[280px] max-w-[350px] border border-gray-100 hover:border-gq-gold/30 hover:-translate-y-1"
              >
                {/* Gold accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gq-gold-gradient rounded-t-lg opacity-50 group-hover:opacity-100 transition-opacity" />

                {/* Icon and Number Row */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gq-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gq-gold/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gq-gold" />
                  </div>

                  {/* Number or Badge */}
                  {cred.isNumber ? (
                    <span className="number-display font-serif font-bold text-3xl sm:text-4xl text-gq-dark group-hover:text-gq-burgundy transition-colors duration-300">
                      {cred.prefix}0{cred.suffix}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-gq-gold fill-gq-gold animate-pulse-slow" />
                      <span className="font-serif font-bold text-lg text-gq-gold tracking-wide">
                        {cred.display}
                      </span>
                    </span>
                  )}
                </div>

                {/* Label */}
                <h3 className="font-serif font-semibold text-lg text-gq-dark mb-2 leading-tight">
                  {cred.label}
                </h3>

                {/* Description */}
                <p className="text-gq-dark/70 text-sm leading-relaxed">
                  {cred.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Credentials;
