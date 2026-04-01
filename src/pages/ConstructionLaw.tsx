import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HardHat, Hammer, FileText, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        icon: FileText,
        title: "Contract Negotiation",
        description: "Drafting and reviewing AIA and ConsensusDocs to shift risk and protect margins before ground is broken."
    },
    {
        icon: Hammer,
        title: "Lien & Bond Claims",
        description: "Aggressive enforcement of payment rights. We wrote the book on Oklahoma lien law—literally."
    },
    {
        icon: ShieldAlert,
        title: "Defect Litigation",
        description: "Defending against negligence claims and prosecuting construction defect cases with technical precision."
    },
    {
        icon: HardHat,
        title: "OSHA & Compliance",
        description: "Navigating regulatory frameworks and defending against citations to keep job sites running."
    }
];

const ConstructionLaw = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animations
            gsap.fromTo('.hero-title',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.1 }
            );

            // Service Cards Stagger
            gsap.fromTo('.service-card',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.services-grid',
                        start: 'top 80%'
                    }
                }
            );

            // Parallax image
            gsap.to('.hero-image', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero-section',
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
            <section className="hero-section relative h-[70vh] min-h-[600px] overflow-hidden bg-gq-dark flex items-center">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="/hero-image.jpg" // Fallback/Placeholder - ideally a construction specific one
                        alt="Construction Site"
                        className="hero-image w-full h-[120%] object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gq-dark via-gq-dark/90 to-transparent"></div>
                </div>

                <div className="container-gq relative z-10 pt-20 text-white">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6 hero-title opacity-0">
                            <div className="w-12 h-1 bg-gq-gold"></div>
                            <span className="font-bold tracking-widest uppercase text-gq-gold">Practice Areas</span>
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-8 hero-title opacity-0">
                            Construction <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Law.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed hero-title opacity-0">
                            We build the legal frameworks that build Oklahoma. From bid to closeout, we protect contractors, owners, and design professionals.
                        </p>
                    </div>
                </div>
            </section>

            {/* OVERVIEW SECTION */}
            <section className="py-20 lg:py-32 bg-white">
                <div className="container-gq grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-gq-dark">
                            The Foundation of <br />
                            <span className="text-gq-gold">Your Project.</span>
                        </h2>
                        <div className="space-y-6 text-lg text-gq-dark/80 leading-relaxed">
                            <p>
                                Construction is complex. Disputes shouldn't be. We understand that on a job site,
                                time is money and delays are fatal. Our practice is built on rapid, decisive intervention.
                            </p>
                            <p>
                                Whether you are fighting for payment on a completed job, defending against a defect claim,
                                or navigating a complex public works bid, we bring 34 years of industry-specific experience to the table.
                            </p>
                        </div>
                        <div className="mt-10">
                            <a href="/contact" className="inline-flex items-center gap-2 font-bold text-gq-dark border-b-2 border-gq-gold pb-1 hover:text-gq-gold transition-colors">
                                <span>Discuss Your Project</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gq-gold/5 rounded-2xl -z-10 transform rotate-3"></div>
                        <div className="bg-gq-dark p-8 md:p-12 rounded-xl text-white shadow-2xl">
                            <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
                                <HardHat className="text-gq-gold w-8 h-8" />
                                <span>Who We Represent</span>
                            </h3>
                            <ul className="space-y-4">
                                {['General Contractors', 'Subcontractors', 'Material Suppliers', 'Property Owners', 'Architects & Engineers'].map((item, i) => (
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
                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Core Competencies</h2>
                        <p className="text-gq-dark/60 max-w-2xl mx-auto">Specialized legal services tailored to the construction lifecycle.</p>
                    </div>

                    <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, idx) => {
                            const Icon = service.icon;
                            return (
                                <div key={idx} className="service-card group bg-white p-10 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
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
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gq-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                <div className="container-gq text-center relative z-10">
                    <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8">Ready to break ground?</h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
                        Don't let legal hurdles delay your project. Schedule a strategic consultation today.
                    </p>
                    <a href="/contact" className="inline-flex btn-primary bg-white text-gq-dark hover:bg-gq-gold hover:text-white border-none py-4 px-8 text-xl">
                        Contact Us
                    </a>
                </div>
            </section>

        </motion.div>
    );
};

export default ConstructionLaw;
