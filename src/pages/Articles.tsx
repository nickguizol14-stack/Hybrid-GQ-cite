import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const articles: Article[] = [
  {
    slug: 'how-to-file-mechanics-lien-oklahoma',
    title: 'How to File a Mechanics Lien in Oklahoma: A Step-by-Step Guide',
    excerpt: 'Understanding the requirements, deadlines, and common pitfalls of filing a mechanics and materialmen\'s lien under Oklahoma Title 42. Written by the author of the LexisNexis treatise on Oklahoma construction law.',
    date: '2026-03-15',
    readTime: '8 min read',
    category: 'Construction Law',
  },
  {
    slug: 'oklahoma-pre-lien-notice-requirements-2026',
    title: 'Oklahoma Pre-Lien Notice Requirements: What Changed in 2026',
    excerpt: 'The 2025 amendment to 42 O.S. Section 142.6 (effective January 1, 2026) introduced significant changes to pre-lien notice requirements. Here is what contractors and suppliers need to know.',
    date: '2026-02-28',
    readTime: '6 min read',
    category: 'Construction Law',
  },
  {
    slug: 'asset-vs-stock-purchase-oklahoma',
    title: 'Asset Purchase vs. Stock Purchase: Which is Right for Your Oklahoma Business Deal?',
    excerpt: 'The structure of your acquisition determines your tax exposure, liability inheritance, and regulatory requirements. A guide to making the right choice for Oklahoma transactions.',
    date: '2026-02-10',
    readTime: '7 min read',
    category: 'Mergers & Acquisitions',
  },
  {
    slug: 'oklahoma-oil-gas-lease-negotiation',
    title: 'Negotiating an Oil and Gas Lease in Oklahoma: What Mineral Owners Should Know',
    excerpt: 'Your lease terms determine your royalty rate, surface protections, and long-term revenue for decades. An overview of the key provisions every Oklahoma mineral owner should negotiate.',
    date: '2026-01-20',
    readTime: '9 min read',
    category: 'Oil & Gas Law',
  },
  {
    slug: 'oklahoma-commercial-real-estate-due-diligence',
    title: 'Due Diligence Checklist for Oklahoma Commercial Real Estate Transactions',
    excerpt: 'Before closing on a commercial property in Oklahoma, these are the title, zoning, environmental, and contractual items your legal team should review.',
    date: '2026-01-05',
    readTime: '5 min read',
    category: 'Real Estate Law',
  },
];

const categoryColors: Record<string, string> = {
  'Construction Law': 'text-[#C5A869]',
  'Mergers & Acquisitions': 'text-[#B03A4A]',
  'Oil & Gas Law': 'text-[#C5A869]',
  'Real Estate Law': 'text-[#C5A869]',
};

const Articles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const heroEls = heroRef.current?.querySelectorAll('.reveal');
      if (heroEls) {
        gsap.fromTo(heroEls,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
        );
      }

      // Article cards stagger
      const cards = gridRef.current?.querySelectorAll('.article-card');
      if (cards) {
        gsap.fromTo(cards,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
        title="Articles"
        description="Legal insights and analysis from Gary David Quinnett on Oklahoma construction law, mechanics liens, real estate, oil and gas, and business transactions."
        path="/articles"
      />

      {/* Hero */}
      <section className="bg-gq-dark-gradient pt-40 sm:pt-44 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#C5A869]/5 rounded-full blur-[120px] pointer-events-none" />

        <div ref={heroRef} className="container-gq relative z-10 text-center">
          <p className="reveal text-[#C5A869] text-xs tracking-[4px] uppercase font-semibold mb-4">Insights & Analysis</p>
          <h1 className="reveal font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gq-light font-medium mb-6">
            Articles
          </h1>
          <p className="reveal text-gq-light/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Legal insights from 34 years of Oklahoma construction, business, and energy law practice. Written by the author of the LexisNexis bar treatise on Oklahoma construction law.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container-gq">
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/articles/${article.slug}`}
                className="article-card group block"
              >
                <article className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A869] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Category + Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] tracking-[2px] uppercase font-bold ${categoryColors[article.category] || 'text-[#C5A869]'}`}>
                      {article.category}
                    </span>
                    <div className="flex items-center gap-3 text-[#1A1510]/30">
                      <span className="flex items-center gap-1 text-[10px]">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-xl sm:text-2xl text-[#1A1510] font-medium mb-3 leading-snug group-hover:text-[#8E733E] transition-colors duration-300">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#1A1510]/60 text-sm leading-relaxed flex-1 mb-6">
                    {article.excerpt}
                  </p>

                  {/* Read more */}
                  <div className="flex items-center gap-2 text-[#8E733E] text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gq-dark-gradient relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A869]/30 to-transparent" />
        <div className="container-gq text-center relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-gq-light font-medium mb-4">Have a Legal Question?</h2>
          <p className="text-gq-light/50 text-sm sm:text-base mb-8 max-w-xl mx-auto">
            Schedule a consultation with Gary Quinnett to discuss your specific situation.
          </p>
          <Link
            to="/contact"
            className="inline-flex btn-primary text-sm py-3 px-8 rounded-lg tracking-wide border border-[#B03A4A]/30"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Articles;
