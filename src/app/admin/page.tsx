import React from 'react';
import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from '@/firebase/admin';
import UserTable from '@/components/admin-user-table';

async function verifyAdmin() {
  // Local-dev fallback: if LOCAL_ADMIN_SECRET is set and a matching
  // `__local_admin` cookie exists, treat the request as admin. This is
  // intentionally only for development convenience.
  const localSecret = process.env.LOCAL_ADMIN_SECRET;
  const localCookie = cookies().get('__local_admin')?.value;
  if (localSecret && localCookie && localCookie === localSecret && process.env.NODE_ENV !== 'production') {
    return { ok: true, reason: 'local-dev' };
  }

  const sessionCookie = cookies().get('__session')?.value;
  if (!sessionCookie) return { ok: false, reason: 'no-session' };

  try {
    const auth = getAuth(adminApp);
    const decoded = await auth.verifySessionCookie(sessionCookie);
    const uid = decoded.sub;
    const db = getFirestore(adminApp);
    const doc = await db.collection('users').doc(uid).get();
    const data = doc.exists ? (doc.data() as any) : null;
    if (!data || !data.isAdmin) return { ok: false, reason: 'not-admin' };
    return { ok: true };
  } catch (err) {
    console.error('admin verify error', err);
    return { ok: false, reason: 'verify-failed' };
  }
}

export default async function AdminPage() {
  const authCheck = await verifyAdmin();
  if (!authCheck.ok) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin — Access Denied</h1>
        <p className="text-sm text-muted-foreground">
          You are not authorized to view this page. ({authCheck.reason})
        </p>
      </div>
    );
  }

  const db = getFirestore(adminApp);
  const snapshot = await db.collection('users').get();
  const users = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin — Users</h1>
      <p className="text-sm text-muted-foreground mb-6">
        This page lists all documents in the `users` collection in Firestore.
      </p>
      <UserTable users={users} />
    </div>
  );
}
