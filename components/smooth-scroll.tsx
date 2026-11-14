// Hello World
'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import { MotionConfig } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageSync } from '@/lib/i18n';

gsap.registerPlugin(ScrollTrigger);

/** Keeps ScrollTrigger in lockstep with Lenis. */
function LenisGsapBridge() {
  useLenis(ScrollTrigger.update);

  useEffect(() => {
    // Fonts swap in after first paint; re-measure every trigger once they land.
    if (!('fonts' in document)) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        anchors: { offset: -16 },
      }}
    >
      <LenisGsapBridge />
      <MotionConfig reducedMotion="user">
        {children}
        <LanguageSync />
      </MotionConfig>
    </ReactLenis>
  );
}
