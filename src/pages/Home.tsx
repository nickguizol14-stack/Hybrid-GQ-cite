import Hero from '../sections/Hero';
import Credentials from '../sections/Credentials';
import PracticeAreas from '../sections/PracticeAreas';
import LienPredictor from '../sections/LienPredictor';
// import About from '../sections/About'; // Removed unused import
import Testimonials from '../sections/Testimonials';
import Contact from '../sections/Contact';

import { motion } from 'framer-motion';
import { pageVariants, pageTransition } from '../lib/transitions';

const Home = () => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
        >
            <Hero />
            <Credentials />
            <PracticeAreas />
            <LienPredictor />

            {/* About section removed in favor of dedicated page */}

            <Testimonials />
            <Contact />
        </motion.div>
    );
};

export default Home;
