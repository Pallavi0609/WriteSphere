'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating article drafts based on user-provided topic, tone, and word limit.
 *
 * - generateArticleDraft - An asynchronous function that takes user input and returns an article draft.
 * - GenerateArticleDraftInput - The input type for the generateArticleDraft function.
 * - GenerateArticleDraftOutput - The output type for the generateArticleDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateArticleDraftInputSchema = z.object({
  topic: z.string().describe('The topic of the article.'),
  tone: z.string().describe('The tone of the article (e.g., academic, casual, formal, persuasive).'),
  purpose: z.string().describe('The purpose of the article (e.g., essay, blog-post, article, marketing-copy, social-media-post, email).'),
  wordLimit: z.number().describe('The desired word limit for the article.'),
  outline: z.string().optional().describe('An optional outline to structure the article.'),
  language: z.string().optional().describe('The language of the article (e.g., English, Hindi, Tamil).'),
});

export type GenerateArticleDraftInput = z.infer<typeof GenerateArticleDraftInputSchema>;

const GenerateArticleDraftOutputSchema = z.object({
  draft: z.string().describe('The generated article draft.'),
});

export type GenerateArticleDraftOutput = z.infer<typeof GenerateArticleDraftOutputSchema>;

export async function generateArticleDraft(input: GenerateArticleDraftInput): Promise<GenerateArticleDraftOutput> {
  return generateArticleDraftFlow(input);
}

const generateArticleDraftPrompt = ai.definePrompt({
  name: 'generateArticleDraftPrompt',
  input: {schema: GenerateArticleDraftInputSchema},
  output: {schema: GenerateArticleDraftOutputSchema},
  prompt: `You are an expert writer, tasked with generating a complete article draft based on the user's specifications.

**TOPIC:** {{{topic}}}
**TONE:** {{{tone}}}
**PURPOSE:** {{{purpose}}}
**WORD LIMIT:** Approximately {{{wordLimit}}} words.
**LANGUAGE:** {{{language}}}

**INSTRUCTIONS:**

1.  **Adhere to the Purpose:** The structure and content of the draft MUST align with the specified **PURPOSE**.
    *   **If PURPOSE is 'essay':** Generate a well-structured academic or argumentative essay. It must include an introduction with a clear thesis statement, several body paragraphs with supporting evidence or arguments, and a concluding paragraph that summarizes the key points.
    *   **If PURPOSE is 'blog-post':** Write an engaging and easy-to-read blog post. Use headings, subheadings, and shorter paragraphs to break up the text. The tone should be conversational and aligned with the specified **TONE**.
    *   **If PURPOSE is 'article':** Produce a formal and informative article suitable for a news outlet or magazine. It should be well-researched (even if you have to generate the facts) and present a balanced view.
    *   **If PURPOSE is 'marketing-copy':** Create persuasive and compelling copy designed to sell a product or service. Focus on benefits, use a strong call-to-action, and adopt a tone that resonates with the target audience.
    *   **If PURPOSE is 'social-media-post':** Generate a short, punchy, and shareable post suitable for social media. Use emojis and hashtags if appropriate for the specified **TONE**.
    *   **If PURPOSE is 'email':** Write a professional or promotional email. It should have a clear subject line, a concise body, and a clear call-to-action.

2.  **Match the Tone:** The writing style, vocabulary, and sentence structure MUST reflect the chosen **TONE**.
    *   **'professional'**: Formal, objective, and precise language.
    *   **'casual'**: Relaxed, conversational, and friendly language.
    *   **'academic'**: Scholarly, analytical, and evidence-based language.
    *   **'persuasive'**: Convincing, confident, and compelling language.
    *   **'creative'**: Imaginative, expressive, and vivid language.

3.  **Generate a COMPLETE Draft:** Do not provide an outline or an incomplete response. The output must be a full article draft that meets the approximate **WORD LIMIT**. The draft should feel finished and polished.

4.  **Format Correctly:** Use Markdown for formatting (headings, lists, bold, etc.) to ensure the draft is readable and well-structured.

{{#if outline}}
**Use this outline to structure your draft:**
{{{outline}}}
{{/if}}

**Generated Article Draft:**`,
});

const generateArticleDraftFlow = ai.defineFlow(
  {
    name: 'generateArticleDraftFlow',
    inputSchema: GenerateArticleDraftInputSchema,
    outputSchema: GenerateArticleDraftOutputSchema,
  },
  async input => {
    const {output} = await generateArticleDraftPrompt(input);
    return output!;
  }
);
