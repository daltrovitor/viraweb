'use client';

import { useEffect, useState } from 'react';

/**
 * Loader component displaying the inline barcode scan text effect.
 * Utilizes a dual-layer text structure: an invisible base layer to preserve container width,
 * and a glowing amber/white layer on top clipped dynamically by the scan keyframes.
 * Because the base layer is invisible, the text disappears completely when clipped by the scan.
 */
const Loader = () => {
  return (
    <div className="relative max-w-fit h-[54px] text-[50px] italic font-semibold font-[Mine] select-none leading-[54px]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-laser {
          0%, 100% { top: 0px; }
          25%, 75% { top: 54px; }
          50% { top: 0px; }
        }
        @keyframes cut-text {
          0%, 50%, 100% { clip-path: inset(0% 0 0 0); }
          25%, 75% { clip-path: inset(100% 0 0 0); }
        }
        .animate-scan-laser {
          animation: scan-laser 3s ease-in-out infinite !important;
        }
        .animate-cut-text {
          animation: cut-text 3s ease-in-out infinite !important;
        }
      `}} />

      {/* Invisible Base Layer to preserve text layout width and height */}
      <span className="opacity-0 select-none">
        ViraWeb
      </span>

      {/* Illuminated Layer: Superimposed on top, clipped by the keyframe inset */}
      <span className="absolute left-0 top-0 animate-cut-text drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
        <span className="text-white">Vira</span>
        <span className="text-[#F59E0B]">Web</span>
      </span>

      {/* Laser scan lines */}
      <div className="absolute w-full h-[6px] rounded bg-[#F59E0B91] top-0 left-0 z-10 blur-[8px] animate-scan-laser"></div>
      <div className="absolute w-full h-[4px] rounded bg-[#F59E0B] top-0 left-0 z-20 opacity-95 animate-scan-laser"></div>
    </div>
  );
};

export default Loader;

interface AnimatedScanLoaderProps {
  onStartExit?: () => void;
  onComplete?: () => void;
}

/**
 * AnimatedScanLoader wraps the scanning text in a premium full-screen preloader overlay
 * decorated with colored background nebulas and technical telemetry readouts in the viewport corners.
 */
export const AnimatedScanLoader = ({ onStartExit, onComplete }: AnimatedScanLoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Render the preloader for 3.5 seconds, then notify parent to cross-fade and start exit transition
    const timer = setTimeout(() => {
      setIsExiting(true);
      onStartExit?.();
      const exitTimer = setTimeout(() => {
        onComplete?.();
        // Dispatch event that loader transition is complete
        window.dispatchEvent(new CustomEvent('loader-complete'));
      }, 700); // 700ms exit transition
      return () => clearTimeout(exitTimer);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onStartExit, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020617] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Glowing Nebulas in the background (Cores no fundo) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none animate-[pulse_8s_infinite_alternate]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none animate-[pulse_10s_infinite_alternate-reverse]" />
      <div className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none animate-[pulse_6s_infinite_alternate]" />

      {/* Cyber Telemetry Corner Decorations (Adereços e decorações) */}
      <div className="absolute top-6 left-6 font-mono text-[9px] text-slate-500/60 tracking-widest uppercase select-none pointer-events-none flex flex-col gap-1 text-left">
        <div>SYS_STATUS: //BOOT_SEQUENCE</div>
        <div className="text-amber-500/60">CORE_TEMP: 34.2°C</div>
      </div>
      <div className="absolute top-6 right-6 font-mono text-[9px] text-slate-500/60 tracking-widest uppercase select-none pointer-events-none flex flex-col gap-1 text-right">
        <div>LOC_COORD: 62° 99' W</div>
        <div>PORT: 5562</div>
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-slate-500/60 tracking-widest uppercase select-none pointer-events-none flex flex-col gap-1 text-left">
        <div>MODULE_14: //BUDGET_SIM</div>
        <div className="text-blue-500/50">VIRAWEB_OS v1.0.4</div>
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-slate-500/60 tracking-widest uppercase select-none pointer-events-none flex flex-col gap-1 text-right">
        <div>SECURE_SHIELD: ACTIVE</div>
        <div className="text-emerald-500/50">LATENCY: 14ms</div>
      </div>

      {/* Decorative techno matrix grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-35" />

      {/* Main scan element container */}
      <div className="relative z-10 flex flex-col items-center gap-6 select-none">
        <Loader />
        
        {/* Subtle security/scanning status text */}
        <div className="text-[11px] font-mono tracking-[0.35em] uppercase text-gray-500/80 animate-pulse mt-4">
          Initializing System...
        </div>
      </div>
    </div>
  );
};