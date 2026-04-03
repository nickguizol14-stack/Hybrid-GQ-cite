import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
  question: string;
  answer: string;
  statute?: string;
}

interface PracticeFAQProps {
  faqs: FAQ[];
  schemaEnabled?: boolean;
}

const PracticeFAQ = ({ faqs, schemaEnabled = true }: PracticeFAQProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      const items = listRef.current?.querySelectorAll('.faq-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gq-light-gradient py-12 sm:py-16 lg:py-24 xl:py-32 relative overflow-hidden"
    >
      {/* JSON-LD FAQ schema */}
      {schemaEnabled && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        </Helmet>
      )}

      {/* Decorative background */}
      <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-gq-gold/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-gq relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-10 lg:mb-16">
          <p className="text-gq-gold text-sm md:text-base tracking-[0.2em] uppercase font-medium mb-4 font-sans">
            Common Questions
          </p>
          <h2 className="font-serif font-medium text-gq-light text-3xl sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gq-gold to-transparent mx-auto mt-6 opacity-70 rounded-full" />
        </div>

        {/* FAQ list */}
        <div ref={listRef} className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item py-8 ${
                index < faqs.length - 1
                  ? 'border-b border-gq-gold/15'
                  : ''
              }`}
            >
              <h3 className="font-serif font-semibold text-gq-light text-xl sm:text-2xl mb-3 leading-snug">
                {faq.question}
              </h3>
              <p className="font-sans text-gq-light/70 text-base sm:text-lg leading-relaxed">
                {faq.answer}
              </p>
              {faq.statute && (
                <p className="font-sans text-gq-gold/80 text-sm italic mt-3">
                  {faq.statute}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeFAQ;
