'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TrainerBooked from '@/Components/Shared/TrainerBooked';
import PrivateRoute from '@/Components/Router/PrivateRoute';
import LoadingSpinner from '@/Components/Shared/LoadingSpinner';

export const dynamic = 'force-dynamic';

function TrainerBookedContent() {
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

  return <TrainerBooked trainer={trainer} />;
}

export default function TrainerBookedPage() {
  return (
    <PrivateRoute>
      <TrainerBookedContent />
    </PrivateRoute>
  );
}
