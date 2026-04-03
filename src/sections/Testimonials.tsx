import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Gary understood our business from day one. He didn't just know the law. He knew construction. That made all the difference.",
    author: 'General Contractor',
    location: 'Oklahoma City',
  },
  {
    quote:
      'When our $2M payment dispute seemed hopeless, Gary found a path forward. We recovered every dollar.',
    author: 'Subcontractor',
    location: 'Tulsa',
  },
  {
    quote:
      "Gary's lien work saved our company. He's the only attorney I'll ever use for construction matters.",
    author: 'Building Supplier',
    location: 'Norman',
  },
  {
    quote:
      "The acquisition of our competitor was highly complex, but the firm navigated every regulatory hurdle flawlessly.",
    author: 'CEO, Tech Solutions',
    location: 'Edmond',
  },
  {
    quote:
      "Thanks again for all your help. I wish you covered all states. Your expertise in real estate zoning saved our development project.",
    author: 'Commercial Developer',
    location: 'Oklahoma City',
  },
  {
    quote:
      "I can't count how many times Gary has saved me a fortune in legal disputes. Would never use a different lawyer.",
    author: 'Contractor',
    location: 'Oklahoma City',
  },
  {
    quote:
      "Their team completely restructured our corporate governance. We are now positioned for serious growth without the liability risk.",
    author: 'President, Manufacturing Corp',
    location: 'Broken Arrow',
  },
  {
    quote:
      "We faced a nasty breach of contract suit from a vendor. Gary and his team dismantled their claims before we ever saw a courtroom.",
    author: 'Business Owner',
    location: 'Moore',
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Carousel entrance
      gsap.fromTo(
        carouselContainerRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselContainerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Badges entrance
      const badges = badgesRef.current?.querySelectorAll('.badge-item');
      if (badges) {
        gsap.fromTo(
          badges,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: badgesRef.current,
              start: 'top 90%',
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
      id="testimonials"
      className="w-full bg-gq-light-gradient py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(to right, transparent, rgba(var(--theme-gold-rgb), 0.4), transparent)` }} />
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: `linear-gradient(to right, transparent, rgba(var(--theme-gold-rgb), 0.4), transparent)` }} />
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none" style={{ background: `rgba(var(--theme-gold-rgb), 0.06)` }} />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none" style={{ background: `rgba(var(--theme-accent-rgb), 0.04)` }} />

      <div className="container-gq relative z-10">

        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-10 lg:mb-16">
          <p className="text-sm md:text-base tracking-[0.2em] uppercase font-medium mb-4" style={{ color: 'var(--theme-gold)' }}>
            Client Experiences
          </p>
          <h2 className="font-serif font-medium text-gq-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            Trusted by Oklahoma&apos;s <br />
            <span className="italic" style={{ color: 'var(--theme-gold)' }}>Builders & Business Owners</span>
          </h2>
          <div className="w-24 h-1 mx-auto opacity-70 rounded-full" style={{ background: `linear-gradient(to right, transparent, var(--theme-gold), transparent)` }} />
        </div>

        {/* Testimonials Embla Carousel */}
        <div
          ref={carouselContainerRef}
          className="relative max-w-6xl mx-auto mb-12 sm:mb-16 px-2 sm:px-8 lg:px-12"
        >
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex touch-pan-y pt-4 pb-12">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_80%] lg:flex-[0_0_60%] px-4"
                >
                  <div
                    className="relative h-full backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.3)] group transition-transform duration-500 hover:-translate-y-2"
                    style={{
                      background: 'var(--theme-card-bg)',
                      border: '1px solid var(--theme-card-border)',
                    }}
                  >

                    {/* Premium Top Accent border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gq-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />

                    {/* Large Background Quote */}
                    <Quote className="absolute top-6 right-8 w-24 h-24 rotate-180 pointer-events-none" style={{ color: 'rgba(var(--theme-gold-rgb), 0.08)' }} />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="mb-8">
                        <Quote className="w-10 h-10 mb-6 fill-current opacity-80" style={{ color: 'var(--theme-gold)' }} />
                        <blockquote className="font-serif text-2xl md:text-3xl text-gq-light leading-relaxed italic" style={{ opacity: 0.95 }}>
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                      </div>

                      <div className="mt-auto pt-6 flex items-center justify-between" style={{ borderTop: '1px solid rgba(var(--theme-gold-rgb), 0.1)' }}>
                        <div>
                          <p className="font-sans font-semibold tracking-wide text-gq-light text-lg">
                            {testimonial.author}
                          </p>
                          <p className="text-xs md:text-sm tracking-widest uppercase mt-1 font-medium" style={{ color: 'var(--theme-gold)' }}>
                            {testimonial.location}
                          </p>
                        </div>
                        {/* Decorative line */}
                        <div className="hidden sm:block w-12 h-px" style={{ background: 'rgba(var(--theme-gold-rgb), 0.4)' }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 ml-0 sm:-ml-2 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-xl transition-all duration-300 shadow-[0_4px_15px_rgb(0,0,0,0.2)] z-20 group"
            style={{
              background: 'var(--theme-card-bg)',
              border: '1px solid var(--theme-card-border)',
              color: 'var(--theme-gold)',
            }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 mr-0 sm:-mr-2 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-xl transition-all duration-300 shadow-[0_4px_15px_rgb(0,0,0,0.2)] z-20 group"
            style={{
              background: 'var(--theme-card-bg)',
              border: '1px solid var(--theme-card-border)',
              color: 'var(--theme-gold)',
            }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Lawyers of Distinction Badges - Elevated Layout */}
        <div ref={badgesRef} className="max-w-4xl mx-auto">
          <div className="relative p-[1px] rounded-2xl" style={{ background: `linear-gradient(to right, transparent, rgba(var(--theme-gold-rgb), 0.4), transparent)`, boxShadow: `0 0 30px rgba(var(--theme-gold-rgb), 0.1)` }}>
            <div className="backdrop-blur-xl rounded-2xl py-8 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-14 shadow-[0_8px_30px_rgb(0,0,0,0.2)]" style={{ background: 'var(--theme-card-bg)' }}>

              <div className="badge-item flex items-center gap-5 group">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full scale-125" style={{ background: 'var(--theme-gold)' }} />
                  <img
                    src="/lawyers-distinction-2021.png"
                    alt="Lawyers of Distinction 2021"
                    className="relative h-20 sm:h-24 w-auto object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                  />
                </div>
                <div>
                  <p className="font-serif font-medium text-gq-light text-lg sm:text-xl">Lawyers of Distinction</p>
                  <p className="text-xs sm:text-sm tracking-[0.2em] uppercase font-bold mt-1" style={{ color: 'var(--theme-gold)' }}>2021 Recipient</p>
                </div>
              </div>

              {/* Separator Line */}
              <div className="hidden md:block w-px h-20" style={{ background: `linear-gradient(to bottom, transparent, rgba(var(--theme-gold-rgb), 0.3), transparent)` }} />

              <div className="badge-item flex items-center gap-5 group">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full scale-125" style={{ background: 'var(--theme-gold)' }} />
                  <img
                    src="/lawyers-distinction-2022.png"
                    alt="Lawyers of Distinction 2022"
                    className="relative h-20 sm:h-24 w-auto object-contain transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                  />
                </div>
                <div>
                  <p className="font-serif font-medium text-gq-light text-lg sm:text-xl">Lawyers of Distinction</p>
                  <p className="text-xs sm:text-sm tracking-[0.2em] uppercase font-bold mt-1" style={{ color: 'var(--theme-gold)' }}>2022 Recipient</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
