'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function Services() {
  const { t, language } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleWhatsAppRedirect = (serviceName: string) => {
    let text = '';
    if (language === 'en') {
      text = `Hello ViraWeb! I am interested in your ${serviceName} solutions and would like to talk to a software engineer.`;
    } else if (language === 'es') {
      text = `¡Hola ViraWeb! Estoy interesado en sus soluções de ${serviceName} y me gustaría hablar con un ingeniero de software.`;
    } else {
      text = `Olá ViraWeb! Estou interessado na solução de ${serviceName} e gostaria de conversar com um engenheiro de software.`;
    }
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5562992466109?text=${encodedText}`, '_blank');
  };

  const services = [
    {
      key: 'creation',
      title: t('services.creation'),
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    },
    {
      key: 'systems',
      title: t('services.traffic'),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    },
    {
      key: 'bot',
      title: t('services.assistant'),
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    },
    {
      key: 'seo',
      title: t('services.gmn'),
      image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=600&q=80',
    },
  ];

  // Coordinates and rotations for cursor-tracking image preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth springs configuration for organic motion physics
  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    // Compute relative mouse coordinates inside grid boundary (-0.5 to 0.5)
    const relativeX = (x / rect.width) - 0.5;
    const relativeY = (y / rect.height) - 0.5;

    // Apply rotation based on mouse coordinate offset for the 3D perspective tilt
    rotateX.set(relativeY * -12);
    rotateY.set(relativeX * 12);
  };

  return (
    <section 
      id="services" 
      className="py-12 bg-white border-b border-[#E2E8F0] relative overflow-hidden"
    >
      <div 
        className="relative w-full border-t border-slate-200"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHoveredIndex(null);
          rotateX.set(0);
          rotateY.set(0);
        }}
      >
        {/* Floating Preview Card */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              style={{
                left: smoothX,
                top: smoothY,
                x: "-50%",
                y: "-50%",
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                transformPerspective: 1000,
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute z-20 w-[300px] h-[190px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200/50 bg-white"
            >
              {services.map((service, idx) => (
                <motion.img
                  key={service.key}
                  src={service.image}
                  alt={service.title}
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{
                    opacity: hoveredIndex === idx ? 1 : 0,
                    scale: hoveredIndex === idx ? 1 : 1.15,
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}
              
              {/* Glow filter overlays */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_85%)] pointer-events-none" />
              <div className="absolute w-full h-[2px] bg-amber-400/60 top-0 left-0 animate-scan" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Solutions Rows */}
        {services.map((service, idx) => {
          const isHovered = hoveredIndex === idx;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <div
              key={service.key}
              onClick={() => handleWhatsAppRedirect(service.title)}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="service-row w-full border-b border-slate-200 py-16 md:py-20 flex justify-center items-center cursor-pointer transition-all duration-500 relative group overflow-hidden bg-white hover:bg-slate-50/50"
            >
              {/* Highlight background transition slide */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />

              <motion.div
                animate={{
                  opacity: isAnyHovered && !isHovered ? 0.25 : 1,
                  scale: isHovered ? 1.03 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-6 z-10 px-4"
              >
                {/* Step Index Number */}
                <span className="font-mono text-xs md:text-sm text-slate-400 group-hover:text-amber-500 transition-colors duration-300">
                  / 0{idx + 1}
                </span>

                {/* Large Serif Title (styled dynamically based on hovered state) */}
                <h3 
                  className={`font-playfair text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-medium text-slate-800 transition-all duration-500 tracking-tight leading-none ${
                    isHovered 
                      ? 'italic text-amber-600 dark:text-amber-500' 
                      : 'normal-case'
                  }`}
                >
                  {service.title}
                </h3>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
