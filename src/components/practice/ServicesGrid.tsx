import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  statute?: string;
}

interface ServicesGridProps {
  title: string;
  subtitle: string;
  services: Service[];
}

const ServicesGrid = ({ title, subtitle, services }: ServicesGridProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Staggered card entrance
      const cards = gridRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
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
      className="w-full bg-gq-light-gradient py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden"
    >
      <div className="container-gq">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-16">
          <h2 className="font-serif font-medium text-gq-light text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-6xl mb-4">
            {title}
          </h2>
          <p className="font-sans text-gq-light/70 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="service-card group relative bg-gq-dark-warm rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Gold bottom line that expands on hover */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-12 bg-gradient-to-r from-gq-gold via-gq-gold to-gq-gold group-hover:w-full transition-all duration-500 ease-out" />

                {/* Icon circle */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gq-gold/10 border border-gq-gold/20 group-hover:bg-gq-gold/20 group-hover:border-gq-gold/40 transition-all duration-500">
                  <Icon
                    className="h-6 w-6 text-gq-gold group-hover:text-gq-gold transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="font-serif font-medium text-xl sm:text-2xl text-gq-light mb-3 leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-gq-light/70 text-sm sm:text-base leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Optional statute reference */}
                {service.statute && (
                  <p className="mt-4 font-sans text-xs italic text-gq-gold/80">
                    {service.statute}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
