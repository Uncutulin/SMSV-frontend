import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
        }

        const body = await request.json();

        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
            cache: 'no-store'
        });

        if (!response.ok) {
            const status = response.status;
            const text = await response.text();
            console.error(`Error creating user: ${status} - ${text}`);
            try {
                const data = JSON.parse(text);
                return NextResponse.json(data, { status });
            } catch {
                return new NextResponse(text, { status });
            }
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Proxy register error:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
