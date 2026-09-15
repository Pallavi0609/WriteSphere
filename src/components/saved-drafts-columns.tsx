'use client';

import { ColumnDef } from '@tanstack/react-table';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Eye, Trash2 } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';

export type HistoryItem = {
  id: string;
  topic: string;
  type: string;
  language: string;
  createdAt: { seconds: number; nanoseconds: number };
};

export const columns: ColumnDef<HistoryItem>[] = [
  {
    accessorKey: 'topic',
    header: 'Topic',
    cell: ({ row }) => <div className="font-medium">{row.original.topic}</div>,
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'language',
    header: 'Language',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => new Date(row.original.createdAt.seconds * 1000).toLocaleString(),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const firestore = useFirestore();
      const { user } = useUser();

      const handleDelete = async () => {
        if (!user) return;
        try {
          await deleteDoc(doc(firestore, `users/${user.uid}/draftHistories`, row.original.id));
          toast({ title: 'Success', description: 'Draft deleted successfully.' });
        } catch (error) {
          console.error('Error deleting document:', error);
          toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete draft.' });
        }
      };
      
      return (
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => alert('Viewing is not set up yet.')}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
