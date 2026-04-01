import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { resources, TYPE_LABELS } from '@/lib/resources-data';

gsap.registerPlugin(ScrollTrigger);

const featuredSlugs = [
  'oklahoma-mechanics-lien-laws',
  'commercial-lease-tenant-checklist',
  'oklahoma-surface-damage-agreements',
];

const featured = featuredSlugs
  .map((slug) => resources.find((r) => r.slug === slug))
  .filter(Boolean) as (typeof resources)[number][];

const ResourcesPreview = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade in
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

      // Cards stagger entrance
      const cards = cardsRef.current?.querySelectorAll('.resource-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
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
      id="resources-preview"
      className="w-full bg-gq-dark-gradient py-12 sm:py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="container-gq relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#C5A869]/60" />
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C5A869] font-medium">
              From the Practice
            </span>
            <div className="w-8 h-px bg-[#C5A869]/60" />
          </span>
          <h2 className="font-serif font-medium text-gq-light text-3xl sm:text-4xl lg:text-5xl mb-4">
            Resources &amp; <span className="text-gq-gold-gradient italic">Insights</span>
          </h2>
          <p className="text-gq-light/70 text-base sm:text-lg max-w-xl mx-auto font-light tracking-wide">
            Legal guides, checklists, and Oklahoma statute references from 34 years of practice.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16"
        >
          {featured.map((resource) => (
            <Link
              key={resource.slug}
              to={`/resources/${resource.slug}`}
              className="resource-card group flex flex-col bg-[#2a2219] rounded-2xl border border-[#C5A869]/10 hover:border-[#C5A869]/40 transition-all duration-500 overflow-hidden"
            >
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                {/* Type badge */}
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#C5A869] font-semibold mb-2">
                  {TYPE_LABELS[resource.type]}
                </span>

                {/* Category label */}
                <span className="font-sans text-xs text-gq-light/40 uppercase tracking-widest mb-4">
                  {resource.categoryLabel}
                </span>

                {/* Title */}
                <h3 className="font-serif text-gq-light text-lg sm:text-xl leading-snug mb-3 group-hover:text-[#E6D3A3] transition-colors duration-300">
                  {resource.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gq-light/60 text-sm leading-relaxed font-light line-clamp-2 mb-6">
                  {resource.excerpt}
                </p>

                {/* Read More */}
                <div className="mt-auto flex items-center gap-2 text-[#C5A869] font-sans text-sm uppercase tracking-[0.15em] font-medium group-hover:text-[#E6D3A3] transition-colors duration-300">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-[#C5A869] font-sans text-sm uppercase tracking-[0.15em] font-medium group transition-colors duration-300 hover:text-[#E6D3A3]"
          >
            <span>View All Resources</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreview;
