'use server';

/**
 * @fileOverview Implements a Genkit flow for ZKP-based matchmaking.
 *
 * - zkpMatch - A function that initiates the ZKP matchmaking process.
 * - ZkpMatchInput - The input type for the zkpMatch function.
 * - ZkpMatchOutput - The return type for the zkpMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ZkpMatchInputSchema = z.object({
  ageRange: z
    .string()
    .describe('The desired age range of potential matches.'),
  locationProximity: z
    .string()
    .describe('The desired location proximity of potential matches.'),
  sharedInterests: z
    .string()
    .describe('The shared interests with potential matches.'),
  trustScoreThreshold: z
    .number()
    .describe(
      'The minimum trust score threshold for potential matches based on community reputation.'
    ),
});
export type ZkpMatchInput = z.infer<typeof ZkpMatchInputSchema>;

const ZkpMatchOutputSchema = z.object({
  matchDescription: z
    .string()
    .describe(
      'A description of the potential match, based on the specified criteria, without revealing sensitive data.'
    ),
});
export type ZkpMatchOutput = z.infer<typeof ZkpMatchOutputSchema>;

export async function zkpMatch(input: ZkpMatchInput): Promise<ZkpMatchOutput> {
  return zkpMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'zkpMatchPrompt',
  input: {schema: ZkpMatchInputSchema},
  output: {schema: ZkpMatchOutputSchema},
  prompt: `You are a matchmaking expert utilizing zero-knowledge proofs to ensure user privacy.

  Based on the following criteria provided by the user, find a potential match while ensuring no sensitive data is revealed.

  Age Range: {{{ageRange}}}
  Location Proximity: {{{locationProximity}}}
  Shared Interests: {{{sharedInterests}}}
  Minimum Trust Score: {{{trustScoreThreshold}}}

  Provide a description of the potential match based on the provided criteria, emphasizing privacy and safety due to the trust score.
  `,
});

const zkpMatchFlow = ai.defineFlow(
  {
    name: 'zkpMatchFlow',
    inputSchema: ZkpMatchInputSchema,
    outputSchema: ZkpMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
