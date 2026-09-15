'use server';

/**
 * @fileOverview A grammar and style checker AI agent.
 *
 * - checkGrammarAndStyle - A function that handles the grammar and style checking process.
 * - CheckGrammarAndStyleInput - The input type for the checkGrammarAndStyle function.
 * - CheckGrammarAndStyleOutput - The return type for the checkGrammarAndStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckGrammarAndStyleInputSchema = z.object({
  text: z.string().describe('The text to check for grammar and style.'),
});
export type CheckGrammarAndStyleInput = z.infer<typeof CheckGrammarAndStyleInputSchema>;

const CheckGrammarAndStyleOutputSchema = z.object({
  improvements: z
    .string()
    .describe('A list of suggested improvements to the text for grammar and style.'),
});
export type CheckGrammarAndStyleOutput = z.infer<typeof CheckGrammarAndStyleOutputSchema>;

export async function checkGrammarAndStyle(
  input: CheckGrammarAndStyleInput
): Promise<CheckGrammarAndStyleOutput> {
  return checkGrammarAndStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkGrammarAndStylePrompt',
  input: {schema: CheckGrammarAndStyleInputSchema},
  output: {schema: CheckGrammarAndStyleOutputSchema},
  prompt: `You are an advanced AI Writing Assistant with the role of a professional editor and style enhancer.
Your task is to review a piece of writing and provide suggestions to improve it.

When reviewing the text, identify areas for improvement based on these exact goals:
1.  **Clarity, Tone, and Flow:** Are the ideas clear? Is the tone appropriate? Does it flow well?
2.  **Grammar and Punctuation:** Are there any grammatical errors, typos, or punctuation mistakes?
3.  **Vocabulary:** Are there weak or repetitive words that could be replaced with more precise or vivid alternatives?
4.  **Sentence Structure:** Could sentence length and structure be varied for better rhythm and readability?
5.  **Consistency:** Is the voice, tense, and terminology consistent throughout?

Your task is to **suggest improvements**, not to rewrite the text. For each suggestion, explain *why* it improves the text. If there are no errors or suggestions, simply state that the text is well-written.

Format your output as a list of suggestions using Markdown.

**Example Output:**
*   **Sentence 1:** Consider replacing "very big" with "enormous" for a stronger impact.
*   **Paragraph 2:** The flow could be improved by moving the third sentence to the beginning of the paragraph. This places the topic sentence first.
*   **General:** The tone is a bit too casual. Consider replacing contractions like "don't" with "do not" for a more formal voice.

**Text to Review:**
{{{text}}}`,
});

const checkGrammarAndStyleFlow = ai.defineFlow(
  {
    name: 'checkGrammarAndStyleFlow',
    inputSchema: CheckGrammarAndStyleInputSchema,
    outputSchema: CheckGrammarAndStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
