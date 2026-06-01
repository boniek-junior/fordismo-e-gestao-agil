'use client';

import React, { useState, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, Kanban, ArrowRight } from 'lucide-react';

interface CardItem {
  id: string;
  title: string;
  desc: string;
  col: string;
  priority: 'alta' | 'média' | 'baixa';
}

interface Column {
  id: string;
  title: string;
  color: string;
  dot: string;
  icon: React.ComponentType<any>;
}

export default function KanbanBoard() {
  const [cards, setCards] = useState<CardItem[]>([
    { id: 'card-1', title: 'Implementar CI/CD Pipeline', desc: 'Configurar automação no GitHub Actions para deploy em staging.', col: 'backlog', priority: 'alta' },
    { id: 'card-2', title: 'Testes A/B no Checkout', desc: 'Desenvolver duas variantes da página final de conversão.', col: 'backlog', priority: 'média' },
    { id: 'card-3', title: 'Refatorar API de Pagamentos', desc: 'Migrar endpoints legados para a nova arquitetura Serverless.', col: 'in_flight', priority: 'alta' },
    { id: 'card-4', title: 'Design System V2', desc: 'Atualizar tokens de cores globais no Figma e React.', col: 'completed', priority: 'baixa' },
  ]);

  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  const columns: Column[] = [
    { id: 'backlog', title: 'Lista de Ideias', color: '#00f2fe', dot: 'bg-accent-cyan', icon: Kanban },
    { id: 'in_flight', title: 'Fazendo', color: '#7928ca', dot: 'bg-accent-purple', icon: Play },
    { id: 'completed', title: 'Concluído', color: '#10b981', dot: 'bg-emerald-500', icon: Check },
  ];

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, colId: string) => {
    e.preventDefault();
    setDragOverCol(colId);
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = (colId: string) => {
    if (!draggedId) return;

    setCards((prev) =>
      prev.map((c) => (c.id === draggedId ? { ...c, col: colId } : c))
    );

    setDraggedId(null);
    setDragOverCol(null);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* Board Container */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/[0.01] border border-white/5 rounded-[32px] p-6 md:p-8 backdrop-blur-xl relative">
        {columns.map((column) => {
          const colCards = cards.filter((c) => c.col === column.id);
          const ColIcon = column.icon;

          return (
            <div
              key={column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={() => handleDrop(column.id)}
              className={`rounded-2xl p-5 min-h-[340px] flex flex-col transition-all duration-300 ${
                dragOverCol === column.id
                  ? 'bg-white/[0.03] border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]'
                  : 'bg-black/20 border border-white/[0.02]'
              }`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <span className={`w-2.5 h-2.5 rounded-full ${column.dot}`} />
                <h4 className="font-title text-base md:text-lg font-black text-white tracking-wider flex items-center gap-2">
                  <ColIcon className="w-5 h-5 opacity-60" />
                  {column.title}
                </h4>
                <span className="ml-auto text-xs md:text-sm font-bold text-text-muted bg-white/5 px-3 py-1 rounded-full">
                  {colCards.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="flex-1 flex flex-col gap-4.5 min-h-[250px]">
                <AnimatePresence mode="popLayout">
                  {colCards.map((card) => (
                    <motion.div
                      layout
                      layoutId={card.id}
                      key={card.id}
                      draggable
                      onDragStart={() => handleDragStart(card.id)}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      whileDrag={{ rotate: 1.8, scale: 1.04, boxShadow: "0 30px 60px rgba(0, 0, 0, 0.8), 0 0 18px rgba(240, 47, 194, 0.2)" }}
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 25,
                      }}
                      className="bg-white/[0.02] border border-white/5 hover:border-white/15 rounded-xl p-5 cursor-grab active:cursor-grabbing transition-colors duration-300"
                    >
                      <div className="flex justify-between items-start gap-3 mb-3">
                        <h5 className="font-title text-base md:text-lg font-bold text-white tracking-wide leading-snug">
                          {card.title}
                        </h5>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase shrink-0 ${
                          card.priority === 'alta'
                            ? 'bg-accent-magenta/10 text-accent-magenta border border-accent-magenta/20 font-black'
                            : card.priority === 'média'
                            ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 font-black'
                            : 'bg-white/5 text-text-gray border border-white/10 font-black'
                        }`}>
                          {card.priority}
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-text-gray font-light leading-relaxed">
                        {card.desc}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {colCards.length === 0 && (
                  <div className="flex-1 border border-dashed border-white/5 rounded-xl flex items-center justify-center p-8 text-center">
                    <p className="text-xs text-text-muted tracking-wide font-bold uppercase select-none">
                      Solte tarefas aqui
                    </p>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Dynamic metric footer */}
      <div className="mt-6 flex items-center gap-3 text-sm md:text-base text-text-gray font-light">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>Tempo de Entrega: <strong>Super Rápido!</strong></span>
        <ArrowRight className="w-4 h-4 text-text-muted" />
        <span className="text-accent-magenta font-bold">Trabalho Fluindo com Agilidade</span>
      </div>

    </div>
  );
}
