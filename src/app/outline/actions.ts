'use server';

import { z } from 'zod';
import { getFirestore, serverTimestamp } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { adminApp } from '@/firebase/admin';
import { cookies } from 'next/headers';
import {
    generateEssayOutline,
    type GenerateEssayOutlineInput,
  } from '@/ai/flows/generate-essay-outline';
import { outlineFormSchema } from '@/lib/schemas';

type FormState = {
  message: string;
  outline?: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function generateOutlineAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = outlineFormSchema.safeParse(
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
    const result = await generateEssayOutline(
      validatedFields.data as GenerateEssayOutlineInput
    );

    if (result.outline) {
      const { topic, language } = validatedFields.data;

      try {
        const sessionCookie = cookies().get('__session')?.value;
        if (!sessionCookie) {
            throw new Error('You must be logged in to save history.');
        }
        const auth = getAuth(adminApp);
        const user = await auth.verifySessionCookie(sessionCookie, true);
        const db = getFirestore(adminApp);
        const historyRef = db.collection('users').doc(user.uid).collection('draftHistories');

        await historyRef.add({
            topic: topic,
            content: result.outline,
            language: language,
            type: 'Outline',
            userId: user.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

      } catch (error) {
        console.error('Error saving history:', error);
        // We don't want to block the user from seeing the outline, so we'll just log the error
        // and not return an error message to the user.
      }

      return { message: 'success', outline: result.outline, fields };
    } else {
      return {
        message:
          'Failed to generate outline. The AI model did not return an outline.',
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
