import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import { getResourceBySlug, TYPE_LABELS } from '../lib/resources-data';
import type { Resource } from '../lib/resources-data';
import { ArrowLeft, Clock, BookOpen, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import SEO from '../components/SEO';

const ResourceArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [resource, setResource] = useState<Resource | null>(null);
  const [ContentComponent, setContentComponent] = useState<React.ComponentType | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Look up resource metadata
  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      return;
    }

    const found = getResourceBySlug(slug);
    if (!found) {
      setNotFound(true);
      return;
    }

    setResource(found);
  }, [slug]);

  // Dynamically import the content component
  useEffect(() => {
    if (!slug) return;

    import(`../content/resources/${slug}.tsx`)
      .then((module: { default: React.ComponentType }) => {
        setContentComponent(() => module.default);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [slug]);

  // GSAP entrance animations
  useEffect(() => {
    if (!resource || !ContentComponent) return;

    const ctx = gsap.context(() => {
      const heroEls = heroRef.current?.querySelectorAll('.reveal');
      if (heroEls) {
        gsap.fromTo(
          heroEls,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out' }
        );
      }

      const contentEl = contentRef.current;
      if (contentEl) {
        gsap.fromTo(
          contentEl,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: 0.3, ease: 'power3.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [resource, ContentComponent]);

  // 404 state
  if (notFound) {
    return (
      <motion.div
        className="min-h-screen bg-[#FDFBF7] flex items-center justify-center"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        <div className="text-center px-6">
          <h1 className="font-serif text-4xl text-[#1A1510] font-medium mb-4">Resource Not Found</h1>
          <p className="text-[#1A1510]/60 mb-8">The resource you are looking for does not exist or has not been published yet.</p>
          <button
            onClick={() => navigate('/resources')}
            className="inline-flex items-center gap-2 btn-primary text-sm py-3 px-8 rounded-lg tracking-wide border border-[#B03A4A]/30"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Resources
          </button>
        </div>
      </motion.div>
    );
  }

  // Loading state
  if (!resource || !ContentComponent) {
    return (
      <motion.div
        className="min-h-screen bg-[#FDFBF7]"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      />
    );
  }

  const typeLabel = TYPE_LABELS[resource.type];

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
        title={resource.title}
        description={resource.excerpt}
        path={`/resources/${resource.slug}`}
        type="article"
      />

      {/* Dark Hero */}
      <section className="bg-gq-dark-gradient pt-36 sm:pt-40 pb-14 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#C5A869]/5 rounded-full blur-[120px] pointer-events-none" />

        <div ref={heroRef} className="container-gq relative z-10 max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            to="/resources"
            className="reveal inline-flex items-center gap-2 text-[#C5A869]/70 hover:text-[#C5A869] text-sm tracking-wide transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Resources
          </Link>

          {/* Category + Type */}
          <div className="reveal flex items-center gap-3 mb-4">
            <span className="text-[#C5A869] text-[10px] tracking-[3px] uppercase font-semibold">
              {resource.categoryLabel}
            </span>
            <span className="w-1 h-1 rounded-full bg-gq-light/30" />
            <span className="text-gq-light/40 text-[10px] tracking-[2px] uppercase font-medium">
              {typeLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="reveal font-serif text-3xl sm:text-4xl md:text-5xl text-gq-light font-medium mb-6 leading-tight">
            {resource.title}
          </h1>

          {/* Meta */}
          <div className="reveal flex items-center gap-4 text-gq-light/40 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {resource.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              {typeLabel}
            </span>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container-gq">
          <div ref={contentRef} className="max-w-3xl mx-auto">
            {/* Article Body */}
            <ContentComponent />

            {/* Related Practice Link Card */}
            <div className="mt-16 pt-10 border-t border-[#1A1510]/10">
              <p className="text-[10px] tracking-[3px] uppercase font-semibold text-[#C5A869] mb-3">
                Related Practice Area
              </p>
              <Link
                to={resource.relatedPracticeHref}
                className="group flex items-center justify-between bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500"
              >
                <div>
                  <h3 className="font-serif text-xl text-[#1A1510] font-medium group-hover:text-[#8E733E] transition-colors duration-300">
                    {resource.relatedPractice}
                  </h3>
                  <p className="text-[#1A1510]/50 text-sm mt-1">
                    Learn more about how we help clients in this area.
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#C5A869] group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
              </Link>
            </div>

            {/* CTA */}
            <div className="mt-12 bg-gq-dark-gradient rounded-2xl p-8 sm:p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
              <div className="relative z-10">
                <h2 className="font-serif text-2xl sm:text-3xl text-gq-light font-medium mb-3">
                  Have a Question About This Topic?
                </h2>
                <p className="text-gq-light/50 text-sm sm:text-base mb-6 max-w-lg mx-auto">
                  Schedule a consultation to discuss how this applies to your specific situation.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex btn-primary text-sm py-3 px-8 rounded-lg tracking-wide border border-[#B03A4A]/30"
                >
                  Schedule a Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ResourceArticle;
