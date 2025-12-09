
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
        }

        // Forward the POST request to the actual backend
        const response = await fetch(`${API_BASE_URL}/api/qstom/solicitar-reporte`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // If the original request has a body, forward it. In this case, it might be empty.
            // body: request.body 
        });

        if (!response.ok) {
            const status = response.status;
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                return NextResponse.json(data, { status });
            } catch {
                return new NextResponse(text, { status });
            }
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
