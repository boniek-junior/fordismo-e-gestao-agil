'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

export default function Conclusion() {
  const handleScrollToStart = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative w-full py-40 bg-black z-10 overflow-hidden border-t border-white/5">
      {/* Background soft glowing effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-accent-cyan/5 via-accent-purple/5 to-transparent rounded-full filter blur-[120px] pointer-events-none z-0" />

      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/5 bg-white/[0.01] backdrop-blur-md mb-8"
        >
          <Star className="w-5 h-5 text-accent-cyan fill-current" />
          <span className="font-title font-bold text-xs md:text-sm text-text-gray tracking-[0.2em] uppercase">
            CONCLUSÃO DO ESTUDO DE CASO
          </span>
        </motion.div>

        {/* Closing Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-title text-5xl sm:text-7xl lg:text-[104px] font-black tracking-tight text-white mb-8 leading-none"
        >
          O Futuro Pertence <br />
          <span className="bg-gradient-to-r from-accent-cyan via-white to-accent-magenta bg-clip-text text-transparent">
            aos Adaptáveis.
          </span>
        </motion.h2>

        {/* Narrative Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-8 text-2xl sm:text-3xl md:text-4xl text-text-gray font-light max-w-5xl leading-relaxed mb-16"
        >
          <p>
            No século XX, o <strong>Fordismo</strong> esculpiu a era física industrial. Ele provou que a padronização absoluta e a esteira mecânica rígida podiam gerar produtos em massa de forma barata e rápida para as multidões.
          </p>
          <p>
            No século XXI, a <strong>Gestão Ágil</strong> surge para responder às necessidades de um mundo tecnológico, veloz e hiper-conectado. Onde a incerteza domina, os planos inflexíveis de longo prazo falham, e a resiliência adaptativa em equipe se torna o segredo estratégico.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center w-full"
        >
          <button
            onClick={handleScrollToStart}
            className="group font-title font-black text-base md:text-lg bg-white text-black px-12 py-5 rounded-full hover:shadow-[0_10px_25px_rgba(255,255,255,0.15)] hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            Retornar ao Início
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
