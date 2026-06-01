'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, Users, Activity, Eye, Zap } from 'lucide-react';

export default function AgileOverview() {
  const principles = [
    {
      title: 'Flexibilidade Total',
      desc: 'Mudar a direção do projeto facilmente sem precisar paralisar tudo ou quebrar a empresa.',
      icon: Activity,
    },
    {
      title: 'Trabalho em Equipe',
      desc: 'Pessoas com conhecimentos diferentes trabalhando juntas de verdade, sem divisões engessadas.',
      icon: Users,
    },
    {
      title: 'Melhoria Passo a Passo',
      desc: 'Entregar pedacinhos funcionando e ir colhendo feedbacks para melhorar nas próximas semanas.',
      icon: GitPullRequest,
    },
    {
      title: 'Foco em quem Usa',
      desc: 'A opinião e satisfação da pessoa que usa o produto final é a métrica mais valiosa de sucesso.',
      icon: Eye,
    },
  ];

  return (
    <section className="relative w-full py-32 md:py-40 bg-black z-10 border-t border-white/5 overflow-hidden">
      
      {/* Background radial glowing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-accent-purple/10 to-accent-magenta/5 rounded-full filter blur-[140px] pointer-events-none z-0" />

      <div className="w-full max-w-[92%] xl:max-w-7xl 2xl:max-w-[1800px] mx-auto px-6 relative z-10">
        
        {/* Cinematic Entrance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-title font-bold text-base text-accent-magenta tracking-[0.25em] uppercase"
            >
              ETAPA 2 . A ERA DIGITAL
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-title text-5xl sm:text-7xl lg:text-[104px] font-black tracking-tight text-white mb-6 leading-none"
            >
              A Era da Agilidade & <br />
              <span className="bg-gradient-to-r from-accent-magenta to-accent-purple bg-clip-text text-transparent">
                Sistemas Flexíveis.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl text-text-silver font-light leading-relaxed"
            >
              Na era digital, a rigidez física das fábricas antigas faliu. As equipes passaram a precisar de um modelo desenhado para lidar com <strong>a incerteza, a pressa e a necessidade de mudar de rumo rápido.</strong>
            </motion.p>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="rounded-[32px] border border-white/5 bg-gradient-to-br from-card-gradient-from to-card-gradient-to p-10 relative flex flex-col justify-between min-h-[340px] shadow-[0_20px_50px_rgba(121,40,202,0.06)]"
            >
              <div className="grid-lines-bg opacity-20" />
              <div>
                <Zap className="w-10 h-10 text-accent-magenta mb-6" />
                <h3 className="font-title text-2xl md:text-3xl font-black text-white mb-4">
                  O Jeito Ágil
                </h3>
                <p className="text-base md:text-lg text-text-gray font-light leading-relaxed">
                  Substituir as ordens rígidas que vêm de cima pela autonomia das equipes, permitindo que cada time ajuste as suas velas conforme o vento do mercado muda.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {principles.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: index * 0.08 }}
                className="glass-panel border border-white/5 p-8 sm:p-10 hover:border-white/10 transition-colors flex flex-col justify-between"
              >
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-accent-magenta w-fit mb-8">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-title text-xl md:text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="text-lg md:text-2xl text-text-gray font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
