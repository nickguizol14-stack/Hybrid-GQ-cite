import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PracticeHeroProps {
  title: string;
  titleAccent: string;
  subtitle: string;
  backgroundImage: string;
}

const PracticeHero = ({
  title,
  titleAccent,
  subtitle,
  backgroundImage,
}: PracticeHeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the background image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Staggered entrance animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      tl.fromTo(
        breadcrumbRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[60vh] min-h-[500px] sm:h-[70vh] sm:min-h-[600px] w-full overflow-hidden"
    >
      {/* Background image with parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 -top-[10%] h-[120%] w-full"
      >
        <img
          src={backgroundImage}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
      </div>

      {/* Gradient overlay: dark left to transparent right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1510] via-[#1A1510]/85 to-transparent" />

      {/* Subtle noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Content */}
      <div className="container-gq relative z-10 flex h-full flex-col justify-center pt-28 sm:pt-32">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <div ref={breadcrumbRef} className="mb-6 sm:mb-8">
            <nav className="flex items-center gap-2 text-sm font-sans tracking-wide">
              <Link
                to="/#practice-areas"
                className="text-[#C5A869]/70 hover:text-[#C5A869] transition-colors duration-300"
              >
                Practice Areas
              </Link>
              <ChevronRight
                className="h-3.5 w-3.5 text-[#C5A869]/40"
                strokeWidth={1.5}
              />
              <span className="text-gq-light/90">{title}</span>
            </nav>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="font-serif font-bold text-gq-light mb-4 sm:mb-6"
          >
            {title}{' '}
            <span className="text-gq-light/20">{titleAccent}</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-sans text-gq-light/80 text-lg sm:text-xl leading-relaxed font-light max-w-2xl mb-8 sm:mb-10"
          >
            {subtitle}
          </p>

          {/* CTA */}
          <div ref={ctaRef}>
            <Link to="/contact" className="btn-primary inline-block">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#2d2418] to-transparent" />
    </section>
  );
};

export default PracticeHero;
