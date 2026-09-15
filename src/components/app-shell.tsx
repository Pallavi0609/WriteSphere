
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainNav from '@/components/main-nav';
import PageHeader from '@/components/page-header';
import { Sidebar, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useUser } from '@/firebase';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && !isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router, isHydrated]);

  if (!isHydrated || isUserLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Sidebar>
        <MainNav />
      </Sidebar>
      <SidebarInset>
        <PageHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background/95">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}
