import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

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
      "Thanks again for all your help. I wish you covered all states.",
    author: 'Business Owner',
    location: 'Oklahoma City',
  },
  {
    quote:
      "I can't count how many times Gary has saved me a fortune in legal disputes. Would never use a different lawyer.",
    author: 'Contractor',
    location: 'Oklahoma City',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

      // Badges animation
      const badges = badgesRef.current?.querySelectorAll('.badge-item');
      if (badges) {
        gsap.fromTo(
          badges,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: badgesRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Carousel entrance
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const goToNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const getCardStyle = (index: number) => {
    const total = testimonials.length;
    // Calculate relative position based on active index
    // We want to know how far this card is from the active one, handling wrap-around
    let diff = (index - activeIndex) % total;
    if (diff < 0) diff += total;
    if (diff > total / 2) diff -= total;

    // Determine position: 0=center, -1=left, 1=right, others=hidden/back
    const position = diff;

    // Base styles
    const baseStyle: React.CSSProperties = {
      transition: 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)', // ease-liquid, slowed down
      position: 'absolute',
      width: '100%',
      maxWidth: '22rem', // Reduced from 28rem
      transformStyle: 'preserve-3d',
    };

    if (position === 0) {
      // CENTER: Full scale, front, opaque
      return {
        ...baseStyle,
        opacity: 1,
        transform: 'translateX(-50%) scale(1) translateZ(0)',
        left: '50%',
        zIndex: 30,
        pointerEvents: 'auto' as const,
        filter: 'blur(0px)',
      };
    } else if (position === -1) {
      // LEFT: Pushed back, rotated, partial opacity
      return {
        ...baseStyle,
        opacity: 0.5, // More subtle
        transform: 'translateX(-130%) scale(0.75) translateZ(-100px) rotateY(20deg)', // Smaller scale
        left: '50%',
        zIndex: 20,
        pointerEvents: 'none' as const,
        filter: 'blur(1px)', // Less blur for elegance
      };
    } else if (position === 1) {
      // RIGHT: Pushed back, rotated, partial opacity
      return {
        ...baseStyle,
        opacity: 0.5, // More subtle
        transform: 'translateX(30%) scale(0.75) translateZ(-100px) rotateY(-20deg)', // Smaller scale
        left: '50%',
        zIndex: 20,
        pointerEvents: 'none' as const,
        filter: 'blur(1px)', // Less blur for elegance
      };
    } else {
      // HIDDEN: Way back
      return {
        ...baseStyle,
        opacity: 0,
        transform: 'translateX(-50%) scale(0.4) translateZ(-200px)',
        left: '50%',
        zIndex: 10,
        pointerEvents: 'none' as const,
      };
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="w-full bg-gq-light-gradient section-padding relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gq-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-gq relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="font-serif font-medium text-gq-dark text-5xl sm:text-6xl md:text-7xl mb-6">
            What Clients <span className="text-[#C5A869] italic">Say</span>
          </h2>
          <div className="w-24 h-px bg-[#C5A869] mx-auto opacity-60" />
        </div>

        {/* Lawyers of Distinction Badges */}
        <div ref={badgesRef} className="flex flex-wrap justify-center gap-6 mb-20">
          <div className="badge-item flex items-center gap-4 bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-sm border border-[#C5A869]/10 hover:shadow-md transition-all duration-500">
            <img
              src="/lawyers-distinction-2021.png"
              alt="Lawyers of Distinction 2021"
              className="h-14 w-auto object-contain"
            />
            <div className="text-left">
              <p className="font-serif font-medium tracking-wide text-gq-dark text-base">Lawyers of Distinction</p>
              <p className="text-[#C5A869] text-sm tracking-widest uppercase mt-1">2021 Recipient</p>
            </div>
          </div>
          <div className="badge-item flex items-center gap-4 bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-sm border border-[#C5A869]/10 hover:shadow-md transition-all duration-500">
            <img
              src="/lawyers-distinction-2022.png"
              alt="Lawyers of Distinction 2022"
              className="h-14 w-auto object-contain"
            />
            <div className="text-left">
              <p className="font-serif font-medium tracking-wide text-gq-dark text-base">Lawyers of Distinction</p>
              <p className="text-[#C5A869] text-sm tracking-widest uppercase mt-1">2022 Recipient</p>
            </div>
          </div>
        </div>

        {/* 3D Carousel */}
        <div
          ref={carouselRef}
          className="relative h-[350px]"
          style={{ perspective: '1000px' }}
        >
          {/* Cards Container */}
          <div className="absolute inset-0 w-full h-full">
            {testimonials.map((testimonial, index) => {
              const style = getCardStyle(index);
              return (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-md border border-white/40 flex flex-col items-center justify-center text-center hover:bg-white/80 transition-colors duration-500"
                  style={style}
                >
                  {/* Subtle Top Accent (Replacing heavy bar) */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gq-gold-gradient rounded-b-full opacity-60" />

                  {/* Quote Icon */}
                  <div className="mb-6 opacity-30">
                    <Quote className="w-10 h-10 text-gq-gold fill-current" />
                  </div>

                  {/* Quote Text */}
                  <blockquote className="font-serif text-2xl sm:text-3xl text-gq-dark leading-relaxed mb-8 italic font-medium tracking-wide">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="mt-auto">
                    <p className="font-medium tracking-wide text-gq-dark text-lg mb-1">
                      {testimonial.author}
                    </p>
                    <p className="text-[#C5A869] text-xs tracking-[0.2em] uppercase font-medium">{testimonial.location}</p>
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gq-gold/10 rounded-br-lg" />
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gq-gold/10 rounded-tl-lg" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
