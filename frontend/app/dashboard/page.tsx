import { Suspense } from 'react';
import DashboardPageClient from './page.client';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPageClient />
    </Suspense>
  );
}