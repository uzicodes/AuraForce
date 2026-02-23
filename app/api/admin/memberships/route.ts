import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const memberships = await db.memberships.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                period: true,
            },
            orderBy: {
                price: 'asc',
            },
        });

        return NextResponse.json(memberships);
    } catch (error) {
        console.error('Error fetching memberships:', error);
        return NextResponse.json(
            { error: 'Failed to fetch memberships' },
            { status: 500 }
        );
    }
}
