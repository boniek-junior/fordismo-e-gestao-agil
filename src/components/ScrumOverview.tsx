'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { ShieldAlert, Compass, Play, RefreshCw, Layers, Users, Star } from 'lucide-react';

interface Role {
  title: string;
  sub: string;
  desc: string;
  color: string;
  icon: React.ComponentType<any>;
}

interface Step {
  id: string;
  title: string;
  desc: string;
  impact: string;
  icon: React.ComponentType<any>;
}

export default function ScrumOverview() {
  const [selectedStep, setSelectedStep] = useState<string>('backlog');

  const roles: Role[] = [
    {
      title: 'Dono do Produto',
      sub: 'O Estrategista',
      desc: 'O responsável por definir a visão e o rumo do projeto. Ele cria e organiza a lista de tarefas, decidindo quais ideias devem ser construídas primeiro.',
      color: '#00f2fe',
      icon: Compass
    },
    {
      title: 'Facilitador',
      sub: 'O Protetor da Equipe',
      desc: 'Garante que o time siga os valores ágeis, ajudando a remover as dificuldades do dia a dia e blindando a equipe de interrupções de fora.',
      color: '#7928ca',
      icon: ShieldAlert
    },
    {
      title: 'Time de Criação',
      sub: 'Os Construtores',
      desc: 'Grupo unido e autônomo de especialistas (como designers e programadores) com total poder de se organizar e construir o produto passo a passo.',
      color: '#f02fc2',
      icon: Users
    }
  ];

  const steps: Step[] = [
    {
      id: 'backlog',
      title: '01 / Lista de Ideias',
      desc: 'Uma lista única e priorizada contendo todas as ideias, melhorias e tarefas necessárias para construir o produto ideal.',
      impact: 'Centraliza tudo em um único ponto, evitando reuniões inúteis para decidir o que fazer depois.',
      icon: Layers
    },
    {
      id: 'planning',
      title: '02 / Planejar o Período',
      desc: 'Reunião de alinhamento no início do ciclo onde o time escolhe as tarefas que se compromete a entregar.',
      impact: 'Garante que todos saibam exatamente qual o foco e rumo a seguir nos próximos dias.',
      icon: Compass
    },
    {
      id: 'sprint',
      title: '03 / Ciclo de Trabalho',
      desc: 'O período curto de trabalho focado (geralmente de 2 a 3 semanas) no qual partes utilizáveis e prontas do produto são feitas.',
      impact: 'Garante entregas rápidas ao usuário e evita longos meses de atraso típicos das fábricas rígidas.',
      icon: Play
    },
    {
      id: 'daily',
      title: '04 / Conversa Diária',
      desc: 'Sincronização rápida de 15 minutos em pé todos os dias para alinhar as tarefas e remover impedimentos.',
      impact: 'Promove comunicação transparente e impede que erros ou atrasos passem despercebidos.',
      icon: RefreshCw
    },
    {
      id: 'review',
      title: '05 / Demonstração',
      desc: 'Reunião de encerramento do ciclo para apresentar o que foi construído aos clientes e receber opiniões reais.',
      impact: 'Transparência total e oportunidade imediata de ajustar a rota com base em opiniões reais.',
      icon: Star
    }
  ];

  const activeStep = steps.find(s => s.id === selectedStep) || steps[0];

  return (
    <section className="relative w-full py-32 bg-black z-10 border-t border-white/5">
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title font-bold text-base text-accent-magenta tracking-[0.25em] uppercase mb-4"
          >
            A ESTRUTURA E EVENTOS ÁGEIS
          </motion.div>
          <h2 className="font-title text-5xl sm:text-7xl lg:text-[104px] font-black tracking-tight text-white mb-6 leading-none">
            O Ecossistema do Scrum
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl text-text-gray font-light max-w-4xl mx-auto leading-relaxed">
            Diferente das fábricas rígidas com ordens vindas de cima, as equipes ágeis funcionam com autonomia e conversas diárias rápidas.
          </p>
        </div>

        {/* Roles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {roles.map((item, index) => {
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
                  highlightColor={`${item.color}15`}
                  className="h-full p-8 sm:p-10"
                >
                  <div className="flex gap-5 items-start">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 shrink-0" style={{ color: item.color }}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-title text-xl md:text-2xl font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <span className="text-xs font-bold text-text-gray uppercase tracking-widest block mb-4">
                        {item.sub}
                      </span>
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

        {/* Interactive Cycle Flow Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column - Stage Menu */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
            <span className="font-title text-xs text-text-muted tracking-wider uppercase font-bold mb-3">
              Passos do Ciclo de Criação
            </span>
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isSelected = step.id === selectedStep;

              return (
                <button
                  key={step.id}
                  onClick={() => setSelectedStep(step.id)}
                  className={`w-full text-left font-title font-bold text-base md:text-lg px-8 py-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-accent-magenta/10 to-accent-purple/10 border-accent-magenta/40 text-white shadow-[0_10px_20px_rgba(121,40,202,0.05)] scale-[1.02]'
                      : 'bg-white/[0.01] border-white/5 text-text-gray hover:border-white/10 hover:text-white'
                  }`}
                >
                  <StepIcon className={`w-5 h-5 ${isSelected ? 'text-accent-magenta' : 'text-text-muted'}`} />
                  {step.title}
                </button>
              );
            })}
          </div>

          {/* Right Column - Expansive Stage Details Box */}
          <div className="lg:col-span-7">
            <div className="h-full glass-panel border border-white/5 rounded-[32px] p-8 sm:p-12 bg-gradient-to-br from-card-gradient-from/30 to-card-gradient-to relative flex flex-col justify-between">
              <div className="grid-lines-bg opacity-10" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  className="space-y-8 relative z-10"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-title text-xs font-bold text-text-muted tracking-[0.25em] uppercase">
                      DETALHES DO PROCESSO
                    </span>
                    <activeStep.icon className="w-8 h-8 text-accent-magenta opacity-80 animate-pulse" />
                  </div>

                  <div>
                    <h3 className="font-title text-3xl sm:text-4xl font-extrabold text-white mb-4">
                      {activeStep.title.split(' / ')[1]}
                    </h3>
                    <p className="text-xl sm:text-2xl md:text-3xl text-text-gray font-light leading-relaxed">
                      {activeStep.desc}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-white/5 space-y-4">
                    <div>
                      <span className="font-title text-sm font-bold text-accent-magenta tracking-wider block uppercase mb-2">
                        Resultado Prático
                      </span>
                      <p className="text-lg sm:text-xl md:text-2xl text-text-silver font-light leading-relaxed">
                        {activeStep.impact}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
