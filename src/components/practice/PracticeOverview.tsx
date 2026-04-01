import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PracticeOverviewProps {
  title: string;
  titleAccent: string;
  paragraphs: string[];
  statuteRef?: string;
  listTitle: string;
  listIcon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  listItems: string[];
  ctaText: string;
}

const PracticeOverview = ({
  title,
  titleAccent,
  paragraphs,
  statuteRef,
  listTitle,
  listIcon: ListIcon,
  listItems,
  ctaText,
}: PracticeOverviewProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column reveal
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Right column reveal
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Stagger list items
      const items = rightRef.current?.querySelectorAll('.list-item');
      if (items) {
        gsap.fromTo(
          items,
          { opacity: 0, x: 15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
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
        <div className="mb-12 lg:mb-16">
          <h2 className="font-serif font-medium text-gq-dark text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-6xl">
            {title}{' '}
            <span className="text-gq-gold-gradient italic">
              {titleAccent}
            </span>
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left: Educational text */}
          <div ref={leftRef} className="lg:col-span-3">
            <div className="space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-sans text-[#2d2418]/80 text-base sm:text-lg leading-relaxed font-light"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {statuteRef && (
              <p className="mt-6 font-sans text-sm italic text-[#8E733E]">
                {statuteRef}
              </p>
            )}

            {/* CTA link */}
            <div className="mt-8 lg:mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 text-[#9B2D3D] hover:text-[#7A232F] transition-colors group/link"
              >
                <span className="font-sans text-sm sm:text-base font-semibold tracking-wide relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-[#9B2D3D] after:origin-bottom-right after:transition-transform after:duration-300 group-hover/link:after:scale-x-100 group-hover/link:after:origin-bottom-left">
                  {ctaText}
                </span>
                <ArrowRight
                  className="h-4 w-4 -rotate-45 group-hover/link:rotate-0 transition-transform duration-500"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>

          {/* Right: Dark card with list */}
          <div ref={rightRef} className="lg:col-span-2">
            <div className="bg-gq-dark-gradient rounded-2xl p-8 lg:p-10 relative overflow-hidden shadow-xl">
              {/* Subtle top glow */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C5A869]/30 to-transparent" />

              {/* Noise overlay */}
              <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C5A869]/10 border border-[#C5A869]/20">
                    <ListIcon
                      className="h-5 w-5 text-[#C5A869]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-serif font-medium text-xl sm:text-2xl text-gq-light">
                    {listTitle}
                  </h3>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#C5A869]/15 mb-6" />

                {/* Checklist */}
                <ul className="space-y-4">
                  {listItems.map((item, index) => (
                    <li
                      key={index}
                      className="list-item flex items-start gap-3"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#C5A869]"
                        strokeWidth={1.5}
                      />
                      <span className="font-sans text-sm sm:text-base text-gq-light/80 font-light leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeOverview;
