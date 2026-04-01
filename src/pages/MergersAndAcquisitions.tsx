import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, TrendingUp, ShieldCheck, FileSearch, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: Briefcase,
        title: "Deal Structuring",
        description: "Asset vs. Stock purchases. Mergers. Reorganizations. We architect the transaction to maximize tax efficiency and liability protection."
    },
    {
        icon: FileSearch,
        title: "Due Diligence",
        description: "Deep dive investigation into targets. We uncover the risks lurking in the contracts, employment files, and balance sheets."
    },
    {
        icon: ShieldCheck,
        title: "Risk Allocation",
        description: "Drafting definitive agreements that clearly define representations, warranties, and indemnification caps."
    },
    {
        icon: TrendingUp,
        title: "Post-Closing Identity",
        description: "Handling non-competes, employment agreements, and transition services to ensure the value you bought stays in the building."
    }
];

const MergersAndAcquisitions = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animations
            gsap.fromTo('.hero-title-ma',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.1 }
            );

            // Service Cards Stagger
            gsap.fromTo('.service-card-ma',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.services-grid-ma',
                        start: 'top 80%'
                    }
                }
            );

            // Parallax image
            gsap.to('.hero-image-ma', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero-section-ma',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="min-h-screen bg-white text-gq-dark will-change-transform"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
        >
            {/* HERO SECTION */}
            <section className="hero-section-ma relative h-[70vh] min-h-[600px] overflow-hidden bg-gq-dark flex items-center">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="/hero-image.jpg" // Fallback - ideally a boardroom or handshake high rise custom
                        alt="Mergers and Acquisitions"
                        className="hero-image-ma w-full h-[120%] object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gq-dark via-gq-dark/90 to-transparent"></div>
                </div>

                <div className="container-gq relative z-10 pt-20 text-white">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6 hero-title-ma opacity-0">
                            <div className="w-12 h-1 bg-gq-gold"></div>
                            <span className="font-bold tracking-widest uppercase text-gq-gold">Practice Areas</span>
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-8 hero-title-ma opacity-0">
                            Mergers & <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Acquisitions.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed hero-title-ma opacity-0">
                            Strategic counsel for the most critical moment in a company's lifecycle. We get the deal done.
                        </p>
                    </div>
                </div>
            </section>

            {/* OVERVIEW SECTION */}
            <section className="py-20 lg:py-32 bg-white">
                <div className="container-gq grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-gq-dark">
                            Precision in <br />
                            <span className="text-gq-gold">Every Detail.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-gq-dark/80 leading-relaxed">
                            <p>
                                Buying or selling a business is not just a legal transaction; it is a transformative event.
                                It requires an attorney who understands the numbers as well as the law.
                            </p>
                            <p>
                                We approach M&A with a focus on value preservation and risk mitigation. From the Letter of Intent
                                to the closing table, we ensure your interests are protected and your objectives are met.
                            </p>
                        </div>
                        <div className="mt-10">
                            <a href="/contact" className="inline-flex items-center gap-2 font-bold text-gq-dark border-b-2 border-gq-gold pb-1 hover:text-gq-gold transition-colors">
                                <span>Discuss Your Transaction</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gq-dark/5 rounded-2xl -z-10 transform -rotate-1"></div>
                        <div className="bg-gq-dark p-8 md:p-12 rounded-xl text-white shadow-2xl">
                            <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                <Briefcase className="text-gq-gold w-8 h-8" />
                                <span>Representative Matters</span>
                            </h3>
                            <ul className="space-y-4">
                                {['Family Business Successions', 'Private Equity Exits', 'Asset Purchase Agreements', 'Strategic Acquisitions', 'Corporate Restructuring'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-white/80">
                                        <CheckCircle2 className="w-5 h-5 text-gq-gold flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-20 lg:py-32 bg-gq-light-gradient">
                <div className="container-gq">
                    <div className="text-center mb-20">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">The Art of the Deal</h2>
                        <p className="text-gq-dark/60 max-w-2xl mx-auto">Comprehensive support for buyers, sellers, and investors.</p>
                    </div>

                    <div className="services-grid-ma grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, idx) => {
                            const Icon = service.icon;
                            return (
                                <div key={idx} className="service-card-ma group bg-white p-10 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                                    <div className="w-16 h-16 bg-gq-gold/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-gq-gold group-hover:text-white transition-colors duration-500">
                                        <Icon className="w-8 h-8 text-gq-gold group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold mb-4 text-gq-dark">{service.title}</h3>
                                    <p className="text-gq-dark/70 leading-relaxed mb-6">{service.description}</p>
                                    <div className="w-12 h-1 bg-gq-gold/20 group-hover:w-full group-hover:bg-gq-gold transition-all duration-500 rounded-full"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-24 bg-gq-dark text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

                <div className="container-gq text-center relative z-10">
                    <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8">Execute with confidence.</h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
                        Business moves fast. We move faster.
                    </p>
                    <a href="/contact" className="inline-flex btn-primary bg-white text-gq-dark hover:bg-gq-gold hover:text-white border-none py-4 px-8 text-xl">
                        Contact Us
                    </a>
                </div>
            </section>

        </motion.div>
    );
};

export default MergersAndAcquisitions;
