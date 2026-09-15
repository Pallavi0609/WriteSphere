import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { adminApp } from '@/firebase/admin';

async function requireAdmin(req: Request) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';

    // Local-dev secret check (cookie or query param)
    const localSecret = process.env.LOCAL_ADMIN_SECRET;
    if (localSecret) {
      const localMatch = cookieHeader.match(/__local_admin=([^;]+)/);
      if (localMatch && localMatch[1] === localSecret && process.env.NODE_ENV !== 'production') {
        return { ok: true };
      }
      const url = new URL(req.url);
      const qp = url.searchParams.get('local_admin');
      if (qp && qp === localSecret && process.env.NODE_ENV !== 'production') {
        return { ok: true };
      }
    }

    const match = cookieHeader.match(/__session=([^;]+)/);
    const sessionCookie = match ? match[1] : null;
    if (!sessionCookie) return { ok: false };

    const auth = getAuth(adminApp);
    const decoded = await auth.verifySessionCookie(sessionCookie);
    const uid = decoded.sub;
    const db = getFirestore(adminApp);
    const userDoc = await db.collection('users').doc(uid).get();
    const data = userDoc.exists ? (userDoc.data() as any) : null;
    if (data && data.isAdmin) return { ok: true };
    return { ok: false };
  } catch (err) {
    console.error('requireAdmin error', err);
    return { ok: false };
  }
}

export async function GET(request: Request) {
  const adminCheck = await requireAdmin(request);
  if (!adminCheck.ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    const db = getFirestore(adminApp);
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
    return NextResponse.json({ users });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
