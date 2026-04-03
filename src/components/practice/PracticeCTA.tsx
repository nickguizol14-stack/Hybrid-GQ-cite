import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PracticeCTAProps {
  title: string;
  description: string;
}

const PracticeCTA = ({ title, description }: PracticeCTAProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
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
      className="w-full bg-gq-dark-gradient py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden"
    >
      {/* Burgundy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gq-burgundy/10 via-transparent to-gq-burgundy/5 pointer-events-none" />

      {/* Decorative gold blur orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gq-gold/8 rounded-full blur-[150px] pointer-events-none" />

      {/* Top accent border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gq-gold/30 to-transparent" />

      <div className="container-gq relative z-10">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h2 className="font-serif font-medium text-gq-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
            {title}
          </h2>

          {/* Description */}
          <p className="font-sans text-gq-light/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            {description}
          </p>

          {/* CTA button */}
          <Link to="/contact" className="btn-primary inline-block text-lg">
            Schedule a Consultation
          </Link>

          {/* Phone number */}
          <p className="font-sans text-gq-light/50 text-sm sm:text-base mt-6 tracking-wide">
            Or call us at{' '}
            <a
              href="tel:+14056072266"
              className="text-gq-gold hover:text-gq-gold transition-colors duration-300"
            >
              (405) 607-2266
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PracticeCTA;
