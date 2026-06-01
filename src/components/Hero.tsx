'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const scrollToFirstSection = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector('#timeline');
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
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center px-6 z-10"
    >
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] text-center flex flex-col items-center">
        
        {/* Tag Superior Didática */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative inline-flex items-center gap-2.5 px-8 py-3 rounded-full border border-white/5 bg-white/[0.01] backdrop-blur-md mb-8"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan shadow-[0_0_12px_#00f2fe]" />
          <span className="font-title font-black text-sm md:text-base text-text-gray tracking-[0.25em] uppercase">
            ESTUDO DE CASO INTERATIVO
          </span>
        </motion.div>

        {/* Título Monumental Amplificado para Projetor */}
        <h1 className="font-title text-6xl sm:text-8xl md:text-9xl lg:text-[104px] font-extrabold leading-[1.02] tracking-tight text-white mb-8 overflow-hidden select-none">
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
            className="block"
          >
            Da Fábrica Rígida
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const, delay: 0.25 }}
            className="block bg-gradient-to-r from-white via-white to-text-gray bg-clip-text text-transparent"
          >
            à Gestão Ágil.
          </motion.span>
        </h1>

        {/* Subtítulo Profissional */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
          className="text-xl sm:text-2xl md:text-3xl text-text-gray font-light max-w-4xl leading-relaxed mb-12"
        >
          Uma jornada visual pela evolução da engenharia de produtos. Do hardware padronizado das linhas de montagem à iteração contínua e arquitetura ágil de software moderno.
        </motion.p>

        {/* Botões Grandes e Destacados */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-xl mb-16"
        >
          <a
            href="#timeline"
            onClick={scrollToFirstSection}
            className="w-full sm:w-auto font-title font-black text-base md:text-lg bg-gradient-to-r from-accent-cyan to-accent-purple text-black px-12 py-5 rounded-full hover:shadow-[0_12px_35px_rgba(0,242,254,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-center"
          >
            Explorar a Evolução
          </a>
          <a
            href="#quiz"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#quiz');
              if (element instanceof HTMLElement) {
                window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto font-title font-black text-base md:text-lg bg-white/5 border border-white/5 hover:border-white/10 text-white px-12 py-5 rounded-full hover:bg-white/10 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-center"
          >
            Validar Conhecimentos
          </a>
        </motion.div>

        {/* Indicador de Navegação */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="flex flex-col items-center gap-3 cursor-pointer select-none"
          onClick={scrollToFirstSection}
        >
          <div className="w-[24px] h-[40px] border-2 border-white/20 rounded-full relative flex justify-center">
            <motion.div
              animate={{
                y: [6, 22, 6],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1.5 h-2.5 bg-white rounded-full absolute top-[6px]"
            />
          </div>
          <span className="font-title text-[10px] text-text-muted tracking-[0.2em] uppercase font-bold">
            Role para Descobrir
          </span>
        </motion.div>

      </div>
    </section>
  );
}
