import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
        }

        const response = await fetch(`${API_BASE_URL}/api/user`, { // Assuming standard Laravel /api/user endpoint
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return NextResponse.json({ message: 'Error fetching user' }, { status: response.status });
        }

        const data = await response.json();
        // Return the user object directly, similar to login response structure
        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy me error:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
