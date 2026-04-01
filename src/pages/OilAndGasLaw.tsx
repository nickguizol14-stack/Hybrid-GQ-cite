import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileCheck, Scale, History, ArrowRight, CheckCircle2, Droplet, Cog } from 'lucide-react';
import SEO from '../components/SEO';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: FileCheck,
        title: "Lease Negotiation",
        description: "Maximizing value for mineral owners and securing favorable terms for operators. We know what the market will bear."
    },
    {
        icon: Scale,
        title: "Surface Damages",
        description: "Negotiating fair compensation for surface use and resolving disputes between landowners and operators."
    },
    {
        icon: History,
        title: "Title Examination",
        description: "Drilling and Division Order Title Opinions that stand up to scrutiny. We trace ownership back to sovereignty."
    },
    {
        icon: Cog,
        title: "OCC Regulatory",
        description: "Navigating the Oklahoma Corporation Commission spacing, pooling, and location exception applications."
    }
];

const OilAndGasLaw = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animations
            gsap.fromTo('.hero-title-og',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.1 }
            );

            // Service Cards Stagger
            gsap.fromTo('.service-card-og',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.services-grid-og',
                        start: 'top 80%'
                    }
                }
            );

            // Parallax image
            gsap.to('.hero-image-og', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero-section-og',
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
            className="min-h-screen bg-gq-dark text-white will-change-transform"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
        >
            <SEO title="Oklahoma Oil and Gas Lawyer" description="Representing operators, mineral owners, and service companies in lease negotiation, title examination, and regulatory matters." path="/oil-and-gas-law" />
            {/* HERO SECTION */}
            <section className="hero-section-og relative h-[60vh] min-h-[500px] sm:h-[70vh] sm:min-h-[600px] overflow-hidden bg-black flex items-center">
                <div className="absolute inset-0 z-0 opacity-50">
                    <img
                        src="/hero-image.jpg" // Fallback
                        alt="Oil Rig at Sunset"
                        className="hero-image-og w-full h-[120%] object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                </div>

                <div className="container-gq relative z-10 pt-20 text-white">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6 hero-title-og opacity-0">
                            <div className="w-12 h-1 bg-gq-gold"></div>
                            <span className="font-bold tracking-widest uppercase text-gq-gold">Practice Areas</span>
                        </div>
                        <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-8 hero-title-og opacity-0">
                            Oil & Gas <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gq-gold to-white">Energy.</span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed hero-title-og opacity-0">
                            Legal power for the industry that powers Oklahoma. Representing operators, mineral owners, and service companies.
                        </p>
                    </div>
                </div>
            </section>

            {/* OVERVIEW SECTION */}
            <section className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-gq-dark-warm">
                <div className="container-gq grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-white">
                            High Stakes. <br />
                            <span className="text-gq-gold">Deep Expertise.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                            <p>
                                The energy sector operates in a boom-or-bust environment where timing and precision are everything.
                                We provide stability and strategic foresight in a volatile market.
                            </p>
                            <p>
                                Whether you are securing drilling rights, negotiating a joint operating agreement, or resolving a royalty dispute,
                                we understand both the legal landscape and the geology of the deal.
                            </p>
                        </div>
                        <div className="mt-10">
                            <a href="/contact" className="inline-flex items-center gap-2 font-bold text-white border-b-2 border-gq-gold pb-1 hover:text-gq-gold transition-colors">
                                <span>Protect Your Rights</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gq-gold/5 rounded-2xl -z-10 transform rotate-2"></div>
                        <div className="bg-black/40 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-xl text-white shadow-2xl border border-white/10">
                            <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                <Droplet className="text-gq-gold w-8 h-8" />
                                <span>Industry Focus</span>
                            </h3>
                            <ul className="space-y-4">
                                {['Independent Operators', 'Mineral & Royalty Owners', 'Drilling Contractors', 'Service Providers', 'Investors'].map((item, i) => (
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
            <section className="py-12 sm:py-16 lg:py-24 xl:py-32 bg-gq-dark relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full"
                        style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }}>
                    </div>
                </div>

                <div className="container-gq relative z-10">
                    <div className="text-center mb-10 sm:mb-16 lg:mb-20">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-white">Comprehensive Counsel</h2>
                        <p className="text-white/60 max-w-2xl mx-auto">From the courthouse to the corporation commission, we cover the field.</p>
                    </div>

                    <div className="services-grid-og grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, idx) => {
                            const Icon = service.icon;
                            return (
                                <div key={idx} className="service-card-og group bg-white/5 backdrop-blur-sm p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg border border-white/10 hover:border-gq-gold/30 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                                    <div className="w-16 h-16 bg-gq-gold/10 rounded-xl flex items-center justify-center mb-8 group-hover:bg-gq-gold group-hover:text-white transition-colors duration-500">
                                        <Icon className="w-8 h-8 text-gq-gold group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold mb-4 text-white">{service.title}</h3>
                                    <p className="text-white/70 leading-relaxed mb-6">{service.description}</p>
                                    <div className="w-12 h-1 bg-gq-gold/20 group-hover:w-full group-hover:bg-gq-gold transition-all duration-500 rounded-full"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="py-16 sm:py-20 lg:py-24 bg-black text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gq-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                <div className="container-gq text-center relative z-10">
                    <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8">Fueling your success.</h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
                        Decades of experience in the energy sector.
                    </p>
                    <a href="/contact" className="inline-flex btn-primary bg-white text-gq-dark hover:bg-gq-gold hover:text-white border-none py-4 px-8 text-xl">
                        Contact Us
                    </a>
                </div>
            </section>

        </motion.div>
    );
};

export default OilAndGasLaw;
