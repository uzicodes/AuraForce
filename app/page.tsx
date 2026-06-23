
import Home from '@/Components/Pages/Home/Home';
import { db } from '@/lib/db';

// Revalidate every 60 seconds — memberships data rarely changes,
// so there's no need to hit the DB on every single request.
export const revalidate = 60;

export default async function HomePage() {
  // Fetch specific fields: name and price
  const memberships = await db.memberships.findMany({
    select: {
      id: true,
      name: true,
      price: true,
    },
  });

  return <Home dbPrices={memberships} />;
}

export const metadata = {
  title: 'AuraForce | Home',
  description: 'Home | AuraForce',
};
