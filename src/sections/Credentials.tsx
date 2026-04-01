import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  {
    number: '01',
    value: 34,
    prefix: '',
    suffix: '',
    label: 'Years of Experience',
    description: 'Specialized expertise in OK construction & business law',
    isNumber: true,
  },
  {
    number: '02',
    value: null,
    display: 'Author',
    label: 'Lexis Nexis Treatise',
    description: 'Wrote the definitive bar treatise on OK construction law',
    isNumber: false,
  },
  {
    number: '03',
    value: null,
    display: 'Published',
    label: 'Lien Book Author',
    description: 'Author of the industry standard OK Mechanics Lien Book',
    isNumber: false,
  },
  {
    number: '04',
    value: 100,
    prefix: '',
    suffix: '+',
    label: 'Attorneys Trained',
    description: 'Teaching CLE courses on lien practice across Oklahoma',
    isNumber: true,
  },
];

const Credentials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Banner container reveal
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Grid items staggered animation
      const items = containerRef.current?.querySelectorAll('.cred-column');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );

        // Animate numbers independently
        items.forEach((item, index) => {
          const numberEl = item.querySelector('.number-display');
          const cred = credentials[index];

          if (cred.isNumber && numberEl && cred.value !== null) {
            const obj = { value: 0 };
            gsap.to(obj, {
              value: cred.value,
              duration: 2.0,
              delay: index * 0.15 + 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                once: true,
              },
              onUpdate: () => {
                numberEl.textContent = Math.round(obj.value).toString();
              },
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
      className="w-full bg-gq-dark-gradient py-10 sm:py-12 lg:py-16 xl:py-20 relative overflow-hidden"
    >
      {/* Subtle Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="container-gq relative z-10">
        <div
          ref={containerRef}
          className="w-full border-y md:border border-[#C5A869]/20 md:rounded-xl overflow-hidden bg-gq-dark/80 backdrop-blur-md shadow-2xl relative"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A869]/30 to-transparent" />

          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#C5A869]/10">
            {credentials.map((cred, index) => (
              <div
                key={index}
                className="cred-column flex-1 relative p-6 lg:p-10 group overflow-hidden bg-gq-dark transition-colors hover:bg-[#1A1510] duration-500"
              >
                {/* 
                  Visual Stimulation: Huge, faint typographic background 
                */}
                <div className="absolute lg:-bottom-6 lg:-right-4 bottom-2 right-4 font-serif italic text-7xl lg:text-9xl tracking-tighter text-[#C5A869] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 select-none pointer-events-none z-0">
                  {cred.number}
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                  {/* Geometric Anchor/Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-[#C5A869] opacity-60 group-hover:scale-150 group-hover:opacity-100 transition-all duration-300" />
                    <h3 className="font-sans font-medium tracking-[0.15em] text-[10px] lg:text-xs uppercase text-[#C5A869]">
                      {cred.label}
                    </h3>
                  </div>

                  {/* Value/Metric display */}
                  <div className="my-2">
                    {cred.isNumber ? (
                      <div className="flex items-baseline font-serif font-medium tracking-tight text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gq-light group-hover:text-[#E6D3A3] transition-colors duration-500">
                        {cred.prefix && <span>{cred.prefix}</span>}
                        <span className="number-display">0</span>
                        {cred.suffix && <span>{cred.suffix}</span>}
                      </div>
                    ) : (
                      <div className="font-serif font-medium tracking-tight text-2xl sm:text-3xl lg:text-4xl text-gq-light group-hover:text-[#E6D3A3] transition-colors duration-500">
                        {cred.display}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gq-light/60 text-xs lg:text-sm leading-relaxed font-light mt-auto">
                    {cred.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
