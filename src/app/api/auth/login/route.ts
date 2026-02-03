import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json(
                { message: errorData.message || 'Credenciales inválidas' },
                { status: response.status }
            );
        }

        const data = await response.json();
        const { access_token } = data;

        if (!access_token) {
            return NextResponse.json(
                { message: 'Token no recibido del servidor' },
                { status: 500 }
            );
        }

        // Set secure HTTPOnly cookie
        const cookieStore = await cookies();
        cookieStore.set('token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 86400, // 1 day
            path: '/',
        });

        return NextResponse.json({
            success: true,
            user: data.user,
            access_token: data.access_token
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
