import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const trainers = await db.trainers.findMany({
            select: {
                id: true,
                name: true,
                role: true,
                fee_per_week: true,
                fee_per_month: true,
                trainer_time: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        // Convert BigInt to number for JSON serialization
        const serializedTrainers = trainers.map(t => ({
            ...t,
            id: Number(t.id),
        }));

        return NextResponse.json(serializedTrainers);
    } catch (error) {
        console.error('Error fetching trainers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch trainers' },
            { status: 500 }
        );
    }
}
