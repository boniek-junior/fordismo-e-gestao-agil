'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { TrendingUp, Clock, DollarSign, Users } from 'lucide-react';

export default function FordismImpacts() {
  const stats = [
    {
      title: 'Tempo de Montagem',
      value: '93 min',
      oldValue: 'Antes: 12 horas',
      desc: 'Queda drástica no ciclo de montagem que permitiu baratear o custo de cada produto.',
      icon: Clock,
      color: 'text-accent-cyan'
    },
    {
      title: 'Preço do Carro',
      value: '$290',
      oldValue: 'Antes: $850',
      desc: 'O valor cobrado nas lojas despencou, popularizando a mobilidade para a classe média.',
      icon: DollarSign,
      color: 'text-emerald-400'
    },
    {
      title: 'Carros por Dia',
      value: '9.000+',
      oldValue: 'Antes: 100 carros',
      desc: 'Capacidade fabril diária inédita conquistada com a esteira física automatizada.',
      icon: TrendingUp,
      color: 'text-accent-purple'
    },
    {
      title: 'Salário por Dia',
      value: '$5,00',
      oldValue: 'Antes: $2,30',
      desc: 'Dobra do salário mínimo dos trabalhadores fabris da época para criar mercado consumidor.',
      icon: Users,
      color: 'text-accent-magenta'
    }
  ];

  return (
    <section className="relative w-full py-32 bg-black z-10 border-t border-white/5">
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title font-bold text-sm text-accent-cyan tracking-[0.25em] uppercase mb-4"
          >
            OS NÚMEROS DO IMPACTO INDUSTRIAL
          </motion.div>
          <h2 className="font-title text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            O Impacto Real de Ford
          </h2>
          <p className="text-xl sm:text-2xl text-text-gray font-light max-w-2xl leading-relaxed">
            Métricas cruciais que traduzem a explosão de rapidez gerada pela introdução da esteira física móvel.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: index * 0.08 }}
              >
                <SpotlightCard
                  highlightColor="rgba(0, 242, 254, 0.04)"
                  className="h-full flex flex-col justify-between p-8 sm:p-10"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-title text-xs font-bold text-text-muted tracking-wider uppercase">
                      {item.title}
                    </span>
                    <Icon className={`w-8 h-8 ${item.color} opacity-80`} />
                  </div>

                  <div className="my-8">
                    <div className="text-5xl sm:text-6xl font-black font-title text-white tracking-tight mb-3">
                      {item.value}
                    </div>
                    <div className="text-sm md:text-base text-text-muted font-bold">
                      {item.oldValue}
                    </div>
                  </div>

                  <p className="text-base md:text-lg text-text-gray font-light leading-relaxed">
                    {item.desc}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
