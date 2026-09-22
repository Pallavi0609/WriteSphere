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

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    const auth = getAuth(adminApp);

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    const cookieStore = await cookies();

    cookieStore.set('__session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
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
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('__session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ status: 'success' });
  }

  try {
    const auth = getAuth(adminApp);
    const decodedClaims = await auth.verifySessionCookie(sessionCookie);

    await auth.revokeRefreshTokens(decodedClaims.sub);

    cookieStore.delete('__session');

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Error revoking session cookie:', error);

    return NextResponse.json(
      { error: 'Failed to revoke session' },
      { status: 401 }
    );
  }
}
