"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { SleepQuiz, QuizResults } from '@/components/SleepQuiz';
import { SleepResults } from '@/components/SleepResults';
import { Moon, Stars, ArrowRight, ShieldCheck } from "lucide-react";

type AppState = 'home' | 'quiz' | 'results';

export default function Home() {
  const [state, setState] = useState<AppState>('home');
  const [results, setResults] = useState<QuizResults | null>(null);

  const startQuiz = () => setState('quiz');
  
  const finishQuiz = (data: QuizResults) => {
    setResults(data);
    setState('results');
  };

  const resetApp = () => {
    setResults(null);
    setState('home');
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {state === 'home' && (
        <div className="w-full max-w-2xl text-center space-y-10 card-entrance py-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary mb-4">
              <Stars className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">Noctura Sleep Aid</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              Sommeil <span className="text-primary italic">Serein</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed">
              Analysez vos habitudes d'insomnie à travers nos 4 piliers fondamentaux et recevez des conseils d'experts générés par IA.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
            {[
              { label: 'Sommeil', icon: <Moon className="w-5 h-5" /> },
              { label: 'Relaxation', icon: <ShieldCheck className="w-5 h-5" /> },
              { label: 'Sport', icon: <Stars className="w-5 h-5" /> },
              { label: 'Boissons', icon: <Stars className="w-5 h-5" /> },
            ].map((pill, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-primary">{pill.icon}</div>
                <span className="text-xs font-medium text-white/70">{pill.label}</span>
              </div>
            ))}
          </div>

          <Button 
            onClick={startQuiz}
            variant="secondary"
            className="h-16 px-10 text-xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-2xl button-transition group"
          >
            Commencer l'analyse
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-xs text-white/30 italic">
            Réponses anonymes • Analyse instantanée • Propulsé par IA
          </p>
        </div>
      )}

      {state === 'quiz' && (
        <SleepQuiz onComplete={finishQuiz} />
      )}

      {state === 'results' && results && (
        <SleepResults results={results} onReset={resetApp} />
      )}
    </main>
  );
}
