import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const bookings = await db.classBookings.findMany({
            include: {
                user: {
                    select: {
                        MemberID: true
                    }
                }
            },
            orderBy: {
                id: 'desc',
            },
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Error fetching class bookings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch class bookings' },
            { status: 500 }
        );
    }
}
