import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'About', href: '/about' },
  {
    label: 'Practice Areas',
    href: '#', // Non-clickable parent
    children: [
      { label: 'Construction Law', href: '/construction-law' },
      { label: 'Real Estate Law', href: '/real-estate-law' },
      { label: 'Oil & Gas Law', href: '/oil-and-gas-law' },
      { label: 'Mergers & Acquisitions', href: '/mergers-and-acquisitions' },
      { label: 'Contract Law', href: '/contract-law' },
    ]
  },
  { label: 'Lien Predictor', href: '/lien-predictor' },
  {
    label: 'Resources',
    href: '#',
    children: [
      { label: 'Lien Book', href: '/lien-book' },
      { label: 'Insights', href: '/resources' },
    ]
  },
];

interface NavigationProps {
  isScrolled?: boolean;
}

const Navigation = ({ isScrolled = false }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.7, delay: 0.3, ease: 'back.out(1.7)' }
        );
      }

      const links = linksRef.current?.querySelectorAll('.nav-item');
      if (links) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.4,
            ease: 'power3.out',
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, delay: 0.8, ease: 'back.out(1.7)' }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleNavClick = async (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    if (href === '#') return; // Ignore non-links

    setIsMobileMenuOpen(false);
    setActiveDropdown(null);

    if (href.startsWith('/#')) {
      const hash = href.substring(1);
      if (location.pathname !== '/') {
        await navigate('/');
        setTimeout(() => {
          const element = document.querySelector(hash);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`w-full transition-all duration-500 ${isScrolled
        ? 'bg-gq-dark/95 backdrop-blur-xl shadow-lg py-2'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="container-gq flex items-center justify-between">
        {/* Logo */}
        <Link
          ref={logoRef}
          to="/"
          className="flex items-center group"
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img
            src="/logo-gwinnett.png"
            alt="Quinnett Attorney & Counselor at Law"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain group-hover:opacity-90 transition-opacity duration-300"
          />
        </Link>

        {/* Desktop Navigation */}
        <div
          ref={linksRef}
          className="hidden lg:flex items-center gap-8 xl:gap-10 ml-auto pr-8"
        >
          {navLinks.map((link) => {
            const hasChildren = link.children && link.children.length > 0;
            const isActive = location.pathname === link.href || (hasChildren && link.children?.some(c => location.pathname === c.href));

            return (
              <div
                key={link.label}
                className="nav-item relative group h-full flex items-center"
                onMouseEnter={() => hasChildren && setActiveDropdown(link.label)}
                onMouseLeave={() => hasChildren && setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => hasChildren ? e.preventDefault() : handleNavClick(e, link.href)}
                  className={`flex items-center gap-1 transition-colors duration-300 text-[15px] font-medium tracking-wide relative py-2 ${isActive ? 'text-[#C5A869]' : 'text-gq-light/80 hover:text-[#C5A869]'
                    } ${hasChildren ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {link.label}
                  {hasChildren && (
                    <ChevronDown
                      className={`w-4 h-4 mt-0.5 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180 text-gq-gold' : ''
                        }`}
                    />
                  )}
                  {/* Active Indicator Dot for non-dropdowns or parent */}
                  {isActive && !hasChildren && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gq-gold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>

                {/* Sleek Animated Dropdown */}
                <AnimatePresence>
                  {hasChildren && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(8px)' }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                        transition: { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }
                      }}
                      exit={{
                        opacity: 0,
                        y: 10,
                        scale: 0.95,
                        filter: 'blur(8px)',
                        transition: { duration: 0.15 }
                      }}
                      className="absolute top-full -left-4 pt-6 w-72 z-50 perspective-1000"
                    >
                      {/* Glassmorphism Card */}
                      <div className="bg-[#1a1510]/95 backdrop-blur-3xl border border-[#C5A869]/20 rounded-xl shadow-2xl overflow-hidden ring-1 ring-black/5">
                        <div className="p-2 flex flex-col gap-1">
                          {link.children?.map((child, i) => (
                            <motion.a
                              key={child.label}
                              href={child.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                              onClick={(e) => handleNavClick(e, child.href)}
                              className={`group relative flex items-center justify-between px-4 py-3 rounded-lg text-sm transition-all duration-300 overflow-hidden ${location.pathname === child.href
                                ? 'bg-gq-gold/10 text-gq-gold'
                                : 'text-gq-light/80 hover:text-white hover:bg-white/5'
                                }`}
                            >
                              <span className="relative z-10 font-medium tracking-wide">{child.label}</span>

                              {/* Hover Arrow Reveal */}
                              <span className={`text-gq-gold transform transition-all duration-300 ${location.pathname === child.href ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                                }`}>
                                <ArrowRight className="w-4 h-4" />
                              </span>

                              {/* Subtle glow effect on hover */}
                              <div className="absolute inset-0 bg-gradient-to-r from-gq-gold/0 via-gq-gold/5 to-gq-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                            </motion.a>
                          ))}
                        </div>
                        {/* Bottom Decorative Line */}
                        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gq-gold/30 to-transparent"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href="/contact"
          onClick={(e) => handleNavClick(e, '/contact')}
          className="hidden sm:inline-flex btn-primary text-sm py-2 px-6 rounded-md tracking-wide border border-[#B03A4A]/30 cursor-pointer"
        >
          Contact Us
        </a>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gq-light p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#2d2418] shadow-2xl overflow-hidden pointer-events-auto border-b border-[#C5A869]/20"
          >
            <div className="container-gq py-4 flex flex-col gap-3 max-h-[75vh] overflow-y-auto">
              {navLinks.map((link) => (
                <div key={link.label} className="flex flex-col">
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                        className="flex items-center justify-between text-gq-light/90 hover:text-gq-gold transition-colors duration-300 text-lg font-medium py-2 w-full text-left"
                      >
                        {link.label}
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileExpanded === link.label ? 'rotate-180' : ''}`} />
                      </button>
                      {/* Submenu */}
                      <AnimatePresence>
                        {mobileExpanded === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="pl-4 flex flex-col gap-3 overflow-hidden"
                          >
                            <div className="pt-2 pb-2 flex flex-col gap-2 border-l-2 border-gq-gold/30 pl-4">
                              {link.children.map(child => (
                                <a
                                  key={child.label}
                                  href={child.href}
                                  onClick={(e) => handleNavClick(e, child.href)}
                                  className={`text-base py-2.5 px-4 rounded hover:bg-white/5 ${location.pathname === child.href ? 'text-gq-gold' : 'text-gq-light/70'}`}
                                >
                                  {child.label}
                                </a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`text-gq-light/90 hover:text-gq-gold transition-colors duration-300 text-base font-medium py-3 cursor-pointer border-b border-transparent ${location.pathname === link.href ? 'text-gq-gold border-gq-gold/30' : ''
                        }`}
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
              <a
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className="btn-primary w-full text-center mt-4 py-3 cursor-pointer font-semibold shadow-burgundy-glow"
              >
                Book a Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
