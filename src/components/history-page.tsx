'use client';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { useCollection } from '@/firebase/firestore/use-collection';
import { DataTable } from './data-table';
import { columns } from './columns';
import { collection, query, orderBy } from 'firebase/firestore';

export function HistoryPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const draftsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, `users/${user.uid}/draftHistories`),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);

  const generationsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, `users/${user.uid}/generationHistories`),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);

  const { data: drafts, loading: draftsLoading, error: draftsError } = useCollection(draftsQuery);
  const { data: generations, loading: generationsLoading, error: generationsError } = useCollection(generationsQuery);

  const combinedData = [
    ...(drafts || []).map(item => ({ ...item, collection: 'draftHistories' as const })),
    ...(generations || []).map(item => ({ ...item, collection: 'generationHistories' as const })),
  ].sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

  const loading = draftsLoading || generationsLoading;
  const error = draftsError || generationsError;

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">History</h2>
          <p className="text-muted-foreground">
            Here is a list of your recent activity.
          </p>
        </div>
      </div>
      <DataTable data={combinedData} columns={columns} isLoading={loading} error={error} />
    </div>
  );
}
