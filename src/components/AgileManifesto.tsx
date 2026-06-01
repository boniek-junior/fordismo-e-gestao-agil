'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { Users, FileCode, Handshake, Compass } from 'lucide-react';

export default function AgileManifesto() {
  const values = [
    {
      badge: 'VALOR 01',
      strong: 'Pessoas e Conversas',
      over: 'Processos Rígidos',
      desc: 'Mais valor à comunicação livre entre membros de um time do que a regras de rotina engessadas.',
      icon: Users
    },
    {
      badge: 'VALOR 02',
      strong: 'Produto Funcionando',
      over: 'Manuais Extensos',
      desc: 'Mais valor a entregar funcionalidades reais prontas para uso do que a relatórios extensivos teóricos.',
      icon: FileCode
    },
    {
      badge: 'VALOR 03',
      strong: 'Parceria com o Cliente',
      over: 'Contratos Engessados',
      desc: 'Mais valor a trabalhar de forma colaborativa direta do que a travar discussões jurídicas burocráticas.',
      icon: Handshake
    },
    {
      badge: 'VALOR 04',
      strong: 'Responder a Mudanças',
      over: 'Planos Fixos',
      desc: 'Mais valor a desviar a rota para melhorar a entrega do que a seguir de forma cega um plano inicial obsoleto.',
      icon: Compass
    }
  ];

  return (
    <section className="relative w-full py-32 bg-black z-10">
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title font-bold text-base text-accent-magenta tracking-[0.25em] uppercase mb-4"
          >
            VALORES DA ERA DIGITAL
          </motion.div>
          <h2 className="font-title text-5xl sm:text-7xl lg:text-[104px] font-black tracking-tight text-white mb-6 leading-none">
            O Manifesto Ágil
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl text-text-gray font-light max-w-4xl mx-auto leading-relaxed">
            Os quatro valores simples que guiaram a maior mudança de cultura das empresas modernas no século 21.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {values.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.strong}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: index * 0.1 }}
              >
                <SpotlightCard
                  highlightColor="rgba(240, 47, 194, 0.05)"
                  className="h-full justify-between p-8 sm:p-10"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-title text-xs font-bold text-text-muted tracking-[0.25em] uppercase">
                      {item.badge}
                    </span>
                    <Icon className="w-8 h-8 text-accent-magenta opacity-70" />
                  </div>
                  
                  <div>
                    <h3 className="font-title text-2xl sm:text-3xl font-black text-white mb-4 leading-snug">
                      <span className="text-accent-magenta">{item.strong}</span> <br />
                      <span className="text-text-muted font-normal text-base md:text-lg">mais do que {item.over}</span>
                    </h3>
                    <p className="text-lg md:text-2xl text-text-gray font-light leading-relaxed pt-5 border-t border-white/5 mt-5">
                      {item.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
