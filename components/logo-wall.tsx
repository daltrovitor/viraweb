'use client';

import { useTranslation } from '@/lib/i18n';

export default function LogoWall() {
  const { language } = useTranslation();
  const logos = [
    {
      name: 'Next.js',
      svg: (
        <svg viewBox="0 0 180 180" fill="currentColor" className="w-auto h-6">
          <path d="M90 0c-49.7 0-90 40.3-90 90s40.3 90 90 90 90-40.3 90-90-40.3-90-90-90zm0 162.9c-40.3 0-72.9-32.6-72.9-72.9s32.6-72.9 72.9-72.9 72.9 32.6 72.9 72.9-32.6 72.9-72.9 72.9zm30.9-106.3v66.8h-7.8V79.2l-26.6 39.2h-6.2V56.6h7.8v37.4l25-37.4h7.8z" />
        </svg>
      )
    },
    {
      name: 'React',
      svg: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1" className="w-auto h-6">
          <circle cx="0" cy="0" r="2.05" fill="currentColor" />
          <g stroke="currentColor">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      )
    },
    {
      name: 'Tailwind CSS',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-auto h-6">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1 .25 1.7 1 2.5 1.85C14.001 11.05 15.5 12.8 18.8 12.8c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.25-1.5-1-2.3-1.85-.9-.9-2.4-2.65-6.3-2.65zm-6 8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.25 1.5 1 2.3 1.85.9.9 2.4 2.65 6.3 2.65 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1-.25-1.7-1-2.5-1.85-.9-.9-2.4-2.65-6.3-2.65z" />
        </svg>
      )
    },
    {
      name: 'Node.js',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-auto h-6">
          <path d="M12 2L4 6.6v9.2l8 4.6 8-4.6V6.6L12 2zm6 12.8L12 18.2l-6-3.4V8.4l6-3.4 6 3.4v6.4z" />
        </svg>
      )
    },
    {
      name: 'PostgreSQL',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-auto h-6">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4.5h-2V7h2v5z" />
        </svg>
      )
    },
    {
      name: 'TypeScript',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-auto h-6">
          <path d="M1 1v22h22V1H1zm18.3 17.3c-.3.6-.8 1.1-1.4 1.4-.7.4-1.5.5-2.6.5-1.2 0-2.1-.3-2.8-1-.7-.6-1-1.5-1.1-2.7h2.2c.1.6.3 1 .6 1.3.3.3.8.4 1.4.4.5 0 1-.1 1.2-.3.3-.2.4-.5.4-.8 0-.3-.1-.5-.4-.7-.2-.2-.7-.4-1.3-.6l-.9-.3c-1.1-.3-1.8-.8-2.3-1.3-.5-.6-.7-1.3-.7-2.2 0-.9.3-1.7 1-2.3.7-.6 1.6-.9 2.7-.9 1.1 0 1.9.3 2.5.8.6.5.9 1.2 1 2.2h-2.1c-.1-.5-.2-.8-.4-1-.2-.2-.6-.3-1-.3-.4 0-.7.1-.9.3-.2.2-.3.4-.3.6 0 .2.1.4.3.5.2.1.6.3 1.1.5l1 .3c1.2.4 2 .9 2.5 1.5.5.6.8 1.3.8 2.2 0 1.1-.3 1.9-.9 2.5zM12.3 8.8H9.9v10H7.7v-10H5.3V7h7v1.8z" />
        </svg>
      )
    }
  ];

  // Repeat the list to ensure seamless transition
  const doubledLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div id="logo-wall" className="w-full bg-[#F8FAFC] py-6 border-y border-[#E2E8F0] overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between gap-8 flex-col sm:flex-row">
        {/* Caption */}
        <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B] text-center sm:text-left whitespace-nowrap">
          {language === 'en' ? 'HIGH PERFORMANCE TECHNOLOGIES:' : language === 'es' ? 'TECNOLOGÍAS DE ALTO RENDIMIENTO:' : 'TECNOLOGIAS DE ALTA PERFORMANCE:'}
        </div>

        {/* Marquee Track */}
        <div
          className="relative w-full overflow-hidden flex items-center"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          
          <div className="flex gap-16 animate-marquee whitespace-nowrap min-w-full">
            {doubledLogos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-[#64748B] hover:text-[#0F172A] transition-colors"
                title={logo.name}
              >
                {logo.svg}
                <span className="font-mono text-sm font-bold tracking-tight">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
