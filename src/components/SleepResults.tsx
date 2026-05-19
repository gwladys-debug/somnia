"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Moon, Wind, Activity, Coffee, RefreshCw, Sparkles } from "lucide-react";
import { generateSleepRecommendations, GenerateSleepRecommendationsOutput } from '@/ai/flows/generate-sleep-recommendations';
import { QuizResults } from '@/lib/sleep-constants';

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
        console.error("Erreur lors de la récupération des conseils:", error);
      } finally {
        setLoading(false);
      }
    }
    getAIAdvice();
  }, [results]);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-8 flex flex-col items-center">
        <div className="text-center space-y-4">
          <Sparkles className="w-12 h-12 text-[#E3F2FD] animate-pulse mx-auto" />
          <h2 className="text-3xl font-bold text-white">Analyse de vos piliers...</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-[16px] bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  const resultCards = [
    {
      title: 'Sommeil',
      icon: <Moon className="w-6 h-6" />,
      text: recommendations?.sleep,
    },
    {
      title: 'Relaxation',
      icon: <Wind className="w-6 h-6" />,
      text: recommendations?.relaxation,
    },
    {
      title: 'Activité Physique',
      icon: <Activity className="w-6 h-6" />,
      text: recommendations?.sport,
    },
    {
      title: 'Consommation',
      icon: <Coffee className="w-6 h-6" />,
      text: recommendations?.drinks,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 flex flex-col items-center card-entrance">
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-bold text-white">Votre Bilan Personnalisé</h2>
        <p className="text-white/60 text-lg">Voici vos recommandations basées sur les 4 piliers de votre hygiène de vie.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {resultCards.map((card, idx) => (
          <Card 
            key={idx} 
            className="border-none shadow-xl bg-[#E3F2FD] rounded-[16px] transition-all hover:scale-[1.02] flex flex-col"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <div className="p-2 rounded-xl bg-[#0D47A1]/10 text-[#0D47A1]">
                {card.icon}
              </div>
              <CardTitle className="text-xl font-bold text-[#0D47A1]">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-[#0D47A1] leading-relaxed font-medium">
                {card.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={onReset}
        className="btn-pearl h-14 px-10 text-lg rounded-2xl flex items-center gap-2"
      >
        <RefreshCw className="w-5 h-5" />
        Refaire le test
      </Button>
    </div>
  );
}
