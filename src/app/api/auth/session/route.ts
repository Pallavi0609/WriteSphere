
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { adminApp } from '@/firebase/admin';

export async function POST(request: NextRequest) {
  const { idToken } = await request.json();

  if (!idToken) {
    return NextResponse.json(
      { error: 'idToken is required' },
      { status: 400 }
    );
  }

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const auth = getAuth(adminApp);
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    cookies().set('__session', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error creating session cookie:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  const sessionCookie = cookies().get('__session')?.value;

  if (sessionCookie) {
    try {
      const auth = getAuth(adminApp);
      const decodedClaims = await auth.verifySessionCookie(sessionCookie);

      await auth.revokeRefreshTokens(decodedClaims.sub);

      cookies().delete('__session');

      return NextResponse.json({ status: 'success' });
    } catch (error) {
      console.error('Error revoking session cookie:', error);
      return NextResponse.json(
        { error: 'Failed to revoke session' },
        { status: 401 }
      );
    }
  }

  return NextResponse.json({ status: 'success' });
}
