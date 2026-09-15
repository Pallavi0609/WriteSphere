'use client';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { DataTable } from './data-table';
import { columns } from './saved-drafts-columns';
import { collection, query, orderBy } from 'firebase/firestore';

export function SavedDraftsPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const draftsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, `users/${user.uid}/draftHistories`),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);

  const { data: drafts, loading, error } = useCollection(draftsQuery);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Saved Drafts</h2>
          <p className="text-muted-foreground">
            Here is a list of your saved drafts.
          </p>
        </div>
      </div>
      <DataTable data={drafts || []} columns={columns} isLoading={loading} error={error} />
    </div>
  );
}
