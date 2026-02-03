import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> } // Correctly type params as a Promise for Next.js 15+ or match current version usage
) {
    try {
        const { id } = await params; // Await params if using Next.js 15, otherwise sync access depends on version. Next.js 15 requires awaiting params.
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
        }

        const body = await request.json();

        // Ensure we don't send password if it's empty (optional update)
        // Although the prompt payload didn't strictly say optional, typically updates might not require password. 
        // But let's stick to the prompt structure. The prompt showed name, apellido, email, roles. 

        const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
            method: 'PUT',
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
            console.error(`Error updating user ${id}: ${status} - ${text}`);
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
        console.error('Proxy update error:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
        }

        const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            const status = response.status;
            const text = await response.text();
            console.error(`Error deleting user ${id}: ${status} - ${text}`);
            try {
                const data = JSON.parse(text);
                return NextResponse.json(data, { status });
            } catch {
                return new NextResponse(text, { status });
            }
        }

        return NextResponse.json({ message: 'Eliminado correctamente' }); // Return success JSON even if 204
    } catch (error) {
        console.error('Proxy delete error:', error);
        return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
    }
}
