'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Bind Lenis updates to the GSAP Ticker for frame-perfect scroll rendering sync
    const updateLenis = (time: number) => {
      // Prevent scrolling while loader is active (body overflow hidden)
      const isPageLoading = document.body.style.overflow === 'hidden';
      if (isPageLoading) {
        lenis.stop();
      } else {
        lenis.start();
        lenis.raf(time * 1000);
      }
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Update ScrollTrigger on refresh
    ScrollTrigger.defaults({
      markers: false,
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return <>{children}</>;
}
