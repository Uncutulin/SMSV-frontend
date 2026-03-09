import { NextRequest, NextResponse } from 'next/server';
import { fetchFromBackend } from '@/services/evolucionTipoOperacionService';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const data = await fetchFromBackend('/r12', body);
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Error en API Route R12:", error.message);
        return NextResponse.json(
            { status: 'error', error: 'Error interno al procesar R12' },
            { status: 500 }
        );
    }
}
