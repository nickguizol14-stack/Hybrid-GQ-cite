import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const MAX_WAIT_MS = 1500;

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Wait for hero video readiness OR max timeout
  useEffect(() => {
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      setIsReady(true);
    };

    const video = document.querySelector<HTMLVideoElement>('#hero video');
    if (video) {
      if (video.readyState >= 3) {
        settle();
        return;
      }
      video.addEventListener('canplay', settle, { once: true });
    }

    const timer = setTimeout(settle, MAX_WAIT_MS);

    return () => {
      clearTimeout(timer);
      video?.removeEventListener('canplay', settle);
    };
  }, []);

  // Fade out when ready
  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete,
    });
  }, [isReady, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1A1510] overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] bg-[#C5A869]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative h-20 sm:h-24 md:h-28 flex justify-center items-center overflow-visible pointer-events-none">
          <img
            src="/logo-gwinnett.png"
            alt="GQ Law"
            className="h-full w-auto object-contain relative z-10"
            style={{ filter: 'drop-shadow(0px 0px 15px rgba(197, 168, 105, 0.15))' }}
          />

          {/* Masked shine effect */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              maskImage: 'url("/logo-gwinnett.png")',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskImage: 'url("/logo-gwinnett.png")',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center',
            }}
          >
            <motion.div
              className="absolute top-[-50%] bottom-[-50%] w-[100px] bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
              style={{ transform: 'skewX(-20deg)', filter: 'blur(4px)' }}
              initial={{ left: '-20%' }}
              animate={{ left: '120%' }}
              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Preloader;
