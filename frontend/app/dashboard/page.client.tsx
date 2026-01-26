'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardClient } from './DashboardClient';

export default function DashboardPageClient() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAuth, setHasAuth] = useState(false);

  useEffect(() => {
    // Check for auth token in browser storage
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('auth_token='))
      ?.split('=')[1];

    if (!token) {
      // Redirect to login if no auth token
      router.push('/login');
    } else {
      if (!hasAuth) {
        setHasAuth(true);
      }
      if (isLoading) {
        setIsLoading(false);
      }
    }
  }, [router, hasAuth, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!hasAuth) {
    return null; // Will redirect via useEffect
  }

  return <DashboardClient />;
}