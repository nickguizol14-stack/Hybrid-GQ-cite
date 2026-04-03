import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Practice {
  title: string;
  description: string;
  href: string;
}

interface RelatedPracticesProps {
  practices: Practice[];
}

const RelatedPractices = ({ practices }: RelatedPracticesProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const cards = cardsRef.current?.querySelectorAll('.related-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gq-dark-gradient py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden"
    >
      {/* Decorative borders */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gq-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gq-gold/30 to-transparent" />

      <div className="container-gq relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-10 lg:mb-16">
          <p className="text-gq-gold text-sm md:text-base tracking-[0.2em] uppercase font-medium mb-4 font-sans">
            Explore More
          </p>
          <h2 className="font-serif font-medium text-gq-light text-3xl sm:text-4xl md:text-5xl">
            Related Practice Areas
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gq-gold to-transparent mx-auto mt-6 opacity-70 rounded-full" />
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          {practices.map((practice, index) => (
            <Link
              key={index}
              to={practice.href}
              className="related-card group relative bg-gq-dark-warm rounded-2xl p-8 border border-gq-gold/20 transition-all duration-500 hover:-translate-y-2 hover:border-gq-gold/50 hover:shadow-[0_12px_40px_rgb(0,0,0,0.3)]"
            >
              {/* Top accent border */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gq-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />

              <h3 className="font-serif font-medium text-gq-light text-xl sm:text-2xl mb-3">
                {practice.title}
              </h3>

              <p className="font-sans text-gq-light/60 text-sm sm:text-base leading-relaxed mb-6 line-clamp-2">
                {practice.description}
              </p>

              <div className="flex items-center gap-2 text-gq-gold text-sm font-sans font-medium tracking-wide">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPractices;
