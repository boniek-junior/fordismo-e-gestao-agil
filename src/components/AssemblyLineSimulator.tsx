'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw, CheckCircle, Zap } from 'lucide-react';

type Step = 'idle' | 'raw' | 'assembly' | 'inspect' | 'finished';

interface Spark {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export default function AssemblyLineSimulator() {
  const [lineState, setLineState] = useState<Step>('idle');
  const [carsCount, setCarsCount] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [inspectStatus, setInspectStatus] = useState<'idle' | 'scanning' | 'passed'>('idle');
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [currentStation, setCurrentStation] = useState<Step | 'none'>('idle');

  // Calibração cromática inteligente de Diretor Criativo Apple & Stripe
  const carColorClass = 
    lineState === 'inspect' && inspectStatus === 'scanning'
      ? 'text-white animate-pulse'
      : lineState === 'inspect' && inspectStatus === 'passed'
      ? 'text-emerald-400'
      : lineState === 'finished'
      ? 'text-emerald-400'
      : 'text-accent-cyan';

  const carShadowClass = 
    lineState === 'inspect' && inspectStatus === 'scanning'
      ? 'drop-shadow-[0_15px_30px_rgba(255,255,255,0.25)]'
      : lineState === 'inspect' && inspectStatus === 'passed'
      ? 'drop-shadow-[0_15px_30px_rgba(16,185,129,0.35)]'
      : lineState === 'finished'
      ? 'drop-shadow-[0_15px_30px_rgba(16,185,129,0.25)]'
      : 'drop-shadow-[0_15px_30px_rgba(0,242,254,0.25)]';

  // Emissor de faíscas animado elástica
  useEffect(() => {
    if (currentStation !== 'assembly') {
      setSparks([]);
      return;
    }

    const interval = setInterval(() => {
      const newSparks = Array.from({ length: 8 }).map((_, i) => ({
        id: Date.now() + i,
        x: 0,
        y: 0,
        targetX: (Math.random() - 0.5) * 80,
        targetY: (Math.random() - 0.8) * 60,
      }));
      setSparks(prev => [...prev.slice(-20), ...newSparks]);
    }, 180 / speed);

    return () => clearInterval(interval);
  }, [lineState, speed]);

  // Reseta a estação atual no início de qualquer transição (carro em movimento)
  useEffect(() => {
    if (lineState !== 'idle') {
      setCurrentStation('none');
    }
  }, [lineState]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lineState === 'raw') {
      // 1.5s viagem + 1.0s pausa = 2.5s total
      timer = setTimeout(() => {
        setLineState('assembly');
      }, 2500 / speed);
    } else if (lineState === 'assembly') {
      // 2.0s viagem + 2.0s soldagem = 4.0s total
      timer = setTimeout(() => {
        setLineState('inspect');
      }, 4000 / speed);
    } else if (lineState === 'inspect') {
      // 2.0s viagem + 1.5s escaneamento + 1.0s pausa aprovado = 4.5s total
      // O escaneamento é aprovado em 3.5s (2.0s viagem + 1.5s escaneamento)
      timer = setTimeout(() => {
        setInspectStatus('passed');
        timer = setTimeout(() => {
          setLineState('finished');
        }, 1000 / speed);
      }, 3500 / speed);
    } else if (lineState === 'finished') {
      // 2.0s viagem fora da tela + 1.0s pausa = 3.0s total
      timer = setTimeout(() => {
        setCarsCount(c => c + 1);
        setLineState('raw');
        setInspectStatus('idle');
      }, 3000 / speed);
    }

    return () => clearTimeout(timer);
  }, [lineState, speed]);

  const handleStart = () => {
    if (lineState === 'idle') {
      setLineState('raw');
    } else {
      setLineState('idle');
      setInspectStatus('idle');
      setCurrentStation('idle');
    }
  };

  const handleReset = () => {
    setLineState('idle');
    setCarsCount(0);
    setInspectStatus('idle');
    setCurrentStation('idle');
  };

  return (
    <section id="simulator" className="relative w-full py-24 bg-black z-10 border-t border-white/5">
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title font-bold text-sm text-accent-cyan tracking-[0.25em] uppercase mb-4"
          >
            SIMULAÇÃO FÍSICA EM TEMPO REAL
          </motion.div>
          <h2 className="font-title text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            Simulador de Linha de Montagem
          </h2>
          <p className="text-xl sm:text-2xl text-text-gray font-light max-w-3xl mx-auto leading-relaxed">
            Experimente na prática a sincronia rígida do Fordismo. Controle a velocidade da esteira móvel e assista ao processo de montagem mecânica do clássico carro Modelo T.
          </p>
        </div>

        {/* Control Panel Widget */}
        <div className="glass-panel border border-white/5 rounded-3xl p-6 md:p-10 bg-white/[0.01] mb-12">
          
          {/* Top Panel Telemetry */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center md:text-left border-b border-white/5 pb-8">
            <div>
              <span className="font-title text-xs md:text-sm text-text-muted tracking-wider block uppercase mb-2 font-bold">
                Status da Esteira
              </span>
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <span className={`w-3.5 h-3.5 rounded-full ${
                  lineState !== 'idle' ? 'bg-accent-cyan animate-pulse shadow-[0_0_12px_#00f2fe]' : 'bg-text-muted'
                }`} />
                <span className="font-title text-lg md:text-xl font-bold text-white uppercase">
                  {lineState === 'idle' ? 'Parada' : 'Em Movimento'}
                </span>
              </div>
            </div>

            <div>
              <span className="font-title text-xs md:text-sm text-text-muted tracking-wider block uppercase mb-2 font-bold">
                Veículos Produzidos
              </span>
              <span className="font-title text-3xl md:text-4xl font-black text-white tracking-tight">
                {carsCount} <span className="text-base font-light text-text-gray">Carros</span>
              </span>
            </div>

            <div>
              <span className="font-title text-xs md:text-sm text-text-muted tracking-wider block uppercase mb-2 font-bold">
                Velocidade da Esteira
              </span>
              <div className="flex items-center justify-center md:justify-start gap-3.5">
                <button 
                  onClick={() => setSpeed(s => Math.max(0.5, s - 0.5))}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-lg font-black transition-all cursor-pointer select-none"
                >
                  -
                </button>
                <span className="text-xl md:text-2xl font-title font-bold text-white">{speed}x</span>
                <button 
                  onClick={() => setSpeed(s => Math.min(3, s + 0.5))}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center text-lg font-black transition-all cursor-pointer select-none"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <span className="font-title text-xs md:text-sm text-text-muted tracking-wider block uppercase mb-2 font-bold">
                Defeitos Encontrados
              </span>
              <div className="flex items-center justify-center md:justify-start gap-2 text-accent-cyan font-title text-base md:text-lg font-bold">
                <CheckCircle className="w-5 h-5" />
                <span>0% (Tudo Igual)</span>
              </div>
            </div>
          </div>

          {/* Active Mechanical Belt Display (Amplified height and size for widescreen projector) */}
          <div className="relative w-full h-80 bg-bg-surface/50 rounded-[32px] border border-white/5 overflow-hidden flex items-center justify-between px-8 mb-8">
            
            {/* Background Rolling Belt stripes */}
            <div 
              className={`absolute bottom-12 left-0 right-0 h-6 bg-white/5 border-y border-white/10 flex overflow-hidden pointer-events-none ${
                lineState !== 'idle' ? 'animate-[infinite-scroll_2s_linear_infinite]' : ''
              }`}
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255,255,255,0.03) 12px, rgba(255,255,255,0.03) 24px)',
                animationDuration: `${3 / speed}s`
              }}
            />

            {/* Stage Indicators */}
            <div className="absolute inset-0 flex justify-between px-16 pointer-events-none">
              {['Matéria Prima', 'Montagem', 'Inspeção', 'Finalizado'].map((stage) => (
                <div key={stage} className="flex flex-col items-center justify-between py-6 h-full">
                  <span className="font-title text-xs md:text-sm text-text-muted tracking-wider uppercase font-bold">
                    {stage}
                  </span>
                  <div className="w-0.5 h-24 bg-white/5" />
                </div>
              ))}
            </div>

            {/* The Blueprint Car SVG Carriage */}
            <motion.div
              key={carsCount}
              initial={{ 
                left: '-20%',
                opacity: 0,
                scale: 1.15
              }}
              animate={{ 
                left: lineState === 'idle' ? '-20%' : lineState === 'raw' ? '4%' : lineState === 'assembly' ? '32%' : lineState === 'inspect' ? '62%' : '105%',
                opacity: (lineState === 'idle') ? 0 : 1,
                scale: 1.15
              }}
              transition={{ 
                type: 'tween',
                ease: 'linear',
                duration: lineState === 'raw' ? (1.5 / speed) : lineState === 'assembly' ? (2.0 / speed) : lineState === 'inspect' ? (2.0 / speed) : lineState === 'finished' ? (2.0 / speed) : (1.5 / speed)
              }}
              onAnimationComplete={() => {
                if (lineState !== 'idle') {
                  setCurrentStation(lineState);
                  if (lineState === 'inspect') {
                    setInspectStatus('scanning');
                  }
                }
              }}
              className={`absolute z-10 w-32 h-28 flex flex-col items-center justify-center filter transition-all duration-500 ${carShadowClass}`}
            >
              <span className={`text-[8px] font-title font-black tracking-wider uppercase mb-1.5 block transition-colors duration-500 ${carColorClass}`}>
                MONTAGEM DO MODELO T
              </span>

              {/* SVG Técnico do Modelo T Clássico */}
              <svg className={`w-full h-18 stroke-current transition-colors duration-500 ${carColorClass}`} viewBox="0 0 120 60" fill="none" strokeWidth="1.2">
                
                {/* Linha de esteira sutil */}
                <path d="M 5 30 L 115 30" stroke="rgba(0, 242, 254, 0.15)" strokeWidth="0.5" strokeDasharray="2,2" />
                
                {/* Rodas Raiadas */}
                {lineState !== 'raw' && lineState !== 'idle' && (
                  <>
                    {/* Roda Dianteira */}
                    <circle cx="35" cy="45" r="10" stroke="currentColor" />
                    <circle cx="35" cy="45" r="2" fill="currentColor" />
                    <path d="M 35 35 L 35 55 M 25 45 L 45 45 M 28 38 L 42 52 M 28 52 L 42 38" stroke="currentColor" strokeWidth="0.6" />
                    
                    {/* Roda Traseira */}
                    <circle cx="85" cy="45" r="10" stroke="currentColor" />
                    <circle cx="85" cy="45" r="2" fill="currentColor" />
                    <path d="M 85 35 L 85 55 M 75 45 L 95 45 M 78 38 L 92 52 M 78 52 L 92 38" stroke="currentColor" strokeWidth="0.6" />
                  </>
                )}

                {/* Chassis Cru */}
                {lineState === 'raw' && (
                  <>
                    <path d="M 15 42 L 105 42 L 100 37 L 20 37 Z" stroke="currentColor" />
                    <circle cx="35" cy="45" r="3" stroke="currentColor" strokeDasharray="1,1" />
                    <circle cx="85" cy="45" r="3" stroke="currentColor" strokeDasharray="1,1" />
                  </>
                )}

                {/* Acoplamento de Cabine e Eixos */}
                {lineState === 'assembly' && (
                  <>
                    <path d="M 15 42 L 105 42 L 100 37 L 20 37 Z" stroke="currentColor" />
                    <path d="M 50 37 L 50 20 L 78 20 L 85 37" stroke="currentColor" />
                    <path d="M 22 37 L 25 28 L 38 28 L 40 37" stroke="currentColor" />
                  </>
                )}

                {/* Veículo Completo */}
                {(lineState === 'inspect' || lineState === 'finished') && (
                  <>
                    <path d="M 15 42 L 105 42 L 100 37 L 20 37 Z" stroke="currentColor" />
                    <path d="M 50 37 L 50 20 L 78 20 L 85 37" stroke="currentColor" fill="rgba(0, 242, 254, 0.05)" />
                    <path d="M 22 37 L 25 28 L 38 28 L 40 37" stroke="currentColor" />
                    
                    <path d="M 50 20 L 44 24" stroke="currentColor" />
                    <circle cx="102" cy="38" r="1.5" fill="currentColor" className="animate-pulse" />
                  </>
                )}
              </svg>
              
              {/* Rodas pretas no finished */}
              <div className="w-full flex justify-between px-7 -mt-2 relative z-20">
                <div className="w-5 h-5 rounded-full bg-black border border-white/10" />
                <div className="w-5 h-5 rounded-full bg-black border border-white/10" />
              </div>

              {/* Tooltips Inteligentes Atrelados ao Carro (Acompanham Posição) */}
              
              {/* Tooltip de Montagem (Soldando) */}
              <AnimatePresence>
                {currentStation === 'assembly' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
                  >
                    <div className="text-[10px] whitespace-nowrap font-bold text-accent-cyan bg-black/90 backdrop-blur-md border border-accent-cyan/30 px-4 py-2 rounded-lg flex items-center gap-2 shadow-[0_10px_25px_rgba(0,242,254,0.15)]">
                      <Zap className="w-3.5 h-3.5 animate-bounce" />
                      SOLDANDO LATARIA
                    </div>
                    <div className="w-2.5 h-2.5 bg-black border-b border-r border-accent-cyan/30 rotate-45 -mt-1.5"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tooltip de Inspeção */}
              <AnimatePresence>
                {currentStation === 'inspect' && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
                  >
                    <div className={`text-[10px] whitespace-nowrap font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow-xl border bg-black/90 backdrop-blur-md transition-colors duration-300 ${
                      inspectStatus === 'passed' 
                        ? 'text-emerald-400 border-emerald-500/30 shadow-[0_10px_25px_rgba(16,185,129,0.15)]' 
                        : 'text-accent-cyan border-accent-cyan/30 shadow-[0_10px_25px_rgba(0,242,254,0.15)]'
                    }`}>
                      {inspectStatus === 'scanning' ? 'ESCANEANDO ERROS' : 'SEM DEFEITOS'}
                    </div>
                    <div className={`w-2.5 h-2.5 bg-black border-b border-r rotate-45 -mt-1.5 transition-colors duration-300 ${
                      inspectStatus === 'passed' ? 'border-emerald-500/30' : 'border-accent-cyan/30'
                    }`}></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Faíscas de Soldagem (Atreladas ao carro) */}
              <AnimatePresence>
                {currentStation === 'assembly' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-20"
                  >
                    {sparks.map(spark => (
                      <motion.div
                        key={spark.id}
                        initial={{ x: spark.x, y: spark.y, opacity: 1, scale: 1 }}
                        animate={{ x: spark.targetX, y: spark.targetY, opacity: 0, scale: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="absolute w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_8px_#00f2fe]"
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scanner de Inspeção (Atrelado ao carro) */}
              <AnimatePresence>
                {currentStation === 'inspect' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none flex items-center justify-center z-20"
                  >
                    <motion.div 
                      animate={{
                        opacity: [0.1, 0.6, 0.1],
                        scaleX: [0.8, 1.2, 0.8]
                      }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className={`w-32 h-32 rounded-full filter blur-xl transition-colors duration-500 ${
                        inspectStatus === 'passed' ? 'bg-emerald-500/20' : 'bg-accent-cyan/25'
                      }`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>

          </div>

          {/* Action triggers */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleStart}
              className={`w-full sm:w-auto font-title font-black text-sm md:text-base px-12 py-5 rounded-full flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                lineState !== 'idle'
                  ? 'bg-white/5 border border-white/5 text-white hover:bg-white/10'
                  : 'bg-accent-cyan text-black hover:shadow-[0_8px_25px_rgba(0,242,254,0.3)] hover:scale-[1.03] active:scale-[0.98]'
              }`}
            >
              {lineState !== 'idle' ? (
                <>
                  <Pause className="w-5 h-5" /> Parar Esteira
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" /> Iniciar Esteira
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto font-title font-black text-sm md:text-base bg-white/5 border border-white/5 text-white px-12 py-5 rounded-full hover:bg-white/10 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Zerar Produção
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
