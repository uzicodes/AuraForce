import { db } from '@/lib/db';
import AllTrainers from '@/Components/Pages/AllTrainer/AllTrainers';

export default async function AllTrainersPage() {
  const trainers = await db.trainers.findMany();

  const formattedTrainers = trainers.map((trainer) => ({
    id: Number(trainer.id),
    name: trainer.name,
    role: trainer.role,
  }));

  return <AllTrainers dbTrainers={formattedTrainers} />;
}