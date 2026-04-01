import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

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
import LienBook from './pages/LienBook';

import Preloader from './components/Preloader';

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
  const [showPreloader, setShowPreloader] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

    // Initialize Lenis for Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Scroll listener for header background
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle reduced motion preference gracefully
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Instead of stopping time entirely (which breaks onComplete callbacks),
      // we speed up the global timeline so animations finish instantly.
      gsap.globalTimeline.timeScale(100);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Clean up Lenis
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []); // Run only once on mount

  // Clean ScrollTrigger on route change — pages re-create their own triggers on mount
  useEffect(() => {
    setIsTransitioning(true);
    ScrollTrigger.getAll().forEach(t => t.kill());
    ScrollTrigger.refresh();
  }, [location.pathname]);

  // Lock body scroll while preloading or transitioning between pages
  useEffect(() => {
    if (showPreloader || isTransitioning) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreloader, isTransitioning]);

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
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
          <AnimatePresence
            mode="wait"
            onExitComplete={() => setIsTransitioning(false)}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/construction-law" element={<ConstructionLaw />} />
              <Route path="/real-estate-law" element={<RealEstateLaw />} />
              <Route path="/oil-and-gas-law" element={<OilAndGasLaw />} />
              <Route path="/mergers-and-acquisitions" element={<MergersAndAcquisitions />} />
              <Route path="/lien-book" element={<LienBook />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </>
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
