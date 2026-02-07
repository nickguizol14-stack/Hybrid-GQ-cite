import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Text Stagger
            gsap.fromTo('.hero-text-reveal',
                { y: 100, opacity: 0, rotateX: -20 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' }
            );

            // Form Reveal
            gsap.fromTo('.contact-form-reveal',
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
            );

            // Info Reveal
            gsap.fromTo('.contact-info-reveal',
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="min-h-screen bg-gq-dark text-white pt-32 pb-20 overflow-hidden will-change-transform"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container-gq grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">

                {/* LEFT COLUMN: Psychology & Info */}
                <div className="contact-info-reveal">
                    <div className="mb-12">
                        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 overflow-hidden pb-4 leading-tight">
                            <span className="hero-text-reveal block">Protect Your</span>
                            <span className="hero-text-reveal block text-gq-gold">Legacy.</span>
                        </h1>
                        <div className="w-24 h-1 bg-gq-gold mb-8"></div>

                        <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light">
                            <p>
                                We do not accept every case. We accept cases where we can deliver
                                <strong className="text-white font-bold"> decisive victory</strong>.
                            </p>
                            <p>
                                When you retain the Law Offices of Gary David Quinnett, you are not buying time.
                                You are investing in <strong className="text-white font-bold">strategy, extensive experience, and results</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-gq-gold/30 transition-colors">
                            <Phone className="w-6 h-6 text-gq-gold mb-4" />
                            <h3 className="font-bold text-xl mb-1">Direct Line</h3>
                            <a href="tel:405-607-2266" className="text-white/70 hover:text-white transition-colors">(405) 607-2266</a>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-gq-gold/30 transition-colors">
                            <Mail className="w-6 h-6 text-gq-gold mb-4" />
                            <h3 className="font-bold text-xl mb-1">Email</h3>
                            <a href="mailto:gary@gq-law.com" className="text-white/70 hover:text-white transition-colors">gary@gq-law.com</a>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                        <div className="flex items-start gap-4">
                            <MapPin className="w-6 h-6 text-gq-gold mt-1 shrink-0" />
                            <div>
                                <h3 className="font-bold text-xl mb-2">Headquarters</h3>
                                <p className="text-white/70 mb-4">
                                    10005 N May Ave, Suite 120<br />
                                    Oklahoma City, OK 73120
                                </p>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-gq-gold text-sm font-bold uppercase tracking-wider hover:underline"
                                >
                                    Get Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: The Form */}
                <div className="contact-form-reveal relative">
                    <div className="absolute inset-0 bg-gq-gold/5 blur-3xl rounded-full pointer-events-none"></div>

                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative z-10 text-gq-dark p-8 md:p-10 border border-white/10">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gq-gold-gradient"></div>

                        <h2 className="font-serif text-3xl font-bold mb-2">Request Representation</h2>
                        <p className="text-gray-500 text-sm mb-8">Secure, confidential, and direct.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">First Name</label>
                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gq-gold focus:ring-1 focus:ring-gq-gold transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Last Name</label>
                                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gq-gold focus:ring-1 focus:ring-gq-gold transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gq-gold focus:ring-1 focus:ring-gq-gold transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone</label>
                                <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gq-gold focus:ring-1 focus:ring-gq-gold transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Case Type</label>
                                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gq-gold focus:ring-1 focus:ring-gq-gold transition-all text-gray-700">
                                    <option>Construction Dispute</option>
                                    <option>Oil & Gas Contract</option>
                                    <option>Real Estate Transaction</option>
                                    <option>Business Litigation</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Matter Details</label>
                                <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-gq-gold focus:ring-1 focus:ring-gq-gold transition-all" placeholder="Briefly describe your situation..."></textarea>
                            </div>

                            <button type="button" className="w-full bg-gq-dark text-white font-bold text-lg py-4 rounded-xl hover:bg-gq-dark/90 hover:scale-[1.02] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group">
                                <span>Submit for Review</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                Top-tier security. Your information is encrypted and privileged.
                            </p>
                        </form>
                    </div>
                </div>
            </div>

            {/* Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gq-gold rounded-full blur-[150px] opacity-10"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-gq-burgundy rounded-full blur-[120px] opacity-10"></div>
            </div>
        </motion.div>
    );
};

export default ContactPage;
