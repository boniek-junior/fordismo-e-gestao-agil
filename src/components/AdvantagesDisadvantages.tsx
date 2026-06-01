'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { PlusCircle, MinusCircle } from 'lucide-react';

type Paradigm = 'ford' | 'agile';

export default function AdvantagesDisadvantages() {
  const [activeTab, setActiveTab] = useState<Paradigm>('ford');

  const fordPoints = {
    advantages: [
      {
        title: 'Carros Muito Baratos',
        desc: 'A velocidade e quantidade da esteira física fizeram o preço de fabricação despencar.'
      },
      {
        title: 'Previsibilidade Total',
        desc: 'A gerência sabe exatamente quantos veículos saem no final do dia com precisão matemática.'
      },
      {
        title: 'Treinamento Fácil',
        desc: 'Como o operário faz apenas um movimento repetitivo, qualquer pessoa aprende o trabalho em minutos.'
      }
    ],
    disadvantages: [
      {
        title: 'Impossível Mudar Rápido',
        desc: 'Para alterar um único parafuso do carro, a fábrica precisava paralisar toda a produção.'
      },
      {
        title: 'Trabalho Muito Cansativo',
        desc: 'Operários passavam o dia todo repetindo movimentos sem pensar, gerando exaustão física e mental.'
      },
      {
        title: 'Estoques Gigantescos',
        desc: 'Se o mercado parasse de comprar, pátios gigantescos ficavam cheios de carros parados.'
      }
    ]
  };

  const agilePoints = {
    advantages: [
      {
        title: 'Fácil Adaptar a Mudanças',
        desc: 'O time consegue alterar o produto rapidamente em dias baseado nas opiniões dos usuários.'
      },
      {
        title: 'Pessoas Motivadas com Voz',
        desc: 'As decisões são compartilhadas e todos os membros do time participam propondo melhorias.'
      },
      {
        title: 'Zero Desperdício de Recursos',
        desc: 'Produz-se apenas o que gera valor validado imediato, sem estoques ou burocracia desnecessária.'
      }
    ],
    disadvantages: [
      {
        title: 'Sem Prazos Fixos de Longo Prazo',
        desc: 'Como o escopo muda frequentemente, é mais difícil cravar datas exatas com muita antecedência.'
      },
      {
        title: 'Muitas Reuniões de Alinhamento',
        desc: 'Exige sincronia e conversas diárias constantes do time para coordenar os rumos do produto.'
      },
      {
        title: 'Risco de Perder o Rumo Inicial',
        desc: 'Focar excessivamente nas mudanças e pedidos do cliente pode afastar o time do objetivo principal.'
      }
    ]
  };

  const activePoints = activeTab === 'ford' ? fordPoints : agilePoints;
  const highlightColor = activeTab === 'ford' ? 'rgba(0, 242, 254, 0.05)' : 'rgba(240, 47, 194, 0.05)';

  return (
    <section className="relative w-full py-32 bg-black z-10 border-t border-white/5">
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title font-bold text-sm text-accent-purple tracking-[0.25em] uppercase mb-4"
          >
            AUDITORIA DE FORÇAS E RISCOS
          </motion.div>
          <h2 className="font-title text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            Forças e Riscos de Cada Modelo
          </h2>
          <p className="text-xl sm:text-2xl text-text-gray font-light max-w-3xl mx-auto leading-relaxed">
            Selecione o sistema abaixo para analisar as suas principais vantagens práticas e as desvantagens que travam o fluxo de trabalho.
          </p>
        </div>

        {/* Tab Buttons Pill */}
        <div className="flex justify-center mb-16">
          <div className="flex bg-white/[0.02] border border-white/5 p-1.5 rounded-full relative">
            
            {/* Slide background glow */}
            <motion.div
              layout
              className={`absolute top-1.5 bottom-1.5 rounded-full z-0 ${
                activeTab === 'ford' 
                  ? 'bg-gradient-to-r from-accent-cyan/15 to-accent-cyan/25 w-[230px] left-1.5' 
                  : 'bg-gradient-to-r from-accent-magenta/15 to-accent-magenta/25 w-[230px] left-[236px]'
              }`}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            />

            <button
              onClick={() => setActiveTab('ford')}
              className={`font-title font-black text-sm md:text-base w-[230px] py-4 rounded-full transition-all relative z-10 cursor-pointer text-center ${
                activeTab === 'ford' ? 'text-accent-cyan' : 'text-text-gray hover:text-white'
              }`}
            >
              A Fábrica Rígida (Ford)
            </button>

            <button
              onClick={() => setActiveTab('agile')}
              className={`font-title font-black text-sm md:text-base w-[230px] py-4 rounded-full transition-all relative z-10 cursor-pointer text-center ${
                activeTab === 'agile' ? 'text-accent-magenta' : 'text-text-gray hover:text-white'
              }`}
            >
              Times Flexíveis (Ágil)
            </button>
          </div>
        </div>

        {/* Display (Framer Motion) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {/* Lado Esquerdo - Vantagens */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <PlusCircle className={`w-7 h-7 ${activeTab === 'ford' ? 'text-accent-cyan' : 'text-accent-magenta'}`} />
                <h3 className="font-title text-2xl md:text-3xl font-black text-white tracking-wide">
                  Vantagens Reais
                </h3>
              </div>

              <div className="space-y-6">
                {activePoints.advantages.map((point) => (
                  <SpotlightCard
                    key={point.title}
                    highlightColor={highlightColor}
                    className="p-8 flex flex-col justify-center border border-white/5"
                  >
                    <h4 className="font-title text-lg md:text-xl font-bold text-white mb-3 tracking-wide">
                      {point.title}
                    </h4>
                    <p className="text-base md:text-lg text-text-gray font-light leading-relaxed">
                      {point.desc}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            </div>

            {/* Lado Direito - Desvantagens */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <MinusCircle className="w-7 h-7 text-accent-magenta opacity-80" />
                <h3 className="font-title text-2xl md:text-3xl font-black text-white tracking-wide">
                  Desvantagens Reais
                </h3>
              </div>

              <div className="space-y-6">
                {activePoints.disadvantages.map((point) => (
                  <SpotlightCard
                    key={point.title}
                    highlightColor={highlightColor}
                    className="p-8 flex flex-col justify-center border border-white/5"
                  >
                    <h4 className="font-title text-lg md:text-xl font-bold text-white mb-3 tracking-wide">
                      {point.title}
                    </h4>
                    <p className="text-base md:text-lg text-text-gray font-light leading-relaxed">
                      {point.desc}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
