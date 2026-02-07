import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Legal bar fade
      gsap.fromTo(
        legalRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="w-full bg-gq-dark relative">
      {/* Animated top border */}
      <div
        ref={borderRef}
        className="absolute top-0 left-0 right-0 h-0.5 gold-shimmer origin-left"
        style={{
          background: 'linear-gradient(90deg, #A67C2E 0%, #D4A84A 50%, #E4C070 100%)',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="container-gq py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo & Description */}
          <div ref={logoRef}>
            <a href="#" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 mb-4 group">
              <img
                src="/logo-gwinnett.png"
                alt="Quinnett Attorney & Counselor at Law"
                className="h-12 sm:h-14 w-auto object-contain group-hover:opacity-90 transition-opacity duration-300"
              />
            </a>
            <p className="text-gq-light/70 text-sm leading-relaxed mb-4">
              Aggressive, business-savvy legal representation for Oklahoma&apos;s
              contractors, business owners, and dealmakers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gq-dark-warm flex items-center justify-center text-gq-light/60 hover:text-gq-gold hover:bg-gq-gold/10 transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gq-dark-warm flex items-center justify-center text-gq-light/60 hover:text-gq-gold hover:bg-gq-gold/10 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:gary@gq-law.com"
                className="w-9 h-9 rounded-lg bg-gq-dark-warm flex items-center justify-center text-gq-light/60 hover:text-gq-gold hover:bg-gq-gold/10 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div ref={linksRef}>
            <h4 className="font-serif font-semibold text-gq-light text-base mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
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
            <h4 className="font-serif font-semibold text-gq-light text-base mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="contact-item">
                <a
                  href="tel:405-607-2266"
                  className="flex items-center gap-3 text-gq-light/70 hover:text-gq-gold transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 text-gq-gold" />
                  <span className="text-sm">(405) 607-2266</span>
                </a>
              </li>
              <li className="contact-item">
                <a
                  href="mailto:gary@gq-law.com"
                  className="flex items-center gap-3 text-gq-light/70 hover:text-gq-gold transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 text-gq-gold" />
                  <span className="text-sm">gary@gq-law.com</span>
                </a>
              </li>
              <li className="contact-item">
                <div className="flex items-start gap-3 text-gq-light/70">
                  <MapPin className="w-4 h-4 text-gq-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
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

      {/* Legal Bar */}
      <div ref={legalRef} className="border-t border-gq-gold/10">
        <div className="container-gq py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            <p className="text-gq-light/50 text-xs text-center lg:text-left max-w-2xl">
              <span className="font-semibold">Attorney Advertising.</span> This
              website is designed for general information only. The information
              presented should not be construed to be formal legal advice nor the
              formation of a lawyer/client relationship.
            </p>
            <p className="text-gq-light/50 text-xs">
              &copy; {new Date().getFullYear()} The Law Offices of Gary David
              Quinnett, PLLC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
