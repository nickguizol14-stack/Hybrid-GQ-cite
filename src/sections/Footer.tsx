import { useNavigate, useLocation } from 'react-router-dom';
import { Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion, type Variants, type Easing } from 'framer-motion';

const quickLinks = [
  { label: 'About', href: '/about' },
  { label: 'Construction Law', href: '/construction-law' },
  { label: 'Real Estate Law', href: '/real-estate-law' },
  { label: 'Lien Predictor', href: '/lien-predictor' },
  { label: 'Lien Book', href: '/lien-book' },
  { label: 'Insights', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as Easing }
  },
};

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="w-full bg-gq-dark relative overflow-hidden">
      {/* Animated top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute top-0 left-0 right-0 h-0.5 gold-shimmer origin-left"
        style={{
          background: 'linear-gradient(90deg, #8E733E 0%, #C5A869 50%, #E6D3A3 100%)',
          backgroundSize: '200% 200%',
        }}
      />

      <div className="container-gq py-16 lg:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          {/* Logo & Description */}
          <motion.div variants={itemVariants} className="lg:col-span-2 pr-4">
            <a href="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center gap-3 mb-6 group inline-block">
              <img
                src="/logo-gwinnett.png"
                alt="GQ Law - Gary David Quinnett, Attorney and Counselor at Law"
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
                className="w-11 h-11 rounded-full border border-gq-light/10 flex items-center justify-center text-gq-light/60 hover:text-gq-gold hover:border-gq-gold/50 transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-11 h-11 rounded-full border border-gq-light/10 flex items-center justify-center text-gq-light/60 hover:text-gq-gold hover:border-gq-gold/50 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:gary@gq-law.com"
                className="w-11 h-11 rounded-full border border-gq-light/10 flex items-center justify-center text-gq-light/60 hover:text-gq-gold hover:border-gq-gold/50 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
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
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
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
          </motion.div>
        </motion.div>
      </div>

      {/* Legal Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border-t border-[#C5A869]/10 bg-[#0F0C09]"
      >
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
      </motion.div>
    </footer>
  );
};

export default Footer;
