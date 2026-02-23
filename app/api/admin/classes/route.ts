import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const classes = await db.classes.findMany({
            select: {
                id: true,
                classname: true,
                trainer: true,
                duration: true,
                class_fees: true,
                class_time: true,
                class_days: true,
            },
            orderBy: {
                classname: 'asc',
            },
        });

        // Convert BigInt to string/number if necessary for JSON serialization
        const serializedClasses = classes.map(c => ({
            ...c,
            id: Number(c.id),
        }));

        return NextResponse.json(serializedClasses);
    } catch (error) {
        console.error('Error fetching classes:', error);
        return NextResponse.json(
            { error: 'Failed to fetch classes' },
            { status: 500 }
        );
    }
}
