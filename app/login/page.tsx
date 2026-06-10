import ClientPage from './ClientPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | AuraForce',
  description: 'Login page',
};

export default function Page() {
  return <ClientPage />;
}
