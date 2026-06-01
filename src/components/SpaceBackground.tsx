'use client';

import React, { useEffect, useRef } from 'react';

/**
 * SpaceBackground (TypeScript)
 * Motor gráfico central que renderiza uma malha elástica deformável sob o cursor
 * e partículas estilizadas que sofrem transição de estado físico no scroll do usuário.
 */
export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = (canvas.width = window.innerWidth);
      height = (canvas.height = window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const particleCount = 50;
    
    // Estados do sistema: 0 = Hero, 1 = Fordismo, 2 = Transição/Timeline, 3 = Ágil
    let activeSystemState = 0;

    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 0.85;

      const fordismEl = document.getElementById('fordism');
      const timelineEl = document.getElementById('timeline');
      const agileEl = document.getElementById('agile');

      if (agileEl && scrollY >= agileEl.offsetTop - threshold) {
        activeSystemState = 3; // Agile: Círculos orbitais orgânicos
      } else if (timelineEl && scrollY >= timelineEl.offsetTop - threshold) {
        activeSystemState = 2; // Transição: Turbulência de atrito
      } else if (fordismEl && scrollY >= fordismEl.offsetTop - threshold) {
        activeSystemState = 1; // Fordismo: Blocos rígidos lineares
      } else {
        activeSystemState = 0; // Hero: Poeira elástica
      }
    };
    window.addEventListener('scroll', handleScroll);

    class Particle {
      x!: number;
      y!: number;
      size!: number;
      speed!: number;
      opacity!: number;
      angle!: number;
      waveSpeed!: number;
      waveAmplitude!: number;

      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 50;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 0.4 + 0.1;
        this.opacity = Math.random() * 0.3 + 0.05;
        this.angle = Math.random() * Math.PI * 2;
        this.waveSpeed = Math.random() * 0.01 + 0.005;
        this.waveAmplitude = Math.random() * 15 + 5;
      }

      update() {
        if (activeSystemState === 1) {
          // Fordismo: Movimento vertical rígido, ritmo linear de esteira
          this.y -= this.speed * 1.5;
          this.opacity = Math.min(0.25, this.opacity + 0.01);
        } else if (activeSystemState === 2) {
          // Transição/Linha do Tempo: Turbulência, atrito senoidal rápido
          this.y -= this.speed * 3.5;
          this.x += Math.sin(this.angle) * 2.5;
          this.angle += 0.12;
        } else if (activeSystemState >= 3) {
          // Gestão Ágil: Movimento orbital circular contínuo suave (Value loop)
          this.y -= this.speed * 1.2;
          this.x += Math.sin(this.angle) * (this.waveAmplitude * 0.08);
          this.angle += this.waveSpeed;
          this.opacity = Math.min(0.35, this.opacity + 0.01);
        } else {
          // Hero: Movimento ultra-suave
          this.y -= this.speed * 0.6;
        }

        // Reset ao sair da tela
        if (this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset();
        }
      }

      draw() {
        const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('light');
        ctx.save();
        ctx.globalAlpha = isLight ? this.opacity * 1.5 : this.opacity;

        if (activeSystemState === 1) {
          // Fordismo: Quadrados azuis (hardware, blocos mecânicos idênticos)
          ctx.fillStyle = isLight ? '#00b4d8' : '#00f2fe';
          ctx.fillRect(this.x, this.y, this.size * 1.8, this.size * 1.8);
        } else if (activeSystemState === 2) {
          // Transição: Linhas vetoriais magenta rasgadas
          ctx.fillStyle = '#f02fc2';
          ctx.fillRect(this.x, this.y, this.size * 1.2, this.size * 3.5);
        } else if (activeSystemState >= 3) {
          // Ágil: Nós orbitais roxos em rede
          ctx.fillStyle = isLight ? '#7209b7' : '#7928ca';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Hero: Partículas prateadas ou cinzas conforme o tema
          ctx.fillStyle = isLight ? '#121215' : '#ffffff';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Inicializa partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Renderiza malha elástica de linhas no Hero (State 0)
      if (mouseX !== -9999 && activeSystemState === 0) {
        const isLight = typeof document !== 'undefined' && document.documentElement.classList.contains('light');
        ctx.save();
        ctx.strokeStyle = isLight ? 'rgba(18, 18, 21, 0.025)' : 'rgba(255, 255, 255, 0.008)';
        ctx.lineWidth = 1;

        const colsCount = 24;
        const rowsCount = 18;
        const xGap = width / colsCount;
        const yGap = height / rowsCount;

        // Linhas verticais distorcidas
        for (let i = 0; i <= colsCount; i++) {
          ctx.beginPath();
          for (let j = 0; j <= rowsCount; j++) {
            const py = j * yGap;
            const px = i * xGap;

            const dx = mouseX - px;
            const dy = mouseY - py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let ox = 0;
            if (dist < 380) {
              const force = (380 - dist) / 380;
              ox = dx * force * -0.15; // Afasta as linhas gravitacionalmente
            }

            if (j === 0) {
              ctx.moveTo(px + ox, py);
            } else {
              ctx.lineTo(px + ox, py);
            }
          }
          ctx.stroke();
        }

        // Linhas horizontais distorcidas
        for (let j = 0; j <= rowsCount; j++) {
          ctx.beginPath();
          for (let i = 0; i <= colsCount; i++) {
            const px = i * xGap;
            const py = j * yGap;

            const dx = mouseX - px;
            const dy = mouseY - py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            let oy = 0;
            if (dist < 380) {
              const force = (380 - dist) / 380;
              oy = dy * force * -0.15;
            }

            if (i === 0) {
              ctx.moveTo(px, py + oy);
            } else {
              ctx.lineTo(px, py + oy);
            }
          }
          ctx.stroke();
        }

        ctx.restore();
      }

      // Atualiza e desenha partículas
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="ambient-glow-bg" />
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-40" />
    </>
  );
}
