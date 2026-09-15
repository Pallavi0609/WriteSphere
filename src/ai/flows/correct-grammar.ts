  'use server';

/**
 * @fileOverview An AI agent for correcting grammar.
 *
 * - correctGrammar - A function that handles the grammar correction process.
 * - CorrectGrammarInput - The input type for the correctGrammar function.
 * - CorrectGrammarOutput - The return type for the correctGrammar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CorrectGrammarInputSchema = z.object({
  text: z.string().describe('The text to correct.'),
});
export type CorrectGrammarInput = z.infer<typeof CorrectGrammarInputSchema>;

const CorrectGrammarOutputSchema = z.object({
  correctedText: z
    .string()
    .describe('The corrected version of the text.'),
});
export type CorrectGrammarOutput = z.infer<typeof CorrectGrammarOutputSchema>;

export async function correctGrammar(
  input: CorrectGrammarInput
): Promise<CorrectGrammarOutput> {
  return correctGrammarFlow(input);
}

const prompt = ai.definePrompt({
  name: 'correctGrammarPrompt',
  input: {schema: CorrectGrammarInputSchema},
  output: {schema: CorrectGrammarOutputSchema},
  prompt: `You are a machine. You are a grammar correction tool. You are not a writer.

**CRITICAL INSTRUCTION: Your ONLY job is to correct grammar, spelling, and punctuation. You MUST preserve the original formatting, including all line breaks and paragraph separation. Failure to do so will result in a system error.**

**EXAMPLE:**

**Original Text:**
This is a sentence.
And this is another sentence on a new line.

This is a new paragraph.

**Your Corrected Output MUST BE:**
This is a sentence.
And this is another sentence on a new line.

This is a new paragraph.

**ABSOLUTE PROHIBITIONS:**
*   DO NOT change the meaning of the text.
*   DO NOT change the style of the text.
*   DO NOT change the tone of the text.
*   DO NOT rephrase sentences.
*   DO NOT change word choices unless it is a grammatical error.
*   DO NOT add any extra words, explanations, or conversational filler.
*   DO NOT alter the original line breaks or paragraph structure.

Your output MUST be the raw corrected text and nothing else.

**TEXT TO CORRECT:**
{{{text}}}
`,
});

const correctGrammarFlow = ai.defineFlow(
  {
    name: 'correctGrammarFlow',
    inputSchema: CorrectGrammarInputSchema,
    outputSchema: CorrectGrammarOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // Safely handle the output to prevent crashes
    if (output && output.correctedText) {
      return { correctedText: output.correctedText };
    }
    // Return a default or error state if the output is not as expected
    return { correctedText: '// The AI model did not return a valid response. Please try again.' };
  }
);
