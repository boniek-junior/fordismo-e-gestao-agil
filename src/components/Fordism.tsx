'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { Layers, Settings, Maximize, UserCheck } from 'lucide-react';

export default function Fordism() {
  const pillars = [
    {
      badge: '01 / VOLUME GIGANTE',
      title: 'Produção em Massa',
      desc: 'Produzir carros em quantidades colossais para reduzir o custo de fabricação. Quanto maior a quantidade, mais barato fica cada carro.',
      icon: Layers
    },
    {
      badge: '02 / PADRÃO ÚNICO',
      title: 'Padronização Total',
      desc: 'Fazer todas as peças e processos exatamente iguais. Para evitar erros e atrasos na linha, não havia opções de cores: todos os carros eram pretos.',
      icon: Settings
    },
    {
      badge: '03 / ESTEIRA FÍSICA',
      title: 'Trabalho na Esteira',
      desc: 'O carro se move de forma contínua em uma esteira e vai até o operário. O trabalhador fica parado, economizando tempo e energia física.',
      icon: Maximize
    },
    {
      badge: '04 / TAREFAS SIMPLES',
      title: 'Especialização Extrema',
      desc: 'O trabalho é dividido em pequenos pedaços simples. O operário repete o mesmo movimento o dia todo, sem precisar de treinamento técnico.',
      icon: UserCheck
    }
  ];

  return (
    <section className="relative w-full py-32 bg-black z-10 border-t border-white/5">
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6">
        
        {/* Title */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title font-bold text-base text-accent-cyan tracking-[0.25em] uppercase mb-4"
          >
            OS QUATRO PILARES DO FORDISMO
          </motion.div>
          <h2 className="font-title text-5xl sm:text-7xl lg:text-[104px] font-black tracking-tight text-white mb-6 leading-none">
            Como Funcionava o Fordismo?
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl text-text-gray font-light max-w-4xl leading-relaxed">
            As quatro diretrizes simples que transformaram fábricas mecânicas em gigantes mundiais de escala ininterrupta.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {pillars.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: index * 0.1 }}
              >
                <SpotlightCard
                  highlightColor="rgba(0, 242, 254, 0.05)"
                  className="h-full justify-between p-8 sm:p-10"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-title text-xs font-bold text-text-muted tracking-[0.25em] uppercase">
                      {item.badge}
                    </span>
                    <Icon className="w-8 h-8 text-accent-cyan opacity-70" />
                  </div>
                  <div>
                    <h3 className="font-title text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="text-lg md:text-2xl text-text-gray font-light leading-relaxed">
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
