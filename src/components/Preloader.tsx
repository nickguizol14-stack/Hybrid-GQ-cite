import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [isReady, setIsReady] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoWrapperRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Shorter delay for a punchier experience
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isReady && containerRef.current && logoWrapperRef.current && logoRef.current) {
            // Find the actual logo in the Navigation header that is rendering behind the preloader
            // Find the actual logo in the Navigation header that is rendering behind the preloader
            const targetLogo = document.querySelector('nav img[src="/logo-gwinnett.png"]');

            const tl = gsap.timeline({
                onComplete: () => {
                    onComplete(); // Tell App to unmount preloader
                }
            });

            if (targetLogo) {
                // Get exact pixel coordinates of both logos
                const targetRect = targetLogo.getBoundingClientRect();
                const sourceRect = logoRef.current.getBoundingClientRect();

                // Calculate the difference in positioning
                const destX = targetRect.left;
                const destY = targetRect.top;
                const currentX = sourceRect.left;
                const currentY = sourceRect.top;

                // Calculate scale precisely (based on height, as the Nav log is h-12/14/16)
                const scale = targetRect.height / sourceRect.height;

                // 1. Fade out the dark background overlay completely
                tl.to(containerRef.current, {
                    backgroundColor: 'rgba(26, 21, 16, 0)',
                    backdropFilter: 'blur(0px)',
                    duration: 1.0,
                    ease: "power2.inOut"
                }, 0);

                // 1b. Quickly fade out the stationary 'ghost' elements (glow and mask container) 
                // so they don't awkwardly linger in the center while the real logo flies away.
                tl.to(".ghost-fade", {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }, 0);

                // 2. Fly the logo to the exact target position using top-left matching
                // We use x/y transforms to avoid reflows. Because the origin is top-left,
                // scaling down means we move the top-left corner exactly point-to-point.
                gsap.set(logoRef.current, { transformOrigin: "top left" });

                tl.to(logoRef.current, {
                    x: destX - currentX,
                    y: destY - currentY,
                    scale: scale,
                    opacity: 0, // Fade out right at the end to hand off to the real logo
                    duration: 1.0,
                    ease: "power3.inOut" // A very smooth, swooping curve
                }, 0);
            } else {
                // FALLBACK: If the DOM target is completely missing (e.g. mobile breakpoint navigation hiding),
                // we gracefully fade out the entire screen and FORCE the onComplete callback.

                // Hide ghost elements immediately
                gsap.set(".ghost-fade", { opacity: 0 });

                // Fade out the main container
                tl.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.inOut"
                }, 0);
            }
        }
    }, [isReady, onComplete]);

    return (
        <AnimatePresence>
            <div
                ref={containerRef}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1A1510] overflow-hidden"
            >
                {/* Subtle background glow */}
                <div className="ghost-fade absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] bg-[#C5A869]/5 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 flex flex-col items-center"
                >
                    {/* Logo Wrapper with Shine Effect */}
                    <div
                        ref={logoWrapperRef}
                        className="relative h-20 sm:h-24 md:h-28 flex justify-center items-center overflow-visible pointer-events-none"
                    >
                        {/* 1. Base Logo */}
                        <img
                            ref={logoRef}
                            src="/logo-gwinnett.png"
                            alt="GQ Law Loader"
                            className="h-full w-auto object-contain relative z-10"
                            style={{ filter: 'drop-shadow(0px 0px 15px rgba(197, 168, 105, 0.15))' }}
                        />

                        {/* 2. Masked Shine Effect Container */}
                        {/* We use the exact logo image to create a pixel-perfect mask,
                        so the shine strictly only appears OVER the logo's letters/pixels. */}
                        <div
                            className="ghost-fade absolute inset-0 z-20 pointer-events-none"
                            style={{
                                maskImage: `url("/logo-gwinnett.png")`,
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskImage: `url("/logo-gwinnett.png")`,
                                WebkitMaskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center',
                            }}
                        >
                            {/* 3. The Shine Element (Replit Timings & Styles) */}
                            <motion.div
                                className="absolute top-[-50%] bottom-[-50%] w-[100px] bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
                                style={{
                                    transform: 'skewX(-20deg)',
                                    filter: 'blur(4px)'
                                }}
                                initial={{ left: '-20%' }}
                                animate={{ left: '120%' }}
                                transition={{
                                    duration: 2.5,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatDelay: 3
                                }}
                            />
                        </div>
                    </div>
                    {/* The "Establishing connection..." text has been removed for a cleaner look */}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Preloader;
