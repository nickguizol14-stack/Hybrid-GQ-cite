import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, BookOpen, FileCheck, Scale } from 'lucide-react';
import { resources, TYPE_LABELS } from '../lib/resources-data';
import type { ResourceType } from '../lib/resources-data';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

type FilterType = 'all' | ResourceType;

const filterButtons: { key: FilterType; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'All', icon: null },
  { key: 'guide', label: 'Guides', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { key: 'checklist', label: 'Checklists', icon: <FileCheck className="w-3.5 h-3.5" /> },
  { key: 'reference', label: 'Law References', icon: <Scale className="w-3.5 h-3.5" /> },
];

const typeBadgeColors: Record<ResourceType, string> = {
  guide: 'bg-gq-gold/10 text-gq-gold border-gq-gold/20',
  checklist: 'bg-gq-burgundy/10 text-gq-burgundy border-gq-burgundy/20',
  reference: 'bg-gq-dark/5 text-gq-light/70 border-gq-dark/10',
};

const Articles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredResources = activeFilter === 'all'
    ? resources
    : resources.filter(r => r.type === activeFilter);

  // GSAP hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroEls = heroRef.current?.querySelectorAll('.reveal');
      if (heroEls) {
        gsap.fromTo(
          heroEls,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // GSAP card stagger on filter change
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.resource-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }
  }, [activeFilter]);

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-[#FDFBF7]"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <SEO
        title="Resources & Insights"
        description="Guides, checklists, and Oklahoma law references from Gary Quinnett. Practical legal resources for construction, real estate, oil and gas, and contract matters."
        path="/resources"
      />

      {/* Hero */}
      <section className="bg-gq-dark-gradient pt-40 sm:pt-44 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gq-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div ref={heroRef} className="container-gq relative z-10 text-center">
          <p className="reveal text-gq-gold text-xs tracking-[4px] uppercase font-semibold mb-4">
            Legal Resources
          </p>
          <h1 className="reveal font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gq-light font-medium mb-6">
            Resources & Insights
          </h1>
          <p className="reveal text-gq-light/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Practical guides, checklists, and statutory references drawn from 34 years
            of Oklahoma legal practice. Written for business owners, not other lawyers.
          </p>
        </div>
      </section>

      {/* Filter Bar + Grid */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container-gq">
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 sm:mb-14">
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setActiveFilter(btn.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 border ${
                  activeFilter === btn.key
                    ? 'bg-gq-dark text-white border-gq-dark'
                    : 'bg-gq-dark-warm text-gq-light/70 border-gray-200 hover:border-gq-gold/50 hover:text-gq-light'
                }`}
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}
            <span className="text-gq-light/60 text-sm ml-2">
              {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'}
            </span>
          </div>

          {/* Resource Cards Grid */}
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filteredResources.map((resource) => (
              <Link
                key={resource.slug}
                to={`/resources/${resource.slug}`}
                className="resource-card group block"
              >
                <article className="bg-gq-dark-warm rounded-2xl border border-gray-100 p-6 sm:p-8 h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gq-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Type Badge + Category + Read Time */}
                  <div className="flex items-center flex-wrap gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] tracking-[1.5px] uppercase font-bold px-2.5 py-1 rounded-full border ${typeBadgeColors[resource.type]}`}>
                      {TYPE_LABELS[resource.type]}
                    </span>
                    <span className="text-[10px] tracking-[2px] uppercase font-bold text-gq-gold">
                      {resource.categoryLabel}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-gq-light/60 text-[10px]">
                      <Clock className="w-3 h-3" />
                      {resource.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl sm:text-2xl text-gq-light font-medium mb-3 leading-snug group-hover:text-gq-gold transition-colors duration-300">
                    {resource.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gq-light/60 text-sm leading-relaxed flex-1 mb-6">
                    {resource.excerpt}
                  </p>

                  {/* Read more */}
                  <div className="flex items-center gap-2 text-gq-gold text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Read {TYPE_LABELS[resource.type]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gq-light/65 text-base">No resources found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gq-dark-gradient relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gq-gold/30 to-transparent" />
        <div className="container-gq text-center relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-gq-light font-medium mb-4">Have a Legal Question?</h2>
          <p className="text-gq-light/70 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Schedule a consultation with Gary Quinnett to discuss your specific situation.
          </p>
          <Link
            to="/contact"
            className="inline-flex btn-primary text-sm py-3 px-8 rounded-lg tracking-wide border border-gq-burgundy/30"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Articles;
