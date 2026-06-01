'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { Shield, Sparkles, Network } from 'lucide-react';

type DimensionFilter = 'org' | 'ops' | 'strategy';

interface Row {
  dimension: string;
  category: DimensionFilter;
  ford: string;
  agile: string;
}

export default function AgileVsFordism() {
  const [filter, setFilter] = useState<DimensionFilter>('org');

  const rows: Row[] = [
    {
      dimension: 'Objetivo Principal',
      category: 'strategy',
      ford: 'Produzir muito e rápido.',
      agile: 'Adaptar e melhorar constantemente.'
    },
    {
      dimension: 'Formato do Produto',
      category: 'strategy',
      ford: 'Muitos produtos exatamente iguais.',
      agile: 'Produtos personalizados que mudam conforme o uso.'
    },
    {
      dimension: 'Como são as Regras',
      category: 'ops',
      ford: 'Processos muito rígidos.',
      agile: 'Processos flexíveis que mudam rápido.'
    },
    {
      dimension: 'Comunicação',
      category: 'ops',
      ford: 'Lenta, formal e cheia de burocracia.',
      agile: 'Conversas diárias imediatas e diretas.'
    },
    {
      dimension: 'Divisão de Trabalho',
      category: 'org',
      ford: 'Cada pessoa faz apenas uma tarefa específica.',
      agile: 'Toda a equipe trabalha unida em conjunto.'
    },
    {
      dimension: 'Quem dá as Ordens',
      category: 'org',
      ford: 'O chefe manda, o operário apenas obedece.',
      agile: 'O time tem voz ativa e decide junto.'
    }
  ];

  const activeRows = rows.filter(r => r.category === filter);

  return (
    <section id="matrix" className="relative w-full py-32 bg-black z-10 border-t border-white/5">
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title font-bold text-sm text-accent-cyan tracking-[0.25em] uppercase mb-4"
          >
            A COMPARAÇÃO COMPLETA
          </motion.div>
          <h2 className="font-title text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            Monolito Rígido vs. Rede Ágil
          </h2>
          <p className="text-xl sm:text-2xl text-text-gray font-light max-w-3xl mx-auto leading-relaxed">
            Compare diretamente as especificações que separam a era industrial antiga das empresas digitais modernas de hoje.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex justify-center mb-16">
          <div className="flex bg-white/[0.01] border border-white/5 p-1.5 rounded-full relative">
            
            <motion.div
              layout
              className={`absolute top-1.5 bottom-1.5 rounded-full z-0 bg-white/5 ${
                filter === 'org' 
                  ? 'w-[180px] left-1.5' 
                  : filter === 'ops'
                  ? 'w-[180px] left-[186px]'
                  : 'w-[180px] left-[370px]'
              }`}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            />

            {[
              { id: 'org', label: 'Empresa', icon: Shield },
              { id: 'ops', label: 'Operação', icon: Network },
              { id: 'strategy', label: 'Evolução', icon: Sparkles }
            ].map((tab) => {
              const TabIcon = tab.icon;

              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as DimensionFilter)}
                  className={`font-title font-black text-sm md:text-base w-[180px] py-3.5 rounded-full transition-all relative z-10 cursor-pointer flex items-center justify-center gap-2 ${
                    filter === tab.id ? 'text-white font-black' : 'text-text-gray hover:text-white'
                  }`}
                >
                  <TabIcon className="w-5 h-5 opacity-60" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Matrix Display Table Wrapper (Colossal typography for projector) */}
        <div className="w-full overflow-x-auto rounded-[32px] border border-white/5 bg-white/[0.01] backdrop-blur-xl">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.005]">
                <th className="font-title text-base md:text-xl font-black text-text-muted uppercase tracking-wider p-8 w-[25%]">
                  Fator de Comparação
                </th>
                <th className="font-title text-base md:text-xl font-black text-accent-cyan uppercase tracking-wider p-8 w-[37.5%]">
                  Manufatura Rígida (Fordismo)
                </th>
                <th className="font-title text-base md:text-xl font-black text-accent-magenta uppercase tracking-wider p-8 w-[37.5%]">
                  Times Flexíveis (Gestão Ágil)
                </th>
              </tr>
            </thead>
            
            <AnimatePresence mode="popLayout">
              <tbody>
                {activeRows.map((row) => (
                  <motion.tr
                    layout
                    key={row.dimension}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="p-8 font-title font-black text-lg md:text-2xl text-white tracking-wide">
                      {row.dimension}
                    </td>
                    <td className="p-8 text-lg md:text-2xl text-text-silver font-light leading-relaxed">
                      {row.ford}
                    </td>
                    <td className="p-8 text-lg md:text-2xl text-text-silver font-light leading-relaxed">
                      {row.agile}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        </div>

      </div>
    </section>
  );
}
