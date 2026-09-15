'use server';

import {
  generateArticleDraft,
  type GenerateArticleDraftInput,
} from '@/ai/flows/generate-article-draft';
import { draftFormSchema } from '@/lib/schemas';

type FormState = {
  message: string;
  draft?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function generateDraftAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = draftFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  
  const fields = Object.fromEntries(formData.entries());

  if (!validatedFields.success) {
    return {
      message: 'Please check your input and try again.',
      fields: fields,
      issues: validatedFields.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const result = await generateArticleDraft(
      validatedFields.data as GenerateArticleDraftInput
    );
    if (result.draft) {
      return { message: 'success', draft: result.draft, fields };
    } else {
      return {
        message:
          'Failed to generate draft. The AI model did not return a result.',
        fields,
      };
    }
  } catch (error) {
    return {
      message: `An unexpected error occurred: ${
        error instanceof Error ? error.message : String(error)
      }`,
      fields,
    };
  }
}
