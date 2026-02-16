
import Home from '@/Components/Pages/Home/Home';
import { db } from '@/lib/db';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

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
