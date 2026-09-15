'use server';

import { headers } from 'next/headers';
import { adminApp } from '@/firebase/admin';
import { getAuth } from 'firebase-admin/auth';

export async function getAuthenticatedUser() {
  const idToken = headers().get('x-firebase-id-token');

  if (!idToken) {
    return null;
  }

  try {
    const decodedToken = await getAuth(adminApp).verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return null;
  }
}
