import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Key, Map, FileSignature, ArrowRight, CheckCircle2, Home } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: FileSignature,
        title: "Transactions",
        description: "Structuring complex commercial and residential acquisitions. We ensure the deal you sign is the deal you get."
    },
    {
        icon: Key,
        title: "Leasing",
        description: "Representing both landlords and tenants in retail, office, and industrial lease negotiations."
    },
    {
        icon: Map,
        title: "Land Use & Zoning",
        description: "Navigating municipal regulations, variances, and easements to unlock the full potential of your property."
    },
    {
        icon: Home,
        title: "Title & Curative",
        description: "Resolving title defects, boundary disputes, and encumbrances to ensure clear ownership."
    }
];

const RealEstateLaw = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animations
            gsap.fromTo('.hero-title-re',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.1 }
            );

            // Service Cards Stagger
            gsap.fromTo('.service-card-re',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.services-grid-re',
                        start: 'top 80%'
                    }
                }
            );

            // Parallax image
            gsap.to('.hero-image-re', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero-section-re',
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
            <section className="hero-section-re relative h-[60vh] min-h-[500px] sm:h-[70vh] sm:min-h-[600px] overflow-hidden bg-gq-dark flex items-center">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="/hero-image.jpg" // Fallback - ideally a skyline or building
                        alt="Real Estate"
                        className="hero-image-re w-full h-[120%] object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gq-dark via-gq-dark/90 to-transparent"></div>
                </div>

                <div className="container-gq relative z-10 pt-20 text-white">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6 hero-title-re opacity-0">
                            <div className="w-12 h-1 bg-gq-gold"></div>
                            <span className="font-bold tracking-widest uppercase text-gq-gold">Practice Areas</span>
                        </div>
                        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-8 hero-title-re opacity-0">
                            Real Estate <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Law.</span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed hero-title-re opacity-0">
                            We protect what you build. Comprehensive legal counsel for developers, investors, and property owners.
                        </p>
                    </div>
                </div>
            </section>

            {/* OVERVIEW SECTION */}
            <section className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-white">
                <div className="container-gq grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-gq-dark">
                            Closing the Deal. <br />
                            <span className="text-gq-gold">Securing the Asset.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-gq-dark/80 leading-relaxed">
                            <p>
                                Real estate transactions are high-stakes. A single oversight in contract language or title work
                                can cost millions. We bring the scrutiny and foresight needed to close with confidence.
                            </p>
                            <p>
                                Whether you are developing a commercial subdivision, negotiating a complex lease, or resolving a boundary dispute,
                                our approach is pragmatic and results-oriented. We clear hurdles so you can maximize value.
                            </p>
                        </div>
                        <div className="mt-10">
                            <a href="/contact" className="inline-flex items-center gap-2 font-bold text-gq-dark border-b-2 border-gq-gold pb-1 hover:text-gq-gold transition-colors">
                                <span>Start Your Transaction</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gq-burgundy/5 rounded-2xl -z-10 transform -rotate-2"></div>
                        <div className="bg-gq-dark p-6 sm:p-8 md:p-12 rounded-xl text-white shadow-2xl">
                            <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                <Building2 className="text-gq-gold w-8 h-8" />
                                <span>Our Expertise</span>
                            </h3>
                            <ul className="space-y-4">
                                {['Commercial Development', 'Purchase & Sale Agreements', 'Landlord-Tenant Law', 'Quiet Title Actions', 'HOA & Covenants'].map((item, i) => (
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
            <section className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-gq-light-gradient">
                <div className="container-gq">
                    <div className="text-center mb-10 sm:mb-16 lg:mb-20">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Strategic Representation</h2>
                        <p className="text-gq-dark/60 max-w-2xl mx-auto">From dirt work to disposition, we handle every phase of the real estate lifecycle.</p>
                    </div>

                    <div className="services-grid-re grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, idx) => {
                            const Icon = service.icon;
                            return (
                                <div key={idx} className="service-card-re group bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
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
            <section className="py-16 sm:py-20 lg:py-24 bg-gq-dark text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gq-burgundy/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

                <div className="container-gq text-center relative z-10">
                    <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8">Secure your investment.</h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
                        Expert counsel for your most significant assets.
                    </p>
                    <a href="/contact" className="inline-flex btn-primary bg-white text-gq-dark hover:bg-gq-gold hover:text-white border-none py-4 px-8 text-xl">
                        Contact Us
                    </a>
                </div>
            </section>

        </motion.div>
    );
};

export default RealEstateLaw;
