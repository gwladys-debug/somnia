
"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { SleepQuiz } from '@/components/SleepQuiz';
import { SleepResults } from '@/components/SleepResults';
import { QuizResults } from '@/lib/sleep-constants';
import { Moon, Stars, ArrowRight } from "lucide-react";

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
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#212529]">
      {state === 'home' && (
        <div className="w-full max-w-2xl text-center space-y-8 card-entrance">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white tracking-tight">
              Sommeil <span className="text-[#E3F2FD]">Serein</span>
            </h1>
            <p className="text-xl text-white/70 max-w-lg mx-auto leading-relaxed">
              Analysez votre insomnie à travers nos 4 piliers fondamentaux (Sommeil, Relaxation, Sport, Boissons) et recevez des conseils d'experts.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="p-4 bg-white/5 rounded-full border border-white/10">
              <Moon className="w-12 h-12 text-[#E3F2FD]" />
            </div>
          </div>

          <Button 
            onClick={startQuiz}
            className="btn-pearl h-14 px-10 text-lg rounded-2xl group"
          >
            Commencer
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
            {['Sommeil', 'Relaxation', 'Sport', 'Boissons'].map((p) => (
              <div key={p} className="text-xs uppercase tracking-widest font-bold">{p}</div>
            ))}
          </div>
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
