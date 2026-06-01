'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

/**
 * Navbar (TypeScript)
 * Barra de navegação elástica flutuante em formato de pílula.
 * Traduzida e otimizada para apresentação em auditórios.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);

    // Inicialização táctil do tema
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
    } else {
      document.documentElement.classList.remove('light');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[94%] xl:max-w-7xl 2xl:max-w-[1750px] z-50 transition-all duration-500">
      <div
        className={`w-full glass-nav rounded-full px-6 md:px-8 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'bg-black/80 border-white/8 shadow-2xl py-3.5' : 'bg-white/[0.01] border-white/4'
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="font-title font-black text-sm md:text-lg tracking-[0.18em] text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="text-accent-cyan">◈</span> A EVOLUÇÃO
        </a>

        {/* Links simples em português */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Linha do Tempo', href: '#timeline' },
            { label: 'Fordismo', href: '#fordism' },
            { label: 'Simulador', href: '#simulator' },
            { label: 'Gestão Ágil', href: '#agile' },
            { label: 'Comparação', href: '#matrix' },
            { label: 'Desafio', href: '#quiz' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[14px] text-text-gray font-bold hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA e Alternância de Tema */}
        <div className="flex items-center gap-3">
          {/* Botão de Alternância de Tema */}
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="w-10 h-10 rounded-full border border-white/5 bg-white/5 text-white hover:bg-white/10 hover:scale-[1.05] active:scale-[0.95] flex items-center justify-center cursor-pointer select-none"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-accent-cyan" />
            ) : (
              <Moon className="w-5 h-5 text-accent-magenta" />
            )}
          </button>

          {/* CTA em português simples */}
          <a
            href="#quiz"
            onClick={(e) => scrollToSection(e, '#quiz')}
            className="font-title text-[11px] md:text-xs font-black bg-white text-black px-5 py-2.5 rounded-full hover:scale-[1.03] active:scale-[0.98] hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)]"
          >
            Iniciar Desafio
          </a>
        </div>
      </div>
    </nav>
  );
}
