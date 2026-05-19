
/**
 * @fileOverview Constantes et types pour le questionnaire Sommeil Serein.
 * Permet une maintenance facile et une future synchronisation avec Firestore.
 */

export type PillarValue = 'bad' | 'medium' | 'good';

export interface QuizResults {
  sleepDuration: PillarValue;
  stressLevel: PillarValue;
  physicalActivity: PillarValue;
  stimulantConsumption: PillarValue;
}

export interface Question {
  id: keyof QuizResults;
  title: string;
  question: string;
  options: {
    label: string;
    value: PillarValue;
  }[];
}

export const SLEEP_QUESTIONS: Question[] = [
  {
    id: 'sleepDuration',
    title: 'Sommeil',
    question: "Combien d'heures dormez-vous par nuit en moyenne ?",
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
    options: [
      { label: 'Oui, beaucoup', value: 'bad' },
      { label: 'Modérément', value: 'medium' },
      { label: 'Jamais', value: 'good' },
    ],
  },
];
