"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Moon, Wind, Activity, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

type PillarValue = 'bad' | 'medium' | 'good';

export interface QuizResults {
  sleepDuration: PillarValue;
  stressLevel: PillarValue;
  physicalActivity: PillarValue;
  stimulantConsumption: PillarValue;
}

interface Question {
  id: keyof QuizResults;
  title: string;
  question: string;
  icon: React.ReactNode;
  options: {
    label: string;
    value: PillarValue;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'sleepDuration',
    title: 'Sommeil',
    question: "Combien d'heures dormez-vous par nuit en moyenne ?",
    icon: <Moon className="w-8 h-8" />,
    options: [
      { label: 'Moins de 5h', value: 'bad' },
      { label: 'Entre 5h et 7h', value: 'medium' },
      { label: 'Plus de 7h', value: 'good' },
    ],
  },
  {
    id: 'stressLevel',
    title: 'Relaxation',
    question: "Ressentez-vous du stress avant de vous coucher ?",
    icon: <Wind className="w-8 h-8" />,
    options: [
      { label: 'Toujours', value: 'bad' },
      { label: 'Souvent', value: 'medium' },
      { label: 'Rarement', value: 'good' },
    ],
  },
  {
    id: 'physicalActivity',
    title: 'Sport',
    question: "À quelle fréquence pratiquez-vous une activité physique ?",
    icon: <Activity className="w-8 h-8" />,
    options: [
      { label: 'Jamais', value: 'bad' },
      { label: 'Le soir avant de dormir', value: 'medium' },
      { label: 'En journée', value: 'good' },
    ],
  },
  {
    id: 'stimulantConsumption',
    title: 'Boissons',
    question: "Consommez-vous des excitants l'après-midi ou le soir ?",
    icon: <Coffee className="w-8 h-8" />,
    options: [
      { label: 'Oui, beaucoup', value: 'bad' },
      { label: 'Modérément', value: 'medium' },
      { label: 'Jamais', value: 'good' },
    ],
  },
];

interface SleepQuizProps {
  onComplete: (results: QuizResults) => void;
}

export function SleepQuiz({ onComplete }: SleepQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Partial<QuizResults>>({});

  const handleOptionSelect = (value: PillarValue) => {
    const currentQuestion = QUESTIONS[currentStep];
    const newResponses = { ...responses, [currentQuestion.id]: value };
    setResponses(newResponses);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newResponses as QuizResults);
    }
  };

  const currentQuestion = QUESTIONS[currentStep];
  const progressValue = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-lg mx-auto p-4 space-y-6 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="w-full space-y-2">
        <div className="flex justify-between text-xs text-white/70 font-medium">
          <span>Question {currentStep + 1} / {QUESTIONS.length}</span>
          <span>{Math.round(progressValue)}%</span>
        </div>
        <Progress value={progressValue} className="h-1 bg-white/10" />
      </div>

      <Card className="w-full card-entrance border-none shadow-xl overflow-hidden bg-card">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit">
            {currentQuestion.icon}
          </div>
          <CardTitle className="text-xl font-bold text-card-foreground">{currentQuestion.title}</CardTitle>
          <CardDescription className="text-card-foreground/80 font-medium text-base pt-2">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-8 space-y-3">
          {currentQuestion.options.map((option) => (
            <Button
              key={option.value}
              variant="secondary"
              className="w-full h-14 text-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 border-none rounded-xl button-transition"
              onClick={() => handleOptionSelect(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </CardContent>
      </Card>
      
      {currentStep > 0 && (
        <Button 
          variant="link" 
          className="text-white/50 hover:text-white"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Retour à la question précédente
        </Button>
      )}
    </div>
  );
}
