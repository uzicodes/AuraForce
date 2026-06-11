import ClientPage from './ClientPage';
import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Forgot-password | AuraForce',
  description: 'Forgot-password page',
};

export default async function Page() {
  const { userId } = await auth();
  if (userId) {
    redirect('/');
  }
  return <ClientPage />;
}
