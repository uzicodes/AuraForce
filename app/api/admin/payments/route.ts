import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const payments = await db.payments.findMany({
            orderBy: {
                id: 'desc',
            },
        });

        return NextResponse.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch payments' },
            { status: 500 }
        );
    }
}
