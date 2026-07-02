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
      
      // 1. Hero exit parallax scroll (emotional storytelling transition)
      gsap.to('#hero .hero-badge, #hero .hero-title, #hero .hero-subtext, #hero .hero-ctas', {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom 20%',
          scrub: true,
        }
      });

      // 2. LogoWall entry scale and fade
      gsap.fromTo('#logo-wall', 
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '#logo-wall',
            start: 'top 95%',
            end: 'top 75%',
            scrub: true,
          }
        }
      );

      // 3. Services section rows animation (global)
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

      // ===================================================
      // GLOBAL HORIZONTAL SCROLL STORYTELLING TWEEN
      // ===================================================
      const container = document.querySelector('.saas-scroll-container');
      const track = document.querySelector('.saas-scroll-track');

      let horizontalScroll: any = null;

      if (container && track) {
        // Create a GSAP Timeline driven by ScrollTrigger
        horizontalScroll = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${(track.scrollWidth - window.innerWidth) * 1.6}`,
            invalidateOnRefresh: true,
          }
        });

        // 1. Hold first slide (GDC Pitch) on screen for a short scroll distance (pauses scroll movement) - Cut in half
        horizontalScroll.to({}, { duration: 0.3 });

        // 2. Animate the horizontal slide transition to the left
        horizontalScroll.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: 'none',
          duration: 2.0
        });
      }

      // GDC Spotlight animations inside horizontal track
      gsap.fromTo(
        '#gdc-pitch .gdc-left-col > *',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#gdc-pitch',
            containerAnimation: horizontalScroll,
            start: 'left 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '#gdc-simulator .gdc-right-col',
        { opacity: 0, x: 80, scale: 0.98 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#gdc-simulator',
            containerAnimation: horizontalScroll,
            start: 'left 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // PontoControle animations inside horizontal track
      gsap.fromTo(
        '#pontocontrole .pc-header',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#pontocontrole .pc-simulator',
            containerAnimation: horizontalScroll,
            start: 'left 80%',
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
            containerAnimation: horizontalScroll,
            start: 'left 80%',
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
            containerAnimation: horizontalScroll,
            start: 'left 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // LeadScrap animations inside horizontal track
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
            containerAnimation: horizontalScroll,
            start: 'left 80%',
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
            containerAnimation: horizontalScroll,
            start: 'left 80%',
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
            containerAnimation: horizontalScroll,
            start: 'left 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // LeadScrap 3D Parallax depth effect for floating cards
      gsap.fromTo('#leadscrap .ls-float-msg', 
        { x: -50 }, 
        {
          x: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: '#leadscrap',
            containerAnimation: horizontalScroll,
            start: 'left 100%',
            end: 'right 0%',
            scrub: true
          }
        }
      );

      gsap.fromTo('#leadscrap .ls-float-leads', 
        { x: 50 }, 
        {
          x: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: '#leadscrap',
            containerAnimation: horizontalScroll,
            start: 'left 100%',
            end: 'right 0%',
            scrub: true
          }
        }
      );

      // 4. Testimonials section animations (global)
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

      // 5. FAQ section animations (global)
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

      // 6. Contact/Links section animations (global)
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
