"use client";

import React, { useState } from 'react';

interface UserRecord {
  id: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

export default function UserTable({ users: initialUsers }: { users: UserRecord[] }) {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers || []);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (uid: string) => {
    if (!confirm('Delete user and their Firestore document? This cannot be undone.')) return;
    setLoadingId(uid);
    try {
      const res = await fetch(`/api/admin/users/${uid}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setUsers((prev) => prev.filter((u) => u.id !== uid));
    } catch (err) {
      alert('Failed to delete user: ' + (err as any)?.message || err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-auto border rounded-md">
      <table className="w-full table-auto">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">UID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2 align-top text-xs">{u.id}</td>
              <td className="p-2">{u.name || '-'}</td>
              <td className="p-2">{u.email || '-'}</td>
              <td className="p-2">
                <button
                  className="btn btn-danger text-sm"
                  onClick={() => handleDelete(u.id)}
                  disabled={loadingId === u.id}
                >
                  {loadingId === u.id ? 'Deleting…' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
