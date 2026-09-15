'use server';

import {
  generateEssayOutline
} from '@/ai/flows/generate-essay-outline';
import {
  generateArticleDraft
} from '@/ai/flows/generate-article-draft';
import {
  checkGrammarAndStyle
} from '@/ai/flows/check-grammar-and-style';
import {
    improveStyle,
} from '@/ai/flows/improve-style';
import {
    correctGrammar,
} from '@/ai/flows/correct-grammar';
import { playgroundFormSchema } from '@/lib/schemas';

type FormState = {
  message: string;
  result?: string;
  fields?: Record<string, string>;
  issues?: string[];
  action?: string;
};

export async function playgroundAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const fields = Object.fromEntries(formData.entries());
  const action = fields.action as string;

  const validatedFields = playgroundFormSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      message: 'Please check your input and try again.',
      fields,
      action,
      issues: validatedFields.error.issues.map((issue) => issue.message),
    };
  }
  
  try {
    let result: { [key: string]: any } | null = null;
    let resultKey: string = '';

    if (validatedFields.data.action === 'outline') {
        const { topic, tone, language } = validatedFields.data;
        result = await generateEssayOutline({
            topic,
            tone,
            language,
            wordLimit: 1000,
        });
        resultKey = 'outline';
    } else if (validatedFields.data.action === 'draft') {
        const { topic, tone, purpose } = validatedFields.data;
        result = await generateArticleDraft({
            topic,
            tone,
            purpose,
            wordLimit: 1000,
        });
        resultKey = 'draft';
    } else if (validatedFields.data.action === 'grammar') {
        const { content } = validatedFields.data;
        result = await checkGrammarAndStyle({ text: content });
        resultKey = 'improvements';
    } else if (validatedFields.data.action === 'style') {
        const { content } = validatedFields.data;
        result = await improveStyle({ text: content });
        resultKey = 'improvedText';
    } else if (validatedFields.data.action === 'correct-grammar') {
        const { content } = validatedFields.data;
        result = await correctGrammar({ text: content });
        resultKey = 'correctedText';
    }

    if (result && result[resultKey]) {
      return { message: 'success', result: result[resultKey], fields, action };
    } else {
      return {
        message: 'The AI model did not return a result.',
        fields,
        action,
      };
    }
  } catch (error) {
    return {
      message: `An unexpected error occurred: ${
        error instanceof Error ? error.message : String(error)
      }`,
      fields,
      action
    };
  }
}
