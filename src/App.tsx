import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';

import TopBar from './sections/TopBar';
import Navigation from './sections/Navigation';
import Footer from './sections/Footer';
import Home from './pages/Home';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import ConstructionLaw from './pages/ConstructionLaw';
import RealEstateLaw from './pages/RealEstateLaw';
import OilAndGasLaw from './pages/OilAndGasLaw';
import MergersAndAcquisitions from './pages/MergersAndAcquisitions';

import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function AppContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Configure GSAP defaults
    gsap.config({
      nullTargetWarn: false,
    });

    // Set up ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    // Scroll listener for header background
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [location.pathname]); // Re-run effect on route change to refresh triggers

  return (
    <div className="min-h-screen bg-gq-dark flex flex-col">
      {/* Sticky Header - TopBar + Navigation - transparent over hero */}
      <div
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-gq-dark/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'
          }`}
      >
        {/* Top Utility Bar */}
        <TopBar isScrolled={isScrolled} />

        {/* Navigation */}
        <Navigation isScrolled={isScrolled} />
      </div>

      <ScrollToTop />

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/construction-law" element={<ConstructionLaw />} />
            <Route path="/real-estate-law" element={<RealEstateLaw />} />
            <Route path="/oil-and-gas-law" element={<OilAndGasLaw />} />
            <Route path="/mergers-and-acquisitions" element={<MergersAndAcquisitions />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
