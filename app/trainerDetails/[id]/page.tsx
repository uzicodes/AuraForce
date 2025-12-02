'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TrainerDetails from '@/Components/Shared/TrainerDetails';
import LoadingSpinner from '@/Components/Shared/LoadingSpinner';

export const dynamic = 'force-dynamic';

export default function TrainerDetailsPage() {
  const params = useParams();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`https://fitness-tracker-server-ruddy.vercel.app/trainer/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setTrainer(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) return <LoadingSpinner />;

  return <TrainerDetails trainer={trainer} />;
}
