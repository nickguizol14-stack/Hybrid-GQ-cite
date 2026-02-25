import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Practice Areas', href: '#practice-areas' },
  { label: 'Lien Predictor', href: '#lien-predictor' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const legalRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ctx = gsap.context(() => { });

    // Adding a slight delay to ensure the DOM has fully rendered the new page's height
    const timer = setTimeout(() => {
      ctx.add(() => {
        // Top border gradient wipe
        gsap.fromTo(
          borderRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 95%',
              once: true,
            },
          }
        );

        // Logo fade + scale
        gsap.fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 95%',
              once: true,
            },
          }
        );

        // Links stagger
        const links = linksRef.current?.querySelectorAll('a');
        if (links) {
          gsap.fromTo(
            links,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.06,
              delay: 0.4,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 95%',
                once: true,
              },
            }
          );
        }

        // Contact info stagger
        const contactItems = contactRef.current?.querySelectorAll('.contact-item');
        if (contactItems) {
          gsap.fromTo(
            contactItems,
            { y: 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.08,
              delay: 0.5,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 95%',
                once: true,
              },
            }
          );
        }

        // Mobile Legal specific animation
        if (window.innerWidth < 768 && legalRef.current) {
          gsap.fromTo(
            legalRef.current,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 90%',
                once: true,
              },
            }
          );
        }
      });

      // Force refresh of all scroll triggers to calculate correct positions after animations are added
      ScrollTrigger.refresh();

    }, 300);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      // If we are on an internal page, route to home first
      navigate(`/${href}`);
      // Add a slight delay to allow rendering before scrolling
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we are already on home, just scroll smoothly
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else if (href === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer ref={footerRef} className="w-full bg-gq-dark relative">
      {/* Animated top border */}
      <div
        ref={borderRef}
        className="absolute top-0 left-0 right-0 h-0.5 gold-shimmer origin-left"
        style={{
          background: 'linear-gradient(90deg, #8E733E 0%, #C5A869 50%, #E6D3A3 100%)',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="container-gq py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Description */}
          <div ref={logoRef} className="lg:col-span-2 pr-4">
            <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 mb-6 group inline-block">
              <img
                src="/logo-gwinnett.png"
                alt="Quinnett Attorney & Counselor at Law"
                className="h-12 sm:h-14 w-auto object-contain group-hover:opacity-90 transition-opacity duration-300"
              />
            </a>
            <p className="text-gq-light/70 text-sm leading-relaxed mb-8 max-w-sm">
              Aggressive, business-savvy legal representation for Oklahoma&apos;s
              contractors, business owners, and dealmakers.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gq-light/10 flex items-center justify-center text-gq-light/60 hover:text-gq-gold hover:border-gq-gold/50 transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gq-light/10 flex items-center justify-center text-gq-light/60 hover:text-gq-gold hover:border-gq-gold/50 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:gary@gq-law.com"
                className="w-10 h-10 rounded-full border border-gq-light/10 flex items-center justify-center text-gq-light/60 hover:text-gq-gold hover:border-gq-gold/50 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div ref={linksRef}>
            <h4 className="font-serif font-medium tracking-wide text-[#E6D3A3] text-lg mb-6">
              Menu
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    if (location.pathname !== '/') navigate('/');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-gq-light/70 hover:text-gq-gold transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
                >
                  <span className="w-0 h-px bg-gq-gold group-hover:w-3 transition-all duration-300" />
                  Home
                </a>
              </li>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gq-light/70 hover:text-gq-gold transition-colors duration-300 text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gq-gold group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div ref={contactRef}>
            <h4 className="font-serif font-medium tracking-wide text-[#E6D3A3] text-lg mb-6">
              Contact
            </h4>
            <ul className="space-y-5">
              <li className="contact-item">
                <a
                  href="tel:405-607-2266"
                  className="flex items-center gap-3 text-gq-light/70 hover:text-gq-gold transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gq-light/5 flex items-center justify-center group-hover:bg-[#C5A869]/10 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-gq-gold" />
                  </div>
                  <span className="text-sm font-light tracking-wide">(405) 607-2266</span>
                </a>
              </li>
              <li className="contact-item">
                <a
                  href="mailto:gary@gq-law.com"
                  className="flex items-center gap-3 text-gq-light/70 hover:text-gq-gold transition-colors duration-300 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gq-light/5 flex items-center justify-center group-hover:bg-[#C5A869]/10 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-gq-gold" />
                  </div>
                  <span className="text-sm font-light tracking-wide">gary@gq-law.com</span>
                </a>
              </li>
              <li className="contact-item">
                <div className="flex items-start gap-3 text-gq-light/70">
                  <div className="w-8 h-8 rounded-full bg-gq-light/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-gq-gold" />
                  </div>
                  <span className="text-sm font-light tracking-wide leading-relaxed pt-1">
                    10005 N May Ave, Suite 120
                    <br />
                    Oklahoma City, OK 73120
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Legal Bar with generous padding to prevent cramping */}
      <div ref={legalRef} className="border-t border-[#C5A869]/10 bg-[#0F0C09]">
        <div className="container-gq py-8 lg:py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-gq-light/40 text-[11px] text-center lg:text-left max-w-3xl leading-relaxed font-light tracking-wide">
              <span className="font-semibold text-gq-light/60">Attorney Advertising.</span> This
              website is designed for general information only. The information
              presented should not be construed to be formal legal advice nor the
              formation of a lawyer/client relationship.
            </p>
            <p className="text-gq-light/60 text-[11px] tracking-widest uppercase shrink-0 font-medium">
              &copy; {new Date().getFullYear()} G.D. Quinnett, PLLC.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
