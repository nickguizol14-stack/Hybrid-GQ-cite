import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

interface PracticeTestimonialsProps {
  testimonials: Testimonial[];
}

const PracticeTestimonials = ({ testimonials }: PracticeTestimonialsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      {/* Decorative background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gq-gold/40 to-transparent" />
      <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-gq-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-gq relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-10 lg:mb-16">
          <p className="text-gq-gold text-sm md:text-base tracking-[0.2em] uppercase font-medium mb-4 font-sans">
            Client Experiences
          </p>
          <h2 className="font-serif font-medium text-gq-light text-3xl sm:text-4xl md:text-5xl">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gq-gold to-transparent mx-auto mt-6 opacity-70 rounded-full" />
        </div>

        {/* Testimonial cards */}
        <div
          ref={cardsRef}
          className={`max-w-5xl mx-auto grid gap-8 ${
            testimonials.length === 1
              ? 'grid-cols-1 max-w-2xl'
              : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative bg-gq-dark-warm backdrop-blur-md rounded-2xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gq-gold/20 group transition-all duration-500 hover:-translate-y-2"
            >
              {/* Gold accent border on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gq-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" />

              {/* Background quote decoration */}
              <Quote className="absolute top-6 right-8 w-20 h-20 text-gq-gold/10 rotate-180 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                {/* Quote icon */}
                <Quote className="w-10 h-10 text-gq-gold mb-6 fill-current opacity-80" />

                {/* Quote text */}
                <blockquote className="font-serif text-xl sm:text-2xl text-gq-light/95 leading-relaxed italic mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="mt-auto pt-6 border-t border-gq-gold/10 flex items-center justify-between">
                  <div>
                    <p className="font-sans font-semibold tracking-wide text-gq-light text-lg">
                      {testimonial.author}
                    </p>
                    <p className="text-gq-gold text-xs md:text-sm tracking-widest uppercase mt-1 font-medium font-sans">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="hidden sm:block w-12 h-px bg-gq-gold/40" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeTestimonials;
