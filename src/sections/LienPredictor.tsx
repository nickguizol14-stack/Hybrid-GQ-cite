import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LienPredictor = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background watermark parallax
      const watermark = sectionRef.current?.querySelector('.bg-watermark');
      if (watermark) {
        gsap.to(watermark, {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Content staggered reveal
      const contentElements = contentRef.current?.querySelectorAll('.reveal-text');
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
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
      id="lien-predictor"
      className="w-full bg-gq-light-gradient py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply pointer-events-none" />

      {/* Massive Typographic Watermark */}
      <div className="bg-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-serif italic text-gq-gold opacity-[0.03] pointer-events-none select-none leading-none z-0">
        &sect;
      </div>

      <div className="container-gq relative z-10">
        <div
          ref={contentRef}
          className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center"
        >
          {/* Label */}
          <div className="reveal-text mb-8">
            <span className="inline-flex items-center gap-2 border border-[#C5A869]/30 rounded-full px-5 py-2 bg-[#C5A869]/5 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-[#C5A869]" strokeWidth={2} />
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A869] font-medium">
                Proprietary Methodology
              </span>
            </span>
          </div>

          {/* Headline */}
          <h2 className="reveal-text font-serif font-medium text-[#1A1510] text-5xl sm:text-6xl md:text-7xl mb-10 leading-[1.1] tracking-tight">
            Strategic Claim <br className="hidden sm:block" />
            <span className="text-[#8E733E] italic">Assessment.</span>
          </h2>

          {/* Core Message */}
          <p className="reveal-text text-[#1A1510]/80 text-xl sm:text-2xl leading-relaxed mb-8 font-serif max-w-3xl mx-auto">
            Instead of relying on guesswork or generic legal advice, our predictive framework processes your project details against <strong className="text-[#1A1510] font-semibold">34 years of historical Oklahoma lien data</strong>.
          </p>

          <p className="reveal-text text-[#1A1510]/70 text-base sm:text-lg leading-relaxed mb-14 font-light max-w-2xl mx-auto">
            Understanding the precise strength and viability of your claim before committing to costly litigation is how we protect your bottom line. We evaluate the notice requirements, filing deadlines, and contractor tier mapping to calculate your recovery probability.
          </p>

          {/* Elegant CTA Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="reveal-text inline-flex items-center justify-center gap-4 bg-[#1A1510] hover:bg-[#2A2219] text-[#FDFBF7] px-6 sm:px-10 py-4 sm:py-5 transition-all duration-300 font-sans tracking-widest text-sm uppercase group shadow-xl hover:shadow-2xl"
          >
            <span className="font-medium">Evaluate Your Claim Strategy</span>
            <div className="w-8 h-[1px] bg-[#C5A869]/50 group-hover:w-12 transition-all duration-300 relative">
              <ArrowRight className="w-4 h-4 text-[#C5A869] absolute -right-1 top-1/2 -translate-y-1/2 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2} />
            </div>
          </a>

          <p className="reveal-text text-[#1A1510]/40 text-[10px] tracking-widest uppercase mt-6 font-sans font-semibold">
            Completely Confidential • Data-Driven Analysis
          </p>

        </div>
      </div>
    </section>
  );
};

export default LienPredictor;
