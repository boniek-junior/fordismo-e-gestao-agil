'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  Clock, 
  Cpu, 
  Settings, 
  RotateCw, 
  Zap, 
  ChevronDown 
} from 'lucide-react';

interface Milestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  desc: string;
  context: string;
  impact: string;
  color: string;
  icon: React.ComponentType<any>;
}

export default function Timeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const milestones: Milestone[] = [
    {
      id: 'fordism',
      year: 'Início do Século 20',
      title: 'Fordismo',
      subtitle: 'A Era das Fábricas Rígidas',
      desc: 'Henry Ford introduz a esteira de montagem móvel, estabelecendo os pilares da escalabilidade física e padronização absoluta.',
      context: 'No início de 1900, a manufatura era artesanal, lenta e de alto custo. Ford revolucionou o modelo de negócios ao inverter o fluxo logístico: em vez de o operário se mover, o chassi fluía através de estações fixas. Isso estabeleceu um ritmo de produção determinístico e linear.',
      impact: 'Redução brutal no custo marginal unitário e ganho exponencial de produtividade. Esse paradigma não apenas massificou o consumo do Modelo T, mas definiu a fundação da eficiência corporativa por todo o século XX.',
      color: '#00f2fe',
      icon: Factory
    },
    {
      id: 'market_changes',
      year: 'Final do Século 20',
      title: 'Mudanças no Mercado',
      subtitle: 'A Era dos Computadores e Internet',
      desc: 'A transição para a economia da informação expôs as fraturas dos modelos lineares, incapazes de lidar com requisitos voláteis.',
      context: 'Com o advento do software e produtos intangíveis, a arquitetura rígida do Fordismo colapsou. A tentativa de aplicar planejamento preditivo (Modelo Waterfall) na criação de sistemas complexos resultava em ciclos longos, orçamentos estourados e entregas obsoletas no lançamento.',
      impact: 'O mercado global passou a exigir flexibilidade estrutural. As corporações perceberam que a vantagem competitiva não estava mais em "fazer o mesmo processo mais rápido", mas sim em "descobrir o produto certo mais rápido".',
      color: '#7928ca',
      icon: Clock
    },
    {
      id: 'agile',
      year: 'Século 21',
      title: 'Gestão Ágil',
      subtitle: 'A Era da Adaptação Rápida',
      desc: 'Surgem frameworks focados em iteração contínua, feedback loops curtos e equipes multidisciplinares com alta autonomia.',
      context: 'Engenheiros de software assinam o Manifesto Ágil, rompendo com o planejamento de longo prazo inflexível. O novo paradigma propõe ciclos iterativos (Sprints) focados na entrega contínua de valor, pivotando a arquitetura com base em validações reais do usuário e mudanças de mercado.',
      impact: 'Aceleração brutal do time-to-market, redução do risco de obsolescência e a fundação da cultura DevOps/Produto que alimenta hoje gigantes da tecnologia como Apple, Stripe e Netflix.',
      color: '#f02fc2',
      icon: Cpu
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section 
      id="timeline" 
      className="relative w-full py-32 bg-black z-10 overflow-hidden"
    >
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title font-bold text-base text-accent-cyan tracking-[0.25em] uppercase mb-4"
          >
            A LINHA DO TEMPO DA EVOLUÇÃO
          </motion.div>
          <h2 className="font-title text-5xl sm:text-7xl lg:text-[104px] font-black tracking-tight text-white mb-8 leading-none">
            A Evolução do Trabalho
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl text-text-silver font-light max-w-4xl mx-auto leading-relaxed">
            Clique em qualquer um dos cartões abaixo para abrir e ver os detalhes simples de contexto de negócios e impactos práticos do modelo.
          </p>
        </div>

        {/* Linha vertical central para Desktop, lateral para Mobile */}
        <div className="relative w-full">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.04]" />

          {/* Lista de Marcos */}
          <div className="space-y-12 relative z-10">
            {milestones.map((item, index) => {
              const MilestoneIcon = item.icon;
              const isExpanded = expandedId === item.id;

              return (
                <div 
                  key={item.id}
                  className={`flex flex-col md:flex-row items-start justify-between w-full relative ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Card Lateral */}
                  <div className={`w-[90%] ml-10 md:ml-0 md:w-[46%] ${
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}>
                    <div 
                      onClick={() => toggleExpand(item.id)}
                      className={`glass-panel border rounded-[32px] p-8 md:p-10 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.02] cursor-pointer select-none ${
                        isExpanded ? 'border-white/15 bg-white/[0.03] shadow-[0_15px_40px_rgba(0,0,0,0.6)]' : 'border-white/5'
                      }`}
                    >
                      <div className={`flex items-center gap-4 justify-between ${
                        index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                      }`}>
                        <div className="flex flex-col">
                          <span 
                            className="font-title font-black text-3xl md:text-5xl tracking-tight leading-none mb-2"
                            style={{ color: item.color }}
                          >
                            {item.year}
                          </span>
                          <h3 className="font-title text-2xl md:text-3xl font-bold text-white tracking-wide">
                            {item.title}
                          </h3>
                        </div>
                        <ChevronDown 
                          className={`w-6 h-6 text-text-gray transition-transform duration-500 ${
                            isExpanded ? 'rotate-180 text-white' : ''
                          }`}
                        />
                      </div>
                      
                      <p className="text-lg md:text-2xl text-text-gray font-light leading-relaxed mt-5">
                        {item.desc}
                      </p>

                      {/* Painel Expansível (Framer Motion) */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                            className="overflow-hidden mt-6 pt-6 border-t border-white/5 text-left text-base leading-relaxed"
                          >
                            <div className="space-y-6">
                              <div>
                                <span className="font-title font-bold text-sm md:text-base text-text-muted tracking-wider block uppercase mb-1.5">
                                  Como Aconteceu
                                </span>
                                <p className="text-text-silver font-light text-base md:text-lg leading-relaxed">
                                  {item.context}
                                </p>
                              </div>
                              <div>
                                <span className="font-title font-bold text-sm md:text-base text-text-muted tracking-wider block uppercase mb-1.5">
                                  Impacto Real
                                </span>
                                <p className="text-text-silver font-light text-base md:text-lg leading-relaxed">
                                  {item.impact}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Nodo Indicador no centro */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 w-9 h-9 rounded-full border border-white/10 bg-black flex items-center justify-center shadow-lg">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}15` }}
                    >
                      <MilestoneIcon className="w-3.5 h-3.5" style={{ color: item.color }} />
                    </div>
                  </div>

                  {/* Espaço Vazio oposto */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
