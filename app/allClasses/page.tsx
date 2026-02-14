import { db } from '@/lib/db';
import AllClasses from '@/Components/Pages/AllClasses/AllClasses';

export default async function AllClassesPage() {

  const classes = await db.classes.findMany({
    orderBy: {
      id: 'asc'
    }
  });

  const formattedClasses = classes.map((c) => ({
    id: Number(c.id),
    classname: c.classname,
    trainer: c.trainer,
    duration: c.duration,
  }));

  return <AllClasses dbClasses={formattedClasses} />;
}