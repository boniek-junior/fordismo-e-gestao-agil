'use client';

import React, { useRef, MouseEvent } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  highlightColor?: string;
}

/**
 * SpotlightCard (TypeScript)
 * Premium card component drawing Stripe-style spotlight glows on mousemove.
 */
export default function SpotlightCard({
  children,
  className = '',
  highlightColor = 'rgba(255, 255, 255, 0.06)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--mouse-x', '-999px');
    cardRef.current.style.setProperty('--mouse-y', '-999px');
  };

  // Adapta o spotlight de acordo com o modo claro/escuro se o padrão for branco
  const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('light');
  const defaultHighlight = isLight ? 'rgba(18, 18, 21, 0.03)' : 'rgba(255, 255, 255, 0.06)';
  const activeHighlight = highlightColor === 'rgba(255, 255, 255, 0.06)' ? defaultHighlight : highlightColor;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card glass-panel group relative transition-all duration-500 hover:-translate-y-1 hover:border-[var(--border-premium-hover-color)] hover:shadow-[0_20px_45px_var(--card-shadow)] ${className}`}
    >
      {/* Dynamic Glow Layer */}
      <div
        className="spotlight-glow"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), ${activeHighlight}, transparent 45%)`,
        }}
      />
      {/* Background Grid Pattern */}
      <div className="grid-lines-bg absolute inset-0 z-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
