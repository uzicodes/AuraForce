import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const bookings = await db.membershipBookings.findMany({
            orderBy: {
                id: 'desc',
            },
        });

        // Serialize dates for JSON
        const serialized = bookings.map(b => ({
            ...b,
            startDate: b.startDate ? b.startDate.toISOString().split('T')[0] : null,
            endDate: b.endDate ? b.endDate.toISOString().split('T')[0] : null,
        }));

        return NextResponse.json(serialized);
    } catch (error) {
        console.error('Error fetching membership bookings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch membership bookings' },
            { status: 500 }
        );
    }
}
