"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Moon, Wind, Activity, Coffee, RefreshCw, Sparkles } from "lucide-react";
import { generateSleepRecommendations, GenerateSleepRecommendationsOutput } from '@/ai/flows/generate-sleep-recommendations';
import { QuizResults } from './SleepQuiz';

interface SleepResultsProps {
  results: QuizResults;
  onReset: () => void;
}

export function SleepResults({ results, onReset }: SleepResultsProps) {
  const [recommendations, setRecommendations] = useState<GenerateSleepRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAIAdvice() {
      try {
        const advice = await generateSleepRecommendations({
          sleepDuration: results.sleepDuration,
          stressLevel: results.stressLevel,
          physicalActivity: results.physicalActivity,
          stimulantConsumption: results.stimulantConsumption
        });
        setRecommendations(advice);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setLoading(false);
      }
    }
    getAIAdvice();
  }, [results]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 space-y-8 flex flex-col items-center">
        <div className="text-center space-y-4">
          <Sparkles className="w-12 h-12 text-primary animate-pulse mx-auto" />
          <h2 className="text-3xl font-bold text-white">Analyse de vos réponses...</h2>
          <p className="text-white/60">Nos experts IA préparent vos conseils personnalisés.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-2xl bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  const resultCards = [
    {
      title: 'Sommeil',
      icon: <Moon className="w-6 h-6" />,
      text: recommendations?.sleepRecommendation,
    },
    {
      title: 'Relaxation',
      icon: <Wind className="w-6 h-6" />,
      text: recommendations?.relaxationRecommendation,
    },
    {
      title: 'Activité Physique',
      icon: <Activity className="w-6 h-6" />,
      text: recommendations?.physicalActivityRecommendation,
    },
    {
      title: 'Consommation',
      icon: <Coffee className="w-6 h-6" />,
      text: recommendations?.stimulantRecommendation,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-8 flex flex-col items-center">
      <div className="text-center space-y-2 card-entrance">
        <h2 className="text-4xl font-bold text-white">Votre Plan Sommeil</h2>
        <p className="text-white/60 text-lg">Voici nos recommandations pour améliorer vos nuits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {resultCards.map((card, idx) => (
          <Card 
            key={idx} 
            className="card-entrance border-none shadow-xl bg-card transition-transform duration-300 hover:scale-[1.02]"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {card.icon}
              </div>
              <CardTitle className="text-xl font-bold text-card-foreground">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground/90 leading-relaxed font-medium">
                {card.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={onReset}
        variant="secondary"
        className="mt-8 h-12 px-8 text-lg font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl button-transition flex items-center gap-2"
      >
        <RefreshCw className="w-5 h-5" />
        Refaire le test
      </Button>
    </div>
  );
}
