'use client';

import { useEffect, useRef } from 'react';
import type { createSignalRenderer } from './signal-renderer';

export function SignalCanvas({ mode }: { mode: 'assembly' | 'spotlight' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const assembly = mode === 'assembly';

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host || !('gpu' in navigator) || !navigator.gpu) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const controller = new AbortController();
    const { signal } = controller;
    let renderer: Awaited<ReturnType<typeof createSignalRenderer>>;
    let visible = false;
    let loading = false;
    let request = 0;
    let lastFrame = 0;
    let startedAt: number | undefined;
    let rendered = false;
    let strength = 0;
    let pointer: [number, number] | undefined;
    let focus: [number, number] | undefined;
    let origin: [number, number] = [0.5, 0.5];


    function stop() {
      if (signal.aborted) return;
      controller.abort();
      observer.disconnect();
      cancelAnimationFrame(request);
      renderer?.dispose();
      canvas!.removeAttribute('data-rendering');
    }

    function queueFrame() {
      if (!request && renderer && visible && !document.hidden && !signal.aborted) {
        request = requestAnimationFrame(render);
      }
    }

    function render(now: number) {
      request = 0;
      if (!renderer || !visible || document.hidden || signal.aborted) return;
      startedAt ??= now;
      const elapsed = (now - startedAt) / 1000;
      if (assembly && elapsed >= 0.95) {
        stop();
        return;
      }
      const next = pointer ?? focus;
      if (next) origin = next;
      const easing = 1 - Math.exp(-Math.min(now - (lastFrame || now - 16), 60) / 65);
      lastFrame = now;
      strength += ((next ? 1 : 0) - strength) * easing;
      if (!next && strength < 0.01) strength = 0;

      try {
        renderer.draw(elapsed, origin, assembly ? 1 : strength);
        if (!rendered) {
          canvas!.setAttribute('data-rendering', 'true');
          rendered = true;
        }
      } catch {
        stop();
        return;
      }

      // A stationary pointer holds its last frame once the light settles.
      if (assembly || (next ? strength < 0.99 : strength > 0)) queueFrame();
    }

    async function start() {
      if (loading || signal.aborted || motionPreference.matches) return;
      loading = true;
      try {
        const { createSignalRenderer } = await import('./signal-renderer');
        renderer = await createSignalRenderer(canvas!, assembly, stop, signal);
        if (assembly || pointer || focus) queueFrame();
      } catch {
        stop();
      }
    }

    function position(x: number, y: number): [number, number] {
      const rect = host!.getBoundingClientRect();
      return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
    }

    function move(event: PointerEvent) {
      if (event.pointerType === 'touch') return;
      pointer = position(event.clientX, event.clientY);
      queueFrame();
    }

    function leave() {
      pointer = undefined;
      queueFrame();
    }

    function focusIn(event: FocusEvent) {
      if (!(event.target instanceof HTMLElement) || !event.target.matches(':focus-visible')) return;
      const rect = event.target.getBoundingClientRect();
      focus = position(rect.left + Math.min(90, rect.width / 2), rect.top + rect.height / 2);
      queueFrame();
    }

    function focusOut() {
      focus = undefined;
      queueFrame();
    }

    function visibilityChange() {
      if (assembly || pointer || focus || strength) queueFrame();
    }

    function preferenceChange() {
      if (motionPreference.matches) stop();
    }

    if (motionPreference.matches) return;
    motionPreference.addEventListener('change', preferenceChange, { signal });
    document.addEventListener('visibilitychange', visibilityChange, { signal });

    if (!assembly) {
      host.addEventListener('pointermove', move, { passive: true, signal });
      host.addEventListener('pointerleave', leave, { signal });
      host.addEventListener('focusin', focusIn, { signal });
      host.addEventListener('focusout', focusOut, { signal });
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        void start();
        visibilityChange();
      }
    });
    observer.observe(host);

    return stop;
  }, [assembly]);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />;
}
