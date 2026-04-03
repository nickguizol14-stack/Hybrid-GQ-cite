import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import { BookOpen, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const LienBook = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo({ top: 0, behavior: 'instant' });

        const ctx = gsap.context(() => {
            // Hero staggered fade up
            const heroTextElements = heroRef.current?.querySelectorAll('.reveal-text');
            if (heroTextElements) {
                gsap.fromTo(
                    heroTextElements,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        delay: 0.2, // Wait for page transition
                    }
                );
            }

            // Content staggered fade up
            const contentTextElements = contentRef.current?.querySelectorAll('.reveal-text');
            if (contentTextElements) {
                gsap.fromTo(
                    contentTextElements,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power3.out',
                        delay: 0.4,
                    }
                );
            }

            // Card slight slide in & up
            if (cardRef.current) {
                gsap.fromTo(
                    cardRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: 'power3.out',
                        delay: 0.6,
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <motion.div
            ref={pageRef}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="min-h-screen bg-[#FDFBF7] relative w-full"
        >
            <SEO title="The Oklahoma Mechanics and Materialmen's Lien Book" description="The definitive guide to M&M liens in Oklahoma. Written by lien law expert Gary David Quinnett." path="/lien-book" />
            {/* Dedicated Dark Hero Header */}
            <section className="relative w-full bg-gq-dark-gradient pt-56 pb-20 lg:pt-48 lg:pb-24 xl:pb-32 overflow-hidden flex flex-col items-center justify-center text-center">
                {/* Subtle Noise Texture for paper feel on Hero */}
                <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply pointer-events-none z-0" />
                <div className="absolute inset-0 bg-gradient-to-b from-gq-dark to-transparent opacity-80 z-0 pointer-events-none" />

                <div className="container-gq relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center" ref={heroRef}>
                    <h1 className="reveal-text font-serif font-medium text-gq-light text-[3rem] leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight drop-shadow-lg">
                        The Oklahoma Mechanics <span className="block mt-2 font-light italic text-gq-gold">&amp; Materialmen&apos;s Lien Book</span>
                    </h1>

                    <p className="reveal-text font-sans uppercase tracking-[0.2em] text-gq-gold text-xs font-semibold">
                        Authored by Gary David Quinnett, Esq.
                    </p>
                </div>
            </section>

            {/* Light Content Grid Section */}
            <section className="relative w-full pb-24 bg-[#FDFBF7]">
                <div className="container-gq max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

                        {/* Left Column: Editorial Content */}
                        <div className="lg:flex-[1.4] w-full pt-12 lg:pt-20" ref={contentRef}>
                            <div className="reveal-text border-l-2 border-gq-gold pl-6 py-2 bg-gradient-to-r from-gq-gold/5 to-transparent mb-12">
                                <h3 className="font-serif text-2xl text-gq-light font-medium mb-3">Money Back Guarantee</h3>
                                <p className="font-sans text-sm tracking-wide text-gq-light/70 mb-0">If for any reason you are not completely satisfied with the book, we offer a full refund. No questions asked.</p>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-16 items-start">
                                {/* Product Image */}
                                <div className="reveal-text w-full md:w-1/3 shrink-0 rounded-lg overflow-hidden border border-gq-gold/20 shadow-2xl bg-gq-dark-warm p-2">
                                    <img
                                        src="/GQ LAW BOOK.png"
                                        alt="The Oklahoma Mechanics & Materialmen's Lien Book Cover"
                                        className="w-full h-auto object-cover rounded shadow-inner"
                                    />
                                </div>

                                {/* Product Intro */}
                                <div className="flex-1">
                                    <p className="reveal-text text-xl sm:text-2xl text-gq-light leading-snug mb-6 font-medium">
                                        Learn more about this powerful tool created by Oklahoma lawmakers specifically to help you protect your business interests and ensure you get paid.
                                    </p>

                                    <h2 className="reveal-text font-serif text-2xl text-gq-light mt-8 mb-4">What&apos;s in the Book?</h2>
                                    <div className="prose prose-gq max-w-none text-gq-light/80 font-serif leading-relaxed">
                                        <p className="reveal-text">
                                            This book is the definitive layman&apos;s guide to Mechanics and Materialmen&apos;s Liens, written by an attorney and foremost expert on the subject, Gary D. Quinnett.
                                        </p>
                                        <p className="reveal-text mt-4">
                                            Inside, you will find comprehensive details on the proper use - and potential severe pitfalls - of leveraging M&amp;M liens in Oklahoma. The guide covers critical filing deadlines, common formatting errors that invalidate claims, which specific situations are best suited for M&amp;M liens, and much more.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content Body - Part 2 */}
                            <div className="prose prose-lg prose-gq max-w-none text-gq-light/80 font-serif leading-relaxed">
                                <h2 className="reveal-text font-serif text-3xl text-gq-light mb-6">Who is this book for?</h2>
                                <p className="reveal-text">
                                    The Mechanics and Materialmen&apos;s Lien is typically the primary legal tool of general contractors, subcontractors, tradesmen, and other commercial businesses that have delivered a product or service to a site and have been unable to procure payment.
                                </p>
                                <p className="reveal-text mt-6">
                                    When executed correctly, the M&amp;M Lien is an incredibly powerful mechanism to assist in getting paid quickly <strong>without having to go to court.</strong>
                                </p>
                            </div>

                            {/* Free Sample Link */}
                            <div className="reveal-text mt-16 pt-8 border-t border-gq-dark/10">
                                <a
                                    href="https://www.gq-law.com/wp-content/uploads/ebooks_misc/2017/08/Oklahoma-Mechanics-and-Materialmens-Lien-Gary-David-Quinnet-4.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 text-gq-light hover:text-gq-gold font-sans text-sm tracking-widest uppercase font-semibold transition-colors group"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Download Free Sample Chapter
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Checkout Card (Safe Static Float) */}
                        <div className="lg:flex-1 w-full lg:sticky lg:top-40 lg:mt-12 xl:mt-20 z-10" ref={cardRef}>
                            <div className="bg-gq-dark-warm border border-gq-gold/30 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden mt-8 lg:mt-0">
                                {/* Card top accent */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gq-gold via-gq-gold to-gq-gold" />

                                <div className="mb-8">
                                    <h3 className="font-serif text-3xl text-gq-light font-medium mb-2">Purchase Securely</h3>
                                    <p className="font-sans text-xs uppercase tracking-widest text-gq-gold font-semibold">100% Satisfaction Guarantee</p>
                                </div>

                                {/* Option 1: E-Book Only */}
                                <div className="mb-8 p-6 rounded-xl border border-gray-100 bg-gray-50/50 hover:border-gq-gold/50 transition-colors group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-gq-gold/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div>
                                            <h4 className="font-serif text-xl text-gq-light font-medium">Digital E-Book</h4>
                                            <p className="font-sans text-xs text-gq-light/60 mt-1">Instant PDF Download</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-sans text-2xl font-bold text-gq-light">$195</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-6 relative z-10">
                                        <li className="flex items-center gap-2 text-sm text-gq-light/80">
                                            <CheckCircle className="w-3.5 h-3.5 text-gq-gold" /> Immediate Access
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-gq-light/80">
                                            <CheckCircle className="w-3.5 h-3.5 text-gq-gold" /> Searchable Content
                                        </li>
                                    </ul>

                                    {/* PayPal Form: Ebook */}
                                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="relative z-10">
                                        <input type="hidden" name="cmd" value="_xclick" />
                                        <input type="hidden" name="business" value="gary@gq-law.com" />
                                        <input type="hidden" name="item_name" value="The Oklahoma Mechanics and Materialmen's Lien (Ebook)" />
                                        <input type="hidden" name="amount" value="195" />
                                        <input type="hidden" name="currency_code" value="USD" />
                                        <input type="hidden" name="return" value="https://www.gq-law.com/ebook-thank-you/?ebook_key=bf8b1faf486c9a8c280964894ecb2346&action=thank_you" />

                                        <button type="submit" className="w-full py-4 bg-gq-dark hover:bg-gq-dark-warm text-gq-light font-sans tracking-widest text-xs uppercase font-semibold transition-colors flex items-center justify-center gap-2 rounded-lg">
                                            <ShieldCheck className="w-4 h-4 opacity-70" />
                                            Buy E-Book Only
                                        </button>
                                    </form>
                                </div>

                                {/* Option 2: Hard Copy + Ebook */}
                                <div className="p-6 rounded-xl border border-gq-gold/30 bg-[#FDFBF7] hover:border-gq-gold transition-colors group relative overflow-hidden shadow-sm">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-gq-gold/10 rounded-full blur-2xl transition-transform group-hover:scale-125" />

                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div>
                                            <div className="inline-flex items-center bg-gq-dark text-gq-gold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 font-semibold">
                                                Best Value
                                            </div>
                                            <h4 className="font-serif text-xl text-gq-light font-medium">Hard Copy + Digital</h4>
                                            <p className="font-sans text-xs text-gq-light/60 mt-1">Physical Book & Instant Download</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-sans text-2xl font-bold text-gq-light">$295</span>
                                        </div>
                                    </div>

                                    <ul className="space-y-2 mb-6 relative z-10">
                                        <li className="flex items-center gap-2 text-sm text-gq-light/80">
                                            <CheckCircle className="w-3.5 h-3.5 text-gq-gold" /> Premium Desk Reference
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-gq-light/80">
                                            <CheckCircle className="w-3.5 h-3.5 text-gq-gold" /> Immediate Digital Access
                                        </li>
                                        <li className="flex items-center gap-2 text-sm text-gq-light/80">
                                            <CheckCircle className="w-3.5 h-3.5 text-gq-gold" /> Free Standard Shipping
                                        </li>
                                    </ul>

                                    {/* PayPal Form: Hard Copy */}
                                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" className="relative z-10">
                                        <input type="hidden" name="cmd" value="_xclick" />
                                        <input type="hidden" name="business" value="gary@gq-law.com" />
                                        <input type="hidden" name="item_name" value="The Oklahoma Mechanics and Materialmen's Lien (Hard Copy)" />
                                        <input type="hidden" name="amount" value="295" />
                                        <input type="hidden" name="currency_code" value="USD" />
                                        <input type="hidden" name="return" value="https://www.gq-law.com/ebook-thank-you/?ebook_key=aa1c79d2bac9d7eacdb735a8fcf01105&action=thank_you" />

                                        <button type="submit" className="w-full py-4 bg-gq-gold hover:bg-gq-gold text-gq-light font-sans tracking-widest text-xs uppercase font-bold transition-colors flex items-center justify-center gap-2 rounded-lg shadow-md">
                                            <ShieldCheck className="w-4 h-4 opacity-70" />
                                            Buy Hard Copy Bundle
                                        </button>
                                    </form>
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-4 border-t border-gray-100 pt-6">
                                    <span className="text-[10px] text-gq-light/65 font-sans tracking-widest uppercase">Secured by PayPal</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default LienBook;
