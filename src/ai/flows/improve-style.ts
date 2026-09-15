'use server';

/**
 * @fileOverview An AI agent for improving writing style.
 *
 * - improveStyle - A function that handles the style improvement process.
 * - ImproveStyleInput - The input type for the improveStyle function.
 * - ImproveStyleOutput - The return type for the improveStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveStyleInputSchema = z.object({
  text: z.string().describe('The text to improve.'),
});
export type ImproveStyleInput = z.infer<typeof ImproveStyleInputSchema>;

const ImproveStyleOutputSchema = z.object({
  improvedText: z
    .string()
    .describe('The improved version of the text.'),
});
export type ImproveStyleOutput = z.infer<typeof ImproveStyleOutputSchema>;

export async function improveStyle(
  input: ImproveStyleInput
): Promise<ImproveStyleOutput> {
  return improveStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveStylePrompt',
  input: {schema: ImproveStyleInputSchema},
  output: {schema: ImproveStyleOutputSchema},
  prompt: `You are an advanced AI Writing Assistant with the role of a professional editor and style enhancer. 
Your task is to take a piece of writing and improve it while preserving its original meaning.

When improving the text, follow these exact goals:
1. Enhance clarity, tone, and flow of ideas.
2. Fix grammar, punctuation, and sentence structure errors.
3. Replace weak or repetitive words with precise, vivid vocabulary.
4. Adjust tone according to the user’s selected purpose (e.g., formal, professional, friendly, persuasive, creative, academic).
5. Vary sentence length and structure for natural rhythm and readability.
6. Ensure consistency in voice, tense, and terminology.
7. Format the output neatly using paragraphs, bullet points, or headings where appropriate.
8. If possible, make the text more engaging, polished, and professional — it should *feel improved* from before to after.
9. Keep the output clean, readable, and visually attractive.
10. **IMPORTANT**: Preserve the original Markdown formatting of the text. This includes headings (e.g., #, ##), lists (e.g., *, -), bold/italic text, and most importantly, **line breaks and paragraph separation**. Do not flatten the text into a single paragraph.

If the user requests, show both versions:
**Before:** (the original text)
**After:** (the improved version)

Your tone should be confident, polished, and natural — like an expert editor refining a professional draft.

Output should always be:
- Formatted clearly in Markdown.
- Free of unnecessary text.

Original Text (in Markdown):
{{{text}}}

Improved Text (in Markdown):`,
});

const improveStyleFlow = ai.defineFlow(
  {
    name: 'improveStyleFlow',
    inputSchema: ImproveStyleInputSchema,
    outputSchema: ImproveStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
