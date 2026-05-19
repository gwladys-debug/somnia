
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SLEEP_QUESTIONS, QuizResults, PillarValue } from '@/lib/sleep-constants';

interface SleepQuizProps {
  onComplete: (results: QuizResults) => void;
}

export function SleepQuiz({ onComplete }: SleepQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Partial<QuizResults>>({});

  const handleOptionSelect = (value: PillarValue) => {
    const currentQuestion = SLEEP_QUESTIONS[currentStep];
    const newResponses = { ...responses, [currentQuestion.id]: value };
    setResponses(newResponses);

    if (currentStep < SLEEP_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newResponses as QuizResults);
    }
  };

  const currentQuestion = SLEEP_QUESTIONS[currentStep];
  const progressValue = ((currentStep + 1) / SLEEP_QUESTIONS.length) * 100;

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 flex flex-col items-center">
      <div className="w-full space-y-2">
        <div className="flex justify-between text-sm font-medium text-white/60">
          <span>Question {currentStep + 1} / {SLEEP_QUESTIONS.length}</span>
          <span>{Math.round(progressValue)}%</span>
        </div>
        <Progress value={progressValue} className="h-1.5 bg-white/10" />
      </div>

      <Card className="w-full card-entrance border-none shadow-2xl bg-[#E3F2FD] rounded-[16px]">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-[#0D47A1]">
            {currentQuestion.title}
          </CardTitle>
          <CardDescription className="text-[#0D47A1]/80 font-medium text-lg pt-2 leading-snug">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-8 space-y-3">
          {currentQuestion.options.map((option) => (
            <Button
              key={option.value}
              className="w-full h-14 text-lg font-semibold btn-pearl border-none rounded-xl"
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
          className="text-white/40 hover:text-white"
          onClick={() => setCurrentStep(currentStep - 1)}
        >
          Retour
        </Button>
      )}
    </div>
  );
}
