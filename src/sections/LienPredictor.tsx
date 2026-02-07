import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calculator, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Shield,
    text: 'Free. No obligation, no credit card required',
  },
  {
    icon: CheckCircle,
    text: 'Confidential. Your information stays private',
  },
  {
    icon: Zap,
    text: 'Instant results. Get your prediction in 60 seconds',
  },
];

const LienPredictor = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline typewriter effect
      if (headlineRef.current) {
        const text = headlineRef.current.innerText;
        headlineRef.current.innerHTML = '';

        const chars = text.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0';
          return span;
        });

        chars.forEach((char) => headlineRef.current?.appendChild(char));

        gsap.to(chars, {
          opacity: 1,
          duration: 0.03,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Content reveal
      const contentElements = contentRef.current?.querySelectorAll('.reveal-item');
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
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

      // Visual elements float in
      const visualElements = visualRef.current?.querySelectorAll('.visual-item');
      if (visualElements) {
        gsap.fromTo(
          visualElements,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: visualRef.current,
              start: 'top 80%',
              once: true,
              onEnter: () => {
                // Animate the specific counter number
                const counter = visualRef.current?.querySelector('.counter-number');
                if (counter) {
                  const obj = { value: 0 };
                  gsap.to(obj, {
                    value: 87,
                    duration: 2.0,
                    ease: 'power2.out',
                    delay: 0.5,
                    onUpdate: () => {
                      counter.textContent = Math.round(obj.value).toString();
                    }
                  });
                }
              }
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
      className="w-full bg-gq-light-gradient section-padding relative overflow-hidden"
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a1410' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gq-gold/10 rounded-full blur-3xl translate-x-1/2" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gq-burgundy/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="container-gq relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            {/* Headline */}
            <h2
              ref={headlineRef}
              className="font-serif font-bold text-gq-dark text-4xl sm:text-5xl md:text-6xl mb-4"
            >
              How Strong Is Your Lien Claim?
            </h2>

            {/* Subheadline */}
            <p className="reveal-item font-serif text-2xl sm:text-3xl text-gq-burgundy mb-6">
              Know your odds before you file.
            </p>

            {/* Description */}
            <p className="reveal-item text-gq-dark/80 text-lg leading-relaxed mb-8">
              Answer 10 questions about your construction project and payment
              dispute. Our proprietary algorithm, built on{' '}
              <span className="font-semibold text-gq-gold">34 years</span> of
              Oklahoma lien law experience, predicts the likelihood of
              recovering what you&apos;re owed.
            </p>

            {/* Features */}
            <ul className="space-y-4 mb-10">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <li
                    key={idx}
                    className="reveal-item flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gq-gold/10 flex items-center justify-center group-hover:bg-gq-gold/20 transition-colors duration-300">
                      <Icon className="w-5 h-5 text-gq-gold group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-gq-dark/80">{feature.text}</span>
                  </li>
                );
              })}
            </ul>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('#contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="reveal-item inline-flex btn-primary text-lg group bg-gq-burgundy hover:bg-gq-burgundy-light text-white"
            >
              <Calculator className="w-5 h-5 mr-2" />
              <span>Predict Your Lien Success - Free</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Visual */}
          <div ref={visualRef} className="relative hidden lg:block">
            {/* Main calculator card */}
            <div className="visual-item relative bg-white rounded-2xl shadow-2xl p-8 animate-float-slow">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gq-gold-gradient rounded-t-2xl" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-gq-gold/10 flex items-center justify-center">
                  <Calculator className="w-7 h-7 text-gq-gold" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-xl text-gq-dark">
                    Lien Predictor
                  </h4>
                  <p className="text-gq-dark/60 text-sm">
                    Powered by 34 years of data
                  </p>
                </div>
              </div>

              {/* Mock form fields */}
              <div className="space-y-4">
                <div className="h-12 bg-gray-50 rounded-lg border border-gray-100" />
                <div className="h-12 bg-gray-50 rounded-lg border border-gray-100" />
                <div className="h-12 bg-gray-50 rounded-lg border border-gray-100" />
                <div className="h-24 bg-gray-50 rounded-lg border border-gray-100" />
              </div>

              {/* Mock button */}
              <div className="mt-6 h-14 bg-gq-burgundy rounded-lg flex items-center justify-center shadow-lg transform hover:scale-[1.02] transition-transform">
                <span className="text-white font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Get Your Prediction
                </span>
              </div>
            </div>

            {/* Floating result card */}
            <div className="visual-item absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-6 animate-float-delayed">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-semibold text-gq-dark">
                  Strong Claim
                </span>
              </div>
              <div className="text-5xl font-serif font-bold text-gq-gold flex items-baseline gap-1">
                <span className="counter-number">0</span>
                <span className="text-2xl">%</span>
              </div>
              <p className="text-gq-dark/60 text-sm mt-1">
                Probability of recovery
              </p>
            </div>

            {/* Floating badge */}
            <div className="visual-item absolute -top-4 -right-4 bg-gq-gold-gradient rounded-full w-24 h-24 flex items-center justify-center shadow-lg animate-float">
              <span className="font-serif font-bold text-gq-dark text-center text-sm leading-tight">
                100%
                <br />
                Free
                <br />
                Tool
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LienPredictor;
