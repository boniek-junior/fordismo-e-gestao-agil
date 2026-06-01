'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import SpaceBackground from '@/components/SpaceBackground';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import HenryFord from '@/components/HenryFord';
import Fordism from '@/components/Fordism';
import AssemblyLineSimulator from '@/components/AssemblyLineSimulator';
import FordismImpacts from '@/components/FordismImpacts';
import AdvantagesDisadvantages from '@/components/AdvantagesDisadvantages';
import AgileOverview from '@/components/AgileOverview';
import AgileManifesto from '@/components/AgileManifesto';
import ScrumOverview from '@/components/ScrumOverview';
import BentoAgile from '@/components/BentoAgile';
import AgileVsFordism from '@/components/AgileVsFordism';
import Quiz from '@/components/Quiz';
import Conclusion from '@/components/Conclusion';
import Footer from '@/components/Footer';

/**
 * Page (TypeScript Client Component)
 * O Pipeline principal que renderiza a jornada cinematográfica
 * de storytelling sobre a evolução dos modelos de gestão.
 */
export default function Page() {
  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-accent-cyan/30 selection:text-white">
      
      {/* Elementos Estéticos de Fundo */}
      <SpaceBackground />

      {/* Navegação Flutuante de Luxo */}
      <Navbar />

      {/* Conteúdo do Pipeline de Storytelling */}
      <main className="relative z-10 w-full">
        
        {/* 1. Introdução (Hero Section Abertura Monumental) */}
        <Hero />

        {/* 2. Fordismo (Timeline simplificada, Henry Ford, Bento Fordism) */}
        <Timeline />
        <HenryFord />
        <Fordism />

        {/* 3. Como funciona o Fordismo (Simulador de Esteira Rolante Mecânica) */}
        <AssemblyLineSimulator />

        {/* 4. Vantagens e desvantagens do Fordismo (Impactos e Métricas) */}
        <FordismImpacts />

        {/* 5. Gestão Ágil (AgileOverview, Manifesto Ágil) */}
        <AgileOverview />
        <AgileManifesto />

        {/* 6. Como funciona a Gestão Ágil (Eventos Scrum, Bento Ágil + Kanban) */}
        <ScrumOverview />
        <BentoAgile />

        {/* 8. FORÇAS E RISCOS DE CADA MODELO (Abas comparativas e Tabela Matriz Simplificada) */}
        <AdvantagesDisadvantages />
        <AgileVsFordism />

        {/* 9. Quiz Interativo (5 perguntas didáticas e fáceis de A/B) */}
        <Quiz />

        {/* 10. Conclusão (Mensagem de Impacto Final) */}
        <Conclusion />

      </main>

      {/* Rodapé Executivo */}
      <Footer />

    </div>
  );
}
