'use server';
/**
 * @fileOverview A Genkit flow for generating personalized sleep recommendations based on questionnaire responses.
 *
 * - generateSleepRecommendations - A function that handles the generation of sleep recommendations.
 * - GenerateSleepRecommendationsInput - The input type for the generateSleepRecommendations function.
 * - GenerateSleepRecommendationsOutput - The return type for the generateSleepRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateSleepRecommendationsInputSchema = z.object({
  sleepDuration: z
    .enum(['bad', 'medium', 'good'])
    .describe(
      'User\"s reported sleep duration: "bad" (less than 5h), "medium" (5-7h), "good" (more than 7h).'
    ),
  stressLevel: z
    .enum(['bad', 'medium', 'good'])
    .describe(
      'User\"s reported stress level before bed: "bad" (always), "medium" (often), "good" (rarely).'
    ),
  physicalActivity: z
    .enum(['bad', 'medium', 'good'])
    .describe(
      'User\"s reported physical activity habits: "bad" (never), "medium" (evening before sleep), "good" (during the day).'
    ),
  stimulantConsumption: z
    .enum(['bad', 'medium', 'good'])
    .describe(
      'User\"s reported stimulant consumption: "bad" (a lot), "medium" (moderately), "good" (never).'
    ),
});
export type GenerateSleepRecommendationsInput = z.infer<
  typeof GenerateSleepRecommendationsInputSchema
>;

const GenerateSleepRecommendationsOutputSchema = z.object({
  sleepRecommendation: z
    .string()
    .describe(
      'Personalized recommendation regarding sleep duration and circadian rhythms.'
    ),
  relaxationRecommendation: z
    .string()
    .describe(
      'Personalized recommendation regarding stress management and relaxation techniques.'
    ),
  physicalActivityRecommendation: z
    .string()
    .describe(
      'Personalized recommendation regarding physical activity timing and impact on sleep.'
    ),
  stimulantRecommendation: z
    .string()
    .describe(
      'Personalized recommendation regarding stimulant consumption and its effect on sleep.'
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
  prompt: `You are an expert sleep coach specializing in personalized behavioral recommendations for better rest. You will analyze a user's sleep habits based on a questionnaire and provide highly personalized, actionable advice.

Here are the user's responses to a sleep questionnaire:

- Sleep Duration: {{{sleepDuration}}}
- Stress Level before sleep: {{{stressLevel}}}
- Physical Activity: {{{physicalActivity}}}
- Stimulant Consumption (afternoon/evening): {{{stimulantConsumption}}}

Based on these responses, generate a personalized recommendation for each of the following categories:

1.  **Sleep Recommendation**: Provide advice on sleep duration, sleep hygiene, and circadian rhythms. For example, if sleepDuration is 'bad', suggest ways to increase sleep or regularize sleep times.
2.  **Relaxation Recommendation**: Provide advice on stress management techniques before bed, such as breathing exercises or mindfulness. For example, if stressLevel is 'bad', suggest specific relaxation methods.
3.  **Physical Activity Recommendation**: Provide advice on the timing and type of physical activity to optimize sleep. For example, if physicalActivity is 'medium' (evening), explain why exercising late is detrimental and suggest alternatives.
4.  **Stimulant Recommendation**: Provide advice on reducing or eliminating stimulants like caffeine or nicotine, especially in the afternoon or evening. For example, if stimulantConsumption is 'bad', recommend cutting off stimulants after 2 PM.

Ensure each recommendation is practical, concise, and directly addresses the user's specific input for that category. Output your response as a JSON object matching the provided schema.`,
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
