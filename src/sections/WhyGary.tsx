import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const authorityItems = [
  'Wrote the LexisNexis bar treatise on Oklahoma construction law. The reference other attorneys rely on.',
  'Published the industry-standard Oklahoma Mechanics and Materialmen\'s Lien Book.',
  'Trained over 100 Oklahoma attorneys through Continuing Legal Education courses.',
  'Spent 13 years in Fortune 500 corporate operations before practicing law.',
];

const WhyGary = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Photo slides in from left
      gsap.fromTo(
        photoRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Right-column items stagger in from right
      const items = rightRef.current?.querySelectorAll('.authority-item');
      if (items) {
        gsap.fromTo(
          items,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-gary"
      className="w-full bg-gq-light-gradient py-12 sm:py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="container-gq relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column: Gary's photo */}
          <div
            ref={photoRef}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative max-w-[320px] w-full">
              <div className="rounded-2xl overflow-hidden shadow-2xl border" style={{ borderColor: 'rgba(var(--theme-gold-rgb), 0.2)' }}>
                <img
                  src="/gary2.jpg"
                  alt="Gary Quinnett"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              {/* Subtle gold glow behind card */}
              <div className="absolute -inset-2 rounded-2xl -z-10 blur-xl" style={{ background: 'rgba(var(--theme-gold-rgb), 0.05)' }} />
            </div>
          </div>

          {/* Right column: Authority statements */}
          <div ref={rightRef} className="flex flex-col gap-6">
            {/* Gold label */}
            <div className="authority-item">
              <span className="inline-flex items-center gap-2">
                <div className="w-8 h-px" style={{ background: 'rgba(var(--theme-gold-rgb), 0.6)' }} />
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-medium" style={{ color: 'var(--theme-gold)' }}>
                  Why Gary Quinnett
                </span>
              </span>
            </div>

            {/* Authority items */}
            {authorityItems.map((item, index) => (
              <div
                key={index}
                className="authority-item flex items-start gap-3"
              >
                <CheckCircle2
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  strokeWidth={1.5}
                  style={{ color: 'var(--theme-gold)' }}
                />
                <p className="text-gq-light/80 text-sm sm:text-base leading-relaxed font-light">
                  {item}
                </p>
              </div>
            ))}

            {/* Standout line */}
            <p className="authority-item font-serif italic text-lg sm:text-xl leading-relaxed mt-2" style={{ color: 'var(--theme-gold)' }}>
              Your opponent's attorney may have attended one of Gary's training seminars.
            </p>

            {/* Link to /about */}
            <div className="authority-item mt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.15em] font-medium group transition-colors duration-300"
                style={{ color: 'var(--theme-gold)' }}
              >
                <span>Learn More About Gary</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyGary;
