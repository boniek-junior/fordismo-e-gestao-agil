'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import { HelpCircle, Check, X, Trophy, ArrowRight, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [shakeActive, setShakeActive] = useState(false);
  const [successActive, setSuccessActive] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: 'No Fordismo, cada trabalhador costuma fazer:',
      options: [
        'Muitas tarefas diferentes',
        'Uma tarefa específica'
      ],
      answerIndex: 1,
      explanation: 'No Fordismo, cada operário realiza apenas uma única tarefa repetitiva ao longo de todo o dia de trabalho físico para acelerar a esteira rolante.'
    },
    {
      id: 2,
      question: 'A Gestão Ágil valoriza:',
      options: [
        'Mudanças e adaptação',
        'Fazer tudo da mesma forma sempre'
      ],
      answerIndex: 0,
      explanation: 'Na era dos sistemas digitais rápidos, a agilidade entende que mudanças acontecem a todo instante e a capacidade de se adaptar é vital.'
    },
    {
      id: 3,
      question: 'O Fordismo ficou conhecido por:',
      options: [
        'Produção em massa',
        'Produção personalizada'
      ],
      answerIndex: 0,
      explanation: 'Henry Ford fabricou milhões de carros Modelo T idênticos (produção em massa) para diminuir absurdamente o custo final de compra.'
    },
    {
      id: 4,
      question: 'Na Gestão Ágil, as equipes costumam:',
      options: [
        'Trabalhar juntas',
        'Trabalhar isoladas'
      ],
      answerIndex: 0,
      explanation: 'Equipes ágeis são multidisciplinares (contêm criadores, designers, etc.) e trabalham juntas com total colaboração e conversas diárias.'
    },
    {
      id: 5,
      question: 'Qual modelo é mais flexível diante de mudanças?',
      options: [
        'Gestão Ágil',
        'Fordismo'
      ],
      answerIndex: 0,
      explanation: 'A Gestão Ágil foi estruturada especificamente para responder rápido a novidades, enquanto mudar a esteira rígida do Fordismo era caríssimo e demorado.'
    }
  ];

  // Escuta atalhos de teclado físicos reais
  useEffect(() => {
    if (quizFinished || isSubmitted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'a' || key === '1') handleOptionClick(0);
      else if (key === 'b' || key === '2') handleOptionClick(1);
      else if (e.key === 'Enter' && selectedOpt !== null) {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOpt, isSubmitted, quizFinished, currentIdx]);

  // Escuta tecla Enter para avançar
  useEffect(() => {
    if (!isSubmitted) return;

    const handleEnterNext = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleEnterNext);
    return () => window.removeEventListener('keydown', handleEnterNext);
  }, [isSubmitted, currentIdx]);

  const handleOptionClick = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null || isSubmitted) return;
    setIsSubmitted(true);

    if (selectedOpt === questions[currentIdx].answerIndex) {
      setScore(s => s + 1);
      setSuccessActive(true);
      setTimeout(() => {
        setSuccessActive(false);
      }, 600);
    } else {
      setShakeActive(true);
      setTimeout(() => {
        setShakeActive(false);
      }, 500);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setIsSubmitted(false);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(c => c + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  const quizVariants = {
    initial: { opacity: 0, y: 15, x: 0, scale: 1 },
    idle: { opacity: 1, y: 0, x: 0, scale: 1 },
    exit: { opacity: 0, y: -15, x: 0, scale: 1 },
    shake: { 
      opacity: 1,
      x: [-10, 10, -10, 10, -8, 8, -5, 5, 0], 
      transition: { duration: 0.45, ease: "easeInOut" as const } 
    },
    success: { 
      opacity: 1,
      scale: [1, 1.03, 0.99, 1.01, 1], 
      y: [0, -12, 4, -2, 0], 
      transition: { duration: 0.55, ease: "easeInOut" as const } 
    }
  };

  const activeQuestion = questions[currentIdx];

  const getDiagnostic = () => {
    if (score === 5) return { title: 'Tech Lead / Head de Produto', desc: 'Domínio absoluto da evolução organizacional. Você entende profundamente a mudança de paradigma da eficiência rígida industrial para a adaptabilidade sistêmica moderna.', badge: 'EXCELENTE' };
    if (score >= 3) return { title: 'Agile Master em Evolução', desc: 'Sólida compreensão do manifesto. Você entende os gargalos da manufatura linear e o porquê de produtos modernos exigirem iteração contínua.', badge: 'AVANÇADO' };
    return { title: 'Gestor Tradicional', desc: 'Ainda operando no modelo linear. Recomenda-se revisar o Estudo de Caso para entender melhor por que ciclos longos falham no ecossistema atual de software.', badge: 'TRADICIONAL' };
  };

  const diagnostic = getDiagnostic();
  const progressPercent = (currentIdx / questions.length) * 100;

  return (
    <section id="quiz" className="relative w-full py-32 bg-black z-10 border-t border-white/5">
      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-title font-bold text-base text-accent-cyan tracking-[0.25em] uppercase mb-4"
          >
            VALIDAÇÃO DO ESTUDO DE CASO
          </motion.div>
          <h2 className="font-title text-5xl sm:text-7xl lg:text-[104px] font-black tracking-tight text-white mb-6 leading-none">
            Assessment Técnico
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl text-text-gray font-light max-w-4xl mx-auto leading-relaxed">
            Avalie o seu domínio prático sobre arquitetura organizacional, desde a padronização linear até a gestão de produtos complexos, e confira seu diagnóstico de liderança.
          </p>
        </div>

        {/* Display Quiz Box */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!quizFinished ? (
              <motion.div
                key={currentIdx}
                variants={quizVariants}
                initial="initial"
                animate={shakeActive ? "shake" : successActive ? "success" : "idle"}
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <SpotlightCard 
                  highlightColor="rgba(0, 242, 254, 0.05)"
                  className="p-8 sm:p-12 relative min-h-[480px] flex flex-col justify-between overflow-hidden border border-white/5 rounded-[32px]"
                >
                  {/* Progress Bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                      className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple shadow-[0_0_10px_#00f2fe]"
                    />
                  </div>

                  {/* Top bar question status */}
                  <div className="flex justify-between items-center mb-8 pt-2">
                    <span className="font-title text-xs md:text-sm font-bold text-text-muted tracking-wider uppercase">
                      Questão {activeQuestion.id} de {questions.length}
                    </span>
                    <HelpCircle className="w-5 h-5 text-accent-cyan opacity-80 animate-pulse" />
                  </div>

                  {/* The Question Text */}
                  <div className="mb-10">
                    <h3 className="font-title text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide leading-snug mb-10">
                      {activeQuestion.question}
                    </h3>

                    {/* Options list */}
                    <div className="space-y-4">
                      {activeQuestion.options.map((opt, i) => {
                        const isSelected = selectedOpt === i;
                        const isCorrect = i === activeQuestion.answerIndex;
                        const keyLetter = ['A', 'B', 'C', 'D'][i];

                        let borderStyle = 'border-white/5';
                        let bgStyle = 'bg-white/[0.01]';
                        let textStyle = 'text-text-silver';

                        if (isSelected) {
                          borderStyle = 'border-accent-cyan/60';
                          bgStyle = 'bg-accent-cyan/5';
                          textStyle = 'text-white font-black';
                        }

                        if (isSubmitted) {
                          if (isCorrect) {
                            borderStyle = 'border-emerald-500/50';
                            bgStyle = 'bg-emerald-500/10';
                            textStyle = 'text-emerald-400 font-black';
                          } else if (isSelected) {
                            borderStyle = 'border-accent-magenta/50';
                            bgStyle = 'bg-accent-magenta/10';
                            textStyle = 'text-accent-magenta font-black';
                          }
                        }

                        return (
                          <button
                            key={i}
                            disabled={isSubmitted}
                            onClick={() => handleOptionClick(i)}
                            className={`w-full text-left text-lg md:text-2xl p-6 rounded-2xl border flex items-center justify-between transition-all duration-300 ${
                              isSubmitted ? '' : 'hover:border-white/15 hover:bg-white/[0.02] cursor-pointer'
                            } ${borderStyle} ${bgStyle} ${textStyle}`}
                          >
                            <span className="flex-1 pr-6 flex items-center gap-4">
                              {/* Keyboard Shortcut badge */}
                              <span className={`w-10 h-10 rounded-xl border flex items-center justify-center font-title text-sm font-black ${
                                isSelected 
                                  ? 'bg-accent-cyan text-black border-accent-cyan' 
                                  : 'bg-white/5 border-white/10 text-text-muted'
                              }`}>
                                {keyLetter}
                              </span>
                              {opt}
                            </span>
                            
                            {/* Visual check/cross indicator */}
                            {isSubmitted && isCorrect && <Check className="w-6 h-6 text-emerald-400 shrink-0" />}
                            {isSubmitted && isSelected && !isCorrect && <X className="w-6 h-6 text-accent-magenta shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback explanations and controls footer */}
                  <div className="pt-8 border-t border-white/5 flex flex-col gap-6">
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 text-lg md:text-2xl text-text-gray font-light leading-relaxed"
                      >
                        <span className="font-title font-bold text-sm md:text-base text-accent-cyan tracking-wider block uppercase mb-2">
                          Por que esta resposta está certa?
                        </span>
                        {activeQuestion.explanation}
                      </motion.div>
                    )}

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs md:text-sm text-text-muted font-bold uppercase tracking-wider hidden sm:inline select-none">
                        Pressione <kbd className="bg-white/5 px-3 py-1 rounded-md border border-white/10 text-white font-mono">Enter</kbd> para confirmar ou avançar
                      </span>

                      {!isSubmitted ? (
                        <button
                          disabled={selectedOpt === null}
                          onClick={handleSubmit}
                          className={`font-title font-black text-sm md:text-base px-12 py-5 rounded-full flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                            selectedOpt === null
                              ? 'bg-white/5 text-text-muted border border-white/5 cursor-not-allowed'
                              : 'bg-white text-black hover:scale-[1.03] active:scale-[0.98]'
                          }`}
                        >
                          Confirmar Resposta <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={handleNext}
                          className="font-title font-black text-sm md:text-base bg-accent-cyan text-black px-12 py-5 rounded-full hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
                        >
                          {currentIdx < questions.length - 1 ? 'Próxima Questão' : 'Ver Diagnóstico'} <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                </SpotlightCard>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <SpotlightCard 
                  highlightColor="rgba(0, 242, 254, 0.06)"
                  className="p-10 text-center flex flex-col items-center justify-between min-h-[480px] border border-white/5 rounded-[32px]"
                >
                  <Trophy className="w-20 h-20 text-accent-cyan opacity-80 mb-6 animate-bounce" />
                  
                  <div>
                    <span className="text-xs font-bold font-title text-text-muted tracking-[0.2em] uppercase block mb-2">
                      DESAFIO CONCLUÍDO!
                    </span>
                    <h3 className="font-title text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
                      {diagnostic.title}
                    </h3>
                    
                    {/* Badge display */}
                    <div className="inline-block px-6 py-3 rounded-xl bg-white/5 border border-white/5 fill-current font-title font-bold text-sm tracking-widest text-accent-cyan mb-8">
                      {diagnostic.badge} — {score} DE {questions.length} ACERTOS
                    </div>

                    <p className="text-base sm:text-lg md:text-xl text-text-gray font-light max-w-xl mx-auto leading-relaxed mb-10">
                      {diagnostic.desc}
                    </p>
                  </div>

                  <button
                    onClick={handleRestart}
                    className="font-title font-black text-sm md:text-base bg-white/5 border border-white/5 text-white px-10 py-4.5 rounded-full hover:bg-white/10 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" /> Fazer Desafio Novamente
                  </button>
                </SpotlightCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
