import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const firmNameRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overlay fade in
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );

      // Firm name reveal - word by word with shimmer
      if (firmNameRef.current) {
        const words = firmNameRef.current.innerText.split(' ');
        firmNameRef.current.innerHTML = words
          .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block shimmer-text">${word}</span></span>`)
          .join(' ');

        const wordSpans = firmNameRef.current.querySelectorAll('span > span');
        gsap.fromTo(
          wordSpans,
          { y: '100%', opacity: 0 },
          {
            y: '0%',
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.5,
            ease: 'power3.out',
          }
        );
      }

      // Tagline character cascade
      if (taglineRef.current) {
        const text = taglineRef.current.innerText;
        taglineRef.current.innerHTML = text
          .split('')
          .map((char) =>
            char === ' '
              ? ' '
              : `<span class="inline-block opacity-0">${char}</span>`
          )
          .join('');

        const chars = taglineRef.current.querySelectorAll('span');
        gsap.to(chars, {
          opacity: 1,
          duration: 0.05,
          stagger: 0.03,
          delay: 1,
          ease: 'none',
        });
      }

      // Subheadline line reveal
      gsap.fromTo(
        subheadlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 1.8, ease: 'power3.out' }
      );

      // CTA button
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.7, delay: 2.2, ease: 'back.out(1.7)' }
      );

      // Scroll-based parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(contentRef.current, {
            y: progress * -50,
            opacity: 1 - progress * 1.5,
          });
          gsap.set(overlayRef.current, { opacity: 0.7 + progress * 0.2 });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Video - cropped more aggressively top-to-bottom */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: 'cover',
          objectPosition: 'center 55%',
          transform: 'scale(1.1)', // slight zoom to crop Padding
        }}
        poster="/hero-image.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay - Lighter browns */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, rgba(45, 36, 24, 0.9) 0%, rgba(45, 36, 24, 0.75) 50%, rgba(61, 50, 32, 0.65) 100%)`,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 container-gq py-20 lg:py-28"
      >
        <div className="max-w-3xl">
          {/* Firm Name - Single line with shimmer animation */}
          <p
            ref={firmNameRef}
            className="font-serif text-gq-gold text-base sm:text-lg md:text-xl lg:text-2xl tracking-wider uppercase mb-4 font-bold shimmer-text whitespace-nowrap"
          >
            The Law Offices of Gary David Quinnett, PLLC
          </p>

          {/* Tagline */}
          <h1
            ref={taglineRef}
            className="font-serif font-bold text-gq-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 leading-none"
          >
            We play to win.
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-gq-light/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 max-w-2xl"
          >
            Aggressive, business-savvy legal representation for Oklahoma&apos;s
            contractors, business owners, and dealmakers.{' '}
            <span className="text-gq-gold font-semibold shimmer-hover">34 years of results.</span>
          </p>

          {/* CTA Button */}
          <a
            ref={ctaRef}
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex btn-primary text-base sm:text-lg group py-3 px-6"
          >
            <span>Schedule Your Consultation</span>
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
