'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ScrollStorytelling() {
  useEffect(() => {
    // Prevent SSR running
    if (typeof window === 'undefined') return;

    // Create a gsap context so that we can easily revert/clean up all scroll animations
    const ctx = gsap.context(() => {
      
      // 1. Services section rows animation
      gsap.fromTo(
        '#services .service-row',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#services',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. GDC section animations
      gsap.fromTo(
        '#gdc .gdc-left-col > *',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#gdc',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '#gdc .gdc-right-col',
        { opacity: 0, x: 80, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#gdc',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 3. PontoControle section animations
      gsap.fromTo(
        '#pontocontrole .pc-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#pontocontrole',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '#pontocontrole .pc-simulator',
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#pontocontrole .pc-simulator',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '#pontocontrole .pc-feature-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#pontocontrole .pc-feature-card',
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 4. LeadScrap section animations
      gsap.fromTo(
        '#leadscrap .ls-mockup-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#leadscrap',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '#leadscrap .ls-left-col > *',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#leadscrap .ls-mockup-card',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '#leadscrap .ls-right-col',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '#leadscrap .ls-mockup-card',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 5. Testimonials section animations
      gsap.fromTo(
        '#testimonials .testimonials-perspective-container',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 6. FAQ section animations
      gsap.fromTo(
        '#faq',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#faq',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 7. Contact/Links section animations
      gsap.fromTo(
        '#contact-cta a',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#contact-cta',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

    });

    return () => {
      ctx.revert(); // clean up and kill all animations on unmount
    };
  }, []);

  return null; // This component registers animations, does not render visual elements
}
