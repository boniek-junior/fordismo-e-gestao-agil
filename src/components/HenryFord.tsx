'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { ShieldCheck, Truck, BarChart2, Star } from 'lucide-react';

export default function HenryFord() {
  const contributions = [
    {
      title: 'A Esteira de Montagem',
      desc: 'O carro anda na esteira física contínua. Os operários ficam parados, montando partes de forma fixa e reduzindo tempos drasticamente.',
      icon: Truck,
    },
    {
      title: 'O Salário de 5 Dólares',
      desc: 'Ford dobrou o salário de seus funcionários. Ele queria que seus próprios trabalhadores pudessem comprar os carros que fabricavam.',
      icon: ShieldCheck,
    },
    {
      title: 'Dono da própria Cadeia',
      desc: 'Ford comprou florestas para as caixas de madeira, minas de carvão para fundição e navios para não depender de fornecedores lentos.',
      icon: BarChart2,
    },
    {
      title: 'O Famoso Modelo T',
      desc: 'Um veículo leve, resistente, fácil de consertar e extremamente barato. Feito para caber de verdade no orçamento de famílias comuns.',
      icon: Star,
    },
  ];

  return (
    <section className="relative w-full py-24 bg-black z-10 border-t border-white/5">
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6">
        
        {/* Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Lado Esquerdo - Narrativa Visual */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-title font-bold text-sm text-accent-cyan tracking-[0.25em] uppercase"
            >
              QUEM FOI HENRY FORD
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-title text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Henry Ford & <br />
              <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                A Grande Invenção.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl text-text-silver font-light leading-relaxed"
            >
              Henry Ford não inventou o carro. O seu feito real foi <strong>inventar a fábrica moderna</strong>: uma esteira de montagem mecânica física que permitia produzir milhões de veículos idênticos com velocidade inédita.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-[24px] bg-white/[0.01] border border-white/5 relative"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-accent-cyan rounded-l-[24px]" />
              <p className="text-xl sm:text-2xl md:text-3xl text-white font-medium leading-relaxed italic">
                &ldquo;Se eu perguntasse às pessoas o que elas queriam, teriam dito: cavalos mais rápidos.&rdquo;
              </p>
              <span className="text-sm font-bold text-text-muted mt-3 block tracking-wider uppercase">
                — Henry Ford
              </span>
            </motion.div>
          </div>

          {/* Lado Direito - Ilustração Estilizada do Impacto */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative rounded-[32px] overflow-hidden border border-white/5 bg-gradient-to-br from-card-gradient-ford-from to-card-gradient-ford-to p-10 flex flex-col justify-between min-h-[420px]"
            >
              <div className="grid-lines-bg opacity-30" />
              <div className="relative z-10">
                <span className="text-xs font-bold font-title text-text-muted tracking-[0.2em] uppercase block mb-3">
                  ESPECIFICAÇÕES HISTÓRICAS
                </span>
                <h3 className="font-title text-2xl md:text-3xl font-bold text-white mb-6">
                  Produção em Massa
                </h3>
                <p className="text-base md:text-lg text-text-gray font-light leading-relaxed mb-6">
                  Ao fazer o carro andar na esteira até o operário, Ford barateou brutalmente os custos de montagem e transformou o automóvel em um bem de consumo para famílias comuns.
                </p>
              </div>

              {/* Estatística rápida em layout de widget de luxo */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-center p-8 rounded-3xl bg-bg-surface/50 border border-white/5 mt-auto">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-black font-title text-accent-cyan tracking-tight">
                  15 Milhões
                </div>
                <div className="text-base md:text-xl text-text-gray font-light leading-normal text-center sm:text-left">
                  de veículos Modelo T vendidos em <strong>19 anos</strong>, batendo todos os recordes do mundo.
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Módulos de Contribuição */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contributions.map((item, index) => {
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
                  highlightColor="rgba(0, 242, 254, 0.04)"
                  className="h-full p-8 md:p-10"
                >
                  <div className="flex gap-5 items-start">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-accent-cyan shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-title text-xl md:text-2xl font-bold text-white mb-3">
                        {item.title}
                      </h4>
                      <p className="text-lg md:text-2xl text-text-gray font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
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
