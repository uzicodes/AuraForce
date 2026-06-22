import ClientPage from './ClientPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forums | AuraForce',
  description: 'Forums | AuraForce',
};

export default function Page() {
  return <ClientPage />;
}
