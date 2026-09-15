
'use server';

import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { adminApp } from '@/firebase/admin';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  preferredLanguage: z.string(),
  preferredTone: z.string(),
});

type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function updateProfile(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const sessionCookie = cookies().get('__session')?.value;
    if (!sessionCookie) {
      return {
        message: 'You must be logged in to update your profile.',
      };
    }

    const auth = getAuth(adminApp);
    const user = await auth.verifySessionCookie(sessionCookie, true);

    const validatedFields = profileSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
      return {
        message: 'Please check your input and try again.',
        issues: validatedFields.error.issues.map((issue) => issue.message),
      };
    }

    const db = getFirestore(adminApp);
    const userRef = db.collection('users').doc(user.uid);

    await userRef.update(validatedFields.data);

    revalidatePath('/settings');

    return { message: 'success' };
  } catch (error) {
    return {
      message: `An unexpected error occurred: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}
