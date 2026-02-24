import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const bookings = await db.trainerBookings.findMany({
            orderBy: {
                id: 'desc',
            },
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching trainer bookings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch trainer bookings' },
            { status: 500 }
        );
    }
}
