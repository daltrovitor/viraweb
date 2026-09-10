'use client';

import React, { useEffect, useRef } from 'react';
import { Color, Polyline, Renderer, Transform, Vec3 } from 'ogl';

interface TailedCursorProps {
  colors?: string[];
  baseThickness?: number;
  pointCount?: number;
  speedMultiplier?: number;
  baseSpring?: number;
  baseFriction?: number;
  enableShaderEffect?: boolean;
  effectAmplitude?: number;
  enableFade?: boolean;
  maxAge?: number;
  offsetFactor?: number;
  backgroundColor?: number[];
}

export default function TailedCursor({
  colors = ['#2563EB', '#06B6D4'], // ViraWeb Brand colors: Royal Blue & Cyan
  baseThickness = 36,
  pointCount = 36,
  speedMultiplier = 1.0,
  enableShaderEffect = false,
  effectAmplitude = 1.5,
  backgroundColor = [0, 0, 0, 0],
}: TailedCursorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable on touch devices to conserve power and avoid touch conflicts
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches);
    if (isTouch) return;

    const container = containerRef.current;
    if (!container) return;

    // Create renderer with alpha transparency and capped DPR for high performance
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new Renderer({ dpr, alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;

    if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {
      gl.clearColor(
        backgroundColor[0],
        backgroundColor[1],
        backgroundColor[2],
        backgroundColor[3]
      );
    } else {
      gl.clearColor(0, 0, 0, 0);
    }

    // Alpha blending for clean rich colors on light background
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.canvas.style.position = 'absolute';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    container.appendChild(gl.canvas);

    const scene = new Transform();

    // High-precision vertex shader with aerodynamic ribbon tapering
    const vertex = `
      precision highp float;
      
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      
      varying vec2 vUV;
      
      vec4 getPosition() {
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 dir = nextScreen - prevScreen;
          float len = length(dir);
          vec2 tangent = len > 0.00001 ? dir / len : vec2(1.0, 0.0);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;

          // Aerodynamic ribbon taper along length (uv.y from 0.0 at head to 1.0 at tail):
          // Swells to full width near head, tapers to needle point at tail tip
          float taper = (1.0 - uv.y) * smoothstep(0.0, 0.08, uv.y);
          taper = max(taper, (1.0 - uv.y) * 0.45);

          // Standard NDC pixel scaling (2 * side quad offsets)
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
          normal *= pixelWidthRatio * uThickness * taper;
          
          current.xy -= normal * side;
          if(uEnableShaderEffect > 0.5) {
            current.xy += normal * sin(uTime * 3.0 + uv.y * 12.0) * uEffectAmplitude;
          }
          return current;
      }
      
      void main() {
          vUV = uv;
          gl_Position = getPosition();
      }
    `;

    // Fragment shader with anti-aliased soft edges and tail fade
    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUV;
      
      void main() {
          // Falloff along tail length
          float lengthFade = pow(1.0 - vUV.y, 0.65);
          // Soft anti-aliased edge across ribbon width
          float edgeDist = abs(vUV.x - 0.5) * 2.0;
          float edgeSoftness = 1.0 - pow(edgeDist, 4.0);
          float alpha = uOpacity * lengthFade * edgeSoftness;
          gl_FragColor = vec4(uColor, alpha);
      }
    `;

    const lines: {
      spring: number;
      friction: number;
      trailLerp: number;
      points: Vec3[];
      polyline: Polyline;
    }[] = [];

    // Distinct dynamics for Royal Blue and Cyan strands so they weave naturally
    const strandConfigs = [
      { spring: 0.52, friction: 0.76, trailLerp: 0.36 }, // Strand 0: Royal Blue, crisper
      { spring: 0.42, friction: 0.80, trailLerp: 0.28 }, // Strand 1: Cyan, fluid wave
      { spring: 0.47, friction: 0.78, trailLerp: 0.32 }, // Fallback
    ];

    colors.forEach((color, index) => {
      const config = strandConfigs[index % strandConfigs.length];
      const points: Vec3[] = [];
      for (let i = 0; i < pointCount; i++) {
        points.push(new Vec3(0, 0, 0));
      }

      const polyline = new Polyline(gl, {
        points,
        vertex,
        fragment,
        uniforms: {
          uColor: { value: new Color(color) },
          uThickness: { value: baseThickness },
          uOpacity: { value: 0.0 },
          uTime: { value: 0.0 },
          uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
          uEffectAmplitude: { value: effectAmplitude },
        },
      });

      polyline.mesh.setParent(scene);
      lines.push({
        spring: config.spring,
        friction: config.friction,
        trailLerp: config.trailLerp,
        points,
        polyline,
      });
    });

    function resize() {
      if (!container) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const currentDpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.dpr = currentDpr;
      renderer.setSize(width, height);
      lines.forEach((line) => {
        if (line.polyline.resolution) {
          line.polyline.resolution.value.set(gl.canvas.width, gl.canvas.height);
        }
        if (line.polyline.dpr) {
          line.polyline.dpr.value = currentDpr;
        }
        line.polyline.resize();
      });
    }
    window.addEventListener('resize', resize);
    resize();

    const mouse = new Vec3(0, 0, 0);
    let hasMouseMoved = false;
    let lastMoveTime = 0;
    let masterOpacity = 0;
    let targetOpacity = 0;
    let isLoopRunning = false;
    let frameId: number = 0;
    let lastTime = performance.now();

    function startLoop() {
      if (isLoopRunning) return;
      isLoopRunning = true;
      lastTime = performance.now();
      frameId = requestAnimationFrame(update);
    }

    function stopLoop() {
      isLoopRunning = false;
      cancelAnimationFrame(frameId);
      // Clean frame buffer when completely paused
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    function updateMouse(e: MouseEvent | TouchEvent) {
      let clientX = 0;
      let clientY = 0;

      if ('changedTouches' in e && e.changedTouches.length) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else if (e instanceof MouseEvent) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;
      const ndcX = (clientX / width) * 2 - 1;
      const ndcY = (clientY / height) * -2 + 1;

      mouse.set(ndcX, ndcY, 0);
      lastMoveTime = performance.now();
      targetOpacity = 0.88;

      if (!hasMouseMoved) {
        hasMouseMoved = true;
        // Initialize all ribbon points at current mouse position to prevent streak
        lines.forEach((line) => {
          line.points.forEach((p) => p.copy(mouse));
          line.polyline.updateGeometry();
        });
      }

      startLoop();
    }

    function onMouseLeave() {
      targetOpacity = 0;
    }

    window.addEventListener('mousemove', updateMouse, { passive: true });
    window.addEventListener('touchstart', updateMouse, { passive: true });
    window.addEventListener('touchmove', updateMouse, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    const tmp = new Vec3();

    function update() {
      const currentTime = performance.now();
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const idleDuration = currentTime - lastMoveTime;
      // Start graceful fade out after 120ms without cursor movement
      if (idleDuration > 120) {
        targetOpacity = 0.0;
      }

      // Smooth opacity interpolation
      const opacitySpeed = targetOpacity > masterOpacity ? 16.0 : 5.0;
      masterOpacity += (targetOpacity - masterOpacity) * Math.min(1.0, dt * opacitySpeed);

      // Frame-rate independent physics step (calibrated around 60fps)
      const timeFactor = Math.min(2.0, (dt * 60) * speedMultiplier);

      let maxPointSpread = 0;

      lines.forEach((line) => {
        // Point 0 smoothly tracks mouse with spring physics
        tmp.copy(mouse).sub(line.points[0]).multiply(line.spring * timeFactor);
        line.points[0].add(tmp);

        // Subsequent points trail behind with natural fluid lerp
        const lerpRate = Math.min(0.95, 1.0 - Math.pow(1.0 - line.trailLerp, timeFactor));
        for (let i = 1; i < line.points.length; i++) {
          line.points[i].lerp(line.points[i - 1], lerpRate);
        }

        // Measure spread between head and tail
        const spread = line.points[0].distance(line.points[line.points.length - 1]);
        if (spread > maxPointSpread) {
          maxPointSpread = spread;
        }

        // Update uniforms
        if (line.polyline.mesh.program.uniforms.uOpacity) {
          line.polyline.mesh.program.uniforms.uOpacity.value = masterOpacity;
        }
        if (line.polyline.mesh.program.uniforms.uTime) {
          line.polyline.mesh.program.uniforms.uTime.value = currentTime * 0.001;
        }

        line.polyline.updateGeometry();
      });

      // Render the frame
      renderer.render({ scene });

      // If ribbon has faded to invisible and points converged, pause RAF loop
      if (masterOpacity < 0.005 && maxPointSpread < 0.005) {
        masterOpacity = 0;
        lines.forEach((line) => {
          if (line.polyline.mesh.program.uniforms.uOpacity) {
            line.polyline.mesh.program.uniforms.uOpacity.value = 0;
          }
        });
        stopLoop();
        return;
      }

      frameId = requestAnimationFrame(update);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('touchstart', updateMouse);
      window.removeEventListener('touchmove', updateMouse);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(frameId);
      if (gl.canvas && container && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
    };
  }, [colors, baseThickness, pointCount, speedMultiplier, enableShaderEffect, effectAmplitude, backgroundColor]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (pointer: fine) {
          html, body {
            cursor: url('/cursor-normal.png') 0 0, default !important;
          }
          a, button, [role="button"], input[type="submit"], input[type="button"], input[type="reset"], select, label[for], summary, .cursor-pointer, .cursor-pointer * {
            cursor: url('/cursor-pointer.png') 10 2, pointer !important;
          }
        }
      `}} />
      <div
        ref={containerRef}
        className="fixed inset-0 z-[9998] pointer-events-none w-screen h-screen overflow-hidden"
      />
    </>
  );
}
