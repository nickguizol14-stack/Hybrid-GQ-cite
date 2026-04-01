import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MapPin, Phone, Mail } from 'lucide-react';

interface TopBarProps {
  isScrolled?: boolean;
}

const TopBar = ({ isScrolled = false }: TopBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLAnchorElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        barRef.current,
        { y: -48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );

      gsap.fromTo(
        addressRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        phoneRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: 0.3, ease: 'power3.out' }
      );

      gsap.fromTo(
        emailRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, delay: 0.4, ease: 'power3.out' }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, delay: 0.5, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={barRef}
      className={`w-full py-3 relative z-50 transition-all duration-500 ${isScrolled
        ? 'bg-gq-dark/80 text-gq-light'
        : 'bg-transparent text-gq-light'
        }`}
    >
      <div className="container-gq flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
        {/* Address */}
        <div
          ref={addressRef}
          className="hidden sm:flex items-center gap-2 text-sm opacity-90"
        >
          <MapPin className="w-4 h-4 text-gq-gold" />
          <span className="hidden sm:inline">
            10005 N May Ave, Suite 120, Oklahoma City, OK 73120
          </span>
          <span className="sm:hidden">Oklahoma City, OK</span>
        </div>

        {/* Contact Info */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            ref={phoneRef}
            href="tel:405-607-2266"
            className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-gq-gold transition-colors duration-300 hover:scale-105 transform py-2"
          >
            <Phone className="w-4 h-4 text-gq-gold" />
            <span>(405) 607-2266</span>
          </a>

          {/* Separator */}
          <div className="hidden sm:block w-[1px] h-4 bg-white/20" />

          <a
            ref={emailRef}
            href="mailto:gary@gq-law.com"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-white/90 hover:text-gq-gold transition-colors duration-300 underline-animate py-2"
          >
            <Mail className="w-4 h-4 text-gq-gold" />
            <span>gary@gq-law.com</span>
          </a>
        </div>
      </div>

      {/* Gold Bottom Line - only show when scrolled */}
      <div
        ref={lineRef}
        className={`absolute bottom-0 left-0 right-0 h-[1px] gold-shimmer origin-left transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          background: 'linear-gradient(90deg, #8E733E 0%, #C5A869 50%, #E6D3A3 100%)',
        }}
      />
    </div>
  );
};

export default TopBar;
