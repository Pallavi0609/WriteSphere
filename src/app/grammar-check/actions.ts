'use server';

import {
  checkGrammarAndStyle,
  type CheckGrammarAndStyleInput,
} from '@/ai/flows/check-grammar-and-style';
import { grammarCheckFormSchema } from '@/lib/schemas';

type FormState = {
  message: string;
  improvements?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function checkGrammarAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = grammarCheckFormSchema.safeParse(
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
    const result = await checkGrammarAndStyle(
      validatedFields.data as CheckGrammarAndStyleInput
    );
    if (result.improvements) {
      return { message: 'success', improvements: result.improvements, fields };
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
