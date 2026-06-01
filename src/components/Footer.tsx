'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative w-full border-t border-white/5 py-12 md:py-16 bg-black z-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand Meta */}
        <div className="text-center md:text-left">
          <h4 className="font-title font-extrabold text-sm tracking-widest mb-1.5 text-white">THE PIVOT</h4>
          <p className="text-[12px] text-text-gray font-light max-w-sm leading-relaxed">
            Exploração e modelagem conceitual dos sistemas operacionais administrativos do século XX e XXI.
          </p>
        </div>

        {/* Legal disclosures */}
        <div className="text-[12px] text-text-muted text-center md:text-right font-light">
          <p>© 2026 The Pivot Inc. Desenvolvido para apresentação acadêmica e executiva premium.</p>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="group flex items-center justify-center gap-2 font-title font-bold text-xs bg-white/5 text-white border border-white/5 px-4 py-2.5 rounded-full hover:bg-white hover:text-black hover:scale-[1.03] transition-all hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] active:scale-[0.98] cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          Retornar ao Topo
        </button>

      </div>
    </footer>
  );
}
