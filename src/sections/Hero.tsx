import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../components/Magnetic';

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
    let ctx: gsap.Context;

    // All hero entrance animations — unchanged from original
    const runAnimations = () => {
      ctx = gsap.context(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' });

        if (firmNameRef.current) {
          // Split text into animated word spans (safe — content is hardcoded, not user input)
          const words = firmNameRef.current.innerText.split(' ');
          firmNameRef.current.innerHTML = words // eslint-disable-line
            .map((word) => `<span class="inline-block overflow-hidden"><span class="inline-block shimmer-text">${word}</span></span>`)
            .join(' ');
          const wordSpans = firmNameRef.current.querySelectorAll('span > span');
          gsap.fromTo(wordSpans, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.5, ease: 'power3.out' });
        }

        if (taglineRef.current) {
          // Split text into animated character spans (safe — content is hardcoded)
          const text = taglineRef.current.innerText;
          taglineRef.current.innerHTML = text // eslint-disable-line
            .split('').map((char) => char === ' ' ? ' ' : `<span class="inline-block opacity-0">${char}</span>`).join('');
          const chars = taglineRef.current.querySelectorAll('span');
          gsap.to(chars, { opacity: 1, duration: 0.05, stagger: 0.03, delay: 1, ease: 'none' });
        }

        gsap.fromTo(subheadlineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 1.8, ease: 'power3.out' });
        gsap.fromTo(ctaRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, delay: 2.2, ease: 'back.out(1.7)' });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(contentRef.current, { y: progress * -50, opacity: 1 - progress * 1.5 });
            gsap.set(overlayRef.current, { opacity: 0.7 + progress * 0.2 });
          },
        });
      });
    };

    // On initial load, wait for preloader to finish before animating.
    // On navigation back to home (no preloader), run immediately.
    const preloaderActive = document.querySelector('[data-preloader]');
    if (preloaderActive) {
      window.addEventListener('preloader-complete', runAnimations, { once: true });
    } else {
      runAnimations();
    }

    return () => {
      window.removeEventListener('preloader-complete', runAnimations);
      ctx?.revert();
    };
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
        preload="metadata"
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: 'cover',
          objectPosition: 'center 50%',
          transform: 'scale(1.02)', // Reduced zoom to show more of the video
        }}
        poster="/hero-image.jpg"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay - Lighter browns with subtle blur */}
      <div
        ref={overlayRef}
        className="absolute inset-0 backdrop-blur-[2px]"
        style={{
          background: `linear-gradient(135deg, var(--theme-gradient-from) 0%, var(--theme-gradient-via) 50%, var(--theme-gradient-to) 100%)`,
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
            className="font-serif text-[0.65rem] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl tracking-[0.1em] sm:tracking-[0.2em] uppercase mb-6 font-medium shimmer-text max-w-full leading-relaxed"
            style={{ color: 'var(--theme-gold)' }}
          >
            The Law Offices of Gary David Quinnett, PLLC
          </p>

          {/* Tagline */}
          <h1
            ref={taglineRef}
            className="font-serif font-medium text-gq-light text-[2.75rem] leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] mb-6 sm:mb-8 drop-shadow-lg"
          >
            We play to win.
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="text-gq-light/90 text-[1.1rem] leading-[1.8] sm:text-lg md:text-xl lg:text-2xl sm:leading-loose mb-10 max-w-2xl font-light pr-4 sm:pr-0"
          >
            Aggressive, business-savvy legal representation for Oklahoma&apos;s
            contractors, business owners, and dealmakers.{' '}
            <span className="font-medium shimmer-hover block mt-2 sm:inline sm:mt-0" style={{ color: 'var(--theme-gold)' }}>34 years of results.</span>
          </p>

          {/* CTA Button */}
          <Magnetic strength={0.15}>
            <a
              ref={ctaRef}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex btn-primary text-sm sm:text-lg tracking-wide group py-3 sm:py-4 px-6 sm:px-10 backdrop-blur-sm"
              style={{ borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(var(--theme-accent-rgb), 0.3)' }}
            >
              <span>Schedule Your Consultation</span>
              <svg
                className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-500 ease-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default Hero;
