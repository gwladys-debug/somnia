'use server';
/**
 * @fileOverview Un flux Genkit pour générer des recommandations de sommeil personnalisées basées sur les réponses au questionnaire.
 *
 * - generateSleepRecommendations - Fonction qui gère la génération des recommandations.
 * - GenerateSleepRecommendationsInput - Type d'entrée pour la fonction.
 * - GenerateSleepRecommendationsOutput - Type de sortie pour la fonction.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateSleepRecommendationsInputSchema = z.object({
  sleepDuration: z
    .enum(['bad', 'medium', 'good'])
    .describe(
      'Durée de sommeil : "bad" (< 5h), "medium" (5-7h), "good" (> 7h).'
    ),
  stressLevel: z
    .enum(['bad', 'medium', 'good'])
    .describe(
      'Niveau de stress : "bad" (toujours), "medium" (souvent), "good" (rarement).'
    ),
  physicalActivity: z
    .enum(['bad', 'medium', 'good'])
    .describe(
      'Activité physique : "bad" (jamais), "medium" (le soir), "good" (en journée).'
    ),
  stimulantConsumption: z
    .enum(['bad', 'medium', 'good'])
    .describe(
      'Consommation d\'excitants : "bad" (beaucoup), "medium" (modérément), "good" (jamais).'
    ),
});
export type GenerateSleepRecommendationsInput = z.infer<
  typeof GenerateSleepRecommendationsInputSchema
>;

const GenerateSleepRecommendationsOutputSchema = z.object({
  sleep: z
    .string()
    .describe(
      'Conseil personnalisé sur la durée du sommeil et les rythmes circadiens.'
    ),
  relaxation: z
    .string()
    .describe(
      'Conseil personnalisé sur la gestion du stress et la relaxation.'
    ),
  sport: z
    .string()
    .describe(
      'Conseil personnalisé sur l\'activité physique et son timing.'
    ),
  drinks: z
    .string()
    .describe(
      'Conseil personnalisé sur la consommation de boissons excitantes.'
    ),
});
export type GenerateSleepRecommendationsOutput = z.infer<
  typeof GenerateSleepRecommendationsOutputSchema
>;

export async function generateSleepRecommendations(
  input: GenerateSleepRecommendationsInput
): Promise<GenerateSleepRecommendationsOutput> {
  return generateSleepRecommendationsFlow(input);
}

const sleepRecommendationsPrompt = ai.definePrompt({
  name: 'sleepRecommendationsPrompt',
  input: { schema: GenerateSleepRecommendationsInputSchema },
  output: { schema: GenerateSleepRecommendationsOutputSchema },
  prompt: `Tu es un expert coach en sommeil spécialisé dans les thérapies comportementales pour l'insomnie. Tu vas analyser les réponses d'un utilisateur et fournir des conseils ultra-personnalisés et actionnables en français.

Réponses de l'utilisateur :
- Sommeil (Durée) : {{{sleepDuration}}}
- Relaxation (Stress) : {{{stressLevel}}}
- Sport (Activité physique) : {{{physicalActivity}}}
- Boissons (Excitants) : {{{stimulantConsumption}}}

Génère un bilan structuré en 4 parties précises (en français) :

1. **Sommeil** : Si c'est 'bad', explique l'importance de la régularité et des cycles de 90 min. Si c'est 'good', encourage la maintenance.
2. **Relaxation** : Si c'est 'bad' ou 'medium', propose une technique spécifique (ex: cohérence cardiaque, respiration 4-7-8, scan corporel).
3. **Activité Physique** : Si l'utilisateur fait du sport le soir ('medium'), explique que cela augmente la température centrale et retarde l'endormissement. Conseille de finir 3h avant le coucher.
4. **Boissons** : Si c'est 'bad' ou 'medium', recommande fermement l'arrêt de la caféine/théine après 14h à cause de la demi-vie de la molécule.

Chaque conseil doit être court (2-3 phrases), bienveillant mais ferme, et directement lié à la réponse fournie.`,
});

const generateSleepRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateSleepRecommendationsFlow',
    inputSchema: GenerateSleepRecommendationsInputSchema,
    outputSchema: GenerateSleepRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await sleepRecommendationsPrompt(input);
    return output!;
  }
);
