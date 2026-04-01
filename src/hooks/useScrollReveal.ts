import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  threshold?: number;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotate?: number;
  stagger?: number;
  ease?: string;
}

export const useScrollReveal = <T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) => {
  const ref = useRef<T>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const {
    delay = 0,
    duration = 0.6,
    y = 30,
    x = 0,
    scale = 1,
    rotate = 0,
    ease = 'power3.out',
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y,
      x,
      scale,
      rotate,
    });

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotate: 0,
          duration,
          delay,
          ease,
        });
      },
    });

    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach(t => t.kill());
      triggersRef.current = [];
    };
  }, [delay, duration, ease, rotate, scale, x, y]);

  return ref;
};

export const useStaggerReveal = <T extends HTMLElement>(
  selector: string,
  options: ScrollRevealOptions = {}
) => {
  const containerRef = useRef<T>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const {
    delay = 0,
    duration = 0.6,
    y = 30,
    x = 0,
    stagger = 0.1,
    ease = 'power3.out',
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Set initial state
    gsap.set(elements, {
      opacity: 0,
      y,
      x,
    });

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          stagger,
          ease,
        });
      },
    });

    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach(t => t.kill());
      triggersRef.current = [];
    };
  }, [selector, delay, duration, ease, stagger, x, y]);

  return containerRef;
};

export const useCountUp = (
  endValue: number,
  duration: number = 2,
  suffix: string = ''
) => {
  const ref = useRef<HTMLSpanElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const obj = { value: 0 };

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          value: endValue,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (element) {
              element.textContent = Math.round(obj.value) + suffix;
            }
          },
        });
      },
    });

    triggersRef.current.push(trigger);

    return () => {
      triggersRef.current.forEach(t => t.kill());
      triggersRef.current = [];
    };
  }, [endValue, duration, suffix]);

  return ref;
};

export default useScrollReveal;
