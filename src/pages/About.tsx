import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import { Award, BookOpen, Shield, Briefcase, MapPin, Mail, Phone, CheckCircle2, Star, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. HERO ANIMATION - Explosive & Staggered
            const tl = gsap.timeline();

            tl.fromTo('.hero-title-char',
                { y: 150, rotateY: 90, opacity: 0, scale: 0.5 },
                { y: 0, rotateY: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.04, ease: 'elastic.out(1, 0.75)' }
            );

            tl.fromTo('.hero-subtitle',
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                "-=0.8"
            );

            tl.fromTo('.hero-image-reveal',
                { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', scale: 1.3, filter: 'grayscale(100%)' },
                { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', scale: 1, filter: 'grayscale(0%)', duration: 1.8, ease: 'power4.inOut' },
                "-=1.2"
            );

            // 2. CONTENT SECTIONS - Slide Up + Fade
            const sections = document.querySelectorAll('.content-reveal');
            sections.forEach(section => {
                gsap.fromTo(section,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });

            // 3. LIST STAGGERS - Dynamic entry
            const listGroups = document.querySelectorAll('.list-group-reveal');
            listGroups.forEach(group => {
                const items = group.querySelectorAll('li, .list-item');
                gsap.fromTo(items,
                    { x: -50, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'back.out(1.5)',
                        scrollTrigger: {
                            trigger: group,
                            start: 'top 85%'
                        }
                    }
                );
            });

            // 4. PRINCIPLES CARDS - Staggered Grid Pop
            gsap.fromTo('.principle-card',
                { y: 100, opacity: 0, scale: 0.8 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'elastic.out(1, 0.8)',
                    scrollTrigger: {
                        trigger: '.principles-grid',
                        start: 'top 80%'
                    }
                }
            );

            // 5. Parallax Background
            gsap.to('.parallax-bg', {
                y: '20%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.parallax-container',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // ... (keep existing imports)

    // ... (inside AboutPage component)

    return (
        <motion.div
            ref={containerRef}
            className="min-h-screen bg-white overflow-hidden text-gq-dark font-sans will-change-transform"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
        >

            {/* --- HERO SECTION --- */}
            <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gq-dark text-white px-6 overflow-hidden">
                {/* Abstract BG */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gq-gold rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gq-burgundy rounded-full blur-[100px] animate-pulse"></div>
                </div>

                <div className="container-gq grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    <div className="z-10 relative will-change-transform">
                        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight mb-6 perspective-500 flex flex-wrap gap-x-6">
                            {"About Gary Quinnett".split(" ").map((word, i) => (
                                <span key={i} className="inline-block whitespace-nowrap">
                                    {word.split("").map((char, j) => (
                                        <span key={j} className="hero-title-char inline-block origin-bottom">{char}</span>
                                    ))}
                                </span>
                            ))}
                        </h1>
                        <div className="hero-subtitle w-32 h-2 bg-gq-gold mb-8 rounded-full"></div>
                        <p className="hero-subtitle text-xl md:text-2xl text-white/80 max-w-lg leading-relaxed font-light">
                            Aggressive, business-savvy legal representation for Oklahoma.
                        </p>
                    </div>

                    <div className="relative perspective-1000">
                        <div className="hero-image-reveal relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/5] max-w-md mx-auto transform transition-transform hover:scale-[1.02] duration-700">
                            <img src="/gary2.jpg" alt="Gary Quinnett" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-8 left-8 right-8 text-center bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                                <p className="text-white font-serif italic">"We play to win."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- OUR PRACTICE --- */}
            <section className="py-24 container-gq">
                <div className="max-w-4xl mx-auto content-reveal">
                    <div className="flex items-center gap-6 mb-8 group">
                        <div className="w-16 h-16 bg-gq-gold/10 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                            <Shield className="w-8 h-8 text-gq-gold" />
                        </div>
                        <h2 className="font-serif text-5xl font-bold text-gq-dark">Our Practice</h2>
                    </div>
                    <p className="text-xl leading-relaxed text-gray-700 mb-8">
                        The Law Offices of Gary David Quinnett, PLLC serves businesses and entrepreneurs throughout Oklahoma with aggressive, business-savvy legal representation. We focus on <strong className="text-gq-burgundy border-b-2 border-gq-burgundy/20">real estate, construction, and oil and gas law</strong>, with emphasis on negotiating and defending contracts that protect our clients' assets.
                    </p>
                    <div className="p-8 bg-gradient-to-r from-gq-light-gradient to-white border-l-8 border-gq-gold rounded-r-xl shadow-sm transform hover:translate-x-2 transition-transform duration-300">
                        <p className="text-xl font-medium text-gq-dark/80 italic font-serif">
                            "We understand that businesses must control costs, so we have structured our fees to provide top-tier legal advice at a reasonable price."
                        </p>
                    </div>
                </div>
            </section>

            {/* --- ABOUT GARY --- */}
            <section className="bg-gray-50 py-24 relative overflow-hidden">
                <div className="container-gq relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
                        {/* Left Col */}
                        <div className="lg:col-span-8 content-reveal">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="font-serif text-4xl font-bold">About Gary</h2>
                                <div className="h-px bg-gray-300 flex-grow"></div>
                            </div>

                            <p className="text-lg text-gray-700 mb-12 leading-relaxed">
                                Gary Quinnett brings over three decades of legal experience combined with real-world business insight. His practice is built on technical expertise, business acumen, and a commitment to delivering results.
                            </p>

                            {/* Professional Background */}
                            <div className="mb-16">
                                <h3 className="font-serif text-2xl font-bold text-gq-dark mb-6">Professional Background</h3>
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gq-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-gq-gold/10 transition-colors duration-500"></div>

                                    <p className="text-gray-700 mb-6 relative z-10">
                                        Gary's career spans multiple facets of business and energy law. He began his involvement in the oil and gas industry in 1982 as a Landman, giving him deep industry knowledge that informs his legal practice today.
                                    </p>
                                    <p className="text-gray-700 mb-8 relative z-10">
                                        Before establishing his law practice, Gary spent 13 years with a Fortune 500 company, providing him with valuable business perspective that sets him apart from attorneys with purely legal backgrounds.
                                    </p>

                                    <div className="space-y-8 list-group-reveal relative z-10">
                                        <h4 className="font-bold text-gq-dark uppercase tracking-widest text-sm border-b border-gray-100 pb-2">Current Positions</h4>

                                        <div className="list-item pl-6 border-l-4 border-gq-gold hover:border-gq-burgundy transition-colors duration-300">
                                            <h5 className="font-bold text-xl text-gq-dark">Managing Member</h5>
                                            <div className="text-gq-gold font-serif italic mb-1">Law Offices of Gary David Quinnett, PLLC</div>
                                            <span className="text-xs font-bold uppercase text-gray-400 block mb-2 tracking-wide">September 2008 - Present</span>
                                            <p className="text-gray-600">Practicing Oil and Gas, Construction and Real Estate Law</p>
                                        </div>

                                        <div className="list-item pl-6 border-l-4 border-gq-gold hover:border-gq-burgundy transition-colors duration-300">
                                            <h5 className="font-bold text-xl text-gq-dark">Managing Member</h5>
                                            <div className="text-gq-gold font-serif italic mb-1">Native Resource Management, LLC</div>
                                            <span className="text-xs font-bold uppercase text-gray-400 block mb-2 tracking-wide">January 2009 - Present</span>
                                            <p className="text-gray-600">Working Interest Owner in oil and gas operations</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Credentials & Notable Experience Split */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="list-group-reveal bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="font-serif text-xl font-bold text-gq-dark mb-6 flex items-center gap-3">
                                        <Award className="w-6 h-6 text-gq-burgundy" /> Professional Credentials
                                    </h3>
                                    <ul className="space-y-4 text-gray-700 text-sm">
                                        <li className="flex items-start gap-3 group"><div className="w-1.5 h-1.5 rounded-full bg-gq-gold mt-2 group-hover:scale-150 transition-transform"></div> Oklahoma Bar Association</li>
                                        <li className="flex items-start gap-3 group"><div className="w-1.5 h-1.5 rounded-full bg-gq-gold mt-2 group-hover:scale-150 transition-transform"></div> Professionalism Committee, OBA (2014 Vice Chairman)</li>
                                        <li className="flex items-start gap-3 group"><div className="w-1.5 h-1.5 rounded-full bg-gq-gold mt-2 group-hover:scale-150 transition-transform"></div> Business and Corporate Law Section, OBA</li>
                                        <li className="flex items-start gap-3 group"><div className="w-1.5 h-1.5 rounded-full bg-gq-gold mt-2 group-hover:scale-150 transition-transform"></div> South Oklahoma City Lawyer's Association</li>
                                        <li className="flex items-start gap-3 group"><div className="w-1.5 h-1.5 rounded-full bg-gq-gold mt-2 group-hover:scale-150 transition-transform"></div> U.S. District Court, Western District of OK</li>
                                    </ul>
                                </div>

                                <div className="list-group-reveal bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h3 className="font-serif text-xl font-bold text-gq-dark mb-6 flex items-center gap-3">
                                        <Star className="w-6 h-6 text-gq-gold" /> Notable Experience
                                    </h3>
                                    <ul className="space-y-4 text-gray-700 text-sm">
                                        <li className="flex items-start gap-3 group"><CheckCircle2 className="w-5 h-5 text-gray-300 mt-0.5 shrink-0 group-hover:text-gq-gold transition-colors" /> Negotiated hundreds of agreements with the largest law firms</li>
                                        <li className="flex items-start gap-3 group"><CheckCircle2 className="w-5 h-5 text-gray-300 mt-0.5 shrink-0 group-hover:text-gq-gold transition-colors" /> Experienced at recovering money owed & favorable terms</li>
                                        <li className="flex items-start gap-3 group"><CheckCircle2 className="w-5 h-5 text-gray-300 mt-0.5 shrink-0 group-hover:text-gq-gold transition-colors" /> Long history in oil and gas dating back to 1982</li>
                                        <li className="flex items-start gap-3 group"><CheckCircle2 className="w-5 h-5 text-gray-300 mt-0.5 shrink-0 group-hover:text-gq-gold transition-colors" /> Published author in Well Servicing Magazine</li>
                                        <li className="flex items-start gap-3 group"><CheckCircle2 className="w-5 h-5 text-gray-300 mt-0.5 shrink-0 group-hover:text-gq-gold transition-colors" /> Lawyer of Distinction (2021, 2022)</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        {/* Right Col - Sticky Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Education Card */}
                            <div className="bg-gq-dark text-white p-10 rounded-2xl shadow-2xl content-reveal sticky top-32 overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                <h3 className="font-serif text-3xl font-bold text-gq-gold mb-8 flex items-center gap-3 relative z-10">
                                    <BookOpen className="w-8 h-8" /> Education
                                </h3>
                                <ul className="space-y-8 list-group-reveal relative z-10">
                                    <li className="list-item group">
                                        <div className="font-bold text-2xl mb-1 group-hover:text-gq-gold transition-colors">J.D., 1992</div>
                                        <div className="text-white/60 font-serif">University of Oklahoma,<br />College of Law</div>
                                    </li>
                                    <li className="list-item pt-6 border-t border-white/10 group">
                                        <div className="font-bold text-2xl mb-1 group-hover:text-gq-gold transition-colors">B.B.A., 1985</div>
                                        <div className="text-white/60 font-serif">University of Oklahoma</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- OUR APPROACH (Principles) --- */}
            <section className="py-32 bg-gq-dark text-white relative overflow-hidden parallax-container">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="parallax-bg absolute top-0 left-0 w-full h-[120%] bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center grayscale mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gq-dark/90"></div>
                </div>

                <div className="container-gq relative z-10">
                    <div className="text-center mb-20 content-reveal">
                        <h2 className="font-serif text-5xl font-bold mb-6">Our Approach</h2>
                        <div className="w-24 h-1 bg-gq-gold mx-auto rounded-full mb-6"></div>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto">Guided by core principles that define how we win.</p>
                    </div>

                    <div className="principles-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { t: "Advocate Aggressively", d: "We play to win.", i: Shield },
                            { t: "Integrity", d: "Highest degree of professionalism.", i: Award },
                            { t: "Privacy", d: "Your business stays yours.", i: Shield },
                            { t: "Communication", d: "Open and frequent.", i: Mail },
                            { t: "Fast Turnaround", d: "Time is money.", i: Briefcase },
                            { t: "Value Driven", d: "Top-tier advice. Reasonable price.", i: TrendingUp },
                        ].map((p, i) => (
                            <div key={i} className="principle-card bg-white/5 backdrop-blur-md border border-white/5 p-10 rounded-2xl hover:bg-white/10 hover:border-gq-gold/30 hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                                <div className="mb-6 flex items-center justify-between">
                                    <p.i className="w-10 h-10 text-gq-gold group-hover:scale-110 transition-transform duration-300" />
                                    <span className="text-gray-600 font-black text-6xl opacity-10 font-serif group-hover:text-gq-gold group-hover:opacity-20 transition-all">0{i + 1}</span>
                                </div>
                                <h3 className="font-bold text-2xl mb-3 group-hover:text-gq-gold transition-colors">{p.t}</h3>
                                <p className="text-white/60 group-hover:text-white/90 transition-colors">{p.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- WHO WE SERVE & CONTACT --- */}
            <section className="py-24 bg-white">
                <div className="container-gq">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Who We Serve */}
                        <div className="content-reveal flex flex-col justify-center">
                            <h2 className="font-serif text-4xl font-bold text-gq-dark mb-8">Who We Serve</h2>
                            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                                Our typical client is a business owner, entrepreneur, or self-made professional who requires an attorney with both legal expertise and business acumen to help sustain and grow their business.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                                The majority of our clients are in the greater Oklahoma City area (Norman, Edmond, Yukon, etc.), though we serve clients throughout Oklahoma. Satisfied client referrals have led us to represent both clients and outside law firms in Texas and other states.
                            </p>
                            <div className="p-6 border-l-4 border-gq-burgundy bg-gray-50">
                                <p className="text-2xl font-serif font-bold text-gq-burgundy">
                                    "We are Oklahomans, and our focus is business in Oklahoma."
                                </p>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="content-reveal bg-gq-dark text-white p-12 rounded-3xl relative overflow-hidden shadow-2xl">
                            {/* Decor */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gq-gold rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>

                            <h2 className="font-serif text-3xl font-bold mb-10 relative z-10">Start Winning Today</h2>

                            <div className="space-y-8 relative z-10">
                                <div>
                                    <h3 className="font-bold text-xl mb-2 text-gq-gold">Law Offices of Gary David Quinnett, PLLC</h3>
                                    <p className="flex items-start gap-3 text-white/80 leading-relaxed">
                                        <MapPin className="w-5 h-5 text-white/50 shrink-0 mt-1" />
                                        <span>10005 N May Ave, Suite 120<br />Oklahoma City, OK 73120</span>
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <a href="tel:405-607-2266" className="flex items-center gap-4 font-bold text-white hover:text-gq-gold transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gq-gold group-hover:text-gq-dark transition-colors">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <span className="text-xl">(405) 607-2266</span>
                                    </a>
                                    <a href="mailto:gary@gq-law.com" className="flex items-center gap-4 font-bold text-white hover:text-gq-gold transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-gq-gold group-hover:text-gq-dark transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <span className="text-xl">gary@gq-law.com</span>
                                    </a>
                                    <p className="flex items-center gap-4 text-white/50 pl-2">
                                        <span className="font-bold text-xs uppercase tracking-wider w-8">Fax</span> 1-866-728-0676
                                    </p>
                                </div>

                                <div className="pt-8 border-t border-white/10">
                                    <h4 className="font-bold text-sm text-gq-gold uppercase tracking-widest mb-4">Additional Office</h4>
                                    <p className="text-white/70 leading-relaxed text-sm">
                                        Dillard Group Building<br />
                                        1800 North Interstate Drive, Suite 230<br />
                                        Norman, OK 73072
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </motion.div>
    );
};

export default AboutPage;
