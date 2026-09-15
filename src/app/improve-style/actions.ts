'use server';

import {
  improveStyle,
  type ImproveStyleInput,
} from '@/ai/flows/improve-style';
import { improveStyleFormSchema } from '@/lib/schemas';

export async function improveStyleAction(
  prevState: any,
  formData: FormData
): Promise<any> {
  const validatedFields = improveStyleFormSchema.safeParse(
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
    const result = await improveStyle(
      validatedFields.data as ImproveStyleInput
    );
    if (result.improvedText) {
      return { message: 'success', improvedText: result.improvedText, fields };
    } else {
      return {
        message:
          'Failed to get suggestions. The AI model did not return a result.',
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
