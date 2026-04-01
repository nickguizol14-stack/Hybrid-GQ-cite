import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

const ProcessSteps = ({ steps }: ProcessStepsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

      // Stagger step items
      const items = stepsRef.current?.querySelectorAll('.step-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            delay: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Animate the dotted connector lines
      const connectors =
        stepsRef.current?.querySelectorAll('.step-connector');
      if (connectors) {
        gsap.fromTo(
          connectors,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stepsRef.current,
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
      {/* Subtle noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="container-gq relative z-10">
        {/* Section heading */}
        <div ref={headingRef} className="text-center mb-12 lg:mb-20">
          <h2 className="font-serif font-medium text-gq-light text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-6xl">
            Working With{' '}
            <span className="text-gq-gold-gradient italic">Gary</span>
          </h2>
        </div>

        {/* Steps row */}
        <div
          ref={stepsRef}
          className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-8 lg:gap-0"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-item flex flex-col lg:flex-col items-center lg:items-center text-center flex-1 relative"
            >
              {/* Connector line (between circles, not on last item) */}
              {index < steps.length - 1 && (
                <div className="step-connector hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] origin-left">
                  <div className="w-full border-t-2 border-dashed border-[#C5A869]/20" />
                </div>
              )}

              {/* Number circle */}
              <div className="relative mb-5 lg:mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[#C5A869]/40 bg-transparent transition-colors duration-300 group hover:border-[#C5A869]">
                <span className="font-serif font-medium text-xl text-[#C5A869]">
                  {index + 1}
                </span>
              </div>

              {/* Mobile connector (vertical dotted line) */}
              {index < steps.length - 1 && (
                <div className="lg:hidden w-px h-6 border-l-2 border-dashed border-[#C5A869]/20 mb-2 -mt-3" />
              )}

              {/* Text content */}
              <div className="max-w-[220px] lg:px-4">
                <h3 className="font-serif font-medium text-lg sm:text-xl text-gq-light mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-gq-light/60 text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
