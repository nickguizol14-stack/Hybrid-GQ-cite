import Hero from '../sections/Hero';
import Credentials from '../sections/Credentials';
import WhyGary from '../sections/WhyGary';
import PracticeAreas from '../sections/PracticeAreas';
import LienPredictor from '../sections/LienPredictor';
import Testimonials from '../sections/Testimonials';
import ResourcesPreview from '../sections/ResourcesPreview';
import Contact from '../sections/Contact';

import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const Home = () => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
        >
            <SEO title="Oklahoma Construction & Business Attorney" description="Aggressive, business-savvy legal representation for Oklahoma's contractors, business owners, and dealmakers. 34 years of results." path="/" />
            <StructuredData data={{
  '@context': 'https://schema.org',
  '@type': 'Attorney',
  name: 'Gary David Quinnett, PLLC',
  url: 'https://gq-law.com',
  telephone: '(405) 607-2266',
  email: 'gary@gq-law.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '10005 N May Ave, Suite 120',
    addressLocality: 'Oklahoma City',
    addressRegion: 'OK',
    postalCode: '73120',
    addressCountry: 'US',
  },
  areaServed: 'Oklahoma',
  description: 'Aggressive, business-savvy legal representation for Oklahoma contractors, business owners, and dealmakers.',
  knowsAbout: ['Construction Law', 'Mechanics Liens', 'Real Estate Law', 'Oil and Gas Law', 'Mergers and Acquisitions'],
}} />
            <Hero />
            <Credentials />
            <WhyGary />
            <PracticeAreas />
            <LienPredictor />
            <Testimonials />
            <ResourcesPreview />
            <Contact />
        </motion.div>
    );
};

export default Home;
