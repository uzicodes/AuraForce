import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const users = await db.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                phone: true,
                gender: true,
                location: true,
                createdAt: true,
                MemberID: true,
                // clerkUserId is intentionally omitted
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('Error fetching members:', error);
        return NextResponse.json(
            { error: 'Failed to fetch members' },
            { status: 500 }
        );
    }
}
