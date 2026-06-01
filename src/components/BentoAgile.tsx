'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import KanbanBoard from './KanbanBoard';
import { RotateCw, Users, Zap, Compass } from 'lucide-react';

export default function BentoAgile() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="agile" className="relative w-full py-24 bg-black z-10">
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-title font-bold text-base text-accent-magenta tracking-[0.25em] uppercase mb-4"
          >
            ETAPA 2 . O TRABALHO DIGITAL
          </motion.div>
          <h2 className="font-title text-5xl sm:text-7xl lg:text-[104px] font-black tracking-tight text-white mb-6 leading-none">
            Visualização de Fluxo e Times
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl text-text-gray font-light max-w-4xl leading-relaxed">
            Experimente a dinâmica de iterações da Gestão Ágil. Teste o quadro de tarefas interativo abaixo para compreender a eliminação de desperdício em tempo real.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-5%' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[minmax(320px,auto)]"
        >
          {/* Card 1: Medium Philosophy */}
          <motion.div variants={cardVariants}>
            <SpotlightCard 
              highlightColor="rgba(240, 47, 194, 0.05)"
              className="h-full flex flex-col justify-between p-8 sm:p-10"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="font-title text-xs font-bold text-text-muted tracking-[0.25em] uppercase">
                  01 / CICLOS CONTÍNUOS
                </span>
                <RotateCw className="w-8 h-8 text-accent-magenta opacity-60 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div>
                <h3 className="font-title text-2xl md:text-3xl font-black text-white mb-3">
                  Valor Constante
                </h3>
                <p className="text-lg md:text-2xl text-text-gray font-light leading-relaxed">
                  Em vez de tentar planejar o projeto estratégico de anos, a agilidade roda ciclos de feedback curtos baseados em entregas utilizáveis rápidas de alto valor.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
 
          {/* Card 2: Medium Organization */}
          <motion.div variants={cardVariants}>
            <SpotlightCard 
              highlightColor="rgba(240, 47, 194, 0.05)"
              className="h-full flex flex-col justify-between p-8 sm:p-10"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="font-title text-xs font-bold text-text-muted tracking-[0.25em] uppercase">
                  02 / TIMES AUTÔNOMOS
                </span>
                <Users className="w-8 h-8 text-accent-magenta opacity-60" />
              </div>
              <div>
                <h3 className="font-title text-2xl md:text-3xl font-black text-white mb-3">
                  Equipes Independentes
                </h3>
                <p className="text-lg md:text-2xl text-text-gray font-light leading-relaxed">
                  Decisões técnicas e operacionais descentralizadas. Pessoas com conhecimentos complementares atuando de forma transparente com alta responsabilidade tática.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
 
          {/* Card 3: Small Risk Profile */}
          <motion.div variants={cardVariants}>
            <SpotlightCard 
              highlightColor="rgba(240, 47, 194, 0.05)"
              className="h-full flex flex-col justify-between p-8 sm:p-10"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="font-title text-xs font-bold text-text-muted tracking-[0.25em] uppercase">
                  04 / APRENDIZADO COM O ERRO
                </span>
                <Zap className="w-8 h-8 text-accent-magenta opacity-60" />
              </div>
              <div>
                <h3 className="font-title text-2xl md:text-3xl font-black text-white mb-3">
                  Adaptação ao Erro
                </h3>
                <p className="text-lg md:text-2xl text-text-gray font-light leading-relaxed">
                  Dificuldades no produto são incorporadas de forma ágil na cadeia de valor. O sistema é desenhado de forma nativa para reajustar o curso a partir de anomalias rápidas.
                </p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 4: Large Active Kanban Simulator */}
          <motion.div variants={cardVariants} className="md:col-span-3">
            <SpotlightCard 
              highlightColor="rgba(240, 47, 194, 0.05)"
              className="h-full flex flex-col justify-between p-8 sm:p-12"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="font-title text-xs font-bold text-text-muted tracking-[0.25em] uppercase mb-1 block">
                    03 / QUADRO KANBAN DINÂMICO
                  </span>
                  <h3 className="font-title text-3xl sm:text-4xl font-extrabold text-white">
                    Simulador Kanban Interativo
                  </h3>
                </div>
                <Compass className="w-8 h-8 text-accent-magenta opacity-80" />
              </div>
              <p className="text-base md:text-lg text-text-gray font-light leading-relaxed max-w-3xl mb-8">
                Arraste as tarefas nas colunas correspondentes de lista de ideias, fazendo e concluído para visualizar a física de mola elástica atuando no seu fluxo de trabalho de auditório.
              </p>
              
              {/* Kanban Simulator render */}
              <div className="w-full">
                <KanbanBoard />
              </div>
            </SpotlightCard>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
