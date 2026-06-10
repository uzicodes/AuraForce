import ClientPage from './ClientPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot-password | AuraForce',
  description: 'Forgot-password page',
};

export default function Page() {
  return <ClientPage />;
}
