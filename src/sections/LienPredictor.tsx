import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  'Answer four questions about your project and payment status',
  'Get your statutory compliance assessment based on Oklahoma Title 42',
  'Share your results with Gary\'s team for a strategy consultation',
];

const MiniGauge = () => (
  <svg viewBox="0 0 120 70" className="w-28 mx-auto" aria-hidden="true">
    {/* Background arc */}
    <path
      d="M 15 60 A 45 45 0 0 1 105 60"
      fill="none"
      stroke="#3d3220"
      strokeWidth="8"
      strokeLinecap="round"
    />
    {/* Filled arc (strong = ~80%) */}
    <path
      d="M 15 60 A 45 45 0 0 1 95 35"
      fill="none"
      stroke="#4ade80"
      strokeWidth="8"
      strokeLinecap="round"
    />
    {/* Needle */}
    <line
      x1="60"
      y1="60"
      x2="90"
      y2="32"
      stroke="#C5A869"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Center dot */}
    <circle cx="60" cy="60" r="4" fill="#C5A869" />
  </svg>
);

const LienPredictor = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Preview card reveal
      gsap.fromTo(
        previewRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
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

      // Right column staggered reveal
      const items = contentRef.current?.querySelectorAll('.reveal-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
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
      id="lien-predictor"
      className="w-full bg-gq-light-gradient py-12 sm:py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply pointer-events-none" />

      <div className="container-gq relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column: Static preview card */}
          <div ref={previewRef} className="flex justify-center lg:justify-start">
            <div className="bg-[#2a2219] rounded-2xl p-6 sm:p-8 w-full max-w-[380px] shadow-2xl border border-[#C5A869]/10">
              {/* Card label */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-px bg-[#C5A869]/60" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C5A869] font-medium">
                  Sample Assessment
                </span>
              </div>

              {/* Mini gauge */}
              <div className="mb-3">
                <MiniGauge />
              </div>
              <p className="text-center text-green-400 font-sans text-sm font-semibold tracking-wide mb-6">
                Strong
              </p>

              {/* Factor rows */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3 bg-[#1A1510]/60 rounded-lg px-4 py-2.5">
                  <span className="text-gq-light/70 text-xs font-sans">Filing Deadline</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gq-light/90 text-xs font-sans font-medium">47 days</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 bg-[#1A1510]/60 rounded-lg px-4 py-2.5">
                  <span className="text-gq-light/70 text-xs font-sans">Pre-Lien Notice</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gq-light/90 text-xs font-sans font-medium">Compliant</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 bg-[#1A1510]/60 rounded-lg px-4 py-2.5">
                  <span className="text-gq-light/70 text-xs font-sans">Written Contract</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gq-light/90 text-xs font-sans font-medium">Oral only</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Steps and CTA */}
          <div ref={contentRef} className="flex flex-col gap-6">
            {/* Gold label */}
            <div className="reveal-item">
              <span className="inline-flex items-center gap-2">
                <div className="w-8 h-px bg-[#C5A869]/60" />
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A869] font-medium">
                  Free Assessment Tool
                </span>
              </span>
            </div>

            {/* Headline */}
            <h2 className="reveal-item font-serif font-medium text-[#1A1510] text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
              Evaluate Your Lien Claim{' '}
              <span className="text-[#8E733E] italic">in 2 Minutes</span>
            </h2>

            {/* Steps */}
            <div className="reveal-item space-y-4 mt-2">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C5A869]/10 border border-[#C5A869]/30 flex items-center justify-center">
                    <span className="font-sans text-sm font-semibold text-[#C5A869]">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-[#1A1510]/75 text-sm sm:text-base leading-relaxed font-light pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="reveal-item mt-4">
              <Link
                to="/lien-predictor"
                className="inline-flex items-center justify-center gap-3 bg-[#1A1510] hover:bg-[#2A2219] text-[#FDFBF7] px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 font-sans tracking-widest text-sm uppercase group shadow-xl hover:shadow-2xl"
              >
                <span className="font-medium">Start Your Assessment</span>
                <ArrowRight
                  className="w-4 h-4 text-[#C5A869] group-hover:translate-x-1 transition-transform duration-300"
                  strokeWidth={2}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LienPredictor;
