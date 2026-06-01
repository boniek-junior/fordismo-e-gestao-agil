import React from 'react';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-title',
  display: 'swap',
});

export const metadata = {
  title: 'Da Produção em Massa à Gestão Ágil — O Pivot dos Modelos de Gestão',
  description: 'Uma jornada digital imersiva e interativa pela evolução dos modelos de administração: Revolução Industrial, Taylorismo, Fordismo, Toyotismo, Lean e Gestão Ágil.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              const savedTheme = localStorage.getItem('theme');
              if (savedTheme === 'light') {
                document.documentElement.classList.add('light');
              } else {
                document.documentElement.classList.remove('light');
              }
            } catch (e) {}
          })()
        `}} />
      </head>
      <body className="font-sans bg-bg-absolute text-text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
