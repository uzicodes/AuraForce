import ClientPage from './ClientPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | AuraForce',
  description: 'Register page',
};

export default function Page() {
  return <ClientPage />;
}
