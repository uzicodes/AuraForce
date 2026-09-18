import { Suspense } from 'react';
import ClientPage from './ClientPage';
import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Login | AuraForce',
  description: 'Login page',
};

function LoginFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
    </div>
  );
}

export default async function Page() {
  const { userId } = await auth();
  if (userId) {
    redirect('/');
  }
  return (
    <Suspense fallback={<LoginFallback />}>
      <ClientPage />
    </Suspense>
  );
}
