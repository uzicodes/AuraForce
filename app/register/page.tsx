import ClientPage from './ClientPage';
import { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Register | AuraForce',
  description: 'Register page',
};

export default async function Page() {
  const { userId } = await auth();
  if (userId) {
    redirect('/');
  }
  return <ClientPage />;
}
