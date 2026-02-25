import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const mainContentRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const closingRef = useRef<HTMLParagraphElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gold line draw
      gsap.fromTo(
        goldLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Label fade + tracking
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, letterSpacing: '0px' },
        {
          opacity: 1,
          letterSpacing: '2px',
          duration: 0.6,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Photo reveal with mask animation
      gsap.fromTo(
        photoRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Intro word-by-word reveal
      if (introRef.current) {
        const words = introRef.current.innerText.split(' ');
        introRef.current.innerHTML = words
          .map((word) => `<span class="inline-block opacity-0">${word}</span>`)
          .join(' ');

        const wordSpans = introRef.current.querySelectorAll('span');
        gsap.to(wordSpans, {
          opacity: 1,
          duration: 0.05,
          stagger: 0.04,
          delay: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Main content line reveal
      gsap.fromTo(
        mainContentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mainContentRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Quote dramatic reveal
      gsap.fromTo(
        quoteRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Quote marks scale
      const quoteMarks = quoteRef.current?.querySelectorAll('.quote-mark');
      if (quoteMarks) {
        gsap.fromTo(
          quoteMarks,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            delay: 1.4,
            ease: 'back.out(1.7)',
            stagger: 0.1,
          }
        );
      }

      // Closing fade
      gsap.fromTo(
        closingRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 1.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: closingRef.current,
            start: 'top 90%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-gq-dark-gradient section-padding relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gq-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="container-gq relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-5 relative">
            {/* Gold vertical line */}
            <div
              ref={goldLineRef}
              className="absolute left-0 top-0 w-1 h-full bg-gq-gold-gradient rounded-full origin-top hidden lg:block"
            />

            <div className="lg:pl-8">
              {/* Section Label */}
              <span
                ref={labelRef}
                className="inline-block text-gq-gold text-sm uppercase tracking-widest mb-6"
              >
                Why Gary Quinnett?
              </span>

              {/* Gary's Photo - Professional reveal animation */}
              <div
                ref={photoRef}
                className="relative mb-8 rounded-xl overflow-hidden shadow-2xl border-2 border-gq-gold/30"
              >
                <img
                  src="/gary-photo.png"
                  alt="Gary Quinnett at work"
                  className="w-full h-auto object-cover"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gq-dark/40 via-transparent to-transparent" />
                {/* Gold accent corner */}
                <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-gq-gold rounded-br-xl" />
              </div>

              {/* Intro Paragraph */}
              <p
                ref={introRef}
                className="font-serif font-medium tracking-wide text-xl sm:text-2xl text-gq-light leading-relaxed mb-8"
              >
                Before practicing law, Gary Quinnett spent years in private equity
                and Fortune 500 corporate environments, negotiating high-stakes
                deals and learning to see every problem through a business lens.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            {/* Main Content */}
            <p
              ref={mainContentRef}
              className="text-gq-light/80 text-lg leading-relaxed mb-10"
            >
              That background shapes everything about how he practices law today.
              When you bring Gary a construction dispute or a business transaction,
              you&apos;re not getting a lawyer who only sees statutes and case law.
              You&apos;re getting someone who understands{' '}
              <span className="text-gq-gold shimmer-hover">cash flow</span>,{' '}
              <span className="text-gq-gold shimmer-hover">project timelines</span>,{' '}
              <span className="text-gq-gold shimmer-hover">business relationships</span>, and
              the real-world consequences of every legal decision.
            </p>

            {/* Pull Quote */}
            <blockquote
              ref={quoteRef}
              className="relative bg-gq-dark-warm/50 rounded-xl p-8 lg:p-10 mb-10 border border-gq-gold/20"
            >
              {/* Opening quote mark */}
              <span className="quote-mark absolute -top-4 -left-2 font-serif text-7xl text-gq-gold leading-none">
                &ldquo;
              </span>

              <p className="font-serif font-medium tracking-wide text-2xl sm:text-3xl text-gq-light leading-relaxed italic relative z-10">
                Gary is selective about his cases. He doesn&apos;t take work he
                can&apos;t win. That&apos;s not arrogance. It&apos;s respect for
                your time and money. When Gary takes your case, he&apos;s{' '}
                <span className="text-gq-gold not-italic font-semibold shimmer-text">
                  all in
                </span>
                .
              </p>

              {/* Closing quote mark */}
              <span className="quote-mark absolute -bottom-8 -right-2 font-serif text-7xl text-gq-gold leading-none">
                &rdquo;
              </span>
            </blockquote>

            {/* Closing */}
            <p
              ref={closingRef}
              className="font-serif font-medium tracking-wide text-xl text-[#C5A869] text-center shimmer-text"
            >
              That&apos;s the difference 34 years makes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
